import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import moment from 'moment'
import './VideoMainPage.css'

function VideoMainPage() {

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
                        <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                        <div className=" duration" >
                            <span>{minutes} : {seconds}</span>
                        </div>
                        </a>
                    </div>
                    
                    <br />
                    <div className={'video_metadata'}>
                        <img 
                        src={video.writer.image ? video.writer.image : 'data:image/jpeg;base64,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'} 
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
            <h2> 연주영상 </h2>
            <div className={'video_container'}>

                {renderCards}

            </div>
        </div>
    )
}

export default VideoMainPage
