import styled from '@emotion/styled';
import { PropsApi } from 'api';
import axios from 'axios';
import useAdminLogin from 'hooks/useAdminLogin';
import { Router, useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useMutation } from 'react-query';
import jwt_decode from 'jwt-decode';
import { JwtTokenType } from 'pages/signin';
import { useDispatch } from 'react-redux';
import { adminPageNumberAction } from 'storeAdmin/adminPageNumberSlice';

const AdLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorModal, setErrorModal] = useState(false);

  const [err, setErr] = useState<Boolean>(false);

  //   const { adminLoginLoading, signinAdmin } = useAdminLogin(
  //     idRef?.current?.value!,
  //     setErrorModal,
  //     setErrorMessage,
  //     false,
  //   );
  //   // 기본 로그인
  //   const originLogin = async () => {
  //     await signinAdmin(pwRef?.current?.value!);
  //   };

  const {
    mutate: loginMutate,
    isLoading: loginLoading,
    isError: loginError,
  } = useMutation(
    async (apiInfo: PropsApi) => {
      const { url, data } = apiInfo;
      return await axios({
        headers: {
          local: 'true',
        },
        method: 'POST',
        url: `/api${url}`,
        data,
        withCredentials: true,
      }).then((res) => res);
    },
    {
      onSuccess: (res) => {
        dispatch(adminPageNumberAction.setIsAdminPage(4));
        sessionStorage.setItem(
          'ADMIN_ACCESS_TOKEN',
          JSON.stringify(res.data.data.accessToken),
        );
        sessionStorage.setItem(
          'ADMIN_REFRESH_TOKEN',
          JSON.stringify(res.data.data.refreshToken),
        );

        // console.log('로그인성공', res.data);
        router.push('/admin');
      },
      onError: (err) => {
        // console.log(err);
        setErr(true);
      },
    },
  );

  const signin = () => {
    // console.log('=======signin fn 호출=======');
    loginMutate({
      url: '/admin/auth/login',
      data: {
        id: idRef?.current?.value!,
        password: pwRef?.current?.value!,
      },
    });
  };

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type } = e.target;
    setErr(false);
    if (idRef.current && type === 'text') {
      idRef.current.value = e.target.value;
      //// console.log(idRef.current.value)
    } else if (pwRef.current && type == 'password') {
      pwRef.current.value = e.target.value;
      //// console.log(pwRef.current.value)
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      signin();
    }
  };

  return (
    <Body>
      <Inner>
        <Wrapper>
          <h1>엔티즌 관리자 시스템</h1>
          <p>로그인</p>
          <InputID
            type="text"
            placeholder="아이디"
            onChange={(e) => changeValue(e)}
            ref={idRef}
          />
          <InputPW
            type="password"
            placeholder="비밀번호"
            onChange={(e) => changeValue(e)}
            ref={pwRef}
            onKeyDown={onKeyPress}
          />
          {err && (
            <ErrP className="err">
              <img src="/images/Attention.png" alt="err" />
              아이디 또는 비밀번호가 일치하지 않습니다.
            </ErrP>
          )}
          <Button onClick={signin}>
            <span>로그인</span>
          </Button>
          <PasswordNotify
            onClick={() => {
              router.push('/admin/login/password');
            }}
          >
            <span>비밀번호 재설정</span>
          </PasswordNotify>
        </Wrapper>
      </Inner>
    </Body>
  );
};

export default AdLogin;

const Body = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  width: 100%;
  height: 100vh;
  background: #e2e5ed;
  position: relative;
`;
const Inner = styled.div`
  width: 572px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -65%);

  background: #ffffff;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
`;

const Wrapper = styled.div`
  padding: 80px 126px 104px;
  h1 {
    margin-bottom: 48px;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 150%;
    color: #5221cb;
    text-align: center;
  }
  > p {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 150%;
    color: #000000;
    margin-bottom: 8px;
  }
`;
const InputID = styled.input`
  width: 100%;
  height: 36px;
  margin-bottom: 8px;
  padding-left: 10px;

  color: #000000;
  background: #ffffff;
  border: 1px solid #a6a9b0;

  &::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #a6a9b0;
  }
`;

const InputPW = styled.input`
  width: 100%;
  height: 36px;
  padding-left: 10px;
  color: #000000;
  background: #ffffff;
  border: 1px solid #a6a9b0;

  &::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #a6a9b0;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  background: #5221cb;
  margin-top: 40px;

  > span {
    color: white;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    padding: 7px 0;
  }
`;

const PasswordNotify = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  padding: 7px 0;
  color: #222222;
  margin-top: 20px;
  letter-spacing: 0.05em;
  cursor: pointer;
`;

const ErrP = styled.p`
  position: relative;
  display: flex;
  align-items: center;
  &.err {
    margin-top: 8px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #f75015;
  }
  img {
    position: relative;
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
`;
