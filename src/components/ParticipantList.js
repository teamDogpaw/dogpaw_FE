import { useGetParticipantsLists } from '../hook/useProjectData';
import { Btn, GrayLineBtn, LineBtn, ListProfilePic } from '../styles/style';
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
} from './ApplyList';
import profilepic from '../styles/icon/global/profile.svg';
import { useExplusionMateMutation } from '../hook/useProjectMutation';
import { useWithdrawPartici } from '../hook/useUserData';
import styled from 'styled-components';
import { useState } from 'react';
import { Content } from './ApplyBtn';
import WithdrawModal from './WithdrawalModal';

const ParticipantList = ({ myPostId, currentTab, setViewApply }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [itemState, setItemState] = useState(null);

  const { isLoading: isParticipantListLoading, data: participantList } =
    useGetParticipantsLists(myPostId);
  const { mutate: ExplusionMate } = useExplusionMateMutation();
  //console.log(participantList);
  const { mutateAsync: WithdrawPartici } = useWithdrawPartici();

  const explusionMate = (data) => {
    ////console.log(data);
    ExplusionMate(data);
    setModalOpen(false);
  };

  const withDrawParticipate = () => {
    if (window.confirm('정말 탈퇴하시겠어요?')) {
      WithdrawPartici(myPostId);
      setViewApply(false);
    } else {
      return;
    }
  };

  if (isParticipantListLoading) {
    return (
      <EmptyBody>
        <EmptyImg />
        <br />
        <span> Loading . . . </span>
      </EmptyBody>
    );
  }

  const openModal = (team) => {
    setModalOpen(true);
    setItemState(team);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

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
          <ApplyListContents>
            {/* <Sections> */}
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
            {/* </Sections> */}
            <Out>
              {currentTab === 2 ? null : (
                <p
                  onClick={() => {
                    openModal(team);
                  }}
                >
                  탈퇴시키기
                </p>
              )}
            </Out>
          </ApplyListContents>
        );
      })}
      {itemState && (
        <WithdrawModal
          open={modalOpen}
          explusionMate={explusionMate}
          closeModal={closeModal}
          team={itemState}
          myPostId={myPostId}
        />
      )}
      {currentTab === 2 ? (
        <LeaveTeam onClick={withDrawParticipate}>탈퇴하기</LeaveTeam>
      ) : null}
    </>
  );
};

// const Sections = styled(Section)`
//   width: 100%;
// `;

const ApplyListContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #e2e2e2;
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 16px;
  line-height: normal;
  position: relative;

  img {
    margin-right: 5px;
  }
`;
const LeaveTeam = styled.div`
  color: ${(props) => props.theme.errorColor};
  font-size: 0.875rem;
  text-align: center;
  margin-top: 100px;
  cursor: pointer;
`;

const Out = styled.div`
  cursor: pointer;

  p {
    font-size: 0.875rem;
    color: crimson;
    position: absolute;
    top: 22px;
    right: 25px;
  }
`;

export default ParticipantList;
