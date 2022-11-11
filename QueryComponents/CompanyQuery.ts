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

interface UserMember {
  memberIdx: string;
  memberType: string;
  name: string;
  phone: string;
}

interface FinalQuotationChargers {
  finalQuotationChargerIdx: string;
  kind: string;
  standType: string;
  channel: string;
  count: number;
  installationLocation: string;
  manufacturer: string;
  productFeature: string;
}

interface FinalQuotation {
  finalQuotationIdx: string;
  subscribeProduct: string;
  subscribePeriod: string;
  userInvestRate: string;
  chargingPointRate: string;
  subscribePricePerMonth: number;
  constructionPeriod: number;
  subscribeProductFeature: string;
  spotInspectionResult: string;
  finalQuotationChargers: FinalQuotationChargers[];
}

export interface InProgressProjectsDetail {
  projectIdx: string;
  projectName: string;
  badge: string;
  projectNumber: string;
  userMember: UserMember;
  finalQuotation: FinalQuotation;
}

export const GET_InProgressProjectsDetail = gql`
  query Query {
    inProgressProjects {
      projectIdx
      projectName
      badge
      projectNumber
      userMember {
        memberIdx
        memberType
        name
        phone
      }
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
          manufacturer
          productFeature
        }
      }
    }
  }
`;
