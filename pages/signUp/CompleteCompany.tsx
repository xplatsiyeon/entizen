import styled from '@emotion/styled';
import { Container } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import CheckImg from 'public/images/CheckCircle.svg';
import btnImg from 'public/images/back-btn.svg';
import colors from 'styles/colors';
import { useRouter } from 'next/router';
import CompleteModal from '../../components/Modal/CompleteModal';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebFooter from 'componentsWeb/WebFooter';
import { useMediaQuery } from 'react-responsive';
type Props = {};

const CompleteCompany = (props: Props) => {
  const [userCompleteModal, SetUserCompleteModal] = useState(false);
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  const [tabNumber, setTabNumber] = useState<number>(-1);
  // 서브 카테고리 열렸는지 아닌지
  const [openSubLink, setOpenSubLink] = useState<boolean>(false);

  // 내 프로젝트에서 진행 프로젝트랑 완료 프로젝트 뭐 눌렀는지 받아오는 state
  const [componentId, setComponentId] = useState<number | undefined>();
  const router = useRouter();
  return (
    <WebBody>
      <WebBuyerHeader
        setTabNumber={setTabNumber}
        tabNumber={tabNumber}
        componentId={componentId}
        openSubLink={openSubLink}
        setOpenSubLink={setOpenSubLink}
      />
      <Wrapper>
        {userCompleteModal && (
          <CompleteModal
            isModal={userCompleteModal}
            setIsModal={() => router.push('/signUp/Complete')}
          />
        )}
        <Nav>
          <Image
            onClick={() => router.push('/')}
            style={{
              cursor: 'pointer',
            }}
            src={btnImg}
            alt="btn"
          />
        </Nav>

        <ImaBox disableGutters>
          <Image src={CheckImg} alt="exit" style={{ cursor: 'pointer' }} />
        </ImaBox>
        <WelcomeText>
          고객님의 정보가
          <br />
          성공적으로 입력되었습니다!
        </WelcomeText>
        {mobile && (
          <BtnBox>
            <ConfirmBtn onClick={() => SetUserCompleteModal(true)}>
              확인
            </ConfirmBtn>
          </BtnBox>
        )}
        <InputContainer>
          <InputBox>
            <TextHeader>관리자의 승인이 필요해요!</TextHeader>
            {mobile ? (
              <TextBody>
                승인 완료까지
                <br />
                1~2일 정도 소요됩니다.
              </TextBody>
            ) : (
              <TextBody>승인 완료까지 1~2일 정도 소요됩니다.</TextBody>
            )}
            <TextFooter>
              승인 완료 시 담당자 이메일로
              <br />
              회원가입 완료 메일을 송부해드립니다.
            </TextFooter>
          </InputBox>
        </InputContainer>
      </Wrapper>
      <WebFooter />
    </WebBody>
  );
};

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  @media (max-height: 350pt) {
    height: 100%;
    display: block;
  }
`;

const Wrapper = styled.div`
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
    padding-top: 0;
    margin-top: 0;
  }
`;

const ImaBox = styled(Container)`
  margin-top: 90pt;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const BtnBox = styled.div`
  padding: 39pt 15pt 30pt 15pt;
`;

const ConfirmBtn = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 15pt;
  padding-bottom: 15pt;
  background-color: ${colors.main};
  border-radius: 6pt;
  color: #ffffff;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
  cursor: pointer;
`;

const Nav = styled.div`
  display: flex;
  justify-content: start;
  padding-left: 15pt;
  padding-top: 9pt;

  @media (min-width: 900pt) {
    display: none;
  }
`;

const InputContainer = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  /* padding-top: 22.5pt; */
  @media (min-width: 900pt) {
    padding-top: 60pt;
  }
`;

const WelcomeText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  margin-top: 23.25pt;
  text-align: center;
  color: #222222;
  @media (min-width: 900pt) {
    font-size: 25.5pt;
    font-weight: 700;
    line-height: 37.5pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  align-items: center;
  padding: 15pt 45.75pt 15pt 45pt;
  border: 0.75pt solid ${colors.lightGray};
  border-radius: 6pt;
  @media (min-width: 900pt) {
    padding: 21pt 79.5pt;
  }
`;
const TextHeader = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #5221cb;
  @media (min-width: 900pt) {
    font-size: 18pt;
    font-weight: 700;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
`;
const TextBody = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #222222;
  margin-top: 15pt;

  @media (min-width: 900pt) {
    font-size: 12pt;
    font-weight: 700;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: center;
    margin-top: 12pt;
  }
`;
const TextFooter = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 500;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;
  margin-top: 15pt;
  @media (min-width: 900pt) {
    font-size: 12pt;
    font-weight: 500;
    line-height: 18pt;
    letter-spacing: -0.02em;
    text-align: center;
    margin-top: 30pt;
  }
`;

const Input = styled.input`
  text-align: center;
  margin-top: 119.25pt;
  margin-left: 15pt;
  margin-right: 15pt;
  width: 100%;
  padding: 13.5pt 44.25pt;
  font-size: 10.5pt;
  border: 0.75pt solid ${colors.lightGray};
  border-radius: 6pt;
`;

export default CompleteCompany;
