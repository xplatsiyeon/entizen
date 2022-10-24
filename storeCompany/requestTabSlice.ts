import { createSlice } from '@reduxjs/toolkit';

interface TabNumber {
  tabNumber: number;
}

const initialState: TabNumber = {
  tabNumber: 0,
};

const slice = createSlice({
  name: 'companyRequestTabNumber',
  initialState,
  reducers: {
    setNumber(state, action) {
      state.tabNumber = action.payload;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const companyRequestTabNumberAction = slice.actions;
export const companyRequestTabNumberSlice = slice;
