import styled from '@emotion/styled';
import { InputAdornment, TextField } from '@mui/material';
import { isTokenGetApi } from 'api';
import BottomNavigation from 'components/BottomNavigation';
import ChattingList from 'components/Chatting/ChattingList';
import Loader from 'components/Loader';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import useDebounce from 'hooks/useDebounce';
import Image from 'next/image';
import { useRouter } from 'next/router';
import search from 'public/images/search.png';
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import ChattingRoom from './chattingRoom';

export interface UserChattingRooms {
  chattingRoomIdx: number;
  companyMember: {
    memberIdx: number;
    companyMemberAdditionalInfo: {
      companyName: string;
    };
  };
  userMember: {
    memberIdx: number;
    name: string;
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
      entizenChattingRoom: null;
      userChattingRooms: UserChattingRooms[];
    };
  };
}
const TAG = 'pages/chatting/index.tsx';
const Chatting = () => {
  const router = useRouter();
  const routerId = router.query.chattingRoomIdx;
  const queryClinet = useQueryClient();
  const tabList = ['전체', '안 읽음', '즐겨찾기'];
  const TabListEn = ['all', 'unread', 'favorite'];
  const [index, setIndex] = useState<number>(0);
  const [company, setCompany] = useState<string>('');
  const [name, setName] = useState<string>();
  const [isAlarm, setIsAlarm] = useState<string>();
  const [text, setText] = useState('');
  const keyword = useDebounce(text, 2000);

  const { data, isLoading, isError, refetch } = useQuery<ChattingListResponse>(
    'chatting-list',
    () =>
      isTokenGetApi(
        `/chatting?searchKeyword=${keyword}&filter=${TabListEn[index]}`,
      ),
  );

  const onChangeKeyword = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setText(event.currentTarget.value);
  };

  const handle = () => {};

  useEffect(() => {
    console.log('useeffect', company);
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
      <Wrapper>
        <Body>
          <Header>
            <H2>소통하기</H2>
          </Header>
          <FlexBox>
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
                        <Image
                          src={search}
                          alt="searchIcon"
                          layout="intrinsic"
                        />
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
                <ChattingList
                  data={data!}
                  // setName={setName}
                  // setIsAlarm={setIsAlarm}
                />
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
          <BottomNavigation />
        </Body>
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
    overflow: hidden;
  }
`;

const Header = styled.header`
  position: relative;
  margin: 0 15pt;

  @media (min-width: 900pt) {
    display: none;
  }
`;

const H2 = styled.h2`
  font-style: normal;
  font-weight: 700;
  font-size: 21pt;
  line-height: 21pt;
  letter-spacing: -0.02em;
  color: #222222;
  margin: 12pt 0 15pt;
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
    padding: 10.5pt 12pt;
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

const FlexBox = styled.div`
  flex: 1;
  height: 495pt;
  overflow-y: scroll;
  background: #e2e5ed;
  @media (max-width: 899.25pt) {
    margin-top: 9pt;
    height: auto;
    overflow-y: auto;
  }
`;
const WebBox = styled.div`
  padding: 22.5pt 0 0;
  background: white;
  @media (max-width: 899pt) {
  }
`;

const MobBox = styled.div`
  flex: 2;
  height: 495pt;
  overflow-y: scroll;
  border-left: 0.75pt solid #e2e5ed;

  @media (max-width: 899.25pt) {
    width: 100%;
    position: absolute;
    top: 0;
    //나중에 수정..
    z-index: 1000;
    background: white;
    height: 100vh;
    overflow-y: auto;
    border-left: 0;
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
