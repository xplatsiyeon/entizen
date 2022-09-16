import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';
import lightBox from '/public/images/boxLight.png';
import arrow from '/public/images/arrow.png';
import whiteRight from '/public/images/whiteRight.png';
import moneyMan from '/public/images/moneyMan.png';
import blueRight from '/public/images/blueRight.png';
import charger from '/public/images/charger.png';
import Image, { StaticImageData } from 'next/image';

type Props = {};

const LearnAbout = (props: Props) => {
  // box-shadow: 0px 0px 10px 0px #89A3C933;
  const menuList: {
    headText: string;
    leftImg: StaticImageData;
    background: string;
    topTextColor: string;
    color: string;
    rightImg: StaticImageData;
    menuText: string;
    width: number;
    height: number;
  }[] = [
    {
      headText: '플랫폼 가이드',
      //   leftImg: 'public/images/boxLight.png',
      leftImg: lightBox,
      background: '#ffffff',
      topTextColor: '#747780',
      color: '#5A2DC9',
      rightImg: blueRight,
      menuText: '엔티즌을\n더 잘 쓰는\n꿀팁 확인하기',
      width: 30,
      height: 30,
    },
    {
      headText: '구독 가이드',
      //   leftImg: 'public/images/arrow.png',
      leftImg: arrow,
      background: '#5A2DC9',
      topTextColor: 'rgba(255, 255, 255, 0.5)',
      color: '#FFFFFF',
      rightImg: whiteRight,
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
      rightImg: whiteRight,
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
      rightImg: blueRight,
      menuText: '보조금은\n최대 얼마?',
      width: 32.8275,
      height: 35.52749,
    },
  ];
  return (
    <>
      <Wrapper>
        <LearnText>알아보기</LearnText>
        <LearnCarousel>
          <TabBox>
            {menuList.map((el, index) => (
              <Item color={el.background} key={index}>
                <ItemTitle color={el.topTextColor}>{el.headText}</ItemTitle>
                <ContentText color={el.color}>{el.menuText}</ContentText>
                <LeftImgBox>
                  <Image
                    src={el.leftImg}
                    alt="icon"
                    layout="intrinsic"
                    width={`${el.width}pt`}
                    height={`${el.height}pt`}
                  />
                </LeftImgBox>
                <RightImgBox>
                  <Image src={el.rightImg} alt="icon" layout="intrinsic" />
                </RightImgBox>
              </Item>
            ))}
          </TabBox>
        </LearnCarousel>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin-top: 30pt;
  width: 100%;
`;

const LearnText = styled(Typography)`
  width: 100%;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #222222;
`;

const LearnCarousel = styled.div`
  margin-top: 12pt;
  overflow-x: scroll;
`;

const TabBox = styled.div`
  display: flex;
  gap: 12pt;
  width: 185%;
`;

const Item = styled.div`
  width: 105pt;
  height: 153.75pt;
  padding-left: 12pt;
  padding-top: 12pt;
  border-radius: 6pt;
  background-color: ${(props) => props.color};
  box-shadow: 0px 0px 10px 0px #89a3c933;
  position: relative;
`;

const ItemTitle = styled(Typography)`
  font-size: 9pt;
  line-height: 15pt;
  font-weight: 500;
`;

const LeftImgBox = styled.div`
  position: absolute;
  bottom: 11.25pt;
  left: 12pt;
`;

const RightImgBox = styled.div`
  position: absolute;
  right: 9.75pt;
  bottom: 12pt;
`;

const ContentText = styled(Typography)`
  margin-top: 6pt;
  white-space: pre-wrap;
  font-weight: 400;
  font-size: 12pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
`;

export default LearnAbout;
