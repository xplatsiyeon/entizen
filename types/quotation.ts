// 회사 멤버 정보
export interface CompanyMemberAdditionalInfo {
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  companyMemberAdditionalInfoIdx: number;
  companyLogoImageUrl: string | null;
  companyName: string;
  companyAddress: string;
  companyDetailAddress: string;
  companyZipCode: string;
  managerEmail: string;
  memberIdx: number;
}
// 회사 멤버
export interface CompanyMember {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  memberIdx: number;
  memberType: string;
  name: string;
  phone: string;
  id: string;
  birthDate: string;
  isAdminJoinApproved: boolean;
  profileImageUrl: string | null;
  initialLoginDate: string;
  etc: string | null;
  companyMemberAdditionalInfo: CompanyMemberAdditionalInfo;
}
// 유저 멤버
export interface UserMember {
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  memberIdx: number;
  memberType: string;
  name: string;
  phone: string;
  id: string;
  birthDate: null | string;
  isAdminJoinApproved: boolean;
  profileImageUrl: string;
  initialLoginDate: string;
  etc: string;
}
// 최종 견적 충전기들
export interface FinalQuotationChargers {
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  finalQuotationChargerIdx: number;
  kind: string;
  standType: string;
  channel: string;
  count: number;
  chargePriceType: string;
  chargePrice: number;
  installationLocation: string;
  modelName: string | null;
  manufacturer: string;
  productFeature: string;
  finalQuotationIdx: number;
}
// 최종 견적 이미지 , 파일 , 사업자 등록증
export interface FinalQuotationDetailFiles {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  finalQuotationDetailFileIdx: number;
  originalName: string;
  url: string;
  size: number;
  finalQuotationIdx: number;
}
// 최종 견적서
export interface FinalQuotation {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  finalQuotationIdx: number;
  subscribeProduct: string;
  subscribePeriod: number;
  userInvestRate: string;
  chargingPointRate: string;
  chargingStationInstallationPrice: number;
  subscribePricePerMonth: number;
  constructionPeriod: number;
  subscribeProductFeature: string;
  spotInspectionResult: string;
  quotationRequestIdx: number;
  preQuotationIdx: number;
  finalQuotationChargers: FinalQuotationChargers[];
  finalQuotationDetailFiles: FinalQuotationDetailFiles[];
}
// 간편 견적 설치 포인트
export interface QuotationRequestInstallationPoints {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  quotationRequestInstallationPointIdx: number;
  rank: number;
  point: string;
  quotationRequestIdx: number;
}
// 간편 견적 충전기들
export interface QuotationRequestChargers {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  quotationRequestChargerIdx: number;
  kind: string;
  standType: string;
  channel: string;
  count: number;
  quotationRequestIdx: number;
}
// 간편 견적 히스토리 , 데이터 메인
export interface QuotationStatusHistories {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  quotationStatusHistoryIdx: number;
  quotationRequestStatus: string;
  preQuotationStatus: string;
  completeEnteringFinalQuotation: string;
  quotationRequestIdx: number;
  preQuotationIdx: number;
  preQuotation: {
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
    preQuotationIdx: number;
    chargingStationInstallationPrice: number;
    subscribePricePerMonth: number;
    constructionPeriod: number;
    subscribeProductFeature: string;
    changedDate: string;
    quotationRequestIdx: number;
    memberIdx: number;
    finalQuotation: FinalQuotation;
    member: CompanyMember;
  };
}
// 간편 견적
export interface QuotationRequest {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  quotationRequestIdx: number;
  quotationStatus: string;
  changedDate: string;
  subscribeProduct: string;
  investRate: string;
  subscribePeriod: number;
  installationAddress: string;
  installationAddressWithPoundSign: string | null;
  installationLocation: string;
  installationPurpose: string;
  expiredAt: string;
  etcRequest: string;
  currentInProgressPreQuotationIdx: null | number;
  closedStatusAtForCancel: null | boolean;
  spotInspectionReceivedAtForCancel: null | boolean;
  finalQuotationReceivedAtForCancel: null | boolean;
  memberIdx: number;
  quotationStatusHistories: QuotationStatusHistories[];
  member: UserMember;
  quotationRequestInstallationPoints: QuotationRequestInstallationPoints[];
  quotationRequestChargers: QuotationRequestChargers[];
  hasCurrentInProgressPreQuotationIdx: boolean;
  maskingInstallationAddress: string;
  badge: string;
}
// 간편 견적 응답
export interface QuotationDataV1 {
  isSuccess: true;
  quotationRequest: QuotationRequest;
}
