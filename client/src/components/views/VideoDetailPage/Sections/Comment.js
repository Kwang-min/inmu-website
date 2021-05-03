import React,{ useState } from 'react'
import Axios from 'axios'
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { saveComment } from '../../../../_actions/comment_actions';

function Comment(props) {

    const dispatch = useDispatch();

    const videoId = props.postId;

    const user = useSelector(state => state.user);

    const [commentValue, setcommentValue] = useState("")

    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {

        event.preventDefault();

        if( user.userData && !user.userData.isAuth) {
            setcommentValue("")
            return alert('Please log in!')
        }

        const variables = {
            content : commentValue,
            writer : user.userData._id,
            postId : videoId
        }

        dispatch(saveComment(variables))
        .then(response => {
            if(response.payload.success) {
                setcommentValue("")
            } else {
                alert('코멘트 정보를 가져오는 것을 실패했습니다')
            } 
        })

    }
    return (
        <div>
            <br />
            <p> Replies </p>
            <hr />


            {/* Comment List */}
            {props.commentLists && props.commentLists.map((comment, index) => (
                (!comment.responseTo && 
                    <React.Fragment>
                        <SingleComment comment={comment} postId={videoId} /> 
                        <ReplyComment parentCommentId={comment._id} postId={videoId} commentLists={props.commentLists} />
                    </React.Fragment>
                )
                
            ) )}
            

            {/* Root Comment Form */}

            <form style={{ display : 'flex', marginTop: '2rem' }} onSubmit={onSubmit}>
                <textarea 
                    style={{ width : '100%', borderRadius : '5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해 주세요 "
                />

                <br />
                <button style={{ width : '20%', height : '52px', marginLeft:'1rem' }} onClick={onSubmit} >Submit</button>

            </form>
        </div>
    )
}

export default Comment
