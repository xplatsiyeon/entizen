import Header from '../components/header';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import Btn from 'components/button';

const signUpCheck = () => {
  return (
    <Wrapper>
      <Header isHome={true} />
      <Info>
        가입하실 아이디와
        <br />
        비밀번호를 설정해주세요
      </Info>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: '18pt',
          width: '100%',
          position: 'relative',
        }}
      >
        <Label>아이디</Label>
        <Input placeholder="아이디 입력" />
        <OverlapBtn>중복 확인</OverlapBtn>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: '22.5pt',
          width: '100%',
        }}
      >
        <Label>비밀번호</Label>
        <Input placeholder="비밀번호 입력" />
        <Input placeholder="비밀번호 재입력" />
      </Box>
      <Btn text="가입 완료" marginTop="111" />
    </Wrapper>
  );
};

export default signUpCheck;

const Wrapper = styled.div`
  padding: 0 15pt 15pt 15pt;
`;
const Info = styled.p`
  padding-top: 6pt;
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  color: ${colors.main2};
`;
const Label = styled.label`
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const Input = styled.input`
  border: 0.75pt solid ${colors.gray};
  border-radius: 6pt;
  margin-top: 9pt;
  padding: 13.5pt 0;
  padding-left: 12pt;
  ::placeholder {
    color: ${colors.gray};
    font-weight: 500;
  }
`;
const OverlapBtn = styled.button`
  position: absolute;
  right: 8pt;
  top: 28.5pt;
  background: #e2e5ed;
  color: #ffffff;
  border-radius: 6pt;
  padding: 7.5pt 9pt;
  font-size: 10.5pt;
  font-weight: 500;
  line-height: 12pt;
`;
