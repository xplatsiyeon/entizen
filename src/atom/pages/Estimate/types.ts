// 사전정보 atom types
export interface formTypes {
  name: string; // 사용자 이름
  phone: string; // 사용자 연락처
  place: string; // 설치 장소
  placeEtc?: string; // 설치 장소에서 기타 선택시
  possess: string; // 전기차 보유 여부
  modelName: string; // 모델명
  isAgree: boolean; // 개인정보 수집및 동의 여부
}

export interface setAtomTypes {
  name: string;
  value: any;
}

// 최종선택 atom types
export interface selectionFormTypes {
  option: string;
  name: string; // 사용자 이름
  phone: string; // 사용자 연락처
  address: string;
  addressDetail: string;
  isAgree: boolean; // 개인정보 수집및 동의 여부
}
