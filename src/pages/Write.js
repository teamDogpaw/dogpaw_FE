import { useNavigate, useParams, useLocation } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { MainBody, Btn } from '../styles/style';
import styled from 'styled-components';
import '../styles/style.css';
import dayjs from 'dayjs';
import WriteSelect from '../components/WriteSelect';
import { useEditProject, usePostProject } from '../hook/usePostMutation';
import { ReactComponent as Arrow } from '../styles/icon/detail/backArrow.svg';
import AlertModal from '../components/common/AlertModal';
import { useQueryClient } from 'react-query';

const Write = () => {
  const { state } = useLocation();
  const [isEdit, setIsEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  //console.log(isEdit)
  const params = useParams();
  const postId = params.id;
  //console.log(params)
  const navigate = useNavigate();
  const { mutateAsync: editProject } = useEditProject();
  const { mutateAsync: postProject } = usePostProject();
  const processdetailsRef = useRef(null);
  const perioddetailsRef = useRef(null);
  const capacitydetailsRef = useRef(null);
  const queryClient = useQueryClient();

  const [startDate, setStartDate] = useState(new Date());
  const [selectedData, setSelectedData] = useState({
    title: '',
    maxCapacity: 1,
    period: '예상 진행 기간',
    stacks: [],
    online: '온라인',
    content: '',
    startAt: dayjs(new Date()).format('YYYY/MM/DD'),
  });

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const openTokenModal = () => {
    setTokenModalOpen(true);
  };

  const publishPost = async () => {
    if (selectedData.title.length === 0) {
      openModal();
    } else {
      try {
        await postProject(selectedData);
        queryClient.invalidateQueries('postList');
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const editPost = async () => {
    await editProject({ data: selectedData, postId });
    navigate(`/detail/${postId}`);
  };

  const handleStartDate = (startDate) => {
    setStartDate(startDate);
    setSelectedData((prev) => ({
      ...prev,
      startAt: dayjs(startDate).format('YYYY/MM/DD'),
    }));
  };

  const handleTitle = (title) => {
    setSelectedData((prev) => ({ ...prev, title }));
  };

  const handleContent = (content) => {
    setSelectedData((prev) => ({ ...prev, content }));
  };

  const handleCapacity = (capacity) => {
    setSelectedData((prev) => ({ ...prev, maxCapacity: capacity }));
    const details = capacitydetailsRef.current;
    if (details) {
      details.open = false;
    }
  };

  const setPeriod = (period) => {
    setSelectedData((prev) => ({ ...prev, period }));
    const details = perioddetailsRef.current;
    if (details) {
      details.open = false;
    }
  };

  const handleProcess = (selectedProcess) => {
    setSelectedData((prev) => ({ ...prev, online: selectedProcess }));
    const details = processdetailsRef.current;
    if (details) {
      details.open = false;
    }
  };

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (postId !== undefined) {
      setIsEdit(true);
      setSelectedData({
        content: state.content,
        online: state.onLine,
        stacks: state.stacks,
        title: state.title,
        maxCapacity: state.maxCapacity,
        period: state.period,
        startAt: state.startAt,
      });
    }
  }, [state]);

  if (token === null) {
    return (
      <AlertModal
        open={openTokenModal}
        message={'로그인이 필요한 서비스입니다'}
        setAlertModalOpen={() => navigate('/')}
      />
    );
  }

  return (
    <Wrap>
      <Leftarrow
        onClick={() => {
          navigate(-1);
        }}
      />
      <WriteBody>
        <WriteSelect
          selectedData={selectedData}
          handleTitle={handleTitle}
          handleCapacity={handleCapacity}
          handleProcess={handleProcess}
          handleStartDate={handleStartDate}
          setPeriod={setPeriod}
          startDate={startDate}
          processdetailsRef={processdetailsRef}
          capacitydetailsRef={capacitydetailsRef}
          perioddetailsRef={perioddetailsRef}
          isEdit={isEdit}
          setSelectedData={setSelectedData}
        />
      </WriteBody>

      <MainBody>
        <TextareaTitle>프로젝트 소개</TextareaTitle>
        <ProjectTextarea
          placeholder="컨텐츠에 대한 설명을 작성해주세요."
          onChange={(event) => {
            handleContent(event.target.value);
          }}
          defaultValue={isEdit ? selectedData.content : null}
          maxLength="2500"
        />
        <p>{selectedData.content.length}자 / 2500자</p>
      </MainBody>

      <Publish>
        {isEdit ? (
          <WriteBtn type="submit" onClick={editPost}>
            프로젝트 수정하기
          </WriteBtn>
        ) : (
          <WriteBtn type="submit" onClick={publishPost}>
            프로젝트 등록하기
          </WriteBtn>
        )}
      </Publish>
      <AlertModal
        open={modalOpen}
        message={'글 제목을 입력해 주세요!'}
        setAlertModalOpen={closeModal}
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 996px;
  margin: auto;
  margin-bottom: 150px;
  position: relative;
`;

const WriteBody = styled(MainBody)`
  margin-bottom: 40px;
  padding-top: 80px;

  @media screen and (max-width: 700px) {
    padding-top: 60px;
    width: 100%;
    margin: 0;
  }
`;

const TextareaTitle = styled.h3`
  text-align: center;
`;

const Publish = styled.div`
  text-align: right;
  margin-right: 32px;
  @media screen and (max-width: 700px) {
    margin: 0px 32px;
  }
`;

const WriteBtn = styled(Btn)`
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

const ProjectTextarea = styled.textarea`
  margin: 24px 0px;
  border: ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.backgroundColor};
  resize: none;
  width: 100%;
  height: 160px;
  border-radius: 8px;
  padding: 12px;

  ::placeholder {
    font-size: 1rem;
  }

  :focus {
    outline: none;
  }
  @media screen and (max-width: 700px) {
    width: 100%;
    padding: 12px;
    height: 300px;
    margin: 24px 0px;
  }
`;

const Leftarrow = styled(Arrow)`
  cursor: pointer;
  position: absolute;
  top: 25px;
  left: 30px;
  stroke: ${(props) => props.theme.toggleFontColor};

  @media screen and (max-width: 700px) {
    top: 10px;
  }
`;

export default Write;
