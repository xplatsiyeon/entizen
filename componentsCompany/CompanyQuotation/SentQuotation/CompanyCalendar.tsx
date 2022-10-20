import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import LeftArrow from 'public/mypage/left-arrow.png';
import RightArrow from 'public/mypage/right-arrow.png';
import Image from 'next/image';
import { css } from '@emotion/react';

interface Props {
  selectedDays: string[];
  SetSelectedDays: Dispatch<SetStateAction<string[]>>;
}

const CompanyCalendar = ({ selectedDays, SetSelectedDays }: Props) => {
  const today = {
    year: new Date().getFullYear(), //오늘 연도
    month: new Date().getMonth() + 1, //오늘 월
    date: new Date().getDate(), //오늘 날짜
    day: new Date().getDay(), //오늘 요일
  };
  const week = ['일', '월', '화', '수', '목', '금', '토']; //일주일
  const [selectedYear, setSelectedYear] = useState(today.year); //현재 선택된 연도
  const [selectedMonth, setSelectedMonth] = useState(today.month); //현재 선택된 달
  const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate(); //선택된 연도, 달의 마지막 날짜
  //이전 달 보기 보튼
  const prevMonth = useCallback(() => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth]);
  //다음 달 보기 버튼
  const nextMonth = useCallback(() => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth]);
  //요일 반환
  const returnWeek = useCallback(() => {
    let weekArr: JSX.Element[] = [];
    week.forEach((item) => {
      weekArr.push(<Week key={item}>{item}</Week>);
    });
    return weekArr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //알짜 반화
  const returnDay = useCallback(() => {
    let dayArr: JSX.Element[] = [];
    for (const nowDay of week) {
      const day = new Date(selectedYear, selectedMonth - 1, 1).getDay();
      // 달력 날짜 추가
      if (week[day] === nowDay) {
        for (let i = 0; i < dateTotalCount; i++) {
          dayArr.push(
            <Day
              selectedDay={selectedDay(i + 1)}
              key={i + 1}
              onClick={() => HandleSelectedDay(i + 1)}
            >
              <div className="item">{i + 1}</div>
            </Day>,
          );
        }
      } else {
        // 공백 추가
        dayArr.push(<Day key={nowDay} />);
      }
    }
    return dayArr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDays, selectedYear, selectedMonth, dateTotalCount]);
  // 선택된 날짜 컬러 커스텀
  const selectedDay = (day: number): boolean => {
    // 년,월,일 날짜
    const date = selectedYear + '.' + selectedMonth + '.' + day;
    return selectedDays.includes(date) ? true : false;
  };
  // 날짜 차이 계산
  const CalculateDifference = (day: number) => {
    const { year, month, date } = today;
    const todayAdd = new Date(year, month, date);
    const selectedAdd = new Date(selectedYear, selectedMonth, day);
    const btMs = todayAdd.getTime() - selectedAdd.getTime();
    const btDay = btMs / (1000 * 60 * 60 * 24);
    return btDay;
  };
  // 날짜 선택하기
  const HandleSelectedDay = (day: number) => {
    const differencerDate = CalculateDifference(day);
    // 년,월,일 날짜
    const selectedDate = selectedYear + '.' + selectedMonth + '.' + day;
    // 이전 날짜 클릭 금지 조건문
    if (differencerDate > 0) return;
    // 클릭 취소
    if (selectedDays.includes(selectedDate)) {
      const temp = [...selectedDays];
      const index = temp.indexOf(selectedDate);
      temp.splice(index, 1);
      SetSelectedDays(temp);
      // 최대 5개까지 선택 가능
    } else if (selectedDays.length < 5) {
      day;
      SetSelectedDays([...selectedDays, selectedDate]);
    }
  };

  return (
    <Container>
      <Title className="title">
        <Pagenation>
          <div className="left-btn" onClick={prevMonth}>
            <Image src={LeftArrow} alt="left-btn" layout="fill" />
          </div>
          <h3 className="name">{`${selectedYear} ${selectedMonth} `}</h3>
          <div className="right-btn" onClick={nextMonth}>
            <Image src={RightArrow} alt="right-btn" layout="fill" />
          </div>
        </Pagenation>
        <Notice>
          <span></span>
          <span>● 고객이 선택한 일정</span>
        </Notice>
      </Title>
      <Weeks className="Weeks">{returnWeek()}</Weeks>
      <Days className="date">{returnDay()}</Days>
    </Container>
  );
};

export default CompanyCalendar;

const Container = styled.div`
  padding: 45pt 15pt 0 15pt;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Pagenation = styled.div`
  display: flex;
  justify-content: center;
  .left-btn {
    position: relative;
    width: 12pt;
    height: 12pt;
  }
  .right-btn {
    position: relative;
    width: 12pt;
    height: 12pt;
  }
  .name {
    width: 62.25pt;
    font-weight: 700;
    font-size: 15pt;
    line-height: 15pt;
    text-align: center;
    color: ${colors.main2};
  }
`;
const Notice = styled.span`
  font-weight: 400;
  font-size: 7.5pt;
  line-height: 9pt;
  letter-spacing: -0.02em;
  color: ${colors.main};
`;
const Weeks = styled.div`
  padding-top: 25.5pt;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
const Week = styled.div`
  width: calc(100% / 7);
  font-weight: 400;
  font-size: 7.5pt;
  line-height: 9pt;
  padding: 5.25px 0;
  text-align: center;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: ${colors.calendarWeek};
`;
const Days = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
const Day = styled.div<{ selectedDay?: boolean }>`
  display: flex;
  justify-content: center;
  text-align: center;
  width: calc(100% / 7);
  line-height: 50px;
  font-weight: 500;
  padding: 3.25pt 0;
  font-size: 10.5pt;
  line-height: 16.5pt;
  color: ${colors.main2};
  .item {
    padding: 2pt;
    width: 22px;
    height: 22px;
    ${({ selectedDay }) =>
      selectedDay &&
      css`
        background-color: ${colors.main};
        color: ${colors.lightWhite};
        border-radius: 50%;
      `};
  }
`;
