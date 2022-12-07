import { createSlice } from '@reduxjs/toolkit';

export interface RequesQuotationtData {
  investRate: string;
  isSuccess: boolean;
  maxSubscribePricePerMonth: number;
  maxTotalSubscribePrice: number;
  minSubscribePricePerMonth: number;
  minTotalSubscribePrice: number;
  predictedProfitTime: string;
}

export interface Option {
  kind: string;
  standType: string;
  channel: string;
  count: string;
}
export interface OptionKo {
  idx: number;
  kind: string;
  standType: string;
  channel: string;
  count: string;
}
export interface Data {
  requestData?: RequesQuotationtData;
  chargers: Option[];
  chargersKo: OptionKo[];
  subscribeProduct: '' | 'ENTIRETY' | 'PART';
  investRate: string;
  subscribePeriod: '' | '24' | '26' | '48' | '60';
  installationLocation: '' | 'OUTSIDE' | 'INSIDE';
  installationPoints: string[];
  installationPurpose: '' | string;
}

const initialState: Data = {
  requestData: undefined,
  chargers: [
    {
      kind: '',
      standType: '',
      channel: '',
      count: '',
    },
  ],
  chargersKo: [
    {
      idx: 0,
      kind: '',
      standType: '',
      channel: '',
      count: '',
    },
  ],
  investRate: '0',
  subscribePeriod: '',
  subscribeProduct: '',
  installationLocation: '',
  installationPoints: [],
  installationPurpose: '',
};

const slice = createSlice({
  name: 'quotationData',
  initialState,
  reducers: {
    setRequestData(state, action) {
      state.requestData = action.payload;
    },
    setChargers(state, action) {
      state.chargers = action.payload;
    },
    setChargersKo(state, action) {
      state.chargersKo = action.payload;
    },
    setStep2(state, action) {
      state.subscribeProduct = action.payload.subscribeProduct;
      state.investRate = action.payload.investRate;
    },
    setStep3(state, action) {
      state.subscribePeriod = action.payload;
    },
    setStep4(state, action) {
      state.installationLocation = action.payload;
    },
    setStep5(state, action) {
      state.installationPoints = action.payload;
    },
    setStep6(state, action) {
      state.installationPurpose = action.payload;
    },
    init(state) {
      Object.assign(state, initialState);
    },
    investRateControl(state, action) {
      state.investRate = action.payload;
    },
  },
});

export const quotationAction = slice.actions;
export const quotationSlice = slice;
