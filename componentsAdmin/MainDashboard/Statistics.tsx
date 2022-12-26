import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import { AdminBtn } from 'componentsAdmin/Layout';
import React, { useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import colors from 'styles/colors';
import ChartBar from './Chart';

type Props = {};

const GridList = [
  '방문자',
  '신규가입',
  '신규 역경매 요청',
  '신규 프로젝트',
  '견적 취소 역경매',
  '신규 내 충전소',
  'A/S 요청',
];
const ChartList = ['완속', '중속', '급속', '초급속'];
const ChartColor = ['#B096EF', '#FFC043', '#A6A9B0', '#F75015'];

const Statistics = (props: Props) => {
  const [pickedDate, setPickedDate] = useState<string[]>();
  const dateRef = useRef<HTMLDivElement>(null);
  // 달력 날짜 변경 함수
  const handleDateChange = (
    value: DateRange | null,
    event: React.SyntheticEvent<Element, Event>,
  ) => {
    const inputValue = dateRef.current
      ?.querySelector('.datePicker-input')
      ?.querySelector('input')?.value;
    console.log('input?', inputValue);
    dateRef.current?.querySelector('.date-btn')?.classList.add('on');
    setTimeout(() => {
      dateRef.current?.querySelector('.date-btn')?.classList.remove('on');
    }, 600);
  };
  const handleDate = () => {
    const inputValue = dateRef.current
      ?.querySelector('.datePicker-input')
      ?.querySelector('input')?.value;
    console.log('날짜조회 클릭', inputValue);

    if (inputValue) {
      console.log(inputValue);
      const newDate = inputValue.split('~');
      setPickedDate(newDate);
    } else {
      setPickedDate(undefined);
    }
  };

  return (
    <Wrapper>
      <AdminHeader type="main" title="메인대시보드" subTitle="통계" />
      {/* 검색박스 */}
      <SearchBox ref={dateRef}>
        <DateRangePicker
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
        {GridList.map((item, idx) => (
          <div className="item" key={item + idx}>
            <label className="name">{item}</label>
            <h1 className="count">3건</h1>
          </div>
        ))}
      </GridContainer>
      {/* Chart Container */}
      <ChartContainer>
        <div className="titleBox">
          <h2 className="name">누적 전력요청 충전기 대수</h2>
          <div className="speedBox">
            {ChartList.map((item, index) => (
              <SpeedItem key={item + index} color={ChartColor[index]}>
                <span className="circle" />
                <span>{item}</span>
              </SpeedItem>
            ))}
          </div>
        </div>
        <ChartBar />
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
    cursor: pointer;
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
