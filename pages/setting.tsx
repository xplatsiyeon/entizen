import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import axios from 'axios';
import AlarmSetting from 'components/BuyerSetting/AlarmSetting';
import AlarmWebSetting from 'components/BuyerSetting/AlarmWebSetting';
import FAQ from 'components/BuyerSetting/FAQ';
import Faq from 'components/BuyerSetting/FAQ';
import QuestionInPerson from 'components/BuyerSetting/QuestionInPerson';
import QuestionInPersonWeb from 'components/BuyerSetting/QuestionInPersonWeb';
import SettingMain from 'components/BuyerSetting/SettingMain';
import Term from 'components/BuyerSetting/Term';
import LeftProfileBox from 'components/guide/LeftProfileBox';
import PasswordModal from 'components/Modal/PasswordModal';
import RequestModal from 'components/Modal/RequestModal';
import TwoBtnModal from 'components/Modal/TwoBtnModal';
import MypageHeader from 'components/mypage/request/header';
import UserRightMenu from 'components/UserRightMenu';
import CompanyRightMenu from 'componentsWeb/CompanyRightMenu';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import colors from 'styles/colors';
import { kakaoInit } from 'utils/kakao';

interface Components {
  [key: number]: JSX.Element;
}

const Setting = () => {
  const router = useRouter();
  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);
  const memberType = JSON.parse(localStorage.getItem('MEMBER_TYPE')!);

  // 실시간으로 width 받아오는 함수
  const handleResize = () => {
    setNowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nowWidth]);

  // 오른쪽 컴포넌트 변동해주는거
  const [tabNumber, setTabNumber] = useState<number>(0);

  // 왼쪽 컴포넌트 변동해주는거
  const [leftTabNumber, setLeftTabNumber] = useState<number>(0);

  const [tabCompNumber, setTabCompNumber] = useState<number>(0);
  const [componentId, setComponentId] = useState<number>();
  const [openSubLink, setOpenSubLink] = useState<boolean>(false);

  useEffect(() => {
    if (tabNumber === 0) {
      setLeftTabNumber(0);
    } else {
      setLeftTabNumber(1);
    }
  }, [tabNumber]);

  // 컴포넌트 변동
  const components: Components = {
    0: (
      <SettingMain
        setTabNumber={setTabNumber}
        tabNumber={tabNumber}
        setLeftTabNumber={setLeftTabNumber}
        leftTabNumber={leftTabNumber}
      />
    ),
    1: (
      <AlarmSetting
        nowWidth={nowWidth}
        setTabNumber={setTabNumber}
        tabNumber={tabNumber}
        leftTabNumber={leftTabNumber}
      />
    ),
    2: <QuestionInPerson setTabNumber={setTabNumber} tabNumber={tabNumber} />,
    3: (
      <Term
        setTabNumber={setTabNumber}
        tabNumber={tabNumber}
        nowWidth={nowWidth}
      />
    ),
  };

  const leftComponents: Components = {
    0: <LeftProfileBox />,
    1: (
      <SettingMain
        setTabNumber={setTabNumber}
        tabNumber={tabNumber}
        setLeftTabNumber={setLeftTabNumber}
        leftTabNumber={leftTabNumber}
      />
    ),
  };

  return (
    <>
      <WebBody>
        {memberType !== 'COMPANY' ? (
          <WebHeader />
        ) : (
          <WebBuyerHeader
            setTabNumber={setTabNumber}
            tabNumber={tabNumber!}
            componentId={componentId}
            openSubLink={openSubLink}
            setOpenSubLink={setOpenSubLink}
          />
        )}
        {memberType !== 'COMPANY' ? <UserRightMenu /> : <CompanyRightMenu />}

        <Container>
          <SettingTitle
            onClick={() => {
              if (nowWidth >= 1200) {
                setTabNumber(0);
                setLeftTabNumber(0);
              }
            }}
          >
            설정
          </SettingTitle>
          <BoxAlign>
            <WebBox>{leftComponents[leftTabNumber]}</WebBox>
            <div>{components[tabNumber]}</div>
            {nowWidth >= 1200 && tabNumber === 1 && (
              <div>
                <AlarmWebSetting
                  setTabNumber={setTabNumber}
                  tabNumber={tabNumber}
                  leftTabNumber={leftTabNumber}
                />
              </div>
            )}
            {nowWidth >= 1200 && tabNumber === 2 && (
              <div>
                <QuestionInPersonWeb />
              </div>
            )}
          </BoxAlign>
        </Container>
        <WebFooter />
      </WebBody>
    </>
  );
};

export default Setting;

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
    margin-top: 54pt;
    padding-top: 0;
  }
`;

const SettingTitle = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 21pt;
  font-weight: 700;
  line-height: 21pt;
  letter-spacing: -0.02em;
  text-align: left;
  padding-bottom: 33pt;
  cursor: pointer;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const BoxAlign = styled.div`
  @media (min-width: 900pt) {
    display: flex;
    justify-content: space-between;
    width: 900pt;
  }
`;

const WebRapper = styled.div`
  @media (min-width: 900pt) {
    /* padding: 32px 150px 180px 51px; */
    padding: 32px 500px 180px 51px;
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

const WebBox = styled.div`
  @media (max-width: 899.25pt) {
    display: none;
  }
`;
