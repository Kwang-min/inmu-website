import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import moment from 'moment'

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

        return <div>
            
                <div style={{ position: 'relative' }}>
                <a href={`/video/${video._id}`} >
                    <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                    <div className=" duration" >
                        <span>{minutes} : {seconds}</span>
                    </div>
                </a>
                </div>
            
            <br />
            <img src={video.writer.image} />
            <span>{video.title}</span>
            <span>{video.writer.name}</span> <br />
            <span style={{ marginLeft: '3rem' }}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
        </div>

    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2> Recommended </h2>
            <hr />
            <div>

                {renderCards}

            </div>
        </div>
    )
}

export default VideoMainPage
