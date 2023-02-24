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

const WebBottomBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 3pt 0pt 16.5pt;

  div.typing {
    width: 18.75pt;
    height: 20.6pt;
    position: relative;
    &.on {
      display: none;
    }
    &.off {
      display: block;
    }
  }
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const FlexBox2 = styled.form`
  margin: 0 22.5pt 0 13.5pt;
  display: flex;
  gap: 14.25pt;
  align-items: center;
`;
const InputWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid #d3d3d3;
  border-radius: 37.5pt;
`;
const FileIconWrap = styled.div`
  position: relative;
  width: 14.5pt;
  height: 15.45pt;
  margin: 0 0 0 13.5pt;
`;

const BottomBox = styled.div`
  background: #e9eaee;
  position: fixed;
  bottom: 0;
  padding: 3pt 0pt 36pt;
  width: 100%;
  @media (min-width: 900pt) {
    position: absolute;
    display: none;
  }

  .hidden {
    background-color: aqua;
    width: 30pt;
    height: 0;
    //height: 97.5pt;
    position: absolute;
    bottom: 72pt;
    left: 11.5pt;
    transition: 0.3s;
  }
`;
const FlexBox = styled.form`
  display: flex;
  align-items: center;
  gap: 10.5pt;
  padding: 0 15pt;
`;
const AddBtn = styled.div`
  position: relative;
  width: 9pt;
  height: 9pt;
  padding: 5pt 6pt 6pt;
  border-radius: 50%;
  background: #a6a9b0;
  transition: 0.3s;
  &.on {
    transform: rotate(45deg);
  }
`;
const TextInput = styled.input`
  flex: auto;
  border-radius: 37.5pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 12pt;
  line-height: 9pt;
  letter-spacing: -0.02em;
  padding: 6pt 7.8pt;
  ::placeholder {
    color: #d3d3d3;
  }
`;
const IconWrap2 = styled.div`
  position: relative;
  width: 18.75pt;
  height: 20.7pt;
`;

const TopBox = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 5;

  @media (min-width: 900pt) {
    position: absolute;
    border-bottom: 1px solid #e2e5ed;
    width: -webkit-fill-available;
    padding: 22.5pt 5pt;
  }
`;
const IconBox = styled.div`
  position: absolute;
  right: 15pt;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 6.4pt;
  align-items: center;

  @media (min-width: 900pt) {
    right: 21pt;
  }
`;
const IconWrap = styled.div`
  position: relative;
  width: 12pt;
  height: 13.5pt;
  @media (min-width: 900pt) {
    width: 20.5pt;
    height: 20.5pt;

    &.web {
      width: 13pt;
      height: 15.25pt;
    }
  }
`;
const Inner = styled.div`
  position: relative;
  padding-top: 36pt;
  padding-bottom: 66pt;
  /* height: 100vh; */
  @media (min-width: 900pt) {
    padding-top: 105pt;
  }
`;
const DateChatting = styled.div`
  width: 100%;
  font-family: 'Spoqa Han Sans Neo';
  text-align: center;
  position: relative;
  box-sizing: border-box;
  &::before {
    display: block;
    content: '';
    clear: both;
    width: 50%;
    height: 1px;
    background: #e2e5ed;
    position: absolute;
    top: 15pt;
    left: 0;
    z-index: -1;
  }
  &::after {
    display: block;
    content: '';
    clear: both;
    width: 50%;
    height: 1px;
    background: #e2e5ed;
    position: absolute;
    top: 15pt;
    right: 0;
    z-index: -1;
  }
`;
const Date = styled.span`
  display: inline-block;
  padding: 9pt;
  background: white;
  font-style: normal;
  font-weight: 400;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #a6a9b0;
  position: relative;

  @media (min-width: 900pt) {
    border: 1px solid #e2e5ed;
    border-radius: 12pt;
    padding: 6pt 9pt;
  }
`;

const List = styled.div`
  margin: 0 15pt;
  @media (min-width: 900pt) {
    margin: 0 21pt;
  }
`;

const ChatBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 9pt;
  gap: 6pt;
  &.company {
    flex-direction: row-reverse;
  }
`;
const ImageWrap = styled.div`
  width: 36pt;
  height: 36pt;
  position: relative;
`;

const Chat = styled.div`
  border-radius: 6pt;
  color: white;
  padding: 7.5pt 6pt;
  font-style: normal;
  font-weight: 400;
  font-size: 12pt;
  line-height: 16.5pt;
  letter-spacing: -0.02em;
  &.user {
    background: #f3f4f7;
    color: #222222;
  }
  &.company {
    background: #5221cb;
  }
`;
const File = styled.div`
  background: #5221cb;
  border-radius: 6pt;
  color: white;
  padding: 7.5pt 6pt;
  font-style: normal;
  font-weight: 400;
  font-size: 12pt;
  line-height: 16.5pt;
  letter-spacing: -0.02em;
`;
const MessageDate = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 7.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #caccd1;
  margin-top: 12pt;
`;

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
