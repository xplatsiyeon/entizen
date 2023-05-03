import { gql } from '@apollo/client';
// 내 프로젝트 관련 API
export interface MyprojectList {
  projectIdx: string;
  badge: string;
  projectName: string;
  companyMember: {
    memberIdx: string;
    companyMemberAdditionalInfo: {
      companyName: string;
    };
  };
  projectCompletionAgreementDate: string;
  isApprovedByAdmin: boolean;
}

export interface MyprojectListResponse {
  uncompletedProjects: {
    projects: MyprojectList[];
    totalCount: number;
  };
}

// 프로젝트 리스트
export const myprojectList = gql`
  query Query($page: Int, $limit: Int) {
    uncompletedProjects(page: $page, limit: $limit) {
      totalCount
      projects {
        projectIdx
        badge
        projectName
        companyMember {
          memberIdx
          companyMemberAdditionalInfo {
            companyName
          }
        }
        projectCompletionAgreementDate
        isApprovedByAdmin
      }
    }
  }
`;
// 내 충전소 관련 API
export interface FinalQuotationChargerFiles {
  finalQuotationChargerFileIdx: string;
  productFileType: string;
  originalName: string;
  url: string;
  size: string;
}
export interface FinalQuotationChargers {
  finalQuotationChargerIdx: string;
  kind: string;
  standType: string;
  channel: string;
  count: number;
  chargePrice: number;
  manufacturer: string;
  installationLocation: string;
  finalQuotationChargerFiles: FinalQuotationChargerFiles[];
}
export interface FinalQuotation {
  finalQuotationIdx: string;
  subscribeProduct: string;
  userInvestRate: string;
  subscribePricePerMonth: number;
  chargingStationInstallationPrice: number;
  finalQuotationChargers: FinalQuotationChargers[];
  quotationRequest: {
    installationPurpose: string;
  };
  finalQuotationDetailFiles: FinalQuotationDetailFiles[];
}
export interface ProjectCompletionFiles {
  projectCompletionFileIdx: string;
  originalName: string;
  url: string;
  size: number;
  projectIdx: number;
}
export interface CompanyMember {
  memberIdx: string;
  name: string;
  phone: string;
  companyMemberAdditionalInfo: {
    companyName: string;
    managerEmail: string;
  };
}

export interface ProjectReview {
  projectReviewIdx: number;
  attentivenessPoint: number;
  quicknessPoint: number;
  professionalismPoint: number;
  satisfactionPoint: number;
  averagePoint: number;
  opinion: string;
  projectIdx: number;
}

export interface FinalQuotationDetailFiles {
  finalQuotationDetailFileIdx: string;
  originalName: string;
  size: number;
  url: string;
}

export interface ChargingStations {
  projectIdx: string;
  projectName: string;
  badge: string;
  projectNumber: string;
  subscribeStartDate: string;
  subscribeEndDate: string;
  finalQuotation: FinalQuotation;
  projectCompletionFiles: ProjectCompletionFiles[];
  companyMember: CompanyMember;
  projectReview: ProjectReview;

  contract: {
    documentId: string;
    contractContent: string;
    // {
    //   title?: string;
    // };
  };
}
export interface ChargingStationsResponse {
  chargingStations: {
    totalCount: number;
    projects: ChargingStations[];
  };
}

export const chargingStations = gql`
  query Query($page: Int, $limit: Int) {
    chargingStations(page: $page, limit: $limit) {
      totalCount
      projects {
        projectIdx
        projectName
        badge
        projectNumber
        subscribeStartDate
        subscribeEndDate
        # 최종견적 내용
        finalQuotation {
          finalQuotationIdx
          subscribeProduct
          userInvestRate
          subscribePricePerMonth
          chargingStationInstallationPrice
          # 최종견적 충전기
          finalQuotationChargers {
            finalQuotationChargerIdx
            kind
            standType
            channel
            count
            chargePrice
            manufacturer
            installationLocation
            finalQuotationChargerFiles {
              finalQuotationChargerFileIdx
              productFileType
              originalName
              url
              size
            }
          }
          # 설치 목적
          quotationRequest {
            installationPurpose
          }
          # 사업자 등록증, 상세 견적서
          finalQuotationDetailFiles {
            finalQuotationDetailFileIdx
            originalName
            size
            url
          }
        }
        # 완료 사진 리스트
        projectCompletionFiles {
          projectCompletionFileIdx
          originalName
          url
          size
          projectIdx
        }
        # 기업 정보
        companyMember {
          memberIdx
          name
          phone
          companyMemberAdditionalInfo {
            companyName
            managerEmail
          }
        }
        # 프로젝트 리뷰
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
        contract {
          contractContent
          documentId
        }
      }
    }
  }
`;

// AS 상단 부분 조회
export interface AsRequest {
  project: {
    projectIdx: string;
    projectName: string;
    projectNumber: string;
    finalQuotation: {
      subscribeProduct: string;
      userInvestRate: string;
      subscribePeriod: string;
      quotationRequest: {
        installationPurpose: string;
        etcRequest: string;
      };
      finalQuotationChargers: [
        {
          finalQuotationChargerIdx: string;
          kind: string;
          standType: string;
          channel: string;
          count: number;
          installationLocation: string;
        },
      ];
    };
  };
}

export const asRequest = gql`
  query Query($projectIdx: ID!) {
    project(projectIdx: $projectIdx) {
      projectIdx
      projectName
      projectNumber
      finalQuotation {
        subscribeProduct
        userInvestRate
        subscribePeriod
        quotationRequest {
          installationPurpose
          etcRequest
        }
        finalQuotationChargers {
          finalQuotationChargerIdx
          kind
          standType
          channel
          count
          installationLocation
        }
      }
    }
  }
`;
