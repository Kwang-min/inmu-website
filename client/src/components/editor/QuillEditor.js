import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";

import axios from 'axios';
const __ISMSIE__ = navigator.userAgent.match(/Trident/i) ? true : false;

// Quill.register('modules/clipboard', PlainClipboard, true);

const QuillClipboard = Quill.import('modules/clipboard');

//클립보드는 다른 곳에서 복사해서 붙여넣기 했을 때 처리해주는 곳인 듯
class Clipboard extends QuillClipboard {

    getMetaTagElements = (stringContent) => {
        const el = document.createElement('div');
        el.innerHTML = stringContent;
        return el.getElementsByTagName('meta');
    };

    async onPaste(e) {
        let clipboardData = e.clipboardData || window.clipboardData;
        let pastedData = await clipboardData.getData('Text');

        const urlMatches = pastedData.match(/\b(http|https)?:\/\/\S+/gi) || [];
        if (urlMatches.length > 0) {
            e.preventDefault();
            urlMatches.forEach(link => {
                axios.get(link)
                    .then(payload => {
                        // let title, image, url, description;
                        let title, image, url;
                        for (let node of this.getMetaTagElements(payload)) {
                            if (node.getAttribute("property") === "og:title") {
                                title = node.getAttribute("content");
                            }
                            if (node.getAttribute("property") === "og:image") {
                                image = node.getAttribute("content");
                            }
                            if (node.getAttribute("property") === "og:url") {
                                url = node.getAttribute("content");
                            }
                            // if (node.getAttribute("property") === "og:description") {
                            //     description = node.getAttribute("content");
                            // }
                        }

                        const rendered = `<a href=${url} target="_blank"><div><img src=${image} alt=${title} width="20%"/><span>${title}</span></div></a>`;

                        let range = this.quill.getSelection();
                        let position = range ? range.index : 0;
                        this.quill.pasteHTML(position, rendered, 'silent');
                        this.quill.setSelection(position + rendered.length);
                    })
                    .catch(error => console.error(error));
            });

        } else {
            //console.log('when to use this') 보통 다른 곳에서  paste 한다음에  copy하면 이쪽 걸로 한다. 
            super.onPaste(e);
        }
    }

}
Quill.register('modules/clipboard', Clipboard, true);


const BlockEmbed = Quill.import('blots/block/embed');
//블락임베드는 퀼에디터 안에 중간에 삽입할 덩어리를 정의한 후 사용하는 것인 듯
class ImageBlot extends BlockEmbed {

    static create(value) {
        const imgTag = super.create(); 
        imgTag.setAttribute('src', value.src);
        imgTag.setAttribute('alt', value.alt);
        imgTag.setAttribute('width', '40%');
        return imgTag;
    }

    static value(node) {
        return { src: node.getAttribute('src'), alt: node.getAttribute('alt') };
    }

}

ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';
Quill.register(ImageBlot);

// class VideoBlot extends BlockEmbed {

//     static create(value) {
//         if (value && value.src) {
//             const videoTag = super.create();
//             videoTag.setAttribute('src', value.src);
//             videoTag.setAttribute('title', value.title);
//             videoTag.setAttribute('width', '100%');
//             videoTag.setAttribute('controls', '');

//             return videoTag;
//         } else {
//             const iframeTag = document.createElement('iframe');
//             iframeTag.setAttribute('src', value);
//             iframeTag.setAttribute('frameborder', '0');
//             iframeTag.setAttribute('allowfullscreen', true);
//             iframeTag.setAttribute('width', '100%');
//             return iframeTag;
//         }
//     }

//     static value(node) {
//         if (node.getAttribute('title')) {
//             return { src: node.getAttribute('src'), alt: node.getAttribute('title') };
//         } else {
//             return node.getAttribute('src');
//         }
//         // return { src: node.getAttribute('src'), alt: node.getAttribute('title') };
//     }

// }

// VideoBlot.blotName = 'video';
// VideoBlot.tagName = 'video';
// Quill.register(VideoBlot);

// class FileBlot extends BlockEmbed {

//     static create(value) {
//         const prefixTag = document.createElement('span');
//         prefixTag.innerText = "첨부파일 - ";

//         const bTag = document.createElement('b');
//         //위에 첨부파일 글자 옆에  파일 이름이 b 태그를 사용해서 나온다.
//         bTag.innerText = value;

//         const linkTag = document.createElement('a');
//         linkTag.setAttribute('href', value);
//         linkTag.setAttribute("target", "_blank");
//         linkTag.setAttribute("className", "file-link-inner-post");
//         linkTag.appendChild(bTag);
//         //linkTag 이런식으로 나온다 <a href="btn_editPic@3x.png" target="_blank" classname="file-link-inner-post"><b>btn_editPic@3x.png</b></a>

//         const node = super.create();
//         node.appendChild(prefixTag);
//         node.appendChild(linkTag);

//         return node;
//     }

//     static value(node) {
//         const linkTag = node.querySelector('a');
//         return linkTag.getAttribute('href');
//     }

// }

// FileBlot.blotName = 'file';
// FileBlot.tagName = 'p';
// FileBlot.className = 'file-inner-post';
// Quill.register(FileBlot);

// class PollBlot extends BlockEmbed {

//     static create(value) {
//         const prefixTag = document.createElement('span');
//         prefixTag.innerText = "투표 - ";

//         const bTag = document.createElement('b');
//         bTag.innerText = value.title;

//         const node = super.create();
//         node.setAttribute('id', value.id);
//         node.appendChild(prefixTag);
//         node.appendChild(bTag);

//         return node;
//     }

//     static value(node) {
//         const id = node.getAttribute('id');
//         const bTag = node.querySelector('b');
//         const title = bTag.innerText;
//         return { id, title };
//     }

// }

// PollBlot.blotName = 'poll';
// PollBlot.tagName = 'p';
// PollBlot.className = 'poll-inner-post';
// Quill.register(PollBlot);

class QuillEditor extends React.Component {

    bandId;
    placeholder;
    onEditorChange;
    onFilesChange;
    // onPollsChange;
    _isMounted;

    constructor(props) {
        super(props);

        if(this.props.existing) {
            this.state = {
                editorHtml: this.props.existing,
                files: [],
            };
        } else {
            this.state = {
                editorHtml: __ISMSIE__ ? "<p>&nbsp;</p>" : "",
                files: [],
            };
        }

        this.reactQuillRef = null;

        this.inputOpenImageRef = React.createRef();
        // this.inputOpenVideoRef = React.createRef();
        // this.inputOpenFileRef = React.createRef();
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChange = (html) => {
        // https://youtu.be/BbR-QCoKngE
        // https://www.youtube.com/embed/ZwKhufmMxko
        // https://tv.naver.com/v/9176888
        // renderToStaticMarkup(ReactHtmlParser(html, options));
        

        this.setState({
            editorHtml: html,
            
        }, () => {
            this.props.onEditorChange(this.state.editorHtml);
            
        });
    };

    getFileList = () => {
        console.log('hi')
        const quill = this.reactQuillRef.getEditor();
        let fileList = quill.getContents().ops.filter(i => i.insert && i.insert.image).map(i => i.insert.image.src)
        console.log('fileList', fileList)
        return fileList;
    }

    // I V F P들을  눌렀을떄 insertImage: this.imageHandler로 가서  거기서 inputOpenImageRef를 클릭 시킨다. 
    imageHandler = () => {
        this.inputOpenImageRef.current.click();
    };

    // videoHandler = () => {
    //     this.inputOpenVideoRef.current.click();
    // };

    // fileHandler = () => {
    //     this.inputOpenFileRef.current.click();
    // };


    insertImage = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0];

            let formData = new FormData();
            const config = {
                header: { 'content-type': 'multipart/form-data' }
            }
            formData.append("file", file);

            axios.post('/api/blog/uploadfiles', formData, config)
                .then(response => {
                    if (response.data.success) {

                        const quill = this.reactQuillRef.getEditor();
                        quill.focus();

                        let range = quill.getSelection();
                        let position = range ? range.index : 0;

                        //먼저 노드 서버에다가 이미지를 넣은 다음에   여기 아래에 src에다가 그걸 넣으면 그게 
                        //이미지 블롯으로 가서  크리에이트가 태그를 editorHTML에 다가 넣고 img 태그에 value가 src alt 값을 넣어서 이미지 만드는 듯? 확실하진 않음
                        //inserEmbed가 imageBlot 사용하는 함수 ("image"가 blotName이었음)
                        quill.insertEmbed(position, "image", { src: "http://152.70.253.13:8000/" + response.data.url, alt: response.data.fileName });
                        quill.setSelection(position + 1);

                        // if (this._isMounted) {
                        //     this.setState({
                        //         files: [...this.state.files, file]
                        //     }, () => { this.props.onFilesChange(this.state.files) });
                        // }
                    } else {
                        return alert('failed to upload file')
                    }
                })
        }
    };

    // insertVideo = (e) => {
    //     e.stopPropagation();
    //     e.preventDefault();

    //     if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
    //         const file = e.currentTarget.files[0];

    //         let formData = new FormData();
    //         const config = {
    //             header: { 'content-type': 'multipart/form-data' }
    //         }
    //         formData.append("file", file);

    //         axios.post('/api/blog/uploadfiles', formData, config)
    //             .then(response => {
    //                 if (response.data.success) {

    //                     const quill = this.reactQuillRef.getEditor();
    //                     quill.focus();

    //                     let range = quill.getSelection();
    //                     let position = range ? range.index : 0;
    //                     quill.insertEmbed(position, "video", { src: "http://localhost:8000/" + response.data.url, title: response.data.fileName });
    //                     quill.setSelection(position + 1);

    //                     if (this._isMounted) {
    //                         this.setState({
    //                             files: [...this.state.files, file]
    //                         }, () => { this.props.onFilesChange(this.state.files) });
    //                     }
    //                 } else {
    //                     return alert('failed to upload file')
    //                 }
    //             })
    //     }
    // }

    // insertFile = (e) => {
    //     e.stopPropagation();
    //     e.preventDefault();

    //     if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
    //         const file = e.currentTarget.files[0];
    //         console.log(file);

    //         let formData = new FormData();
    //         const config = {
    //             header: { 'content-type': 'multipart/form-data' }
    //         }
    //         formData.append("file", file);

    //         axios.post('/api/blog/uploadfiles', formData, config)
    //             .then(response => {
    //                 if (response.data.success) {

    //                     const quill = this.reactQuillRef.getEditor();
    //                     quill.focus();

    //                     let range = quill.getSelection();
    //                     let position = range ? range.index : 0;
    //                     quill.insertEmbed(position, "file", response.data.fileName);
    //                     quill.setSelection(position + 1);

    //                     if (this._isMounted) {
    //                         this.setState({
    //                             files: [...this.state.files, file]
    //                         }, () => { this.props.onFilesChange(this.state.files) });
    //                     }
    //                 };
    //             })
    //     }
    // };

    render() {
        return (
            <div>
                <div id="toolbar">
                    <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
                        <option value="1" />
                        <option value="2" />
                        <option value="" />
                    </select>
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                    <button className="ql-strike" />
                    <button className="ql-insertImage">
                        img
                    </button>
                    {/* <button className="ql-insertVideo">
                        V
                    </button> */}
                    
                    <button className="ql-link" />
                    <button className="ql-code-block" />
                    <button className="ql-video" />
                    <button className="ql-blockquote" />
                    <button className="ql-clean" />

                    

                </div>
                <ReactQuill
                    ref={(el) => { this.reactQuillRef = el }}
                    theme={'snow'}
                    onChange={this.handleChange}
                    modules={this.modules}
                    formats={this.formats}
                    value={this.state.editorHtml}
                    placeholder={this.props.placeholder}
                />
                <input type="file" accept="image/*" ref={this.inputOpenImageRef} style={{ display: "none" }} onChange={this.insertImage} />
                {/* <input type="file" accept="video/*" ref={this.inputOpenVideoRef} style={{ display: "none" }} onChange={this.insertVideo} />
                <input type="file" accept="*" ref={this.inputOpenFileRef} style={{ display: "none" }} onChange={this.insertFile} /> */}
            </div>
        )
    }

    modules = {
        // syntax: true,
        toolbar: {
            container: "#toolbar",
            //id ="toorbar"는  그 위에 B I U S I V F P 이거 있는 곳이다. 
            handlers: {
                insertImage: this.imageHandler,
                // insertVideo: this.videoHandler,
            }
        },

    };

    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'image', 'video', 'file', 'link',"code-block", "video", "blockquote", "clean"
    ];
}

export default QuillEditor;
