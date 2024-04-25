import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

interface DatePicker {
  quotationRequestIdx: { preQuotationIdx: number; finalQuotationIdx: number };
  isCompanyDetail: boolean;
}

export type QuotationObject = {
  preQuotationIdx: number;
  finalQuotationIdx: number;
};
const initialState: DatePicker = {
  quotationRequestIdx: { preQuotationIdx: 0, finalQuotationIdx: 0 },
  isCompanyDetail: false,
};

const slice = createSlice({
  name: 'adminReverseStore',
  initialState,
  reducers: {
    setDate(state, action: PayloadAction<QuotationObject>) {
      // console.log(action.payload);
      state.quotationRequestIdx = action.payload;
    },
    setIsCompanyDetail(state, action: PayloadAction<boolean>) {
      // console.log(action.payload);
      state.isCompanyDetail = action.payload;
    },

    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const adminReverseAction = slice.actions;
export const adminReverseSlice = slice;
