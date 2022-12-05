import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import axios from 'axios';
import PasswordModal from 'components/Modal/PasswordModal';
import RequestModal from 'components/Modal/RequestModal';
import TwoBtnModal from 'components/Modal/TwoBtnModal';
import MypageHeader from 'components/mypage/request/header';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import colors from 'styles/colors';
import { kakaoInit } from 'utils/kakao';

type Props = {
  tabNumber: number;
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
  leftTabNumber: number;
  setLeftTabNumber: React.Dispatch<React.SetStateAction<number>>;
};

const SettingMain = ({
  tabNumber,
  setTabNumber,
  setLeftTabNumber,
  leftTabNumber,
}: Props) => {
  const router = useRouter();
  const userID = localStorage.getItem('USER_ID');
  const { selectedType } = useSelector((state: RootState) => state.selectType);
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const [alertModal, setAlertModal] = useState(false);
  const [secessionFirstModal, setSecessionFirstModal] =
    useState<boolean>(false);
  const [passwordModal, setPasswordModal] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [checkPassword, setCheckPassword] = useState<boolean>(false);
  const [passowrdValid, setPassowrdValid] = useState(false);

  // 네이버 로그아웃
  const NaverLogout = async () => {
    // 실제 url은 https://nid.naver.com/oauth2.0/token이지만 proxy를 적용하기 위해 도메인은 제거
    const localToken = localStorage.getItem('com.naver.nid.access_token');
    const res = await axios.get('/oauth2.0/token', {
      params: {
        grant_type: 'delete',
        client_id: process.env.NEXT_PUBLIC_NAVER_LOGIN_CLIENT_ID, // Client ID
        client_secret: process.env.NEXT_PUBLIC_NAVER_LOGIN_CLIENT_SECRET, // Client Secret
        access_token: localToken, // 발급된 Token 정보
        service_provider: 'NAVER',
      },
    });
    console.log('여기에요 여기  =>    ' + res);
    console.log(res);

    if (res) {
      router.push('/'); // 로그인 페이지로 이동
    }
  };
  // 카카오 로그아웃
  const KakaoLogout = () => {
    const kakao = kakaoInit();
    console.log(kakao.Auth.getAccessToken()); // 카카오 접근 토큰 확인 (로그인 후 해당 토큰을 이용하여 추가 기능 수행 가능)
    // 카카오 로그인 링크 해제
    kakao.API.request({
      url: '/v1/user/unlink',
      success: (res: any) => {
        // 로그인 성공할 경우 정보 확인 후 / 페이지로 push
        console.log('세팅 카카오로그아웃 부분입니다.');
        console.log(res);
        router.push('/');
      },
      fail: (error: any) => {
        console.log(error);
      },
    });
  };
  // 일반회원 로그아웃
  const handleLogoutOnClickModalClick = async () => {
    const LOG_OUT_API = `https://test-api.entizen.kr/api/members/logout`;
    const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
    try {
      await axios({
        method: 'post',
        url: LOG_OUT_API,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ContentType: 'application/json',
        },
        withCredentials: true,
      }).then((res) => {
        localStorage.removeItem('SNS_MEMBER');
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('REFRESH_TOKEN');
        localStorage.removeItem('USER_ID');
        localStorage.removeItem('MEMBER_TYPE');
        setLogoutModal(false);
        router.push('/');
      });
    } catch (error) {
      console.log('요청 실패');
      console.log(error);
    }
    NaverLogout();
    KakaoLogout();
  };
  // 회원탈퇴
  const ModalLeftControl = async () => {
    const WITHDRAWAL_API = `https://test-api.entizen.kr/api/members/withdrawal`;
    const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
    console.log('탈퇴');
    try {
      await axios({
        method: 'post',
        url: WITHDRAWAL_API,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ContentType: 'application/json',
        },
        withCredentials: true,
      })
        .then((res) => {
          localStorage.removeItem('SNS_MEMBER');
          localStorage.removeItem('ACCESS_TOKEN');
          localStorage.removeItem('REFRESH_TOKEN');
          localStorage.removeItem('USER_ID');
          localStorage.removeItem('MEMBER_TYPE');
          setLogoutModal(false);
          setAlertModal(false);
        })
        .then((res) => router.push('/'));
    } catch (error) {
      console.log('요청 실패');
      console.log(error);
    }
  };
  // SNS/일반회원 구별
  const HandleWidthdrawal = async () => {
    const snsMember = JSON.parse(localStorage.getItem('SNS_MEMBER')!);
    if (snsMember) {
      // sns 회원탈퇴
      setAlertModal(true);
    } else {
      // 일반 회원탈퇴
      setPasswordModal(true);
    }
  };
  // 회원탈퇴 시 original user 비밀번호 체크 함수
  const authPassowrd = () => {
    const memberType = selectedType;
    if (checkPassword) {
      const LOGIN_API = 'https://test-api.entizen.kr/api/members/login';
      const userId = JSON.parse(localStorage.getItem('USER_ID')!);
      const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
      try {
        axios({
          method: 'post',
          url: LOGIN_API,
          data: {
            memberType,
            id: userId,
            password: passwordInput,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
            ContentType: 'application/json',
          },
          withCredentials: true,
        })
          .then((res) => {
            if (res.data.isSuccess === true) {
              setSecessionFirstModal(true);
              setPasswordModal(false);
            }
          })
          .catch((res) => {
            console.log('api 에러 발생');
            setPassowrdValid(true);
          });
      } catch (error) {
        console.log('error -->' + error);
      }
    }
  };
  // 비밀번호 length 체크
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
    if (passwordInput.length > 5) {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
  };
  return (
    <>
      <WebBody>
        <Container>
          <WebRapper leftTabNumber={leftTabNumber}>
            {passwordModal && (
              <PasswordModal
                passowrdValid={passowrdValid}
                passwordInput={passwordInput}
                setPasswordInput={setPasswordInput}
                onChange={handlePasswordChange}
                checkPassword={checkPassword}
                click={authPassowrd}
                setPasswordModal={setPasswordModal}
              />
            )}
            {logoutModal && (
              <TwoBtnModal
                exit={() => setLogoutModal(false)}
                text={'로그아웃하시겠습니까?'}
                leftBtnText={'아니오'}
                rightBtnText={'네'}
                leftBtnColor={'#FF1B2D'}
                rightBtnColor={'#222222'}
                rightBtnControl={handleLogoutOnClickModalClick}
                leftBtnControl={() => setLogoutModal(false)}
              />
            )}
            {secessionFirstModal && (
              <RequestModal
                exit={() => setSecessionFirstModal(!secessionFirstModal)}
                title={'정말 탈퇴하시겠습니까?'}
                subtitle={`사용하고 계신 아이디${userID}는\n탈퇴할 경우 재사용 및 복구가 불가능합니다.`}
                leftControl={ModalLeftControl}
                rightControl={() =>
                  setSecessionFirstModal(!secessionFirstModal)
                }
                border={true}
              />
            )}
            {alertModal && (
              <TwoBtnModal
                exit={() => setAlertModal(false)}
                leftBtnColor="#FF1B2D"
                leftBtnText="아니오"
                leftBtnControl={() => setAlertModal(false)}
                rightBtnColor={colors.main2}
                rightBtnText="네"
                rightBtnControl={() => {
                  setAlertModal(false);
                  setSecessionFirstModal(true);
                }}
                text="비밀번호 입력 없이 정말 탈퇴하시겠습니까"
              />
            )}
            <MypageHeader
              back={true}
              title={'설정'}
              handleOnClick={() => router.back()}
            />
            <Wrapper>
              <Version>
                <VersionInfoText>버전 정보</VersionInfoText>
                <VersionNumber>V.8.33</VersionNumber>
              </Version>
              <SettingList
                onClick={() => {
                  setTabNumber(1);
                  setLeftTabNumber(1);
                }}
              >
                알림 설정
              </SettingList>
              <SettingList
                onClick={() => {
                  setTabNumber(2);
                  setLeftTabNumber(1);
                }}
              >
                1:1 문의
              </SettingList>
              <SettingList
                onClick={() => {
                  router.push('/faq');
                }}
              >
                자주 묻는 질문
              </SettingList>
              <SettingList
                onClick={() => {
                  setTabNumber(3);
                  setLeftTabNumber(1);
                }}
              >
                이용약관
              </SettingList>

              {userID && (
                <SettingListRed onClick={() => setLogoutModal(true)}>
                  로그아웃
                </SettingListRed>
              )}
              {userID && (
                <Secession onClick={HandleWidthdrawal}>탈퇴하기</Secession>
              )}
            </Wrapper>
          </WebRapper>
        </Container>
      </WebBody>
    </>
  );
};

export default SettingMain;

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  @media (max-height: 350pt) {
    height: 100%;
    display: block;
  }
`;

const Container = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;
  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    top: 0;
    left: 0%;
    transform: none;
    padding: 0;
    box-shadow: none;
    background: none;
    margin: 0;
  }
  @media (max-height: 500pt) {
    height: 100%;
  }

  @media (min-width: 900pt) {
    margin: 0 auto;
    padding-top: 0;
  }
`;

const WebRapper = styled.div<{ leftTabNumber: number }>`
  @media (min-width: 900pt) {
    /* padding: 32px 150px 180px 51px; */
    /* padding: 32px 550px 180px 51px; */
    padding: ${({ leftTabNumber }) =>
      leftTabNumber === 1
        ? '24pt 81.75pt 135pt 38.25pt'
        : '24pt 412.5pt 135pt 38.25pt'};
    border-radius: 12pt;
    box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  }
`;

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  padding-left: 15pt;
  padding-right: 15pt;
`;
const Version = styled.div`
  padding-top: 18pt;
  padding-bottom: 18pt;
  display: flex;
  gap: 9pt;
  flex-direction: column;
  background-color: #fbfcff;
  margin-bottom: 7.5pt;
  @media (min-width: 900pt) {
    display: flex;
    flex-direction: row;
    padding-top: 18pt;
    padding-bottom: 24pt;
    margin-bottom: 0;
    background-color: #ffffff;
  }
`;
const VersionInfoText = styled(Typography)`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 500;
  line-height: 12pt;
  letter-spacing: 0em;
  text-align: left;
  @media (min-width: 900pt) {
    font-size: 13.5pt;
    font-weight: 500;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;
    padding-right: 10pt;
  }
`;
const VersionNumber = styled(Typography)`
  font-family: Noto Sans KR;
  font-size: 12pt;
  font-weight: 500;
  line-height: 12pt;
  letter-spacing: 0em;
  text-align: left;
  @media (min-width: 900pt) {
    font-size: 13.5pt;
    font-weight: 400;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #a6a9b0;
  }
`;
const SettingList = styled.div`
  position: relative;
  padding-top: 10.5pt;
  padding-bottom: 10.5pt;
  cursor: pointer;
  &:nth-child(7) {
    color: #f75015;
  }
  @media (min-width: 900pt) {
    padding-top: 24pt;
    padding-bottom: 24pt;
    font-size: 13.5pt;
    font-weight: 500;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

const SettingListRed = styled.div`
  position: relative;
  padding-top: 10.5pt;
  padding-bottom: 10.5pt;
  color: #f75015;
  @media (min-width: 900pt) {
    padding-top: 24pt;
    padding-bottom: 24pt;
    font-size: 13.5pt;
    font-weight: 500;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const Secession = styled.div`
  position: fixed;
  padding-top: 10.5pt;
  padding-bottom: 10.5pt;
  margin-bottom: 19.5pt;
  bottom: 0;
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 400;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: left;
  text-decoration-line: underline;
  color: #a6a9b0;
  @media (min-width: 900pt) {
    position: relative;
    top: 130pt;
  }
`;
