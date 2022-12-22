import React, { Dispatch, SetStateAction, useState } from 'react';
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
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import AdminHeader from 'componentsAdmin/Header';
import colors from 'styles/colors';
import CloseImg from 'public/images/XCircle.svg';
import { adminDateFomat, convertKo, hyphenFn } from 'utils/calculatePackage';
import { useQuery } from 'react-query';
import Image from 'next/image';
import RatingForm from './RatingForm';

type Props = {
  setIsDetail?: Dispatch<SetStateAction<boolean>>;
  afterSalesServiceIdx?: number;
};

export interface ASReviewPoint {
  afterSalesServiceReviewIdx: number;
  attentivenessPoint: number;
  quicknessPoint: number;
  professionalismPoint: number;
  satisfactionPoint: number;
  averagePoint: string;
  opinion: string;
}

export interface ASDetailViewResponse {
  isSuccess: true;
  data: {
    afterSalesService: {
      afterSalesServiceIdx: number;
      requestTitle: string;
      requestContent: string;
      createdAt: string;
      afterSalesServiceCompletionConsentStatus: true;
      afterSalesServiceResultDate: string;
      acceptanceDate: string;
      project: {
        projectIdx: number;
        projectNumber: string;
        projectName: string;
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
      };
      afterSalesServiceReview: {
        afterSalesServiceReviewIdx: number;
        attentivenessPoint: number;
        quicknessPoint: number;
        professionalismPoint: number;
        satisfactionPoint: number;
        averagePoint: string;
        opinion: string;
      };
      currentStep: string;
      afterSalesServiceRequestFiles: [
        {
          afterSalesServiceRequestFileIdx: number;
          url: string;
        },
        {
          afterSalesServiceRequestFileIdx: number;
          url: string;
        },
      ];
    };
  };
}

const ASDetailView = ({ setIsDetail, afterSalesServiceIdx }: Props) => {
  // 리뷰 모달 열리고 닫히고
  const [reviewModal, setReviewModal] = useState<boolean>(false);
  const { data, isLoading, isError } = useQuery<ASDetailViewResponse>(
    'asDetailView',
    () => isTokenGetApi(`/admin/after-sales-services/${afterSalesServiceIdx}`),
  );
  const handleBackBtn = () => {
    setIsDetail!(false);
  };
  console.log('data 충전소 찾아와요', data?.data?.afterSalesService);

  const reviewData = data?.data?.afterSalesService?.afterSalesServiceReview;

  return (
    <Background>
      {reviewModal && (
        <RatingForm setReviewModal={setReviewModal} reviewData={reviewData!} />
      )}
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
              <Contents>
                {data?.data?.afterSalesService?.project?.userMember?.id}
              </Contents>
            </List>
            <List>
              <Label>이름</Label>
              <Contents>
                {data?.data?.afterSalesService?.project?.userMember?.name}
              </Contents>
            </List>
            <List>
              <Label>전화번호</Label>
              <Contents>
                {hyphenFn(
                  data?.data?.afterSalesService?.project?.userMember?.phone!,
                )}
              </Contents>
            </List>
          </UserInfoContainer>
          <Name className="notFirst">파트너 정보</Name>
          <CompanyInfoContainer>
            <List>
              <Label>회사명</Label>
              <Contents>
                {
                  data?.data?.afterSalesService?.project?.companyMember
                    ?.companyMemberAdditionalInfo?.companyName
                }
              </Contents>
            </List>
            <List>
              <Label>아이디</Label>
              <Contents>
                {data?.data?.afterSalesService?.project?.companyMember?.id}
              </Contents>
            </List>
            <List>
              <Label>담당자 이름</Label>
              <Contents>
                {data?.data?.afterSalesService?.project?.companyMember?.name}
              </Contents>
            </List>
            <List>
              <Label>이메일</Label>
              <Contents>
                {
                  data?.data?.afterSalesService?.project?.companyMember
                    ?.companyMemberAdditionalInfo?.managerEmail
                }
              </Contents>
            </List>
            <List>
              <Label>전화번호</Label>
              <Contents>
                {hyphenFn(
                  data?.data?.afterSalesService?.project?.companyMember?.phone!,
                )}
              </Contents>
            </List>
            <List>
              <Label>리뷰현황</Label>
              <Contents>
                {/* 추가 작업 필요합니다. */}
                {data?.data?.afterSalesService?.afterSalesServiceReview ===
                null ? (
                  <ReviewBtn>
                    <BtnText>리뷰가 없습니다</BtnText>
                  </ReviewBtn>
                ) : (
                  <ReviewBtn
                    cursor={true}
                    onClick={() => {
                      setReviewModal(true);
                    }}
                  >
                    <BtnText>리뷰현황 보기</BtnText>
                  </ReviewBtn>
                )}
              </Contents>
            </List>
          </CompanyInfoContainer>
          <Name className="notFirst">A/S 정보</Name>
          <ProjectInfoContainer>
            <List>
              <Label>진행단계</Label>
              <Contents>{data?.data?.afterSalesService?.currentStep}</Contents>
            </List>
            <List>
              <Label>프로젝트 번호</Label>
              <Contents>
                {data?.data?.afterSalesService?.project?.projectNumber}
              </Contents>
            </List>
            <List>
              <Label>프로젝트 제목</Label>
              <Contents>
                {data?.data?.afterSalesService?.project?.projectName}
              </Contents>
            </List>
            <List>
              <Label>A/S 제목</Label>
              <RequestContents>
                {data?.data?.afterSalesService?.requestTitle}
              </RequestContents>
            </List>
            <List>
              <Label>충전소</Label>
              <Contents>
                {data?.data?.afterSalesService?.project?.projectName}
              </Contents>
            </List>
            <List>
              <Label>A/S 요청내용</Label>
              <RequestContents height={true}>
                {data?.data?.afterSalesService?.requestContent}
              </RequestContents>
            </List>
            <List>
              <Label>사진</Label>
              <ImgSpanBox>
                {data?.data?.afterSalesService?.afterSalesServiceRequestFiles.map(
                  (img, index) => (
                    <ImgSpan key={index}>
                      <Image
                        layout="fill"
                        alt="preview"
                        data-name={index}
                        key={index}
                        src={img.url}
                        priority={true}
                        unoptimized={true}
                        objectFit="cover"
                      />
                      <Xbox onClick={() => {}} data-name={index}>
                        <Image
                          src={CloseImg}
                          data-name={index}
                          layout="intrinsic"
                          alt="closeBtn"
                          width={24}
                          height={24}
                        />
                      </Xbox>
                    </ImgSpan>
                  ),
                )}
              </ImgSpanBox>
            </List>
          </ProjectInfoContainer>
        </Main>
      </Wrapper>
    </Background>
  );
};

export default ASDetailView;

const Text = css`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
`;

const Background = styled.div`
  width: 100%;
  background-color: ${colors.lightWhite};
  padding: 0 18pt;
  position: absolute;
  left: 154.5pt;
  z-index: 999;
  padding-bottom: 105px;
`;
const Wrapper = styled.div`
  width: 946px;
`;
const Main = styled.div``;
const Name = styled.h2`
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  color: ${colors.main2};
  padding-bottom: 16px;
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
  ${Text};
  color: ${colors.main2};
`;

const List = styled.li`
  display: flex;
  :not(:nth-last-of-type(1)) {
    margin-bottom: 14px;
  }
`;

const RequestContents = styled.div<{ height?: true }>`
  ${Text};
  color: ${colors.main2};
  border: 1px solid #e2e5ed;
  padding: 5px 8px;
  border-radius: 6px;
  width: 748px;
  height: ${({ height }) => height === true && '200px'};
`;

const ImgSpanBox = styled.div`
  height: auto;
  width: 732px;
  display: flex;
  flex-wrap: nowrap;
  gap: 11px;
`;

const ImgSpan = styled.div`
  position: relative;
  width: 140px;
  height: 104px;
  border-radius: 6pt;
  border: 0.75pt solid #e2e5ed;
  & > span > img {
    border-radius: 6pt;
  }
`;

const Xbox = styled.div`
  position: absolute;
  top: -7pt;
  right: -7pt;
  cursor: pointer;
`;

const ReviewBtn = styled.div<{ cursor?: boolean }>`
  width: 120px;
  background-color: #e2e5ed;
  border: 1px solid #747780;
  display: flex;
  justify-content: center;
  border-radius: 4px;
  cursor: ${({ cursor }) => cursor === true && 'pointer'};
`;

const BtnText = styled.div`
  ${Text};
  color: #747780;
  padding: 2px 10px;
`;
