import styled from '@emotion/styled';
import MypageHeader from 'components/mypage/request/header';
import defaultImg from 'public/images/default-img.png';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, {
  MouseEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import send from 'public/images/send.png';
import MoreModal from 'components/Chatting/MoreModal';
import QuitModal from 'components/Chatting/QuitModal';
import sendBlue from 'public/images/send-blue.png';
import fileBtn from 'public/images/fileBtn.png';
import addBtn from 'public/images/addBtn.png';
import stopAlarm from 'public/images/stopAlarm.png';
import alarmBtn from 'public/images/alarm.png';
import moreBtn from 'public/images/moreBtn.png';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { isTokenGetApi, isTokenPostApi } from 'api';
import Loader from 'components/Loader';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import ChattingLists, { ChattingListResponse } from 'components/Chatting/ChattingLists';
import ChattingRoomLogs from 'components/Chatting/ChattingRoomLogs';
import ChattingList from 'components/Chatting/ChattingList';

type ChattingLogs = {
  createdAt: string;
  chattingLogIdx: number;
  fromMemberIdx: number;
  fromMemberType: string;
  content: string | null;
  messageType: string;
  fileUrl: string | null;
  wasRead: boolean;
};

export interface ChattingRoom {
  date: string;
  logs: ChattingLogs[];
}

export interface ChattingResponse {
  isSuccess: true;
  data: {
    chattingRoomIdx: number;
    userMember: {
      memberIdx: number;
      name: string;
    };
    companyMember: {
      memberIdx: number;
      companyMemberAdditionalInfo: {
        companyName: string;
      };
    };
    chattingRoomNotification: {
      chattingRoomNotificationIdx: number;
      isSetNotification: boolean;
    };
    chattingLogs: ChattingLogs[];
  };
}

type Props = {};

const TAG = 'pages/chatting/chattingRomm/index.tsx';
const ChattingRoom = ({ }: Props) => {

  const [moreModal, setMoreModal] = useState<boolean>(false);
  const [quitModal, setQuitModal] = useState<boolean>(false);

  const { data, isLoading, isError, refetch } = useQuery<ChattingListResponse>(
    'chatting-list',
    () =>
      isTokenGetApi(
        `/chatting?searchKeyword=&filter=all`,
      ),
    {
      enabled: false,
    },
  );

  useEffect(()=>{
    refetch();
    console.log(data?.data.chattingRooms.userChattingRooms)
  },[])

  return (
    <WebBody>
      <WebHeader />
      <Wrapper>
        <Body>
          <MobWrap>
            <ChattingLists chattingRoom={true} userChatting={true}/>
          </MobWrap>
          <ChattingRoomLogs userChatting={true}/>
        </Body>
      </Wrapper>
      <WebFooter />

      {/* 더보기 모달 제어 */}
      {moreModal && (
        <MoreModal setMoreModal={setMoreModal} setQuitModal={setQuitModal} />
      )}

      {/* 나가기 모달 제어 */}
      {quitModal && <QuitModal setModal={setQuitModal} />}
    </WebBody>
  );
};

export default ChattingRoom;

const WebBody = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
width: 100%;
height: 100vh;
margin: 0 auto;
background: #ffffff;

@media (max-height: 809pt) {
  display: block;
  height: 100%;
}
`;

const Wrapper = styled.div`
  position: relative;
  width: 900pt;
  margin: 60pt auto;
  display: flex;
  gap: 60pt;
  flex-direction: row;

  @media (max-width: 899.25pt) {
    padding-bottom: 60pt;
    flex-direction: column;
    width: 100%;
    gap: 0;
    margin: 0;
  }
`;

const Body = styled.div`
font-family: 'Spoqa Han Sans Neo';
width: 100%;

@media (min-width: 900pt) {
display: flex;
border: 1px solid #E2E5ED;
border-radius: 12pt;
height: 495pt;
overflow: hidden;
}
`

const MobWrap = styled.div`
@media (max-width: 899.25pt) {
  display: none;
}
`