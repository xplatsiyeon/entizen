import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedOption {
  kind: string;
  standType: string;
  channel: string;
  count: string;
}

type chargerData =
  | ''
  | 'LECS-007ADE'
  | 'LECS-006ADE'
  | 'LECS-005ADE'
  | 'LECS-004ADE';

// 2스텝
interface Upload {
  url: string;
  size: number;
  originalName: string;
}
interface chargers {
  chargePriceType:
    | ''
    | 'PURCHASER_AUTONOMY'
    | 'OPERATION_BUSINESS_CARRIER_INPUT';
  chargePrice: 24 | 36 | 48 | 60;
  installationLocation: '' | 'OUTSIDE' | 'INSIDE';
  modelName: chargerData;
  manufacturer: string;
  feature: string;
  chargerImageFiles: Upload[];
  catalogFiles: Upload[];
}

interface FirstStep {
  // ------- step1 --------
  subscribeProduct: string; // 구독상품
  subscribePeriod: number; // 구독기간
  profitableInterestUser: number; // 수익지분 - 고객
  chargePoint: number; // 수익지분 - charge point
  subscribePricePerMonth: number; // 월 구독료
  selectedOption: SelectedOption[]; // 충전기 종류 및 수량 선택
  selectedOptionEn: SelectedOption[]; // 충전기 종류 및 수량 선택
  constructionPeriod: number; // 공사기간
  dueDiligenceResult: string; // 현장실사 결과
  subscribeProductFeature: string; // 구독상품 특장점
}
interface FinalQuotation extends FirstStep {
  // ------- step2 --------
  chargers: chargers[];
  // ------- step3 --------
  businessRegistration: Upload[];
}

const initialState: FinalQuotation = {
  subscribeProduct: '',
  subscribePeriod: 24,
  profitableInterestUser: 0,
  chargePoint: 0,
  subscribePricePerMonth: 0,
  selectedOption: [],
  selectedOptionEn: [],
  constructionPeriod: 0,
  dueDiligenceResult: '',
  subscribeProductFeature: '',
  // ------- step2 --------
  chargers: [],
  // ------- step3 --------
  businessRegistration: [],
};

const slice = createSlice({
  name: 'finalQuotation',
  initialState,
  reducers: {
    addFirstStep(state, action: PayloadAction<FirstStep>) {
      state.subscribeProduct = action.payload.subscribeProduct;
      state.subscribePeriod = action.payload.subscribePeriod;
      state.profitableInterestUser = action.payload.profitableInterestUser;
      state.chargePoint = action.payload.chargePoint;
      state.subscribePricePerMonth = action.payload.subscribePricePerMonth;
      state.selectedOption = action.payload.selectedOption;
      state.selectedOptionEn = action.payload.selectedOptionEn;
      state.constructionPeriod = action.payload.constructionPeriod;
      state.dueDiligenceResult = action.payload.dueDiligenceResult;
      state.subscribeProductFeature = action.payload.subscribeProductFeature;
    },
    addChargeStep(state, action: PayloadAction<chargers>) {
      state.chargers.push(action.payload);
    },
    removeChargeStep(state, action: PayloadAction<number>) {
      state.chargers.splice(action.payload, 1);
    },
    addThirdStep(state, action: PayloadAction<Upload>) {
      state.businessRegistration.push(action.payload);
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const finalQuotationAction = slice.actions;
export const finalQuotationSlice = slice;
