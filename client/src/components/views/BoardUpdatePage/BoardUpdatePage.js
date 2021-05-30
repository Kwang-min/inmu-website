import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import QuillEditor from '../../editor/QuillEditor';
import { Button, Form, Input} from 'antd';
import axios from 'axios'

function BoardUpdatePage(props) {

  const user = useSelector(state => state.user);
  const postId = props.match.params.postId;
  const [postTitle, setPostTitle] = useState("")
  const [post, setPost] = useState([])

  const onTitleChange = (e) => {
    setPostTitle(e.currentTarget.value)
}

  
  useEffect(() => {
    
    const variable = { postId: postId }
		axios.post('/api/blog/getPost', variable)
			.then(response => {
				if (response.data.success) {

          setPost(response.data.post)
          setPostTitle(response.data.post.title)
        } else {
          alert('failed to bring post data')
        }
      })

  }, [])
  if (post.writer) {
    return (
      <div>
        {user.userData._id == post.writer._id &&
          <Form >
            <Input
              onChange={onTitleChange}
              value={postTitle}
            />
            {/* <QuillEditor
              placeholder={"Start Posting Something"}
              onEditorChange={onEditorChange}
              onFilesChange={onFilesChange}
            /> */}
            <div style={{ textAlign: 'center', margin: '2rem', }}>
              <Button type="primary" size="large" onClick>
                Submit
              </Button>
            </div>
          </Form>
        }
      </div>
    )
  } else {
    return (
      <div style={{ width: '80%', margin: '3rem auto' }}>loading...</div>
    )
  }

}

export default BoardUpdatePage
