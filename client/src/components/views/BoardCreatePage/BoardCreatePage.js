import React,{ useState } from 'react'
import axios from 'axios';
import { Button, Form, Input} from 'antd';
import QuillEditor from '../../editor/QuillEditor';
import { useSelector } from "react-redux";
import { withRouter } from 'react-router-dom'


function BoardCreatePage(props) {

    const user = useSelector(state => state.user);

    const [postTitle, setPostTitle] = useState("")
    const [content, setContent] = useState("");
    const [files, setFiles] = useState([]);

    const onTitleChange = (e) => {
        setPostTitle(e.currentTarget.value)
    }

    const onEditorChange = (value) => {
        setContent(value)
        
    }

    const onFilesChange = (files) => {
        setFiles(files)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setContent("");
        setPostTitle("");

        if( user.userData && !user.userData.isAuth) {
            return alert('Please log in!')
        }

        const variables = {
            title: postTitle,
            content: content,
            writer: user.userData._id
        }

        

        axios.post('/api/blog/createPost', variables )
        .then(response => {
            if(response.data.success) {
                alert('Post created!');

                setTimeout(() => {
                    props.history.push('/boardList')
                }, 1000);
            }
            
        })
    }

    return (
        <div>
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2 > 글 작성 </h2>
                </div>
                <form onSubmit={onSubmit}>
                    <Input 
                        onChange={onTitleChange}
                        value={postTitle}
                    />
                    <QuillEditor
                    placeholder={"Start Posting Something"}
                    onEditorChange={onEditorChange}
                    onFilesChange={onFilesChange}
                    />
                    <div style={{ textAlign: 'center', margin: '2rem', }}>
                        <button
                            className=""
                            onSubmit={onSubmit}
                        >
                            Submit
                    </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default withRouter(BoardCreatePage)
