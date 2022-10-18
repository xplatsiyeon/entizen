import { createSlice } from '@reduxjs/toolkit';

type chargerData =
  | 'LECS-007ADE'
  | 'LECS-006ADE'
  | 'LECS-005ADE'
  | 'LECS-004ADE';

// 2스텝
interface chargers {
  chargeType: '구매자 자율' | '운영사업자 입력';
  fee: number;
  manufacturingCompany: chargerData;
  chargeFeatures: string;
  chargeImage: [
    {
      url: string;
      size: number;
      originalName: string;
    },
  ];
  chargeFile: [
    {
      url: string;
      size: number;
      originalName: string;
    },
  ];
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
  charge: [],
};

const slice = createSlice({
  name: 'findUserInfo',
  initialState,
  reducers: {
    addId(state, action) {
      state = action.payload;
    },
  },
});

export const myEstimateActions = slice.actions;
export const myEstimateSlice = slice;
