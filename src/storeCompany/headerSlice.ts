import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tab: -1, // 메인 메뉴 번호
  type: '', // 타입
  tabIdx: -1, // 서브 메뉴 번호
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
