import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';
import colors from 'styles/colors';

type Props = {};

const CheckQuotationBtn = (props: Props) => {
  const router = useRouter();
  return (
    <Box>
      <Btn onClick={() => router.push('/company/quotation')}>
        견적 요청서 확인하기
      </Btn>
    </Box>
  );
};

const Box = styled.div`
  padding-left: 62.25pt;
  padding-right: 62.25pt;
  @media (min-width: 900pt) {
    padding-left: 835pt;
    padding-right: 835pt;
  }
`;

const Btn = styled.div`
  background-color: ${colors.main};
  margin-top: 51pt;
  color: #ffffff;
  padding: 15pt 18pt;
  border-radius: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
`;

export default CheckQuotationBtn;
