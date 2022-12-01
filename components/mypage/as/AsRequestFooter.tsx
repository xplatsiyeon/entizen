import styled from '@emotion/styled';
import CommunicationBox from 'components/CommunicationBox';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  id: number | string;
};

const AsRequestFooter = ({ id }: Props) => {
  const router = useRouter();
  return (
    <FooterBox>
      <CommunicationBox text="파트너와 소통하기" id={id} />
    </FooterBox>
  );
};

const FooterBox = styled.div`
  margin: 30pt auto 38.25pt auto;
  display: flex;
  justify-content: center;

  @media (max-width: 899.25pt) {
    margin: 60pt auto 68.25pt auto;
  }
`;

export default AsRequestFooter;
