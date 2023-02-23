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
import useLogin from 'hooks/useLogin';
import CompleteModal from 'components/Modal/CompleteModal';
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleSignUpData } from './auth/google';
import { useMutation } from 'react-query';
import { isPostApi } from 'api';
import Head from 'next/head';
import MobileFindModal from 'components/Modal/MobileFindModal';
import { useMediaQuery } from 'react-responsive';
import FindIdModal from 'components/Modal/findIdModal';
import SignUpHeader from 'components/SignUp/header';
export interface JwtTokenType {
  exp: number;
  iat: number;
  isSnsMember: boolean;
  iss: string;
  memberIdx: number;
  memberType: string;
}
interface AppleResult {
  aud: string;
  auth_time: number;
  c_hash: string;
  email: string;
  email_verified: string;
  exp: number;
  iat: number;
  iss: string;
  nonce_supported: string;
  sub: string;
}
export interface AdminJwtTokenType {
  exp: number;
  iat: number;
  isAdmin: true;
  // isRepresentativeAdmin true면 슈퍼관리자 false면 일반관리자
  isRepresentativeAdmin: boolean;
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
const REDIRECT_URI = 'https://api.entizen.kr/auth/kakao';
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const Signin = () => {
  let naverLogin: any;
  const router = useRouter();
  const dispatch = useDispatch();
  const mobile = useMediaQuery({
    query: '(max-width:810pt)',
  });
  const naverRef = useRef<HTMLElement | null | any>(null);
  const loginTypeList: string[] = ['일반회원 로그인', '기업회원 로그인'];
  const loginTypeEnList: string[] = ['USER', 'COMPANY'];
  const { user } = useSelector((state: RootState) => state.userList);
  const { userAgent } = useSelector((state: RootState) => state.userAgent);
  const [userId, setUserId] = useState<string>('');
  const [data, setData] = useState<any>();
  const [password, setPassword] = useState<string>('');
  const [selectedLoginType, setSelectedLoginType] = useState<number>(0);
  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  // 아이디 찾기 모달
  const [find, setFind] = useState(false);
  const [findText, setFindText] = useState<'id' | 'password'>('id');
  // 기업로그인 가입 후 첫 로그인
  const [userCompleteModal, setUserCompleteModal] = useState<boolean>(false);

  const appleRef = useRef<HTMLDivElement>(null);
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
    // 구글 로그인 (2)
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
        localStorage.setItem('SNS_MEMBER', JSON.stringify(token.isSnsMember));
        localStorage.setItem('MEMBER_TYPE', JSON.stringify(token.memberType));
        localStorage.setItem('USER_ID', JSON.stringify(jsonData.email));
        localStorage.setItem(
          'ACCESS_TOKEN',
          JSON.stringify(resData.accessToken),
        );
        localStorage.setItem(
          'REFRESH_TOKEN',
          JSON.stringify(resData.refreshToken),
        );
        dispatch(originUserAction.set(jsonData.email));

        // ================ 브릿지 연결 =====================
        const userInfo = {
          SNS_MEMBER: token.isSnsMember,
          MEMBER_TYPE: token.memberType,
          ACCESS_TOKEN: resData.accessToken,
          REFRESH_TOKEN: resData.refreshToken,
          USER_ID: jsonData.email,
        };
        if (userAgent === 'Android_App') {
          window.entizen!.setUserInfo(JSON.stringify(userInfo));
        } else if (userAgent === 'iOS_App') {
          window.webkit.messageHandlers.setUserInfo.postMessage(
            JSON.stringify(userInfo),
          );
        }
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
  // 구글 로그인 후 서버로 회원가입 처리 (1)
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
  // 구글 아이콘 온클릭 (with 브릿지)
  const onClickGoogle = () => {
    if (userAgent === 'Android_App') {
      window.entizen!.requestGoogleLogin();
    } else if (userAgent === 'iOS_App') {
      window.webkit.messageHandlers.requestGoogleLogin.postMessage('');
    } else {
      googleLogin();
    }
  };
  // 네이버 로그인
  const NaverApi = async (data: any) => {
    const NAVER_POST = `https://api.entizen.kr/api/members/login/sns`;
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
        localStorage.setItem('SNS_MEMBER', JSON.stringify(token.isSnsMember));
        localStorage.setItem('USER_ID', JSON.stringify(data.user.email));
        console.log(user.email);
        localStorage.setItem('ACCESS_TOKEN', JSON.stringify(c.accessToken));
        localStorage.setItem('REFRESH_TOKEN', JSON.stringify(c.refreshToken));
        dispatch(originUserAction.set(data.user.email));

        // ================브릿지 연결=====================
        const userInfo = {
          SNS_MEMBER: token.isSnsMember,
          MEMBER_TYPE: token.memberType,
          ACCESS_TOKEN: res.data.accessToken,
          REFRESH_TOKEN: res.data.refreshToken,
          USER_ID: data.user.email,
        };
        console.log('==========userInfo==========');
        console.log(userInfo);
        if (userAgent === 'Android_App') {
          window.entizen!.setUserInfo(JSON.stringify(userInfo));
        } else if (userAgent === 'iOS_App') {
          window.webkit.messageHandlers.setUserInfo.postMessage(
            JSON.stringify(userInfo),
          );
        }
        router.push('/');
      } else {
        router.push('/signUp/SnsTerms');
      }
    });
  };
  // 네이버 온클릭
  const handleNaver = async () => {
    if (naverRef) {
      naverRef.current.children[0].click();
    }
  };
  // 나이스 인증 온클릭 함수
  const fnPopup = (type: 'id' | 'password') => {
    console.log('🔥 type ==>>', type);
    if (type === 'id') {
      setIsId(true);
      // console.log(data);
      // console.log('id입니다');
    }
    if (type === 'password') {
      setIsPassword(true);
      // console.log('passowrd입니다');
    }
    if (typeof window !== 'object') return;
    else {
      window.open(
        '',
        'popupChk',
        'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no',
      );
      document.form_chk.action =
        'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb';
      document.form_chk.target = 'popupChk';
      document.form_chk.submit();
    }
  };
  const onClcikFindId = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: 'id' | 'password',
  ) => {
    e.preventDefault();
    setFind(true);
    setFindText(type);

    // router.push({
    //   pathname: '/find/password',
    //   query: {
    //     loginType: loginTypeEnList[selectedLoginType],
    //   },
    // });
  };
  const onClickPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    router.push({
      pathname: '/find/password',
      query: {
        loginType: loginTypeEnList[selectedLoginType],
      },
    });
  };
  // 아이디 찾기
  const HandleFindId = async () => {
    let key = localStorage.getItem('key');
    let data: FindKey = JSON.parse(key!);
    console.log(data);
    if (data.isMember) {
      dispatch(findUserInfoAction.addId(data.id));
      localStorage.removeItem('key');
      router.push('/find/id');
    } else {
      setErrorMessage(
        '탈퇴한 계정입니다.\n엔티즌 이용을 원하시면\n 다시 가입해주세요.',
      );
      setErrorModal((prev) => !prev);
      localStorage.removeItem('key');
    }
  };
  // // 비밀번호 찾기
  // const HandleFindPassword = async () => {
  //   let key = localStorage.getItem('key');
  //   let data: FindKey = JSON.parse(key!);
  //   if (data.isMember) {
  //     console.log('멤버 확인 -> ' + data.isMember);
  //     localStorage.getItem('key');
  //     router.push('/find/password');
  //   } else {
  //     setErrorMessage(
  //       '탈퇴한 계정입니다.\n엔티즌 이용을 원하시면\n 다시 가입해주세요.',
  //     );
  //     setErrorModal((prev) => !prev);
  //   }
  // };
  // 엔터키 이벤트
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') originLogin();
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
        setData(res.data.executedData);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLoginType]);

  // 구글 브릿지 연결 (앱 -> 웹)
  useEffect(() => {
    if (userAgent === 'Android_App') {
      window.responseGoogleLogin = (
        isSuccess: String,
        id: String,
        email: String,
      ) => {
        if (isSuccess === 'true') {
          googleLoginMutate({
            url: '/members/login/sns',
            data: {
              uuid: id,
              snsType: 'GOOGLE',
              snsResponse: JSON.stringify({ id, email }),
              email: email,
            },
          });
        } else if (isSuccess === 'false') {
          alert('로그인 실패했습니다.');
        }
      };
    } else if (userAgent === 'iOS_App') {
      window.responseGoogleLogin = (
        isSuccess: String,
        id: String,
        email: String,
      ) => {
        if (isSuccess === 'true') {
          googleLoginMutate({
            url: '/members/login/sns',
            data: {
              uuid: id,
              snsType: 'GOOGLE',
              snsResponse: JSON.stringify({ id, email }),
              email: email,
            },
          });
        } else if (isSuccess === 'false') {
          alert('로그인 실패했습니다.');
        }
      };
    }
  }, []);
  // 네이버 로그인
  useEffect(() => {
    login(naverLogin, (naverLogin) => {
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

  //애플 로그인 체크
  useEffect(() => {
    document.addEventListener('AppleIDSignInOnSuccess', (data: any) => {
      //handle successful response
      console.log('AppleIDSignInOnSuccess', data);
      console.log(data.detail.authorization);
      //todo success logic

      const token = data.detail.authorization.id_token;
      console.log(token);
      const base64Payload = token.split('.')[1]; //value 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
      const payload = Buffer.from(base64Payload, 'base64');
      const result: AppleResult = JSON.parse(payload.toString());

      console.log(
        '=============== apple login useEffect 실행 =========================',
      );
      handleAppleLogin(result);
    });
    //애플로 로그인 실패 시.
    document.addEventListener('AppleIDSignInOnFailure', (error) => {
      //handle error.
      console.log('AppleIDSignInOnFailure');
      //todo fail logic
    });
  }, []);

  // 애플로그인 핸들러
  const handleAppleLogin = async (result: AppleResult) => {
    console.log(
      '=============== apple login 핸들러 함수 실행 =========================',
    );
    // console.log('애플로그인 user 유니크값 : ', result);

    const APPLE_POST = `https://api.entizen.kr/api/members/login/sns`;
    await axios({
      method: 'post',
      url: APPLE_POST,
      data: {
        uuid: result.sub,
        snsType: 'APPLE',
        snsResponse: JSON.stringify(result),
        email: result.email,
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
        localStorage.setItem('SNS_MEMBER', JSON.stringify(token.isSnsMember));
        localStorage.setItem('USER_ID', JSON.stringify(result.email));
        localStorage.setItem('ACCESS_TOKEN', JSON.stringify(c.accessToken));
        localStorage.setItem('REFRESH_TOKEN', JSON.stringify(c.refreshToken));
        dispatch(originUserAction.set(result.email));

        // ================브릿지 연결=====================
        const userInfo = {
          SNS_MEMBER: token.isSnsMember,
          MEMBER_TYPE: token.memberType,
          ACCESS_TOKEN: res.data.accessToken,
          REFRESH_TOKEN: res.data.refreshToken,
          USER_ID: result.email,
        };
        console.log('==========userInfo==========');
        console.log(userInfo);
        if (userAgent === 'Android_App') {
          window.entizen!.setUserInfo(JSON.stringify(userInfo));
        } else if (userAgent === 'iOS_App') {
          window.webkit.messageHandlers.setUserInfo.postMessage(
            JSON.stringify(userInfo),
          );
        }
        router.push('/');
      } else {
        router.push('/signUp/SnsTerms');
      }
    });
  };

  // 유저타입 확인하는 useEffect
  useEffect(() => {
    if (selectedLoginType === 0) {
      dispatch(selectAction.select('USER'));
    } else if (selectedLoginType === 1) {
      dispatch(selectAction.select('COMPANY'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLoginType]);

  useEffect(() => {
    localStorage.removeItem('key');
  }, []);

  if (loginLoading) {
    console.log('loading..');
    // return <Loader />;
  }

  return (
    <React.Fragment>
      <Head>
        <script
          type="text/javascript"
          src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
        ></script>
        <meta name="appleid-signin-client-id" content="entizenapplekey" />
        <meta
          name="appleid-signin-redirect-uri"
          content="https://api.entizen.kr/api/auth/apple"
        />
        <meta name="appleid-signin-scope" content="name email" />
        <meta name="appleid-signin-state" content="" />
        <meta name="appleid-signin-use-popup" content="true" />
      </Head>
      {/* 기업 아이디/비밀번호 찾기 모달 */}
      {/* 모바일 */}
      {mobile && find && (
        <MobileFindModal
          buttonText={findText}
          onClickCheck={() =>
            findText === 'id'
              ? fnPopup(findText)
              : router.push({
                  pathname: '/find/password',
                  query: {
                    loginType: loginTypeEnList[selectedLoginType],
                  },
                })
          }
          onClickCloseModal={() => setFind(false)}
        />
      )}
      {/* 웹 */}
      {!mobile && find && (
        <FindIdModal
          buttonText={findText}
          onClickCheck={() =>
            findText === 'id'
              ? fnPopup(findText)
              : router.push({
                  pathname: '/find/password',
                  query: {
                    loginType: loginTypeEnList[selectedLoginType],
                  },
                })
          }
          onClickCloseModal={() => setFind(false)}
        />
      )}
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
            {!mobile && (
              <SignUpHeader
                title={mobile ? '' : '로그인'}
                back={false}
                homeBtn={false}
                web={true}
              />
            )}
            {/* <Container
              disableGutters
              sx={{
                width: '100%',
                height: '580.5pt',
                overflow: 'scroll !important',
              }}
              style={{ border: '1px solid red' }}
            > */}
            <AllContainer>
              <BackBox onClick={() => router.push('/')}>
                <BackBtn src="/images/back-btn.svg" />
              </BackBox>
              <Container
                disableGutters
                sx={{
                  width: '100%',
                  // paddingLeft: '9pt',
                  // paddingRight: '9pt',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    gap: '15pt',
                    alignItems: 'center',
                    marginTop: mobile ? '9.375pt' : '24pt',
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
                          fontFamily: 'Spoqa Han Sans Neo',
                          lineHeight: '15pt',
                          padding:
                            loginType === '일반회원 로그인'
                              ? '6pt 0pt 6pt 0pt'
                              : '6pt',
                          // padding: '6pt',
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
              {/* <Container
                disableGutters
                sx={{
                  width: '100%',
                  marginTop: '42pt',
                  padding: '0 25pt',
                }}
              > */}
              <ContainerBox>
                {/* <Box sx={{ textAlign: 'center' }}> */}
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
                {/* </Box> */}
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
                        <FindBtn
                          onClick={(e) => {
                            selectedLoginType === 0
                              ? fnPopup('id')
                              : onClcikFindId(e, 'id');
                          }}
                        >
                          아이디 찾기
                        </FindBtn>
                        <FindBtn
                          onClick={(e) => {
                            selectedLoginType === 0
                              ? onClickPassword(e)
                              : onClcikFindId(e, 'password');
                          }}
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
                    {/* {isPassword && (
                      <Buttons
                        className="firstNextPage"
                        onClick={HandleFindPassword}
                      >
                        숨겨진 비밀번호 버튼
                      </Buttons>
                    )} */}
                  </Box>
                </Box>
                <TestWrap>
                  <div
                    ref={appleRef}
                    id="appleid-signin"
                    data-color="black"
                    data-border="true"
                    data-type="sign in"
                    data-width="100"
                    data-height="32"
                    data-mode="center-align"
                  ></div>
                </TestWrap>

                {selectedLoginType === 0 && (
                  <>
                    <Box
                      sx={{
                        width: 'calc(100% - 37.5pt)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // margin: '102pt auto 0',
                        margin: '48pt auto 0',
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
                      {/* 애플 로그인 앱 심사로 인해 잠시 주석처리 */}
                      <Box
                        sx={{
                          height: '33pt',
                          marginRight: '15pt',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          if (appleRef.current) appleRef.current.click();
                        }}
                      >
                        <Image src={apple} alt="apple" />
                      </Box>
                      <NaverBox>
                        <Box ref={naverRef} id="naverIdLogin" />
                        <Image onClick={handleNaver} src={naver} alt="naver" />
                      </NaverBox>
                      {/* 구글 로그인 */}
                      <Box sx={{ height: '33pt', cursor: 'pointer' }}>
                        <Image
                          src={google}
                          alt="google"
                          onClick={onClickGoogle}
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
                      {/* <Divider
                        sx={{
                          background: '#CACCD1',
                          width: '35%',
                          height: '0.375pt',
                        }}
                      ></Divider> */}
                      <Line />
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 400,
                          fontFamily: 'Spoqa Han Sans Neo',
                          fontSize: '10.5pt',
                          lineHeight: '12pt',
                          textAlign: 'center',
                          letterSpacing: '-0.02em',
                          color: '#CACCD1',
                        }}
                      >
                        또는
                      </Typography>
                      <Line />
                      {/* <Divider
                        sx={{
                          background: '#CACCD1',
                          width: '35%',
                          height: '0.375pt',
                        }}
                      ></Divider> */}
                    </Box>
                  </>
                )}
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
              </ContainerBox>
              {/* </Container> */}
            </AllContainer>
            {/* </Container> */}
          </WebWrapper>
        </Inner>
        <WebFooter />
      </Body>
    </React.Fragment>
  );
};

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
  @media (min-width: 900pt) {
    width: 250.5pt;
  }
  & .MuiInputBase-root {
    padding-right: 0pt !important;
  }
  .MuiOutlinedInput-root {
    &:hover fieldset {
      border: 0.75 solid #e2e5ed;
    }
    &.Mui-focused fieldset {
      border: 0.75pt solid #5221cb;
    }
  }
  .MuiOutlinedInput-notchedOutline {
    border: 0.75 solid #e2e5ed;
  }
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  line-height: 12pt;
  border-radius: 6pt;
  outline: none;
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
    /* padding: 0 15pt; */
    padding: 0 15pt 87pt;
  }
  @media (min-width: 900pt) {
    padding: 23.25pt 46.5pt 49.5pt;
  }
`;
const WebWrapper = styled.div`
  position: relative;
  /* margin: 0 31.875pt; */

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
  /* margin-left: 15pt; */
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
  box-shadow: 0px 0px 7.5pt 0px rgba(137, 163, 201, 0.2);
  background-color: #ffffff;
  border-radius: 6pt;
  width: 100%;
  padding: 15pt 0;
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 700;
  font-size: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: #595757;
  @media (max-width: 899.25pt) {
    margin-bottom: 87pt;
  }
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
  font-family: 'Spoqa Han Sans Neo';
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
  display: none;
`;

const AllContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* width: 100%;
  margin-top: 42pt; */
  /* padding: 0 25pt; */

  width: 100%;
  /* height: 580.5pt; */
  overflow: scroll !important;
`;

const ContainerBox = styled.div`
  width: 100%;
  margin-top: 42pt;
  /* padding: 0 25pt; */
`;

const IDPWInput = styled.textarea`
  width: 335px;
  height: 52px;
  border: 0.75pt solid #e2e5ed;
`;

const Line = styled.div`
  width: 35%;
  border: 0.375pt solid #caccd1;
`;
