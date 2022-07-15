import { LineBtn, ListProfilePic, ListStack, ListTitle, MainBody, PostBody } from "../styles/style"
import { ReactComponent as BookmarkIcon } from "../styles/icon/post/bookmark.svg";
import { ReactComponent as BookmarkFill } from "../styles/icon/post/bookmarkFill.svg";
import { useRecoilValue } from "recoil";
import { UserInfoAtom } from "../atom/atom";
import { useEffect, useState } from "react";
import instance from "../shared/axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as DefaultProfile } from "../styles/icon/global/profile.svg"
import { ReactComponent as CommentCnt } from "../styles/icon/post/commentCnt.svg";
import { ReactComponent as BookmarkCnt } from "../styles/icon/post/bookmarkCnt.svg"
import { useMutation } from "react-query";
import axios from "axios";
import UserBookmark from "./UserBookmark";

const MyPagePostList = ({
    data,
    viewApplyModal,
    isApply,
    isMyBookmark,
    DoBookmark,
    currentTab
}) => {

    const navigate = useNavigate()
    const userInfo = useRecoilValue(UserInfoAtom);




    const cancelApply = async (postId) => {
        alert('지원을 취소하시겠습니까?')
        try {
            return await instance.post(`/api/apply/${postId}`)
        } catch (error) {
            alert(error)
        }
    }

    const { mutate } = useMutation(cancelApply)

    return (
        <>


            <PostBody key={data.postId} >
                <HeadBody>
                    {data.profileImg === null ? <DefaultProfile style={{ width: "40px", height: "40px" }} />
                        : <ListProfilePic src={data.profileImg} />}
                    {data.nickname}
                    {data.bookMarkStatus ? 
                    <UserBookmark postId={data.postId} 
                    bookmarkStatus={data.bookMarkStatus} 
                    currentTab={currentTab}/>
                    :
                    <UserBookmark postId={data.postId} currentTab={currentTab}/>}
                </HeadBody>

                <ListTitle onClick={() => navigate(`/detail/${data.postId}`)}>
                    {data.title}
                </ListTitle>
                <ListContent>
                    {data.content}
                    <div>
                        {data.stacks.map((stack, index) => {
                            return (
                                <ListStack key={index}>#{stack}</ListStack>
                            )
                        })}
                    </div>

                </ListContent>



                <ListBottom>
                    시작 예정일 {data.startAt}
                    <Count>
                        <CommentCnt /> {data.commentCnt}
                        <BookmarkCnt /> {data.bookmarkCnt}
                    </Count>

                </ListBottom>
                {isApply ?
                    <MyPageBtn onClick={() => mutate(data.postId)} >지원 취소하기</MyPageBtn>
                    : null}

                {data.nickname === userInfo.nickname ?
                    <MyPageBtn onClick={() => viewApplyModal(data.postId)} >지원자 보기</MyPageBtn>
                    : null}
            </PostBody>




        </>

    )
}


const HeadBody = styled.div`
gap:8px;
margin-bottom: 16px;
display: flex;
align-items: center;
`;

const ListContent = styled.div`
line-height: 16px;
font-size: 14px;
margin-top: 8px;
gap:8px;
display: flex;
flex-direction: column;
`;

const ListBottom = styled.div`
display: flex;
align-items: flex-end;
gap:5px;
font-size: 13px;
margin-top: 18px;
`;

const Count = styled(ListBottom)`
margin-top: 0px;
margin-left: auto;
`;

const MyPageBtn = styled(LineBtn)`
margin-top: 24px;
width: 100%;
`;

const BookmarkButton = styled.div`
background-color: blue;
width: 30px;
height: 30px;
position: relative;
right: 59px;
z-index: 20;
`;



export default MyPagePostList;
