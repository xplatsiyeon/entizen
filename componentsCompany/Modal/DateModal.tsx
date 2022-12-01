import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import LeftArrow from 'public/mypage/left-arrow.png';
import RightArrow from 'public/mypage/right-arrow.png';
import Image from 'next/image';
import { css } from '@emotion/react';
import { useMutation, useQueryClient } from 'react-query';
import { isTokenPostApi } from 'api';
import Modal from 'components/Modal/Modal';
import { useRouter } from 'next/router';
import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import { InProgressProjectsDetailResponse } from 'QueryComponents/CompanyQuery';

interface Props {
  selectedDays: string;
  SetSelectedDays: Dispatch<SetStateAction<string>>;
  exit: () => void;
  stepType: string;
  inProgressRefetch: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<InProgressProjectsDetailResponse>>;
}

const DateModal = ({
  selectedDays,
  SetSelectedDays,
  exit,
  stepType,
  inProgressRefetch,
}: Props) => {
  const outside = useRef(null);
  const router = useRouter();
  const routerId = router?.query?.projectIdx!;
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

  const [isModal, setIsModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 목표일 등록 mutation
  const { mutate: dateMutate, isLoading } = useMutation(isTokenPostApi, {
    onSuccess: () => {
      inProgressRefetch();
      exit();
    },
    onError: (error: any) => {
      if (error.response.data.message) {
        setErrorMessage(error.response.data.message);
        setIsModal(true);
      } else if (error.response.status === 413) {
        setErrorMessage('용량이 너무 큽니다.');
        setIsModal(true);
      } else {
        setErrorMessage('다시 시도해주세요');
        setIsModal(true);
      }
    },
  });
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
    const differencerDate = CalculateDifference(day);
    // 년,월,일 날짜
    const selectedDate = selectedYear + '.' + selectedMonth + '.' + day;
    // 이전 날짜 클릭 금지 조건문
    if (differencerDate > 0) return;
    // 클릭 취소
    if (selectedDays === selectedDate) {
      SetSelectedDays('');
      // 최대 5개까지 선택 가능
    } else {
      SetSelectedDays(selectedDate);
    }
  };
  const onClcikSubmitDate = () => {
    dateMutate({
      url: `/projects/${routerId}/goal-date`,
      data: {
        projectStep: stepType,
        goalDate: selectedDays.replaceAll('.', '-'),
      },
    });
  };

  const handleModalClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (outside.current === e.target) {
      exit();
    }
  };
  // 컴포넌트 탈출 시 선택한 날짜 초기화
  useEffect(() => {
    return () => {
      SetSelectedDays('');
    };
  }, []);

  return (
    <Container ref={outside} onClick={(e) => handleModalClose(e)}>
      {isModal && <Modal click={exit} text={errorMessage} />}
      <Wrapper>
        <HeaderTitle>목표일 입력하기</HeaderTitle>
        <Title className="title">
          <Pagenation>
            <div className="left-btn" onClick={prevMonth}>
              <Image src={LeftArrow} alt="left-btn" layout="fill" />
            </div>
            <h3 className="name">{`${selectedYear} ${selectedMonth}월 `}</h3>
            <div className="right-btn" onClick={nextMonth}>
              <Image src={RightArrow} alt="right-btn" layout="fill" />
            </div>
          </Pagenation>
        </Title>
        <Weeks className="Weeks">{returnWeek()}</Weeks>
        <Days className="date">{returnDay()}</Days>
        <Button onClick={onClcikSubmitDate}>선택한 날짜로 입력하기</Button>
      </Wrapper>
    </Container>
  );
};

export default DateModal;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background-color: rgb(34, 34, 34, 0.4);
`;

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  height: 375pt;
  border-radius: 20pt 20pt 0 0;
  padding-left: 15pt;
  padding-right: 15pt;
  background-color: #ffffff;
  z-index: 1000;
  opacity: 1 !important;

  @media (min-width: 900pt) {
    position: relative;
    left: 50%;
    top: 20%;
    width: 324pt;
    height: 429pt;
    border-radius: 12pt;
  }
`;

const HeaderTitle = styled.div`
  width: 100%;
  padding-top: 21pt;
  padding-bottom: 24pt;
  text-align: center;
  font-family: Spoqa Han Sans Neo;
  font-size: 15pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
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
    width: 70pt;
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
  color: ${colors.orange};
`;
const Weeks = styled.div`
  padding-top: 25.5pt;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  @media (min-width: 900pt) {
    padding-top: 40pt;
  }
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
  padding-bottom: 30pt;
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

const Button = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-top: 15pt;
  padding-bottom: 15pt;
  border-radius: 6pt;
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #ffffff;
  background-color: ${colors.main};

  @media (min-width: 900pt) {
    margin-top: 50pt;
  }
`;
