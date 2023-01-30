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
        }
      }
    }
  }
`;

export interface ModuSignResponse {
  project: {
    data: {
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
          };
        };
        userMember: {
          phone: string;
          name: string;
          memberIdx: string;
        };
        finalQuotation: {
          chargingPointRate: string;
          chargingStationInstallationPrice: number;
          constructionPeriod: number;
          userInvestRate: string;
          subscribeProduct: string;
          subscribePricePerMonth: number;
          finalQuotationChargers: {
            channel: string;
            chargePrice: number;
            chargePriceType: string;
            count: number;
            installationLocation: string;
            kind: string;
            standType: string;
          }[];
          quotationRequest: {
            etcRequest: string;
          };
        };
      };
    };
  };
}
