import styled from '@emotion/styled';
import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import useDebounce from 'hooks/useDebounce';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import ChattingLists from 'components/Chatting/ChattingLists';
import UserRightMenu from 'components/UserRightMenu';

export interface UserChattingRooms {
  chattingRoomIdx: number;
  companyMember: {
    memberIdx: number;
    companyMemberAdditionalInfo: {
      companyName: string;
      companyLogoImageUrl: string | null;
    };
  };
  userMember: {
    memberIdx: number;
    name: string;
    profileImageUrl: null | string;
  };
  chattingLogs: {
    fromMemberIdx: number;
    fromMemberType: 'USER' | 'COMPANY';
    wasRead: boolean;
    createdAt: string;
    content: string;
    fileUrl: string;
  };
  chattingRoomFavorite: {
    chattingRoomFavoriteIdx: number;
    isFavorite: boolean;
  };
  chattingRoomNotification: {
    chattingRoomNotificationIdx: number;
    isSetNotification: boolean;
  };
}

export interface ChattingListResponse {
  isSuccess: true;
  data: {
    chattingRooms: {
      entizenChattingRoom: {
        chattingRoomIdx: number;
        chattingLog: null | {
          fromMemberIdx: number;
          fromMemberType: string;
          wasRead: boolean;
          createdAt: string;
          content: string;
          fileUrl: string;
        };
        chattingRoomFavorite: {
          chattingRoomFavoriteIdx: number;
          isFavorite: boolean;
        };
        chattingRoomNotification: {
          chattingRoomNotificationIdx: number;
          isSetNotification: boolean;
        };
      };
      userChattingRooms: UserChattingRooms[];
    };
  };
}

const TAG = 'pages/chatting/index.tsx';
const Chatting = () => {
  const router = useRouter();
  const tabList = ['전체', '안 읽음', '즐겨찾기'];
  const TabListEn = ['all', 'unread', 'favorite'];
  const [index, setIndex] = useState<number>(0);
  const [company, setCompany] = useState<string>('');

  const [text, setText] = useState('');
  const keyword = useDebounce(text, 2000);

  const { data, isLoading, isError, refetch } = useQuery<ChattingListResponse>(
    'chatting-list',
    () =>
      isTokenGetApi(
        `/chatting?searchKeyword=${keyword}&filter=${TabListEn[index]}`,
      ),
    {
      enabled: false,
    },
  );

  useEffect(() => {
    // console.log('useeffect', company);
    if (typeof router.query.companyMemberId === 'string') {
      setCompany(router.query.companyMemberId);
    } else {
      setCompany('');
    }
  }, [router.query.companyMemberId]);

  useEffect(() => {
    // queryClinet.invalidateQueries('chatting-list');
    refetch();
  }, [index, keyword]);

  if (isLoading) {
    return <Loader />;
  }

  // console.log('채팅 리스트 api ~ line 67 -> ' + TAG);
  // console.log(data);

  return (
    <WebBody>
      <WebHeader />
      <UserRightMenu />
      <Wrapper>
        <ChattingLists userChatting={true} />
      </Wrapper>
      <WebFooter />
    </WebBody>
  );
};

export default Chatting;

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #ffffff;

  @media (max-width: 899.25pt) {
    position: fixed;
    -webkit-overflow-scrolling: touch;
  }

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
    // padding-bottom: 60pt;
    flex-direction: column;
    width: 100%;
    gap: 0;
    margin: 0;
  }
`;
