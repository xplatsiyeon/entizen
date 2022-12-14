import styled from '@emotion/styled';
import MessageBox from 'componentsCompany/Mypage/MessageBox';
import Image from 'next/image';
import { Data } from 'pages/company/mypage/runningProgress';
import { useEffect, useLayoutEffect, useState } from 'react';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import progressCircle from 'public/images/progressCircle.png';
import progressBlueCircle from 'public/images/progressBlueCircle.png';
import UpArrow from 'public/images/smallUpArrow.png';
import DownArrow from 'public/images/smallDownArrow.png';
import icon_chats from 'public/images/icon_chats.png';
import colors from 'styles/colors';
import ClientProjectModal from './ClientProjectModal';
import {
  Contract,
  GET_contract,
  InProgressProjectsDetailResponse,
  UnConsentProjectDateChangeHistories,
} from 'QueryComponents/CompanyQuery';
import { changeDataFn } from 'utils/calculatePackage';
import {
  ApolloQueryResult,
  OperationVariables,
  useQuery,
} from '@apollo/client';
import { isTokenPatchApi, isTokenPostApi } from 'api';
import { useMutation } from 'react-query';
import Loader from 'components/Loader';
import { useRouter } from 'next/router';
import CommunicationBox from 'components/CommunicationBox';
import { height } from '@mui/system';

type Props = {
  data: InProgressProjectsDetailResponse;
  // info: Data;
  // page: string;
  badge: string;
  projectRefetch: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<InProgressProjectsDetailResponse>>;
};

const ClientProgress = ({ data, badge, projectRefetch }: Props) => {
  // const presentProgress = info.state;
  const router = useRouter();
  const routerId = router?.query?.projectIdx!;
  let textArr;
  let initToggle;

  // 실시간 width 받아옴
  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);
  // 실시간으로 width 받아오는 함수
  const handleResize = () => {
    setNowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nowWidth]);

  switch (badge) {
    case '계약대기':
      textArr = [
        '공사 준비가 진행됩니다.',
        '충전기를 설치, 시운전이 진행됩니다.',
        '충전기 검수를 진행됩니다!',
        '프로젝트를 완료됩니다!',
      ];
      initToggle = [false, false, false, false, false];
      break;

    case '준비 중':
      textArr = [
        '공사 준비가 진행됩니다.',
        '충전기를 설치, 시운전이 진행됩니다.',
        '충전기 검수가 진행됩니다!',
        '곧 프로젝트가 완료됩니다!',
      ];

      initToggle = [false, true, false, false, false];
      break;

    case '설치 중':
      textArr = [
        '공사 준비가 완료되었습니다!.',
        '충전기를 설치, 시운전이 진행됩니다.',
        '충전기 검수가 진행됩니다!',
        '곧 프로젝트가 완료됩니다!',
      ];

      initToggle = [false, false, true, false, false];
      break;

    case '검수 중':
      textArr = [
        '공사 준비가 완료되었습니다!',
        '충전기를 설치, 시운전이 완료되었습니다!',
        '충전기 검수가 진행됩니다.',
        '프로젝트를 완료해주세요',
      ];

      initToggle = [false, false, false, true, false];
      break;

    case '완료 중':
      textArr = [
        '공사 준비가 완료되었습니다!',
        '충전기를 설치, 시운전이 완료되었습니다!',
        '충전기 검수가 완료되었습니다!',
        '곧 프로젝트가 완료됩니다!',
      ];

      initToggle = [false, false, false, false, true];

      break;

    case '완료 대기':
      textArr = [
        '공사 준비가 완료되었습니다!',
        '충전기를 설치, 시운전이 완료되었습니다!',
        '충전기 검수가 완료되었습니다!',
        '프로젝트 완료에 동의해주세요!',
      ];

      initToggle = [false, false, false, false, true];

      break;

    default:
      textArr = [
        '공사 준비가 진행됩니다.',
        '충전기를 설치, 시운전이 진행됩니다.',
        '충전기 검수를 진행됩니다!',
        '프로젝트를 완료됩니다!',
      ];

      initToggle = [false, false, false, false, false];
  }

  type ModalType = 'finish' | 'change';

  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalInfo, setModalInfo] =
    useState<UnConsentProjectDateChangeHistories>();
  // const [modalType, setModalType] = useState<ModalType>('change');
  const [modalType, setModalType] = useState<ModalType>('change');
  const [toggleOpen, setToggleOpen] = useState<boolean[]>(initToggle);

  // -----진행중인 프로젝트 상세 리스트 api-----
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  const {
    loading: contractLoading,
    error: contractError,
    data: contractData,
  } = useQuery<Contract>(GET_contract, {
    variables: {
      projectIdx: router?.query?.projectIdx!,
    },
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    },
  });

  // 일자 변경 동의
  const { mutate: dataChangeMutate, isLoading: dataChangeLoading } =
    useMutation(isTokenPatchApi, {
      onSuccess: () => {
        setIsModal(false);
        projectRefetch();
      },
      onError: (error: any) => {
        console.log('날짜 변경 에러 발생');
        console.log(error);
      },
    });

  // 완료 버튼
  const { mutate: CompleteMutate, isLoading: CompleteLoading } = useMutation(
    isTokenPostApi,
    {
      onSuccess: () => {
        setIsModal(false);
        router.push({
          pathname: '/mypage/project/finish',
          query: {
            projectIdx: routerId,
          },
        });
      },
      onError: (error: any) => {
        console.log('수락 버튼 에러');
        console.log(error);
      },
    },
  );

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

  // 계약서 보기 버튼 클릭
  const onClickContract = () => {
    if (contractData) {
      router.push({
        pathname: '/contract',
        query: {
          id: router?.query?.projectIdx,
          documentId: contractData?.project?.contract?.documentId,
        },
      });
    }
  };

  // 유저 날짜 동의하기
  const onClickChangeData = () => {
    console.log('🔥 ~ line 166 유저 날짜 동의 버튼');
    if (modalInfo?.projectDateChangeHistoryIdx) {
      dataChangeMutate({
        url: `/projects/${modalInfo?.projectIdx}/goal-date/${modalInfo?.projectDateChangeHistoryIdx}/agreement`,
      });
    }
  };
  // 유저 프로젝트 완료 동의 모달
  const onClickCompleteBtn = () => {
    console.log('🔥 ~ line 176 유저 프로젝트 완료 모달');
    if (data?.project?.projectIdx) {
      CompleteMutate({
        url: `/projects/${data?.project?.projectIdx}/step/completion`,
      });
    }
  };
  // 일정 변경 모달 관련 상태관리
  useEffect(() => {
    if (data?.project) {
      const {
        completionStepGoalDate,
        installationStepGoalDate,
        examStepGoalDate,
        readyStepGoalDate,
        unConsentProjectDateChangeHistories,
      } = data?.project;

      if (readyStepGoalDate === 'CHANGING') {
        const target = unConsentProjectDateChangeHistories.filter(
          (el) => el.changedStep === 'READY' && el.processingStatus === false,
        );
        setModalInfo(target[0]);
        // setIsModal(true);
        setModalType('change');
      } else if (installationStepGoalDate === 'CHANGING') {
        const target = unConsentProjectDateChangeHistories.filter(
          (el) =>
            el.changedStep === 'INSTALLATION' && el.processingStatus === false,
        );
        setModalInfo(target[0]);
        // setIsModal(true);
        setModalType('change');
      } else if (examStepGoalDate === 'CHANGING') {
        const target = unConsentProjectDateChangeHistories.filter(
          (el) => el.changedStep === 'EXAM' && el.processingStatus === false,
        );
        setModalInfo(target[0]);
        // setIsModal(true);
        setModalType('change');
      } else if (completionStepGoalDate === 'CHANGING') {
        const target = unConsentProjectDateChangeHistories.filter(
          (el) =>
            el.changedStep === 'COMPLETION' && el.processingStatus === false,
        );
        setModalInfo(target[0]);
        // setIsModal(true);
        setModalType('change');
      }
    }
  }, [data]);

  console.log('⭐️ 계약서 데이터 확인 ~line 315 ');
  console.log(data);

  if (dataChangeLoading || contractLoading || CompleteLoading) {
    return <Loader />;
  }

  return (
    <Wrapper0>
      <DoubleArrowBox>
        <Image src={DoubleArrow} alt="doubleArrow" />
      </DoubleArrowBox>
      <Wrapper>
        {/* 계약 단계 */}
        <FlexBox margin={toggleOpen[0]}>
          <div>
            <CircleImgBox>
              <Image
                src={
                  data?.project?.badge === '계약대기' &&
                  data?.project?.isCompletedContractStep === 'IN_PROGRESS'
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
            <ContractBtnBox>
              {data?.project?.badge === '계약대기' &&
              data?.project?.isCompletedContractStep === 'NOT_STARTED' ? (
                <YetP presentProgress={data?.project?.badge === '계약대기'}>
                  계약서 작성중...
                </YetP>
              ) : (
                <ClientP
                  presentProgress={
                    data?.project?.badge === '계약대기' &&
                    data?.project?.isCompletedContractStep === 'IN_PROGRESS'
                      ? true
                      : false
                  }
                  onClick={onClickContract}
                >
                  계약서 보기
                </ClientP>
              )}
            </ContractBtnBox>
          )}
        </FlexBox>
        {/* 준비 단계 */}
        <FlexBox>
          <div>
            <CircleImgBox className="topCircle">
              <Image
                src={
                  data?.project?.badge === '준비 중'
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
                  onClick={() => {
                    if (data?.project?.readyStepGoalDate === 'CHANGING') {
                      setIsModal(true);
                    }
                  }}
                  changeDate={data?.project?.readyStepGoalDate}
                >
                  {data?.project?.readyStepGoalDate === 'CHANGING'
                    ? '목표일 변경 중'
                    : changeDataFn(
                        data?.project?.readyStepCompletionDate
                          ? data?.project?.readyStepCompletionDate
                          : data?.project?.readyStepGoalDate,
                      )}
                </PickedDate>
              ) : (
                <SetDate id="prepareDate">목표일 입력중 ...</SetDate>
              )}
            </InsideFlex>
          </div>
          {/* 펼쳐지는 부분 */}
          {toggleOpen[1] && (
            <ToggleWrapper>
              <MessageBox
                presentProgress={
                  data?.project?.badge === '준비 중' ? true : false
                }
                title={textArr[0]}
                firstText={'충전기 및 부속품 준비'}
                secondText={'설계 및 공사계획 신고 등'}
                page={'client'}
              />
            </ToggleWrapper>
          )}
        </FlexBox>
        {/* 설치 단계 */}
        <FlexBox>
          <div>
            <CircleImgBox>
              <Image
                src={
                  data?.project?.badge === '설치 중'
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
                  onClick={() => {
                    if (
                      data?.project?.installationStepGoalDate === 'CHANGING'
                    ) {
                      setIsModal(true);
                    }
                  }}
                  changeDate={data?.project?.installationStepGoalDate}
                >
                  {data?.project?.installationStepGoalDate === 'CHANGING'
                    ? '목표일 변경 중'
                    : changeDataFn(
                        data?.project?.installationStepCompletionDate
                          ? data?.project?.installationStepCompletionDate
                          : data?.project?.installationStepGoalDate,
                      )}
                </PickedDate>
              ) : (
                <SetDate id="prepareDate">목표일 입력중 ...</SetDate>
              )}
            </InsideFlex>
          </div>
          {/* 펼쳐지는 부분 */}
          {toggleOpen[2] && (
            <ToggleWrapper>
              <MessageBox
                presentProgress={
                  data?.project?.badge === '설치 중' ? true : false
                }
                title={textArr[1]}
                firstText={'충전기 설치 및 배선작업'}
                secondText={'충전기 시운전 (자체 테스트)'}
                page={'client'}
              />
            </ToggleWrapper>
          )}
        </FlexBox>
        {/* 검수 단계 */}
        <FlexBox>
          <div>
            <CircleImgBox>
              <Image
                src={
                  data?.project?.badge === '검수 중'
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
                  onClick={() => {
                    if (data?.project?.examStepGoalDate === 'CHANGING') {
                      setIsModal(true);
                    }
                  }}
                  changeDate={data?.project?.examStepGoalDate}
                >
                  {data?.project?.examStepGoalDate === 'CHANGING'
                    ? '변경 중'
                    : changeDataFn(
                        data?.project?.examStepCompletionDate
                          ? data?.project?.examStepCompletionDate
                          : data?.project?.examStepGoalDate,
                      )}
                </PickedDate>
              ) : (
                <SetDate id="prepareDate">목표일 입력중 ...</SetDate>
              )}
            </InsideFlex>
          </div>
          {/* 펼쳐지는 부분 */}
          {toggleOpen[3] && (
            <ToggleWrapper>
              <MessageBox
                presentProgress={
                  data?.project?.badge === '검수 중' ? true : false
                }
                title={textArr[2]}
                firstText={'검수 및 전기차 충전 테스트 (고객 참관)'}
                secondText={'한전 계량기 봉인'}
                page={'client'}
              />
            </ToggleWrapper>
          )}
        </FlexBox>
        {/* 완료 단계 */}
        <FlexBox>
          <div>
            <CircleImgBox>
              <Image
                className="bottomCircle"
                src={
                  data?.project?.badge === '완료 중' ||
                  data?.project?.badge === '완료 대기'
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
                  onClick={() => {
                    if (data?.project?.completionStepGoalDate === 'CHANGING') {
                      setIsModal(true);
                    }
                  }}
                  changeDate={data?.project?.completionStepGoalDate}
                >
                  {data?.project?.completionStepGoalDate === 'CHANGING'
                    ? '변경 중'
                    : changeDataFn(
                        data?.project?.completionStepCompletionDate
                          ? data?.project?.completionStepCompletionDate
                          : data?.project?.completionStepGoalDate,
                      )}
                </PickedDate>
              ) : (
                <SetDate id="prepareDate">목표일 입력중 ...</SetDate>
              )}
            </InsideFlex>
          </div>
          {/* 펼쳐지는 부분 */}
          {toggleOpen[4] && (
            <ToggleWrapper className="lastBox">
              <MessageBox
                presentProgress={
                  data?.project?.badge === '완료 중' ||
                  data?.project?.badge === '완료 대기'
                    ? true
                    : false
                }
                title={textArr[3]}
                firstText={'사용 전 검사 및 점검'}
                secondText={'신고 및 사용 승인'}
                thirdText={'완료현장 사진 기록'}
                page={'client'}
                complete={data?.project?.isCompletedCompletionStep!}
                file={data?.project?.projectCompletionFiles!}
              />
            </ToggleWrapper>
          )}
        </FlexBox>
        <Line
          lineHeight={toggleOpen[4]}
          height={badge === '완료 대기' ? 330 : 130.5}
          webHeight={badge === '완료 대기' && nowWidth > 1200 ? 410 : 130.5}
        ></Line>
      </Wrapper>
      {data?.project?.isCompletedCompletionStep ? (
        <WebFinButton
          onClick={() => {
            setIsModal(true);
            setModalType('finish');
          }}
        >
          <span>프로젝트 완료 동의하기</span>
        </WebFinButton>
      ) : null}
      <ButtonBox>
        <CommunicationBox
          text="파트너와 소통하기"
          id={data?.project?.companyMember?.memberIdx}
        />
      </ButtonBox>
      {data?.project?.isCompletedCompletionStep ? (
        <FinButton
          onClick={() => {
            setIsModal(true);
            setModalType('finish');
          }}
        >
          <span>프로젝트 완료 동의하기</span>
        </FinButton>
      ) : null}
      {/* 완료 동의하기 모달창  */}
      {isModal && (
        <ClientProjectModal
          setIsModal={setIsModal}
          type={modalType}
          changeData={modalInfo}
          data={data}
          onClickChangeData={onClickChangeData}
          onClickCompleteData={onClickCompleteBtn}
        />
      )}
    </Wrapper0>
  );
};

export default ClientProgress;

const Wrapper0 = styled.div`
  .progress {
    margin-top: 4.5pt;
  }
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
  margin-bottom: ${({ margin }) => (margin ? 24 : 30)}pt;
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
  cursor: pointer;
  & :first-of-type {
    position: relative;
    font-family: 'Spoqa Han Sans Neo';
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

const SetDate = styled.div`
  padding: 4.5pt 7.5pt;
  border: 1px solid #e2e5ed;

  border-radius: 6pt;
  color: #a6a9b0;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 9pt !important;
  font-weight: 500;
  line-height: 9pt !important;
  letter-spacing: -0.02em;
  text-align: left;
`;

const PickedDate = styled.div<{ changeDate: string }>`
  padding: 4.5pt 7.5pt;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 9pt;
  font-weight: 500;
  line-height: 9pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: ${(props) => {
    return props.color;
  }};
  cursor: ${({ changeDate }) => (changeDate === 'CHANGING' ? 'pointer' : '')};
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
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
    box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
    border-radius: 6pt;
    color: #a6a9b0;
  }
`;

const ClientP = styled.p<{ presentProgress: boolean }>`
  box-shadow: ${({ presentProgress }) =>
    !presentProgress && `0px 0px 10px rgba(137, 163, 201, 0.2)`};
  border: ${({ presentProgress }) => presentProgress && '1px solid #5221CB'};
  border-radius: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #222222;
  width: 100%;
  padding: 15pt 13.5pt;
  cursor: pointer;
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 15pt;
    font-weight: 700;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
`;

const YetP = styled.p<{ presentProgress: boolean }>`
  box-shadow: ${({ presentProgress }) =>
    !presentProgress && `0px 0px 10px rgba(137, 163, 201, 0.2)`};
  border: ${({ presentProgress }) => presentProgress && '1px solid #5221CB'};
  border-radius: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #a6a9b0;
  width: 100%;
  padding: 15pt 13.5pt;
`;

const ToggleWrapper = styled.div<{ presentProgress?: boolean }>`
  padding-left: 27pt;
  padding-top: 12pt;
  z-index: 10;
`;

const Line = styled.div<{
  lineHeight: boolean;
  height: number;
  webHeight: number;
}>`
  position: absolute;
  height: ${({ lineHeight, height }) =>
    lineHeight ? `calc(100% - ${height}pt)` : `calc(100% - 15pt)`};
  max-height: calc(100%-410pt);
  top: 5pt;
  left: 22.5pt;
  width: 0.25pt;
  border: 0.75pt solid silver;
  @media (min-width: 900pt) {
    height: ${({ lineHeight, webHeight }) =>
      lineHeight ? `calc(100% - ${webHeight}pt)` : `calc(100% - 15pt)`};
  }
`;
const FinButton = styled.button`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 66pt;
  background: #5221cb;
  color: white;
  z-index: 10;
  > span {
    position: absolute;
    left: 50%;
    top: 15pt;
    transform: translateX(-50%);
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
  }
  @media (min-width: 900pt) {
    display: none;
  }
`;

const WebFinButton = styled.button`
  position: fixed;
  bottom: 0;
  /* width: 100%; */
  width: 526.5pt;
  height: 42pt;
  margin-left: 44pt;
  background: #5221cb;
  color: white;
  border-radius: 6pt;
  margin-top: 12pt;
  cursor: pointer;
  > span {
    left: 50%;
    top: 15pt;
    transform: translateX(-50%);
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
  }
  @media (min-width: 900pt) {
    position: static;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 900pt) {
    padding-top: 60pt;
  }
`;
