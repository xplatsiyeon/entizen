import styled from '@emotion/styled';
import Calendar from 'components/mypage/request/Calendar';
import MypageHeader from 'components/mypage/request/header';
import Image from 'next/image';
import { useState } from 'react';
import colors from 'styles/colors';
import ScheduleIcon from 'public/mypage/schedule-icon.svg';
import Modal from 'components/Modal/Modal';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { requestAction } from 'store/requestSlice';
import React from 'react';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import { useMutation } from 'react-query';
import { isTokenPostApi } from 'api';
import { AxiosError } from 'axios';

interface Mutation {
  isSuccess: boolean;
}

const Mypage1_5 = () => {
  const router = useRouter();
  const routerId = router.query.id;
  const dispatch = useDispatch();
  const { mutate, isLoading } = useMutation(isTokenPostApi, {
    onSuccess: () => {
      setIsModal((prev) => !prev);
    },
    onError: () => {},
  });
  const [selectedDays, SetSelectedDays] = useState<string[]>([]); // 클릭 날짜
  const [isModal, setIsModal] = useState(false); // 모달

  const onClickBtn = () => {
    const postData = selectedDays.map((e) => e.replaceAll('.', '-'));
    console.log(selectedDays);
    isTokenPostApi({
      url: `/quotations/pre/${routerId}/spot-inspection`,
      data: { spotInspectionDates: postData },
    });
  };
  // 리덕스
  const HandleModal = () => {
    console.log('모달 확인 버튼 클릭');
    // router.push('/mypage');
    // router.push('/mypage/request/2-1');
    // dispatch(requestAction.addDate(selectedDays));
  };
  return (
    <React.Fragment>
      <Body>
        <WebHeader />
        <Inner>
          <Wrapper>
            {/* 모달 */}
            {isModal && (
              <Modal
                click={HandleModal}
                text="전송이 완료되었습니다."
                color="red"
              />
            )}
            <MypageHeader title="날짜 선택" back={true} />
            <H1>
              현장실사 방문이
              <br /> 가능한 날짜를 선택해주세요
            </H1>
            <P>
              현장 검토 및 최종견적을 위해
              <br /> 담당자가 방문할 예정입니다.
            </P>
            {/* 달력 */}
            <Calendar
              selectedDays={selectedDays}
              SetSelectedDays={SetSelectedDays}
            />
            <Explanation>
              * 일부 현장의 경우 현장사진으로 현장실사가 대체될 수 있으며,
              <br />
              담당자로부터 현장사진을 요청받을 수 있습니다.
            </Explanation>
            <Schedule>
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
            </Schedule>
            <Btn onClick={onClickBtn}>보내기</Btn>
          </Wrapper>
        </Inner>
        <WebFooter />
      </Body>
    </React.Fragment>
  );
};

export default Mypage1_5;

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
    border-radius: 0;
  }
  @media (max-height: 500pt) {
    height: 100%;
  }
`;

const Wrapper = styled.div`
  position: relative;
  padding-bottom: 225pt;
  margin: 0 31.875pt;
  height: 667.5pt;

  @media (max-width: 899pt) {
    height: 100%;
    margin: 0;
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
  padding-top: 9pt;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  padding-left: 15pt;
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
