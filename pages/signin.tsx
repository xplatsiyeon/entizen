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
import { useNaverAuthHook } from 'hooks/useNaverAuthHook';
import FindIdComponents from 'components/FindId';
import { reg_password } from 'utils/user';
import instance from 'api/interceptor/service';
export interface JwtTokenType {
  exp: number;
  iat: number;
  isSnsMember: boolean;
  iss: string;
  memberIdx: number;
  memberType: string;
}
export interface AppleResult {
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

export const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
export const REDIRECT_URI = 'https://api.entizen.kr/auth/kakao';
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const loginTypeList: string[] = ['일반회원 로그인', '파트너회원 로그인'];
export const loginTypeEnList: string[] = ['USER', 'COMPANY'];

const Signin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const mobile = useMediaQuery({
    query: '(max-width:810pt)',
  });
  const naverRef = useRef<HTMLElement | null | any>(null);
  const appleRef = useRef<HTMLDivElement>(null);

  const { user } = useSelector((state: RootState) => state.userList);
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);

  // 아이디 찾기 View 전환
  const [isFindId, setIsFindId] = useState(false);
  const [isFindIdView, setIsFindIdView] = useState(false);

  const [userId, setUserId] = useState<string>('');
  const [data, setData] = useState<any>();
  const [password, setPassword] = useState<string>('');
  const [selectedLoginType, setSelectedLoginType] = useState<number>(0);
  const [isId, setIsId] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  // 아이디 찾기 모달
  const [find, setFind] = useState(false);
  const [findText, setFindText] = useState<'id' | 'password'>('id');
  // 기업로그인 가입 후 첫 로그인
  const [userCompleteModal, setUserCompleteModal] = useState<boolean>(false);

  // 비밀번호 유효성 검사
  const [isValid, setIsValid] = useState(false);
  // 네이버 로그인 훅
  const { login } = useNaverAuthHook();

  // 구글 로그인 버튼 온클릭
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log(tokenResponse.access_token);
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
      // console.log('구글 로그인 실패');
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
    loginTypeEnList[selectedLoginType] as 'USER' | 'COMPANY',
    false,
  );
  // 기본 로그인
  const originLogin = async () => {
    if (!userId && !password) {
      setErrorModal(true);
      setErrorMessage('이메일를 입력해주세요.');
    } else if (!userId) {
      setErrorModal(true);
      setErrorMessage('이메일를 입력해주세요.');
    } else if (!password) {
      setErrorModal(true);
      setErrorMessage('비밀번호를 입력해 주세요.');
    } else {
      await signin(password);
    }
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
  // 네이버 온클릭
  const handleNaver = async () => {
    console.log(naverRef.current.children[0]);
    if (naverRef) {
      console.log(naverRef.current.children[0]);
      naverRef.current.children[0].click();
    }
  };
  // 나이스 인증 온클릭 함수
  const fnPopup = (type: 'id' | 'password') => {
    if (type === 'id') {
      setIsId(true);
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
    let key = sessionStorage.getItem('key');
    let data: FindKey = JSON.parse(key!);
    // console.log(data);

    if (data.isMember) {
      dispatch(findUserInfoAction.setId(data.id));
      dispatch(findUserInfoAction.setSNS(data.snsType));
      // router.push('/find/id');
      setIsFindId(true);
    } else {
      dispatch(findUserInfoAction.reset());
      sessionStorage.removeItem('key');
      setIsFindId(false);
    }
    setIsFindIdView(true);
  };

  // 엔터키 이벤트
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') originLogin();
  };
  // 나이스 인증
  useEffect(() => {
    const memberType = loginTypeEnList[selectedLoginType];
    instance({
      // headers: {
      //   local: process.env.NEXT_PUBLIC_LOCAL!,
      // },
      method: 'post',
      url: `/auth/nice`,
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
    login();
  }, []);

  //애플 로그인 체크
  useEffect(() => {
    document.addEventListener('AppleIDSignInOnSuccess', (data: any) => {
      const token = data.detail.authorization.id_token;
      const base64Payload = token.split('.')[1]; //value 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
      const payload = Buffer.from(base64Payload, 'base64');
      const result: AppleResult = JSON.parse(payload.toString());
      handleAppleLogin(result);
    });
    //애플로 로그인 실패 시.
    document.addEventListener('AppleIDSignInOnFailure', (error) => {});
  }, []);

  // 애플로그인 핸들러
  const handleAppleLogin = async (result: AppleResult) => {
    // const APPLE_POST = `${process.env.NEXT_PUBLIC_BASE_URL}/members/login/sns`;
    await instance({
      method: 'post',
      url: '/members/login/sns',
      data: {
        uuid: result.sub,
        snsType: 'APPLE',
        snsResponse: JSON.stringify(result),
        email: result.email,
      },

      // headers: {
      //   ContentType: 'application/json',
      // },
      // withCredentials: true,
    }).then((res) => {
      let c = res.data;
      let d = JSON.parse(res.config.data);
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
        sessionStorage.setItem('SNS_MEMBER', JSON.stringify(token.isSnsMember));
        sessionStorage.setItem('USER_ID', JSON.stringify(result.email));
        sessionStorage.setItem('ACCESS_TOKEN', JSON.stringify(c.accessToken));
        sessionStorage.setItem('REFRESH_TOKEN', JSON.stringify(c.refreshToken));
        dispatch(originUserAction.set(result.email));
        // ================ 브릿지 연결 =====================
        const userInfo = {
          SNS_MEMBER: token.isSnsMember,
          MEMBER_TYPE: token.memberType,
          ACCESS_TOKEN: res.data.accessToken,
          REFRESH_TOKEN: res.data.refreshToken,
          USER_ID: result.email,
        };
        // console.log('================== userInfo =====================');
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
    console.log(
      '==================== 유저 타입 확인 ==========================',
    );
    if (selectedLoginType === 0) {
      dispatch(selectAction.select('USER'));
    } else if (selectedLoginType === 1) {
      dispatch(selectAction.select('COMPANY'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLoginType]);

  useEffect(() => {
    sessionStorage.removeItem('key');
    dispatch(selectAction.reset());
  }, []);

  useEffect(() => {
    console.log('🔥 isValid : ', isValid);
    if (reg_password(password)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [password]);

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
          content={process.env.NEXT_PUBLIC_BASE_URL + '/auth/apple'}
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

            <AllContainer>
              {/* 아이디 찾기 컴포넌트 */}
              {isFindIdView ? (
                <div>
                  <FindIdComponents
                    isFindId={isFindId}
                    setIsFindId={setIsFindId}
                    setIsFindIdView={setIsFindIdView}
                  />
                </div>
              ) : (
                <div>
                  {/* PC 헤더 추가 */}
                  {!mobile && (
                    <SignUpHeader
                      title={mobile ? '' : '로그인'}
                      back={false}
                      homeBtn={false}
                      web={true}
                    />
                  )}
                  <BackBox onClick={() => router.push('/')}>
                    <BackBtn src="/images/back-btn.svg" />
                  </BackBox>
                  {/* 일반 로그인 , 파트너 로그인 탭 */}
                  <Container
                    disableGutters
                    sx={{
                      width: '100%',
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
                                selectedLoginType == index
                                  ? '#5A2DC9'
                                  : '#CACCD1',
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
                  {/* 인풋 박스 및 버튼  */}
                  <ContainerBox>
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
                    {password.length > 0 && isValid === false && (
                      <AlertMessage>
                        영문, 숫자, 특수문자 조합 8자 이상 입력해 주세요
                      </AlertMessage>
                    )}

                    {/* 로그인 버튼 */}
                    <LoginBtn onClick={originLogin}>
                      <BtnSpan>로그인</BtnSpan>
                    </LoginBtn>
                  </ContainerBox>
                </div>
              )}

              {/* ============================ 아이디 찾기 / 비밀번호 찾기 버튼 ============================ */}

              <BottomSection display={!isFindId ? true : false}>
                <Box
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  <Box
                    sx={{
                      textAlign: 'center',
                      marginTop: '22.5pt',
                      color: '#747780',
                    }}
                  >
                    <div>
                      {/* 나이스 인증 */}
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
                          {selectedLoginType === 0
                            ? '이메일 찾기'
                            : '아이디 찾기'}
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
                  </Box>
                </Box>
                {/* ============================ 소셜 로그인 ============================ */}
                {selectedLoginType === 0 && (
                  <>
                    <Box
                      sx={{
                        width: 'calc(100% - 37.5pt)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
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
                    </Box>
                  </>
                )}
                <Box
                  sx={{
                    margin: '18pt 18pt 0 18pt',
                  }}
                >
                  <IdRegist onClick={() => router.push('/signUp/Terms')}>
                    <span>
                      {selectedLoginType === 0 ? '이메일' : '아이디'}로 가입하기
                    </span>
                  </IdRegist>
                </Box>
              </BottomSection>
            </AllContainer>
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
    padding: 0 15pt 87pt;
  }
  @media (min-width: 900pt) {
    padding: 23.25pt 46.5pt 49.5pt;
  }
`;
const WebWrapper = styled.div`
  position: relative;
  @media (max-width: 899.25pt) {
    margin: 0;
  }
`;
export const NaverBox = styled(Box)`
  height: 33pt;
  margin-right: 15pt;
  cursor: pointer;
  & #naverIdLogin_loginButton {
    display: none;
  }
`;
const BackBtn = styled.img``;
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
export const IdRegist = styled.button`
  cursor: pointer;
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
const SocialType = styled.div``;

const AllContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  overflow: scroll !important;
`;

const ContainerBox = styled.div`
  width: 100%;
  margin-top: 42pt;
`;

const BottomSection = styled.div<{ display: boolean }>`
  display: ${({ display }) => (display ? 'block' : 'none')};
`;

export const Line = styled.div`
  width: 35%;
  border: 0.375pt solid #caccd1;
`;
const AlertMessage = styled.p`
  margin-top: 9pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.orange};
`;
