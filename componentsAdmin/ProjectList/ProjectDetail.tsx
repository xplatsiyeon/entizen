import styled from '@emotion/styled';
import { isTokenGetApi, isTokenDeleteApi } from 'api';
import {
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

type Props = {
  setIsDetail?: Dispatch<SetStateAction<boolean>>;
  projectIdx: number;
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
};
interface ProjectDetailResponse {
  isSuccess: boolean;
  data: {
    project: {
      projectIdx: number;
      isCompletedContractStep: string;
      isCompletedReadyStep: boolean;
      isCompletedInstallationStep: boolean;
      isCompletedExamStep: boolean;
      isApprovedByAdmin: boolean;
      isCancel: false;
      readyStepGoalDate: string;
      installationStepGoalDate: string;
      examStepGoalDate: string;
      completionStepGoalDate: string;
      createdAt: string;
      projectName: string;
      projectNumber: string;
      subscribeStartDate: string;
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
        attentivenessPoint: number;
        quicknessPoint: number;
        professionalismPoint: number;
        satisfactionPoint: number;
        averagePoint: string;
        opinion: string;
        projectIdx: number;
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
          standType: string;
          channel: string;
          count: number;
          chargePriceType: string;
          chargePrice: number;
          installationLocation: string;
          manufacturer: string;
          productFeature: string;
        }[];
        finalQuotationDetailFiles: {
          finalQuotationDetailFileIdx: number;
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

  // 삭제 하고 싶은 파일 id 값 업데이트
  const [fileIdx, setFileIdx] = useState<number | undefined>();
  const { data, isLoading, isError } = useQuery<ProjectDetailResponse>(
    'projectDetail',
    () => isTokenGetApi(`/admin/projects/${projectIdx}`),
  );

  // 리뷰데이터
  const reviewData = data?.data?.project?.projectReview;

  const {
    mutate: deleteMutate,
    isLoading: deleteIsLoading,
    isError: deleteIsError,
  } = useMutation(isTokenDeleteApi, {
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

  const handleBackBtn = () => {
    setIsDetail!(false);
  };

  // 프로젝트 첨부파일 삭제
  const modalDeleteFileBtnControll = () => {
    deleteMutate({
      url: `/admin/projects/${projectIdx}/completion/files/${fileIdx}`,
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
                  <ReviewBtn>리뷰가 없습니다</ReviewBtn>
                ) : (
                  <ReviewBtn
                    cursor={true}
                    onClick={() => {
                      setReviewModal(true);
                    }}
                  >
                    리뷰현황 보기
                  </ReviewBtn>
                )}
              </Contents>
            </List>
          </CompanyInfoContainer>
          <Name className="notFirst">프로젝트 정보</Name>
          <ProjectInfoContainer>
            <List>
              <Label>프로젝트 번호</Label>
              <Contents>{data?.data?.project?.projectNumber}</Contents>
            </List>
            <List>
              <Label>진행단계</Label>
              <Contents>{data?.data?.project?.currentStep}</Contents>
            </List>
            <List>
              <Label>단계별 일정</Label>
              <ButtnBox
                onClick={() => {
                  alert('개발중입니다.');
                }}
              >
                단계별일정수정
              </ButtnBox>
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
                {
                  data?.data?.project?.finalQuotation?.preQuotation
                    ?.quotationRequest?.installationPurpose
                }
              </Contents>
              <Contents>API 요청필요</Contents>
            </List>

            <List>
              <Label>기타 요청사항</Label>
              <TextBox maxLength={500} value={'없음'} readOnly>
                {
                  data?.data?.project?.finalQuotation?.preQuotation
                    ?.quotationRequest?.etcRequest
                }
              </TextBox>
            </List>
            <List>
              <Label>계약서 정보</Label>
              <ButtnBox
                onClick={() => {
                  alert('개발중입니다.');
                }}
              >
                계약서 보기
              </ButtnBox>
            </List>
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
                        <p className="businessNameText">{file?.url}</p>
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
const Contents = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: ${colors.main2};
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
`;
const List = styled.li`
  display: flex;
  :not(:nth-last-of-type(1)) {
    margin-bottom: 14px;
  }
`;
const ButtnBox = styled.button`
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

const ReviewBtn = styled.div<{ cursor?: boolean }>`
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
`;

const BtnText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: #747780;
  padding: 2px 8px;
`;
