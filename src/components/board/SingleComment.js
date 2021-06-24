import React, { useEffect, useState } from "react";

function SingleComment({ post_id, comment, userData, Comments, setComments }) {
    const [commentContents, setcommentContents] = useState("");
    const [showReplyInput, setshowReplyInput] = useState(false);
  
  
    const onReplyClick = () => {
      setshowReplyInput(!showReplyInput);
    };
  
    const textareaChange = (e) => {
      setcommentContents(e.target.value);
    };
  
    const commentSubmit = (e) => {
      e.preventDefault();
  
      if (commentContents === "") {
        alert("내용을 입력해주세요");
        return;
      }
  
      let body = {
        contents: commentContents,
        post_id: post_id,
        writer_nickname: userData.nickname,
        responseTo: comment._id,
      };
  
      axios.post("/api/comment/save", body).then((res) => {
        // 댓글을 썼으니 댓글창을 닫아야 합니다.
        setshowReplyInput(false);
        if (res.data.commentsaved) {
          setComments(Comments.concat(res.data.comment));
        } else {
          alert("코멘트 저장에 실패했습니다.");
        }
      });
    };
  
  
    return (
      <>
        <Comment
          key={comment._id}
          actions={actions}
          author={<a>{comment.writer_nickname}</a>}
          avatar={
            <Avatar src={comment.writer_image} alt={comment.writer_nickname} />
          }
          content={<ContentsWrapper>{comment.contents}</ContentsWrapper>}
          datetime={<DateRefining dateString={comment.createdAt} />}
        />
        
        // reply 버튼을 누르면 Input이 열리도록 했습니다.
        // 최상단의 Input과 동일합니다.
        {showReplyInput && (
          <CommentInput>
            <textarea
              onChange={textareaChange}
              placeholder={"1000자 제한이 있습니다"}
              className="textarea"
            ></textarea>
            <button className="submit" onClick={commentSubmit}>
              댓글달기
            </button>
          </CommentInput>
        )}
      </>
    );
  }
  
  export default SingleComment;