import styled from '@emotion/styled';
import Header from 'components/mypage/request/header';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import PasswordModify from 'components/Profile/PasswordModify';
import ProfileModify from 'components/Profile/ProfileModify';
import PhoneNumberModify from 'components/Profile/PhonenumberModify';
import UserRightMenu from 'components/UserRightMenu';
import { useMediaQuery } from 'react-responsive';

interface Components {
  [key: number]: JSX.Element;
}

const ProfileEditing = () => {
  const [checkSns, setCheckSns] = useState<boolean>(false);
  const web = useMediaQuery({
    query: '(min-width:900pt)',
  });

  // 오른쪽 컴포넌트 변경
  const [tabNumber, setTabNumber] = useState<number>(2);

  // sns 체크
  useEffect(() => {
    const snsMember = JSON.parse(sessionStorage.getItem('SNS_MEMBER')!);
    if (snsMember) {
      setCheckSns(snsMember);
    }

    console.log(checkSns);
    console.log(snsMember);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 오른쪽 컴포넌트
  const components: Components = {
    0: <PhoneNumberModify setTabNumber={setTabNumber} />,
    1: <PasswordModify setTabNumber={setTabNumber} />,
  };

  return (
    <React.Fragment>
      <UserRightMenu />
      {tabNumber === 2 && <Header back={true} title="프로필 변경" />}
      <WebBody>
        <WebHeader />
        {tabNumber < 2 && <ChangeProfileText>프로필 변경</ChangeProfileText>}
        <WebRapper tabNumber={tabNumber}>
          <Inner tabNumber={tabNumber}>
            {web && <ProfileModify setTabNumber={setTabNumber} />}
          </Inner>
          {!web && tabNumber === 2 && (
            <ProfileModify setTabNumber={setTabNumber} />
          )}
          {tabNumber !== 2 && <div>{components[tabNumber]}</div>}
        </WebRapper>
        <WebFooter />
      </WebBody>
    </React.Fragment>
  );
};

export default ProfileEditing;

const ChangeProfileText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 21pt;
  font-weight: 700;
  line-height: 21pt;
  letter-spacing: -0.02em;
  text-align: left;
  width: 900pt;
  margin: 0 auto;
  padding-left: 40pt;
  margin-top: 66pt;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;
const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;

  @media (max-height: 800pt) {
    display: block;
  }

  @media (min-width: 900pt) {
    height: 100%;
  }
`;

const Inner = styled.div<{ tabNumber: number }>`
  display: block;
  position: relative;
  /* width: 255pt; */
  width: ${({ tabNumber }) => (tabNumber === 2 ? '345pt' : '255pt')};
  background: #ffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;
  margin: 0 auto;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    padding: 0;
    margin: 0;

    box-shadow: none;
    background: none;
    display: none;
  }

  @media (min-width: 900pt) {
    height: 100%;
  }
`;

const WebRapper = styled.div<{ tabNumber: number }>`
  display: flex;
  justify-content: space-between;
  width: 900pt;
  margin: 0 auto;
  margin-top: ${({ tabNumber }) => (tabNumber === 2 ? '58.5pt' : '33pt')};
  margin-bottom: 90pt;
  gap: 30pt;

  @media (max-width: 899.25pt) {
    /* display: none; */
    width: 100%;
    margin-top: 0;
  }
`;
