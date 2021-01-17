import React, { useEffect, useState } from 'react';
import {Row, Col, List , Avatar} from 'antd';
import axios from 'axios';
import SideVideo from './sections/SideVideo';
import Subscribe from './sections/Subscribe';
import Comment from './sections/Comment';

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId
    const variable = {videoId : videoId}

    const [VideoDetail, setVideoDetail] = useState([])
    const [Comments, setComments] = useState([])

    useEffect(() => {
        
        axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if (response.data.success) {
                    setVideoDetail(response.data.videoDetail)
                } else {
                    alert('비디오 정보를 가져오길 실패했습니다')
                }
            })

        axios.post('/api/comment/getComments', variable)
            .then(response => {
                if (response.data.success) {
                    setComments(response.data.comments)
                    console.log(response.data.comments)
                } else {
                    alert('댓글 정보를 가져오길 실패했습니다')
                }
            })
    }, [])

    const refreshFunction = (newComment) => {
        setComments(Comments.concat(newComment))
    }

    if (VideoDetail.writer) {

        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />

        return (
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
    
                    <div style={{width:'100%', padding:'3rem 4rem'}}>
                        <video style={{width: '100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls ></video>
    
                        <List.Item
                            actions={[ subscribeButton ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image}/>}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>
    
                        <Comment refreshFunction={refreshFunction} commentLists={Comments} postId={videoId}/>
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
    
            </Row>
        )
    } else {
        return (
            <div>... Loading</div>
        )
    }

    
}

export default VideoDetailPage