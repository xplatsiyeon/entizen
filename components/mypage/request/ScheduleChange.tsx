import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import colors from 'styles/colors';
type Props = {
  spotId: number;
  routerId: string | string[] | undefined;
};
const ScheduleChange = ({ spotId, routerId }: Props) => {
  const router = useRouter();
  return (
    <Wrapper>
      <P>일정 변경 요청이 들어왔습니다</P>
      <Btn
        onClick={() =>
          router.push({
            pathname: '/mypage/request/changeDateList',
            query: {
              quotationRequestIdx: routerId,
              spotId: spotId,
            },
          })
        }
      >
        확인하기
      </Btn>
    </Wrapper>
  );
};

export default ScheduleChange;

const Wrapper = styled.div`
  margin: 0 15pt 0 15pt;
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
  color: ${colors.main};
  font-family: 'Spoqa Han Sans Neo';
`;
const Btn = styled(Button)`
  margin-top: 15pt;
  /* border: 0.75px solid ${colors.main2}; */
  border-radius: 12pt;
  font-weight: 500;
  font-size: 9pt;
  line-height: 9pt;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  background-color: ${colors.main};
  padding: 6pt 9pt;
  cursor: pointer;
  font-family: 'Spoqa Han Sans Neo';
`;
