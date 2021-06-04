import React,{ useState, useRef } from 'react'
import axios from 'axios';
import { Button, Form, Input} from 'antd';
import QuillEditor from '../../editor/QuillEditor';
import { useSelector } from "react-redux";
import { withRouter } from 'react-router-dom'


function BoardCreatePage(props) {

    const user = useSelector(state => state.user);

    const [postTitle, setPostTitle] = useState("")
    const [content, setContent] = useState("");
    // const [files, setFiles] = useState([]);

    const editorRef = useRef();

    const onTitleChange = (e) => {
        setPostTitle(e.currentTarget.value)
    }

    const onEditorChange = (value) => {
        setContent(value)
        
    }

    // const onFilesChange = (files) => {
    //     setFiles(files)
        
    // }

    const onSubmit = (event) => {
        event.preventDefault();

        if( user.userData && !user.userData.isAuth) {
            return alert('Please log in!')
        }

        //submit시에 퀼 에디터 안의 이미지 목록을 가져오는 함수 호출
        const fileList = editorRef.current.getFileList()

        const variables = {
            title: postTitle,
            content: content,
            writer: user.userData._id,
            files: fileList
        }
        console.log('variables',variables)
        

        axios.post('/api/blog/createPost', variables )
        .then(response => {
            if(response.data.success) {
                alert('Post created!');
                props.history.push('/boardList')
            } else {
                alert('오류가 났습니다')
                props.history.push('/boardList')
            }
            
        })
    }

    return (
        <div>
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2 > 글 작성 </h2>
                </div>
                <Form onSubmit={onSubmit}>
                    <Input 
                        onChange={onTitleChange}
                        value={postTitle}
                    />
                    <QuillEditor
                    ref={editorRef}
                    placeholder={"Start Posting Something"}
                    onEditorChange={onEditorChange}
                    // onFilesChange={onFilesChange}
                    />
                    <div style={{ textAlign: 'center', margin: '2rem', }}>
                    <Button type="primary" size="large" onClick={onSubmit}>
                        Submit
                    </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default withRouter(BoardCreatePage)
