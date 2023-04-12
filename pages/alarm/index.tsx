import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import colors from 'styles/colors';
import BackImg from 'public/images/back-btn.svg';
import Nut from 'public/images/Nut.svg';
import Bell from 'public/images/bell.svg';
import Loader from 'components/Loader';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import { CalcDate } from 'utils/calculatePackage';
import { subYears } from 'date-fns';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { alarmNumberSliceAction } from 'store/alarmNumberSlice';
import { useMediaQuery } from 'react-responsive';
import Notices from './Notices';

type NoticeListResponse = {
  isSuccess: boolean;
  data: {
    totalCount: number;
    notices: {
      createdAt: string;
      noticeIdx: number;
      title: string;
      content: string;
    }[];
  };
};

type HistoryAlertType = {
  isSuccess: boolean;
  data: {
    alertHistories: {
      alertHistoryIdx: number;
      title: string;
      body: string;
      link: string;
      createdAt: string;
    }[];
  };
};
const arr = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2,
  3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
const Alam = () => {
  const router = useRouter();
  const tabList: string[] = ['전체 알림', '공지사항'];
  const [tab, setTab] = useState<number>(0);
  const dispatch = useDispatch();
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  const [isScroll, setIsScroll] = useState(false);
  const [openSubLink, setOpenSubLink] = useState<boolean>(false);
  const [tabNumber, setTabNumber] = useState<number>(7);
  const loadRef = useRef(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const tabHandler = (num: number) => setTab(num);
  const onClicklist1 = () => {
    router.push('/alarm/1-2');
  };

  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);

  const { alarmNumberSlice } = useSelector(
    (state: RootState) => state.alarmNumberSliceState,
  );

  // /notices?page=1&limit=10
  // 공지사항 get api
  const {
    data: noticeList,
    isLoading: noticeIsLoading,
    isError: noticeIsError,
    refetch: noticeIsRefetch,
  } = useQuery<NoticeListResponse>('noticesList', () =>
    isTokenGetApi(`/notices?page=1&limit=10`),
  );

  // 전체 알림
  // /alerts/histories
  const {
    data: historyList,
    isLoading: historyIsLoading,
    isError: historyIsError,
    refetch: historyIsRefetch,
  } = useQuery<HistoryAlertType>('historyAlertList', () =>
    isTokenGetApi(`/alerts/histories`),
  );

  const [list, setList] = useState(noticeList?.data?.notices?.slice(0, 5));

  // 무한 스크롤
  const onIntersect = useCallback(
    async (entry: any, observer: any) => {
      if (entry[0].isIntersecting) {
        observer.unobserve(entry[0].target);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setList((list: any) =>
          list?.concat(
            noticeList?.data?.notices?.slice(list.length, list.length + 5),
          ),
        );
        observer.observe(entry[0].target);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [arr],
  );

  // useEffect(() => {
  //   setTab(Number(router.query.id));
  // }, [router]);

  useEffect(() => {
    setTab(alarmNumberSlice);
  }, [alarmNumberSlice]);

  // 무한 스크롤
  // useEffect(() => {
  //   if (
  //     loadRef.current &&
  //     !noticeIsLoading &&
  //     list?.length !== noticeList?.data?.totalCount
  //   ) {
  //     setIsScroll(true);
  //     observerRef.current = new IntersectionObserver(onIntersect, {
  //       threshold: 0.4,
  //     });
  //     if (isScroll) {
  //       observerRef.current.observe(loadRef.current);
  //     }
  //   }
  //   return () => {
  //     setIsScroll(false);
  //     observerRef.current && observerRef.current.disconnect();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [list, isScroll, noticeIsLoading, onIntersect]);

  // useEffect(() => {
  //   if (router.query.id) {
  //     const num = Number(router.query.id);
  //     setTab(num);
  //   }
  // }, [router.query.id]);

  // useEffect(() => {
  //   router.push('/alarm/1-3', {
  //     query: {
  //       noticesIdx: noticeIdx,
  //     },
  //   });
  // }, [noticeIdx]);

  console.log('tab🍎', tab);

  return (
    <WebBody>
      {memberType === 'COMPANY' ? (
        <WebBuyerHeader
          setOpenSubLink={setOpenSubLink}
          setTabNumber={setTabNumber}
          tabNumber={7}
          openSubLink={openSubLink}
        />
      ) : (
        <WebHeader />
      )}

      <Inner>
        <Wrapper>
          <Header>
            <div className="back-img" onClick={() => router.back()}>
              <Image
                style={{
                  cursor: 'pointer',
                  width: '18pt',
                  height: '18pt',
                }}
                src={BackImg}
                alt="btn"
              />
            </div>
            <span className="text">알림함</span>
            <div
              className="setting-img"
              onClick={() =>
                router.push({
                  pathname: '/setting',
                  query: {
                    id: 1,
                    direct: true,
                  },
                })
              }
            >
              <Image
                style={{
                  cursor: 'pointer',
                  width: '18pt',
                  height: '18pt',
                }}
                src={Nut}
                alt="nut"
              />
            </div>
          </Header>

          <Tab>
            {tabList.map((text, index) => (
              <Text
                tab={tab}
                idx={index}
                key={index}
                onClick={() => {
                  tabHandler(index);
                  dispatch(alarmNumberSliceAction.setalarmNumberSlice(index));
                }}
              >
                {text}
                {tab === index && <Line />}
              </Text>
            ))}
          </Tab>
          {/* 전체 알림 데이터 */}
          {tab === 0 && (
            <Main>
              {historyList?.data?.alertHistories?.map((item, index) => (
                <ContensBox key={index} cursor={false}>
                  <DisplayBox>
                    <DisplaySubBox>
                      <HistoryBodyText>{item?.body}</HistoryBodyText>
                      <p className="contents">{item.title}</p>
                    </DisplaySubBox>
                    <div className="period">{CalcDate(item?.createdAt)}</div>
                  </DisplayBox>

                  <div className="line"></div>
                </ContensBox>
              ))}
            </Main>
          )}
          {/*  공지사항 리스트 여기에 연결 */}
          {tab === 1 && (
            <Main>
              {noticeList?.data?.notices?.map((item, index) => (
                <ContensBox
                  cursor={true}
                  key={index}
                  onClick={() => {
                    router.push({
                      pathname: '/alarm/Notices',
                      query: {
                        noticesIdx: item?.noticeIdx,
                      },
                    });
                  }}
                >
                  <DisplayBox>
                    <p className="contents">{item?.title}</p>
                    <div className="period">{CalcDate(item?.createdAt)}</div>
                  </DisplayBox>
                  <div className="line"></div>
                </ContensBox>
              ))}
            </Main>
          )}

          <div ref={loadRef}>{isScroll && !noticeIsLoading && <Loader />}</div>
        </Wrapper>
      </Inner>
      <WebFooter />
    </WebBody>
  );
};

export default Alam;

const Buttons = styled.button`
  display: none;
`;
const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;
  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  width: 900pt;
  border-radius: 12pt;

  padding: 32.25pt 0 42pt;
  @media (min-width: 899.25pt) {
    padding-left: 127.5pt;
    padding-right: 127.5pt;
  }
  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    top: 0;
    left: 0%;
    transform: none;
    padding: 0;
    box-shadow: none;
    background: none;
    margin: 0;
  }
  @media (max-height: 500pt) {
    height: 100%;
  }
`;

const Wrapper = styled.div`
  padding-bottom: 20pt;
`;
const Header = styled(Box)`
  display: none;
  justify-content: center;
  align-items: center;
  height: 36pt;
  padding: 9pt 0;
  padding: 0 15pt;
  .back-img {
    position: absolute;
    left: 7pt;
    padding: 3.75pt;
  }
  .text {
    font-weight: 700;
    font-size: 12pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .setting-img {
    position: absolute;
    right: 7pt;
    padding: 3.75pt;
  }

  @media (max-width: 899.25pt) {
    display: flex;
  }
`;
const Tab = styled(Box)`
  display: flex;
  border-bottom: 0.75pt solid #f3f4f7;
  cursor: pointer;
  width: 100%;
  @media (min-width: 899.25pt) {
    justify-content: center;
  }
`;

// const Tab = styled.div`
//   display: flex;
//   border-bottom: 0.75pt solid #f3f4f7;
//   cursor: pointer;
//   @media (min-width: 899.25pt) {
//     justify-content: center;
//   }
// `;
const TextDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Text = styled.div<{ tab: number; idx: number }>`
  font-family: 'Spoqa Han Sans Neo';
  /* width: 30vw; */
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${({ tab, idx }) => (tab === idx ? colors.main : '#CACCD1')};
  padding: 12pt 0;
  position: relative;
  display: flex;
  justify-content: center;
  @media (max-width: 899.25pt) {
    width: 100%;
  }
  @media (min-width: 900pt) {
    /* width: 17.334%; */
    width: 24.19%;
  }
`;
const Line = styled.div`
  position: absolute;
  left: 15pt;
  right: 15pt;
  bottom: 0;
  border-bottom: 3pt solid ${colors.main};
  border-radius: 3.75pt;
`;
const Body = styled.div`
  padding-top: 132pt;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .text {
    padding-top: 12pt;
    font-weight: 500;
    font-size: 12pt;
    line-height: 12pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.lightGray2};
  }
`;
const Main = styled.div`
  padding-top: 30pt;
  /* cursor: pointer; */
`;
const ContensBox = styled(Box)<{ cursor: boolean }>`
  position: relative;
  padding-left: 15pt;
  margin-top: 12pt;

  ${({ cursor }) =>
    cursor &&
    css`
      cursor: pointer;
    `}

  .label {
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .contents {
    /* padding-top: 3pt; */
    font-weight: 500;
    font-size: 12pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .period {
    font-weight: 400;
    font-size: 9pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: #caccd1;
    padding-bottom: 12pt;
    padding-top: 6pt;
  }
  .line {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    border-bottom: 0.75pt solid ${colors.gray};
  }
`;

const DisplayBox = styled.div`
  @media (min-width: 899.25pt) {
    display: flex;
    justify-content: space-between;
  }
`;

const DisplaySubBox = styled.div`
  display: flex;
  gap: 42pt;
  @media (max-width: 900pt) {
    flex-direction: column;
    gap: 0;
  }
`;

const HistoryBodyText = styled.span`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #222222;
  @media (max-width: 899.25pt) {
    padding-bottom: 3pt;
  }
  @media (min-width: 900pt) {
    /* padding-right: 42pt; */
    /* padding-right: 20pt; */
    width: 225pt;
    /* margin-right: 42pt; */
  }
`;
