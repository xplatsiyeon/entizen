import styled from '@emotion/styled';
import { Button } from '@mui/material';
import CommunicationBox from 'components/CommunicationBox';
import useCreateChatting from 'hooks/useCreateChatting';
import { useRouter } from 'next/router';
import React from 'react';
import colors from 'styles/colors';

type Props = {
  id: number | string;
};

const AsRequestFooter = ({ id }: Props) => {
  const router = useRouter();
  const { createChatting, createLoading } = useCreateChatting();
  return (
    <FooterBox>
      <CommunicationBox
        text="파트너와 소통하기"
        // id={id}
        clickHandler={() => createChatting(id!)}
      />
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
