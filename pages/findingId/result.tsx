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
            margin: '60pt 15pt 0 15pt',
            width: '100%',
            height: '42pt',
            padding: '15pt 0',
            fontSize: '12pt',
            borderRadius: '6pt',
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
            fontSize: '10.5pt',
            fontWeight: '400',
            lineHeight: '12pt',
            cursor: 'pointer',
            paddingBottom: '1.5pt',
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
  margin-top: 12pt;
  margin-left: 15pt;
  & > div {
    font-size: 18pt;
    font-weight: 700;
    line-height: 24pt;
    color: ${colors.main2};
  }
`;
const UserId = styled.div`
  margin-top: 54pt;
  text-align: center;
  font-weight: 700;
  color: ${colors.main};
`;
const Password = styled.div`
  margin-top: 26.25pt;
  padding: 3.75pt 0;
  text-align: center;
`;
