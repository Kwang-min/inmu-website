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
						props.history.push('/boardList')

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
			<div className="postPage" style={{ width: '50%', margin: '1rem auto' }}>
				<h2 style={{ fontWeight: '600'}}>{post.title}</h2>
				<span>작성자 {post.writer.name} | {createdAt} </span>
				<br /><br /><hr /><br />
				<div dangerouslySetInnerHTML={{ __html: post.content }} />
				{user.userData && user.userData._id == post.writer._id &&
					<>
					<Link to={`/board/update/${postId}`}>
						<Button>글 수정</Button>
					</Link>
					<Button onClick={deleteHandler}>글 삭제</Button>
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
