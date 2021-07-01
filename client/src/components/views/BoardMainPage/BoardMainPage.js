import React,{ useEffect, useState } from 'react'
import axios from 'axios';
import './BoardMainPage.css'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from 'antd'

function BoardMainPage() {
    const [blogs, setBlogs] = useState([])

    const user = useSelector(state => state.user);

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
        return <div key={index}>
            <Link to={`/board/post/${blog._id}`}>
                <div className={`post post_${index}`}>
                    <div>
                        <img src="https://i.imgur.com/iAtcsNc.jpg" />
                    </div>
                    <div className={'metadata'}>
                        <img 
                        src={blog.writer.image ? blog.writer.image : ''} 
                        className={'user_avatar'}
                        />
                        <span>{blog.writer.name}</span>
                    </div>
                    <div>
                        <span>{blog.title}</span>
                    </div>
                </div>
            </Link>
        </div>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2 style={{ fontWeight: '600'}}> 인뮤소식 </h2>
            <div className={'postContainer'}>
                {renderCards}
            </div>
            {user.userData&&user.userData.role === 1 &&
                <Link to={`/board/create`}>
                    <Button style={{ marginTop: '30px' }}>새 글 쓰기</Button>
                </Link>
            }
            
        </div>
    )
}

export default BoardMainPage
