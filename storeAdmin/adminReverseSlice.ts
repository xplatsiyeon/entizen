import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

interface DatePicker {
  quotationRequestIdx: number;
  isCompanyDetail: boolean;
}

const initialState: DatePicker = {
  quotationRequestIdx: 0,
  isCompanyDetail: false,
};

const slice = createSlice({
  name: 'adminReverseStore',
  initialState,
  reducers: {
    setDate(state, action: PayloadAction<number>) {
      console.log(action.payload);
      state.quotationRequestIdx = action.payload;
    },
    setIsCompanyDetail(state, action: PayloadAction<boolean>) {
      console.log(action.payload);
      state.isCompanyDetail = action.payload;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const adminReverseAction = slice.actions;
export const adminReverseSlice = slice;
