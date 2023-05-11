import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import colors from 'styles/colors';

type Props = {
  date: string;
};

const Checking = ({ date }: Props) => {
  // console.log('🔥 date : ', date);
  const route = useRouter();
  return (
    <Wrapper>
      <P>현장실사 일정을 확인 중입니다.</P>
      <Date>{date?.replaceAll('-', '.')}</Date>
    </Wrapper>
  );
};

export default Checking;

const Wrapper = styled.div`
  margin: 0 15pt 0 15pt;
  padding-bottom: 18pt;
  background: ${colors.lightWhite};
  box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 8px;
  text-align: center;
  margin-bottom: 60pt;
  @media (min-width: 900pt) {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
  }
`;
const P = styled.p`
  padding-top: 18pt;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  font-family: 'Spoqa Han Sans Neo';
`;
const Date = styled.div`
  padding-top: 12pt;
  font-weight: 500;
  font-size: 15pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  font-family: 'Spoqa Han Sans Neo';
`;
