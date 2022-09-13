import styled from '@emotion/styled';
import { Box, Container } from '@mui/material';
import Image from 'next/image';
import Btn from 'components/button';
import CheckImg from '../public/images/CheckCircle.svg';
import btnImg from '../public/images/back-btn.svg';
import colors from 'styles/colors';

const signUpComplete = () => {
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
      <Btn text="확인" marginTop="39" />
      <InputBox>
        <Input
          placeholder="내 충전기의 예상 매출을 확인해보세요."
          type="text"
        />
      </InputBox>
    </>
  );
};

export default signUpComplete;

// const ContentWrapper = styled(Box)``;

const Nav = styled.div`
  display: flex;
  justify-content: start;
  padding-left: 15pt;
  padding-top: 9pt;
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
  border: 0.75pt solid ${colors.lightGray};
  border-radius: 6pt;
`;
