
import { useRef, useState } from "react";
import { useQueryClient } from "react-query";

import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserInfoAtom } from "../atom/atom";

import styled from "styled-components";
import person from "../styles/images/person.png";
import {
  useEditComment,
  useRemoveComment,
  usePostReply,
} from "../hook/useCommentData";
import DropDown from "./DropDown";

const Comment = ({ data }) => {
  //대댓글 드롭다운 열기/닫기
  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  const params = useParams();
  const id = params.postId;
  const replyId = data.commentId;
  const comment_ref = useRef("");
  const replyRef = useRef("");
  const [isEdit, setIsEdit] = useState(false);

  const isLogin = useRecoilValue(UserInfoAtom);

  const loginUser = isLogin?.nickname;
  const writeUser = data.nickname;
  //console.log(writeUser, "글쓴이");


  const queryClient = useQueryClient();
  const { mutateAsync: editComment } = useEditComment();
  const { mutateAsync: removeComment } = useRemoveComment();


  const modifyCommentClick = async (commentId) => {
    const commentData = {id,commentId,content:comment_ref.current.value};
    setIsEdit(false);
    await editComment(commentData);
    queryClient.invalidateQueries("commentList");
  };

  const deleteCommentClick = async (commentId) => {
    const commentData = { commentId, id };
    await removeComment(commentData);
    queryClient.invalidateQueries("commentList");
  };

  // 대 댓글 작성
  const { mutateAsync: addReply } = usePostReply();

  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      addReplyClick();
    }
  };

  const addReplyClick = async () => {
    const replyData = { replyId, content: replyRef.current.value };
    await addReply(replyData);
    replyRef.current.value = "";
    queryClient.invalidateQueries("commentList");
  };





  return (
  
      <div>
        <User >
          <Img src={data.profileImg || person} alt="사진" />
          <p>{data.nickname}</p>
        </User>
        <Content>
          {isEdit ? (
            <input
              type="text"
              defaultValue={data.content}
              ref={comment_ref}
            />
          ) : (
            <p>{data.content}</p>
          )}
          <p>{data.modifiedAt.substring(0, 10)}</p>
          <button
            style={{ marginLeft: "10px" }}
            onClick={(e) => setDropdownVisibility(!dropdownVisibility)}
          >
            {dropdownVisibility ? "닫기" : "답글 쓰기"}
          </button>
        </Content>

        <Btn>
          {loginUser === writeUser && (
            <>
              {isEdit ? (
                <UpdateBtn

                  onClick={() => {
                    modifyCommentClick(data.commentId);
                  }}
                >
                  등록
                </UpdateBtn>
              ) : (
                <ModiBtn onClick={() => setIsEdit(true)}>수정</ModiBtn>
              )}
              <DeleteBtn
                onClick={() => {
                  deleteCommentClick(data.commentId);
                }}
              >
                삭제
              </DeleteBtn>
            </>
          )}
        </Btn>
        {/* 대 댓글 작성할 수 있는 input 박스 */}
        <div className="commentList">
          <DropDown visibility={dropdownVisibility}>
            <ul>
              <li>
                <Wrap>
                  <CommentBox>
                    <Input
                      type="text"
                      placeholder="댓글을 남겨주세요"
                      ref={replyRef}
                      onKeyPress={onCheckEnter}
                    />
                    <Button onClick={addReplyClick}>등록하기</Button>
                  </CommentBox>
                </Wrap>
              </li>
            </ul>
          </DropDown>
        </div>
      </div>
   
  );
};

const User = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;

  p {
    font-weight: 500;
  }
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;
const Content = styled.div`
  margin-top: 10px;
  line-height: 2;
  input {
    width: 100%;
    border: 1px solid #e2e2e2;
    border-radius: 8px;
    padding: 10px;
  }
  & p:last-child {
    color: #777777;
  }
`;

const Date = styled.span`
  font-size: 14px;
`;

const Btn = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ModiBtn = styled.button`
  background-color: ${(props) => props.theme.backgroundColor};
  border: 1px solid #777777;
  border-radius: 8px;
  padding: 4px 12px;
  width: 69px;
  height: 32px;
  font-size: 12px;
  font-weight: 400;
  margin-left: 10px;
`;

const DeleteBtn = styled(ModiBtn)`
  border-color: #ff0000;
  color: #ff0000;
`;

const UpdateBtn = styled(ModiBtn)`
  color: ${(props) => props.theme.textColor};
`;

const Wrap = styled.div`
  background-color: ${(props) => props.theme.divBackGroundColor};
  margin: auto;

  box-sizing: border-box;
`;
const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 140px;
  margin-top: 20px;
`;
const Input = styled.input`
  width: 100%;
  height: 88px;
  padding: 12px;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  outline: none;
  background-color: ${(props) => props.theme.inputBoxBackground};
`;

const Button = styled.button`
  background: #ffb673;
  color: #fff;
  width: 92px;
  height: 40px;
  font-weight: 700;
  border-radius: 8px;
  border: none;
  padding: 8px 12px;
  position: absolute;
  right: 0;
  bottom: 0;

  font-size: 15px;

  cursor: pointer;
  :hover {
    background-color: #ff891c;
  }
  :active {
    background-color: #d26500;
  }
`;
export default Comment;
