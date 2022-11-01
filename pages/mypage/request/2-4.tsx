import styled from '@emotion/styled';
import MypageHeader from 'components/mypage/request/header';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Calendar from 'components/mypage/request/Calendar';
import ScheduleIcon from 'public/mypage/schedule-icon.svg';
import colors from 'styles/colors';
import Image from 'next/image';
import { Button } from '@mui/material';
import Modal from 'components/Modal/Modal';
import { useDispatch } from 'react-redux';
import { requestAction } from 'store/requestSlice';
import React from 'react';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';

const Mypage2_4 = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedDays, SetSelectedDays] = useState<string[]>([]); // 클릭 날짜
  const [isModal, setModal] = useState(false);
  // 리덕스
  const HandleModal = () => {
    // router.push('/mypage');
    router.push('/mypage/request/2-1');
    dispatch(requestAction.addDate(selectedDays)); //임시
    dispatch(requestAction.addPick(selectedDays[0])); // 임시
  };
  return (
    <React.Fragment>
      <Body>
        <WebHeader />
        <Inner>
          <Wrapper>
            {/* 모달 / 라우터 수정  */}
            {isModal && (
              <Modal text="변경 요청 되었습니다." click={HandleModal} />
            )}
            <MypageHeader title="다른 날짜 선택" exitBtn={true} back={true} />
            <Title>가능한 날짜를 선택해주세요</Title>
            <Calendar
              selectedDays={selectedDays}
              SetSelectedDays={SetSelectedDays}
            />
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
            <Btn onClick={() => setModal((prev) => !prev)}>변경 요청</Btn>
          </Wrapper>
        </Inner>
        <WebFooter />
      </Body>
    </React.Fragment>
  );
};

export default Mypage2_4;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  //height: 810pt;
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
    height: 100%;
    margin: 0 auto;
    position: relative;
    padding: 0;
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0 31.875pt 0;
  //height: 664.5pt;
  height: auto;

  @media (max-width: 899pt) {
    //height: 100%;
    height: 100vh;
    padding-bottom: 225pt;
    margin: 0;
  }
`;
const Title = styled.h1`
  font-weight: 500;
  font-size: 18pt;
  line-height: 24pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding-left: 15pt;
  padding-top: 27pt;
`;
const UL = styled.ul`
 // padding: 24pt 15pt 0 15pt; 
  padding: 0pt 15pt 80pt;
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

  @media (max-width: 899pt) {
    padding: 0pt 15pt 100pt;
  }
`;
const Btn = styled(Button)`
  position: absolute;
  bottom: 0;
  width: 100%;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  background: ${colors.main};
  padding-top: 15pt;
  padding-bottom: 15pt;

  @media (max-width: 899pt) {
    position: fixed;
    left: 0;
    padding-bottom: 39pt;
  }
`;
