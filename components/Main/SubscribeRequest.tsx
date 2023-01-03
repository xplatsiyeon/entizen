import styled from '@emotion/styled';
import { color } from '@mui/system';
import React from 'react';
import colors from 'styles/colors';
import blueArrow from 'public/images/blueArrow16.png';
import img_subs from 'public/images/img_subs.png';
import Image from 'next/image';
import Banner from 'public/images/Main-Banner.png';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

type Props = {
  borders?: number | undefined;
};

const SubscribeRequest = ({ borders }: Props) => {
  const { userAgent } = useSelector((state: RootState) => state.userAgent);
  const handleLink = () => {
    // 브릿지 연결 테스트 중
    // alert(userAgent);
    if (userAgent === 'Android_App') {
      // window.entizen!.test('Hello Native Callback --> ' + userAgent);
    } else if (userAgent === 'iOS_App') {
      window.webkit.messageHandlers.getUserInfo.postMessage('');
      window.webkit.messageHandlers.requestPermissionCheck.postMessage('type');
    }

    // const user = sessionStorage.getItem('USER_ID');
    // if (user) {
    //   router.push('/quotation/request');
    // } else {
    //   router.push('/signin');
    // }
  };

  return (
    <ImageBox onClick={handleLink} borders={borders ? borders : 0}>
      <P>
        <div>간단하고 다양한 견적을 무료로 비교해보고,</div>
        <div>최적의 상품을 구독해보세요</div>
      </P>
      <ButtonBox>
        <BtnText>나만의 구독상품 요청하기</BtnText>
        <BtnIcon>
          <Image src={blueArrow} alt="icon" />
        </BtnIcon>
      </ButtonBox>
      <ImageWrap>
        <Image src={img_subs} layout="fill" alt="" />
      </ImageWrap>
    </ImageBox>
  );
};

const ImageBox = styled.div<{ borders: number }>`
  position: relative;
  width: 100%;
  height: 165pt;
  background-color: ${colors.main};
  border-radius: ${({ borders }) => (borders !== 0 ? borders : 6)}pt;
  border: 1px solid silver;
  object-fit: cover;
  @media (max-width: 899.25pt) {
    height: 117pt;
    margin-top: 30pt;
  }
`;

const ButtonBox = styled.div`
  padding: 9pt 12pt;
  width: 123.75pt;
  position: absolute;
  left: 28.5pt;
  bottom: 28.5pt;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 21.75pt;
  background-color: #ffffff;

  @media (max-width: 899.25pt) {
    left: 15pt;
    bottom: 15pt;
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

const ImageWrap = styled.div`
  position: absolute;
  width: 114pt;
  height: 144.75pt;
  top: 9.75pt;
  right: 0;

  @media (max-width: 899.25pt) {
    width: 75pt;
    height: 95.25pt;
    top: 15pt;
  }
`;
const P = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16.5pt;
  line-height: 25.5pt;
  letter-spacing: -0.02em;
  color: #ffffff;
  padding-top: 26.25pt;
  padding-left: 28.5pt;

  @media (max-width: 899.25pt) {
    font-size: 10.4pt;
    line-height: 18pt;
    padding-top: 20pt;
    padding-left: 20pt;
  }
`;

export default SubscribeRequest;
