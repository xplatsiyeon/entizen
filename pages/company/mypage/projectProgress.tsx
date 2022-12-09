import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import styled from '@emotion/styled';
import MypageHeader from 'components/mypage/request/header';
import DateModal from 'componentsCompany/Modal/DateModal';
import ProgressBody from 'componentsCompany/Mypage/ProgressBody';
import Reusable from 'componentsCompany/Mypage/Reusable';
import { InProgressProjectsDetailResponse } from 'QueryComponents/CompanyQuery';
import React, { useEffect, useState } from 'react';
import { Data } from './runningProgress';

type Props = {
  data?: InProgressProjectsDetailResponse;
  info: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
  inProgressRefetch: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<InProgressProjectsDetailResponse>>;
};

const stepTypeType = ['READY', 'INSTALLATION', 'EXAM', 'COMPLETION'];
const Progress = ({ data, info, setData, inProgressRefetch }: Props) => {


  let initToggle;

  switch (data?.project?.badge) {
    case '계약대기':
      initToggle = [false, false, false, false, false];
      break;
    case '준비 중':
      initToggle = [false, true, false, false, false];
      break;
    case '설치 중':
      initToggle = [false, false, true, false, false];
      break;
    case '검수 중':
      initToggle = [false, false, false, true, false];
      break;
    case '완료 중':
      initToggle = [false, false, false, false, true];
      break;
    case '완료대기':
      initToggle = [false, false, false, false, true];
      break;
    // 취소
    default:
      initToggle = [false, false, false, false, false];
  }

  // 선택 날짜 관련
  const [selectedDays, SetSelectedDays] = useState<string>('');
  // 달력모달 관련
  const [dateArr, setDateArr] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [toggleOpen, setToggleOpen] = useState<boolean[]>(initToggle);
  const [dateOn, setDateOn] = useState<boolean[]>([false, false, false, false]);

  // 토글 된 박스 클릭하면 모달창으로 보여줌 ( 준비 , 검수, 등등 ...)
  const [progressNum, setProgressNum] = useState<number>(-1);

  // 달력 모달 켜고 끄고
  const handleExit = () => {
    let copyArr = [...dateOn];
    let find = dateOn.indexOf(true);
    copyArr[find] = false;
    setDateArr(copyArr);
  };

  useEffect(() => {
    console.log('🔥 ~ line 58 ~ 달력 모달 dateOn 데이트 확인');
    console.log(dateArr);
  }, [dateArr]);

  return (
    <>
      {/* 목표일 설정 */}
      {dateArr.indexOf(true) !== -1 && (
        <DateModal
          selectedDays={selectedDays}
          SetSelectedDays={SetSelectedDays}
          exit={handleExit}
          stepType={stepTypeType[dateArr.indexOf(true)]}
          inProgressRefetch={inProgressRefetch}
          //info.planed 배열 필터로 교체하는 함수 추가.
        />
      )}
      {/* 기본    -1 */}
      <Wrapper>
        {progressNum !== -1 ? (
          <HeaderWrap>
            <MypageHeader
              exitBtn={true}
              title={'진행 프로젝트'}
              handleOnClick={() => setProgressNum(-1)}
            />
          </HeaderWrap>
        ) : null}

        {progressNum === -1 && (
          <ProgressBody
            dateArr={dateArr}
            setDateArr={setDateArr}
            toggleOpen={toggleOpen}
            setToggleOpen={setToggleOpen}
            presentProgress={info.state}
            progressNum={progressNum}
            setProgressNum={setProgressNum}
            badge={data?.project?.badge!}
            planed={info.planed}
            data={data!}
          />
        )}
        {/* 64 ~ 93 여기까지가 기본 페이지 */}
        {/* 준비, 설치, 검수, 완료 토글 된거 눌렀을때 */}
        {progressNum === 1 && (
          <Reusable
            type={'READY'}
            textOne={'공사 준비가 완료되었습니다.'}
            textTwo={'공사 준비를 진행해주세요.'}
            textThree={'충전기 및 부속품 준비'}
            textFour={'설계 및 공사계획 신고 등'}
            btnText={'준비 완료하기'}
            fin={data?.project?.isCompletedReadyStep!}
            preStepState={
              data?.project?.isCompletedContractStep! === 'COMPLETION'
            }
            data={data!}
            inProgressRefetch={inProgressRefetch}
            planed={data?.project?.readyStepGoalDate!}
            CompletionDate={data?.project?.readyStepCompletionDate!}
            stepType={stepTypeType[progressNum - 1]}
            setProgressNum={setProgressNum}
          />
        )}
        {progressNum === 2 && (
          <Reusable
            type={'INSTALLATION'}
            textOne={'충전기를 설치, 시운전이 완료되었습니다'}
            textTwo={'충전기 설치, 시운전을 진행해주세요.'}
            textThree={'충전기 설치 및 배선작업'}
            textFour={'충전기 시운전(자체 테스트)'}
            btnText={'설치 완료하기'}
            fin={data?.project?.isCompletedInstallationStep!}
            preStepState={data?.project?.isCompletedReadyStep!}
            data={data!}
            inProgressRefetch={inProgressRefetch}
            planed={data?.project?.installationStepGoalDate!}
            CompletionDate={data?.project?.installationStepCompletionDate!}
            stepType={stepTypeType[progressNum - 1]}
            setProgressNum={setProgressNum}
          />
        )}
        {progressNum === 3 && (
          <Reusable
            type={'EXAM'}
            textOne={'충전기 검수가 완료되었습니다'}
            textTwo={'충전기 검수를 진행해주세요.'}
            textThree={'검수 및 전기차 충전 테스트 (고객 참관)'}
            textFour={'한전 계량기 봉인'}
            btnText={'검수 완료하기'}
            fin={data?.project?.isCompletedExamStep!}
            preStepState={data?.project?.isCompletedInstallationStep!}
            data={data!}
            inProgressRefetch={inProgressRefetch}
            planed={data?.project?.examStepGoalDate!}
            CompletionDate={data?.project?.examStepCompletionDate!}
            stepType={stepTypeType[progressNum - 1]}
            setProgressNum={setProgressNum}
          />
        )}
        {progressNum === 4 && (
          <Reusable
            type={'COMPLETION'}
            textOne={'프로젝트 완료 진행중입니다.'}
            textTwo={'프로젝트를 완료해주세요.'}
            textThree={'사용 전 검사 및 점검'}
            textFour={'신고 및 사용 승인'}
            textFive={'완료현장 사진 기록'}
            almostFinish={data?.project?.isCompletedCompletionStep!}
            preStepState={data?.project?.isCompletedInstallationStep!}
            finalStep={true}
            btnText={'프로젝트 완료하기'}
            fin={data?.project?.isCompletedCompletionStep!}
            data={data!}
            inProgressRefetch={inProgressRefetch}
            planed={data?.project?.completionStepGoalDate!}
            CompletionDate={data?.project?.completionStepCompletionDate!!}
            stepType={stepTypeType[progressNum - 1]}
            setProgressNum={setProgressNum}
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

const HeaderWrap = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 5;
  background-color: white;
`;

export default Progress;
