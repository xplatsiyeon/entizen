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
export interface Response {
  isSuccess: boolean;
  inProgressQuotationRequests: QuotationRequests[];
  historyQuotationRequests: HistoryQuotationRequests[];
}
const TAG = 'componets/mypage/request/estimate.tsx';

type Props ={
  listUp? : boolean;
}

const Estimate = ({listUp}:Props) => {
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
  const handleRoute = (n:number)=>{
    //alert(n)
    router.push({
      pathname: '/mypage/request',
      query: {
        quotationRequestIdx: n
      },
    })
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
          <Carousel length={data?.inProgressQuotationRequests.length!} listUp={Boolean(listUp)}>
            {data?.inProgressQuotationRequests.map((data, index) => (
              <CarouselItem listUp={Boolean(listUp)}
                key={index}
                onClick={() => handleRoute(data.quotationRequestIdx)}
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
          <Carousel length={data?.historyQuotationRequests?.length!} listUp={Boolean(listUp)}>
            {data?.historyQuotationRequests?.map((data, index) => (
              // 히스토리 부분 수정 필요
              <CarouselItem listUp={Boolean(listUp)}
                key={index}
                onClick={() =>
                  router.push({
                    pathname: '/mypage/request',
                    query: {
                      quotationRequestIdx: data?.quotationRequestIdx,
                    },
                  })
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
  @media (min-width: 900pt) {
    padding-right: 5pt;
    padding-top: 0;
  }
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

  @media (min-width: 900pt) {
    font-size: 18pt;
    line-height: 15pt;
    padding-left: 4pt;
  }
`;
const Proceeding = styled.section`
  padding-top: 21pt;
  margin-bottom: 60pt;
  @media (min-width: 900pt) {
    padding-right: 5pt;
    padding-top: 0;
  }
`;
const History = styled.section``;

const Carousel = styled.div<{ length: number, listUp:boolean }>`
  display: grid;
  overflow-x: scroll;
  grid-template-columns: ${({ length }) => `repeat(${length}, 1fr)`};
  gap: 12pt;
  padding: 6pt 15pt 30pt 15pt;

  @media (min-width: 900pt) {
    display: ${({listUp})=> (listUp?'flex':'grid')};
    flex-direction: ${({listUp})=> (listUp?'column':'unset')};
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${({listUp})=> (listUp?'9pt':'22.5pt')};
    padding: 6pt 4pt 30pt;
    width: ${({listUp})=> (listUp?'100%':'580.5pt')};
    padding-right: 5pt;
    padding-top: 21pt;
  }
`;
const CarouselItem = styled.div<{listUp:boolean }>`
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
    padding-right: 15pt;
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
    display: ${({listUp})=> (listUp?'none':'block')};;
  }

  @media (min-width: 899.25pt) {
    width: 163.5pt;
    height: ${({listUp})=> (listUp?'auto':'99pt')};
    padding-left: 15pt;
    padding-top: 15pt;
    padding-bottom: ${({listUp})=> (listUp?'12pt':'0')};;
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
