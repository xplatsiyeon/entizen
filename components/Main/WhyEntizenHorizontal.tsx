import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import React from 'react';
import colors from 'styles/colors';
import { ChattingListResponse } from 'components/Chatting/ChattingLists';
import blackWhiteArrow from 'public/images/blackWhiteArrow40.png';
import whiteBlackArrow from 'public/images/whiteBlackArrow40.png';
import bulb from 'public/images/bulb.png';
import message from 'public/images/message.png';
import mail from 'public/images/mail.png';
import carnation from 'public/images/carnation.png';
import mainArrow1 from 'public/images/mainArrow1.png';
import mainArrow2 from 'public/images/mainArrow2.png';
import mainArrow3 from 'public/images/mainArrow3.png';
import router, { useRouter } from 'next/router';
import { isTokenGetApi } from 'api';
import { useQuery } from 'react-query';

type Props = {};

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

const WhyEntizenHorizontal = (props: Props) => {
  const userID = sessionStorage.getItem('USER_ID');
  const router = useRouter();
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

  const menuList: MenuList[] = [
    {
      headText: '플랫폼 가이드',
      arrowIcon: blackWhiteArrow,
      arrowIcon2: mainArrow1,
      background: '#ffffff',
      color: '#222222',
      bigIcon: bulb,
      menuText: '핵심 정보만\n쏙쏙 뽑아드려요',
      width: '93.75pt',
      height: '94.5pt',
    },
    {
      headText: '구독 가이드',
      arrowIcon: whiteBlackArrow,
      arrowIcon2: mainArrow2,
      background: '#5A2DC9',
      color: '#FFFFFF',
      bigIcon: mail,
      menuText: '다양한 견적서\n무료로 비교해요',
      width: '108.75pt',
      height: '87pt',
    },
    {
      headText: '충전기 가이드',
      arrowIcon: whiteBlackArrow,
      arrowIcon2: mainArrow3,
      background: '#FFC043',
      color: '#FFFFFF',
      bigIcon: message,
      menuText: '구독? 급속? 완속?\n무엇이든 물어보세요',
      width: '117pt',
      height: '87pt',
    },
    {
      headText: '보조금 가이드',
      arrowIcon: blackWhiteArrow,
      arrowIcon2: mainArrow1,
      background: '#FFFFFF',
      color: '#222222',
      bigIcon: carnation,
      menuText: '전기차 충전소\nA 부터 Z까지',
      width: '79.5pt',
      height: '105pt',
    },
  ];

  const movePage = (el: MenuList) => {
    switch (el.headText) {
      case '플랫폼 가이드':
        return router.push('/guide/platform');
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
        <WhyBox>왜 엔티즌 인가요?</WhyBox>
        <GridBox>
          {menuList.map((el, index) => (
            <GridElement
              onClick={() => movePage(el)}
              color={el.background}
              key={index}
            >
              <TextArea color={el.color}>{el.menuText}</TextArea>
              <IconImgBox width={el.width} height={el.height}>
                <Image src={el.bigIcon} layout="fill" alt="icon" />
              </IconImgBox>
            </GridElement>
          ))}
        </GridBox>
      </Wrapper>
    </>
  );
};

export default WhyEntizenHorizontal;

const Wrapper = styled.div`
  margin-top: 30pt;
  width: 895.5pt;
  margin: 0 auto;

  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const WhyBox = styled(Typography)`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 19pt;
  font-weight: 700;
  line-height: 33pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #222222;
`;

const GridBox = styled.div`
  margin-top: 12pt;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22.5pt;
`;

const GridElement = styled.div`
  /* width: 100%; */
  height: 201pt;
  padding: 26.25pt 25.5pt 27pt 28.5pt;
  background-color: ${(props) => props.color};
  border-radius: 12pt;
  position: relative;
  box-shadow: 0px 0px 15px rgba(137, 163, 201, 0.2);
  cursor: pointer;
`;

const TextArea = styled.div<{ color: string }>`
  white-space: pre-wrap;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 19.5pt;
  font-weight: 700;
  line-height: 30pt;
  letter-spacing: -0.02em;
  color: ${({ color }) => color};
  text-align: left;
`;

const ArrowImgBox = styled.div`
  position: absolute;
  width: 30pt;
  height: 30pt;
  left: 28.5pt;
  bottom: 27pt;
`;

const IconImgBox = styled.div<{ width: string; height: string }>`
  position: absolute;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  right: 25.5pt;
  bottom: 27pt;
`;
