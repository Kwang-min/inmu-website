import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'


function BoardDetailPage(props) {

    const postId = props.match.params.postId;

    const [post, setPost] = useState([])
    
    useEffect(() => {

        const variable = { postId: postId }
        axios.post('/api/blog/getPost', variable)
            .then( response => {
                if(response.data.success) {
                    
                    setPost(response.data.post)
                } else {
                    alert('failed to bring post data')
                }
            })

    }, [])

    if (post.writer) {
        return (
            <div className="postPage" style={{ width: '80%', margin: '3rem auto' }}>
                <h2>{post.writer.name}`s Post</h2>
                <br />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <h2>{post.createdAt}</h2>
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />

            </div>
        )
    } else {
        return (
            <div style={{ width: '80%', margin: '3rem auto' }}>loading...</div>
        )
    }
}

export default withRouter(BoardDetailPage)
