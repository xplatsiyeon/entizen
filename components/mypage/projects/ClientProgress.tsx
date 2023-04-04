import styled from '@emotion/styled';
import MessageBox from 'componentsCompany/Mypage/MessageBox';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import progressCircle from 'public/images/progressCircle.png';
import progressBlueCircle from 'public/images/progressBlueCircle.png';
import UpArrow from 'public/images/smallUpArrow.png';
import DownArrow from 'public/images/smallDownArrow.png';
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
import { useQuery as reactQuery } from 'react-query';
import { isTokenPatchApi, isTokenPostApi } from 'api';
import { useMutation } from 'react-query';
import Loader from 'components/Loader';
import { useRouter } from 'next/router';
import CommunicationBox from 'components/CommunicationBox';
import { getDocument } from 'api/getDocument';
import useCreateChatting from 'hooks/useCreateChatting';
import { JwtTokenType } from 'pages/signin';
import jwt_decode from 'jwt-decode';
import { fileDownLoad } from 'componentsCompany/Mypage/ProgressBody';
import { fileDownload } from 'bridge/appToWeb';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

type Props = {
  data: InProgressProjectsDetailResponse;
  // info: Data;
  // page: string;
  badge: string;
  projectRefetch: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<InProgressProjectsDetailResponse>>;
};

export interface SelfContract {
  originalName: string;
  size: number;
  type: string;
  url: string;
}

const ClientProgress = ({ data, badge, projectRefetch }: Props) => {
  // const presentProgress = info.state;
  const router = useRouter();
  const routerId = router?.query?.projectIdx!;
  const memberType = JSON.parse(sessionStorage?.getItem('MEMBER_TYPE')!);

  const contractContent: SelfContract[] =
    data?.project?.contract &&
    JSON.parse(data?.project?.contract?.contractContent!);

  let textArr;
  let initToggle;

  // 실시간 width 받아옴
  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);
  // 실시간으로 width 받아오는 함수
  const handleResize = () => {
    setNowWidth(window.innerWidth);
  };

  console.log('data', data?.project);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nowWidth]);

  initToggle = [true, true, true, true, true];

  switch (badge) {
    case '계약대기':
      textArr =
        memberType === 'USER'
          ? [
              '공사 준비가 진행됩니다.',
              '충전기를 설치, 시운전이 진행됩니다.',
              '충전기 검수가 진행됩니다.',
              '곧 프로젝트가 완료됩니다!',
            ]
          : [
              '공사 준비를 진행해주세요.',
              '충전기를 설치, 시운전을 진행해주세요.',
              '충전기 검수를 진행해주세요.',
              '프로젝트를 완료해주세요.',
            ];
      //initToggle = [false, false, false, false, false];
      break;

    case '준비 중':
      textArr =
        memberType === 'USER'
          ? [
              '공사 준비가 진행됩니다.',
              '충전기를 설치, 시운전이 진행됩니다.',
              '충전기 검수가 진행됩니다.',
              '곧 프로젝트가 완료됩니다!',
            ]
          : [
              '공사 준비를 진행해주세요.',
              '충전기를 설치, 시운전을 진행해주세요.',
              '충전기 검수를 진행해주세요.',
              '프로젝트를 완료해주세요.',
            ];

      //initToggle = [false, true, false, false, false];
      break;

    case '설치 중':
      textArr =
        memberType === 'USER'
          ? [
              '공사 준비가 완료되었습니다.',
              '충전기를 설치, 시운전이 진행됩니다.',
              '충전기 검수가 진행됩니다.',
              '곧 프로젝트가 완료됩니다!',
            ]
          : [
              '공사 준비가 완료되었습니다.',
              '충전기를 설치, 시운전을 진행해주세요.',
              '충전기 검수를 진행해주세요.',
              '프로젝트를 완료해주세요.',
            ];

      //initToggle = [false, false, true, false, false];
      break;

    case '검수 중':
      textArr =
        memberType === 'USER'
          ? [
              '공사 준비가 완료되었습니다.',
              '충전기를 설치, 시운전이 완료되었습니다.',
              '충전기 검수가 진행됩니다.',
              '곧 프로젝트가 완료됩니다!',
            ]
          : [
              '공사 준비가 완료되었습니다.',
              '충전기를 설치, 시운전이 완료되었습니다.',
              '충전기 검수를 진행해주세요.',
              '프로젝트를 완료해주세요.',
            ];

      //initToggle = [false, false, false, true, false];
      break;

    case '완료 중':
      textArr =
        memberType === 'USER'
          ? [
              '공사 준비가 완료되었습니다.',
              '충전기를 설치, 시운전이 완료되었습니다.',
              '충전기 검수가 완료되었습니다.',
              '곧 프로젝트가 완료됩니다!',
            ]
          : [
              '공사 준비가 완료되었습니다.',
              '충전기를 설치, 시운전이 완료되었습니다.',
              '충전기 검수가 완료되었습니다.',
              '프로젝트를 완료해주세요.',
            ];

      //initToggle = [false, false, false, false, true];

      break;

    case '완료 대기':
      textArr =
        memberType === 'USER'
          ? [
              '공사 준비가 완료되었습니다.',
              '충전기를 설치, 시운전이 완료되었습니다.',
              '충전기 검수가 완료되었습니다.',
              '곧 프로젝트가 완료됩니다!',
            ]
          : [
              '공사 준비가 완료되었습니다.',
              '충전기를 설치, 시운전이 완료되었습니다.',
              '충전기 검수가 완료되었습니다.',
              '프로젝트 완료 진행중입니다.',
            ];

      //initToggle = [false, false, false, false, true];

      break;

    default:
      textArr =
        memberType === 'USER'
          ? [
              '공사 준비가 진행됩니다.',
              '충전기를 설치, 시운전이 진행됩니다.',
              '충전기 검수가 진행됩니다.',
              '곧 프로젝트가 완료됩니다!',
            ]
          : [
              '공사 준비를 진행해주세요.',
              '충전기를 설치, 시운전을 진행해주세요.',
              '충전기 검수를 진행해주세요.',
              '프로젝트를 완료해주세요.',
            ];

    //initToggle = [false, false, false, false, false];
  }

  type ModalType = 'finish' | 'change';

  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalInfo, setModalInfo] =
    useState<UnConsentProjectDateChangeHistories>();
  // const [modalType, setModalType] = useState<ModalType>('change');
  const [modalType, setModalType] = useState<ModalType>('change');
  const [modalStep, setModalStep] = useState('');
  const [toggleOpen, setToggleOpen] = useState<boolean[]>(initToggle);

  // -----진행중인 프로젝트 상세 리스트 api-----
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
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
        // console.log('날짜 변경 에러 발생');
        // console.log(error);
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
        // console.log('수락 버튼 에러');
        // console.log(error);
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

  interface documentResponse {
    embeddedUrl: string;
  }

  const {
    data: contractDocumentData,
    isLoading: contractDocumentLoading,
    isError: contractDocumentError,
  } = reactQuery<documentResponse>(
    'contract',
    () => getDocument(contractData?.project?.contract?.documentId!),
    {
      enabled: contractData?.project?.contract?.documentId ? true : false,
    },
  );

  // const { userAgent } = useSelector((state: RootState) => state.userAgent);
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);

  // const selfRef = useRef<any>(null);
  // 자체계약서 다운로드
  // 2022.02.09 ljm 다운로드 추가 작업 필요.
  // issue => 다중 다운로드 안됨.
  const onClickBtn = (data: fileDownLoad) => {
    const a = document.createElement('a');
    a.download = data?.originalName;
    a.href = data?.url;
    a.onclick = () => fileDownload(userAgent, data?.originalName, data?.url);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
  };

  // 계약서 보기 버튼 클릭
  const onClickContract = () => {
    // console.log('contractDocumentData=>', contractDocumentData?.embeddedUrl);
    // 새탭방식
    window.open(contractDocumentData?.embeddedUrl);

    // 임베디드 방식
    // if (contractData) {
    //   router.push({
    //     pathname: '/contract',
    //     query: {
    //       id: router?.query?.projectIdx,
    //       documentId: contractData?.project?.contract?.documentId,
    //     },
    //   });
    // }
  };

  // 유저 날짜 동의하기
  const onClickChangeData = () => {
    // console.log('🔥 ~ line 166 유저 날짜 동의 버튼');
    if (modalInfo?.projectDateChangeHistoryIdx) {
      dataChangeMutate({
        url: `/projects/${modalInfo?.projectIdx}/goal-date/${modalInfo?.projectDateChangeHistoryIdx}/agreement`,
      });
    }
  };
  // 유저 프로젝트 완료 동의 모달
  const onClickCompleteBtn = () => {
    // console.log('🔥 ~ line 176 유저 프로젝트 완료 모달');
    if (data?.project?.projectIdx) {
      CompleteMutate({
        url: `/projects/${data?.project?.projectIdx}/step/completion`,
      });
    }
  };

  const handleDateBtn = (
    step: 'READY' | 'INSTALLATION' | 'EXAM' | 'COMPLETION',
  ) => {
    const target = data?.project?.unConsentProjectDateChangeHistories.filter(
      (el) => el.changedStep === step && el.processingStatus === false,
    );
    if (target.length > 0) {
      setIsModal(true);
      setModalInfo(target[0]);
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
        setIsModal(true);
        setModalType('change');
      } else if (installationStepGoalDate === 'CHANGING') {
        const target = unConsentProjectDateChangeHistories.filter(
          (el) =>
            el.changedStep === 'INSTALLATION' && el.processingStatus === false,
        );
        setModalInfo(target[0]);
        setIsModal(true);
        setModalType('change');
      } else if (examStepGoalDate === 'CHANGING') {
        const target = unConsentProjectDateChangeHistories.filter(
          (el) => el.changedStep === 'EXAM' && el.processingStatus === false,
        );
        setModalInfo(target[0]);
        setIsModal(true);
        setModalType('change');
      } else if (completionStepGoalDate === 'CHANGING') {
        const target = unConsentProjectDateChangeHistories.filter(
          (el) =>
            el.changedStep === 'COMPLETION' && el.processingStatus === false,
        );
        setModalInfo(target[0]);
        setIsModal(true);
        setModalType('change');
      }
    }
  }, [data, modalStep]);

  // console.log('⭐️ 계약서 데이터 확인 ~line 315 ');
  // console.log(data);

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
                <span className="titleText">계약</span>
                <div className="imgBox">
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
                <>
                  {!Array.isArray(contractContent) ? (
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
                  ) : (
                    <ClientP
                      presentProgress={
                        data?.project?.badge === '계약대기' &&
                        data?.project?.isCompletedContractStep === 'IN_PROGRESS'
                          ? true
                          : false
                      }
                      onClick={() => {
                        const contractUrl = JSON.parse(
                          contractData?.project?.contract?.contractContent!,
                        )[0];
                        onClickBtn(contractUrl);
                      }}
                    >
                      계약서 보기
                    </ClientP>
                  )}
                </>
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
                <span className="titleText">준비</span>
                <div className="imgBox">
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
                    handleDateBtn('READY');
                    // if (data?.project?.readyStepGoalDate === 'CHANGING') {
                    //   setIsModal(true);
                    //   const target =
                    //     data?.project?.unConsentProjectDateChangeHistories.filter(
                    //       (el) =>
                    //         el.changedStep === 'READY' &&
                    //         el.processingStatus === false,
                    //     );
                    //   setModalInfo(target[0]);
                    // }
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
                <span className="titleText">설치</span>
                <div className="imgBox">
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
                    handleDateBtn('INSTALLATION');
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
                <span className="titleText">검수</span>
                <div className="imgBox">
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
                    handleDateBtn('EXAM');
                  }}
                  changeDate={data?.project?.examStepGoalDate}
                >
                  {data?.project?.examStepGoalDate === 'CHANGING'
                    ? '목표일 변경 중'
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
                {/* <span className="titleText">완료</span> */}
                <span className="titleText">완료</span>
                <div className="imgBox">
                  <Image
                    src={!toggleOpen[4] ? DownArrow : UpArrow}
                    alt="up"
                    layout="fill"
                  />
                </div>
              </ProgressName>
              {data?.project?.completionStepGoalDate ? (
                <PickedDate
                  color={colors.main}
                  onClick={() => {
                    handleDateBtn('COMPLETION');
                  }}
                  changeDate={data?.project?.completionStepGoalDate}
                >
                  {data?.project?.completionStepGoalDate === 'CHANGING'
                    ? '목표일 변경 중'
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
          height={badge === '완료 대기' ? 220 : 118}
          webHeight={badge === '완료 대기' && nowWidth > 1200 ? 385 : 167}
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
          modalStep={modalStep}
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

  .titleText {
    font-family: 'Spoqa Han Sans Neo';
    color: #222222;
    font-size: 15pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
    @media (min-width: 900pt) {
      font-size: 18pt;
      font-weight: 700;
      line-height: 15pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }

  .imgBox {
    /* width: 7.5pt;
    height: 3.75pt; */
    width: 13pt;
    height: 13pt;
    @media (min-width: 900pt) {
      width: 16pt;
      height: 16pt;
      margin-left: 6pt;
      margin-bottom: 2pt;
    }
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
    justify-content: flex-start;
    padding-top: 20pt;
    padding-bottom: 20pt;
    padding-left: 27pt;
    width: 100%;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
    border-radius: 6pt;
    color: #a6a9b0;
  }
`;

const ClientP = styled.div<{ presentProgress: boolean }>`
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
