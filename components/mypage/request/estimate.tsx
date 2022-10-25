import styled from '@emotion/styled';
import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';
import Modal from 'components/Modal/Modal';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import colors from 'styles/colors';
import { HandleUserColor } from 'utils/changeValue';
import NoHistory from './noHistory';

interface Data {
  id: number;
  badge: string;
  storeName: string;
  date: string;
}
const tempProceeding: Data[] = [
  {
    id: 0,
    badge: '현장실사 예약 완료',
    storeName: 'LS카페 신림점',
    date: '2021.01.01',
  },
  {
    id: 1,
    badge: '낙찰대기 중',
    storeName: 'LS카페 신림점',
    date: '2021.05.10',
  },
  {
    id: 2,
    badge: '견적취소',
    storeName: 'LS카페 신림점',
    date: '2021.03.10',
  },
  {
    id: 3,
    badge: '견적마감 D-1',
    storeName: 'LS카페 신림점',
    date: '2021.07.23',
  },
];
const temphisTory: Data[] = [
  {
    id: 0,
    badge: '견적마감',
    storeName: 'LS카페 신림점',
    date: '2021.03.01',
  },
  {
    id: 1,
    badge: '낙찰대기 중',
    storeName: 'LS카페 신림점',
    date: '2021.06.10',
  },
  {
    id: 2,
    badge: '견적취소',
    storeName: 'LS카페 신림점',
    date: '2021.04.10',
  },
  {
    id: 3,
    badge: '견적취소',
    storeName: 'LS카페 신림점',
    date: '2021.04.10',
  },
  {
    id: 4,
    badge: '견적취소',
    storeName: 'LS카페 신림점',
    date: '2021.04.10',
  },
];
const TAG = 'componets/mypage/request/estimate.tsx';
const Estimate = () => {
  const router = useRouter();
  const { data, isError, isLoading } = useQuery('user-mypage', () =>
    isTokenGetApi('/quotations/request'),
  );

  console.log(TAG + '⭐️ ~line 82 ~react query data test');
  console.log(data);

  // 견적서가 없는 경우
  if (tempProceeding.length === 0 && temphisTory.length === 0) {
    return <NoHistory />;
  }

  if (isError) {
    return <Modal text="다시 시도해주세요" click={() => router.push('/')} />;
  }

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Wrapper>
      {/* 진행중 */}
      {tempProceeding.length > 0 && (
        <Proceeding>
          <Label>
            진행 중 <span className="num">{tempProceeding.length}</span>
          </Label>
          <Carousel length={tempProceeding.length}>
            {tempProceeding.map((data, index) => (
              <CarouselItem
                key={data.id}
                onClick={() => router.push('/mypage/request/1-3')}
              >
                <Badge className="badge" color={HandleUserColor(data.badge)}>
                  {data.badge}
                </Badge>
                <div className="store-name">{data.storeName}</div>
                <span className="date">{data.date}</span>
              </CarouselItem>
            ))}
          </Carousel>
        </Proceeding>
      )}
      {/* 히스토리 */}
      {temphisTory.length > 0 && (
        <History>
          <Label>
            히스토리 <span className="num">{temphisTory.length}</span>
          </Label>
          <Carousel length={temphisTory.length}>
            {temphisTory.map((data, index) => (
              <CarouselItem
                key={data.id}
                onClick={() => router.push('/mypage/request/1-3')}
              >
                <Badge className="badge" color={HandleUserColor(data.badge)}>
                  {data.badge}
                </Badge>
                <div className="store-name">{data.storeName}</div>
                <span className="date">{data.date}</span>
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
