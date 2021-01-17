import React, { useState } from 'react';
import { Comment, Avatar, Button, Input } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';

const { TextArea } = Input;

function SingleComment(props) {

    const user = useSelector(state => state.user)

    const [OpenReply, setOpenReply] = useState(true);
    const [CommentValue, setCommentValue] = useState("");

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply);
    }

    const onHandleChange = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id
        } 


        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.result)

                    props.refreshFunction(response.data.result)
                } else {
                    alert('커멘트를 저장하지 못했습니다.')
                }
            })
        

    }

    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={
                    <Avatar
                        src={props.comment.writer.image}
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            ></Comment>


            {OpenReply && 
                <from style={{ display:'flex'}} onSubmit={onSubmit} >
                    <textarea style={{ width:'100%', borderRedius:'5px' }}
                            onChange={onHandleChange}
                            value={CommentValue}
                            placeholder="코멘트를 입력해주세요" />
                    <br/>
                    <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
                </from>
            }


        </div>
    )
}

export default SingleComment