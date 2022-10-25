import { createSlice } from '@reduxjs/toolkit';

interface Chargers {
  kind: string;
  standType: string;
  channel: string;
  count: string;
}

interface FinalQuotation {
  subscribeProduct: string; // 구독상품
  subscribePeriod: number; // 구독기간
  profitableInterestUser: number; // 수익지분 - 고객
  chargePoint: number; // 수익지분 - charge point
  subscribePricePerMonth: number; // 월 구독료
  chargers: Chargers[]; // 충전기 종류 및 수량 선택
  constructionPeriod: number; // 공사기간
  dueDiligenceResult: string; // 현장실사 결과
  subscribeProductFeature: string; // 구독상품 특장점
}

const initialState = {};

const slice = createSlice({
  name: 'finalQuotation',
  initialState,
  reducers: {
    // addFirstStep(state, action) {
    //   state.tabNumber = action.payload;
    // },
    // addSecondStep(state, action) {
    //   state.tabNumber = action.payload;
    // },
    // addThirdStep(state, action) {
    //   state.tabNumber = action.payload;
    // },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const finalQuotationAction = slice.actions;
export const finalQuotationSlice = slice;
