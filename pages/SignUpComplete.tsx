import styled from '@emotion/styled';
import { Container } from '@mui/material';
import Image from 'next/image';
import Btn from 'components/button';
import ExitImg from '../public/images/X.svg';
import CheckImg from '../public/images/CheckCircle.svg';

const SignUpComplete = () => {
  return (
    <>
      <Nav>
        <Image src={ExitImg} alt="exit" style={{ cursor: 'pointer' }} />
      </Nav>
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
      <WelcomeText>엔티즌 가입을 환영합니다!</WelcomeText>
      <InputBox>
        <Input
          placeholder="내 충전기의 예상 매출을 확인해보세요."
          type="text"
        />
      </InputBox>
      <Btn text="홈으로" marginTop="32" />
    </>
  );
};

export default SignUpComplete;

const Nav = styled.div`
  display: flex;
  justify-content: end;
  padding-right: 15pt;
  padding-top: 15pt;
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
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  text-align: center;
  margin-top: 119.25pt;
  margin-left: 15pt;
  margin-right: 15pt;
  width: 100%;
  padding: 13.5pt 44.25pt;
  font-size: 10.5pt;
  border: 0.75pt solid #e9eaee;
  border-radius: 6pt;
`;
