import { createSlice } from '@reduxjs/toolkit';
export type chargerData =
  | ''
  | 'LECS-007ADE'
  | 'LECS-006ADE'
  | 'LECS-005ADE'
  | 'LECS-004ADE';

// 2스텝
export interface Upload {
  url: string;
  size: number;
  originalName: string;
}
export interface chargers {
  chargePriceType:
    | ''
    | 'PURCHASER_AUTONOMY'
    | 'OPERATION_BUSINESS_CARRIER_INPUT';
  chargePrice: number;
  modelName: chargerData;
  manufacturer: string;
  feature: string;
  chargerImageFiles: Upload[];
  catalogFiles: Upload[];
}

// 1스텝 + 2스텝
interface StateType {
  chargingStationInstallationPrice: number;
  subscribePricePerMonth: number;
  constructionPeriod: number;
  subscribeProductFeature: string;
  chargers: chargers[];
}

const initialState: StateType = {
  chargingStationInstallationPrice: 0,
  subscribePricePerMonth: 0,
  constructionPeriod: 0,
  subscribeProductFeature: '',
  chargers: [
    {
      chargePriceType: '',
      chargePrice: 0,
      modelName: '',
      manufacturer: '',
      feature: '',
      chargerImageFiles: [],
      catalogFiles: [],
    },
    {
      chargePriceType: '',
      chargePrice: 0,
      modelName: '',
      manufacturer: '',
      feature: '',
      chargerImageFiles: [],
      catalogFiles: [],
    },
    {
      chargePriceType: '',
      chargePrice: 0,
      modelName: '',
      manufacturer: '',
      feature: '',
      chargerImageFiles: [],
      catalogFiles: [],
    },
    {
      chargePriceType: '',
      chargePrice: 0,
      modelName: '',
      manufacturer: '',
      feature: '',
      chargerImageFiles: [],
      catalogFiles: [],
    },
    {
      chargePriceType: '',
      chargePrice: 0,
      modelName: '',
      manufacturer: '',
      feature: '',
      chargerImageFiles: [],
      catalogFiles: [],
    },
  ],
};

const slice = createSlice({
  name: 'companymyEstimate',
  initialState,
  reducers: {
    addFisrtData(state, action) {
      state.subscribePricePerMonth = action.payload.subscribePricePerMonth;
      state.constructionPeriod = action.payload.constructionPeriod;
      state.subscribeProductFeature = action.payload.subscribeProductFeature;
      state.chargingStationInstallationPrice =
        action.payload.chargingStationInstallationPrice;
    },
    addCharge(state, action) {
      state.chargers.push(action.payload);
    },
    setCharge(state, action) {
      const { index, data } = action.payload;
      state.chargers[index] = data;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const myEstimateAction = slice.actions;
export const myEstimateSlice = slice;
