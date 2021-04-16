import React,{ useState, useEffect } from 'react'
import axios from 'axios';
import QuillEditor from '../../editor/QuillEditor';
import { withRouter } from 'react-router-dom'


function BoardCreatePage(props) {

    const [user, setUser] = useState()
    const [content, setContent] = useState("");
    const [files, setFiles] = useState([]);

    useEffect(() => {
        console.log(user)
        axios.get('/api/users/auth')
        .then(response => {
            if(response.data.isAuth) {
                setUser(response.data)
            } else {
                alert('회원정보를 가져오는 데 실패했습니다')
            }
        })
        
    }, [])

    const onEditorChange = (value) => {
        setContent(value)
        
    }

    const onFilesChange = (files) => {
        setFiles(files)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setContent("");

        if( user && !user.isAuth) {
            return alert('Please log in!')
        }

        const variables = {
            content: content,
            writer: user._id
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
