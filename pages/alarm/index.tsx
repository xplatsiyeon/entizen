import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import colors from 'styles/colors';
import BackImg from 'public/images/back-btn.svg';
import Nut from 'public/images/Nut.svg';
import Loader from 'components/Loader';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { isTokenGetApi, isTokenPatchApi } from 'api';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import { CalcDate } from 'utils/calculatePackage';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { alarmNumberSliceAction } from 'store/alarmNumberSlice';
import AlarmDetail from 'components/alarmDetail';
import { HistoryAlertTypeV1, HistoryAlertTypeV1Response } from 'types/alarm';
import { AxiosError } from 'axios';

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

const Alam = () => {
  const router = useRouter();
  const tabList: string[] = ['전체 알림', '공지사항'];
  const [tab, setTab] = useState<number>(0);
  const dispatch = useDispatch();

  const [isScroll, setIsScroll] = useState(false);
  const [openSubLink, setOpenSubLink] = useState<boolean>(false);
  const [tabNumber, setTabNumber] = useState<number>(7);
  const loadRef = useRef(null);
  const tabHandler = (num: number) => setTab(num);

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

  // 전체 알림 - '/v1/alerts/histories'
  const {
    data: historyList,
    isLoading: historyIsLoading,
    isError: historyIsError,
    refetch: historyIsRefetch,
  } = useQuery<HistoryAlertTypeV1Response, AxiosError, HistoryAlertTypeV1[]>(
    '/v1/alerts/histories',
    () => isTokenGetApi(`/v1/alerts/histories`),
    {
      select(data) {
        return data.data.alertHistories;
      },
    },
  );

  const { mutate, isLoading, isError } = useMutation(isTokenPatchApi, {
    onSuccess(data, variables, context) {},
    onError(error, variables, context) {
      console.log('🔥 알림 읽음 처리 error 발생 ~92 : ', error);
    },
  });

  const onClickRouter = async (item: HistoryAlertTypeV1) => {
    await mutate({
      url: `/v1/alerts/histories/${item.alertHistoryIdx}`,
    });
    // 수정 필요
    const newLink = item.link.replace('https://test-api.entizen.kr', '');
    router.replace(newLink);
  };

  // const [list, setList] = useState(noticeList?.data?.notices?.slice(0, 5));

  // // 무한 스크롤
  // const onIntersect = useCallback(
  //   async (entry: any, observer: any) => {
  //     if (entry[0].isIntersecting) {
  //       observer.unobserve(entry[0].target);
  //       await new Promise((resolve) => setTimeout(resolve, 500));
  //       setList((list: any) =>
  //         list?.concat(
  //           noticeList?.data?.notices?.slice(list.length, list.length + 5),
  //         ),
  //       );
  //       observer.observe(entry[0].target);
  //     }
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [arr],
  // );

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

  useEffect(() => {
    setTab(alarmNumberSlice);
  }, [alarmNumberSlice]);

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
          {/* 헤더 */}
          <Header>
            <div className="back-img" onClick={() => router.replace('/')}>
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
          {/* 탭 */}
          <Tab>
            {tabList.map((text, index) => (
              <Text
                tab={tab}
                idx={index}
                key={index}
                onClick={() => {
                  router.push('/alarm');
                  tabHandler(index);
                  dispatch(alarmNumberSliceAction.setalarmNumberSlice(index));
                }}
              >
                {text}
                {tab === index && <Line />}
              </Text>
            ))}
          </Tab>
          {/* 공지사항 디테일 */}
          {router.query.noticesIdx ? (
            <AlarmDetail />
          ) : (
            <>
              {/* 전체 알림 데이터 */}
              {tab === 0 && (
                <Main>
                  {historyList?.map((item, index) => (
                    <ContensBox
                      key={index}
                      cursor={false}
                      wasRead={item?.wasRead}
                      onClick={() => onClickRouter(item)}
                    >
                      <DisplayBox>
                        <DisplaySubBox>
                          <p className="address">{item?.body}</p>
                          <p className="contents">{item.title}</p>
                        </DisplaySubBox>
                        <div className="period">
                          {CalcDate(item?.createdAt)}
                        </div>
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
                      wasRead={false}
                      cursor={true}
                      key={index}
                      onClick={() => {
                        router.push({
                          pathname: '/alarm',
                          query: {
                            noticesIdx: item?.noticeIdx,
                          },
                        });
                      }}
                    >
                      <DisplayBox>
                        <p className="contents">{item?.title}</p>
                        <div className="period">
                          {CalcDate(item?.createdAt)}
                        </div>
                      </DisplayBox>
                      <div className="line"></div>
                    </ContensBox>
                  ))}
                </Main>
              )}
            </>
          )}

          {/* 무한 스크롤 옵저버 감지 태그 */}
          <div ref={loadRef}>{isScroll && !noticeIsLoading && <Loader />}</div>
        </Wrapper>
      </Inner>
      <WebFooter />
    </WebBody>
  );
};

export default Alam;

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

const Main = styled.div`
  padding-top: 30pt;
  /* cursor: pointer; */
`;
const ContensBox = styled.div<{ cursor: boolean; wasRead: boolean }>`
  position: relative;
  padding-left: 15pt;
  margin-top: 12pt;
  cursor: pointer;

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
  .address {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: ${({ wasRead }) => (wasRead === true ? '400' : '500')};
    color: ${({ wasRead }) => (wasRead === true ? colors.gray6 : colors.main2)};
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;
    @media (max-width: 899.25pt) {
      padding-bottom: 3pt;
    }
    @media (min-width: 900pt) {
      width: 225pt;
    }
  }
  .contents {
    font-weight: ${({ wasRead }) => (wasRead === true ? '400' : '500')};
    color: ${({ wasRead }) => (wasRead === true ? colors.gray6 : colors.main2)};
    font-size: 12pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
  }
  .period {
    font-weight: 400;
    color: ${({ wasRead }) => (wasRead === true ? colors.gray6 : colors.main2)};
    font-size: 9pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
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
