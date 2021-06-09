import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import moment from 'moment'
import './VideoMainPage.css'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from 'antd'

function VideoMainPage() {

    const user = useSelector(state => state.user);

    const [Video, setVideo] = useState([])


    useEffect(() => {

        Axios.get('/api/video/getVideos')
            .then(response => {

                if (response.data.success) {
                    setVideo(response.data.videos)
                    console.log(response.data.videos)
                } else {
                    alert('비디오 가져오기를 실패했습니다')
                }

            })

    }, [])

    const renderCards = Video.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));

        return <div className={video} key={index}>
                    
                    <div className={'video_thumbnail'} style={{ position: 'relative' }}>
                        <a href={`/video/${video._id}`} >
                        <img style={{ width: '100%' }} alt="thumbnail" src={`http://152.70.253.13:8000/${video.thumbnail}`} />
                        <div className=" duration" >
                            <span>{minutes} : {seconds}</span>
                        </div>
                        </a>
                    </div>
                    
                    <br />
                    <div className={'video_metadata'}>
                        <img 
                        src={video.writer.image ? video.writer.image : ''} 
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '1rem'}}>
                        <span style={{ fontWeight: '700'}}>{video.title}</span>
                        <span style={{ fontWeight: '600', color: 'grey' }}>{video.writer.name}</span> 
                        <div style={{ display: 'flex' }}>
                        <span>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
                        </div>
                        </div>
                    </div>
                </div>

    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2> 수강생 연주 </h2>
            <div className={'video_container'}>

                {renderCards}

            </div>
            {user.userData&&user.userData._id &&
                <Link to={`/video/upload`}>
                    <Button style={{ marginTop: '30px' }}>새 영상 업로드</Button>
                </Link>
            }
            
        </div>
    )
}

export default VideoMainPage
