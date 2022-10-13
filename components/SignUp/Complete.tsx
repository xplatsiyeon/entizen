import styled from '@emotion/styled';
import { Container } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import Btn from 'components/button';
import CheckImg from 'public/images/CheckCircle.svg';
import btnImg from 'public/images/back-btn.svg';
import colors from 'styles/colors';
import { useRouter } from 'next/router';

type Props = {};

const Complete = (props: Props) => {
  const router = useRouter();
  return (
    <>
      <Nav>
        <Image
          style={{
            cursor: 'pointer',
          }}
          src={btnImg}
          alt="btn"
        />
      </Nav>
      {/* <Header /> */}
      <Container
        disableGutters
        sx={{
          marginTop: '90pt',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Image src={CheckImg} alt="exit" style={{ cursor: 'pointer' }} />
      </Container>
      <WelcomeText>
        고객님의 정보가
        <br />
        성공적으로 입력되었습니다!
      </WelcomeText>
      <BtnBox>
        <ConfirmBtn onClick={() => router.push('/')}>확인</ConfirmBtn>
      </BtnBox>
      <InputContainer>
        <InputBox>
          <TextHeader>관리자의 승인이 필요해요!</TextHeader>
          <TextBody>
            승인 완료까지
            <br />
            1~2일 정도 소요됩니다.
          </TextBody>
          <TextFooter>
            승인 완료 시 담당자 이메일로
            <br />
            회원가입 완료 메일을 송부해드립니다.
          </TextFooter>
        </InputBox>
      </InputContainer>
    </>
  );
};

const BtnBox = styled.div`
  width: 100%;
  padding: 22.5pt 15pt 30pt 15pt;
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
  font-family: Spoqa Han Sans Neo;
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
`;

const InputContainer = styled.div`
  width: 100%;
  padding-left: 15pt;
  padding-right: 15pt;
`;

const WelcomeText = styled.div`
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  margin-top: 24pt;
  text-align: center;
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
`;
const TextHeader = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #5221cb;
`;
const TextBody = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #222222;
  margin-top: 15pt;
`;
const TextFooter = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 500;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;
  margin-top: 15pt;
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

export default Complete;
