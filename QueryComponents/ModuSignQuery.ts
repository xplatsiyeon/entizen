import { gql } from '@apollo/client';

/**
 * 판매자 - 프로젝트 리스트
 */
export const GET_ModuSignResponse = gql`
  query Query {
    # 전기차 충전소 명칭 / 위탁사 주소
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
      # 기타 요청사항
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
