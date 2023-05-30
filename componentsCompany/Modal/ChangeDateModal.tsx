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
import { useMutation } from 'react-query';
import { isTokenPatchApi } from 'api';
import { useRouter } from 'next/router';
import Loader from 'components/Loader';
import Modal from 'components/Modal/Modal';
import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import { InProgressProjectsDetailResponse } from 'QueryComponents/CompanyQuery';

interface Props {
  selectedDays: string;
  SetSelectedDays: Dispatch<SetStateAction<string>>;
  exit: () => void;
  stepType: string;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  beforeStepDate?: string;
  afterStepDate?: string;
  inProgressRefetch: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<InProgressProjectsDetailResponse>>;
  completionDate: string;
}

const ChangeDateModal = ({
  selectedDays,
  SetSelectedDays,
  exit,
  stepType,
  setModalOpen,
  inProgressRefetch,
  beforeStepDate,
  afterStepDate,
  completionDate,
}: Props) => {
  const router = useRouter();
  const routerId = router?.query?.projectIdx;
  const outside = useRef(null);
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
  // textArea 내용
  const [contents, setContents] = useState('');

  const { mutate: goalMutate, isLoading } = useMutation(isTokenPatchApi, {
    onSuccess: () => {
      inProgressRefetch();
      setModalOpen(false);
    },
    onError: (error: any) => {
      // console.log('err');
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
              <div className="item" onClick={() => HandleSelectedDay(i + 1)}>
                {i + 1}
              </div>
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
  // 선택된 이전 날짜 차이 계산
  const beforeCalculateDifference = (day: number) => {
    // console.log('beforeStepDate==>', beforeStepDate);
    if (beforeStepDate === 'CHANGING' || beforeStepDate === '') {
      return 1;
    }

    if (beforeStepDate !== '' && beforeStepDate) {
      const selectedAdd = new Date(selectedYear, selectedMonth, day);
      const preDay = beforeStepDate?.split('-').map((e) => parseInt(e));
      const newPreDay = new Date(preDay[0], preDay[1], preDay[2]);
      const btMs = newPreDay.getTime() - selectedAdd.getTime();
      const btDay = btMs / (1000 * 60 * 60 * 24);
      return btDay;
    }
  };
  // 선택된 이후 날짜 차이 계산
  const afterCalculateDifference = (day: number) => {
    // console.log('afterStepDate==>', afterStepDate);

    if (afterStepDate === '') {
      return -1;
    }
    if (afterStepDate !== '' && afterStepDate) {
      const selectedAdd = new Date(selectedYear, selectedMonth, day);
      // console.log('selectedAdd=>', selectedAdd);
      const preDay = afterStepDate?.split('-').map((e) => parseInt(e));
      // console.log('preDay=>', preDay);
      const newPreDay = new Date(preDay[0], preDay[1], preDay[2]);
      const btMs = newPreDay.getTime() - selectedAdd.getTime();
      const btDay = btMs / (1000 * 60 * 60 * 24);
      // console.log('btDay=>', btDay);
      return btDay;
    }
  };
  // 날짜 선택하기
  const HandleSelectedDay = (day: number) => {
    const differenceDate = CalculateDifference(day);
    const differenceBeforeDate = beforeCalculateDifference(day);
    const differenceAfterDate = afterCalculateDifference(day);

    // console.log('differenceDate=>', differenceDate);
    // console.log('differenceBeforeDate=>', differenceBeforeDate);
    // console.log('differenceAfterDate=>', differenceAfterDate);

    // 년,월,일 날짜
    const selectedDate = selectedYear + '.' + selectedMonth + '.' + day;
    // 이전 날짜 클릭 금지 조건문

    if (
      differenceDate > 0 ||
      differenceAfterDate! < 0 ||
      differenceBeforeDate! > 0
    ) {
      // 클릭 취소
      return;
    } else if (selectedDays === selectedDate) {
      SetSelectedDays('');
      // 최대 5개까지 선택 가능
    } else {
      SetSelectedDays(selectedDate);
    }
  };
  // Text area 값 변경
  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.currentTarget.value);
  };
  // 목표일 변경
  const onClickGoalDate = () => {
    if (!selectedDays) {
      alert('날짜를 선택해주세요');
    } else {
      goalMutate({
        url: `/projects/${routerId}/goal-date`,
        data: {
          projectStep: stepType,
          changedReason: contents,
          goalDate: selectedDays?.replaceAll('.', '-'),
        },
      });
    }
  };

  useEffect(() => {}, [selectedDays]);
  const handleModalClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (outside.current === e.target) {
      exit();
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Container ref={outside} onClick={(e) => handleModalClose(e)}>
      <Wrapper>
        <HeaderTitle>일정 변경</HeaderTitle>
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
        <TextareaSubTitle>
          일정이 변경되는 이유를 간단히 작성해주세요.
        </TextareaSubTitle>
        <TextAreaWrap>
          <TextArea
            maxLength={50}
            rows={3}
            placeholder="간단하게 작성해주세요!"
            onChange={onChangeTextArea}
          />
          <span className="length">{contents.length}/50</span>
        </TextAreaWrap>

        <Button onClick={onClickGoalDate}>선택한 날짜로 입력하기</Button>
      </Wrapper>
    </Container>
  );
};

export default ChangeDateModal;

const Container = styled.div`
  position: absolute;
  z-index: 9999;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(34, 34, 34, 0.4);
  @media (min-width: 900pt) {
    position: fixed;
    top: 0;
    left: 0;
  }
`;

const Wrapper = styled.div`
  /* position: fixed;
  bottom: 0; */
  /* overflow: scroll; */
  margin-top: 100px;
  max-height: 525pt;
  /* height: 480pt; */
  border-radius: 20pt 20pt 0 0;
  padding-left: 15pt;
  padding-right: 15pt;
  padding-bottom: 30pt;
  background-color: #ffffff;
  z-index: 9999;
  opacity: 1 !important;
  @media (min-width: 900pt) {
    position: relative;
    left: 50%;
    top: 10%;
    width: 324pt;
    max-height: 576pt;
    border-radius: 12pt;
  }
`;

const HeaderTitle = styled.div`
  width: 100%;
  /* position: sticky;
  top: 0; */
  padding-top: 21pt;
  padding-bottom: 24pt;
  text-align: center;
  font-family: Spoqa Han Sans Neo;
  font-size: 15pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  @media (min-width: 900pt) {
    padding-top: 30pt;
    padding-bottom: 0;
  }
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Pagenation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .left-btn {
    cursor: pointer;
    position: relative;
    width: 12pt;
    height: 12pt;
  }
  .right-btn {
    cursor: pointer;
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
  @media (min-width: 900pt) {
    padding-top: 36pt;
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
  padding-bottom: 12pt;
  @media (min-width: 900pt) {
    padding-top: 24pt;
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
  cursor: pointer;
  padding-bottom: 12pt;
  /* @media (min-width: 900pt) {
    padding-bottom: 12pt;
  } */
`;
const Day = styled.div<{ selectedDay?: boolean }>`
  display: flex;
  justify-content: center;
  text-align: center;
  width: calc(100% / 7);
  line-height: 50px;
  font-weight: 500;
  /* padding: 3.25pt 0; */
  font-size: 10.5pt;
  line-height: 16.5pt;
  color: ${colors.main2};
  margin-bottom: 9pt;
  .item {
    width: 27pt;
    height: 27pt;
    margin-top: 2px;
    padding-bottom: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${({ selectedDay }) =>
      selectedDay &&
      css`
        background-color: ${colors.main};
        color: ${colors.lightWhite};
        border-radius: 50%;
      `};
  }
  @media (min-width: 900pt) {
    font-size: 12pt;
    margin-bottom: 9pt;
  }
`;
const TextareaSubTitle = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
`;
const TextAreaWrap = styled.div`
  position: relative;
  padding-top: 9pt;
  height: 90pt;
  .length {
    position: absolute;
    bottom: 11.25pt;
    right: 11.25pt;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 500;
    font-size: 9pt;
    line-height: 12pt;
    text-align: right;
    letter-spacing: -0.02em;
    color: ${colors.lightGray3};
  }
`;
const TextArea = styled.textarea`
  height: 100%;
  width: 100%;
  padding: 12pt;
  box-sizing: border-box;
  resize: none;
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 400;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: left;
  border-radius: 6pt;
  border: 1px solid #e2e5ed;
  :focus {
    font-weight: 400;
  }
  ::placeholder {
    color: ${colors.lightGray3};
  }
`;

const Button = styled.div`
  width: 100%;
  margin-top: 27pt;
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
  cursor: pointer;
  @media (min-width: 900pt) {
  }
`;
