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
  finalQuotationChargerFiles: FinalQuotationDetailFiles[];
}
// 최종 견적 이미지 , 파일 , 사업자 등록증
export interface FinalQuotationDetailFiles {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  finalQuotationDetailFileIdx: number;
  productFileType: 'IMAGE' | 'CATALOG';
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
// 가견적 타입
export interface PreQuotation {
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
  preQuotation: PreQuotation;
}
// 간편 견적
export interface QuotationRequestV1 {
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
  badge: string;
}
// 간편 견적 응답
export interface QuotationDataV1Response {
  isSuccess: true;
  quotationRequest: QuotationRequestV1;
}

export interface QuotationRequests {
  createdAt: string;
  quotationRequestIdx: number;
  quotationStatus: string;
  changedDate: string;
  subscribeProduct: string;
  investRate: string;
  subscribePeriod: number;
  installationAddress: string;
  installationAddressWithPoundSign: null | boolean;
  installationLocation: string;
  installationPurpose: string;
  expiredAt: string;
  etcRequest: string;
  currentInProgressPreQuotationIdx: null | number;
  closedStatusAtForCancel: null;
  spotInspectionReceivedAtForCancel: null | boolean;
  finalQuotationReceivedAtForCancel: null | boolean;
  memberIdx: number;
  quotationStatusHistories: QuotationStatusHistories[];
  badge: string;
}
// 진행 중인 간편견적 리스트 조회

export interface InProgressQuotationRequestsResponse {
  isSuccess: true;
  data: {
    inProgressQuotationRequests: QuotationRequests[];
    totalCount: number;
  };
}
// 간편견적 히스토리 리스트 조회
export interface QuotationRequestHistoriesResponse {
  isSuccess: true;
  data: {
    quotationRequestHistories: QuotationRequests[];
    totalCount: number;
  };
}
// 충전소 히스토리
export interface QuotationStatusHistory {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  quotationStatusHistoryIdx: number;
  quotationRequestStatus: string;
  preQuotationStatus: string;
  completeEnteringFinalQuotation: string;
  quotationRequestIdx: number;
  preQuotationIdx: number;
}
// 가견적 파일들
export interface preQuotationFiles {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  preQuotationFileIdx: number;
  productFileType: 'IMAGE' | 'CATALOG';
  originalName: string;
  url: string;
  size: number;
  preQuotationChargerIdx: number;
}
// 가견적 충전기
export interface PreQuotationChargers {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  preQuotationChargerIdx: number;
  chargePriceType: string;
  chargePrice: number;
  modelName: string | null;
  manufacturer: string;
  productFeature: string | null;
  preQuotationIdx: number;
  preQuotationFiles: preQuotationFiles[];
}
// 가견적 데이터
export interface PreQuotationsV1 {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  preQuotationIdx: number;
  chargingStationInstallationPrice: number;
  subscribePricePerMonth: number;
  constructionPeriod: number;
  subscribeProductFeature: string | null;
  changedDate: string;
  quotationRequestIdx: number;
  memberIdx: number;
  quotationRequest: {
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
    quotationRequestIdx: number;
    quotationStatus: string;
    changedDate: string;
    subscribeProduct: string;
    investRate: string;
    subscribePeriod: number;
    installationAddress: string;
    installationAddressWithPoundSign: null | boolean;
    installationLocation: string;
    installationPurpose: string;
    expiredAt: string;
    etcRequest: string;
    currentInProgressPreQuotationIdx: null | number;
    closedStatusAtForCancel: null | boolean;
    spotInspectionReceivedAtForCancel: null | boolean;
    finalQuotationReceivedAtForCancel: null | boolean;
    memberIdx: number;
    quotationRequestChargers: QuotationRequestChargers[];
    member: UserMember;
    quotationRequestInstallationPoints: QuotationRequestInstallationPoints[];
  };
  quotationStatusHistory: QuotationStatusHistory;
  finalQuotation: FinalQuotation;
  member: CompanyMember;
  preQuotationChargers: PreQuotationChargers[];
  badge: string;
  installationAddress: string;
}
// 가견적 상세 조회
export interface preQuotationResPonse {
  isSuccess: true;
  preQuotation: PreQuotationsV1;
}
