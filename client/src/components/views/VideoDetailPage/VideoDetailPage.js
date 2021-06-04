import React, { useEffect, useState } from 'react'
import { Row, Col, List, Avatar, Button } from 'antd'
import Axios from 'axios'
import Comment from './Sections/Comment'
import LikeDislikes from './Sections/LikeDislikes'
import { withRouter } from 'react-router-dom'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { getComment } from '../../../_actions/comment_actions';


function VideoDetailPage(props) {

	const dispatch = useDispatch();

	const user = useSelector(state => state.user);
	const commentList = useSelector(state => state.comment);

	const videoId = props.match.params.videoId
	const variable = { postId: videoId }
	const [VideoDetail, setVideoDetail] = useState([])

	useEffect(() => {

		dispatch(getComment(variable))
			.then(response => {
				if (response.payload.success) {

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

	const deleteHandler = () => {
		if(window.confirm('영상을 삭제하시겠습니까?')) {
			
			Axios.post('/api/video/deleteVideo', variable)
				.then(response => {
					if (response.data.success) {
						alert('게시물 삭제 성공');
						props.history.push('/videoList')

					} else {
						alert('게시물 삭제를 실패했습니다')
					}
				})
		} else {

		}
	}


	if (VideoDetail.writer) {
		let updateButton;
		let deleteButton;
		if (user.userData && user.userData._id == VideoDetail.writer._id) {
			deleteButton = <Button onClick={deleteHandler}>삭제</Button>
			updateButton = <Link to={`/video/update/${videoId}`}>
			<Button>수정</Button>
			</Link>
		} else {
			
		}

		return (
			<Row gutter={[16, 16]}>
				<Col lg={18} xs={24}>
					<div style={{ width: '100%', padding: '3rem 4rem' }}>
						<video style={{ width: '100%' }} src={`http://localhost:8000/${VideoDetail.filePath}`} controls />

						<List.Item
							actions={[ updateButton, deleteButton]}
						>
							<List.Item.Meta
								avatar={<Avatar src={VideoDetail.writer.image} />}
								title={VideoDetail.writer.name}
								description={VideoDetail.description}
							/>
						</List.Item>

						{/* Comments */}
						{commentList.commentList &&
							<Comment commentLists={commentList.commentList.comments} postId={videoId} />
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