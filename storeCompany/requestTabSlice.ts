import { createSlice } from '@reduxjs/toolkit';

interface TabNumber {
  checkedFilterIndex: 0 | 1 | 2;
  tabnumIndex: number;
}

const initialState: TabNumber = {
  checkedFilterIndex: 0,
  tabnumIndex: 0,
};

const slice = createSlice({
  name: 'companyRequestFilterNumber',
  initialState,
  reducers: {
    setTabIndex(state, action) {
      state.tabnumIndex = action.payload;
    },
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
