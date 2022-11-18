import styled from '@emotion/styled';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import progressCircle from 'public/images/progressCircle.png';
import progressBlueCircle from 'public/images/progressBlueCircle.png';
import UpArrow from 'public/images/smallUpArrow.png';
import DownArrow from 'public/images/smallDownArrow.png';
import MessageBox from './MessageBox';
import colors from 'styles/colors';
import { InProgressProjectsDetailResponse } from 'QueryComponents/CompanyQuery';
import { changeDataFn } from 'utils/calculatePackage';
import askDate from 'public/images/askDate.png';

type Props = {
  dateArr: boolean[];
  setDateArr: Dispatch<SetStateAction<boolean[]>>;
  toggleOpen: boolean[];
  setToggleOpen: Dispatch<SetStateAction<boolean[]>>;
  presentProgress: number;
  setProgressNum: Dispatch<SetStateAction<number>>;
  planed: string[];
  progressNum?: number;
  data: InProgressProjectsDetailResponse;
  badge: string;
};

const ProgressBody = ({
  dateArr,
  setDateArr,
  toggleOpen,
  setToggleOpen,
  presentProgress,
  setProgressNum,
  progressNum,
  // state,
  planed,
  data,
  badge,
}: Props) => {
  const [openView, setOpenView] = useState(false);

  //  펼쳐지는거 관리
  const handleToggleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    let copyArr = [...toggleOpen];
    if (e.currentTarget.id === 'contract') {
      copyArr[0] = !copyArr[0];
      setToggleOpen(copyArr);
    } else if (e.currentTarget.id === 'prepare') {
      copyArr[1] = !copyArr[1];
      setToggleOpen(copyArr);
    } else if (e.currentTarget.id === 'install') {
      copyArr[2] = !copyArr[2];
      setToggleOpen(copyArr);
    } else if (e.currentTarget.id === 'inspection') {
      copyArr[3] = !copyArr[3];
      setToggleOpen(copyArr);
    } else if (e.currentTarget.id === 'success') {
      copyArr[4] = !copyArr[4];
      setToggleOpen(copyArr);
    }
  };

  // 목표일 설정 모달창 관리
  const handleDateModal = (e: React.MouseEvent<HTMLDivElement>) => {
    let copyArr = [...dateArr];
    if (e.currentTarget.id === 'prepareDate') {
      copyArr[0] = !copyArr[0];
      setDateArr(copyArr);
    } else if (e.currentTarget.id === 'installDate') {
      copyArr[1] = !copyArr[1];
      setDateArr(copyArr);
    } else if (e.currentTarget.id === 'inspectionDate') {
      copyArr[2] = !copyArr[2];
      setDateArr(copyArr);
    } else if (e.currentTarget.id === 'successDate') {
      copyArr[3] = !copyArr[3];
      setDateArr(copyArr);
    }
  };

  const onClickContract = () => {
    // console.log('계약서 보기 뷰');
    let targetIframe = document.getElementById(
      'target-iframe',
    ) as HTMLImageElement | null;
    if (targetIframe !== null) {
      targetIframe.src =
        'https://app.modusign.co.kr/embedded-document/65e281f0-66f4-11ed-9749-d58038aac652?at=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNTZjMGFkMjAtMjUwNy0xMWVkLThhOGUtZmI5ZGE1NThjYWNjIiwicHJvZmlsZSI6eyJuYW1lIjoi7JeU7Yuw7KaMIiwiZW1haWwiOiJlbnRpemVuQGVudGl6ZW4ua3IifSwiYXV0aEJ5IjoiTE9DQUw6QVBJX0tFWSJ9LCJhdXRoQnkiOiJMT0NBTDpBUElfS0VZIiwicm9sZSI6IlVTRVIiLCJ1cmxQYXRocyI6WyIqKiJdLCJpYXQiOjE2Njg3Njk0MzksImV4cCI6MTY2ODc4MzgzOSwiYXVkIjoiYXBpLm1vZHVzaWduLmNvLmtyIiwiaXNzIjoiYXBpLm1vZHVzaWduLmNvLmtyIn0.mvXogdtKkFhjOtYNNFofnkz5FGqg91GlKHPROswU8QY&redirectUrl=https%3A%2F%2Ftest-api.entizen.kr%2F';
    }

    setOpenView(true);
  };

  let textArr;

  switch (badge) {
    case '계약 대기':
      textArr = [
        '공사 준비를 진행해주세요.',
        '충전기를 설치, 시운전을 진행해주세요',
        '충전기 검수를 진행해주세요',
        '프로젝트를 완료해주세요',
      ];
      break;
    case '준비 중':
      textArr = [
        '공사 준비를 진행해주세요.',
        '충전기를 설치, 시운전을 진행해주세요',
        '충전기 검수를 진행해주세요',
        '프로젝트를 완료해주세요',
      ];
      break;
    case '설치 중':
      textArr = [
        '공사 준비가 완료되었습니다.',
        '충전기를 설치, 시운전을 진행해주세요',
        '충전기 검수를 진행해주세요',
        '프로젝트를 완료해주세요',
      ];
      break;
    case '검수 중':
      textArr = [
        '공사 준비가 완료되었습니다.',
        '충전기를 설치, 시운전이 완료되었습니다',
        '충전기 검수를 진행해주세요',
        '프로젝트를 완료해주세요',
      ];
      break;
    case '완료 중':
      textArr = [
        '공사 준비가 완료되었습니다.',
        '충전기를 설치, 시운전이 완료되었습니다',
        '충전기 검수가 완료되었습니다',
        '프로젝트를 완료해주세요',
      ];
      break;
    case '완료 대기':
      textArr = [
        '공사 준비가 완료되었습니다.',
        '충전기를 설치, 시운전이 완료되었습니다',
        '충전기 검수가 완료되었습니다',
        '프로젝트 완료 진행중입니다',
      ];
      break;
    // 취소
    default:
      textArr = [
        '공사 준비를 진행해주세요.',
        '충전기를 설치, 시운전을 진행해주세요',
        '충전기 검수를 진행해주세요',
        '프로젝트를 완료해주세요',
      ];
  }

  return (
    <>
      {/* 계약서 문서 */}
      <Iframe id="target-iframe" openView={openView} src={''} />
      <DoubleArrowBox>
        <Image src={DoubleArrow} alt="doubleArrow" />
      </DoubleArrowBox>

      <Wrapper>
        {/* 계약 */}
        <FlexBox margin={toggleOpen[0]}>
          <div>
            <CircleImgBox>
              <Image
                src={
                  data?.project?.isCompletedCompanyMemberContractStep
                    ? progressBlueCircle
                    : progressCircle
                }
                alt="progressCircle"
                layout="fill"
              />
            </CircleImgBox>
            <InsideFlex>
              <ProgressName id="contract" onClick={handleToggleClick}>
                <div>계약</div>
                <div>
                  <Image
                    src={!toggleOpen[0] ? DownArrow : UpArrow}
                    alt="up"
                    layout="fill"
                  />
                </div>
              </ProgressName>
            </InsideFlex>
          </div>
          {/* 펼쳐지는 부분 */}
          {toggleOpen[0] && (
            <ContractBtnBox onClick={onClickContract}>
              <div>계약서 보기</div>
              {/* <div>계약서 수정</div> */}
            </ContractBtnBox>
          )}
        </FlexBox>
        {/* 준비 */}
        <FlexBox>
          <div>
            <CircleImgBox className="topCircle">
              {/* 동그라미 컬러 */}
              <Image
                src={
                  data?.project?.isCompletedCompanyMemberContractStep &&
                  !data?.project?.isCompletedReadyStep
                    ? progressBlueCircle
                    : progressCircle
                }
                alt="progressCircle"
                layout="fill"
              />
            </CircleImgBox>
            <InsideFlex>
              <ProgressName id="prepare" onClick={handleToggleClick}>
                <div>준비</div>
                <div>
                  <Image
                    src={!toggleOpen[1] ? DownArrow : UpArrow}
                    alt="up"
                    layout="fill"
                  />
                </div>
              </ProgressName>
              {data?.project?.readyStepGoalDate ? (
                <PickedDate
                  color={
                    data?.project?.isCompletedReadyStep
                      ? '#e2e5ed'
                      : colors.main
                  }
                >
                  {data?.project?.readyStepGoalDate === 'CHANGING'
                    ? '목표일 변경 중'
                    : changeDataFn(data?.project?.readyStepGoalDate)}
                </PickedDate>
              ) : (
                <SetDate id="prepareDate" onClick={handleDateModal}>
                  목표일
                  <ImageWrap>
                    <Image src={askDate} layout="fill" />
                  </ImageWrap>
                </SetDate>
              )}
            </InsideFlex>
          </div>
          {/* 펼쳐지는 부분 */}
          {toggleOpen[1] && (
            <ToggleWrapper>
              <MessageBox
                handleClick={() => setProgressNum(1)}
                presentProgress={
                  data?.project?.isCompletedCompanyMemberContractStep &&
                  !data?.project?.isCompletedReadyStep
                    ? true
                    : false
                }
                title={textArr[0]}
                firstText={'충전기 및 부속품 준비'}
                secondText={'설계 및 공사계획 신고 등'}
              />
            </ToggleWrapper>
          )}
        </FlexBox>
        {/* 설치 */}
        <FlexBox>
          <div>
            <CircleImgBox>
              {/* 동그라미 */}
              <Image
                src={
                  data?.project?.isCompletedReadyStep &&
                  !data?.project?.isCompletedInstallationStep
                    ? progressBlueCircle
                    : progressCircle
                }
                alt="progressCircle"
                layout="fill"
              />
            </CircleImgBox>
            <InsideFlex>
              <ProgressName id="install" onClick={handleToggleClick}>
                <div>설치</div>
                <div>
                  <Image
                    src={!toggleOpen[2] ? DownArrow : UpArrow}
                    alt="up"
                    layout="fill"
                  />
                </div>
              </ProgressName>
              {data?.project?.installationStepGoalDate ? (
                <PickedDate
                  color={
                    data?.project?.isCompletedInstallationStep
                      ? '#e2e5ed'
                      : colors.main
                  }
                >
                  {data?.project?.installationStepGoalDate === 'CHANGING'
                    ? '변경 중'
                    : changeDataFn(data?.project?.installationStepGoalDate)}
                </PickedDate>
              ) : (
                <SetDate id="installDate" onClick={handleDateModal}>
                  목표일
                  <ImageWrap>
                    <Image src={askDate} layout="fill" />
                  </ImageWrap>
                </SetDate>
              )}
            </InsideFlex>
          </div>
          {/* 펼쳐지는 부분 */}
          {toggleOpen[2] && (
            <ToggleWrapper>
              <MessageBox
                handleClick={() => setProgressNum(2)}
                presentProgress={
                  data?.project?.isCompletedReadyStep &&
                  !data?.project?.isCompletedInstallationStep
                    ? true
                    : false
                }
                title={textArr[1]}
                firstText={'충전기 설치 및 배선작업'}
                secondText={'충전기 시운전 (자체 테스트)'}
              />
            </ToggleWrapper>
          )}
        </FlexBox>
        {/* 검수 */}
        <FlexBox>
          <div>
            <CircleImgBox>
              {/* 동그라미 컬러 */}
              <Image
                src={
                  data?.project?.isCompletedInstallationStep &&
                  !data?.project?.isCompletedExamStep
                    ? progressBlueCircle
                    : progressCircle
                }
                alt="progressCircle"
                layout="fill"
              />
            </CircleImgBox>
            <InsideFlex>
              <ProgressName id="inspection" onClick={handleToggleClick}>
                <div>검수</div>
                <div>
                  <Image
                    src={!toggleOpen[3] ? DownArrow : UpArrow}
                    alt="up"
                    layout="fill"
                  />
                </div>
              </ProgressName>
              {data?.project?.examStepGoalDate ? (
                <PickedDate
                  color={
                    data?.project?.isCompletedExamStep ? '#e2e5ed' : colors.main
                  }
                >
                  {data?.project?.examStepGoalDate === 'CHANGING'
                    ? '변경 중'
                    : changeDataFn(data?.project?.examStepGoalDate)}
                </PickedDate>
              ) : (
                <SetDate id="inspectionDate" onClick={handleDateModal}>
                  목표일
                  <ImageWrap>
                    <Image src={askDate} layout="fill" />
                  </ImageWrap>
                </SetDate>
              )}
            </InsideFlex>
          </div>
          {/* 펼쳐지는 부분 */}
          {toggleOpen[3] && (
            <ToggleWrapper>
              <MessageBox
                handleClick={() => setProgressNum(3)}
                presentProgress={
                  data?.project?.isCompletedInstallationStep &&
                  !data?.project?.isCompletedExamStep
                    ? true
                    : false
                }
                title={textArr[2]}
                firstText={'검수 및 전기차 충전 테스트 (고객 참관)'}
                secondText={'한전 계량기 봉인'}
              />
            </ToggleWrapper>
          )}
        </FlexBox>
        {/* 완료 */}
        <FlexBox>
          <div>
            <CircleImgBox>
              {/* 동그라미 컬러 */}
              <Image
                className="bottomCircle"
                src={
                  data?.project?.isCompletedExamStep
                    ? progressBlueCircle
                    : progressCircle
                }
                alt="progressCircle"
                layout="fill"
              />
            </CircleImgBox>
            <InsideFlex>
              <ProgressName id="success" onClick={handleToggleClick}>
                <div>완료</div>
                <div>
                  <Image
                    src={!toggleOpen[4] ? DownArrow : UpArrow}
                    alt="up"
                    layout="fill"
                  />
                </div>
              </ProgressName>
              {data?.project?.completionStepGoalDate ? (
                <PickedDate
                  color={
                    data?.project?.isCompletedExamStep ? colors.main : '#e2e5ed'
                  }
                >
                  {data?.project?.completionStepGoalDate === 'CHANGING'
                    ? '변경 중'
                    : changeDataFn(data?.project?.completionStepGoalDate)}
                </PickedDate>
              ) : (
                <SetDate id="successDate" onClick={handleDateModal}>
                  목표일
                  <ImageWrap>
                    <Image src={askDate} layout="fill" />
                  </ImageWrap>
                </SetDate>
              )}
            </InsideFlex>
          </div>
          {/* 펼쳐지는 부분 */}
          {toggleOpen[4] && (
            <ToggleWrapper className="lastBox">
              <MessageBox
                handleClick={() => setProgressNum(4)}
                presentProgress={
                  data?.project?.isCompletedExamStep &&
                  !data?.project?.isCompletedCompletionStep
                    ? true
                    : false
                }
                title={textArr[3]}
                firstText={'사용 전 검사 및 점검'}
                secondText={'신고 및 사용 승인'}
                thirdText={'완료현장 사진 기록'}
              />
            </ToggleWrapper>
          )}
        </FlexBox>
        <Line lineHeight={toggleOpen[4]}></Line>
      </Wrapper>
    </>
  );
};

const Iframe = styled.iframe<{ openView: boolean }>`
  /* background-color: red; */

  display: ${({ openView }) => openView === false && 'none'};
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  bottom: 0%;
  z-index: 999;
`;

const Wrapper = styled.div`
  position: relative;
  padding-left: 15pt;
  padding-right: 15pt;
`;

const DoubleArrowBox = styled.div`
  margin: 21pt auto 24pt auto;
  width: 24pt;
  height: 24pt;
`;

const CircleImgBox = styled.div`
  width: 18pt;
  height: 18pt;
  position: relative;
  z-index: 10;
`;

const FlexBox = styled.div<{ margin?: boolean }>`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-bottom: ${({ margin }) => (margin ? 24 : 22.5)}pt;
  & > div {
    display: flex;
    align-items: center;
    gap: 7.75pt;
  }
`;

const ProgressName = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 3pt;
  & :first-of-type {
    position: relative;
    font-family: Spoqa Han Sans Neo;
    top: 1.3pt;
    font-size: 15pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
  }
  & :nth-of-type(2) {
    width: 12pt !important;
    height: 12pt !important;
    position: relative;
  }
`;

const InsideFlex = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

const ImageWrap = styled.div`
  width: 93pt;
  height: 22.5pt;
  position: absolute;
  top: -100%;
  right: 0;
  transform: translateY(-3.5pt);
`;

const SetDate = styled.div`
  padding: 4.5pt 7.5pt;
  border: 1px solid #e2e5ed;
  position: relative;

  border-radius: 6pt;
  color: #a6a9b0;
  font-family: Spoqa Han Sans Neo;
  font-size: 9pt !important;
  font-weight: 500;
  line-height: 9pt !important;
  letter-spacing: -0.02em;
  text-align: left;
`;

const PickedDate = styled.div`
  padding: 4.5pt 7.5pt;
  font-family: Spoqa Han Sans Neo;
  font-size: 9pt;
  font-weight: 500;
  line-height: 9pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: ${(props) => {
    console.log(props);
    return props.color;
  }};
  border: 1px solid ${(props) => props.color};
  border-radius: 6pt;
`;

const ContractBtnBox = styled.div`
  display: flex;
  gap: 11.625pt;
  padding-top: 12pt;
  padding-left: 27pt;
  & div {
    display: flex;
    justify-content: center;
    padding-top: 15pt;
    padding-bottom: 15pt;
    width: 100%;
    font-family: Spoqa Han Sans Neo;
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
    box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
    border-radius: 6pt;
    color: #a6a9b0;
    cursor: pointer;
  }
`;

const ToggleWrapper = styled.div<{ presentProgress?: boolean }>`
  padding-left: 27pt;
  padding-top: 12pt;
  position: relative;
  z-index: 100;
`;

const Line = styled.div<{ lineHeight: boolean }>`
  position: absolute;
  height: ${({ lineHeight }) =>
    lineHeight ? `calc(100% - 110pt)` : `calc(100% - 15pt)`};

  top: 5pt;
  left: 22.5pt;
  width: 0.25pt;
  border: 0.75pt solid silver;
`;

export default ProgressBody;
