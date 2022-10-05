import styled from '@emotion/styled';
import { color } from '@mui/system';
import React from 'react';
import colors from 'styles/colors';
import blueArrow from 'public/images/blueArrow16.png';
import Image from 'next/image';
import Banner from 'public/images/Main-Banner.png';
import { useRouter } from 'next/router';

type Props = {};

const SubscribeRequest = (props: Props) => {
  const router = useRouter();

  const handleLink =()=>{
    const user = localStorage.getItem('USER_ID');
    if(user){router.push('/quotation/request')}
    else{router.push('/signin')}
  }

  return (
    <ImageBox onClick={handleLink}>
      <Image src={Banner} layout="fill" />
      {/* <ButtonBox>
        <BtnText>나만의 구독상품 요청하기</BtnText>
        <BtnIcon>
          <Image src={blueArrow} alt="icon" />
        </BtnIcon>
      </ButtonBox> */}
    </ImageBox>
  );
};

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 165pt;
  background-color: ${colors.main};
  border-radius: 6pt;
  border: 1px solid silver;
  object-fit: cover;
  @media (max-width: 899pt) {
    height: 117pt;
    margin-top: 30pt;
  }
`;

const ButtonBox = styled.div`
  padding: 9pt 12pt;
  width: 123.75pt;
  position: absolute;
  left: 15pt;
  bottom: 15pt;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 21.75pt;
  background-color: #ffffff;
  display: none;

  @media (max-width: 899pt) {
    display: block;
  }
`;

const BtnText = styled.div`
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  margin-right: 3pt;
  color: ${colors.main};
`;

const BtnIcon = styled.div`
  position: relative;
  top: 1pt;
`;
export default SubscribeRequest;
