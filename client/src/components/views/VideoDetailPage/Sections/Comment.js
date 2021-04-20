import React,{ useState } from 'react'
import Axios from 'axios'
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
import { useSelector } from "react-redux";

function Comment(props) {
    
    const videoId = props.postId;

    const user = useSelector(state => state.user);

    const [commentValue, setcommentValue] = useState("")

    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {

        event.preventDefault();

        const variables = {
            content : commentValue,
            writer : user.userData._id,
            postId : videoId
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success) {
                    setcommentValue("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('커멘트를 저장하지 못했어요')
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
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={videoId} /> 
                        <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} postId={videoId} commentLists={props.commentLists} />
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