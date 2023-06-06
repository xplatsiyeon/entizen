import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import companyImg from 'public/images/company.svg';
import companyOnImg from 'public/images/company_on.svg';
import userImg from 'public/images/user.svg';
import userOnImg from 'public/images/user_on.svg';
import colors from 'styles/colors';
import Btn from './button';
import { useDispatch } from 'react-redux';
import { selectAction } from 'store/loginTypeSlice';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import Link from 'next/link';
import kakao from 'public/images/kakao.svg';
import naver from 'public/images/naver.svg';
import google from 'public/images/google.svg';
import apple from 'public/images/apple.svg';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import { userAction } from 'store/userSlice';
import { originUserAction } from 'store/userInfoSlice';
import { useMutation } from 'react-query';
import { isPostApi } from 'api';
import { useNaverAuthHook } from 'hooks/useNaverAuthHook';
import instance from 'api/interceptor/service';
import { GoogleSignUpData } from 'pages/auth/google';
import {
  AppleResult,
  JwtTokenType,
  KAKAO_AUTH_URL,
  Line,
  NaverBox,
  loginTypeEnList,
} from 'pages/signin';

type Props = {
  userType: number;
  setUserType: Dispatch<SetStateAction<number>>;
};

const ChooseUserType = ({ userType, setUserType }: Props) => {
  const dispatch = useDispatch();
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  const UserTypeList: string[] = ['일반 회원', '파트너 회원'];
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
  const { signUpLevel } = useSelector((state: RootState) => state.LoginType);
  // 소셜로그인
  // 네이버 로그인 훅
  const router = useRouter();
  const { login } = useNaverAuthHook();
  const naverRef = useRef<HTMLElement | null | any>(null);
  const appleRef = useRef<HTMLDivElement>(null);
  const { user } = useSelector((state: RootState) => state.userList);
  const [data, setData] = useState<any>();
  const [errorMessage, setErrorMessage] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  const [selectedLoginType, setSelectedLoginType] = useState<number>(0); // 0: 일반회원, 1: 파트너회원

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
  const fnPopup = () => {
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
  const handleClick = () => {
    dispatch(selectAction.setSignUpLevel(signUpLevel + 1));
    if (userType === 0) dispatch(selectAction.select('USER'));
    if (userType === 1) dispatch(selectAction.select('COMPANY'));
  };
  // 나이스 인증
  useEffect(() => {
    const memberType = loginTypeEnList[selectedLoginType];
    instance({
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
  useEffect(() => {
    dispatch(
      selectAction.setTerm({
        fullTerms: false,
        requiredTerms: false,
        selectTerms: [false],
        requiredCheck: [false, false, false],
      }),
    );
  }, []);

  return (
    <>
      {mobile && <Notice variant="h3">어떤 용무로 오셨나요?</Notice>}
      <SelectWrapper>
        {UserTypeList.map((type, index) => (
          <div key={index}>
            {type === '일반 회원' && (
              <>
                <WebRapper>
                  <SubTitle>다양한 충전기를 비교해보고 싶다면?</SubTitle>
                  <Select
                    type={userType.toString()}
                    idx={index.toString()}
                    onClick={() => {
                      setUserType(index);
                      if (!mobile) {
                        handleClick();
                      }
                    }}
                  >
                    <Image
                      src={userType === index ? userOnImg : userImg}
                      alt="user"
                    />
                    <div>{type}</div>
                  </Select>
                </WebRapper>
                {/* =========================================== 소셜로그인 ========================================== */}
                {!mobile && (
                  <>
                    <SubName>일반 회원 간편하게 회원가입</SubName>
                    <AuthWrap>
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
                    </AuthWrap>
                    <BoldLine />
                  </>
                )}
                {/* ===================================================================================== */}
              </>
            )}

            {type === '파트너 회원' && (
              <div>
                <SubTitle>고객과 손쉬운 거래를 진행하려면?</SubTitle>
                <Select
                  type={userType.toString()}
                  idx={index.toString()}
                  onClick={() => {
                    setUserType(index);
                    if (!mobile) {
                      handleClick();
                    }
                  }}
                >
                  <Image
                    src={userType === index ? companyOnImg : companyImg}
                    alt="company"
                  />
                  <div>{type}</div>
                </Select>
              </div>
            )}
          </div>
        ))}
      </SelectWrapper>
      {mobile && (
        <Btn
          isClick={userType !== -1 ? true : false}
          text={'다음'}
          marginTop={42.75}
          handleClick={handleClick}
        />
      )}
    </>
  );
};

const WebRapper = styled.div`
  @media (min-width: 900pt) {
    margin-bottom: 36pt;
  }
  margin-bottom: 15pt;
`;
const SubName = styled.p`
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightGray7};
`;
const SubTitle = styled.div`
  padding-bottom: 18pt;
  font-weight: 500;
  font-size: 15pt;
  line-height: 15pt;
  text-align: center;
  letter-spacing: -0.02em;
  font-family: 'Spoqa Han Sans Neo';
  color: #747780;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const Notice = styled(Typography)`
  margin-top: 28.5pt;
  font-weight: 700;
  font-size: 21pt;
  line-height: 33pt;
  text-align: center;
  letter-spacing: -0.02em;
  font-family: 'Spoqa Han Sans Neo';
  color: ${colors.main2};
`;
const SelectWrapper = styled(Box)`
  margin-top: 30pt;
`;
const Select = styled(Box)<{ type: string; idx: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  gap: 18pt;
  padding: 21pt 0;
  border: 0.75pt solid
    ${({ type, idx }) => (type === idx ? colors.main : colors.lightGray)};
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 8px;
  color: ${({ type, idx }) => type === idx && colors.main};
  background-color: ${({ type, idx }) => type === idx && '#f8f6ff'};
  :nth-of-type(1) {
    margin-bottom: 15pt;
  }
  & > div {
    font-weight: 400;
    font-size: 18pt;
    line-height: 18pt;
    font-family: 'Spoqa Han Sans Neo';
  }
`;

const BoldLine = styled.div`
  width: 460px;
  height: 6pt;
  background: #f3f4f7;
  position: absolute;
  left: 0;
  bottom: 296px;
`;

const AuthWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24pt;
  margin-bottom: 78pt;
`;

export default ChooseUserType;
