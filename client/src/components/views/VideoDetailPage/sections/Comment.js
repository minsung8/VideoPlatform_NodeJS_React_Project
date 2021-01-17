import Axios from 'axios'
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';

function Comment(props) {

    const videoId = props.postId;
    const user = useSelector(state => state.user)
    const [commnetValue, setcommnetValue] = useState("")


    const handleClick = (event) => {
        setcommnetValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()

        const variables = {
            content: commnetValue,
            writer: user.userData._id,
            postId: videoId
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

    return (
        <div>
            <br/>
            <p>Replies</p>
            <br/>

            { /*Comment List*/}


            {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}

            { /*Root Commnet Form*/}

            <from style={{ display:'flex'}} onSubmit={onSubmit} >
                <textarea style={{ width:'100%', borderRedius:'5px' }}
                        onChange={handleClick}
                        value={commnetValue}
                        placeholder="코멘트를 입력해주세요" />
                <br/>
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
            </from>
        </div>
    )
}

export default Comment