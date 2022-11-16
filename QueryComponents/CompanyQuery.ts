import { gql } from '@apollo/client';

export interface InProgressProjects {
  badge: string;
  projectIdx: string;
  projectName: string;
}
export interface Response {
  inProgressProjects: InProgressProjects[];
}

/**
 * 판매자 - 프로젝트 리스트
 */
export const GET_InProgressProjects = gql`
  query Query {
    inProgressProjects {
      projectIdx
      projectName
      badge
    }
  }
`;

export interface UserMember {
  memberIdx: string;
  memberType: string;
  name: string;
  phone: string;
}
export interface CompanyMember {
  name: string;
  phone: string;
  companyMemberAdditionalInfo: {
    managerEmail: string;
    companyName: string;
  };
}
export interface FinalQuotationChargers {
  finalQuotationChargerIdx: string;
  kind: string;
  standType: string;
  channel: 'SINGLE' | 'DUAL' | 'MODE_3';
  count: number;
  installationLocation: 'INSIDE' | 'OUTSIDE';
}
export interface UnConsentProjectDateChangeHistories {
  projectDateChangeHistoryIdx: string;
  changedStep: string;
  changedReason: string;
  dateBeforeChange: string;
  dateAfterChange: string;
  processingStatus: boolean;
  projectIdx: number;
}
export interface InProgressProjectsDetail {
  projectIdx: string;
  projectName: string;
  projectNumber: string;
  badge: string;
  finalQuotation: {
    finalQuotationIdx: string;
    subscribeProduct: 'ENTIRETY' | 'PART';
    subscribePeriod: string;
    userInvestRate: string;
    chargingPointRate: string;
    subscribePricePerMonth: number;
    constructionPeriod: number;
    subscribeProductFeature: string;
    spotInspectionResult: string;
    finalQuotationChargers: FinalQuotationChargers[];
    quotationRequest: {
      installationPurpose:
        | 'BUSINESS'
        | 'WELFARE'
        | 'MARKETING'
        | 'PERSONAL'
        | 'ETC';
      installationLocation: 'INSIDE' | 'OUTSIDE';
    };
  };
  userMember: UserMember;
  companyMember: CompanyMember;
  isCompletedUserContractStep: boolean;
  isCompletedCompanyMemberContractStep: boolean;
  isCompletedReadyStep: boolean;
  readyStepGoalDate: string;
  isCompletedInstallationStep: boolean;
  installationStepGoalDate: string;
  isCompletedExamStep: boolean;
  examStepGoalDate: string;
  isCompletedCompletionStep: boolean;
  completionStepGoalDate: string;
  dateOfRequestForConsentToCompleteProject: string;
  projectCompletionAgreementDate: string;
  isApprovedByAdmin: boolean;
  isCancel: boolean;
  unConsentProjectDateChangeHistories: UnConsentProjectDateChangeHistories[];
}

export interface InProgressProjectsDetailResponse {
  project: InProgressProjectsDetail;
}

export const GET_InProgressProjectsDetail = gql`
  query Query($projectIdx: ID!) {
    project(projectIdx: $projectIdx) {
      projectIdx
      projectName
      projectNumber
      badge
      finalQuotation {
        finalQuotationIdx
        subscribeProduct
        subscribePeriod
        userInvestRate
        chargingPointRate
        subscribePricePerMonth
        constructionPeriod
        subscribeProductFeature
        spotInspectionResult
        finalQuotationChargers {
          finalQuotationChargerIdx
          kind
          standType
          channel
          count
          installationLocation
        }
        quotationRequest {
          installationPurpose
        }
      }
      userMember {
        memberType
        name
        phone
        id
      }
      companyMember {
        name
        phone
        companyMemberAdditionalInfo {
          managerEmail
          companyName
        }
      }
      # 계약관련 내용
      # isCompletedContractStep
      isCompletedUserContractStep
      isCompletedCompanyMemberContractStep
      isCompletedReadyStep
      readyStepGoalDate
      # 설치단계
      isCompletedInstallationStep
      installationStepGoalDate
      # 검수단계
      isCompletedExamStep
      examStepGoalDate
      # 완료단계
      isCompletedCompletionStep
      completionStepGoalDate
      # 아직 미확인
      dateOfRequestForConsentToCompleteProject
      projectCompletionAgreementDate
      isApprovedByAdmin
      isCancel
      unConsentProjectDateChangeHistories {
        projectDateChangeHistoryIdx
        changedStep
        changedReason
        dateBeforeChange
        dateAfterChange
        processingStatus
        projectIdx
      }
    }
  }
`;

interface HistoryProjectsDetail {
  completedProjects: [
    {
      badge: string;
      projectIdx: string;
      projectName: string;
      projectNumber: string;
      subscribeStartDate: string;
      subscribeEndDate: string;
      projectReview: {
        projectReviewIdx: string;
        attentivenessPoint: number;
        quicknessPoint: number;
        professionalismPoint: number;
        satisfactionPoint: number;
        averagePoint: string;
        opinion: string;
        projectIdx: number;
      };
      finalQuotation: {
        finalQuotationIdx: string;
        subscribeProduct: string;
        subscribePricePerMonth: number;
        userInvestRate: string;
        finalQuotationChargers: [
          {
            finalQuotationChargerIdx: string;
            kind: string;
            standType: string;
            channel: string;
            count: number;
            chargePriceType: string;
            chargePrice: number;
            installationLocation: string;
            modelName: string;
            manufacturer: string;
            productFeature: string;
          },
        ];
        finalQuotationDetailFiles: [
          {
            finalQuotationDetailFileIdx: string;
            originalName: string;
            url: string;
            size: number;
          },
        ];
      };
      userMember: {
        memberIdx: number;
        name: number;
        phone: number;
      };
    },
  ];
}
export interface ResponseHistoryProjectsDetail {
  completedProjects: HistoryProjectsDetail[];
}

export const GET_historyProjectsDetail = gql`
  query Query($searchKeyword: String!, $sort: CompletedProjectsSort!) {
    completedProjects(searchKeyword: $searchKeyword, sort: $sort) {
      badge
      projectIdx
      projectName
      projectNumber
      subscribeStartDate
      subscribeEndDate

      projectReview {
        projectReviewIdx
        attentivenessPoint
        quicknessPoint
        professionalismPoint
        satisfactionPoint
        averagePoint
        opinion
        projectIdx
      }
      finalQuotation {
        finalQuotationIdx
        subscribeProduct
        subscribePricePerMonth

        userInvestRate
        finalQuotationChargers {
          finalQuotationChargerIdx
          kind
          standType
          channel
          count
          chargePriceType
          chargePrice
          installationLocation
          modelName
          manufacturer
          productFeature
        }
        finalQuotationDetailFiles {
          finalQuotationDetailFileIdx
          originalName
          url
          size
        }
      }

      userMember {
        memberIdx
        name
        phone
      }
    }
  }
`;
