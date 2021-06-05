import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import { Typography, Button, Form, Input } from 'antd';
import Axios from 'axios'
import { PlusOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'


const { TextArea } = Input;
const { Title } = Typography;

function VideoUploadPage(props) {
  const videoId = props.match.params.videoId;

  const user = useSelector(state => state.user);
  const [VideoTitle, setVideoTitle] = useState("")
  const [Description, setDescription] = useState("")
  const [ThumbnailPath, setThumbnailPath] = useState("")

  const onTitleChange = (e) => {
    setVideoTitle(e.currentTarget.value)
  }
  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      videoId: videoId,
      title: VideoTitle,
      description: Description,
    }

    Axios.post('/api/video/updateVideo', variables)
      .then(response => {
        if (response.data.success) {
          alert('성공적으로 수정 했습니다')
          props.history.push('/videoList')

        } else {
          alert('글 수정 실패했습니다')
        }
      })
  }

  useEffect(() => {
    Axios.post('/api/video/getVideoDetail', { postId: videoId })
      .then(response => {
        if (response.data.success) {
          setThumbnailPath(response.data.videoDetail.thumbnail)
          setVideoTitle(response.data.videoDetail.title)
          setDescription(response.data.videoDetail.description)
        } else {
          alert('비디오 정보를 가져오는 걸 실패했습니다')
        }
      })
  }, [])

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>글 수정</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Thumbnail */}
          {ThumbnailPath &&
            <div>

              <img src={`http://152.70.253.13:8000/${ThumbnailPath}`} alt={'thumbnail'} />

            </div>
          }

        </div>

        <br />
        <br />
        <label>Title</label>
        <Input
          onChange={onTitleChange}
          value={VideoTitle}
        />
        <br />
        <br />
        <label>Description</label>
        <TextArea
          onChange={onDescriptionChange}
          value={Description}
        />

        <br />
        <br />

        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
                    </Button>
      </Form>
    </div>
  )
}

export default withRouter(VideoUploadPage)
