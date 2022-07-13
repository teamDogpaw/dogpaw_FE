import { LineBtn, ListProfilePic, ListStack, ListTitle, MainBody, PostBody } from "../styles/style"
import { ReactComponent as BookmarkIcon } from "../styles/icon/u_bookmark.svg";
import { ReactComponent as BookmarkFill } from "../styles/icon/bookmarkFill.svg";
import { useRecoilValue } from "recoil";
import { UserInfoAtom } from "../atom/atom";
import { useState } from "react";
import instance from "../shared/axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as DefaultProfile } from "../styles/icon/profile.svg"
import { ReactComponent as CommentCnt } from "../styles/icon/u_comment-alt-lines.svg";
import { ReactComponent as BookmarkCnt} from "../styles/icon/bookmarkIcon.svg"

const MyPagePostList = ({
    data,
    viewApplyModal
}) => {
    const navigate = useNavigate()
    const userInfo = useRecoilValue(UserInfoAtom);
    const [isMyBookmark, setIsMyBookmark] = useState(<BookmarkFill />);
    console.log(data)

    const DoBookmark = async (postId) => {

        setIsMyBookmark((prev) => !prev)
        const response = await instance.post(`/api/bookMark/${postId}`)
        return response.data
    }

    return (
        <>
            {/* <Link to={`/detail/${data.postId}`}> */}
            <PostBody key={data.postId} onClick={()=>navigate(`/detail/${data.postId}`)}>
                <HeadBody>
                    {data.profileImg === null ? <DefaultProfile style={{ width: "40px", height: "40px" }} />
                        : <ListProfilePic src={data.profileImg} />}
                    {data.nickname}
                    {isMyBookmark ? <BookmarkFill style={{marginLeft:"auto"}} onClick={() => { DoBookmark(data.postId) }} />
                        : <BookmarkIcon style={{marginLeft:"auto"}} onClick={() => { DoBookmark(data.postId) }} />}
                </HeadBody>

                <ListTitle>
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
                
                {data.nickname === userInfo.nickname ?
                <MyPageBtn onClick={viewApplyModal} >지원자 보기</MyPageBtn> :
                null}
            </PostBody>
            {/* </Link> */}
           

             
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



export default MyPagePostList;
