import styled from '@emotion/styled';
import Calendar from 'components/mypage/request/Calendar';
import MypageHeader from 'components/mypage/request/header';
import WebHeader from 'componentsWeb/WebHeader';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ScheduleIcon from 'public/mypage/schedule-icon.svg';
import { requestAction } from 'store/requestSlice';
import colors from 'styles/colors';
import WebFooter from 'componentsWeb/WebFooter';
import Modal from 'components/Modal/Modal';
import CompanyCalendar from './CompanyCalendar';
import { useMutation } from 'react-query';
import { isTokenPostApi } from 'api';
import Loader from 'components/Loader';

type Props = {};

const AnotherSuggest = (props: Props) => {
  const days = [
    '2022.11.2',
    '2022.10.22',
    '2022.10.28',
    '2022.10.29',
    '2022.10.31',
  ];
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedDays, SetSelectedDays] = useState<string>(''); // 클릭 날짜
  const [selectedDaysArr, setSelectedDaysArr] = useState<string[]>([]);
  const [isModal, setIsModal] = useState(false); // 모달
  const {
    mutate: postMutate,
    isLoading,
    isError,
  } = useMutation(isTokenPostApi, {
    onSuccess: () => {
      setIsModal((prev) => !prev);
    },
    onError: (error: any) => {
      console.log('포스트 실패');
      console.log(error);
      setIsModal((prev) => !prev);
    },
  });
  // 리덕스
  const HandleModal = () => {
    // router.push('/mypage');
    router.push('/mypage/request/2-1');
    dispatch(requestAction.addDate(selectedDays));
  };
  const onClickBtn = () => {
    const spotInspectionDates = selectedDaysArr.map((e) =>
      e.replaceAll('.', '-'),
    );

    postMutate({
      url: `/quotations/pre/${router.query.preQuotation}/spot-inspection`,
      data: {
        spotInspectionDates: spotInspectionDates,
        isReplacedPicture: false,
        isNewPropose: true,
        isConfirmed: false,
      },
    });
  };

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return (
      <Modal
        text={'전송 실패했습니다.\n다시 시도해주세요.'}
        click={() => router.push('/company/quotation')}
      />
    );
  }

  return (
    <React.Fragment>
      {isModal && (
        <Modal
          text={'전송이 완료되었습니다.'}
          click={() => router.push('/company/sentProvisionalQuotation')}
        />
      )}
      <Body>
        <WebHeader />
        <Inner>
          <Wrapper>
            <MypageHeader title="날짜 선택" exitBtn={true} />
            <H1>
              고객에게 가능한 날짜를
              <br /> 제안해보세요
            </H1>

            {/* 달력 */}
            <CompanyCalendar
              selectedDays={selectedDays}
              SetSelectedDays={SetSelectedDays}
              selectedDaysArr={selectedDaysArr}
              setSelectedDaysArr={setSelectedDaysArr}
              days={days}
              types={'company'}
            />
            {/* <Explanation> */}
            {/* * 일부 현장의 경우 현장사진으로 현장실사가 대체될 수 있으며,
              <br />
              담당자로부터 현장사진을 요청받을 수 있습니다. */}
            {/* </Explanation> */}
            {/* <Schedule>
              <h3 className="name">선택된 일정</h3>
              <UL>
                {selectedDays.map((day, index) => (
                  <li className="list" key={index}>
                    <div className="img-box">
                      <Image src={ScheduleIcon} alt="img" />
                    </div>
                    <div className="due-date">
                      <div>현장실사 방문 예정일</div>
                      <div>{day}</div>
                    </div>
                  </li>
                ))}
              </UL>
            </Schedule> */}
            <Btn onClick={onClickBtn}>다른 일정 제안하기</Btn>
          </Wrapper>
        </Inner>
        <WebFooter />
      </Body>
    </React.Fragment>
  );
};

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;
  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  width: 345pt;
  //width: 281.25pt;
  background: #ffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;
  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    padding: 0;
    box-shadow: none;
    background: none;
    margin: 0;
    overflow-y: scroll;
  }
  @media (max-height: 500pt) {
    height: 100%;
  }
`;

const Wrapper = styled.div`
  position: relative;
  padding-bottom: 225pt;
  /* margin: 0 31.875pt; */
  height: 667.5pt;

  @media (max-width: 899pt) {
    height: 100%;
  }
`;
const H1 = styled.h1`
  padding-top: 27pt;
  font-weight: 500;
  font-size: 18pt;
  line-height: 24pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding-left: 15pt;
`;
const P = styled.p`
  margin-top: 10.5pt;
  box-sizing: border-box;
  margin-left: 15pt;
  padding: 6pt 9pt;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  border-radius: 12pt;
  color: ${colors.main};
  display: inline-block;
  border: 1px solid ${colors.main};
`;
const Explanation = styled.p`
  margin: 0 15pt;
  padding-top: 33pt;
  padding-bottom: 18pt;
  font-weight: 400;
  font-size: 9pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${colors.lightGray2};
  border-bottom: 1px solid #e9eaee;
`;
const Schedule = styled.div`
  padding: 18pt 15pt 0 15pt;
  .name {
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    color: ${colors.main2};
  }
`;
const UL = styled.ul`
  padding-top: 24pt;
  .list {
    background-color: rgba(90, 45, 201, 0.7);
    border-radius: 6pt;
    padding: 6pt;
    margin-bottom: 9pt;
    display: flex;
    gap: 12pt;
  }
  .due-date {
    font-weight: 500;
    font-size: 9pt;
    line-height: 9pt;
    letter-spacing: -0.02em;
    padding-top: 2pt;
    color: ${colors.lightWhite};
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;
const Btn = styled.button`
  position: absolute;
  bottom: 0;
  background-color: ${colors.main};
  width: 100%;
  text-align: center;
  padding-top: 15pt;
  padding-bottom: 15pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};

  @media (max-width: 899pt) {
    position: fixed;
    left: 0;
    padding-bottom: 39pt;
  }
`;

export default AnotherSuggest;
