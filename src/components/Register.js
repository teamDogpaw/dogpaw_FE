import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import StackSelector from "./StackSeletor";
import Login, {
  InputContent,
  InputWrap,
  LoginBtn,
  LoginInput,
  Redirect,
  Title,
  Wrap,
} from "./Login";
import { Btn, LineBtn } from "../styles/style";
import { nickCheck } from "../shared/userOauth";
import { userApis } from "../api/user";

let debounce = null;


const Register = ({ setModalContent }) => {
  //const setOnModal = useSetRecoilState(modalChange);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });
  const [isNextPage, setIsNextPage] = useState(false);
  const [isMobile, setIsMobile] = useState();
  //닉네임, 이메일, 비밀번호, 비밀번호 확인, 스택
  const [nickName, setNickName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [stack, setStack] = useState([]);

  //오류메시지 상태저장
  const [nickMessage, setNickMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  // 유효성 검사
  const [isNick, setIsNick] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const register = async (data) => {
    if (debounce) {
      clearTimeout(debounce);
    }
    debounce = setTimeout(async () => {
    try {
      let signUp = userApis.signUp;
      const response = await signUp(data)
      //console.log(response)
      if (response.status === 200) {
        alert('회원가입 성공!')
        setModalContent(<Login setModalContent={setModalContent} />)
      }
    } catch (err) {
      if (err.response.status === 400) {
        alert('중복된 이메일 혹은 닉네임입니다')
      }
    }
  }, 50);
  };

  // 이메일
  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식을 다시 한번 확인해 주세요.");
      setIsEmail(false);
    } else {
      setEmailMessage("알맞게 작성되었습니다 :)");
      setIsEmail(true);
    }
  }, []);


  const onChangeId = useCallback((e) => {
    setNickName(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 10) {
      setNickMessage("3글자 이상, 10글자 미만으로 입력해주세요.");
      setIsNick(false);
    } else {
      setNickMessage("알맞게 작성되었습니다 :)");
      setIsNick(true);
    }
  }, []);

  // 비밀번호
  const onChangePassword = useCallback((e) => {
    const passwordRegex = /^[ㄱ-ㅎ가-힣0-9a-zA-Z@$!%#?&]{3,10}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("3글자 이상, 10글자 미만으로 입력해주세요. ");
      setIsPassword(false);
    } else {
      setPasswordMessage("알맞게 작성되었습니다 :)");
      setIsPassword(true);
    }
  }, []);

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage("비밀번호를 똑같이 입력했어요 :)");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호를 다시 한번 확인해 주세요.");
        setIsPasswordConfirm(false);
      }
    },
    [password]
  );

  const nickData = { nickname: nickName };

  let data = {
    nickname: nickName,
    password: password,
    username: email,
    stacks: stack,
  };

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
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
    return () => window.removeEventListener('resize', handleResize)
  }, [windowSize.width, windowSize.height])

  if (isNextPage) {
    return (
      <>
        <Wrap>
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
                />
                <Btn
                  disabled={nickName.length < 3 || nickName.length > 10}
                  onClick={() => {
                    nickCheck(nickData);
                  }}
                >
                  중복확인
                </Btn>
              </NicknameWrap>
              <p>
                {nickName.length > 0 && (
                  <span className={`message ${isNick ? "success" : "error"}`}>
                    {nickMessage}
                  </span>
                )}
              </p>
            </InputContent>
            <InputContent>
              기술 스택
              <StackSelector setRegisterData={setStack} />
            </InputContent>
            <LineBtn onClick={() => setIsNextPage(false)}>
              뒤로가기
            </LineBtn>
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
              onClick={() => { register(data) }}
            >
              회원가입하기
            </LoginBtn>

          </InputWrap>

        </Wrap>

      </>

    )
  }

  return (
    <Wrap>
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
          />
          <p>
            {email.length > 0 && (
              <span className={`message ${isEmail ? "success" : "error"}`}>
                {emailMessage}
              </span>
            )}
          </p>
        </InputContent>
        {isMobile ? null : <InputContent>
          닉네임
          <NicknameWrap>
            <LoginInput
              text="ID"
              type="text"
              typeName="id"
              onChange={onChangeId}
              placeholder="닉네임을 입력해주세요."
            />
            <Btn
              disabled={nickName.length < 3 || nickName.length > 10}
              onClick={() => {
                nickCheck(nickData);
              }}
            >
              중복확인
            </Btn>
          </NicknameWrap>
          <p>
            {nickName.length > 0 && (
              <span className={`message ${isNick ? "success" : "error"}`}>
                {nickMessage}
              </span>
            )}
          </p>
        </InputContent>}

        <InputContent>
          비밀번호
          <LoginInput
            onChange={onChangePassword}
            title="비밀번호"
            typeTitle="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
          <p>
            {password.length > 0 && (
              <span className={`message ${isPassword ? "success" : "error"}`}>
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
          />
          <p>
            {passwordConfirm.length > 0 && (
              <span
                className={`message ${isPasswordConfirm ? "success" : "error"}`}
              >
                {passwordConfirmMessage}
              </span>
            )}
          </p>
        </InputContent>

        {isMobile ? null : <InputContent>
          기술 스택
          <StackSelector setRegisterData={setStack} />

        </InputContent>}

        {isMobile ?
          <LoginBtn onClick={() => setIsNextPage(true)}>
            다음
          </LoginBtn>
          :
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
            onClick={() => { register(data) }}
          >
            회원가입하기
          </LoginBtn>}


      </InputWrap>

      <Redirect>
        계정이 있으셨나요?
        <span
          onClick={() => {
            setModalContent(<Login setModalContent={setModalContent} />);
          }}
        >
          로그인
        </span>
        하러가기
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
@media screen and (max-width:600px) {
  display:none;
}
`;

export default Register;
