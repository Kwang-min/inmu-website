import React,{ useEffect, useState } from 'react'
import axios from 'axios';
import './BoardMainPage.css'
import { Link } from "react-router-dom";

function BoardMainPage() {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        axios.get('api/blog/getBlogs') 
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.blogs)
                    setBlogs(response.data.blogs)
                } else {
                    alert("couldn't get blog's lists")
                }
            })
    }, [])

    const renderCards = blogs.map((blog, index) => {
        return <>
            <Link to={`/board/post/${blog._id}`}>
                <div classNmae={`post post_${index}`}>
                    <div>
                        <img src="https://i.imgur.com/iAtcsNc.jpg" />
                    </div>
                    <div>
                        <img 
                        src={blog.writer.image ? blog.writer.image : 'https://i.imgur.com/hOvczEj.png'} 
                        className={'user_avatar'}
                        />
                        <span>{blog.writer.name}</span>
                    </div>
                    <div>
                        <span>{blog.title}</span>
                    </div>
                </div>
            </Link>
        </>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2> 인생뮤직 </h2>
            <div className={'postContainer'}>
                {renderCards}
            </div>
        </div>
    )
}

export default BoardMainPage
