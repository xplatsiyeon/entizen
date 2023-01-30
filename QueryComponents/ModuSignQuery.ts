import { gql } from '@apollo/client';

/**
 * 판매자 - 프로젝트 리스트
 */
export const GET_ModuSignResponse = gql`
  query Query {
    inProgressProjects {
      projectName
      projectNumber
      projectIdx
      finalQuotation {
        subscribeProduct
        chargingPointRate
        userInvestRate
        chargingStationInstallationPrice
        subscribePeriod
        finalQuotationChargers {
          channel
          chargePrice
          standType
          kind
          installationLocation
          count
        }
        quotationRequest {
          etcRequest
        }
      }
      userMember {
        name
        phone
      }
      companyMember {
        name
        phone
        companyMemberAdditionalInfo {
          companyAddress
        }
      }
    }
  }
`;

export interface ModuSignResponse {
  data: {
    inProgressProjects: {
      projectName: string;
      projectNumber: string;
      projectIdx: string;
      finalQuotation: {
        subscribeProduct: string;
        chargingPointRate: string;
        userInvestRate: string;
        chargingStationInstallationPrice: number;
        subscribePeriod: string;
        finalQuotationChargers: {
          channel: string;
          chargePrice: number;
          standType: string;
          kind: string;
          installationLocation: string;
          count: number;
        }[];

        quotationRequest: {
          etcRequest: string;
        };
      };
      userMember: {
        name: string;
        phone: string;
      };
      companyMember: {
        name: string;
        phone: string;
        companyMemberAdditionalInfo: {
          companyAddress: string;
        };
      };
    }[];
  };
}
