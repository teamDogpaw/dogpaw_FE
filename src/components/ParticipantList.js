import { useGetParticipantsLists } from "../hook/useProjectData";
import { LineBtn, ListProfilePic } from "../styles/style";
import {
  ApplyListContent,
  EmptyBody,
  EmptyImg,
  MyBtn,
  Section,
  Stack,
  StackBody,
  Stacks,
  User,
} from "./ApplyList";
import profilepic from "../styles/icon/global/profile.svg";
import { useExplusionMateMutation } from "../hook/useProjectMutation";
import { useWithdrawPartici } from "../hook/useUserData";

const ParticipantList = ({ myPostId, currentTab, setViewApply }) => {
  const { isLoading: isParticipantListLoading, data: participantList } =
    useGetParticipantsLists(myPostId);
  const { mutate: ExplusionMate } = useExplusionMateMutation();
  console.log(participantList);
const {mutateAsync : WithdrawPartici} = useWithdrawPartici();
  const explusionMate = (data) => {
    console.log(data);
    window.confirm("해당 팀원을 프로젝트에서 강퇴시키겠습니까?");
    ExplusionMate(data);
  };

  const withDrawParticipate = () => {
    window.confirm("정말 탈퇴하시겠어요?")
    WithdrawPartici(myPostId)
    setViewApply(false)
  }

  if (isParticipantListLoading) {
    return (
      <EmptyBody>
        <EmptyImg />
        <br />
        <span> Loading . . . </span>
      </EmptyBody>
    );
  }
  return (
    <>
      {participantList.data.length === 0 ? (
        <EmptyBody>
          <EmptyImg />
          <br />
          <span> 아직 팀원이 없어요! </span>
        </EmptyBody>
      ) : null}
      {participantList.data.map((team) => {
        return (
          <ApplyListContent>
            <Section>
              <User>
                {team.profileImg === null ? (
                  <ListProfilePic src={profilepic} />
                ) : (
                  <ListProfilePic src={team.profileImg} />
                )}
                {team.nickname}
                {/* <span> {team.username} </span> */}
              </User>
              {team.username}

              <Stacks>
                {team.stacks?.map((stack, index) => {
                  return <Stack key={index}>#{stack}</Stack>;
                })}
              </Stacks>
            </Section>
           
              {currentTab === 2 ? null : (
                <span
                  onClick={() =>
                    explusionMate({ userId: team.userId, postId: myPostId })
                  }
                >
                  
                 팀원 탈퇴시키기
                </span>
              )}
       
       
        
          </ApplyListContent>
        );
      })}
      <div onClick={withDrawParticipate}>
                탈퇴하기
                </div> 
    </>
  );
};

export default ParticipantList;
