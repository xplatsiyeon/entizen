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
}

export interface MyprojectListResponse {
  uncompletedProjects: MyprojectList[];
}

export const myprojectList = gql`
  query Query {
    uncompletedProjects {
      projectIdx
      badge
      projectName
      companyMember {
        memberIdx
        companyMemberAdditionalInfo {
          companyName
        }
      }
    }
  }
`;
// 내 충전소 관련 API
export interface FinalQuotationChargers {
  finalQuotationChargerIdx: string;
  kind: string;
  standType: string;
  channel: string;
  count: number;
  chargePrice: number;
  manufacturer: string;
  installationLocation: string;

  // finalQuotationChargerFiles {
  //   finalQuotationChargerFileIdx
  //   productFileType
  //   originalName
  //   url
  //   size
  // }
}
export interface FinalQuotation {
  finalQuotationIdx: string;
  subscribeProduct: string;
  userInvestRate: string;
  subscribePricePerMonth: number;
  finalQuotationChargers: FinalQuotationChargers[];
  quotationRequest: {
    installationPurpose: string;
  };
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
  attentivenessPoint: string;
  quicknessPoint: string;
  professionalismPoint: string;
  satisfactionPoint: string;
  averagePoint: string;
  opinion: string;
  projectIdx: number;
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
}
export interface ChargingStationsResponse {
  chargingStations: ChargingStations[];
}

export const chargingStations = gql`
  query Query {
    chargingStations {
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

        finalQuotationChargers {
          finalQuotationChargerIdx
          kind
          standType
          channel
          count
          chargePrice
          manufacturer
          installationLocation
        }
        # 설치 목적
        quotationRequest {
          installationPurpose
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
    }
  }
`;
