import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import colors from 'styles/colors';
import checkSmall from 'public/images/chat_check_small.svg';
import Image from 'next/image';
import { EntizenChattingRoom, UserChattingRooms } from 'pages/chatting';
import { isTokenGetApi } from 'api';
import { ChattingResponse } from 'components/Chatting/ChattingRoomLogs';
import { useQuery } from 'react-query';
import instance from 'api/interceptor/service';
type Props = {
  type: 'ADMIN' | 'MEMBER';
  chatting: UserChattingRooms | EntizenChattingRoom | undefined;
  onClickFavorite: () => void;
  onClickAlarm: () => void;
  onClickRouter: () => void;
  onClickDelete: () => void;
};

export default function ChattingContextModal({
  type,
  chatting,
  onClickFavorite,
  onClickAlarm,
  onClickRouter,
  onClickDelete,
}: Props) {
  const ChattingRef = useRef<HTMLUListElement | null>(null);

  const handleCloseSelect = () => {
    const modal: HTMLElement | null = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'none';
    }
  };

  // 채팅방 참여
  const onClickRouterModal = () => {
    onClickRouter();
  };
  // 즐겨찾기
  const onClickFavoriteModal = () => {
    onClickFavorite();
  };
  // 알람 on/off
  const onClickAlarmModal = () => {
    onClickAlarm();
  };
  // 모달 닫기
  const onClickDeleteModal = () => {
    onClickDelete();
  };
  // 읽음 처리
  const onClickIsRead = () => {
    if (chatting?.chattingRoomIdx) {
      instance.get(`/chatting/${chatting?.chattingRoomIdx}?page=1`);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleCloseSelect);
    return () => {
      window.removeEventListener('click', handleCloseSelect);
    };
  }, []);

  return (
    <Wrap id="modal" ref={ChattingRef}>
      <List onClick={onClickRouterModal}>채팅방 열기</List>
      <Line />
      <List className="check" onClick={onClickFavoriteModal}>
        <span
          className={`img ${
            chatting?.chattingRoomFavorite.isFavorite ? '' : 'off'
          }`}
        >
          <Image src={checkSmall} alt="checkSmall" />
        </span>
        <span>즐겨찾기</span>
      </List>
      <Line />
      <List className="check first" onClick={onClickAlarmModal}>
        <span
          className={`img ${
            chatting?.chattingRoomNotification.isSetNotification ? '' : 'off'
          }`}
        >
          <Image src={checkSmall} alt="checkSmall" />
        </span>
        <span>알림</span>
      </List>
      <List onClick={onClickIsRead}>읽음 처리</List>
      {type === 'MEMBER' ? (
        <>
          <Line />
          <List onClick={onClickDeleteModal}>채팅방 나가기</List>
        </>
      ) : (
        ''
      )}
    </Wrap>
  );
}

const Wrap = styled.ul`
  display: none;
  position: fixed;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding: 6pt 9pt;
  background-color: ${colors.lightWhite};
  box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 6pt;
  z-index: 9999;
`;

const List = styled.li`
  padding: 6pt 0 6pt 12pt;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  &.check {
    padding: 6pt 0;
  }
  &.first {
    padding: 6pt 0 0 0;
  }
  .img {
    position: relative;
    margin-right: 3pt;
  }
  .off {
    visibility: hidden;
  }
`;
const Line = styled.li`
  width: 105pt;
  border-bottom: 1px solid ${colors.gray};
`;
