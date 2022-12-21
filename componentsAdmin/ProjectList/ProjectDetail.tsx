import styled from '@emotion/styled';
import { isTokenGetApi } from 'api';
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
import AdminHeader from 'componentsAdmin/Header';
import React, { Dispatch, SetStateAction } from 'react';
import { useQuery } from 'react-query';
import colors from 'styles/colors';
import { adminDateFomat, convertKo, hyphenFn } from 'utils/calculatePackage';

type Props = {
  setIsDetail?: Dispatch<SetStateAction<boolean>>;
  projectIdx: number;
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
const ProjectDetail = ({ setIsDetail, projectIdx }: Props) => {
  const { data, isLoading, isError } = useQuery<ProjectDetailResponse>(
    'projectDetail',
    () => isTokenGetApi(`/admin/projects/${projectIdx}`),
  );
  const handleBackBtn = () => {
    setIsDetail!(false);
  };

  console.log(data);
  return (
    <Background>
      <Wrapper>
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
                {/* 추가 작업 필요합니다. */}
                {data?.data?.project?.projectReview === null ? '-' : ''}
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
              <ButtnBox>단계별일정수정</ButtnBox>
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
              {/* API 없음 수정필요합니다. */}
              <Label>충전기 설치 목적</Label>
              {/* <Contents>{data?.data?.project?.finalQuotation?.</Contents> */}
              <Contents>API 요청필요</Contents>
            </List>

            {/* API 없음 수정필요합니다. */}
            <List>
              <Label>기타 요청사항</Label>
              <TextBox maxLength={500} value={'없음'}></TextBox>
            </List>
            <List>
              <Label>계약서 정보</Label>
              <ButtnBox>계약서 보기</ButtnBox>
            </List>
            <List>
              <Label>첨부파일</Label>
              <FileContainer>
                {data?.data?.project?.finalQuotation?.finalQuotationDetailFiles?.map(
                  (file, index) => (
                    <div className="fileBox" key={index}>
                      <p className="businessName">{file?.originalName}</p>
                      <button className="businessBtn">삭제</button>
                    </div>
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
