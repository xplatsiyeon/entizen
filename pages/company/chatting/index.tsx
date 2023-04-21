import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';
import WebFooter from 'componentsWeb/WebFooter';
import useDebounce from 'hooks/useDebounce';
import { useRouter } from 'next/router';
import { ChattingListResponse } from 'pages/chatting';

import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import ChattingLists from 'components/Chatting/ChattingLists';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import CompanyRightMenu from 'componentsWeb/CompanyRightMenu';
import { useDispatch } from 'react-redux';
import { redirectAction } from 'store/redirectUrlSlice';
const Chatting = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);

  const TabListEn = ['all', 'unread', 'favorite'];
  const [index, setIndex] = useState<number>(0);
  const [openSubLink, setOpenSubLink] = useState<boolean>(false);
  const [tabNumber, setTabNumber] = useState<number>(0);
  // const [user, setUser] = useState<string>('');
  const [text, setText] = useState('');
  const keyword = useDebounce(text, 2000);

  const { data, isLoading, refetch } = useQuery<ChattingListResponse>(
    'chatting-list',
    () =>
      isTokenGetApi(
        `/chatting?searchKeyword=${keyword}&filter=${TabListEn[index]}`,
      ),
    {
      enabled: false && accessToken ? true : false,
    },
  );

  useEffect(() => {
    // queryClinet.invalidateQueries('chatting-list');
    refetch();
  }, [index, keyword]);

  if (isLoading) {
    return <Loader />;
  }
  if (!accessToken && memberType !== 'COMPANY') {
    dispatch(redirectAction.addUrl(router.asPath));
    router.push('/signin');
  } else {
    return (
      <WebBody>
        <WebBuyerHeader
          setTabNumber={setTabNumber}
          tabNumber={tabNumber}
          openSubLink={openSubLink}
          setOpenSubLink={setOpenSubLink}
        />
        <CompanyRightMenu />
        <Wrapper>
          <ChattingLists userChatting={false} />
        </Wrapper>
        <WebFooter />
      </WebBody>
    );
  }
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
