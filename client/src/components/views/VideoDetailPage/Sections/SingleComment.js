import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import LikeDislikes from './LikeDislikes';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { saveComment } from '../../../../_actions/comment_actions';
import { deleteComment } from '../../../../_actions/comment_actions';

const { TextArea } = Input;

function SingleComment(props) {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const [OpenReply, setOpenReply] = useState(false);
    const [CommentValue, setCommentValue] = useState("")

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }

    const onHandleChange = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const onClickDelete = () => {
        
        const variableForDelete = {
            _id: props.comment._id,
            postId: props.postId
        }

        dispatch(deleteComment(variableForDelete))
            .then(response => {
                if (response.payload.success) {
                    console.log('hi')
                } else {
                    alert('코멘트 정보를 가져오는 것을 실패했습니다')
                }
            })

    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (user.userData && !user.userData.isAuth) {
            setCommentValue("")
            return alert('Please log in!')
        }

        const variableForSave = {
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id
        }

        dispatch(saveComment(variableForSave))
            .then(response => {
                if (response.payload.success) {
                    setCommentValue("")
                } else {
                    alert('코멘트 정보를 가져오는 것을 실패했습니다')
                }
            })



    }

    let deleteButton;
    if (props.comment.writer._id === user.userData._id) {
        if(!props.comment.isDeleted) {
            deleteButton = <span onClick={onClickDelete}> 삭제</span>;
        }
    }

    let comment;
    if(props.comment.isDeleted) {
        comment = <p style={{ color: 'grey' }}>삭제된 댓글입니다</p>
    } else {
        comment = <p> {props.comment.content} </p>
    }

    const actions = [
        <LikeDislikes userId={user.userData._id} commentId={props.comment._id} />
        , <span onClick={onClickReplyOpen} key="comment-basic-reply-to"> Reply to </span>
    ]
    return (
        <div>
            <Comment
                actions={[...actions, deleteButton]}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt />}
                content={comment}
            />
            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={onHandleChange}
                        value={CommentValue}
                        placeholder="코멘트를 작성해 주세요 "
                    />

                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit} >Submit</Button>

                </form>
            }

        </div>
    )
}


export default SingleComment
