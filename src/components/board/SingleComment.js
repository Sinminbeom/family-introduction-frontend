import React, { useEffect, useState } from 'react';
import { Comment, Avatar, Input,Button } from 'antd';
import { PostServiceComponent } from '../service/ServiceComponent';
import './antdCustomize.less';

const { TextArea } = Input;

function SingleComment(props) {
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState('');

  // const user = useSelector((state) => state.user);

  const CallBack = (response) => {
    if(response.result){
      setCommentValue(''); //저장후 빈칸으로 만들기 위해
      // props.refreshFunction(response);
    }
    else{
      alert(response.message);
    }
  }

  const onsubmit = (event) => {
    event.preventDefault();

    if(!CommentValue){
      return alert('댓글 내용을 입력해주세요.'); 
    }

    var formData = new FormData();

    formData.append('BoardSeq',props.postSeq);
    formData.append('BoardCommentContent',CommentValue);
    formData.append('UpCommentSeq',props.comment.CommentSeq);
    formData.append('UserName',localStorage.getItem('UserName'));
    console.log('dfdfd');
    PostServiceComponent('http://49.168.71.214:8000/CommentSave.php',formData,CallBack);

    // const variables = {
    //   content: CommentValue,
    //   writer: user.userData._id,
    //   postId: props.postId,
    //   responseTo: props.comment._id,
    // };
    // Axios.post('/api/comment/saveComment', variables).then((response) => {
    //   if (response.data.success) {
    //     console.log(response.data.result);
    //     setCommentValue(''); //저장후 빈칸으로 만들기 위해
    //     props.refreshFunction(response.data.result);
    //   } else {
    //     alert('커멘트를 저장하지 못했습니다.');
    //   }
    // });
  };
  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };

  const onHandleChange = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.NickName}
        // avatar={<Avatar src={props.comment.writer.image} alt />}
        avatar={<Avatar />}
        content={<p>{props.comment.Comment}</p>}
      />
      {OpenReply && ( //openReply값이 true일때만 대댓글창을 보이게만듬
        <Form style={{ display: 'flex' }} onSubmit={onsubmit}>
          <Input
            style={{ width: '100%', borderRadius: '5px' }}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder="내용을 작성해 주세요"
          />
          <br />
          <Button style={{ width: '30%', height: '52px' }} onClick={onsubmit}>
            등록
          </Button>
        </Form>
      )}
    </div>
  );
}

export default SingleComment;