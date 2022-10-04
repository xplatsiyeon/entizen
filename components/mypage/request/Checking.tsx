import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import colors from 'styles/colors';

const Checking = () => {
  const route = useRouter();
  return (
    <Wrapper>
      <P>일정 변경 확인 중</P>
      <Btn onClick={() => route.push('/mypage/request/2-3')}>확인하기</Btn>
    </Wrapper>
  );
};

export default Checking;

const Wrapper = styled.div`
  margin: 30pt 15pt 0 15pt;
  padding-bottom: 18pt;
  background: ${colors.lightWhite};
  box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 8px;
  text-align: center;
`;
const P = styled.p`
  font-weight: 400;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  padding-top: 18pt;
  color: #ff1b2d;
`;
const Btn = styled(Button)`
  margin-top: 15pt;
  border: 0.75px solid #caccd1;
  border-radius: 12pt;
  font-weight: 500;
  font-size: 9pt;
  line-height: 9pt;
  letter-spacing: -0.02em;
  color: #caccd1;
  padding: 6pt 9pt;
`;
