import { useGetParticipantsLists } from '../hook/useProjectData';
import { ApplyListContent, ListProfilePic } from '../styles/style';
import {
  EmptyBody,
  EmptyImg,
  Section,
  Stack,
  Stacks,
  User,
} from './common/ApplyList';
import profilepic from '../styles/icon/global/profile.svg';
import { useExplusionMateMutation } from '../hook/useProjectMutation';
import { useWithdrawPartici } from '../hook/useUserData';
import styled from 'styled-components';
import { useState } from 'react';
import WithdrawModal from './common/WithdrawalModal';
import EmptyPage from './emptyPage';
import { useQueryClient } from 'react-query';
import AlertModal from './common/AlertModal';

const ParticipantList = ({ myPostId, currentTab, setViewApply }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [itemState, setItemState] = useState(null);
  const [withdrawMe, setWithdrawMe] = useState(false);

  const { isLoading: isParticipantListLoading, data: participantList } =
    useGetParticipantsLists(myPostId);
  const { mutate: ExplusionMate } = useExplusionMateMutation();
  const { mutateAsync: WithdrawPartici } = useWithdrawPartici();
  const queryClient = useQueryClient();

  const explusionMate = (data) => {
    ExplusionMate(data);
    setModalOpen(false);
    queryClient.invalidateQueries('myproject');
  };

  const withDrawParticipate = () => {
    WithdrawPartici(myPostId);
    setViewApply(false);
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

  const openModalWithdrawMe = () => {
    setWithdrawMe(true);
  };
  const closeModalWithdrawMe = () => {
    setWithdrawMe(false);
  };

  return (
    <>
      {participantList.data.length === 0 ? (
        <EmptyPage message={'아직 팀원이 없어요!'} />
      ) : null}
      {participantList.data.map((team) => {
        return (
          <ParticiListContent>
            <Section className="partici">
              <User>
                {team.profileImg === null ? (
                  <ListProfilePic src={profilepic} />
                ) : (
                  <ListProfilePic src={team.profileImg} />
                )}
                {team.nickname}
              </User>
              {team.username}
              <Stacks>
                {team.stacks?.map((stack, index) => {
                  return <Stack key={index}>#{stack}</Stack>;
                })}
              </Stacks>
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
            </Section>
          </ParticiListContent>
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
        <LeaveTeam onClick={openModalWithdrawMe}>탈퇴하기</LeaveTeam>
      ) : null}
      <AlertModal
        open={withdrawMe}
        setAlertModalOpen={closeModalWithdrawMe}
        message={'팀에서 탈퇴 하시겠습니까?'}
        action={withDrawParticipate}
        actionMessage={'탈퇴하기'}
      />
    </>
  );
};

const ParticiListContent = styled(ApplyListContent)`
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
