import styled from '@emotion/styled';
import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';
import Modal from 'components/Modal/Modal';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from 'react-query';
import colors from 'styles/colors';
import { HandleUserColor } from 'utils/changeValue';
import NoHistory from './noHistory';
import moment from 'moment';
import PaginationCompo from 'components/PaginationCompo';
import { useEffect, useState } from 'react';
import {
  InProgressQuotationRequestsResponse,
  QuotationRequestHistoriesResponse,
} from 'types/quotation';
import { useMediaQuery } from 'react-responsive';

interface QuotationRequests {
  createdAt: string;
  quotationRequestIdx: number;
  quotationStatus: string;
  changedDate: string;
  subscribeProduct: string;
  investRate: string;
  subscribePeriod: number;
  installationAddress: string;
  installationLocation: string;
  installationPurpose: string;
  expiredAt: string;
  etcRequest: string;
  memberIdx: number;
  badge: string;
}
interface HistoryQuotationRequests {
  createdAt: string;
  quotationRequestIdx: number;
  quotationStatus: string;
  changedDate: string;
  subscribeProduct: string;
  investRate: string;
  subscribePeriod: number;
  installationAddress: string;
  installationLocation: string;
  installationPurpose: string;
  expiredAt: string;
  etcRequest: string;
  currentInProgressPreQuotationIdx: boolean;
  memberIdx: number;
  badge: string;
}
export interface Response {
  isSuccess: boolean;
  inProgressQuotationRequests: QuotationRequests[];
  historyQuotationRequests: HistoryQuotationRequests[];
}
type Props = {
  listUp?: boolean;
  isSubMenu: boolean;
};

const Estimate = ({ listUp, isSubMenu }: Props) => {
  const [inProgressPage, setInProgressPage] = useState(1);
  const [historyPage, setHistoryPage] = useState(1);

  const queryClient = useQueryClient();
  // const quotationRequests = queryClient.getQueryData('v1/quotation-requests');
  // const preQuotations = queryClient.getQueryData('v1/pre-quotations');

  const router = useRouter();
  const desktop = useMediaQuery({
    query: '(min-width:900pt)',
  });
  const limit = desktop ? 20 : 100000000;

  // 진행 중인 리스트
  const {
    data: inProgressData,
    isError: inProgressError,
    isLoading: inProgressLoading,
    refetch: inProgressRefetch,
  } = useQuery<InProgressQuotationRequestsResponse>(
    'v1/quotation-requests/in-progress',
    () =>
      isTokenGetApi(
        `v1/quotation-requests/in-progress?limit=${limit}&page=${inProgressPage}`,
      ),
  );
  // 히스토리 리스트
  const {
    data: historyData,
    isError: historyError,
    isLoading: historyLoading,
    refetch: historyRefetch,
  } = useQuery<QuotationRequestHistoriesResponse>(
    'v1/quotation-requests/histories',
    () =>
      isTokenGetApi(
        `v1/quotation-requests/histories?limit=${20}&page=${historyPage}`,
      ),
  );

  // console.log(TAG + '⭐️ ~line 58 ~ 구매자 내견적 리스트 데이터 확인');
  // console.log(data);
  // 견적서가 없는 경우

  interface routerData {
    quotationRequestIdx: number;
    history?: boolean;
  }

  const handleRoute = async (idx: number, isHistory?: boolean) => {
    let date: routerData = {
      quotationRequestIdx: idx,
      history: isHistory,
    };
    if (!isHistory) {
      date = {
        quotationRequestIdx: idx,
      };
    }

    //alert(n)
    await router.push({
      pathname: '/mypage/request',
      query: { ...date },
    });

    console.log('idx : ', idx);
  };

  // 진행 중인 간편견적 리스트 조회
  useEffect(() => {
    inProgressRefetch();
  }, [inProgressPage]);
  // 간편견적 히스토리 리스트 조회
  useEffect(() => {
    historyRefetch();
  }, [historyPage]);

  useEffect(() => {
    console.log('실행');
    if (router.isReady) {
      console.log(router.query);

      // queryClient.refetchQueries('v1/quotation-requests');
      // queryClient.refetchQueries('v1/pre-quotations');
    }
  }, [router]);

  if (inProgressError || historyError) {
    return <Modal text="다시 시도해주세요" click={() => router.push('/')} />;
  }

  if (inProgressLoading || historyLoading) {
    return <Loader />;
  }
  if (
    inProgressData?.data.inProgressQuotationRequests?.length === 0 &&
    historyData?.data?.quotationRequestHistories?.length === 0
  ) {
    return <NoHistory type="quotation" />;
  }
  return (
    <Wrapper>
      {/* 진행중 */}
      {inProgressData?.data.inProgressQuotationRequests.length! > 0 && (
        <Proceeding listUp={listUp}>
          <Label listUp={listUp}>
            진행 중&nbsp;&nbsp;
            <span className="num">{inProgressData?.data.totalCount}</span>
          </Label>
          <Carousel
            length={inProgressData?.data.inProgressQuotationRequests.length!}
            listUp={Boolean(listUp)}
          >
            {inProgressData?.data.inProgressQuotationRequests.map(
              (item, index) => (
                <CarouselItem
                  listUp={Boolean(listUp)}
                  key={index}
                  onClick={() => handleRoute(item.quotationRequestIdx)}
                >
                  <Badge className="badge" color={HandleUserColor(item?.badge)}>
                    {item.badge}
                  </Badge>
                  <div className="store-name">{item?.installationAddress}</div>
                  <span className="date">
                    {moment(item?.createdAt).format('YYYY.MM.DD')}
                  </span>
                </CarouselItem>
              ),
            )}
          </Carousel>
          {!isSubMenu && desktop && (
            <PaginationCompo
              setPage={setInProgressPage}
              page={inProgressPage}
              list={inProgressData?.data.inProgressQuotationRequests!}
              limit={20}
              total={inProgressData?.data?.totalCount!}
            />
          )}
        </Proceeding>
      )}

      {/* 히스토리 */}
      {historyData?.data.quotationRequestHistories.length! > 0 && (
        <History listUp={Boolean(listUp)}>
          <Label>
            히스토리&nbsp;&nbsp;
            <span className="num">{historyData?.data.totalCount}</span>
          </Label>
          <Carousel
            length={historyData?.data.quotationRequestHistories?.length!}
            listUp={Boolean(listUp)}
          >
            {historyData?.data.quotationRequestHistories?.map((item, index) => (
              // 히스토리 부분 수정 필요
              <CarouselItem
                listUp={Boolean(listUp)}
                key={index}
                onClick={() => handleRoute(item?.quotationRequestIdx, true)}
              >
                <Badge className="badge" color={HandleUserColor(item.badge)}>
                  {item.badge}
                </Badge>
                <div className="store-name">{item.installationAddress}</div>
                <span className="date">
                  {moment(item.changedDate).format('YYYY.MM.DD')}
                </span>
              </CarouselItem>
            ))}
          </Carousel>
          {!isSubMenu && desktop && (
            <PaginationCompo
              setPage={setHistoryPage}
              page={historyPage}
              list={historyData?.data.quotationRequestHistories!}
              limit={20}
              total={historyData?.data.totalCount!}
            />
          )}
        </History>
      )}
    </Wrapper>
  );
};

export default Estimate;

const Wrapper = styled.div`
  padding-top: 21pt;
  @media (min-width: 900pt) {
    //padding-right: 5pt;
    padding-top: 0;
  }
`;
const Label = styled.label<{ listUp?: boolean }>`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  padding-left: 15pt;
  color: ${colors.main2};
  .num {
    font-family: 'Spoqa Han Sans Neo';
    color: ${colors.main};
  }

  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: ${({ listUp }) => (Boolean(listUp) ? '12pt' : '18pt')};
    line-height: 15pt;
    padding-left: 4pt;
  }
`;
const Proceeding = styled.section<{ listUp?: boolean }>`
  padding-top: 21pt;
  margin-bottom: 0;
  @media (min-width: 900pt) {
    padding-top: 0;
    margin-bottom: ${({ listUp }) => (Boolean(listUp) ? '18pt' : '60pt')};
    margin-top: ${({ listUp }) => (Boolean(listUp) ? '6pt' : 'none')};
  }
`;
const History = styled.section<{ listUp: boolean }>`
  display: ${({ listUp }) => (listUp ? 'none' : 'block')};
`;

const Carousel = styled.div<{ length: number; listUp: boolean }>`
  display: grid;
  overflow-x: scroll;
  grid-template-columns: ${({ length }) => `repeat(${length}, 1fr)`};
  gap: 12pt;
  padding: 6pt 15pt 30pt 15pt;

  @media (min-width: 900pt) {
    display: ${({ listUp }) => (listUp ? 'flex' : 'grid')};
    flex-direction: ${({ listUp }) => (listUp ? 'column' : 'unset')};
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${({ listUp }) => (listUp ? '9pt' : '22.5pt')};
    padding: ${({ listUp }) => (listUp ? '6pt 4pt 10pt' : '6pt 2pt 60pt')};
    /* width: ${({ listUp }) => (listUp ? '100%' : '580.5pt')}; */
    width: 100%;
    //padding-right: 5pt;
    padding-top: ${({ listUp }) => (Boolean(listUp) ? '9pt' : '21pt')};
  }
`;
const CarouselItem = styled.div<{ listUp: boolean }>`
  /* width: 105pt;
  height: 135pt; */
  width: 140px;
  height: 180px;
  padding-left: 9pt;
  /* padding-top: 9pt; */
  padding-top: 11pt;
  border-radius: 6pt;
  background-color: ${colors.lightWhite};
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
  position: relative;
  cursor: pointer;

  .store-name {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 700;
    line-height: 18pt;
    text-align: left;
    width: 116px;
    padding-top: 14.5pt;
    /* padding-right: 15pt; */
    letter-spacing: -0.02em;
    color: ${colors.main2};
    text-overflow: ellipsis;
    word-break: break-word;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2; // 원하는 라인수
    -webkit-box-orient: vertical;
  }
  .date {
    position: absolute;
    /* bottom: 9pt; */
    bottom: 8pt;
    right: 13pt;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.lightGray3};
    display: ${({ listUp }) => (listUp ? 'none' : 'block')};
  }

  @media (min-width: 900pt) {
    /* width: 163.5pt; */
    border-radius: 12pt;
    width: ${({ listUp }) => (listUp ? '190pt' : '178.5pt')};
    /* height: ${({ listUp }) => (listUp ? 'auto' : '99pt')}; */
    height: ${({ listUp }) => (listUp ? 'auto' : '114pt')};
    /* padding-left: 15pt; */
    padding-left: 12.75pt;
    padding-top: 16.5pt;
    padding-bottom: ${({ listUp }) => (listUp ? '12pt' : '0')};
    .store-name {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 13.5pt;
      font-weight: 700;
      line-height: 18pt;
      text-align: left;
      width: 150pt;
      padding-top: 16.5pt;
      /* padding-right: 15pt; */
      letter-spacing: -0.02em;
      color: ${colors.main2};
      text-overflow: ellipsis;
      overflow: hidden;
      /* display: -webkit-box; */
      -webkit-line-clamp: 1; // 원하는 라인수
      -webkit-box-orient: vertical;
    }
    .date {
      position: absolute;
      /* bottom: 9pt; */
      bottom: 15pt;
      right: 18pt;
      font-weight: 500;
      font-size: 10.5pt;
      line-height: 12pt;
      letter-spacing: -0.02em;
      color: ${colors.lightGray3};
      display: ${({ listUp }) => (listUp ? 'none' : 'block')};
    }
  }
`;
const Badge = styled.span<{ color: string }>`
  // position: absolute;
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 10.5pt !important;
  line-height: 9pt !important;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  background: ${({ color }) => color};
  border-radius: 12pt !important;
  padding: 4.5pt 7.5pt !important;
  @media (max-width: 899.25pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 9pt !important;
    font-weight: 500;
    line-height: 9pt !important;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
