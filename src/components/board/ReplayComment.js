import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";
import { ViewMore } from "../../styles/Comment";

function ReplayComment({ post_id, comment, userData, Comments, setComments }) {
  const [childCommentNumber, setchildCommentNumber] = useState(0);
  const [openReply, setopenReply] = useState(false);

  const onClickViewMore = () => {
    setopenReply(!openReply);
  };
  
  
  // ===============================================
  // 댓글에 몇 개의 대댓글이 있는지 계산하는 로직입니다.
  // ===============================================

  useEffect(() => {
    let commentNumber = 0;
    //  댓글 전체 리스트를 가져온 후 각 댓글의 responseTo가 현제 렌더하는 comment의 _id와 일치하는 갯수
    Comments.map((el) => {
      if (el.responseTo === comment._id) {
        commentNumber++;
      }
    });
    setchildCommentNumber(commentNumber);
  }, [Comments]);


  // ====================================================================
  // 댓글의 아이디(parentId)와 같은 id를 responseTo로 가진 것을 렌더합니다.
  // 대댓글 아래 대댓글이 있을 수 있으므로 SingleComment, ReplyComment를 같이 적어줍시다.
  // ====================================================================
  
  const RenderReply = (parentId) =>
    Comments.map((comment, index) => (
      <>
        {comment.responseTo === parentId && (
          <div style={{ width: "80%", marginLeft: "40px" }}>
            <SingleComment
              key={index}
              post_id={post_id}
              comment={comment}
              userData={userData}
              Comments={Comments}
              setComments={setComments}
            />
            <ReplayComment
              key={index}
              post_id={post_id}
              comment={comment}
              userData={userData}
              Comments={Comments}
              setComments={setComments}
            />
          </div>
        )}
      </>
    ));

  // ==================================
  // 실질적으로 렌더하는 부분입니다.
  // ==================================
  return (
    <>
      {childCommentNumber > 0 && (
        <ViewMore onClick={onClickViewMore}>
          {openReply ? "▼" : "▶"}
          {childCommentNumber}개의 댓글
        </ViewMore>
      )}
      {openReply && RenderReply(comment._id)}
    </>
  );
}

export default ReplayComment;