import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import axios from 'axios';
import PasswordModal from 'components/Modal/PasswordModal';
import RequestModal from 'components/Modal/RequestModal';
import TwoBtnModal from 'components/Modal/TwoBtnModal';
import MypageHeader from 'components/mypage/request/header';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import colors from 'styles/colors';

type Props = {};

const Setting = (props: Props) => {
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const [secessionFirstModal, setSecessionFirstModal] =
    useState<boolean>(false);
  const [passwordModal, setPasswordModal] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [checkPassword, setCheckPassword] = useState<boolean>(false);
  const router = useRouter();
  const handleLogoutModalClick = () => {
    setLogoutModal(false);
  };
  const handleLogoutOnClickModalClick = async () => {
    const LOG_OUT = `https://test-api.entizen.kr/api/members/logout`;
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    console.log(accessToken);
    console.log(JSON.parse(accessToken!));
    const refreshToken = localStorage.getItem('REFRESH_TOKEN');
    const userID = localStorage.getItem('USER_ID');

    console.log('check');
    try {
      await axios({
        method: 'post',
        url: LOG_OUT,
        headers: {
          Authorization: `Bearer ${JSON.parse(accessToken!)}`,
          ContentType: 'application/json',
        },
        withCredentials: true,
      }).then((res) => {
        console.log(res);
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('REFRESH_TOKEN');
        localStorage.removeItem('USER_ID');
      });
    } catch (error) {
      console.log('요청 실패');
      console.log(error);
    }
  };
  const handleOnClick = () => {
    router.back();
  };
  const ModalLeftControl = () => {
    setSecessionFirstModal(false);
    setPasswordModal(true);
  };
  const ModalRightControl = () => {
    setSecessionFirstModal(!secessionFirstModal);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
    if (passwordInput.length > 10) {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
  };
  return (
    <>
      {passwordModal && (
        <PasswordModal
          passwordInput={passwordInput}
          onChange={handlePasswordChange}
          checkPassword={checkPassword}
        />
      )}
      {logoutModal && (
        <TwoBtnModal
          text={'로그아웃하시겠습니까?'}
          leftBtnText={'아니오'}
          rightBtnText={'네'}
          leftBtnColor={'#FF1B2D'}
          rightBtnColor={'#222222'}
          rightBtnControl={handleLogoutOnClickModalClick}
          leftBtnControl={handleLogoutModalClick}
        />
      )}
      {secessionFirstModal && (
        <RequestModal
          title={'정말 탈퇴하시겠습니까?'}
          subtitle={
            '사용하고 계신 아이디(useridhere)는\n탈퇴할 경우 재사용 및 복구가 불가능합니다.'
          }
          leftControl={ModalLeftControl}
          rightControl={ModalRightControl}
          border={true}
        />
      )}
      <MypageHeader back={true} title={'설정'} handleOnClick={handleOnClick} />
      <Wrapper>
        <Version>
          <VersionInfoText>버전 정보</VersionInfoText>
          <VersionNumber>V.8.33</VersionNumber>
        </Version>
        <SettingList>알림 설정</SettingList>
        <SettingList>1:1 문의</SettingList>
        <SettingList onClick={() => router.push('/faq')}>
          자주 묻는 질문
        </SettingList>
        <SettingList onClick={() => router.push('/term')}>이용약관</SettingList>
        <SettingList onClick={() => setLogoutModal(true)}>로그아웃</SettingList>
        <Secession onClick={() => setSecessionFirstModal(true)}>
          탈퇴하기
        </Secession>
      </Wrapper>
    </>
  );
};
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
`;

const VersionInfoText = styled(Typography)`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 500;
  line-height: 12pt;
  letter-spacing: 0em;
  text-align: left;
`;

const VersionNumber = styled(Typography)`
  font-family: Noto Sans KR;
  font-size: 12pt;
  font-weight: 500;
  line-height: 12pt;
  letter-spacing: 0em;
  text-align: left;
`;

const SettingList = styled.div`
  position: relative;
  padding-top: 10.5pt;
  padding-bottom: 10.5pt;
  &:nth-child(7) {
    color: #f75015;
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
`;

export default Setting;
