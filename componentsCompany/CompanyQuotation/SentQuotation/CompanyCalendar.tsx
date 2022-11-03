import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import LeftArrow from 'public/mypage/left-arrow.png';
import RightArrow from 'public/mypage/right-arrow.png';
import Image from 'next/image';
import { css } from '@emotion/react';

interface Props {
  selectedDays: string;
  SetSelectedDays: Dispatch<SetStateAction<string>>;
  selectedDaysArr?: string[];
  setSelectedDaysArr?: Dispatch<SetStateAction<string[]>>;
  days: string[];
  types: 'company' | 'customer';
}

const CompanyCalendar = ({
  days,
  selectedDays,
  SetSelectedDays,
  selectedDaysArr,
  setSelectedDaysArr,
  types,
}: Props) => {
  const today = {
    year: new Date().getFullYear(), //오늘 연도
    month: new Date().getMonth() + 1, //오늘 월
    date: new Date().getDate(), //오늘 날짜
    day: new Date().getDay(), //오늘 요일
  };

  let temp: string[][] = [];
  const getDate = () => {
    for (let i = 0; i < days.length; i++) {
      temp.push(days[i].split('.'));
    }
  };
  getDate();
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
  //일짜 반화
  const returnDay = useCallback(() => {
    let dayArr: JSX.Element[] = [];
    for (const nowDay of week) {
      const day = new Date(selectedYear, selectedMonth - 1, 1).getDay();
      // 달력 날짜 추가
      // 위에가 고객선택날짜 중에 선택 아래는 날짜 제안
      if (week[day] === nowDay) {
        if (types === 'customer') {
          for (let i = 0; i < dateTotalCount; i++) {
            const loopDate = `${selectedYear}.${selectedMonth}.${i + 1}`;
            if (days.includes(loopDate)) {
              dayArr.push(
                <Day
                  selectedDay={selectedDay(i + 1)}
                  key={i + 1}
                  onClick={() => HandleSelectedDay(i + 1)}
                >
                  <div className="item customerDate">{i + 1}</div>
                </Day>,
              );
            } else {
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
          }
        } else if (types === 'company') {
          for (let i = 0; i < dateTotalCount; i++) {
            const loopDate = `${selectedYear}.${selectedMonth}.${i + 1}`;
            if (days.includes(loopDate)) {
              dayArr.push(
                <Day
                  selectedDay={selectedDay(i + 1)}
                  key={i + 1}
                  onClick={() => HandleSelectedDay(i + 1)}
                >
                  <div className="item picked">{i + 1}</div>
                </Day>,
              );
            } else {
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
          }
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
    return selectedDays === date ? true : false;
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
    const selectedDate = selectedYear + '.' + selectedMonth + '.' + day;
    const differencerDate = CalculateDifference(day);

    if (types === 'customer') {
      if (days.includes(selectedDate)) {
        SetSelectedDays(selectedDate);
      }
      if (selectedDays === selectedDate) {
        SetSelectedDays('');
      }
    }

    if (types === 'company') {
      // 이전 날짜 | 이미 선택된 날짜 클릭 금지
      if (differencerDate > 0 || days.includes(selectedDate)) return;
      // 클릭 취소
      if (selectedDaysArr!.includes(selectedDate)) {
        console.log('클릭 취소');
        const temp: string[] = selectedDaysArr!;
        const index = temp.indexOf(selectedDate);
        temp.splice(index, 1);
        setSelectedDaysArr!(temp);
        // 최대 5개까지 선택 가능
      } else if (selectedDaysArr!.length < 5) {
        console.log('데이터 추가');
        console.log(selectedDate);
        setSelectedDaysArr!([...selectedDaysArr!, selectedDate]);
      }
    }
  };

  useEffect(() => {
    console.log(selectedDaysArr);
  }, [selectedDaysArr]);

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
  .customerDate {
    border: 1px solid ${colors.main};
    border-radius: 50%;
  }
  .picked {
    color: #e2e5ed;
    text-decoration: line-through;
  }
`;
