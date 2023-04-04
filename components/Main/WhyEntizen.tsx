import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import React from 'react';
import colors from 'styles/colors';
import blackWhiteArrow from 'public/images/blackWhiteArrow24.png';
import whiteGreenArrow from 'public/images/whiteGreenArrow24.png';
import whiteBlueArrow from 'public/images/whiteBlueArrow24.png';
import bulb from 'public/images/bulb.png';
import message from 'public/images/message.png';
import mail from 'public/images/mail.png';
import carnation from 'public/images/carnation.png';
import mainArrow1 from 'public/images/mainArrow1.png';
import mainArrow2 from 'public/images/mainArrow2.png';
import mainArrow3 from 'public/images/mainArrow3.png';
import { useRouter } from 'next/router';
import { isTokenGetApi } from 'api';
import { useQuery } from 'react-query';
import { ChattingListResponse } from 'components/Chatting/ChattingLists';

interface MenuList {
  headText: string;
  arrowIcon: StaticImageData;
  arrowIcon2: StaticImageData;
  background: string;
  color: string;
  bigIcon: StaticImageData;
  menuText: string;
  width: string;
  height: string;
}

const WhyEntizen = () => {
  const userID = sessionStorage.getItem('USER_ID');
  // 제휴문의 채팅방 보내기
  const { data, isLoading, isError, refetch } = useQuery<ChattingListResponse>(
    'chatting-list',
    () => isTokenGetApi(`/chatting?searchKeyword&filter=all`),
    {
      enabled: userID !== null ? true : false,
    },
  );

  const chattingRoomIdx =
    data?.data.chattingRooms.entizenChattingRoom.chattingRoomIdx;

  const router = useRouter();
  const menuList: MenuList[] = [
    {
      headText: '플랫폼 가이드',
      arrowIcon: blackWhiteArrow,
      arrowIcon2: mainArrow1,
      background: '#ffffff',
      color: '#222222',
      bigIcon: bulb,
      menuText: '핵심 정보만\n쏙쏙 뽑아드려요',
      width: '42pt',
      height: '42.75pt',
    },
    {
      headText: '구독 가이드',
      arrowIcon: whiteBlueArrow,
      arrowIcon2: mainArrow2,
      background: '#5A2DC9',
      color: '#FFFFFF',
      bigIcon: mail,
      menuText: '다양한 견적서\n무료로 비교해요',
      width: '51pt',
      height: '42.75pt',
    },
    {
      headText: '충전기 가이드',
      arrowIcon: whiteGreenArrow,
      arrowIcon2: mainArrow3,
      background: '#FFC043',
      color: '#FFFFFF',
      bigIcon: message,
      menuText: '구독?\n급속? 완속?\n무엇이든 물어보세요',
      width: '52.5pt',
      height: '39pt',
    },
    {
      headText: '보조금 가이드',
      arrowIcon: blackWhiteArrow,
      arrowIcon2: mainArrow1,
      background: '#FFFFFF',
      color: '#222222',
      bigIcon: carnation,
      menuText: '전기차 충전소\nA 부터 Z까지',
      width: '32.25pt',
      height: '42.75pt',
    },
  ];

  const movePage = (el: MenuList) => {
    switch (el.headText) {
      case '플랫폼 가이드':
        return router.push('/guide');
      case '구독 가이드':
        return userID ? router.push('/mypage') : router.push('/signin');
      case '충전기 가이드':
        return userID
          ? router.push({
              pathname: `/chatting/chattingRoom`,
              query: {
                chattingRoomIdx: chattingRoomIdx,
                entizen: true,
              },
            })
          : router.push('/signin');
      case '보조금 가이드':
        return userID ? router.push('/mypage?id=3') : router.push('/signin');
      default:
        break;
    }
  };
  return (
    <>
      <Wrapper>
        <WhyBox>
          왜 <span>엔티즌</span> 인가요?
        </WhyBox>
        <GridBox>
          {menuList.map((el, index) => (
            <GridElement
              onClick={() => movePage(el)}
              color={el.background}
              key={index}
            >
              <TextArea color={el.color}>{el.menuText}</TextArea>
              <ArrowImgBox className="arrow">
                <Image className="mob" src={el.arrowIcon} alt="icon" />
              </ArrowImgBox>
              <ArrowImgBox className="arrow">
                <Image className="web" src={el.arrowIcon2} alt="icon" />
              </ArrowImgBox>
              <IconImgBox width={el.width} height={el.height}>
                <Image src={el.bigIcon} alt="icon" />
              </IconImgBox>
            </GridElement>
          ))}
        </GridBox>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin-top: 30pt;
  width: 900pt;
  margin: 0 auto;

  @media (max-width: 899.25pt) {
    width: 100%;
  }
`;

const WhyBox = styled(Typography)`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 30pt;
  font-weight: 700;
  line-height: 30pt;
  letter-spacing: -0.02em;
  text-align: left;
  margin-bottom: 48pt;

  color: #222222;
  & span {
    color: ${colors.main};
  }

  @media (max-width: 899.25pt) {
    font-size: 12pt;
    line-height: 12pt;
    margin-top: 30pt;
    margin-bottom: 0;
  }
`;

const GridBox = styled.div`
  margin-top: 12pt;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22.5pt;

  @media (max-width: 899.25pt) {
    gap: 11.25pt;
  }
`;

const GridElement = styled.div`
  width: 100%;
  height: 352.5pt;
  background-color: ${(props) => props.color};
  border-radius: 6pt;
  position: relative;
  border: 1.5pt solid #e2e5ed;
  box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);

  @media (max-width: 899.25pt) {
    height: 120pt;
    border: none;
    box-shadow: none;
    box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
  }
`;

const TextArea = styled.div`
  white-space: pre-wrap;
  width: 100%;
  font-size: 25.5pt;
  font-weight: 700;
  line-height: 37.5pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: ${(props) => props.color};
  margin: 37.5pt 51pt 30pt;

  @media (max-width: 899.25pt) {
    margin-left: 12pt;
    margin-top: 12pt;
    font-size: 14px;
    line-height: 20px;
  }
`;

const ArrowImgBox = styled.div`
  position: absolute;
  right: 45pt;
  top: 39pt;

  &:nth-of-type(2) {
    display: none;
  }

  @media (max-width: 899.25pt) {
    right: 12pt;
    top: 12pt;

    &:nth-of-type(2) {
      display: block;
    }
    &:nth-of-type(3) {
      display: none;
    }
  }
`;

const IconImgBox = styled.div<{ width: string; height: string }>`
  position: absolute;
  width: 147pt;
  height: 150pt;
  left: 51pt;
  top: 171pt;
  object-fit: cover;
  @media (max-width: 899.25pt) {
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    top: auto;
    left: 12pt;
    bottom: 12pt;
  }
`;

export default WhyEntizen;
