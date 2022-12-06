import styled from '@emotion/styled';
import { InputAdornment, TextField } from '@mui/material';
import { isTokenGetApi } from 'api';
import BottomNavigation from 'components/BottomNavigation';
import Loader from 'components/Loader';
import ComChattingList from 'componentsCompany/Chatting/ComChattingLIst';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import useDebounce from 'hooks/useDebounce';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChattingListResponse } from 'pages/chatting';
import search from 'public/images/search.png';
import bell from 'public/images/bell.png';
import Bell_outline from 'public/images/Bell_outline.png';
import List from 'public/images/List.png';

import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import ChattingLists from 'components/Chatting/ChattingLists';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
const Chatting = () => {
  const router = useRouter();
  const routerId = router?.query?.chattingRoomIdx!;
  const queryClinet = useQueryClient();
  const tabList = ['전체', '안 읽음', '즐겨찾기'];
  const TabListEn = ['all', 'unread', 'favorite'];
  const [index, setIndex] = useState<number>(0);
  // const [user, setUser] = useState<string>('');
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
    // queryClinet.invalidateQueries('chatting-list');
    refetch();
  }, [index, keyword]);

  console.log('list', data)

  const handle = () => {};

  if (isLoading) {
    return <Loader />;
  }
  return (
    <WebBody>
      <WebBuyerHeader setOpenSubLink={()=>{}}/>
      <Wrapper>
        <ChattingLists userChatting={false}/>
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

const IconBox = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  right: 0;
  gap: 11.25pt;

  @media (min-width: 900pt) {
    display: none;
  }
`
const IconWrap = styled.div`
  position: relative;
  width: 18pt;
  height: 18pt;
`

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
    background: white;
  }
`;
const WebBox = styled.div`
  padding: 22.5pt 0 0;
  background: white;
  @media (max-width: 899pt) {
    padding: 0;
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


