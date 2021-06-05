import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Typography, Button, Form, Input} from 'antd';
import Axios from 'axios'
import { PlusOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'


const { TextArea } = Input;
const { Title } = Typography;

function VideoUploadPage(props) {

    const user = useSelector(state => state.user);
    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [ThumbnailPath, setThumbnailPath] = useState("")

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }
    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        formData.append("file", files[0])

        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)

                    let variable = {
                        url: response.data.url,
                        fileName: response.data.fileName
                    }

                    setFilePath(response.data.url)

                    Axios.post('/api/video/thumbnail', variable)
                        .then(response => {
                            if (response.data.success) {

                                setDuration(response.data.fileDuration)
                                setThumbnailPath(response.data.url)
                            } else {
                                alert('썸네일 생성에 실패했습니다')
                            }
                        })


                } else {
                    alert("비디오 업로드 실패!")
                }
            })


    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            title: VideoTitle,
            description: Description,
            filePath: FilePath,
            duration: Duration,
            thumbnail: ThumbnailPath,

        }

        Axios.post('/api/video/uploadVideo', variables)
            .then(response => {
                if (response.data.success) {
                    alert('성공적으로 업로드를 했습니다')
                    props.history.push('/videoList')

                } else {
                    alert('비디오 업로드에 실패했습니다')
                }
            })
    }
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        {/* Drop Zone */}
                        <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={1000000000}
                        >
                        {({ getRootProps, getInputProps}) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgrey', display: 'flex',
                            alignItems: 'center', justifyContent: 'center'}} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <PlusOutlined style={{ fontSize: '3rem' }} />

                            </div>
                        )}
                        </Dropzone>
                        {/* Thumbnail */}
                        {ThumbnailPath && 
                            <div>

                            <img src={`http://152.70.253.13:8000/${ThumbnailPath}`} alt={'thumbnail'} />

                            </div>
                        }
                        
                </div>

                <br />
                <p style={{ color: 'grey'}}>업로드를 한 후 오른쪽에 썸네일이 생길 떼까지 기다려주세요.</p>
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
