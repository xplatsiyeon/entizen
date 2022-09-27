import styled from '@emotion/styled';
import React from 'react';
import chatting from 'public/navigation/chatting-icon.png';
import home from 'public/navigation/home-icon.png';
import estimate from 'public/navigation/estimate-icon.png';
import guide from 'public/navigation/guide-icon.png';
import mypage from 'public/navigation/mypage-icon.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import colors from 'styles/colors';

type Props = {};

const BottomNavigation = (props: Props) => {
  const router = useRouter();
  return (
    <Wrapper>
      <BoxBg>
        <div
          className="img-wrapper"
          onClick={() => {
            router.push('/');
          }}
        >
          <Image src={home} alt="home" width={32} height={32} />
          <h3 className="name">홈</h3>
        </div>
        <div
          className="img-wrapper"
          onClick={() => {
            router.push('/guide');
          }}
        >
          <Image src={guide} alt="guide" width={32} height={32} />
          <h3 className="name">가이드</h3>
        </div>
        <div
          className="img-wrapper"
          onClick={() => {
            router.push('/quotation/request');
          }}
        >
          <Image src={estimate} alt="estimate" width={32} height={32} />
          <h3 className="name">간편견적</h3>
        </div>
        <div className="img-wrapper">
          <Image src={chatting} alt="chatting" width={32} height={32} />
          <h3 className="name">소통하기</h3>
        </div>
        <div
          className="img-wrapper"
          onClick={() => {
            router.push('/mypage');
          }}
        >
          <Image src={mypage} alt="mypage" width={32} height={32} />
          <h3 className="name">마이페이지</h3>
        </div>
      </BoxBg>
    </Wrapper>
  );
};

export default BottomNavigation;

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  background: ${colors.lightWhite};
  box-shadow: 3pt 0px 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 0px;
  width: 100%;
  z-index: 999;
  .img-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 3pt;
  }
  .name {
    font-weight: 500;
    font-size: 7.5pt;
    line-height: 9pt;
    letter-spacing: -0.02em;
    color: #dcdde1;
  }
`;
const BoxBg = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15pt;
  padding-right: 15pt;
  height: 66pt;
`;
