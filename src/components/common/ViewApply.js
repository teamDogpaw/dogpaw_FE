import { useState } from 'react';
import styled from 'styled-components';
import { Tab } from '../../pages/Mypage';
import {
  Modal,
  ModalBackground,
  ModalCloseButton,
  TabBody,
} from '../../styles/style';
import ApplyList, { EmptyBody, EmptyImg } from './ApplyList';
import ParticipantList from '../ParticipantList';
import { ReactComponent as X } from '../../styles/icon/modal/close.svg';
import { useGetPost } from '../../hook/usePostData';

const ViewApply = ({
  viewApplyModal,
  myPostData,
  currentTab,
  postId,
  setViewApply,
}) => {
  //console.log(currentTab)
  //console.log(myPostData)
  console.log(postId);
  const [isApplyList, setIsApplyList] = useState(false);

  const { data: myPostApply, isLoading: isLoadingPost } = useGetPost(postId);

  if (isLoadingPost) {
    return (
      <EmptyBody>
        <EmptyImg />
      </EmptyBody>
    );
  }
  return (
    <ModalBackground>
      <Modal className="apply">
        <ModalCloseButton onClick={viewApplyModal}>
          <X style={{ right: '0' }} />
        </ModalCloseButton>
        <ApplyProjectTitle>{myPostApply.data.title}</ApplyProjectTitle>
        {currentTab === 2 ? (
          <ModalTabBody className="participant">
            <Tab className="focused" onClick={() => setIsApplyList(false)}>
              팀원 목록
            </Tab>
          </ModalTabBody>
        ) : (
          <ModalTabBody>
            <Tab
              className={isApplyList ? null : 'focused'}
              onClick={() => setIsApplyList(false)}
            >
              팀원 목록 {myPostApply.data.currentMember}/
              {myPostApply.data.maxCapacity}
            </Tab>
            <Tab
              className={isApplyList ? 'focused' : null}
              onClick={() => setIsApplyList(true)}
            >
              신청자 목록 {myPostApply.data.applierCnt}
            </Tab>
          </ModalTabBody>
        )}

        <ModalContent>
          {isApplyList ? (
            <ApplyList myPostId={postId} />
          ) : (
            <ParticipantList
              myPostId={postId}
              currentTab={currentTab}
              setViewApply={setViewApply}
            />
          )}
        </ModalContent>
      </Modal>
    </ModalBackground>
  );
};

const ModalTabBody = styled(TabBody)`
  grid-template-columns: repeat(2, 1fr);
  margin: 16px 0px 20px;
  background: ${(props) => props.theme.divBackGroundColor};

  &.participant {
    grid-template-columns: 1fr;
  }
`;

const ModalContent = styled.div`
  width: 384px;

  @media screen and (max-width: 600px) {
    width: 100%;
    margin: 0px auto;
  }

  @media screen and (max-width: 375px) {
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0px;
    }
    width: 100%;
    margin: 0px auto;
  }
`;

export const ApplyProjectTitle = styled.h3`
  @media screen and (max-width: 375px) {
    margin-top: 50px;
    line-height: 30px;
    word-break: keep-all;
  }
`;
export default ViewApply;
