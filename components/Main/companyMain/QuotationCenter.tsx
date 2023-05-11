import styled from '@emotion/styled';
import Image from 'next/image';
import lightning from 'public/images/lightning.png';
import clipboardText from 'public/images/ClipboardText.png';
import emptyClipboardText from 'public/images/EmptyClipboardText.png';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import { isTokenGetApi } from 'api';
import { useQuery } from 'react-query';
import Loader from 'components/Loader';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { Alerts, AlertsResponse } from 'types/alerts';
import { AxiosError } from 'axios';

export interface RecivedCountResponse {
  isSuccess: boolean;
  receivedQuotationRequestCount: number;
}

type Props = {};

const QuotationCenter = ({}: Props) => {
  const router = useRouter();
  const userID = sessionStorage?.getItem('USER_ID')!;
  const [total, setTotal] = useState(18);

  // 알람 조회
  // v1/alerts/unread-points
  const {
    data: historyUnread,
    isLoading: historyIsLoading,
    isError: historyIsError,
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

  useEffect(() => {
    if (historyUnread) {
      if (historyUnread?.unreadQuotationRequestsCount < 10) {
        setTotal(18);
      } else if (
        historyUnread?.unreadQuotationRequestsCount > 9 &&
        historyUnread?.unreadQuotationRequestsCount < 100
      ) {
        setTotal(21);
      } else if (historyUnread?.unreadQuotationRequestsCount > 99) {
        setTotal(23);
      } else {
        setTotal(18);
      }
    }
  }, [historyUnread]);

  // newReceived?.receivedQuotationRequests.length! > 300? '300+': newReceived?.receivedQuotationRequests.length!
  if (historyIsError) {
    alert('잠시 후 다시 시도해주세요.');
    router.push('/404');
  }
  if (historyIsLoading) {
    return <Loader />;
  }
  return (
    <Wrapper>
      <ImgBox>
        <Image src={lightning} alt="lightning" />
      </ImgBox>

      {historyUnread?.unreadQuotationRequestsCount === 0 ? (
        <TopImgBox>
          <Image src={emptyClipboardText} alt="emptyClipboardText" />
        </TopImgBox>
      ) : (
        <TopImgBox>
          <CountCircle
            total={total}
            length={historyUnread?.unreadQuotationRequestsCount!}
          >
            {historyUnread?.unreadQuotationRequestsCount! > 300
              ? '300+'
              : historyUnread?.unreadQuotationRequestsCount}
          </CountCircle>
          <BlueIcon>
            <Image src={clipboardText} alt="clipboardText" />
          </BlueIcon>
        </TopImgBox>
      )}
      {historyUnread?.unreadQuotationRequestsCount! >= 1 ? (
        <>
          <Reqeusts>
            {historyUnread?.unreadQuotationRequestsCount}건의 견적 요청이
            있습니다!
          </Reqeusts>
          <RequestInfo>
            요청서를 확인하고 가견적서를 작성해
            <br />
            고객에게 제안해보세요!
          </RequestInfo>
        </>
      ) : (
        <>
          <NoReqeusts>아직 도착한 견적 요청이 없어요</NoReqeusts>
          <WhenNoRequest>조금만 더 기다려볼까요?</WhenNoRequest>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin-top: 39pt;
  @media (min-width: 900pt) {
    margin-top: 60pt;
  }
`;
const ImgBox = styled.div`
  position: absolute;
  z-index: -5;
  left: 50%;
  width: 143.25pt;
  height: 181.5pt;
  transform: translateX(-50%);
`;

const TopImgBox = styled.div`
  width: 45pt;
  height: 45pt;
  position: relative;
  margin: 0 auto;
`;
const BlueIcon = styled.div`
  & span {
    z-index: -1 !important;
  }
`;

const CountCircle = styled.span<{ length: number | string; total: number }>`
  font-family: 'Spoqa Han Sans Neo';
  position: absolute;
  ${({ length }) =>
    (length > 10 || length === '300+') &&
    css`
      left: 23pt;
    `};
  ${({ length }) =>
    length < 10 &&
    css`
      right: 0;
    `};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: 0em;
  text-align: center;
  padding: 4px;
  min-width: 18pt;
  /* width: ${({ total }) => total && `${total}pt`}; */
  /* width: ${({ length }) =>
    length > 10 || length === '300+' ? '65%' : '18pt'}; */
  height: 18pt;
  background-color: ${colors.main};
  color: #ffffff;
  border-radius: ${({ length }) => (length < 10 ? '50%' : '16pt')};
  z-index: 100 !important;
`;

const Reqeusts = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 15pt;
  font-weight: 700;
  margin-top: 21pt;
  line-height: 15pt;
  letter-spacing: 0em;
  text-align: center;
  color: ${colors.main};
`;

const WhenNoRequest = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 400;
  line-height: 18pt;
  letter-spacing: 0em;
  text-align: center;
  color: #747780;
  margin-top: 12pt;
`;

const NoReqeusts = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 15pt;
  font-weight: 700;
  margin-top: 21pt;
  line-height: 15pt;
  letter-spacing: 0em;
  text-align: center;
  color: #747780;
`;

const RequestInfo = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  margin-top: 12pt;
  font-size: 12pt;
  font-weight: 400;
  line-height: 18pt;
  letter-spacing: 0em;
  text-align: center;
  color: #747780;
`;

export default QuotationCenter;
