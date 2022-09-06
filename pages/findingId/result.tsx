import styled from '@emotion/styled';
import colors from '../../styles/colors';
import { Box, Button } from '@mui/material';
import Header from 'components/header';

export default function findingId2() {
  return (
    <>
      <Header />
      <Inform>
        <div>
          고객님의 정보와
          <br />
          일치하는 아이디입니다
        </div>
      </Inform>
      <UserId>sayoon0511</UserId>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          sx={{
            fontWeight: '700',
            margin: '80pt 20pt 0 20pt',
            width: '100%',
            height: '56pt',
            borderRadius: '8pt',
            alignItems: 'center',
            background: '#5a2dc9',
            color: 'white',
          }}
        >
          로그인
        </Button>
      </Box>

      <Password>
        <Box
          sx={{
            fontSize: '10pt',
            fontWeight: '400',
            cursor: 'pointer',
            paddingBottom: '2pt',
            letterSpacing: '-0.02em',
            textDecorationLine: 'underline',
            textUnderlinePosition: 'under',
            color: '#747780',
          }}
        >
          비밀번호 찾기
        </Box>
      </Password>
    </>
  );
}

const Inform = styled.div`
  margin-top: 16pt;
  margin-left: 20pt;
  & > div {
    font-size: 24pt;
    font-weight: 700;
    line-height: 32pt;
    color: ${colors.main2};
  }
`;
const UserId = styled.div`
  margin-top: 72pt;
  text-align: center;
  font-weight: 700;
  color: ${colors.main};
`;
const Password = styled.div`
  margin-top: 35pt;
  padding: 5pt 0;
  text-align: center;
`;
