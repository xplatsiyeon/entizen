import { gql } from '@apollo/client';

export interface InProgressProjects {
  totalCount: number;
  projects: {
    badge: string;
    projectIdx: string;
    projectName: string;
  }[];
}
export interface Response {
  inProgressProjects: InProgressProjects;
}

/**
 * 판매자 - 프로젝트 리스트
 */
export const GET_InProgressProjects = gql`
  query Query($page: Int, $limit: Int) {
    inProgressProjects(page: $page, limit: $limit) {
      totalCount
      projects {
        projectIdx
        projectName
        badge
      }
    }
  }
`;

export interface UserMember {
  memberIdx: string;
  memberType: string;
  name: string;
  phone: string;
  id: string;
}
export interface CompanyMember {
  name: string;
  phone: string;
  memberIdx: string;
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

export interface ProjectCompletionFiles {
  projectCompletionFileIdx: string;
  originalName: string;
  url: string;
  size: number;
  projectIdx: number;
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

export interface FinalQuotation {
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
    etcRequest: string;
  };
}
export interface InProgressProjectsDetail {
  projectIdx: string;
  projectName: string;
  projectNumber: string;
  badge: string;
  finalQuotation: FinalQuotation;
  userMember: UserMember;
  companyMember: CompanyMember;
  isCompletedContractStep: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETION';
  isCompletedReadyStep: boolean;
  readyStepGoalDate: string;
  readyStepCompletionDate: string;
  isCompletedInstallationStep: boolean;
  installationStepGoalDate: string;
  installationStepCompletionDate: string;
  isCompletedExamStep: boolean;
  examStepGoalDate: string;
  examStepCompletionDate: string;
  isCompletedCompletionStep: boolean;
  completionStepGoalDate: string;
  completionStepCompletionDate: string;
  dateOfRequestForConsentToCompleteProject: string;
  projectCompletionAgreementDate: string;
  isApprovedByAdmin: boolean;
  isCancel: boolean;
  unConsentProjectDateChangeHistories: UnConsentProjectDateChangeHistories[];
  projectCompletionFiles: ProjectCompletionFiles[];
  subscribeStartDate: string;
  contract: {
    contractIdx: string;
    documentId: string;
    contractContent: string;
    // {
    //   title?: string;
    // };
  };
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
          etcRequest
        }
      }
      userMember {
        memberIdx
        memberType
        name
        phone
        id
      }
      # 구독시작일
      subscribeStartDate
      # 계약관련 내용
      isCompletedContractStep

      # 준비단계
      isCompletedReadyStep
      readyStepGoalDate
      readyStepCompletionDate
      # 설치단계
      isCompletedInstallationStep
      installationStepGoalDate
      installationStepCompletionDate
      # 검수단계
      isCompletedExamStep
      examStepGoalDate
      examStepCompletionDate
      # 완료단계
      isCompletedCompletionStep
      completionStepGoalDate
      completionStepCompletionDate
      # 아직 미확인
      dateOfRequestForConsentToCompleteProject
      projectCompletionAgreementDate
      isApprovedByAdmin
      isCancel
      companyMember {
        name
        phone
        memberIdx
        companyMemberAdditionalInfo {
          managerEmail
          companyName
        }
      }
      # 히스토리 목록
      unConsentProjectDateChangeHistories {
        projectDateChangeHistoryIdx
        changedStep
        changedReason
        dateBeforeChange
        dateAfterChange
        processingStatus
        projectIdx
      }
      # 최종 파일 목록
      projectCompletionFiles {
        projectCompletionFileIdx
        originalName
        url
        size
        projectIdx
      }
      # 계약서
      contract {
        contractIdx
        documentId
        contractContent
      }
    }
  }
`;

export interface FinalQuotationChargerFiles {
  finalQuotationChargerFileIdx: string;
  productFileType: string;
  originalName: string;
  url: string;
  size: number;
}
export interface Projects {
  badge: string;
  projectIdx: string;
  projectName: string;
  projectNumber: string;
  subscribeStartDate: string;
  subscribeEndDate: string;
  projectCompletionFiles: {
    url: string;
    projectCompletionFileIdx: string;
    originalName: string;
    size: number;
    projectIdx: number;
  }[];
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
    subscribePeriod: string;
    chargingPointRate: string;
    userInvestRate: string;
    subscribePricePerMonth: string;
    constructionPeriod: string;
    subscribeProductFeature: string;
    spotInspectionResult: string;
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
        finalQuotationChargerFiles: FinalQuotationChargerFiles[];
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
    quotationRequest: {
      installationPurpose: string;
    };
  };

  userMember: {
    memberIdx: number;
    name: number;
    phone: number;
  };
  contract: {
    documentId: string;
    contractContent: string;
  };
}
export interface HistoryProjectsDetail {
  totalCount: number;
  projects: Projects[];
}
export interface ResponseHistoryProjectsDetail {
  completedProjects: HistoryProjectsDetail;
}
//  완료 프로젝트
export const GET_historyProjectsDetail = gql`
  query Query(
    $searchKeyword: String!
    $sort: CompletedProjectsSort!
    $page: Int
    $limit: Int
  ) {
    completedProjects(
      searchKeyword: $searchKeyword
      sort: $sort
      page: $page
      limit: $limit
    ) {
      totalCount
      projects {
        badge
        projectIdx
        projectName
        projectNumber
        subscribeStartDate
        subscribeEndDate
        projectCompletionFiles {
          url
          projectCompletionFileIdx
          originalName
          size
          projectIdx
        }
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
          subscribePeriod
          chargingPointRate
          userInvestRate
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
            chargePriceType
            chargePrice
            installationLocation
            modelName
            manufacturer
            productFeature
            finalQuotationChargerFiles {
              finalQuotationChargerFileIdx
              productFileType
              originalName
              url
              size
            }
          }
          finalQuotationDetailFiles {
            finalQuotationDetailFileIdx
            originalName
            url
            size
          }
          # 설치 목적
          quotationRequest {
            installationPurpose
          }
        }
        # 유저 정보
        userMember {
          memberIdx
          name
          phone
        }
        contract {
          documentId
          contractContent
        }
      }
    }
  }
`;
// 계약서 정보 조회

export interface Contract {
  project: {
    contract: {
      contractIdx: string;
      documentId: string;
      contractContent: string;
      contractHistory: string;
      projectIdx: number;
      // contractParticipants: {
      //   contractParticipantIdx: string;
      //   participantId: string;
      //   participantType: string;
      //   participantName: string;
      //   signatureMethod: string;
      //   signatureContact: string;
      //   signatureStatus: string;
      //   signatureDate: string;
      //   memberIdx: number | null;
      //   contractIdx: number;
      // }[];
    };
  };
}

export const GET_contract = gql`
  query Project($projectIdx: ID!) {
    project(projectIdx: $projectIdx) {
      contract {
        contractIdx
        documentId
        contractContent
        contractHistory
        projectIdx
        # contractParticipants {
        #   contractParticipantIdx
        #   participantId
        #   participantType
        #   participantName
        #   signatureMethod
        #   signatureContact
        #   signatureStatus
        #   signatureDate
        #   memberIdx
        #   contractIdx
        # }
      }
    }
  }
`;
