import styled from '@emotion/styled';
import { InputAdornment, TextField } from '@mui/material';
import { isTokenGetApi } from 'api';
import BottomNavigation from 'components/BottomNavigation';
import ChattingList from 'components/Chatting/ChattingList';
import useDebounce from 'hooks/useDebounce';
import Image from 'next/image';
import { useRouter } from 'next/router';
import search from 'public/images/search.png';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import bell from 'public/images/bell.png';
import ComChattingList from 'componentsCompany/Chatting/ComChattingLIst';
import Hamburger from 'public/images/list-bar.svg';
import { Drawer } from '@mui/material';
import HamburgerBar from 'componentsWeb/HamburgerBar';
import { UserChattingRooms } from 'pages/chatting';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';
import { alarmNumberSliceAction } from 'store/alarmNumberSlice';

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

type Props = {
  chattingRoom?: boolean;
  userChatting: boolean;
};

const TAG = 'pages/chatting/index.tsx';
const ChattingLists = ({ chattingRoom, userChatting }: Props) => {
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const tabList = ['전체', '안 읽음', '즐겨찾기'];
  const TabListEn = ['all', 'unread', 'favorite'];
  const [index, setIndex] = useState<number>(0);
  const [company, setCompany] = useState<string>('');
  const [text, setText] = useState('');
  const keyword = useDebounce(text, 500);

  const { data, isLoading, isError, refetch } = useQuery<ChattingListResponse>(
    'chatting-list',
    () =>
      isTokenGetApi(
        `/chatting?searchKeyword=${keyword}&filter=${TabListEn[index]}`,
      ),
    {
      //enabled: false,
      enabled: router.isReady,
      refetchInterval: 3000,
    },
  );

  const onChangeKeyword = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setText(event.currentTarget.value);
  };

  const handle = () => {
    if (userChatting) {
      router.push({
        pathname: '/faq',
        query: { direct: true },
      });
    } else {
      router.push({
        pathname: '/company/faq',
        query: { direct: true },
      });
    }
  };

  useEffect(() => {
    if (typeof router.query.companyMemberId === 'string') {
      setCompany(router.query.companyMemberId);
    } else {
      setCompany('');
    }
  }, [router.query.companyMemberId]);

  useEffect(() => {
    // queryClinet.invalidateQueries('chatting-list');
    refetch();
    // console.log(data);
  }, [index, keyword]);

  {
    /* // 페이지 이동시 스크롤 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.query.chattingRoomIdx]); */
  }

  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

  return (
    <Body className="chatt-body" chattingRoom={Boolean(chattingRoom)}>
      <Header>
        <H2>소통하기</H2>
        <IconWrapper>
          <IconWrap
            onClick={() => {
              router.push('/alarm');
              dispatch(alarmNumberSliceAction.setalarmNumberSlice(0));
            }}
          >
            <Image src={bell} alt="alarmIcon" layout="fill" />
          </IconWrap>
          {mobile && (
            <>
              {(['right'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                  <HamburgerOn onClick={toggleDrawer(anchor, true)}>
                    <IconBox>
                      <Image src={Hamburger} alt="listIcon" />
                    </IconBox>
                  </HamburgerOn>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                    // PaperProps={{ style: { borderRadius: '20pt 20pt 0 0' } }}
                  >
                    <HamburgerBar
                      anchor={anchor}
                      toggleDrawer={toggleDrawer}
                      setState={setState}
                      state={state}
                    />
                  </Drawer>
                </React.Fragment>
              ))}
            </>
          )}
        </IconWrapper>
      </Header>
      <FlexBox chattingRoom={Boolean(chattingRoom)}>
        <WebBox>
          <Input
            placeholder="이름을 검색하세요."
            type="text"
            value={text}
            onChange={onChangeKeyword}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <div style={{ width: '15pt', height: '15pt' }}>
                    <Image src={search} alt="searchIcon" layout="intrinsic" />
                  </div>
                </InputAdornment>
              ),
            }}
          />
          <Inner>
            <TabList>
              {tabList.map((t, idx) => {
                return (
                  <Tab
                    key={idx}
                    onClick={() => setIndex(idx)}
                    tab={idx.toString()}
                    index={index.toString()}
                  >
                    {t}
                    <Dot tab={idx.toString()} index={index.toString()} />
                  </Tab>
                );
              })}
              <FAQBtn onClick={handle}>FAQ</FAQBtn>
            </TabList>
            {/* 채팅 리스트 */}
            {userChatting ? (
              <ChattingList data={data!} refetch={refetch} />
            ) : (
              <ComChattingList data={data!} refetch={refetch} />
            )}
          </Inner>
        </WebBox>
      </FlexBox>
      {/* 채팅 룸 */}
      {/*       
          {routerId && (
            <MobBox>
              <ChattingRoom routerId={routerId!} name={name} alarm={isAlarm} />
            </MobBox>
          )} */}
      {mobile && <BottomNavigation />}
    </Body>
  );
};

export default ChattingLists;

const Body = styled.div<{ chattingRoom: boolean }>`
  font-family: 'Spoqa Han Sans Neo';
  width: ${({ chattingRoom }) => (chattingRoom ? `auto` : `100%`)};

  @media (min-width: 900pt) {
    display: flex;
    border: ${({ chattingRoom }) =>
      chattingRoom ? `none` : `0.75pt solid #e2e5ed`};
    border-right: 0.75pt solid #e2e5ed;
    border-radius: ${({ chattingRoom }) => (chattingRoom ? `0` : `12pt`)};
    overflow: hidden;
  }
  @media (max-width: 899.25pt) {
    position: fixed;
  }
`;

const Header = styled.header`
  width: 100%;
  position: relative;
  position: fixed;
  /* z-index: 1000; */
  background-color: white;
  left: 0;
  top: 0;
  margin-top: 12pt;
  padding: 0 15pt;

  @media (min-width: 900pt) {
    display: none;
  }
`;

const IconBox = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  right: 15pt;
  gap: 22pt;

  @media (min-width: 900pt) {
    display: none;
  }
`;
const IconWrap = styled.div`
  position: absolute;
  top: 0;
  right: 48pt;
  width: 18pt;
  height: 18pt;
  cursor: pointer;
`;

const H2 = styled.h2`
  font-style: normal;
  font-weight: 700;
  font-size: 21pt;
  line-height: 21pt;
  letter-spacing: -0.02em;
  color: #222222;
  margin: 0 0 15pt;
`;

const Input = styled(TextField)`
  margin: 0 21pt;
  border-radius: 6pt;
  border: 2.5pt solid #5221cb;
  display: flex;
  overflow: hidden;
  justify-content: center;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  margin-top: 0pt;
  .MuiInputBase-root {
    padding: 6.7pt 12pt;
  }
  & input {
    font-size: 10.5pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -2%;
    text-align: left;
    padding: 0;
  }

  ::placeholder {
    color: #caccd1;
    font-weight: 400;
  }
  & span > img {
    width: 15pt;
    height: 15pt;
  }
  & fieldset {
    border: none;
  }

  @media (max-width: 899.25pt) {
    margin: 9pt 15pt 0;
  }
`;

const FlexBox = styled.div<{ chattingRoom: boolean }>`
  flex: 1;
  height: 495pt;
  width: ${({ chattingRoom }) => (chattingRoom ? `300pt` : `auto`)};
  overflow-y: scroll;
  background: #e2e5ed;
  @media (max-width: 899.25pt) {
    margin-top: 9pt;
    height: auto;
    overflow-y: auto;
    background: white;
    padding-top: 37.5pt;
  }
`;
const WebBox = styled.div`
  padding: 22.5pt 0 0;
  background: white;
  @media (max-width: 899pt) {
    padding: 0;
  }
`;

const Inner = styled.div`
  position: relative;
`;

const TabList = styled.ul`
  list-style: none;
  display: flex;
  gap: 15pt;
  padding: 22.5pt 0;
  position: relative;
  margin: 0 21pt;

  @media (max-width: 899.25pt) {
    margin: 0 15pt;
  }
`;
const Tab = styled.li<{ tab: string; index: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  font-style: normal;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${({ tab, index }) => (tab === index ? `#5221CB` : `#CACCD1`)};
`;
const Dot = styled.div<{ tab: string; index: string }>`
  width: 3pt;
  height: 3pt;
  border-radius: 50%;
  margin: 6pt auto 0 auto;
  background-color: ${({ tab, index }) => tab === index && `#5221CB`};
`;

const FAQBtn = styled.button`
  background: #ffc043;
  border: none;
  border-radius: 12pt;
  color: white;
  font-style: normal;
  font-weight: 500;
  font-size: 9pt;
  line-height: 9pt;
  letter-spacing: -0.02em;
  position: absolute;
  right: 0;
  top: 22.4pt;
  padding: 4.5pt 7.5pt;
  @media (min-width: 900pt) {
    display: none;
  }
`;

const HamburgerOn = styled.div``;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const FirstIconBox = styled.div`
  margin-top: 9pt;
  margin-bottom: 9pt;

  margin-right: 9pt;
`;
