import styled from '@emotion/styled';
import React, { useState } from 'react';
import ProfileEditing from 'componentsCompany/Profile/profileEditing';
import EditCertificate from 'componentsCompany/Profile/editCertificate';
import WebFooter from 'componentsWeb/WebFooter';
import EditPW from 'componentsCompany/Profile/editPW';
import SignUpManagerInfo from 'pages/signUp/ManagerInfo';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import CompanyRightMenu from 'componentsWeb/CompanyRightMenu';
import EditAddress from 'componentsCompany/Profile/editAddress';

const ProfileIndex = () => {
  const [component, setComponent] = useState<number>(0);
  const [tabNumber, setTabNumber] = useState<number>(7);
  const [componentId, setComponentId] = useState<number>();
  const [openSubLink, setOpenSubLink] = useState<boolean>(false);
  const [heightOn, setHeightOn] = useState<boolean>(false);

  const components = [
    <ProfileEditing
      setComponent={setComponent}
      component={component}
      setHeightOn={setHeightOn}
    />,
    //<ProfileEditing setComponent={setComponent} component={component} isAddressOn={true}/>, // 지도
    <EditAddress setComponent={setComponent} />, // 주소 변경
    <EditPW setComponent={setComponent} />, // 비밀번호 변경
    <EditCertificate setComponent={setComponent} />, // 사업자 번호 변경
    <SignUpManagerInfo setComponent={setComponent} />, // 담당자 정보 변경
  ];

  return (
    <WebBody>
      <CompanyRightMenu />
      <WebBuyerHeader
        setTabNumber={setTabNumber}
        tabNumber={tabNumber!}
        componentId={componentId}
        openSubLink={openSubLink}
        setOpenSubLink={setOpenSubLink}
        height={true}
      />
      <Wrapper>
        {/* 맨 처음. 프로필 하나 통으로만 있음 */}
        {component === 0 && (
          <FlexBox heightOn={heightOn} className="init">
            {components[0]}
          </FlexBox>
        )}

        {/* '~변경' 버튼을 클릭하면 (conponent state가 변경되면서)처음의 컴포넌트는 사라지고, 
        숨겨둔 프로필 컴포넌트와 '~ 변경' 컴포넌트가 나타난다  */}
        {component > 0 && (
          <>
            <P>프로필 변경</P>
            <HiddenBox className="hidden_comp">
              <ProfileEditing
                setComponent={setComponent}
                component={component}
                routeHandle={true}
                setHeightOn={setHeightOn}
              />
            </HiddenBox>
          </>
        )}
        {component !== 0 && (
          <FlexBox2 className="new_comp">{components[component]}</FlexBox2>
        )}
      </Wrapper>
      <WebFooter />
    </WebBody>
  );
};

export default ProfileIndex;

const Scroll = styled.div`
  @media (min-width: 900pt) {
    height: 100vh;
    overflow: scroll;
    overflow-x: hidden;
    ::-webkit-scrollbar {
      display: initial;
      width: 7.5pt;
    }
    ::-webkit-scrollbar-track {
      // 뒷배경
      background: rgba(33, 122, 244, 0.1);
    }
    ::-webkit-scrollbar-thumb {
      // 막대
      /* background: #217af4; */
      background-color: #5a2dc9;
      box-shadow: inset 0 0 4.5pt rgba(0, 0, 0, 0.3);
      border-radius: 7.5pt;

      height: 7.5pt;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 60pt;
  height: 100%;

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

const FlexBox = styled.div<{ heightOn: boolean }>`
  display: block;
  position: relative;
  width: 345pt;

  box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  background: #ffff;
  margin: ${({ heightOn }) => (heightOn ? '20vh 0' : '45.75pt 0')};

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0 auto;
    /* padding-left: 15pt; */
    box-shadow: none;
    background: none;
  }
`;
const FlexBox2 = styled.div`
  display: block;
  position: relative;
  box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  background: #ffff;
  width: 560pt;
  /* padding: 42pt 22.5pt 42pt; */
  padding: 0pt 22.5pt 42pt;
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
`;
const HiddenBox = styled.div`
  display: block;
  position: relative;
  width: 282pt;
  height: 500pt;
  overflow-y: scroll;
  box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  background: #ffff;
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
  height: 100%;
  margin: 0 auto;
  background: #fcfcfc;
  @media (max-width: 899.25pt) {
    background: none;
  }
`;

const P = styled.p`
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

  @media (max-width: 899.25pt) {
    display: none;
  }
`;
