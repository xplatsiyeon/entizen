import Header from '../components/header';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import Btn from 'components/button';

export default function signUpCheck() {
  return (
    <>
      <Header />
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
          marginTop: 'calc(0.75*32pt)',
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
          marginTop: 'calc(0.75*40pt)',
          width: '100%',
        }}
      >
        <Label>비밀번호</Label>
        <Input placeholder="비밀번호 입력" />
        <Input placeholder="비밀번호 재입력" />
      </Box>
      <Btn text="가입 완료" marginTop="111" />
    </>
  );
}

const Info = styled.p`
  padding-top: 8pt;
  margin-left: 20pt;
  font-weight: 700;
  font-size: 24pt;
  line-height: 32pt;
  color: ${colors.main2};
`;
const Label = styled.label`
  font-weight: 500;
  font-size: 16pt;
  line-height: 16pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  margin-left: 20pt;
`;
const Input = styled.input`
  border: calc(0.75 * 1pt) solid ${colors.gray};
  border-radius: calc(0.75 * 8pt);
  margin: 12pt 20pt 0 20pt;
  height: calc(0.75 * 52pt);
  padding-left: calc(0.75 * 16pt);
  ::placeholder {
    color: ${colors.gray};
    font-weight: 500;
  }
`;
const OverlapBtn = styled.button`
  position: absolute;
  right: calc(0.75 * 36pt);
  top: calc(0.75 * 46pt);
  background: #e2e5ed;
  color: #ffffff;
  border-radius: calc(0.75 * 8pt);
  padding: calc(0.75 * 10pt) calc(0.75 * 12pt);
`;
