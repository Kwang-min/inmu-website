import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from "react-redux";
import QuillEditor from '../../editor/QuillEditor';
import { Button, Form, Input } from 'antd';
import axios from 'axios'

function BoardUpdatePage(props) {

  const user = useSelector(state => state.user);
  const postId = props.match.params.postId;
  const [post, setPost] = useState([])
  const [postTitle, setPostTitle] = useState("")
  const [content, setContent] = useState("");
  // const [files, setFiles] = useState([]);

  const editorRef = useRef();

  const onTitleChange = (e) => {
    setPostTitle(e.currentTarget.value)
  }

  const onEditorChange = (value) => {
    setContent(value)

  }

  const onSubmit = (event) => {
    event.preventDefault();
  
    if (user.userData && !user.userData.isAuth) {
      return alert('Please log in!')
    }
    //submit시에 퀼 에디터 안의 이미지 목록을 가져오는 함수 호출
    const fileList = editorRef.current.getFileList()

    const variables = {
      postId: postId,
      title: postTitle,
      content: content,
      writer: user.userData._id,
      files: fileList
    }
    console.log('variables', variables)


    axios.post('/api/blog/updatePost', variables)
      .then(response => {
        if (response.data.success) {
          alert('successfully updated!');

          setTimeout(() => {
            props.history.push('/boardList')
          }, 1000);
        } else {
          alert('오류가 났습니다')
          props.history.push('/boardList')
        }

      })
  }


  useEffect(() => {

    const variable = { postId: postId }
    axios.post('/api/blog/getPost', variable)
      .then(response => {
        if (response.data.success) {

          setPost(response.data.post)
          setPostTitle(response.data.post.title)
          setContent(response.data.post.content)
          // setFiles(response.data.post.files)
        } else {
          alert('failed to bring post data')
        }
      })

  }, [])

  if (post.writer) {
    return (
      <div>
        {user.userData._id == post.writer._id &&
          <Form onSubmit={onSubmit} >
            <Input
              onChange={onTitleChange}
              value={postTitle}
            />
            <QuillEditor
              ref={editorRef}
              placeholder={"Start Posting Something"}
              existing={post.content}
              onEditorChange={onEditorChange}
              // onFilesChange={onFilesChange}
            />
            <div style={{ textAlign: 'center', margin: '2rem', }}>
              <Button type="primary" size="large" onClick={onSubmit}>
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
