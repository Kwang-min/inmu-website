import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
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

        const createdAt = moment(post.createdAt).format("YYYY-MM-DD HH:mm:ss") 

        return (
            <div className="postPage" style={{ width: '50%', margin: '3rem auto' }}>
                <h2>{post.title}</h2>
                <h3>작성자 {post.writer.name}</h3>
                <br />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <h2>{createdAt}</h2>
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
