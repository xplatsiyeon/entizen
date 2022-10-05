import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Divider,
} from '@mui/material';
import Link from 'next/link';
import styled from '@emotion/styled';
import WebHeader from 'web-components/WebHeader';
import WebFooter from 'web-components/WebFooter';
import { useRouter } from 'next/router';
import kakao from 'public/images/kakao.svg';
import naver from 'public/images/naver.svg';
import google from 'public/images/google.svg';
import apple from 'public/images/apple.svg';
import Image from 'next/image';
import { getToken, login } from 'api/auth/naver';
import { useDispatch } from 'react-redux';
import { naverAction } from 'store/naverSlice';

import axios from 'axios';
import { userAction } from 'store/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { originUserAction } from 'store/userInfoSlice';
import { kakaoInit } from 'utils/kakao';
import colors from 'styles/colors';
type Props = {};

const Signin = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.userList);
  const naverRef = useRef<HTMLElement | null | any>(null);
  const [userId, setUserId] = useState<string>('');
  const [data, setData] = useState<any>();
  const [password, setPassword] = useState<string>('');
  const [selectedLoginType, setSelectedLoginType] = useState<number>(0);
  const loginTypeList: string[] = ['일반회원 로그인', '기업회원 로그인'];
  const [wrongPw, setWrongPw] = useState<string>('');
  let naverLogin: any;
  // 카카오 API
  const KaKaApi = async (data: any) => {
    const KAKAO_POST = `https://test-api.entizen.kr/api/members/login/sns`;
    try {
      await axios({
        method: 'post',
        url: KAKAO_POST,
        data: {
          uuid: '' + data.id,
          snsType: 'KAKAO',
          snsResponse: JSON.stringify(data),
          email: data.kakao_account.email,
        },
        headers: {
          ContentType: 'application/json',
        },
        withCredentials: true,
      }).then((res) => {
        console.log('카카오로그인 KaKaAPI =>  ' + res);
        console.log(res);
        console.log(res.data);
        // const match = res.config.data.match(/\((.*)\)/);
        let c = res.data;
        let d = JSON.parse(res.config.data);
        console.log('카카오 로그인 axios 부분입니다 ! ======');
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
        // console.log('c 확인');
        // console.log(c);
        console.log(c.isMember);
        if (c.isMember === true) {
          console.log('멤버 확인');
          console.log(data);
          localStorage.setItem('USER_ID', data.kakao_account.email);
          // console.log(user.email);
          localStorage.setItem('ACCESS_TOKEN', JSON.stringify(c.accessToken));
          localStorage.setItem('REFRESH_TOKEN', JSON.stringify(c.refreshToken));
          dispatch(originUserAction.set(data.kakao_account.email));
          router.push('/');
        } else {
          router.push('/signUp/Terms');
        }
      });
    } catch (error: any) {
      if (error.data.message.include('비밀번호')) {
        setWrongPw(error.data.message);
      }
      console.log('post 요청 실패');
      console.log('카카오로그인 에러  =>   ' + error);
      console.log(error);
    }
  };
  // 카카오 로그인
  const kakaoLogin = async () => {
    // 카카오 초기화
    const kakao = kakaoInit();
    // 카카오 로그인 구현
    kakao.Auth.login({
      success: () => {
        kakao.API.request({
          url: '/v2/user/me', // 사용자 정보 가져오기
          success: (res: any) => {
            // 로그인 성공할 경우 정보 확인 후 /kakao 페이지로 push
            KaKaApi(res);
            console.log('아래는 카카오로그인 성공시 데이터입니다.');
            console.log(res);
          },
          fail: (error: any) => {
            console.log(error);
            console.log('아래는 카카오로그인 실패시 데이터입니다.');
            console.log(error);
          },
        });
      },
      fail: (error: any) => {
        console.log(error);
        console.log('아래는 마지막 카카오로그인 완전 실패데이터입니다.');
        console.log(error);
      },
    });
  };
  // 기본 로그인
  const originLogin = async () => {
    console.log('로그인 온클릭');
    const ORIGIN_API = `https://test-api.entizen.kr/api/members/login`;
    try {
      await axios({
        method: 'post',
        url: ORIGIN_API,
        data: {
          memberType: 'USER',
          id: userId,
          password: password,
        },
        headers: {
          ContentType: 'application/json',
        },
        withCredentials: true,
      })
        .then(async (res) => {
          console.log('response 데이터 ->');
          console.log(res.data.accessToken);
          console.log(res.data.refreshToken);
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
          console.log('api 에러 발생!!');
          console.log(error);
        });
    } catch (error) {
      console.log('에러가 발생했다!!!');
      console.log(error);
    }
  };
  // 네이버 로그인
  const NaverApi = async (data: any) => {
    const NAVER_POST = `https://test-api.entizen.kr/api/members/login/sns`;
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
          localStorage.setItem('USER_ID', data.user.email);
          console.log(user.email);
          localStorage.setItem('ACCESS_TOKEN', JSON.stringify(c.accessToken));
          localStorage.setItem('REFRESH_TOKEN', JSON.stringify(c.refreshToken));
          dispatch(originUserAction.set(data.user.email));
          router.push('/');
        } else {
          router.push('/signUp/Terms');
        }
      });
    } catch (error) {
      console.log('post 요청 실패');
      console.log(error);
    }
  };

  // 구글 로그인
  // const GoogleLogin = ()=> {}

  // 나이스 인승
  const fnPopup = () => {
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
  // 안내문
  const handleAlert = () => {
    alert('현재 개발 중 입니다.');
  };
  // 아이디 찾기
  const HandleFindId = async () => {
    const FINT_API = 'https://test-api.entizen.kr/api/';
    let key = localStorage.getItem('key');
    console.log(`key -> ${key}`);
    let data = JSON.parse(key!);
    console.log(`data -> ${data}`);
    try {
      console.log('이름 =>   ' + data.name);
      console.log('번호 =>   ' + data.phone);

      await axios({
        method: 'post',
        url: FINT_API,
        data: {},
        headers: {
          ContentType: 'application/json',
        },
        withCredentials: true,
      }).then((res) => router.push('/find/id'));
    } catch (error) {
      console.log('post 실패!!!!!!');
      console.log(error);
    }
  };
  // 비밀번호 찾기
  const HandleFindPassword = () => {
    router.push('/find/password');
  };
  // 나이스 인증
  useEffect(() => {
    console.log('나이스 인증 키 확인 ->' + localStorage.getItem('key'));
    const memberType = 'USER';

    axios({
      method: 'post',
      url: 'https://test-api.entizen.kr/api/auth/nice',
      data: { memberType },
    })
      .then((res) => {
        // console.log(res.data);
        setData(res.data.executedData);
        console.log('---------');
        console.log(data);
        console.log('---------');
        // encodeData = res.data.executedData;
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 네이버 로그인
  useEffect(() => {
    login(naverLogin, function (naverLogin) {
      const hash = router.asPath.split('#')[1]; // 네이버 로그인을 통해 전달받은 hash 값
      console.log('hash -> ' + hash);

      if (hash) {
        const token = hash.split('=')[1].split('&')[0]; // token값 확인
        console.log('토큰입니다 => ' + token);
        naverLogin.getLoginStatus((status: any) => {
          if (status) {
            // 로그인 상태 값이 있을 경우
            console.log('[로그인상태값] 네이버 => ' + status);
            console.log('[whj] 네이버 로그인 데이터 => ' + naverLogin);
            console.log(naverLogin);
            // let email = naverLogin.user.getEmail();
            // localStorage.setItem();
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
  const handleNaver = async () => {
    naverRef.current.children[0].click();
  };
  return (
    <React.Fragment>
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
                    alignItems: 'center',
                    marginTop: '6pt',
                  }}
                >
                  {loginTypeList.map((loginType, index) => (
                    <Box key={index} sx={{ marginRight: '24pt' }}>
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
                  <TextField
                    id="outlined-basic"
                    placeholder="아이디 입력"
                    onChange={(e) => {
                      setUserId(e.target.value);
                    }}
                    sx={{
                      width: '100%',
                      fontWeight: '400',
                      border: '1px solid #E2E5ED',
                      fontSize: '12pt',
                      lineHeight: '12pt',
                      borderRadius: '6pt',
                    }}
                  />
                  <TextField
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
                      width: '100%',
                      marginTop: '9pt',
                      border: '1px solid #E2E5ED',
                      borderRadius: '6pt',
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
                      <form name="form_chk" method="post">
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
                        {/* <!-- 위에서 업체정보를 암호화 한 데이타입니다. --> */}
                        <FindBtn name={'form_chk'} onClick={fnPopup}>
                          아이디 찾기&nbsp;
                        </FindBtn>
                        <FindBtn name={'form_chk'} onClick={fnPopup}>
                          &nbsp;비밀번호 찾기
                        </FindBtn>
                      </form>
                    </div>
                    <Buttons className="firstNextPage" onClick={HandleFindId}>
                      아이디 찾기 버튼
                    </Buttons>
                    {/* <Buttons className="firstNextPage" onClick={HandleFindId}>
                      비밀번호 찾기 버튼
                    </Buttons> */}
                  </Box>
                </Box>
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
                    <Image onClick={kakaoLogin} src={kakao} alt="kakao" />
                    {/* <Image onClick={handleAlert} src={kakao} alt="kakao" /> */}
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
                <Box
                  sx={{
                    margin: '18pt 18pt 0 18pt',
                  }}
                >
                  <IdRegist>
                    <IdRegistBtnSpan onClick={() => router.push('/testTest')}>
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

const Inner = styled.div`
  display: block;
  position: relative;
  width: 345pt;
  //width: 281.25pt;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  background: #ffff;
  padding: 32.25pt 0 42pt;
  margin: 45.75pt auto 0;

  @media (max-width: 899pt) {
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

  @media (max-width: 899pt) {
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
  margin: auto 0;
`;
const LoginBtn = styled.button`
  background: #5a2dc9;
  width: 100%;
  color: #fff;
  margin-top: 28.5pt;
  padding: 15pt 0;
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
`;
const BtnSpan = styled.span``;
const IdRegist = styled.button`
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
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
  @media (max-width: 899pt) {
    display: block;
    width: 100%;
    padding-top: 9pt;
    padding-bottom: 9pt;
    padding-left: 15pt;
    padding-right: 15pt;
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
