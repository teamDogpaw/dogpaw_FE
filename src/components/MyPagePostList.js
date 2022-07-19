import { LineBtn, ListProfilePic, ListStack, ListTitle, PostBody } from "../styles/style"
import { useRecoilValue } from "recoil";
import { UserInfoAtom } from "../atom/atom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as DefaultProfile } from "../styles/icon/global/profile.svg"
import { ReactComponent as CommentCnt } from "../styles/icon/post/commentCnt.svg";
import { ReactComponent as BookmarkCnt } from "../styles/icon/post/bookmarkCnt.svg"
import UserBookmark from "./UserBookmark";
import { usePostApply } from "../hook/useApplyMutation";

const MyPagePostList = ({
    data,
    viewApplyModal,
    isApply,
    currentTab
}) => {

    const navigate = useNavigate()
    const userInfo = useRecoilValue(UserInfoAtom);
    const { mutate : postApply } = usePostApply()

    return (
        <>
            <PostBody key={data.postId} >
                <HeadBody>
                    {data.profileImg === null ? <DefaultProfile style={{ width: "40px", height: "40px" }} />
                        : <ListProfilePic src={data.profileImg} />}
                    {data?.nickname}
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
                    <MyPageBtn onClick={() => postApply(data.postId)} >지원 취소하기</MyPageBtn>
                    : null}

                {data?.nickname === userInfo?.nickname ?
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


export default MyPagePostList;


    //✅
    // const cancelApply = async (postId) => {
    //     alert('지원을 취소하시겠습니까?')
    //     try {
    //         return await instance.post(`/api/apply/${postId}`)
    //     } catch (error) {
    //         alert(error)
    //     }
    // }

    //✅
    // const { mutate } = useMutation(cancelApply)