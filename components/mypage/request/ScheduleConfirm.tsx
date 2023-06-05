import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import colors from 'styles/colors';

interface Props {
  date: string;
  spotId: number;
  routerId: string | string[] | undefined;
}

const ScheduleConfirm = ({ date, spotId, routerId }: Props) => {
  const route = useRouter();

  return (
    <Wrapper>
      <P>현장실사 일정이 확정되었습니다.</P>
      <Date>{date?.replaceAll('-', '.')}</Date>
      <Btn
        onClick={() => {
          route.push({
            pathname: '/mypage/request/changeDate',
            query: {
              quotationRequestIdx: routerId,
              spotId: spotId,
            },
          });
        }}
      >
        일정 변경
      </Btn>
    </Wrapper>
  );
};

export default ScheduleConfirm;

const Wrapper = styled.div`
  padding: 29pt 0;
  background: ${colors.lightWhite};
  box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 8px;
  text-align: center;
  @media (max-width: 899.25pt) {
    margin: 0 15pt 0 15pt;
    padding: 18pt 0;
  }
`;
const P = styled.p`
  font-weight: 500;
  font-size: 15pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  /* padding-top: 18pt; */
  color: ${colors.gray2};
  font-family: 'Spoqa Han Sans Neo';
  @media (max-width: 899.25pt) {
    font-size: 12pt;
  }
`;
const Date = styled.h1`
  padding-top: 18pt;
  font-weight: 500;
  font-size: 21pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  @media (max-width: 899.25pt) {
    font-size: 15pt;
    line-height: 12pt;
  }
`;
const Btn = styled(Button)`
  border: 0.75px solid ${colors.main2};
  margin-top: 24pt;
  font-weight: 500;
  font-size: 12pt;
  line-height: 9pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding: 12pt 37.5pt;
  border-radius: 67.5pt;
  font-family: 'Spoqa Han Sans Neo';
  @media (max-width: 899.25pt) {
    margin-top: 15pt;
    font-size: 9pt;
    padding: 6pt 9pt;
    border-radius: 12pt;
  }
`;
