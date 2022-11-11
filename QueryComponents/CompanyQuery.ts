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

export interface FinalQuotationChargers {
  finalQuotationChargerIdx: string;
  kind: string;
  standType: string;
  channel: 'SINGLE' | 'DUAL' | 'MODE_3';
  count: number;
  installationLocation: 'INSIDE' | 'OUTSIDE';
}

export interface InProgressProjectsDetail {
  data: {
    project: {
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
        };
      };
      userMember: UserMember;
    };
  };
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
    }
  }
`;
