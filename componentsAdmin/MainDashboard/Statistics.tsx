import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import { AdminBtn } from 'componentsAdmin/Layout';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Bar } from 'react-chartjs-2';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import colors from 'styles/colors';
import ChartBar from './Chart';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { adminDateFomat, dateFomat } from 'utils/calculatePackage';
import { useRouter } from 'next/router';
import { isTokenAdminGetApi } from 'api';

type Props = {
  setNowHeight: Dispatch<SetStateAction<number | undefined>>;
};

type StatisticsResponse = {
  isSuccess: boolean;
  data: {
    statistics: {
      visitorsCount: number;
      newMembersCount: number;
      newQuotationRequestsCount: number;
      newProjectsCount: number;
      canceledQuotationRequestsCount: number;
      newChargingStationsCount: number;
      newAfterSalesServicesCount: number;
      chargers: {
        date: string;
        slow: number;
        normal: number;
        fast: number;
        superFast: number;
      }[];
    };
  };
};

const ChartList = ['완속', '중속', '급속', '초급속'];
const ChartColor = ['#B096EF', '#FFC043', '#A6A9B0', '#F75015'];

const Statistics = ({ setNowHeight }: Props) => {
  const queryClinet = useQueryClient();
  const router = useRouter();

  const [pickedDate, setPickedDate] = useState<string[]>();
  const dateRef = useRef<HTMLDivElement>(null);

  // 오늘 날짜.
  const today = new Date();
  console.log(adminDateFomat(String(today)));

  // 달력 날짜 변경 함수
  const handleDateChange = (
    value: DateRange | null,
    event: React.SyntheticEvent<Element, Event>,
  ) => {
    console.log('==================value=======================');

    if (value?.length === 2) {
      setPickedDate([
        adminDateFomat(value![0] as unknown as string),
        adminDateFomat(value![1] as unknown as string),
      ]);
    }
    // const inputValue = dateRef.current
    //   ?.querySelector('.datePicker-input')
    //   ?.querySelector('input')?.value;
    // console.log('input?', inputValue);
    // dateRef.current?.querySelector('.date-btn')?.classList.add('on');
    // setTimeout(() => {
    //   dateRef.current?.querySelector('.date-btn')?.classList.remove('on');
    // }, 600);
  };
  const handleDate = () => {
    queryClinet.removeQueries('asDetailView');
    refetch();

    // queryClinet.invalidateQueries('asDetailView');
    // const inputValue = dateRef.current

    // console.log('날짜조회 클릭', inputValue);
    // if (inputValue) {
    //   console.log(inputValue);
    //   const newDate = inputValue.split('~');
    //   setPickedDate(newDate);
    // } else {
    //   setPickedDate(undefined);
    // }
  };

  // 통계 리스트 조회
  // /admin/dashboards/statistics?startDate=2022-12-01&endDate=2022-12-29
  const { data, isLoading, isError, refetch } = useQuery<StatisticsResponse>(
    'asDetailView',
    () =>
      isTokenAdminGetApi(
        `/admin/dashboards/statistics?startDate=${
          pickedDate ? pickedDate[0] : '2022-09-05'
        }&endDate=${pickedDate ? pickedDate[1] : today}`,
      ),
  );
  const getData = data?.data?.statistics;

  const GridList = [
    { title: '방문자', count: getData?.visitorsCount },
    { title: '신규가입', count: getData?.newMembersCount },
    { title: '신규 역경매 요청', count: getData?.newQuotationRequestsCount },
    { title: '신규 프로젝트', count: getData?.newProjectsCount },
    {
      title: '견적 취소 역경매',
      count: getData?.canceledQuotationRequestsCount,
    },
    { title: '신규 내 충전소', count: getData?.newChargingStationsCount },
    { title: 'A/S 요청', count: getData?.newAfterSalesServicesCount },
  ];

  // ChartBar에 그래프로 내려주는 수치(배열임)
  const chartData = data?.data?.statistics?.chargers;

  return (
    <Wrapper>
      <AdminHeader type="main" title="메인대시보드" subTitle="통계" />
      {/* 검색박스 */}
      <SearchBox ref={dateRef}>
        <DateRangePicker
          // onClean={(event) => console.log(event)}
          onOpen={() => {
            console.log('open');
            const target: HTMLInputElement | null = document.querySelector(
              '.rs-picker-toggle-textbox',
            );
            if (target) {
              target.defaultValue = '';
              target.value = '';
            }
          }}
          defaultValue={[new Date('2022-09-05'), new Date()]}
          className="datePicker-input"
          placeholder={'년-월-일 ~ 년-월-일'}
          size={'sm'}
          onChange={handleDateChange}
        />
        <AdminBtn onClick={handleDate} className="date-btn">
          조회
        </AdminBtn>
      </SearchBox>
      {/* Grid Container */}
      <GridContainer>
        {GridList?.map((item, idx) => (
          <div className="item" key={idx}>
            <label className="name">{item.title}</label>
            <h1 className="count" key={idx}>
              {`${
                isLoading
                  ? 0
                  : item?.count
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }`}
            </h1>
          </div>
        ))}
      </GridContainer>
      {/* Chart Container */}
      <ChartContainer>
        <div className="titleBox">
          <h2 className="name">누적 견적요청 충전기 대 수</h2>
          <div className="speedBox">
            {ChartList.map((item, index) => (
              <SpeedItem key={item + index} color={ChartColor[index]}>
                <span className="circle" />
                <span>{item}</span>
              </SpeedItem>
            ))}
          </div>
        </div>
        <ChartBar chartData={chartData!} />
      </ChartContainer>
    </Wrapper>
  );
};

export default Statistics;

const Wrapper = styled.div`
  padding-left: 18pt;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
  padding-top: 16px;

  .item {
    /* cursor: pointer; */
    width: 208px;
    height: 208px;
    background: ${colors.lightWhite3};
    border: 2px solid ${colors.gray2};
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .name {
    position: absolute;
    top: 16px;
    left: 16px;
    font-weight: 500;
    font-size: 16px;
    color: ${colors.main2};
  }
  .count {
    font-weight: 500;
    font-size: 40px;
    color: ${colors.main2};
  }
`;

const ChartContainer = styled.div`
  padding-top: 58px;
  display: block;
  .titleBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .name {
    font-weight: 500;
    font-size: 16px;
    color: ${colors.main2};
  }
  .speedBox {
    display: flex;
    gap: 32px;
  }
`;

const SpeedItem = styled.div<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: -0.011em;
  color: ${colors.main2};
  /* position: relative; */
  .circle {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: ${({ color }) => color && color};
  }
`;
