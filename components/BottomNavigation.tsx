import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import chatting from 'public/navigation/chatting-icon.png';
import chattingOn from 'public/navigation/chatting-on-icon.png';
import home from 'public/navigation/home-icon.png';
import homeOn from 'public/navigation/home-on-icon.png';
import estimate from 'public/navigation/estimate-icon.png';
import guide from 'public/navigation/guide-icon.png';
import guideOn from 'public/navigation/guide-on-icon.png';
import mypage from 'public/navigation/mypage-icon.png';
import selectedAs from 'public/images/selectedAs.png';
import selectedMyquotation from 'public/images/selectedMyquotation.png';
import unselectedAs from 'public/images/unselectedAs.png';
import unSelectedMyquotation from 'public/images/unselectedMyQuotation.png';
import mypageOn from 'public/navigation/mypage-on-icon.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import colors from 'styles/colors';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import { ReceivedRequest } from 'pages/company/quotation';
import { Alerts, AlertsResponse } from 'types/alerts';
import { AxiosError } from 'axios';

type Props = {};
const BottomNavigation = ({}: Props) => {
  const router = useRouter();
  const userID = sessionStorage?.getItem('USER_ID')!;
  const memberType = JSON.parse(sessionStorage?.getItem('MEMBER_TYPE')!);
  const { pathname } = router;
  const [tabNumber, setTabNumber] = useState(0);

  const { data, isLoading, isError, error } = useQuery<ReceivedRequest>(
    'count',
    () => isTokenGetApi('/quotations/received-request?keyword=&sort=deadline'),
    {
      staleTime: 5000,
      cacheTime: Infinity,
      enabled: memberType === 'COMPANY',
    },
  );

  // 알람 조회
  // v1/alerts/unread-points
  const {
    data: historyUnread,
    isLoading: historyIsLoading,
    isError: historyIIsError,
    refetch: historyIsRefetch,
    // } = useQuery<GetUnread>(
  } = useQuery<AlertsResponse, AxiosError, Alerts>(
    'v1/alerts',
    () => isTokenGetApi(`/v1/alerts/unread-points`),
    {
      enabled: userID !== null ? true : false,
      select(data) {
        return data.data;
      },
    },
  );

  if (isError) {
    // console.log(TAG + '~line 43 ~에러 발생 콘솔');
    // console.log(error);
  }

  useEffect(() => {
    // console.log(router.pathname);
    if (memberType === 'COMPANY') {
      switch (pathname) {
        case '/':
          return setTabNumber(0);
        case '/company/quotation':
          return setTabNumber(1);
        case '/company/chatting':
          return setTabNumber(2);
        case '/company/as':
          return setTabNumber(3);
        case '/company/mypage':
          return setTabNumber(4);
        default:
          break;
      }
    } else {
      switch (pathname) {
        case '/':
          return setTabNumber(0);
        case '/guide':
          return setTabNumber(1);
        case '/estimate':
          return setTabNumber(2);
        case '/chatting':
          return setTabNumber(3);
        case '/mypage':
          return setTabNumber(4);
        default:
          break;
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabNumber]);

  // console.log(
  //   '🔥 unreadChatLogsCount : ',
  //   historyUnread?.data.unreadChatLogsCount,
  // );
  return (
    <Wrapper>
      {/* 판매자 */}
      {memberType === 'COMPANY' ? (
        <>
          <BoxBg>
            <div
              className="img-wrapper"
              onClick={() => {
                router.push('/');
              }}
            >
              <ImgBox>
                <Image
                  src={tabNumber === 0 ? homeOn : home}
                  alt="home"
                  layout="fill"
                />
              </ImgBox>
              <H3 clicked={tabNumber === 0 ? true : false}>홈</H3>
            </div>
            <div
              className="img-wrapper"
              onClick={() => {
                router.push('/company/quotation');
              }}
            >
              {data?.data?.receivedQuotationRequests?.length! === 0 && (
                <ImgBox>
                  <Image
                    src={
                      tabNumber === 1
                        ? selectedMyquotation
                        : unSelectedMyquotation
                    }
                    alt="guide"
                    layout="fill"
                  />
                </ImgBox>
              )}
              {data?.data?.receivedQuotationRequests?.length! > 0 && (
                <ImgBox>
                  <Image
                    src={
                      tabNumber === 1
                        ? selectedMyquotation
                        : unSelectedMyquotation
                    }
                    alt="guide"
                    layout="fill"
                  />
                </ImgBox>
              )}
              <H3 clicked={tabNumber === 1 ? true : false}>내 견적</H3>
              {/* 카운트 체크 */}
              {historyUnread?.unreadQuotationRequestsCount !== undefined && (
                <Count
                  length={
                    historyUnread?.unreadQuotationRequestsCount?.toString()
                      .length
                  }
                >
                  {historyUnread?.unreadQuotationRequestsCount}
                </Count>
              )}
            </div>

            {/* 소통하기 */}
            <div
              className="img-wrapper"
              onClick={() => {
                userID
                  ? router.push('/company/chatting')
                  : router.push('/signin');
              }}
            >
              {historyUnread?.unreadChatLogsCount !== undefined && (
                <ImgBox>
                  <Image
                    src={tabNumber === 2 ? chattingOn : chatting}
                    alt="chatting"
                    layout="fill"
                  />
                </ImgBox>
              )}
              <H3 clicked={false}>소통하기</H3>
              {/* 카운트 체크 */}
              {historyUnread?.unreadChatLogsCount !== undefined && (
                <Count
                  length={historyUnread?.unreadChatLogsCount?.toString().length}
                >
                  {historyUnread?.unreadChatLogsCount}
                </Count>
              )}
            </div>
            {/* AS */}
            <div
              className="img-wrapper"
              onClick={() => {
                userID
                  ? router.push({
                      pathname: '/company/as',
                      query: { id: 0 },
                    })
                  : router.push('/signin');
              }}
            >
              <ImgBox>
                <Image
                  src={tabNumber === 3 ? selectedAs : unselectedAs}
                  alt="chatting"
                  layout="fill"
                />
              </ImgBox>
              <H3 clicked={tabNumber === 3 ? true : false}>A/S</H3>
            </div>
            <div
              className="img-wrapper"
              onClick={() => {
                userID
                  ? router.push({
                      pathname: '/company/mypage',
                      query: { id: 0 },
                    })
                  : router.push('/signin');
              }}
            >
              {/* 내프로젝트 */}
              <ImgBox>
                <Image
                  src={tabNumber === 4 ? mypageOn : mypage}
                  alt="mypage"
                  layout="fill"
                />
              </ImgBox>
              <H3 clicked={tabNumber === 4 ? true : false}>내 프로젝트</H3>
            </div>
          </BoxBg>
        </>
      ) : (
        // 구매자
        <>
          <BoxBg>
            <div
              className="img-wrapper"
              onClick={() => {
                router.push('/');
              }}
            >
              <ImgBox>
                <Image
                  src={tabNumber === 0 ? homeOn : home}
                  alt="home"
                  layout="fill"
                />
              </ImgBox>
              <H3 clicked={tabNumber === 0 ? true : false}>홈</H3>
            </div>
            <div
              className="img-wrapper"
              onClick={() => {
                router.push('/guide');
              }}
            >
              <ImgBox>
                <Image
                  src={tabNumber === 1 ? guideOn : guide}
                  alt="guide"
                  layout="fill"
                />
              </ImgBox>
              <H3 clicked={tabNumber === 1 ? true : false}>가이드</H3>
            </div>
            <div
              className="img-wrapper"
              onClick={() => {
                userID
                  ? router.push('/quotation/request')
                  : router.push('/signin');
              }}
            >
              <Image src={estimate} alt="estimate" width={32} height={32} />
              <H3 clicked={false}>간편견적</H3>
            </div>
            <div
              className="img-wrapper"
              onClick={() => {
                userID ? router.push('/chatting') : router.push('/signin');
              }}
            >
              <ImgBox>
                <Image
                  src={tabNumber === 3 ? chattingOn : chatting}
                  alt="chatting"
                  layout="fill"
                />
              </ImgBox>
              <H3 clicked={tabNumber === 3 ? true : false}>소통하기</H3>
              {/* 카운트 체크 */}
              {historyUnread?.unreadChatLogsCount !== undefined && (
                <Count
                  length={historyUnread?.unreadChatLogsCount?.toString().length}
                >
                  {historyUnread?.unreadChatLogsCount}
                </Count>
              )}
            </div>
            <div
              className="img-wrapper"
              onClick={() => {
                userID ? router.push('/mypage') : router.push('/signin');
              }}
            >
              <ImgBox>
                <Image
                  src={tabNumber === 4 ? mypageOn : mypage}
                  alt="mypage"
                  layout="fill"
                />
              </ImgBox>
              <H3 clicked={tabNumber === 4 ? true : false}>마이페이지</H3>
            </div>
          </BoxBg>
        </>
      )}
    </Wrapper>
  );
};

export default BottomNavigation;

const Wrapper = styled.div`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  background: ${colors.lightWhite};
  box-shadow: 3pt 0px 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 0px;
  width: 100%;
  z-index: 999;
  .img-wrapper {
    cursor: pointer;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 3pt;
    position: relative;
    /* border: 1px solid red; */
  }
  @media (max-width: 899.25pt) {
    display: block;
  }
`;

const Count = styled.div<{ length: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: ${({ length }) =>
    length === 1 ? '0' : length === 2 ? '-5pt' : '-7pt'};
  top: -5pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 6pt;
  line-height: 6pt;
  color: ${colors.lightWhite};
  background-color: ${colors.main1};
  min-width: 10.5pt;
  min-height: 10.5pt;
  border-radius: 50px;
  text-align: right;
  padding: 2.25pt 3.375pt;
`;

const BoxBg = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15pt;
  padding-right: 15pt;
  height: 66pt;
`;
const ImgBox = styled.div`
  position: relative;
  height: 24pt;
  width: 24pt;
`;
const H3 = styled.h3<{ clicked: boolean }>`
  font-weight: 500;
  font-size: 7.5pt;
  line-height: 9pt;
  letter-spacing: -0.02em;
  color: ${({ clicked }) => (clicked ? colors.main2 : '#A6A9B0')};
`;
