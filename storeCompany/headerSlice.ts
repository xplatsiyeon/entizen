import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tab: 0,
  type: '',
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
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const headerAction = slice.actions;
export const headerSlice = slice;
