import styled from '@emotion/styled';
import React, { useState } from 'react';
import ProfileEditing from 'componentsCompany/Profile/profileEditing';
import EditCertificate from 'componentsCompany/Profile/editCertificate';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import EditPW from 'componentsCompany/Profile/editPW';
import SignUpManagerInfo from 'pages/signUp/ManagerInfo';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import CompanyRightMenu from 'componentsWeb/CompanyRightMenu';

const ProfileIndex = () => {
  const [component, setComponent] = useState<number>(1);
  const [tabNumber, setTabNumber] = useState<number>(7);
  const [tabCompNumber, setTabCompNumber] = useState<number>(0);
  const [componentId, setComponentId] = useState<number>();
  const [openSubLink, setOpenSubLink] = useState<boolean>(false);

  const components = [
    <ProfileEditing setComponent={setComponent} component={component} />, // 처음 통짜 프로필
    <EditPW setComponent={setComponent} />, // 비밀번호 변경
    <EditCertificate setComponent={setComponent} />, // 사업자 번호 변경
    <SignUpManagerInfo setComponent={setComponent} />, // 담당자 정보 변경
  ];
  console.log('component', component);

  return (
    <WebBody>
      <CompanyRightMenu />
      <WebBuyerHeader
        setTabNumber={setTabNumber}
        tabNumber={tabNumber!}
        componentId={componentId}
        openSubLink={openSubLink}
        setOpenSubLink={setOpenSubLink}
      />
      <Wrapper>
        {/* 프로필 하나 통으로만 있음 */}
        {component === 1 && <FlexBox className="init">{components[0]}</FlexBox>}

        {component > 1 && (
          <>
          <P>프로필 변경</P>
          <HiddenBox className="hidden_comp">
            {components[0]}
            </HiddenBox>
          </>
        )}
        {component !== 1 && (
          <FlexBox2 className="new_comp">{components[component - 1]}</FlexBox2>
        )}
      </Wrapper>
      <WebFooter />
    </WebBody>
  );
};

export default ProfileIndex;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 60pt;

  @media (max-width: 899.25pt) {
    padding: 0;
    height: 100%;
  }

  @media (min-width: 900pt) {
    margin: 0 auto;
    width: 900pt;
    position: relative;
  }
`;

const FlexBox = styled.div`
  display: block;
  position: relative;
  width: 282pt;

  //width: 281.25pt;
  box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  background: #ffff;
  padding: 32.25pt 31.5pt 42pt;
  margin: 45.75pt 0;

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
const FlexBox2 = styled(FlexBox)`
  width: 560pt;
  padding: 32.25pt 22.5pt 42pt;
  margin: 120pt 0 47.5pt;
`;
const HiddenBox = styled.div`
  display: block;
  position: relative;
  width: 282pt;
  height: 500pt;
  overflow-y: scroll;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  background: #ffff;
  padding: 32.25pt 31.5pt 42pt;
  margin: 120pt 0 47.5pt;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0 auto;
    padding: 0;
    box-shadow: none;
    background: none;
  }
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

const P =styled.p`
  position: absolute;
  left: 0;
  top: 66pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 21pt;
  line-height: 21pt;
  letter-spacing: -0.02em;
  color: #222222;
`