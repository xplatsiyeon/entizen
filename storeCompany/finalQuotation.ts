import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface DetailQuotationFiles {
  url: string;
  size: number;
  originalName: string;
}
export interface charger {
  idx: number;
  kind: string; // 종류
  standType: string; // 거치 타입
  channel: string; // 채널
  count: string; // 수량
}
export type InstallationLocation = '' | 'OUTSIDE' | 'INSIDE';
export type ChargePriceType =
  | ''
  | 'PURCHASER_AUTONOMY'
  | 'OPERATION_BUSINESS_CARRIER_INPUT';
export interface chargers extends charger {
  // 충전 요금 타입
  chargePriceType: ChargePriceType;
  chargePrice: string | number; // 충전 요금 타입
  installationLocation: InstallationLocation; // 설치 위치
  modelName: string; // 모델명
  manufacturer: string; // 제조사
  productFeature: string; // 상품 특장점
  chargerImageFiles: DetailQuotationFiles[]; // 충전기 이미지 파일
  catalogFiles: DetailQuotationFiles[]; // 카탈로그 파일
}

export interface FirstStep {
  subscribeProduct: string; // 구독상품
  subscribePeriod: number; // 구독기간
  userInvestRate: number; // 수익지분 - 고객
  chargingPointRate: number; // 수익지분 - charge point
  subscribePricePerMonth: number; // 월 구독료
  chargers: chargers[];
  chargersKo: chargers[];
}
export interface SeccondStep {
  idx?: number;
  chargePriceType: ChargePriceType;
  chargePrice: string; // 충전 요금 타입
  installationLocation: InstallationLocation; // 설치 위치
  modelName: string; // 모델명
  manufacturer: string; // 제조사
  productFeature: string; // 상품 특장점
  chargerImageFiles: DetailQuotationFiles[]; // 충전기 이미지 파일
  catalogFiles: DetailQuotationFiles[]; // 카탈로그 파일
}
export interface FinalQuotation extends FirstStep {
  detailQuotationFiles: DetailQuotationFiles[];
}

const initialState: FinalQuotation = {
  subscribeProduct: '',
  subscribePeriod: 24,
  userInvestRate: 0,
  chargingPointRate: 0,
  subscribePricePerMonth: 0,
  // ------- step2 --------
  chargers: [
    {
      idx: 0,
      kind: '',
      standType: '',
      channel: '',
      count: '',
      chargePriceType: '',
      chargePrice: '',
      installationLocation: '',
      modelName: '',
      manufacturer: '',
      productFeature: '',
      chargerImageFiles: [],
      catalogFiles: [],
    },
  ],
  chargersKo: [
    {
      idx: 0,
      kind: '',
      standType: '',
      channel: '',
      count: '',
      chargePriceType: '',
      chargePrice: '',
      installationLocation: '',
      modelName: '',
      manufacturer: '',
      productFeature: '',
      chargerImageFiles: [],
      catalogFiles: [],
    },
  ],
  // ------- step3 --------
  detailQuotationFiles: [],
};

const slice = createSlice({
  name: 'finalQuotation',
  initialState,
  reducers: {
    // 최종견적 스텝1 추가
    addFirstStep(state, action: PayloadAction<FirstStep>) {
      state.subscribeProduct = action.payload.subscribeProduct;
      state.subscribePeriod = action.payload.subscribePeriod;
      state.userInvestRate = action.payload.userInvestRate;
      state.chargingPointRate = action.payload.chargingPointRate;
      state.subscribePricePerMonth = action.payload.subscribePricePerMonth;
      state.chargers = action.payload.chargers;
      state.chargersKo = action.payload.chargersKo;
    },
    setChargers(state, action) {
      state.chargers = action.payload;
    },
    setChargersKo(state, action) {
      state.chargersKo = action.payload;
    },

    addChargeStep2(state, action: PayloadAction<SeccondStep>) {
      const {
        idx,
        chargePriceType,
        chargePrice,
        installationLocation,
        modelName,
        manufacturer,
        productFeature,
        chargerImageFiles,
        catalogFiles,
      } = action.payload;
      state.chargers[idx!].chargePriceType = chargePriceType;
      state.chargers[idx!].chargePrice = chargePrice;
      state.chargers[idx!].installationLocation = installationLocation;
      state.chargers[idx!].modelName = modelName;
      state.chargers[idx!].manufacturer = manufacturer;
      state.chargers[idx!].productFeature = productFeature;
      state.chargers[idx!].chargerImageFiles = chargerImageFiles;
      state.chargers[idx!].catalogFiles = catalogFiles;
    },
    addChargeKoStep2(state, action: PayloadAction<SeccondStep>) {
      const {
        idx,
        chargePriceType,
        chargePrice,
        installationLocation,
        modelName,
        manufacturer,
        productFeature,
        chargerImageFiles,
        catalogFiles,
      } = action.payload;
      state.chargersKo[idx!].chargePriceType = chargePriceType;
      state.chargersKo[idx!].chargePrice = chargePrice;
      state.chargersKo[idx!].installationLocation = installationLocation;
      state.chargersKo[idx!].modelName = modelName;
      state.chargersKo[idx!].manufacturer = manufacturer;
      state.chargersKo[idx!].productFeature = productFeature;
      state.chargersKo[idx!].chargerImageFiles = chargerImageFiles;
      state.chargersKo[idx!].catalogFiles = catalogFiles;
    },
    addThirdStep(state, action: PayloadAction<DetailQuotationFiles>) {
      state.detailQuotationFiles.push(action.payload);
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const finalQuotationAction = slice.actions;
export const finalQuotationSlice = slice;
