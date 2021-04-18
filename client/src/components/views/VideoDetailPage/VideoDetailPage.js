import React,{ useEffect, useState } from 'react'
import Axios from 'axios'
import Comment from './Sections/Comment'
import LikeDislikes from './Sections/LikeDislikes'
import { withRouter } from 'react-router-dom'


function VideoDetailPage(props) {

    
    const videoId = props.match.params.videoId
    const variable = { videoId: videoId}
    const [user, setUser] = useState({})
    const [VideoDetail, setVideoDetail] = useState([])
    const [Comments, setComments] = useState([])

    useEffect(() => {
        Axios.get('/api/users/auth')
            .then(response => {
                if(response.data.isAuth) {
                    setUser(response.data)
                } else {
                    alert('회원정보를 가져오는 데 실패했습니다')
                }
            })
        
        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if(response.data.success) {
                    setVideoDetail(response.data.videoDetail)
                } else {
                    alert('비디오 정보를 가져오는 걸 실패했습니다')
                }
            })

        Axios.post('/api/comment/getComments', variable)
            .then(response => {
                if(response.data.success) {
                    setComments(response.data.comments)
                    console.log('detail',response.data.comments)
                } else {
                    alert('코멘트 정보를 가져오는 것을 실패했습니다')
                }
            })

    }, [])

    const refreshFunction = (newComment) => {
        setComments(Comments.concat(newComment))
    }

    if(VideoDetail.writer) {

        return (
            <div>
                <div>
                    <div style={{ width: '100%', padding: '3rem 4rem' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />
    
                        <div>
                            <LikeDislikes video userId={user._id} videoId={videoId} />
                            
                                <img src={VideoDetail.writer.image} />
                                <h2>{VideoDetail.writer.name}</h2>
                                <span>{VideoDetail.description}</span>
                            
                        </div>
    
                        {/* Comments */}
                        <Comment user={user} refreshFunction={refreshFunction} commentLists={Comments} postId={videoId} />
    
                    </div>
                </div>
            </div>
        ) 

    } else {

        return (

            <div>...loading</div>
        
        )
    }
    

    
}

export default withRouter(VideoDetailPage)