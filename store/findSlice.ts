import { createSlice } from '@reduxjs/toolkit';

interface FindUserInfo {
  id: string;
  snsType: string;
}

const initialState: FindUserInfo = {
  id: '',
  snsType: '',
};

const slice = createSlice({
  name: 'findUserInfo',
  initialState,
  reducers: {
    setId(state, action) {
      state.id = action.payload;
    },
    setSNS(state, action) {
      state.snsType = action.payload;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const findUserInfoAction = slice.actions;
export const findUserInfoSlice = slice;
