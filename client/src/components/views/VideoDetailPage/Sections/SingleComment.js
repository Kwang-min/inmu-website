import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { saveComment } from '../../../../_actions/comment_actions';
import { deleteComment } from '../../../../_actions/comment_actions';
import { updateComment } from '../../../../_actions/comment_actions';

const { TextArea } = Input;

function SingleComment(props) {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const [OpenReply, setOpenReply] = useState(false);
    const [OpenUpdate, setOpenUpdate] = useState(false);
    const [CommentValue, setCommentValue] = useState("")
    const [UpdateValue, setUpdateValue] = useState(props.comment.content)

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }

    const onHandleChange = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const onUpdateChange = (event) => {
        setUpdateValue(event.currentTarget.value)
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

    const onClickUpdate = () => {
        setOpenUpdate(!OpenUpdate)
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

    const onUpdateSubmit = (event) => {
        event.preventDefault();

        if (user.userData && !user.userData.isAuth) {
            setUpdateValue(props.comment.content)
            return alert('Please log in!')
        }

        const variableForUpdate = {
            content: UpdateValue,
            _id: props.comment._id,
            postId: props.postId
        }
        dispatch(updateComment(variableForUpdate))
            .then(response => {
                console.log('response:',response)
                if (response.payload.success) {
                    setOpenUpdate(!OpenUpdate)
                    // setCommentValue("")
                } else {
                    alert('코멘트 정보를 가져오는 것을 실패했습니다')
                }
            })
    }

    let deleteButton;
    let updateButton;
    if (user.userData && props.comment.writer._id === user.userData._id) {
        if(!props.comment.isDeleted) {
            deleteButton = <span onClick={onClickDelete}> 삭제</span>;
            updateButton = <span onClick={onClickUpdate}> 수정</span>;
        }
    }

    let content;
    if(props.comment.isDeleted) {
        content = <p style={{ color: 'grey' }}>삭제된 댓글입니다</p>
    } else {
        content = <p> {props.comment.content} </p>
    }

    let commentHtml;
    if(!OpenUpdate) {
        commentHtml = <span>{content}</span>
    } else {
        commentHtml = <form onSubmit={onUpdateSubmit}>
        <textarea value={UpdateValue} onChange={onUpdateChange}></textarea>
        <input type="submit" value="수정" onClick={onUpdateSubmit} />
        </form>
    }



    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to"> 덧글 달기 </span>,
        deleteButton, updateButton
    ]

    return (
        <div>
            {/* <Comment
                actions={[...actions, deleteButton, updateButton]}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt />}
                content={comment}
            /> */}
            <div>
                <div>
                    <img
                        src={props.comment.writer.image}
                    />
                    <span>{props.comment.writer.name}</span>
                </div>
                <div>
                    {commentHtml}
                </div>
                <div>
                    {actions}
                </div>
            </div>

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
