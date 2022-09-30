import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import chatting from 'public/navigation/chatting-icon.png';
import chattingOn from 'public/navigation/chatting-on-icon.png';
import home from 'public/navigation/home-icon.png';
import homeOn from 'public/navigation/home-on-icon.png';
import estimate from 'public/navigation/estimate-icon.png';
import mypageOn from 'public/navigation/mypage-on-icon.png';
import guide from 'public/navigation/guide-icon.png';
import guideOn from 'public/navigation/guide-on-icon.png';
import mypage from 'public/navigation/mypage-icon.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import colors from 'styles/colors';

type Props = {};

const BottomNavigation = (props: Props) => {
  const router = useRouter();
  const { pathname } = router;
  const [tabNumber, setTabNumber] = useState(0);

  useEffect(() => {
    switch (pathname) {
      case '/':
        return setTabNumber(0);
      case '/guide':
        return setTabNumber(1);
      case '/estimate':
        return setTabNumber(2);
      case '/chatting':
        return setTabNumber(3);
      case '/mypage':
        return setTabNumber(4);
      default:
        break;
    }
  }, []);

  return (
    <Wrapper>
      <BoxBg>
        <div
          className="img-wrapper"
          onClick={() => {
            router.push('/');
          }}
        >
          <ImgBox>
            <Image
              src={tabNumber === 0 ? homeOn : home}
              alt="home"
              layout="fill"
            />
          </ImgBox>
          <H3 clicked={tabNumber === 0 ? true : false}>홈</H3>
        </div>
        <div
          className="img-wrapper"
          onClick={() => {
            router.push('/guide');
          }}
        >
          <ImgBox>
            <Image
              src={tabNumber === 1 ? guideOn : guide}
              alt="guide"
              layout="fill"
            />
          </ImgBox>
          <H3 clicked={tabNumber === 1 ? true : false}>가이드</H3>
        </div>
        <div
          className="img-wrapper"
          onClick={() => {
            router.push('/quotation/request');
          }}
        >
          <Image src={estimate} alt="estimate" width={32} height={32} />
          <H3 clicked={false}>간편견적</H3>
        </div>
        <div className="img-wrapper">
          <ImgBox>
            <Image
              src={tabNumber === 3 ? chattingOn : chatting}
              alt="chatting"
              layout="fill"
            />
          </ImgBox>
          <H3 clicked={tabNumber === 3 ? true : false}>소통하기</H3>
        </div>
        <div
          className="img-wrapper"
          onClick={() => {
            router.push('/mypage');
          }}
        >
          <ImgBox>
            <Image
              src={tabNumber === 4 ? mypageOn : mypage}
              alt="mypage"
              layout="fill"
            />
          </ImgBox>
          <H3 clicked={tabNumber === 4 ? true : false}>마이페이지</H3>
        </div>
      </BoxBg>
    </Wrapper>
  );
};

export default BottomNavigation;

const Wrapper = styled.div`
display: none;
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
  
  @media (max-width: 899pt) {
    display:block;
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
const ImgBox = styled.div`
  position: relative;
  height: 24pt;
  width: 24pt;
`;
const H3 = styled.h3<{ clicked: boolean }>`
  font-weight: 500;
  font-size: 7.5pt;
  line-height: 9pt;
  letter-spacing: -0.02em;
  color: ${({ clicked }) => (clicked ? colors.main2 : colors.lightGray4)};
`;
