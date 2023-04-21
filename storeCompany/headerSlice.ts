import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tab: -1,
  type: '',
  tabIdx: -1,
};

const slice = createSlice({
  name: 'headerTab',
  initialState,
  reducers: {
    setTab(state, action) {
      state.tab = action.payload;
    },
    setType(state, action) {
      state.type = action.payload;
    },
    setTabIdx(state, action) {
      state.tabIdx = action.payload;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const headerAction = slice.actions;
export const headerSlice = slice;
