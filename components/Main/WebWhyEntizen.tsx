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
import { useRouter } from 'next/router';
import { isTokenGetApi } from 'api';
import { useQuery } from 'react-query';
import { ChattingListResponse } from 'components/Chatting/ChattingLists';

interface MenuList {
  headText: string;
  arrowIcon: StaticImageData;
  background: string;
  color: string;
  bigIcon: StaticImageData;
  menuText: string;
  width: string;
  height: string;
}

const WhyEntizen = () => {
  const router = useRouter();
  const userID = JSON.parse(sessionStorage.getItem('USER_ID')!);
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
      background: '#FFC043',
      color: '#FFFFFF',
      bigIcon: message,
      menuText: '구독?\n급속? 완속?\n무엇이든\n물어보세요',
      width: '52.5pt',
      height: '39pt',
    },
    {
      headText: '보조금 가이드',
      arrowIcon: blackWhiteArrow,
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
        <WhyBox>왜 엔티즌 인가요?</WhyBox>
        <GridBox>
          {menuList.map((el, index) => (
            <GridElement
              color={el.background}
              key={index}
              onClick={() => movePage(el)}
            >
              <TextArea color={el.color}>{el.menuText}</TextArea>
              <ArrowImgBox>
                <Image src={el.arrowIcon} alt="icon" />
              </ArrowImgBox>
              <IconImgBox>
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
  width: 100%;

  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const WhyBox = styled(Typography)`
  text-align: center;
  margin-bottom: 30pt;
  font-size: 19.5pt;
  font-weight: 700;
  line-height: 33pt;
  letter-spacing: -0.02em;
  color: #222222;
  font-family: 'Spoqa Han Sans Neo';

  & span {
    color: ${colors.main};
  }

  @media (max-width: 899.25pt) {
    text-align: left;
    margin-bottom: 0;
  }
`;

const GridBox = styled.div`
  display: flex;

  @media (max-width: 899.25pt) {
    margin-top: 12pt;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 11.25pt;
  }
`;

const GridElement = styled.div`
  width: 100%;
  height: 255pt;
  background-color: ${(props) => props.color};
  border-radius: 12pt;
  position: relative;
  box-shadow: 0px 0px 11.25pt rgba(137, 163, 201, 0.2);

  margin-right: 22.5pt;
  &:nth-of-type(4) {
    margin-right: 0;
  }
  @media (max-width: 899.25pt) {
    margin-right: 0;
    height: 120pt;
    box-shadow: none;
    border-radius: 6pt;
  }
`;

const TextArea = styled.div`
  white-space: pre-wrap;
  margin-left: 22.5pt;
  margin-top: 22.5pt;
  font-size: 19.5pt;
  font-weight: 700;
  line-height: 33pt;
  letter-spacing: -0.02em;
  text-align: left;
  font-family: 'Spoqa Han Sans Neo';
  color: ${(props) => props.color};
  @media (max-width: 899.25pt) {
    margin-left: 12pt;
    margin-top: 12pt;
  }
`;

const ArrowImgBox = styled.div`
  display: none;
  position: absolute;
  right: 12pt;
  top: 12pt;
  @media (max-width: 899.25pt) {
    display: block;
  }
`;

// const IconImgBox = styled.div<{ width: string; height: string }>`
//   position: absolute;
//   width: ${({ width }) => width};
//   height: ${({ height }) => height};

//   left: 22.5pt;
//   bottom: 22.5pt;

//   @media (max-width: 899.25pt) {
//     left: 12pt;
//     bottom: 12pt;
//   }
// `;

const IconImgBox = styled.div`
  position: absolute;
  width: 80pt;
  /* height: 100pt; */
  left: 22.5pt;
  bottom: 22.5pt;

  @media (max-width: 899.25pt) {
    left: 12pt;
    bottom: 12pt;
  }
`;

export default WhyEntizen;
