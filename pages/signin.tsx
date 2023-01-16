import { Box, Container, Typography, TextField, Divider } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import { useRouter } from 'next/router';
import kakao from 'public/images/kakao.svg';
import naver from 'public/images/naver.svg';
import google from 'public/images/google.svg';
import apple from 'public/images/apple.svg';
import Image from 'next/image';
import { login } from 'api/naver';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { userAction } from 'store/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { originUserAction } from 'store/userInfoSlice';
import colors from 'styles/colors';
import { findUserInfoAction } from 'store/findSlice';
import Modal from 'components/Modal/Modal';
import Link from 'next/link';
import { selectAction } from 'store/loginTypeSlice';
import Loader from 'components/Loader';
import useLogin from 'hooks/useLogin';
import CompleteModal from 'components/Modal/CompleteModal';
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleSignUpData } from './auth/google';
import { useMutation } from 'react-query';
import { isPostApi } from 'api';
import Head from 'next/head';
export interface JwtTokenType {
  exp: number;
  iat: number;
  isSnsMember: boolean;
  iss: string;
  memberIdx: number;
  memberType: string;
}

export interface AdminJwtTokenType {
  exp: number;
  iat: number;
  isAdmin: true;
  iss: string;
  managerIdx: number;
  name: string;
}
export interface FindKey {
  id: string;
  isMember: boolean;
  memberIdx: number;
  name: string;
  phone: string;
  snsType: string;
}

const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
// 테스트 리다이렉트 주소
const REDIRECT_URI = 'https://api.entizen.kr/auth/kakao';
// 라이브 리다이렉트 주소
// const REDIRECT_URI = 'https://api.entizen.kr/auth/kakao';
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const Signin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userAgent } = useSelector((state: RootState) => state.userAgent);
  let naverLogin: any;
  const naverRef = useRef<HTMLElement | null | any>(null);
  const { user } = useSelector((state: RootState) => state.userList);
  const [userId, setUserId] = useState<string>('');
  const [data, setData] = useState<any>();
  const [password, setPassword] = useState<string>('');
  const [selectedLoginType, setSelectedLoginType] = useState<number>(0);
  const loginTypeList: string[] = ['일반회원 로그인', '기업회원 로그인'];
  const loginTypeEnList: string[] = ['USER', 'COMPANY'];
  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  // 기업로그인 가입 후 첫 로그인
  const [userCompleteModal, setUserCompleteModal] = useState<boolean>(false);

  // 구글 로그인 버튼 온클릭
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse.access_token);
      // 구글에서 받아온 토큰값으로 유저정보 받아옴.
      // axios랑 fetch로는 CORS 에러 발생해서 XMLHTTP로 연결.
      const userInfo: any = await new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `https://www.googleapis.com/oauth2/v3/userinfo`);
        xhr.setRequestHeader(
          'Authorization',
          `Bearer ${tokenResponse.access_token}`,
        );
        xhr.onload = function () {
          if (this.status >= 200 && this.status < 300)
            resolve(JSON.parse(this.responseText));
          else resolve({ err: '404' });
        };
        xhr.send();
      });
      // 유저 정보를 잘 받아왔다면, 서버에 POST API를 보내 로그인 or 회원가입 절차 진행
      if (userInfo) {
        handleGoogleSignUp(userInfo);
      } else {
        setErrorMessage('구글 로그인을 실패하였습니다.\n다시 시도해주세요.');
        setErrorModal(true);
      }
    },
    onError: () => {
      console.log('구글 로그인 실패');
      setErrorMessage('구글 로그인을 실패하였습니다.\n다시 시도해주세요.');
      setErrorModal(true);
    },
    flow: 'implicit',
  });
  // 구글 로그인 mutate
  const { mutate: googleLoginMutate } = useMutation(isPostApi, {
    onSuccess: (res) => {
      let resData = res.data;
      let jsonData = JSON.parse(res.config.data);
      dispatch(
        userAction.add({
          ...user,
          uuid: jsonData.uuid,
          email: jsonData.email,
          snsType: jsonData.snsType,
          snsLoginIdx: resData.snsLoginIdx,
          isMember: resData.isMember,
        }),
      );
      if (resData.isMember === true) {
        // 로그인
        const token: JwtTokenType = jwt_decode(resData.accessToken);
        sessionStorage.setItem('SNS_MEMBER', JSON.stringify(token.isSnsMember));
        sessionStorage.setItem('MEMBER_TYPE', JSON.stringify(token.memberType));
        sessionStorage.setItem('USER_ID', JSON.stringify(jsonData.email));
        sessionStorage.setItem(
          'ACCESS_TOKEN',
          JSON.stringify(resData.accessToken),
        );
        sessionStorage.setItem(
          'REFRESH_TOKEN',
          JSON.stringify(resData.refreshToken),
        );
        dispatch(originUserAction.set(jsonData.email));
        router.push('/');
      } else {
        // 회원가입
        router.push('/signUp/SnsTerms');
      }
    },
    onError: (error: any) => {
      const { message } = error?.response?.data;
      if (data.message === '탈퇴된 회원입니다.') {
        setErrorModal(true);
        setErrorMessage(
          '탈퇴한 계정입니다.\n엔티즌 이용을 원하시면\n 다시 가입해주세요.',
        );
      } else {
        setErrorModal(true);
        setErrorMessage(data.message);
      }
    },
  });
  // 로그인 mutate
  const { loginLoading, signin } = useLogin(
    userId,
    setErrorModal,
    setErrorMessage,
    setUserCompleteModal,
    loginTypeEnList[selectedLoginType] as 'USER',
    false,
  );
  // 기본 로그인
  const originLogin = async () => {
    await signin(password);
  };
  // 구글 로그인 후 서버로 회원가입 처리
  const handleGoogleSignUp = async (data: GoogleSignUpData) => {
    googleLoginMutate({
      url: '/members/login/sns',
      data: {
        uuid: data.sub,
        snsType: 'GOOGLE',
        snsResponse: JSON.stringify(data),
        email: data.email,
      },
    });
  };
  // 네이버 로그인
  const NaverApi = async (data: any) => {
    const NAVER_POST = `https://api.entizen.kr/api/members/login/sns`;
    try {
      await axios({
        method: 'post',
        url: NAVER_POST,
        data: {
          uuid: '' + data.user.id,
          snsType: 'NAVER',
          snsResponse: JSON.stringify(data),
          email: data.user.email,
        },

        headers: {
          ContentType: 'application/json',
        },
        withCredentials: true,
      }).then((res) => {
        console.log('[axios] 리스폰스 => ');
        console.log(res);
        console.log(res.data);
        // const match = res.config.data.match(/\((.*)\)/);
        let c = res.data;
        let d = JSON.parse(res.config.data);
        console.log('signin.tsx 65번째줄 axios 부분입니다 ! ======');
        console.log(c);
        dispatch(
          userAction.add({
            ...user,
            uuid: d.uuid,
            email: d.email,
            snsType: d.snsType,
            snsLoginIdx: c.snsLoginIdx,
            isMember: c.isMember,
          }),
        );
        if (c.isMember === true) {
          const token: JwtTokenType = jwt_decode(res.data.accessToken);
          sessionStorage.setItem(
            'SNS_MEMBER',
            JSON.stringify(token.isSnsMember),
          );
          sessionStorage.setItem('USER_ID', JSON.stringify(data.user.email));
          console.log(user.email);
          sessionStorage.setItem('ACCESS_TOKEN', JSON.stringify(c.accessToken));
          sessionStorage.setItem(
            'REFRESH_TOKEN',
            JSON.stringify(c.refreshToken),
          );
          dispatch(originUserAction.set(data.user.email));
          router.push('/');
        } else {
          router.push('/signUp/SnsTerms');
        }
      });
    } catch (error) {
      console.log('post 요청 실패');
      console.log(error);
    }
  };
  // 네이버 온클릭
  const handleNaver = async () => {
    console.log('네이버 온클릭');
    console.log(naverRef);
    if (naverRef) {
      naverRef.current.children[0].click();
    }
  };
  // 나이스 인증 온클릭 함수
  const fnPopup = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;
    if (value === 'id') {
      setIsId(true);
      console.log(data);
      console.log('id입니다');
    }
    if (value === 'password') {
      setIsPassword(true);
      console.log('passowrd입니다');
    }
    if (typeof window !== 'object') return;
    else {
      window.open(
        '',
        'popupChk',
        'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no',
      );
      let cloneDocument = document;
      cloneDocument.form_chk.action =
        'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb';
      cloneDocument.form_chk.target = 'popupChk';
      cloneDocument.form_chk.submit();
    }
  };
  // 아이디 찾기
  const HandleFindId = async () => {
    let key = sessionStorage.getItem('key');
    let data: FindKey = JSON.parse(key!);
    console.log(data);
    if (data.isMember) {
      dispatch(findUserInfoAction.addId(data.id));
      router.push('/find/id');
    } else {
      setErrorMessage(
        '탈퇴한 계정입니다.\n엔티즌 이용을 원하시면\n 다시 가입해주세요.',
      );
      setErrorModal((prev) => !prev);
    }
  };
  // 비밀번호 찾기
  const HandleFindPassword = async () => {
    let key = sessionStorage.getItem('key');
    let data: FindKey = JSON.parse(key!);
    if (data.isMember) {
      console.log('멤버 확인 -> ' + data.isMember);
      sessionStorage.getItem('key');
      router.push('/find/password2');
    } else {
      setErrorMessage(
        '탈퇴한 계정입니다.\n엔티즌 이용을 원하시면\n 다시 가입해주세요.',
      );
      setErrorModal((prev) => !prev);
    }
  };
  // 안내문
  const handleAlert = () => {
    alert('현재 개발 중 입니다.');
  };
  // 엔터키 이벤트
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      originLogin();
    }
  };
  // 나이스 인증
  useEffect(() => {
    const memberType = loginTypeEnList[selectedLoginType];
    axios({
      method: 'post',
      url: 'https://api.entizen.kr/api/auth/nice',
      data: { memberType },
    })
      .then((res) => {
        console.log('-------res--------');
        console.log(res);
        setData(res.data.executedData);
      })
      .catch((error) => {
        console.error(' 2 곳 입니까?');
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLoginType]);

  // 네이버 로그인
  useEffect(() => {
    login(naverLogin, function (naverLogin) {
      const hash = router.asPath.split('#')[1]; // 네이버 로그인을 통해 전달받은 hash 값
      console.log('hash -> ' + hash);

      if (hash) {
        const token = hash.split('=')[1].split('&')[0]; // token값 확인
        naverLogin.getLoginStatus((status: any) => {
          if (status) {
            NaverApi(naverLogin);
            dispatch(
              userAction.add({
                ...user,
                email: naverLogin.user.email,
                snsType: naverLogin.user.snsType,
              }),
            );
            // /naver 페이지로 token값과 함께 전달 (서비스할 땐 token 전달을 하지 않고 상태 관리를 사용하는 것이 바람직할 것으로 보임)
            router.push({
              pathname: '/signUp/Terms',
              query: {
                token: token,
              },
            });
          }
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 유저타입 확인하는 useEffect
  useEffect(() => {
    if (selectedLoginType === 0) {
      dispatch(selectAction.select('USER'));
    } else if (selectedLoginType === 1) {
      dispatch(selectAction.select('COMPANY'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLoginType]);


  if (loginLoading) {
    console.log('loading..');
    // return <Loader />;
  }

  //애플 로그인 체크
  useEffect(()=>{
    document.addEventListener('AppleIDSignInOnSuccess', (data:any) => {
      //handle successful response
        console.log("AppleIDSignInOnSuccess", data)
        console.log(data.detail.authorization)
        //todo success logic
    });
    //애플로 로그인 실패 시.
    document.addEventListener('AppleIDSignInOnFailure', (error) => {
        //handle error.
        console.log("AppleIDSignInOnFailure")
        //todo fail logic
    });
  },[])

  return (
    <React.Fragment>
      <Head>
        <script
          type="text/javascript"
          src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
        ></script>
        <meta name="appleid-signin-client-id" content="entizenapplekey" />
        <meta name="appleid-signin-redirect-uri" content="https://api.entizen.kr/api/auth/apple" />
        <meta name="appleid-signin-scope" content="name" />
        <meta name="appleid-signin-scope" content="email" />
        <meta name="appleid-signin-state" content="" />
        <meta name="appleid-signin-use-popup" content="true" />
      </Head>
      {/* 로그인 에러 안내 모달 */}
      {errorModal && (
        <Modal
          text={errorMessage}
          color={'#7e7f81'}
          click={() => setErrorModal((prev) => !prev)}
        />
      )}
      <Body>
        <WebHeader />
        <Inner>
          <WebWrapper>
            {/* 기업로그인으로 가입 후 관리자 승인 받고 첫 로그인 하면 뜨는 모달 */}
            {userCompleteModal === true && (
              <CompleteModal
                isModal={userCompleteModal}
                setIsModal={() => router.push('/')}
              />
            )}
            <Container
              disableGutters
              sx={{
                width: '100%',
                height: '580.5pt',
                overflow: 'scroll !important',
              }}
            >
              <BackBox onClick={() => router.push('/')}>
                <BackBtn src="/images/back-btn.svg" />
              </BackBox>
              <Container
                disableGutters
                sx={{
                  width: '100%',
                  paddingLeft: '9pt',
                  paddingRight: '9pt',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    gap: '15pt',
                    alignItems: 'center',
                    marginTop: '6pt',
                  }}
                >
                  {loginTypeList.map((loginType, index) => (
                    <Box key={index}>
                      <Typography
                        variant="h6"
                        key={index}
                        onClick={() => {
                          setSelectedLoginType(index);
                        }}
                        sx={{
                          fontWeight: '700',
                          fontSize: '12pt',
                          lineHeight: '15pt',
                          padding: '6pt',
                          letterSpacing: '-0.02em',
                          color:
                            selectedLoginType == index ? '#5A2DC9' : '#CACCD1',
                          cursor: 'pointer',
                        }}
                      >
                        {loginType}
                      </Typography>
                      <Box
                        sx={{
                          width: '3pt',
                          height: '3pt',
                          background:
                            selectedLoginType == index ? '#5A2DC9' : '#fff',
                          margin: '6pt auto 0 auto',
                          borderRadius: '100%',
                        }}
                      ></Box>
                    </Box>
                  ))}
                </Box>
              </Container>
              <Container
                disableGutters
                sx={{
                  width: '100%',
                  marginTop: '42pt',
                  padding: '0 25pt',
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <TextFields
                    value={userId}
                    id="outlined-basic"
                    placeholder="아이디 입력"
                    onChange={(e) => {
                      setUserId(e.target.value);
                    }}
                  />

                  <TextFields
                    value={password}
                    id="outlined-basic"
                    placeholder="비밀번호 입력"
                    type="password"
                    onBlur={(e) => {
                      //유효성 검사
                    }}
                    onChange={(e) => {
                      //비밀번호 입력값 변경
                      setPassword(e.target.value);
                    }}
                    sx={{
                      marginTop: '9pt',
                    }}
                    onKeyDown={onKeyPress}
                  />
                </Box>
                <LoginBtn onClick={originLogin}>
                  <BtnSpan>로그인</BtnSpan>
                </LoginBtn>
                <Box
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  <Box
                    sx={{
                      textAlign: 'center',
                      // textDecorationLine: 'underline',
                      marginTop: '22.5pt',
                      color: '#747780',
                    }}
                  >
                    <div>
                      <form name="form_chk" method="get">
                        <input
                          type="hidden"
                          name="m"
                          value="checkplusService"
                        />
                        {/* <!-- 필수 데이타로, 누락하시면 안됩니다. --> */}
                        <input
                          type="hidden"
                          id="encodeData"
                          name="EncodeData"
                          value={data !== undefined && data}
                        />
                        <input
                          type="hidden"
                          name="recvMethodType"
                          value="get"
                        />
                        {/* <!-- 위에서 업체정보를 암호화 한 데이타입니다. --> */}
                        <FindBtn value="id" name={'form_chk'} onClick={fnPopup}>
                          아이디 찾기&nbsp;
                        </FindBtn>
                        <FindBtn
                          value="password"
                          name={'form_chk'}
                          onClick={fnPopup}
                        >
                          &nbsp;비밀번호 찾기
                        </FindBtn>
                      </form>
                    </div>
                    {isId && (
                      <Buttons className="firstNextPage" onClick={HandleFindId}>
                        숨겨진 아이디 버튼
                      </Buttons>
                    )}
                    {isPassword && (
                      <Buttons
                        className="firstNextPage"
                        onClick={HandleFindPassword}
                      >
                        숨겨진 비밀번호 버튼
                      </Buttons>
                    )}
                  </Box>
                </Box>
                <TestWrap>
                  <div id="appleid-signin" 
                    data-color="black" 
                    data-border="true" 
                    data-type="sign in" 
                    data-width="100"
                    data-height="32"
                    data-mode="center-align">
                  </div> 
                </TestWrap>
             

                {/* {selectedLoginType === 0 && (
                  <>
                    <Box
                      sx={{
                        width: 'calc(100% - 37.5pt)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '102pt auto 0',
                      }}
                    >
                      <Box
                        sx={{
                          height: '33pt',
                          marginRight: '15pt',
                          cursor: 'pointer',
                        }}
                      >
                        <Link href={KAKAO_AUTH_URL}>
                          <Image src={kakao} alt="kakao" />
                        </Link>
                      </Box>
                      <Box
                        sx={{
                          height: '33pt',
                          marginRight: '15pt',
                          cursor: 'pointer',
                        }}
                        onClick={handleAlert}
                      >
                        <Image src={apple} alt="apple" />
                      </Box>
                      <NaverBox>
                        <Box id="naverIdLogin" ref={naverRef}>
                          <Image
                            src={naver}
                            alt="naver"
                            onClick={handleNaver}
                          />
                        </Box>
                      </NaverBox>
                      <Box sx={{ height: '33pt', cursor: 'pointer' }}>
                        <Image
                          src={google}
                          alt="google"
                          onClick={() => googleLogin()}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        margin: '18pt 24.75pt 0 24.75pt',
                      }}
                    >
                      <Divider
                        sx={{
                          background: '#CACCD1',
                          width: '35%',
                          height: '0.75pt',
                        }}
                      ></Divider>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 400,
                          fontSize: '10.5pt',
                          lineHeight: '12pt',
                          textAlign: 'center',
                          letterSpacing: '-0.02em',
                          color: '#CACCD1',
                        }}
                      >
                        또는
                      </Typography>
                      <Divider
                        sx={{
                          background: '#CACCD1',
                          width: '35%',
                          height: '0.75pt',
                        }}
                      ></Divider>
                    </Box>
                  </>
                )} */}
                <Box
                  sx={{
                    margin: '18pt 18pt 0 18pt',
                  }}
                >
                  <IdRegist>
                    <IdRegistBtnSpan
                      onClick={() => router.push('/signUp/Terms')}
                    >
                      아이디로 가입하기
                    </IdRegistBtnSpan>
                  </IdRegist>
                </Box>
              </Container>
            </Container>
          </WebWrapper>
        </Inner>
        <WebFooter />
      </Body>
    </React.Fragment>
  );
};

{
  /* 덜 된 부분: 글자크기, 간격 */
}

export default Signin;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;
  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;
const TextFields = styled(TextField)`
  width: 100%;
  font-weight: 400;
  border: 1px solid #ffffff;
  font-size: 12pt;
  line-height: 12pt;
  border-radius: 6pt;
  & div > input {
    padding-top: 10.88pt;
    padding-bottom: 10.8pt;
  }
`;
const Inner = styled.div`
  display: block;
  position: relative;
  width: 345pt;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  background: #ffff;
  padding: 32.25pt 0 42pt;
  margin: 45.75pt auto;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0 auto;
    padding: 0;
    box-shadow: none;
    background: none;
  }
`;
const WebWrapper = styled.div`
  position: relative;
  margin: 0 31.875pt;
  @media (max-width: 899.25pt) {
    margin: 0;
  }
`;
const NaverBox = styled(Box)`
  height: 33pt;
  margin-right: 15pt;
  cursor: pointer;
  & #naverIdLogin_loginButton {
    display: none;
  }
`;
const BackBtn = styled.img`
  margin-left: 15pt;
`;
const LoginBtn = styled.button`
  background: #5a2dc9;
  width: 100%;
  color: #fff;
  cursor: pointer;
  margin-top: 28.5pt;
  padding: 15pt 0;
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
`;
const BtnSpan = styled.span``;
const IdRegist = styled.button`
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;
  background-color: #ffffff;
  border-radius: 8px;
  width: 100%;
  padding: 15pt 0;
  font-weight: 700;
  font-size: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: #595757;
`;
const IdRegistBtnSpan = styled.span`
  cursor: pointer;
`;

const BackBox = styled(Box)`
  display: none;
  @media (max-width: 899.25pt) {
    display: block;
    width: 100%;
    padding-top: 9pt;
    padding-bottom: 9pt;
  }
`;
const FindBtn = styled.button`
  border: none;
  outline: none;
  background: none;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  margin: 2pt;
  text-decoration-line: underline;
  text-underline-position: under;
  color: ${colors.gray2};
  cursor: pointer;
`;
const Buttons = styled.button`
  display: none;
`;
const TestWrap = styled.div`
  margin: 20pt auto;
  position: relative;
`