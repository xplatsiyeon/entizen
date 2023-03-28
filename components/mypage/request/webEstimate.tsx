import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import colors from 'styles/colors';
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

const WebEstimate = () => {
  const route = useRouter();
  const HandleColor = (badge: string): string => {
    if (badge.includes('마감')) return '#F75015';
    else if (badge.includes('대기 중')) return '#FFC043';
    else if (badge.includes('취소')) return '#CACCD1';
    else return '#5A2DC9';
  };

  // 견적서가 없는 경우
  if (tempProceeding.length === 0 && temphisTory.length === 0) {
    return <NoHistory />;
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
                onClick={() => {
                  route.push('/mypage/request/1-3');
                }}
              >
                <Badge className="badge" color={HandleColor(data.badge)}>
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
                onClick={() => route.push('/mypage/request/1-3')}
              >
                <Badge className="badge" color={HandleColor(data.badge)}>
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

export default WebEstimate;

const Wrapper = styled.div`
  //padding-top: 21pt;
`;
const Label = styled.label`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  //padding-left: 15pt;
  color: ${colors.main2};
  .num {
    font-family: 'Spoqa Han Sans Neo';
    color: ${colors.main};
  }
`;
const Proceeding = styled.section`
  //padding-top: 21pt;
`;
const History = styled.section``;
const Carousel = styled.div<{ length: number }>`
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  grid-template-columns: ${({ length }) => `repeat(${length}, 1fr)`};
  gap: 12pt;
  padding: 6pt 4pt 30pt;

  @media (max-width: 899.25pt) {
    display: grid;
  }
`;
const CarouselItem = styled.div`
  height: 66pt;
  /* padding-left: 9pt; */
  /* padding-top: 27pt; */
  justify-content: center;
  border-radius: 6pt;
  align-items: flex-start;
  flex-direction: column;
  display: flex;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px rgb(137 163 201 / 20%);
  position: relative;
  padding-left: 15pt;
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
  @media (max-width: 899.25pt) {
    width: 105pt;
  }
`;
const Badge = styled.span<{ color: string }>`
  font-weight: 500;
  font-size: 9pt !important;
  line-height: 9pt !important;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  background: ${({ color }) => color};
  border-radius: 12pt !important;
  padding: 4.5pt 7.5pt !important;
`;
