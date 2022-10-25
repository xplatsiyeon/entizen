import { createSlice } from '@reduxjs/toolkit';

interface TabNumber {
  checkedFilterIndex: number;
}

const initialState: TabNumber = {
  checkedFilterIndex: 0,
};

const slice = createSlice({
  name: 'companyRequestFilterNumber',
  initialState,
  reducers: {
    setNumber(state, action) {
      state.checkedFilterIndex = action.payload;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const companyRequestFilterNumberAction = slice.actions;
export const companyRequestFilterNumberSlice = slice;
