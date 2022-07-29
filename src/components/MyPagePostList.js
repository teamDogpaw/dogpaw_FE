import { Btn, GrayLineBtn, LineBtn, ListProfilePic, ListStack, ListTitle, PostBody } from "../styles/style"
import { useRecoilValue } from "recoil";
import { UserInfoAtom } from "../atom/atom";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import DefaultProfile from "../styles/icon/global/profile.svg"
import { ReactComponent as CommentCnt } from "../styles/icon/post/commentCnt.svg";
import { ReactComponent as BookmarkCnt } from "../styles/icon/post/bookmarkCnt.svg"
import UserBookmark from "./UserBookmark";
import { usePostApply } from "../hook/useApplyMutation";
import AlertModal from "./AlertModal";
import { Content } from "./ApplyBtn";
import { useState } from "react";

const MyPagePostList = ({
    data,
    viewApplyModal,
    currentTab
}) => {
console.log(data)
    const isMypage = useMatch("/mypage")
    const [modalOpen, setModalOpen] = useState(false);
    //console.log(currentTab)
    const navigate = useNavigate()
    const { mutate: postApply } = usePostApply()

    // const cancelApply = () => {
    //     if(confirm('지원을 취소하시겠어요?'))
    // };

    const openModal = () => {
        setModalOpen(true);
      };
      const closeModal = () => {
        setModalOpen(false);
      };

    return (
        <>
            <PostBody key={data.postId} >
                <HeadBody>
                    {currentTab !== 4 ? 
                    <>
                    <ListProfilePic src={data.profileImg === null ? 
                    DefaultProfile 
                    : data.profileImg} />
                    {data.nickname}
                    </>
                    : null }
                    
                    {data.bookMarkStatus ?
                    <UserBookmark postId={data.postId}
                    bookmarkStatus={data.bookMarkStatus}
                            currentTab={currentTab} />
                        :
                        <UserBookmark postId={data.postId} currentTab={currentTab} />}
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
                {currentTab === 3 ?
                    <MyPageBtn onClick={openModal} >지원 취소하기</MyPageBtn>
                    : null}

                {isMypage !== null && currentTab === 2  || currentTab === 4  ?
                    <MyPageBtn
                        onClick={() =>
                            viewApplyModal({
                                postId: data.postId,
                                title: data.title,
                                deadline: data.deadline
                            })} >팀원 목록 보기</MyPageBtn>
                    : null}
                {/* {currentTab === 4 ?
                    <MyPageBtn
                        onClick={() =>
                            viewApplyModal({
                                postId: data.postId,
                                title: data.title,
                                deadline: data.deadline
                            })} >팀원 목록 보기</MyPageBtn>
                    : null} */}
            </PostBody>


            <AlertModal open={modalOpen}>
        <Content>
          <h4>프로젝트 지원을 취소하시겠습니까?</h4>
          <div>
            <GrayLineBtn onClick={closeModal}> 닫기 </GrayLineBtn>
            <Btn onClick={() => postApply(data.postId)}> 지원취소 </Btn>
          </div>
        </Content>
      </AlertModal>


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
font-size: 0.875rem;
margin-top: 8px;
gap:8px;
display: flex;
flex-direction: column;
`;

const ListBottom = styled.div`
display: flex;
align-items: flex-end;
gap:5px;
font-size: 0.813rem;
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