import React,{ useState } from 'react'
import axios from 'axios';
import QuillEditor from '../../editor/QuillEditor';
import { useSelector } from "react-redux";
import { withRouter } from 'react-router-dom'


function BoardCreatePage(props) {

    const user = useSelector(state => state.user);

    const [content, setContent] = useState("");
    const [files, setFiles] = useState([]);

    

    const onEditorChange = (value) => {
        setContent(value)
        
    }

    const onFilesChange = (files) => {
        setFiles(files)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setContent("");

        if( user.userData && !user.userData.isAuth) {
            return alert('Please log in!')
        }

        const variables = {
            content: content,
            writer: user.userData._id
        }

        

        axios.post('/api/blog/createPost', variables )
        .then(response => {
            if(response.data.success) {
                alert('Post created!');

                setTimeout(() => {
                    props.history.push('/blog')
                }, 2000);
            }
            
        })
    }

    return (
        <div>
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2 > Editor</h2>
                </div>
                <QuillEditor
                    placeholder={"Start Posting Something"}
                    onEditorChange={onEditorChange}
                    onFilesChange={onFilesChange}
                />

                <form onSubmit={onSubmit}>
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
