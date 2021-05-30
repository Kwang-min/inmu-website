import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useSelector } from "react-redux";
import { withRouter } from 'react-router-dom'
import { Button } from "antd"
import { Link } from "react-router-dom";


function BoardDetailPage(props) {

	const postId = props.match.params.postId;

	const user = useSelector(state => state.user);

	const [post, setPost] = useState([])

	useEffect(() => {

		const variable = { postId: postId }
		axios.post('/api/blog/getPost', variable)
			.then(response => {
				if (response.data.success) {

					setPost(response.data.post)
				} else {
					alert('failed to bring post data')
				}
			})

	}, [])

	const deleteHandler = () => {
		if(window.confirm('정말 삭제하시겠습니까?')) {
			const variable = { postId: postId }
			axios.post('/api/blog/deletePost', variable)
				.then(response => {
					if (response.data.success) {
						alert('글 삭제 성공');

						setTimeout(() => {
							props.history.push('/boardList')
						}, 1000);

					} else {
						alert('글 삭제를 실패했습니다')
					}
				})
		} else {

		}
	}

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
				{user.userData._id == post.writer._id &&
					<>
					<Button onClick={deleteHandler}>글 삭제</Button>
					<Link to={`/board/update/${postId}`}>
						<Button>글 수정</Button>
					</Link>
					</>
				}

			</div>
		)
	} else {
		return (
			<div style={{ width: '80%', margin: '3rem auto' }}>loading...</div>
		)
	}
}

export default withRouter(BoardDetailPage)
