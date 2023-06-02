import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import lightBox from '/public/images/boxLight.png';
import arrow from '/public/images/arrow.png';
import whiteBlueRight from '/public/images/whiteBlueRight.png';
import blueWhiteRight from '/public/images/blueWhiteRight.png';
import whiteGreenRight from '/public/images/whiteGreenRight.png';
import moneyMan from '/public/images/moneyMan.png';
import charger from '/public/images/charger.png';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';

type Props = {
  borders?: number | undefined;
};

interface MenuList {
  headText: string;
  leftImg: StaticImageData;
  background: string;
  topTextColor: string;
  color: string;
  rightImg: StaticImageData;
  menuText: string;
  width: number;
  height: number;
}

const LearnAbout = ({ borders }: Props) => {
  const router = useRouter();
  const userID = sessionStorage.getItem('USER_ID');
  const menuList: MenuList[] = [
    {
      headText: '플랫폼 가이드',
      leftImg: lightBox,
      background: '#ffffff',
      topTextColor: '#747780',
      color: '#5A2DC9',
      rightImg: blueWhiteRight,
      menuText: '엔티즌을\n더 잘 쓰는\n꿀팁 확인하기',
      width: 30,
      height: 30,
    },
    {
      headText: '구독 가이드',
      leftImg: arrow,
      background: '#5A2DC9',
      topTextColor: 'rgba(255, 255, 255, 0.5)',
      color: '#FFFFFF',
      rightImg: whiteBlueRight,
      menuText: '구독에 대한\n모든 것을\n한 눈에!',
      width: 30,
      height: 30,
    },
    {
      headText: '충전기 가이드',
      leftImg: charger,
      background: '#FFC043',
      topTextColor: 'rgba(255, 255, 255, 0.5)',
      color: '#FFFFFF',
      rightImg: whiteGreenRight,
      menuText: '나에게 딱 맞는\n충전기는?',
      width: 30,
      height: 30,
    },
    {
      headText: '보조금 가이드',
      leftImg: moneyMan,
      background: '#FFFFFF',
      topTextColor: '#747780',
      color: '#5A2DC9',
      rightImg: blueWhiteRight,
      menuText: '보조금은\n최대 얼마?',
      width: 32.8275,
      height: 35.52749,
    },
  ];

  const movePage = (el: MenuList) => {
    if (el.headText === '플랫폼 가이드') {
      router.push('/guide/platform');
    } else if (el.headText === '구독 가이드') {
      router.push('/guide/subscribe');
    } else if (el.headText === '충전기 가이드') {
      router.push('/guide/charger');
    } else if (el.headText === '보조금 가이드' && userID !== null) {
      router.push('/guide/subsidy');
    } else if (el.headText === '보조금 가이드' && userID === null) {
      router.push('/signin');
    }
  };

  return (
    <>
      <Wrapper>
        <LearnText>알아보기</LearnText>
        <LearnCarousel>
          <TabBox>
            {menuList.map((el, index) => (
              <Item
                color={el.background}
                key={index}
                onClick={() => movePage(el)}
                borders={borders ? borders : 0}
              >
                <ItemTitle color={el.topTextColor}>{el.headText}</ItemTitle>
                <ContentText color={el.color}>{el.menuText}</ContentText>
                <LeftImgBox>
                  <Image src={el.leftImg} alt="icon" layout="intrinsic" />
                </LeftImgBox>
                <LeftImgBox>
                  <Image src={el.leftImg} alt="icon" layout="intrinsic" />
                </LeftImgBox>
                {/* <RightImgBox>
                  <Image src={el.rightImg} alt="icon" layout="intrinsic" />
                </RightImgBox> */}
              </Item>
            ))}
          </TabBox>
        </LearnCarousel>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 900pt;
  margin: 90pt auto;
  @media (max-width: 899.25pt) {
    width: auto;
    margin: 30pt 0 0;
    overflow-x: scroll;
  }
  @media (max-width: 337.5pt) {
    width: auto;
    margin: 30pt 0 0;
    overflow-x: scroll;
  }
`;

const LearnText = styled(Typography)`
  width: 100%;
  color: #222222;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 30pt;
  font-weight: 700;
  line-height: 30pt;
  letter-spacing: -0.02em;
  text-align: left;

  @media (max-width: 899.25pt) {
    font-size: 12pt;
    line-height: 12pt;
    padding-left: 15pt;
  }
`;

const LearnCarousel = styled.div`
  margin-top: 48pt;
  overflow-x: scroll;
  padding: 10pt 7.5pt;
  @media (max-width: 899.25pt) {
    margin-top: 12pt;
    padding: 5px;
  }
`;

const TabBox = styled.div`
  /* display: grid;
  gap: 12pt;
  grid-template-columns: repeat(4, 1fr); */
  display: flex;
  gap: 12pt;
  //자식 박스가 105p가 되는 지점,
  @media (max-width: 502.5pt) {
    width: 457.5pt;
    padding-left: 15pt;
  }
`;

const Item = styled.div<{ borders: number }>`
  width: 207pt;
  height: 273pt;
  //padding-left: 12pt;

  border-radius: ${({ borders }) => (borders !== 0 ? borders : 6)}pt;
  background-color: ${(props) => props.color};
  /* box-shadow: 0px 0px 7.5pt 0px #89a3c933; */
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
  position: relative;
  cursor: pointer;
  @media (max-width: 899.25pt) {
    min-width: 105pt; //점차 작아지다가 105pt에서 스톱.
    height: 153pt;
    padding-top: 12pt;
    padding-left: 12pt;
  }
  @media (max-width: 502.5pt) {
    width: 105pt;
    height: 153.75pt;
    padding-top: 12pt;
    padding-left: 12pt;
  }
`;

const ItemTitle = styled(Typography)`
  font-family: 'Spoqa Han Sans No';
  font-size: 13.5pt;
  font-weight: 500;
  line-height: 24.75pt;
  letter-spacing: -0.02em;
  margin: 25.5pt 0 6pt 28.5pt;
  text-align: left;

  @media (max-width: 899.25pt) {
    font-size: 9pt;
    line-height: 15pt;
    margin: 0;
  }
`;

const LeftImgBox = styled.div`
  position: absolute;

  bottom: 24.75pt;
  left: 28.5pt;
  width: 57pt;
  height: 57pt;

  &:nth-of-type(2) {
    display: none;
  }
  @media (max-width: 899.25pt) {
    width: auto;
    height: auto;
    bottom: 11.25pt;
    left: 12pt;
    width: 30pt;
    height: 30pt;
    &:nth-of-type(1) {
      display: none;
    }
    &:nth-of-type(2) {
      display: block;
    }
  }
`;

const RightImgBox = styled.div`
  position: absolute;
  width: 24pt;
  height: 24pt;
  right: 9.75pt;
  bottom: 12pt;
  display: none;
  @media (max-width: 899.25pt) {
    display: block;
  }
`;

const ContentText = styled(Typography)`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 19.5pt;
  font-weight: 400;
  line-height: 30pt;
  letter-spacing: -0.02em;
  margin-left: 28.5pt;
  white-space: pre-wrap;

  @media (max-width: 899.25pt) {
    margin-top: 6pt;
    margin-left: 0;
    white-space: pre-wrap;
    font-size: 12pt;
    line-height: 18pt;
  }
`;

export default LearnAbout;
