import React, { useEffect, useState } from 'react'
import { Row, Col, List, Avatar } from 'antd'
import Axios from 'axios'
import Comment from './Sections/Comment'
import LikeDislikes from './Sections/LikeDislikes'
import { withRouter } from 'react-router-dom'
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { getComment } from '../../../_actions/comment_actions';


function VideoDetailPage(props) {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const commentList = useSelector(state => state.comment);
    
    const videoId = props.match.params.videoId
    const variable = { videoId: videoId }
    const [VideoDetail, setVideoDetail] = useState([])

    useEffect(() => {

        dispatch(getComment(variable))
        .then(response => {
            if(response.payload.success) {
                
            } else {
                alert('코멘트 정보를 가져오는 것을 실패했습니다')
            } 
        })

        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if (response.data.success) {
                    setVideoDetail(response.data.videoDetail)
                } else {
                    alert('비디오 정보를 가져오는 걸 실패했습니다')
                }
            })
        
    }, [])

    if (VideoDetail.writer) {

        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding: '3rem 4rem' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />

                        <List.Item
                            actions={[<LikeDislikes video userId={user.userData._id}
                                videoId={videoId} />]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>

                        {/* Comments */}
                        {commentList.commentList && 
                            <Comment  commentLists={commentList.commentList.comments} postId={videoId} />
                        }
                        

                    </div>
                </Col>
                <Col lg={6} xs={24}>

                </Col>
            </Row>
        )

    } else {

        return (

            <div>...loading</div>

        )
    }



}

export default withRouter(VideoDetailPage)