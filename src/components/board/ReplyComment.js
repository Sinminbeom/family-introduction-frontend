import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [OpenReplyComments, setOpenReplyComments] = useState(false);
  useEffect(() => {
    let commentNumber = 0;
    props.commentList.map((comment, index) => {
      if (comment.UpCommentSeq === props.parentCommentId) {
        commentNumber++;
      }
      
    });
    setChildCommentNumber(commentNumber);
  }, [props.commentList]); //commentList가 바뀔때마다 실행이될 수 있도록해야됨
  const renderReplyComment = (parentCommentId) =>
    props.commentList.map((comment, index) => (
      <React.Fragment key={index}>
        {comment.UpCommentSeq === parentCommentId && (
          <div style={{ width: '80%', marginLeft: '40px' }}>
            <SingleComment
              // refreshFunction={props.refreshFunction}
              comment={comment}
              postSeq={props.postSeq}
            />
            <ReplyComment
              // refreshFunction={props.refreshFunction}
              commentList={props.commentList}
              postSeq={props.postSeq}
              parentCommentId={comment.CommentSeq}
            />
          </div>
        )}
      </React.Fragment>
    ));

  const onHandleChange = () => {
    setOpenReplyComments(!OpenReplyComments);
  };
  return (
    <div>
      {ChildCommentNumber > 0 && (
        <p
          style={{ fontSize: '14px', margin: '0', color: 'gray' }}
          onClick={onHandleChange}
        >
          View {ChildCommentNumber} more comment(s)
        </p>
      )}
      {OpenReplyComments && renderReplyComment(props.parentCommentId)}
      {/*대댓글을 달때 눌리며 나오고 아니면숨긴상태*/}
    </div>
  );
}

export default ReplyComment;