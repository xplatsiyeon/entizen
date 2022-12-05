import styled from '@emotion/styled';
import React from 'react';
import AsImg from 'public/images/asPhoto.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import colors from 'styles/colors';
import { Button } from '@mui/material';

type Props = {};

const NoAs = (props: Props) => {
  const router = useRouter();
  const handlerBtn = () => router.push('/mypage/request/1-2');
  return (
    <Wrapper>
      <ImgBox>
        <Image src={AsImg} alt="no-history" />
      </ImgBox>
      <Message>요청한 A/S가 없습니다.</Message>
      {/* <Btn onClick={handlerBtn}>A/S 요청하기</Btn> */}
    </Wrapper>
  );
};

export default NoAs;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ImgBox = styled.div`
  padding-top: 32.25pt;
`;
const Message = styled.h1`
  padding-top: 12pt;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightGray2};
`;

const Btn = styled(Button)`
  background: ${colors.main};
  color: ${colors.lightWhite};
  margin-top: 33pt;
  border-radius: 6pt;
  padding: 9pt 30pt;
`;
