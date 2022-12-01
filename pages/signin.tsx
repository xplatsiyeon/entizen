import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, TextField, Divider } from '@mui/material';
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
export interface JwtTokenType {
  exp: number;
  iat: number;
  isSnsMember: boolean;
  iss: string;
  memberIdx: number;
  memberType: string;
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
const REDIRECT_URI = 'https://test-api.entizen.kr/auth/kakao';
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const Signin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
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
  // 안내문
  const handleAlert = () => {
    alert('현재 개발 중 입니다.');
  };
  // 기본 로그인
  const originLogin = async () => {
    console.log('로그인 온클릭');
    const ORIGIN_API = `https://api.entizen.kr/api/members/login`;
    // 로컬에서 사용할때만 활성화 시키기
    //const ORIGIN_API = `/api/members/login`;
    try {
      await axios({
        method: 'post',
        url: ORIGIN_API,
        data: {
          memberType: loginTypeEnList[selectedLoginType],
          id: userId,
          password: password,
        },
        headers: {
          ContentType: 'application/json',
        },
        withCredentials: true,
      })
        .then(async (res) => {
          const token: JwtTokenType = jwt_decode(res.data.accessToken);
          localStorage.setItem('SNS_MEMBER', JSON.stringify(token.isSnsMember));
          localStorage.setItem('MEMBER_TYPE', JSON.stringify(token.memberType));
          localStorage.setItem(
            'ACCESS_TOKEN',
            JSON.stringify(res.data.accessToken),
          );
          localStorage.setItem(
            'REFRESH_TOKEN',
            JSON.stringify(res.data.refreshToken),
          );
          localStorage.setItem('USER_ID', JSON.stringify(userId));
          dispatch(originUserAction.set(userId));
          await router.push('/');
        })
        .catch((error) => {
          const { message } = error.response.data;
          if (message === '탈퇴된 회원입니다.') {
            setErrorModal(true);
            setErrorMessage(
              '탈퇴한 계정입니다.\n엔티즌 이용을 원하시면\n 다시 가입해주세요.',
            );
          } else {
            setErrorModal(true);
            setErrorMessage(message);
          }
        });
    } catch (error: any) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
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
          localStorage.setItem('SNS_MEMBER', JSON.stringify(token.isSnsMember));
          localStorage.setItem('USER_ID', JSON.stringify(data.user.email));
          console.log(user.email);
          localStorage.setItem('ACCESS_TOKEN', JSON.stringify(c.accessToken));
          localStorage.setItem('REFRESH_TOKEN', JSON.stringify(c.refreshToken));
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
  // 나이스 인증
  const fnPopup = (event: any) => {
    console.log('check');
    console.log(event?.currentTarget.value);
    const { value } = event.currentTarget;
    if (value === 'id') {
      setIsId(true);
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
      let cloneDocument = document as any;
      cloneDocument.form_chk.action =
        'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb';
      cloneDocument.form_chk.target = 'popupChk';
      cloneDocument.form_chk.submit();
    }
  };
  // 아이디 찾기
  const HandleFindId = async () => {
    let key = localStorage.getItem('key');
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
    let key = localStorage.getItem('key');
    let data: FindKey = JSON.parse(key!);
    if (data.isMember) {
      console.log('멤버 확인 -> ' + data.isMember);
      localStorage.getItem('key');
      router.push('/find/password2');
    } else {
      setErrorMessage(
        '탈퇴한 계정입니다.\n엔티즌 이용을 원하시면\n 다시 가입해주세요.',
      );
      setErrorModal((prev) => !prev);
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

  useEffect(() => {
    if (selectedLoginType === 0) {
      dispatch(selectAction.select('USER'));
    } else if (selectedLoginType === 1) {
      dispatch(selectAction.select('COMPANY'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLoginType]);

  const handleNaver = async () => {
    if (naverRef) {
      naverRef.current.children[0].click();
    }
  };

  return (
    <React.Fragment>
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
            <Container
              disableGutters
              sx={{
                width: '100%',
                height: '580.5pt',
                overflow: 'scroll !important',
              }}
            >
              <BackBox onClick={() => router.back()}>
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
                {selectedLoginType === 0 && (
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
                      <Box sx={{ height: '33pt', marginRight: '15pt' }}>
                        <Link href={KAKAO_AUTH_URL}>
                          <Image src={kakao} alt="kakao" />
                        </Link>
                      </Box>
                      <Box
                        sx={{ height: '33pt', marginRight: '15pt' }}
                        onClick={handleAlert}
                      >
                        <Image src={apple} alt="apple" />
                      </Box>
                      <NaverBox>
                        <Box id="naverIdLogin" ref={naverRef}></Box>
                        {/* <Image onClick={handleNaver} src={naver} alt="naver" /> */}
                        <Image onClick={handleNaver} src={naver} alt="naver" />
                      </NaverBox>
                      <Box sx={{ height: '33pt' }} onClick={handleAlert}>
                        <Image src={google} alt="google" />
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
  //height: 810pt;
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
  //width: 281.25pt;
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
const IdRegistBtnSpan = styled.span``;

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
