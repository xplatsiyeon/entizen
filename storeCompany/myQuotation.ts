import { createSlice } from '@reduxjs/toolkit';
export type chargerData =
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
  chargeType: '' | '구매자 자율' | '운영사업자 입력';
  fee: string;
  productItem: chargerData;
  manufacturingCompany: string;
  chargeFeatures: string;
  chargeImage: Upload[];
  chargeFile: Upload[];
}

// 1스텝 + 2스텝
interface StateType {
  subscription: number;
  period: number;
  features: string;
  charge: chargers[];
}

const initialState: StateType = {
  subscription: 0,
  period: 0,
  features: '',
  charge: [
    {
      chargeType: '',
      fee: '',
      productItem: '',
      manufacturingCompany: '',
      chargeFeatures: '',
      chargeImage: [],
      chargeFile: [],
    },
    {
      chargeType: '',
      fee: '',
      productItem: '',
      manufacturingCompany: '',
      chargeFeatures: '',
      chargeImage: [],
      chargeFile: [],
    },
    {
      chargeType: '',
      fee: '',
      productItem: '',
      manufacturingCompany: '',
      chargeFeatures: '',
      chargeImage: [],
      chargeFile: [],
    },
    {
      chargeType: '',
      fee: '',
      productItem: '',
      manufacturingCompany: '',
      chargeFeatures: '',
      chargeImage: [],
      chargeFile: [],
    },
    {
      chargeType: '',
      fee: '',
      productItem: '',
      manufacturingCompany: '',
      chargeFeatures: '',
      chargeImage: [],
      chargeFile: [],
    },
  ],
};

const slice = createSlice({
  name: 'companymyEstimate',
  initialState,
  reducers: {
    addFisrtData(state, action) {
      state.subscription = action.payload.subscription;
      state.period = action.payload.period;
      state.features = action.payload.features;
    },
    addCharge(state, action) {
      state.charge.push(action.payload);
    },
    setCharge(state, action) {
      const { index, data } = action.payload;
      state.charge[index] = data;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const myEstimateAction = slice.actions;
export const myEstimateSlice = slice;
