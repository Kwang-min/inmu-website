import React,{ useEffect, useState } from 'react'
import axios from 'axios';
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
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
        return <div>
            <div style={{ width: 370, marginTop: 16 }}>
                <div>
                    <SettingOutlined key="setting" />
                    <EditOutlined key="edit" />
                    <Link to={`/board/post/${blog._id}`}><EllipsisOutlined key="ellipsis" /></Link>
                </div>
                <div>
                    
                    <img src={blog.writer.image} />
                    
                    <span>{blog.writer.name}</span>
                    <span>this is description</span>
                </div>
                <div style={{ height: 150, overflowY: 'scroll', marginTop: 10 }}>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
            </div>
        </div>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto'}}>
            <h2> Blog Lists </h2>
            <div>
                {renderCards}
            </div>
        </div>
    )
}

export default BoardMainPage
