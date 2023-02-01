import styled from '@emotion/styled';
import {
  isTokenDeleteApi,
  isTokenPatchApi,
  isTokenAdminGetApi,
  isTokenAdminPatchApi,
  isTokenAdminDeleteApi,
  isTokenAdminPutApi,
} from 'api';
import {
  InstallationPurposeType,
  InstallationPurposeTypeEn,
  location,
  locationEn,
  M5_LIST,
  M5_LIST_EN,
  M6_LIST,
  M6_LIST_EN,
  M7_LIST,
  M7_LIST_EN,
  subscribeType,
  subscribeTypeEn,
} from 'assets/selectList';
import AlertModal from 'componentsAdmin/Modal/AlertModal';
import AdminHeader from 'componentsAdmin/Header';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import colors from 'styles/colors';
import { adminDateFomat, convertKo, hyphenFn } from 'utils/calculatePackage';
import CompleteRating from './CompleteRating';
import ProjectAlertModal from './ProjectAlertModal';

type Props = {
  setIsDetail?: Dispatch<SetStateAction<boolean>>;
  projectIdx: number;
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

// '',YYYY-MM-DD | CHANGING
interface ProjectDetailResponse {
  isSuccess: boolean;
  data: {
    project: {
      projectIdx: number;
      // 계약 상태 여부
      isCompletedContractStep: string;
      // 준비 단계 완료 여부
      isCompletedReadyStep: boolean;
      // 설치 단계 완료 여부
      isCompletedInstallationStep: boolean;
      // 검수 단계 완료 여부
      isCompletedExamStep: boolean;
      // 관리자 승인 여부
      isApprovedByAdmin: boolean;
      // 프로젝트 취소 여부
      isCancel: boolean;
      // 준비 단계 목표일 여부 - YYYY-MM-DD | CHANGING
      readyStepGoalDate: string;
      // 설치 단계 목표일 여부 - YYYY-MM-DD | CHANGING
      installationStepGoalDate: string;
      // 검수 단계 목표일 여부 - YYYY-MM-DD | CHANGING
      examStepGoalDate: string;
      // 완료 단계 목표일 여부 - YYYY-MM-DD | CHANGING
      completionStepGoalDate: string;
      // 남은 구독 기간
      subscribeLeftDays?: number;
      createdAt: string;
      projectName: string;
      projectNumber: string;
      userMemberIdx: number;
      companyMemberIdx: number;
      // 구독 시작일 - YYYY-MM-DD
      subscribeStartDate: string;
      // 구독 종료일 - YYYY-MM-DD
      subscribeEndDate: string;
      // 프로젝트 완료 동의일 - YYYY-MM-DD
      projectCompletionAgreementDate: string;
      // 완료 단계 완료일 - YYYY-MM-DD
      completionStepCompletionDate: string;
      // 검수 단계 완료일 - YYYY-MM-DD
      examStepCompletionDate: string;
      // 설치 단계 완료일 - YYYY-MM-DD
      installationStepCompletionDate: string;
      // 준비 단계 완료일 - YYYY-MM-DD
      readyStepCompletionDate: string;
      companyMember: {
        memberIdx: number;
        id: string;
        name: string;
        phone: string;
        companyMemberAdditionalInfo: {
          companyMemberAdditionalInfoIdx: number;
          companyName: string;
          managerEmail: string;
        };
      };
      userMember: {
        memberIdx: number;
        id: string;
        name: string;
        phone: string;
      };
      projectReview: {
        projectReviewIdx: number;
        // 친절함
        attentivenessPoint: number;
        // 신속함
        quicknessPoint: number;
        // 전문성
        professionalismPoint: number;
        // 만족감
        satisfactionPoint: number;
        averagePoint: string;
        opinion: string;
      };
      finalQuotation: {
        finalQuotationIdx: number;
        subscribeProduct: string;
        subscribePeriod: number;
        userInvestRate: string;
        chargingPointRate: string;
        preQuotation: {
          preQuotationIdx: number;
          quotationRequest: {
            quotationRequestIdx: number;
            installationPurpose: string;
            etcRequest: string;
          };
        };
        finalQuotationChargers: {
          finalQuotationChargerIdx: number;
          kind: string;
          standType: null;
          channel: string;
          count: number;
          chargePriceType: string;
          chargePrice: number;
          installationLocation: string;
          manufacturer: string;
          productFeature: string;
        }[];
        finalQuotationDetailFiles: {
          finalQuotationChargerFileIdx: number;
          productFileType: string;
          originalName: string;
          url: string;
        }[];
      };
      currentStep: string;
      projectCompletionFiles: {
        projectCompletionFileIdx: number;
        url: string;
      }[];
    };
  };
}
const ProjectDetail = ({ setIsDetail, projectIdx, setNowHeight }: Props) => {
  const queryClinet = useQueryClient();
  // 수정 등록 버튼 누를때 나오는 모달창
  const [messageModal, setMessageModal] = useState<boolean>(false);
  // 경고창에 보내는 메세지
  const [message, setMessage] = useState('');

  // 리뷰 모달 열리고 닫히고
  const [reviewModal, setReviewModal] = useState<boolean>(false);

  // 리뷰 수정하기
  const [modifyReview, setModifyReview] = useState<string>('');

  // 최종 승인 완료 모달 열리고 닫히고
  const [projectModal, setProjectModal] = useState<boolean>(false);
  const [finalApprove, setFinalApprove] = useState<boolean>(false);

  // 삭제 하고 싶은 파일 id 값 업데이트
  const [fileIdx, setFileIdx] = useState<number | undefined>();
  const { data, isLoading, isError } = useQuery<ProjectDetailResponse>(
    'projectDetail',
    () => isTokenAdminGetApi(`/admin/projects/${projectIdx}`),
  );

  // 리뷰데이터
  const reviewData = data?.data?.project?.projectReview;

  const goalDate = (goal: string) => {
    if (goal === '') {
      return '목표일 입력중입니다.';
    } else if (goal === 'CHANGING') {
      return '변경중입니다.';
    } else {
      return goal;
    }
  };

  // 삭제
  const {
    mutate: deleteMutate,
    isLoading: deleteIsLoading,
    isError: deleteIsError,
  } = useMutation(isTokenAdminDeleteApi, {
    onSuccess: () => {
      queryClinet.invalidateQueries('projectDetail');
      setMessageModal(true);
      setMessage('삭제가 완료 됐습니다.');
    },
    onError: () => {
      setMessageModal(true);
      setMessage('삭제 요청을 실패했습니다.\n다시 시도해주세요.');
    },
    onSettled: () => {},
  });

  // 프로젝트 첨부파일 삭제
  const modalDeleteFileBtnControll = () => {
    deleteMutate({
      url: `/admin/projects/${projectIdx}/completion/files/${fileIdx}`,
    });
  };

  const handleBackBtn = () => {
    setIsDetail!(false);
  };

  // 프로젝트 최종승인
  const {
    mutate: patchMutate,
    isLoading: patchIsLoading,
    isError: patchIsError,
  } = useMutation(isTokenAdminPatchApi, {
    onSuccess: () => {
      queryClinet.invalidateQueries('projectDetail');
      setMessageModal(true);
      setMessage('최종 승인이 완료됐습니다.');
    },
    onError: () => {
      setMessageModal(true);
      setMessage('삭제 요청을 실패했습니다.\n다시 시도해주세요.');
    },
    onSettled: () => {},
  });

  // 프로젝트 최종 승인
  const finalApproved = () => {
    patchMutate({
      url: `/admin/projects/${projectIdx}/approval`,
    });
  };

  // 프로젝트 리뷰 수정하는 함수
  const {
    mutate: putMutate,
    isLoading: putIsLoading,
    isError: putIsError,
  } = useMutation(isTokenAdminPutApi, {
    onSuccess: () => {
      queryClinet.invalidateQueries('projectDetail');
      setMessageModal(true);
      setMessage('리뷰가 수정됐습니다.');
    },
    onError: () => {
      setMessageModal(true);
      setMessage('리뷰 수정에 실패했습니다.\n다시 시도해주세요.');
    },
    onSettled: () => {},
  });

  const reviewMified = () => {
    putMutate({
      url: `/admin/projects/${projectIdx}/review/${data?.data?.project?.projectReview?.projectReviewIdx}`,
      data: {
        attentivenessPoint:
          data?.data?.project?.projectReview?.attentivenessPoint,

        quicknessPoint: data?.data?.project?.projectReview?.quicknessPoint,

        professionalismPoint:
          data?.data?.project?.projectReview?.professionalismPoint,

        satisfactionPoint:
          data?.data?.project?.projectReview?.satisfactionPoint,

        opinion: modifyReview,
      },
    });
  };

  useEffect(() => {
    if (fileIdx) {
      modalDeleteFileBtnControll();
    }
  }, [fileIdx]);

  useEffect(() => {
    if (setNowHeight && projectIdx) {
      setNowHeight(window.document.documentElement.scrollHeight);
    }
  }, []);

  // 최종 승인 가능한지 여부
  useEffect(() => {
    if (
      data?.data?.project?.isCompletedExamStep === true &&
      data?.data?.project?.projectCompletionAgreementDate !== '' &&
      data?.data?.project?.isApprovedByAdmin === false
    ) {
      setFinalApprove(true);
    } else if (
      data?.data?.project?.isCompletedExamStep === true &&
      data?.data?.project?.isApprovedByAdmin === true
    ) {
      setFinalApprove(false);
    } else if (
      data?.data?.project?.isCompletedExamStep === false &&
      data?.data?.project?.isApprovedByAdmin === false
    ) {
      setFinalApprove(false);
    }
  }, [data]);

  const elseRequest =
    data?.data?.project?.finalQuotation?.preQuotation?.quotationRequest
      ?.etcRequest;

  useEffect(() => {
    setModifyReview(data?.data?.project?.projectReview?.opinion!);
  }, [data]);

  return (
    <Background>
      <Wrapper>
        {messageModal && (
          <AlertModal setIsModal={setMessageModal} message={message} />
        )}
        {reviewModal && (
          <CompleteRating
            setReviewModal={setReviewModal}
            reviewData={reviewData!}
            setModifyReview={setModifyReview}
            modifyReview={modifyReview}
            reviewMified={reviewMified}
          />
        )}
        {projectModal && (
          <ProjectAlertModal
            setProjectModal={setProjectModal}
            rightBtn={finalApproved}
            finalApprove={finalApprove}
          />
        )}
        <AdminHeader
          title="프로젝트"
          type="detail"
          backBtn={handleBackBtn}
          exelHide={true}
        />
        <Main>
          <Name className="fisrt">작성자 정보</Name>
          <UserInfoContainer>
            <List>
              <Label>아이디</Label>
              <Contents>{data?.data?.project?.userMember?.id}</Contents>
            </List>
            <List>
              <Label>이름</Label>
              <Contents>{data?.data?.project?.userMember?.name}</Contents>
            </List>
            <List>
              <Label>전화번호</Label>
              <Contents>
                {hyphenFn(data?.data?.project?.userMember?.phone!)}
              </Contents>
            </List>
          </UserInfoContainer>
          <Name className="notFirst">파트너 정보</Name>
          <CompanyInfoContainer>
            <List>
              <Label>회사명</Label>
              <Contents>
                {
                  data?.data?.project?.companyMember
                    ?.companyMemberAdditionalInfo?.companyName
                }
              </Contents>
            </List>
            <List>
              <Label>아이디</Label>
              <Contents>{data?.data?.project?.companyMember?.id}</Contents>
            </List>
            <List>
              <Label>담당자 이름</Label>
              <Contents>{data?.data?.project?.companyMember?.name}</Contents>
            </List>
            <List>
              <Label>이메일</Label>
              <Contents>
                {
                  data?.data?.project?.companyMember
                    ?.companyMemberAdditionalInfo?.managerEmail
                }
              </Contents>
            </List>
            <List>
              <Label>전화번호</Label>
              <Contents>
                {hyphenFn(data?.data?.project?.companyMember?.phone!)}
              </Contents>
            </List>
            <List>
              <Label>리뷰현황</Label>
              <Contents>
                {data?.data?.project?.projectReview === null ? (
                  <ProjectBtn>리뷰가 없습니다</ProjectBtn>
                ) : (
                  <ProjectBtn
                    cursor={true}
                    onClick={() => {
                      setReviewModal(true);
                    }}
                  >
                    리뷰현황 보기
                  </ProjectBtn>
                )}
              </Contents>
            </List>
          </CompanyInfoContainer>
          <ButtonFlex>
            <Name className="projectInfo">프로젝트 정보</Name>
            <ProjectBtn
              onClick={() => {
                setProjectModal(true);
              }}
              margin={true}
              cursor={true}
            >
              최종승인 완료
            </ProjectBtn>
          </ButtonFlex>
          <ProjectInfoContainer>
            <List>
              <Label>프로젝트 번호</Label>
              <Contents>{data?.data?.project?.projectNumber}</Contents>
            </List>
            <List>
              <Label>진행단계</Label>
              {/* <Contents>{data?.data?.project?.currentStep}</Contents> */}
              {finalApprove === true ? (
                <Contents approve={true}>관리자 승인 대기 중</Contents>
              ) : (
                <Contents>{data?.data?.project?.currentStep}</Contents>
              )}
            </List>
            <List>
              <Label>단계별 일정</Label>
              {/* <ButtonBox
                onClick={() => {
                  alert('개발중입니다.');
                }}
              >
                단계별일정수정
              </ButtonBox> */}
              <GoalDateFlex>
                <GoalDateAlign>
                  <GoalDateLabel>준비:</GoalDateLabel>
                  <Contents>
                    {goalDate(data?.data?.project?.readyStepGoalDate!)}
                  </Contents>
                </GoalDateAlign>
                <GoalDateAlign>
                  <GoalDateLabel>설치:</GoalDateLabel>
                  <Contents>
                    {goalDate(data?.data?.project?.installationStepGoalDate!)}
                  </Contents>
                </GoalDateAlign>
                <GoalDateAlign>
                  <GoalDateLabel>검수:</GoalDateLabel>
                  <Contents>
                    {goalDate(data?.data?.project?.examStepGoalDate!)}
                  </Contents>
                </GoalDateAlign>
                <GoalDateAlign>
                  <GoalDateLabel>완료:</GoalDateLabel>
                  <Contents>
                    {goalDate(data?.data?.project?.completionStepGoalDate!)}
                  </Contents>
                </GoalDateAlign>
              </GoalDateFlex>
            </List>
            <List>
              <Label>프로젝트 제목</Label>
              <Contents>{data?.data?.project?.projectName}</Contents>
            </List>
            <List>
              <Label>구독상품</Label>
              <Contents>
                {convertKo(
                  subscribeType,
                  subscribeTypeEn,
                  data?.data?.project?.finalQuotation?.subscribeProduct,
                )}
              </Contents>
            </List>
            <List>
              <Label>구독기간</Label>
              <Contents>
                {`${data?.data?.project?.finalQuotation?.subscribePeriod}개월`}
              </Contents>
            </List>
            <List>
              <Label>수익지분</Label>
              <Contents>
                {`${Math.floor(
                  Number(data?.data?.project?.finalQuotation?.userInvestRate) *
                    100,
                )}%`}
              </Contents>
            </List>
            {data?.data?.project?.finalQuotation?.finalQuotationChargers?.map(
              (charger, index) => (
                <List key={index}>
                  <Label>{index > 0 ? '' : '충전기 종류 및 수량'}</Label>
                  {charger?.standType === null ? (
                    <Contents>{`${convertKo(
                      M5_LIST,
                      M5_LIST_EN,
                      charger?.kind,
                    )} : ${convertKo(M7_LIST, M7_LIST_EN, charger?.channel)},${
                      charger?.count
                    }대`}</Contents>
                  ) : (
                    <Contents>{`${convertKo(
                      M5_LIST,
                      M5_LIST_EN,
                      charger?.kind,
                    )} : ${convertKo(
                      M6_LIST,
                      M6_LIST_EN,
                      charger?.standType,
                    )},${convertKo(M7_LIST, M7_LIST_EN, charger?.channel)},${
                      charger?.count
                    }대`}</Contents>
                  )}
                </List>
              ),
            )}

            {data?.data?.project?.finalQuotation?.finalQuotationChargers?.map(
              (charger, index) => (
                <List key={index}>
                  <Label>{index > 0 ? '' : '충전기 설치 위치'}</Label>
                  <Contents>
                    {convertKo(
                      location,
                      locationEn,
                      charger?.installationLocation,
                    )}
                  </Contents>
                </List>
              ),
            )}

            <List>
              <Label>충전기 설치 목적</Label>
              <Contents>
                {convertKo(
                  InstallationPurposeType,
                  InstallationPurposeTypeEn,
                  data?.data?.project?.finalQuotation?.preQuotation
                    ?.quotationRequest?.installationPurpose,
                )}
              </Contents>
            </List>
            <List>
              <Label>기타 요청사항</Label>
              <TextBox
                maxLength={500}
                value={elseRequest === '' ? '없음' : elseRequest}
                readOnly
              >
                {/* <TextP>
                  {
                    data?.data?.project?.finalQuotation?.preQuotation
                      ?.quotationRequest?.etcRequest
                  }
                </TextP> */}
              </TextBox>
            </List>
            {/* <List>
              <Label>계약서 정보</Label>
              <ButtonBox
                onClick={() => {
                  alert('개발중입니다.');
                }}
              >
                계약서 보기
              </ButtonBox>
            </List> */}
            <List>
              <Label>첨부파일</Label>
              <FileContainer>
                {data?.data?.project?.projectCompletionFiles?.map(
                  (file, index) => (
                    <a
                      className="fileBox"
                      key={index}
                      download={file?.url}
                      href={file?.url}
                    >
                      <div className="businessName">
                        <p className="businessNameText">
                          {file?.projectCompletionFileIdx}
                        </p>
                      </div>
                      <button
                        className="businessBtn"
                        onClick={() => {
                          setFileIdx(file?.projectCompletionFileIdx);
                        }}
                      >
                        삭제
                      </button>
                    </a>
                  ),
                )}
              </FileContainer>
            </List>
            <List>
              <Label>프로젝트 생성일</Label>
              <Contents>
                {adminDateFomat(data?.data?.project?.createdAt!)}
              </Contents>
            </List>
          </ProjectInfoContainer>
        </Main>
      </Wrapper>
    </Background>
  );
};

export default ProjectDetail;

const Background = styled.div`
  width: 100%;
  background-color: ${colors.lightWhite};
  padding: 0 18pt;
  position: absolute;
  left: 154.5pt;
  z-index: 999;
`;
const Wrapper = styled.div`
  width: 946px;
`;
const Main = styled.div``;
const Name = styled.h2`
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: ${colors.main2};
  &.first {
    margin-top: 16px;
  }
  &.notFirst {
    margin-top: 32px;
  }
  &.projectInfo {
    margin-top: 0;
  }
`;
const UserInfoContainer = styled.ul`
  border: 2px solid ${colors.lightGray5};
  border-radius: 4px;
  padding: 26px 14px;
`;
const CompanyInfoContainer = styled.ul`
  border: 2px solid ${colors.lightGray5};
  border-radius: 4px;
  padding: 26px 14px;
`;
const ProjectInfoContainer = styled.ul`
  border: 2px solid ${colors.lightGray5};
  border-radius: 4px;
  padding: 26px 14px;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: ${colors.main2};
  width: 129px;
  margin-right: 37px;
`;
const Contents = styled.span<{ approve?: boolean }>`
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: ${({ approve }) => (approve === true ? '#F75015' : `${colors.main2}`)};
  font-weight: ${({ approve }) => approve && '700'};
`;
const TextBox = styled.textarea`
  width: 748px;
  height: 196px;
  resize: none;
  background: #ffffff;
  opacity: 0.6;
  border: 1px solid #e2e5ed;
  border-radius: 2px;
  padding-top: 2px;
  padding-left: 8px;
  color: #222222;
`;
const TextP = styled.p`
  color: #222222;
`;

const List = styled.li`
  display: flex;
  :not(:nth-last-of-type(1)) {
    margin-bottom: 14px;
  }
`;
const ButtonBox = styled.button`
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  color: #747780;
  padding: 4px 5px;
  background: #e2e5ed;
  border: 1px solid #747780;
  border-radius: 2px;
`;

const FinalButtonBox = styled.button`
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  color: #747780;
  padding: 4px 5px;
  background: #e2e5ed;
  border: 1px solid #747780;
  border-radius: 2px;
  height: 30px;
`;

const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  .fileBox {
    display: flex;
    align-items: center;
    cursor: pointer;
    text-decoration-line: none;
  }
  .businessName {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    /* identical to box height, or 24px */
    color: #747780;
    border: 1px solid #a6a9b0;
    border-radius: 2px;
    padding: 4px 14px 4px 10px;
    gap: 8px;
    margin-right: 10px;
    width: 500px;

    .businessNameText {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .businessBtn {
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    /* identical to box height, or 21px */
    background: none;
    text-decoration-line: underline;

    color: #747780;
  }
`;

const ProjectBtn = styled.div<{ cursor?: boolean; margin?: boolean }>`
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  color: #747780;
  padding: 4px 5px;
  background: #e2e5ed;
  border: 1px solid #747780;
  border-radius: 2px;
  cursor: ${({ cursor }) => cursor === true && 'pointer'};
  height: 30px;
  margin-bottom: ${({ margin }) => margin === true && '5px'};
`;

const ButtonFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
`;

const BtnText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: #747780;
  padding: 2px 8px;
`;

const GoalDateFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const GoalDateAlign = styled.div`
  display: flex;
  align-items: center;
`;

const GoalDateLabel = styled.label`
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: ${colors.main2};
  width: 40px;
  /* margin-right: 10px; */
`;
