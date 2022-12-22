import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

interface DatePicker {
  quotationRequestIdx: number;
}

const initialState: DatePicker = {
  quotationRequestIdx: 0,
};

const slice = createSlice({
  name: 'adminReverseStore',
  initialState,
  reducers: {
    setDate(state, action) {
      state.quotationRequestIdx = action.payload;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const adminReverseAction = slice.actions;
export const adminReverseSlice = slice;
