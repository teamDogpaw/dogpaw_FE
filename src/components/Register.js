import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import StackSelector from './StackSeletor';
import Login, {
  InputContent,
  InputWrap,
  LoginBtn,
  LoginInput,
  Redirect,
  Title,
  Wrap,
} from './Login';
import { Btn, LineBtn } from '../styles/style';
import { userApis } from '../api/user';
import ModalOpen from './Modal_prev';
import { useSetRecoilState } from 'recoil';
import { modalContentAtom } from '../atom/atom';
import AlertModal from '../components/AlertModal';

const Register = () => {
  const setModalContent = useSetRecoilState(modalContentAtom);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const isRegister = true;
  const viewModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [isNextPage, setIsNextPage] = useState(false);
  const [isMobile, setIsMobile] = useState();

  //닉네임, 이메일, 비밀번호, 비밀번호 확인, 스택
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [stack, setStack] = useState([]);

  //오류메시지 상태저장
  const [nickMessage, setNickMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');

  // 유효성 검사
  const [isNick, setIsNick] = useState(false);
  const [isNickCheck, setIsNickCheck] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  let debounce = null;
  const [errorMessage, setErrorMessage] = useState('');
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [isSubmitOnce, setIsSubmitOnce] = useState(false);

  //회원가입 성공 유무
  const register = async (data) => {
    if (debounce) {
      clearTimeout(debounce);
    }
    debounce = setTimeout(async () => {
      try {
        let signUp = userApis.signUp;
        const response = await signUp(data);
        if (response.status === 200) {
          setModalContent(<Login setModalContent={setModalContent} />);
        }
        if (response.status === 400) {
          setErrorMessage(response.data.errorMessage);
          setAlertModalOpen(true);
        }
      } catch (err) {
        console.log(err);
      }
    }, 100);
  };

  const closeModal = () => {
    setAlertModalOpen(false);
  };

  //닉네임 중복 확인
  const nickCheck = (data) => {
    if (debounce) {
      clearTimeout(debounce);
    }
    debounce = setTimeout(async () => {
      try {
        let nickCheck = userApis.nickCheck;
        const response = await nickCheck(data);
        if (response.status === 200) {
          setNickMessage(response.data.msg);
          setIsNickCheck(true);
          setIsNick(true);
        }
        if (response.status === 400) {
          setNickMessage(response.data.errorMessage);
          setIsNickCheck(false);
          setIsNick(false);
        }
      } catch (err) {
        setNickMessage('연결이 고르지 않습니다.');
        setIsNickCheck(false);
        setIsNick(false);
      }
    }, 100);
  };

  // 이메일
  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /^[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('이메일 형식을 다시 한번 확인해 주세요.');
      setIsEmail(false);
    } else {
      setEmailMessage('알맞게 작성되었습니다.');
      setIsEmail(true);
    }
  }, []);

  // 닉네임
  const onChangeId = useCallback((e) => {
    setNickName(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setNickMessage('3글자 이상, 8글자 아래로 정해주세요.');
      setIsNick(false);
    } else {
      setNickMessage('알맞게 작성되었습니다.');
      setIsNick(true);
    }
  }, []);

  // 비밀번호
  const onChangePassword = useCallback((e) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('영 대소문자와 숫자를 포함해 입력해주세요.');
      setIsPassword(false);
    } else {
      setPasswordMessage('알맞게 작성되었습니다.');
      setIsPassword(true);
    }
  }, []);

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        if (passwordConfirm.length < 16) {
          setPasswordConfirmMessage('동일한 비밀번호를 입력했어요.');
          setIsPasswordConfirm(true);
        }
      } else {
        setPasswordConfirmMessage('비밀번호를 다시 한번 확인해 주세요.');
        setIsPasswordConfirm(false);
      }
    },
    [password, passwordConfirm.length],
  );

  const nickData = { nickname: nickName };

  let data = {
    nickname: nickName,
    password: password,
    username: email,
    stacks: stack,
    passwordConfirm,
  };

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    if (windowSize.width < 600 || windowSize.height < 812) {
      setIsMobile(true);
    } else if (windowSize.width >= 600 || windowSize.height >= 812) {
      setIsMobile(false);
      setIsNextPage(false);
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.width, windowSize.height]);

  if (isNextPage) {
    return (
      <>
        <Wrap>
          <AlertModal
            open={alertModalOpen}
            message={errorMessage}
            setAlertModalOpen={closeModal}
          />
          <Title>
            REGISTER
            <span> 회원가입</span>
          </Title>
          <InputWrap>
            <InputContent>
              닉네임
              <NicknameWrap>
                <LoginInput
                  text="ID"
                  type="text"
                  typeName="id"
                  onChange={onChangeId}
                  placeholder="닉네임을 입력해주세요."
                  maxLength="8"
                />
                <Btn
                  disabled={nickName.length < 3 || nickName.length > 8}
                  onClick={() => {
                    nickCheck(nickData);
                  }}
                >
                  중복확인
                </Btn>
              </NicknameWrap>
              <p>
                {nickName.length > 0 && (
                  <span
                    className={`message ${
                      isNick || isNickCheck ? 'success' : 'error'
                    }`}
                  >
                    {nickMessage}
                  </span>
                )}
              </p>
            </InputContent>
            <InputContent>
              기술 스택
              <StackSelector
                setRegisterData={setStack}
                isRegister={isRegister}
              />
            </InputContent>
            <LineBtn onClick={() => setIsNextPage(false)}>뒤로가기</LineBtn>
            <LoginBtn
              type="submit"
              disabled={
                !(
                  isNick &&
                  isEmail &&
                  isPassword &&
                  isPasswordConfirm &&
                  nickName &&
                  email &&
                  password &&
                  passwordConfirm &&
                  stack.length > 0
                )
              }
              onClick={() => {
                register(data);
              }}
            >
              회원가입하기
            </LoginBtn>
            {isModalOpen ? <ModalOpen viewModal={viewModal} /> : null}
          </InputWrap>
        </Wrap>
      </>
    );
  }

  return (
    <Wrap>
      <AlertModal
        open={alertModalOpen}
        message={errorMessage}
        setAlertModalOpen={closeModal}
      />
      <Title>
        REGISTER
        <span> 회원가입</span>
      </Title>
      <InputWrap>
        <InputContent>
          이메일
          <LoginInput
            text="이메일"
            type="email"
            typeName="email"
            onChange={onChangeEmail}
            placeholder="이메일을 입력해주세요."
            defaultValue={isSubmitOnce ? email : null}
          />
          <p>
            {email.length > 0 && (
              <span className={`message ${isEmail ? 'success' : 'error'}`}>
                {emailMessage}
              </span>
            )}
          </p>
        </InputContent>
        {isMobile ? null : (
          <InputContent>
            닉네임
            <NicknameWrap>
              <LoginInput
                text="ID"
                type="text"
                typeName="id"
                onChange={onChangeId}
                placeholder="닉네임을 입력해주세요."
                maxLength="8"
              />
              <LoginBtn
                disabled={nickName.length < 3 || nickName.length > 8}
                onClick={() => {
                  nickCheck(nickData);
                }}
              >
                중복확인
              </LoginBtn>
            </NicknameWrap>
            <p>
              {nickName.length > 0 && (
                <span className={`message ${isNick ? 'success' : 'error'}`}>
                  {nickMessage}
                </span>
              )}
            </p>
          </InputContent>
        )}

        <InputContent>
          비밀번호
          <LoginInput
            onChange={onChangePassword}
            title="비밀번호"
            typeTitle="password"
            type="password"
            placeholder="8글자 이상, 16글자 미만으로 비밀번호를 입력해주세요."
            maxLength="16"
            defaultValue={isSubmitOnce ? password : null}
          />
          <p>
            {password.length > 0 && (
              <span className={`message ${isPassword ? 'success' : 'error'}`}>
                {passwordMessage}
              </span>
            )}
          </p>
        </InputContent>
        <InputContent>
          비밀번호 확인
          <LoginInput
            onChange={onChangePasswordConfirm}
            title="비밀번호 확인"
            typeTitle="passwordConfirm"
            type="password"
            placeholder="비밀번호를 다시 한번 입력해주세요."
            maxLength="16"
            defaultValue={isSubmitOnce ? passwordConfirm : null}
          />
          <p>
            {passwordConfirm.length > 0 && (
              <span
                className={`message ${isPasswordConfirm ? 'success' : 'error'}`}
              >
                {passwordConfirmMessage}
              </span>
            )}
          </p>
        </InputContent>

        {isMobile ? null : (
          <InputContent>
            기술 스택
            <StackSelector setRegisterData={setStack} isRegister={isRegister} />
          </InputContent>
        )}

        {isMobile ? (
          <LoginBtn
            onClick={() => {
              setIsNextPage(true);
              setIsSubmitOnce(true);
            }}
            disabled={
              !(
                isEmail &&
                isPassword &&
                isPasswordConfirm === isPassword &&
                email &&
                password &&
                passwordConfirm
              )
            }
          >
            다음
          </LoginBtn>
        ) : (
          <LoginBtn
            type="submit"
            disabled={
              !(
                isNick &&
                isEmail &&
                isPassword &&
                isPasswordConfirm &&
                nickName &&
                isNickCheck &&
                email &&
                password &&
                passwordConfirm &&
                stack.length > 0
              )
            }
            onClick={() => {
              register(data);
            }}
          >
            회원가입하기
          </LoginBtn>
        )}
      </InputWrap>

      <Redirect>
        계정이 있으셨나요?
        <span
          onClick={() => {
            setModalContent(<Login />);
          }}
        >
          로그인
        </span>
      </Redirect>
    </Wrap>
  );
};

export const NicknameWrap = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
`;

const Mobile = styled.div`
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export default Register;
