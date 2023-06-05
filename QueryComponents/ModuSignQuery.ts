import { gql } from '@apollo/client';

/**
 * 판매자 - 프로젝트 리스트
 */
export const GET_ModuSignResponse = gql`
  query Query($projectIdx: ID!) {
    project(projectIdx: $projectIdx) {
      projectName
      projectNumber
      projectIdx
      companyMember {
        name
        phone
        memberIdx
        companyMemberAdditionalInfo {
          companyAddress
          companyDetailAddress
          companyName
        }
      }
      userMember {
        phone
        name
        memberIdx
      }
      finalQuotation {
        chargingPointRate
        chargingStationInstallationPrice
        constructionPeriod
        userInvestRate
        subscribeProduct
        subscribePricePerMonth
        finalQuotationChargers {
          channel
          chargePrice
          chargePriceType
          count
          installationLocation
          kind
          standType
        }
        quotationRequest {
          etcRequest
          subscribePeriod
        }
        subscribePeriod
      }
      contract {
        contractContent
        documentId
        contractHistory
        projectIdx
      }
    }
  }
`;

export interface ModuSignResponse {
  project: {
    projectName: string;
    projectNumber: string;
    projectIdx: string;
    companyMember: {
      name: string;
      phone: string;
      memberIdx: string;
      companyMemberAdditionalInfo: {
        companyAddress: string;
        companyDetailAddress: string;
        companyName: string;
      };
    };
    userMember: {
      phone: string;
      name: string;
      memberIdx: string;
    };
    finalQuotation: {
      chargingPointRate: string;
      chargingStationInstallationPrice: number | string;
      constructionPeriod: number | string;
      userInvestRate: string;
      subscribeProduct: string;
      subscribePricePerMonth: number | string;
      finalQuotationChargers: {
        channel: string;
        chargePrice: number | string;
        chargePriceType: string;
        count: number | string;
        installationLocation: string;
        kind: string;
        standType: string;
      }[];
      quotationRequest: {
        etcRequest: string;
        subscribePeriod: string;
      };
      subscribePeriod: string;
    };
    contract: {
      documentId: string;
      contractContent: string;
      contractHistory: string;
      projectIdx: number;
    };
  };
}
