import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import ChattingRoomLogs from 'components/Chatting/ChattingRoomLogs';
import WebFooter from 'componentsWeb/WebFooter';
import ChattingLists, {
  ChattingListResponse,
} from 'components/Chatting/ChattingLists';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import CompanyRightMenu from 'componentsWeb/CompanyRightMenu';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { redirectAction } from 'store/redirectUrlSlice';
import ChattingRoomLogsEntizen from 'components/Chatting/ChattingRoomLogsEntizen';

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

type Props = {};

const ChattingRoom = ({}: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  const memberType = JSON.parse(localStorage.getItem('MEMBER_TYPE')!);

  const { data, isLoading, isError, refetch } = useQuery<ChattingListResponse>(
    'chatting-list',
    () => isTokenGetApi(`/chatting?searchKeyword=&filter=all`),
    {
      enabled: false && accessToken ? true : false,
    },
  );

  useEffect(() => {
    refetch();
  }, []);

  if (!accessToken && memberType !== 'COMPANY') {
    dispatch(redirectAction.addUrl(router.asPath));
    router.push('/signin');
  } else {
    // console.log('앤타준? ', router.query.entizen);
    return (
      <WebBody>
        <WebBuyerHeader setOpenSubLink={() => {}} />
        <CompanyRightMenu />
        <Wrapper>
          <Body>
            <MobWrap>
              <ChattingLists chattingRoom={true} userChatting={false} />
            </MobWrap>
            {router.query.entizen ? (
              <ChattingRoomLogsEntizen
                userChatting={true}
                isCompany={true}
                listRefetch={refetch}
              />
            ) : (
              <ChattingRoomLogs userChatting={false} listRefetch={refetch} />
            )}
          </Body>
        </Wrapper>
        <WebFooter />
      </WebBody>
    );
  }
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

const Body = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  width: 100%;

  @media (min-width: 900pt) {
    display: flex;
    border: 1px solid #e2e5ed;
    border-radius: 12pt;
    height: 495pt;
    overflow: hidden;
  }
`;

const MobWrap = styled.div`
  @media (max-width: 899.25pt) {
    display: none;
  }
`;
