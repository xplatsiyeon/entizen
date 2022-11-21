import styled from '@emotion/styled';
import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';
import Modal from 'components/Modal/Modal';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import colors from 'styles/colors';
import { HandleUserColor } from 'utils/changeValue';
import NoHistory from './noHistory';
import moment from 'moment';
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
interface Response {
  isSuccess: boolean;
  inProgressQuotationRequests: QuotationRequests[];
  historyQuotationRequests: HistoryQuotationRequests[];
}
const TAG = 'componets/mypage/request/estimate.tsx';
const Estimate = () => {
  const router = useRouter();

  // 내견적 목록 API
  const { data, isError, isLoading } = useQuery<Response>('user-mypage', () =>
    isTokenGetApi('/quotations/request'),
  );

  if (isError) {
    return <Modal text="다시 시도해주세요" click={() => router.push('/')} />;
  }

  if (isLoading) {
    return <Loader />;
  }
  // console.log(TAG + '⭐️ ~line 58 ~ 구매자 내견적 리스트 데이터 확인');
  // console.log(data);
  // 견적서가 없는 경우
  if (
    data?.inProgressQuotationRequests.length === 0 &&
    data?.historyQuotationRequests.length === 0
  ) {
    return <NoHistory />;
  }
  return (
    <Wrapper>
      {/* 진행중 */}
      {data?.inProgressQuotationRequests.length! > 0 && (
        <Proceeding>
          <Label>
            진행 중
            <span className="num">
              {data?.inProgressQuotationRequests.length}
            </span>
          </Label>
          <Carousel length={data?.inProgressQuotationRequests.length!}>
            {data?.inProgressQuotationRequests.map((data, index) => (
              <CarouselItem
                key={data?.quotationRequestIdx}
                onClick={() =>
                  // router.push(`/mypage/request/${data?.quotationRequestIdx}`)
                  router.push({
                    pathname: '/mypage/request',
                    query: {
                      quotationRequestIdx: data?.quotationRequestIdx,
                    },
                  })
                }
              >
                <Badge className="badge" color={HandleUserColor(data?.badge)}>
                  {data.badge}
                </Badge>
                <div className="store-name">{data?.installationAddress}</div>
                <span className="date">
                  {moment(data?.createdAt).format('YYYY.MM.DD')}
                </span>
              </CarouselItem>
            ))}
          </Carousel>
        </Proceeding>
      )}
      {/* 히스토리 */}
      {data?.historyQuotationRequests.length! > 0 && (
        <History>
          <Label>
            히스토리{' '}
            <span className="num">
              {data?.historyQuotationRequests.length!}
            </span>
          </Label>
          <Carousel length={data?.historyQuotationRequests?.length!}>
            {data?.historyQuotationRequests?.map((data, index) => (
              // 히스토리 부분 수정 필요
              <CarouselItem
                key={data.quotationRequestIdx}
                onClick={() =>
                  router.push(`/mypage/request/${data.quotationRequestIdx}`)
                }
              >
                <Badge className="badge" color={HandleUserColor(data.badge)}>
                  {data.badge}
                </Badge>
                <div className="store-name">{data.installationAddress}</div>
                <span className="date">
                  {moment(data.changedDate).format('YYYY.MM.DD')}
                </span>
              </CarouselItem>
            ))}
          </Carousel>
        </History>
      )}
    </Wrapper>
  );
};

export default Estimate;

const Wrapper = styled.div`
  padding-top: 21pt;
`;
const Label = styled.label`
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  padding-left: 15pt;
  color: ${colors.main2};
  .num {
    color: ${colors.main};
  }
`;
const Proceeding = styled.section`
  padding-top: 21pt;
`;
const History = styled.section``;
const Carousel = styled.div<{ length: number }>`
  display: grid;
  overflow-x: scroll;
  grid-template-columns: ${({ length }) => `repeat(${length}, 1fr)`};
  gap: 12pt;
  padding: 6pt 15pt 30pt 15pt;
`;
const CarouselItem = styled.div`
  width: 105pt;
  height: 135pt;
  padding-left: 9pt;
  padding-top: 9pt;
  border-radius: 6pt;
  background-color: ${colors.lightWhite};
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  position: relative;
  cursor: pointer;
  .store-name {
    padding-top: 16.5pt;
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .date {
    position: absolute;
    bottom: 9pt;
    right: 9pt;
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.lightGray3};
  }
`;
const Badge = styled.span<{ color: string }>`
  font-weight: 500;
  font-size: 9pt;
  line-height: 9pt;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  background: ${({ color }) => color};
  border-radius: 12pt;
  padding: 4.5pt 7.5pt;
`;
