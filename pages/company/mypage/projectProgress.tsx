import styled from '@emotion/styled';
import MypageHeader from 'components/mypage/request/header';
import DateModal from 'componentsCompany/Modal/DateModal';
import PrepareModal from 'componentsCompany/Mypage/PrepareModal';
import ProgressBody from 'componentsCompany/Mypage/ProgressBody';
import Reusable from 'componentsCompany/Mypage/Reusable';
import TopBox from 'componentsCompany/Mypage/TopBox';
import React, { useState } from 'react';
import { Data } from './runningProgress/[id]';

type Props = {
  info : Data;
  setData : React.Dispatch<React.SetStateAction<Data>>;
};

const Progress = ({info,setData}: Props) => {

  const [open, setOpen] = useState<boolean>(false);
  // 선택 날짜 관련
  const [selectedDays, SetSelectedDays] = useState<string>('');
  // 달력모달 관련
  const [dateArr, setDateArr] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [toggleOpen, setToggleOpen] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [dateOn, setDateOn] = useState<boolean[]>([false, false, false, false]);
  const [badgeState, setBadgeState] = useState<number>(info.state);

  const handleClick = () => setOpen(!open);
  // 달력 모달 켜고 끄고
  const handleExit = () => {
    let copyArr = [...dateOn];
    let find = dateOn.indexOf(true);
    copyArr[find] = false;
    setDateArr(copyArr);
  };
  // 지금 진행중인 과정 파란 동그라미, 파란색 보더
  const [presentProgress, setPresentProgress] = useState<number>(1);

  // 토글 된 박스 클릭하면 모달창으로 보여줌 ( 준비 , 검수, 등등 ...)
  const [progressNum, setProgressNum] = useState<number>(-1);

  //완료하기 버튼 s누르면 바뀔 컴포넌트
  const [fin, setFin] = useState<boolean>(false); 

  // 상단 토글 오픈
  const openHeader = () => {
    setOpen(!open);
  };

 /* const handleXbtn = () => {
    setProgressNum(-1);
  }; */

  return (
    <>
      {/* 목표일 설정 */}
      {dateArr.indexOf(true) !== -1 && (
        <DateModal
          selectedDays={selectedDays}
          SetSelectedDays={SetSelectedDays}
          exit={handleExit}
          //info.planed 배열 필터로 교체하는 함수 추가.
        />
      )}
      {/* 기본    -1 */}
      <Wrapper>
        {/*
        {progressNum === -1 && (
          <MypageHeader back={true} title={'진행 프로젝트'} />
        )}
        {progressNum !== -1 && (
          <MypageHeader
            exitBtn={true}
            title={'진행 프로젝트'}
            handleOnClick={handleXbtn}
          />
        )}
        <TopBox
          className={'progress'}
          open={open}
          setOpen={setOpen}
          handleClick={openHeader}
        /> */}
        {progressNum === -1 && (
          <ProgressBody
            dateArr={dateArr}
            setDateArr={setDateArr}
            toggleOpen={toggleOpen}
            setToggleOpen={setToggleOpen}
            presentProgress={info.state}
            progressNum={progressNum}
            setProgressNum={setProgressNum}
            state={badgeState}
            planed = {info.planed}
          />
        )}
        {/* 64 ~ 93 여기까지가 기본 페이지 */}



        {/* 준비, 설치, 검수, 완료 토글 된거 눌렀을때 */}
        {progressNum === 1 && (
          <Reusable
            textOne={'공사 준비가 완료되었습니다.'}
            textTwo={'공사 준비를 진행해주세요.'}
            textThree={'충전기 및 부속품 준비'}
            textFour={'설계 및 공사계획 신고 등'}
            btnText={'준비 완료하기'}
            setBadgeState={setBadgeState}
            setData={setData}
            fin={info.state > progressNum? true : false }
            //setFin={setFin}
          />
        )}
        {progressNum === 2 && (
          <Reusable
            textOne={'충전기를 설치, 시운전이 완료되었습니다'}
            textTwo={'충전기 설치, 시운전을 진행해주세요.'}
            textThree={'충전기 설치 및 배선작업'}
            textFour={'충전기 시운전(자체 테스트)'}
            btnText={'설치 완료하기'}
            setBadgeState={setBadgeState}
            setData ={setData}
            fin={info.state > progressNum? true : false }
           // setFin={setFin}
          />
        )}
        {progressNum === 3 && (
          <Reusable
            textOne={'충전기 검수가 완료되었습니다'}
            textTwo={'충전기 검수를 진행해주세요.'}
            textThree={'검수 및 전기차 충전 테스트 (고객 참관)'}
            textFour={'한전 계량기 봉인'}
            btnText={'검수 완료하기'}
            setBadgeState={setBadgeState}
            setData ={setData}
            fin={info.state > progressNum? true : false }
           // setFin={setFin}
          />
        )}
        {/* {progressNum === 4 && (
          <Reusable
            textOne={false}
            textTwo={'프로젝트를 완료해주세요.'}
            textThree={'사용 전 검사 및 점검'}
            textFour={'신고 및 사용 승인'}
            textFive={'완료현장 사진 기록'}
            beforeFinish={true}
            btnText={'프로젝트 완료하기'}
          />
        )} */}
        {progressNum === 4 && (
          <Reusable
            textOne={'프로젝트 완료 진행중입니다.'}
            textTwo={'프로젝트를 완료해주세요.'}
            textThree={'사용 전 검사 및 점검'}
            textFour={'신고 및 사용 승인'}
            textFive={'완료현장 사진 기록'}
            almostFinish={info.state > progressNum? true : false}
            beforeFinish={info.state > progressNum? true : false}
            btnText={'프로젝트 완료하기'}
            setBadgeState={setBadgeState}
            setData ={setData}
            fin={ info.state > progressNum? true : false }
           // setFin={setFin}
          />
        )}
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  .progress {
    margin-top: 4.5pt;
  }
`;

export default Progress;
