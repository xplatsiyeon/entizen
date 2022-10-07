import styled from '@emotion/styled';
import { Button } from '@mui/material';
import CommunicationBox from 'components/CommunicationBox';
import { useRouter } from 'next/router';
import React from 'react';
import colors from 'styles/colors';

type Props = {};

const AsRequestFooter = (props: Props) => {
  const router = useRouter();
  const handlerBtn = () => router.push('/mypage/as/1-7');
  return (
    <FooterBox>
      <CommunicationBox
        text="파트너와 소통하기"
        clickHandler={() => alert('개발중입니다.')}
      />
    </FooterBox>
  );
};

const FooterBox = styled.div`
  margin: 30pt auto 38.25pt auto;
  display: flex;
  justify-content: center;

  @media (max-width: 899pt) {
    margin: 60pt auto 68.25pt auto;
  }
`;

const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 76.5pt;
`;

const Btn = styled(Button)`
  background: ${colors.main};
  color: ${colors.lightWhite};
  margin-top: 27pt;
  border-radius: 6pt;
  padding: 9pt 30pt;
`;

export default AsRequestFooter;
