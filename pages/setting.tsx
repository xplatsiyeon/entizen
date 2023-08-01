import styled from '@emotion/styled';
import AlarmSetting from 'components/BuyerSetting/AlarmSetting';
import AlarmWebSetting from 'components/BuyerSetting/AlarmWebSetting';
import PersonalDataPolicy from 'components/BuyerSetting/PersonalDataPolicy';
import QuestionInPerson from 'components/BuyerSetting/QuestionInPerson';
import QuestionInPersonWeb from 'components/BuyerSetting/QuestionInPersonWeb';
import SettingMain from 'components/BuyerSetting/SettingMain';
import Term from 'components/BuyerSetting/Term';
import LeftProfileBox from 'components/guide/LeftProfileBox';
import UserRightMenu from 'components/UserRightMenu';
import CompanyRightMenu from 'componentsWeb/CompanyRightMenu';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

interface Components {
  [key: number]: JSX.Element;
}

const Setting = () => {
  const router = useRouter();

  // 유저인지 회사인지
  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);

  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  // 오른쪽 컴포넌트 변동해주는거
  const [tabNumber, setTabNumber] = useState<number>(0);

  // 왼쪽 컴포넌트 변동해주는거
  const [leftTabNumber, setLeftTabNumber] = useState<number>(0);
  const [componentId, setComponentId] = useState<number>();
  const [openSubLink, setOpenSubLink] = useState<boolean>(false);

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
        setTabNumber={setTabNumber}
        tabNumber={tabNumber}
        leftTabNumber={leftTabNumber}
      />
    ),
    2: <QuestionInPerson setTabNumber={setTabNumber} tabNumber={tabNumber} />,
    3: <Term setTabNumber={setTabNumber} />,
    4: <PersonalDataPolicy setTabNumber={setTabNumber} />,
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

  useEffect(() => {
    if (tabNumber === 0) {
      setLeftTabNumber(0);
    } else {
      setLeftTabNumber(1);
    }
  }, [tabNumber]);

  useEffect(() => {
    if (router.query.id === '1') {
      setTabNumber(1);
    } else if (router.query.id === '2') {
      setTabNumber(2);
    } else if (router.query.id === '3') {
      setTabNumber(3);
    } else if (router.query.id === '4') {
      setTabNumber(4);
    }
  }, [router.query.id]);

  useEffect(() => {
    console.log('🔥 mobile : ', mobile);
  }, [mobile]);

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
        <Inner>
          <SettingTitle
            onClick={() => {
              if (!mobile) {
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
            {!mobile && tabNumber === 1 && (
              <div>
                {/* ======================= 데스트탑 ======================= */}
                <AlarmWebSetting
                  setTabNumber={setTabNumber}
                  tabNumber={tabNumber}
                  leftTabNumber={leftTabNumber}
                />
              </div>
            )}
            {!mobile && tabNumber === 2 && (
              <div>
                <QuestionInPersonWeb />
              </div>
            )}
          </BoxAlign>
        </Inner>
        <WebFooter />
      </WebBody>
    </>
  );
};

export default Setting;

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;
  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
  @media (max-width: 899.25pt) {
    background: white;
  }
`;
const Inner = styled.div`
  display: block;
  position: relative;
  width: 900pt;
  margin: 45.75pt auto;
  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0 auto;
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
  color: #222222;

  @media (max-width: 899.25pt) {
    display: none;
  }
`;
const BoxAlign = styled.div`
  @media (min-width: 900pt) {
    display: flex;
    justify-content: space-between;
  }
`;
const WebBox = styled.div`
  @media (max-width: 899.25pt) {
    display: none;
  }
`;
