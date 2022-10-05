import { createSlice } from '@reduxjs/toolkit';

interface FindUserInfo {
  id: string;
  password: string;
}

const initialState: FindUserInfo = {
  id: '',
  password: '',
};

const slice = createSlice({
  name: 'findUserInfo',
  initialState,
  reducers: {
    addId(state, action) {
      state.id = action.payload;
    },
  },
});

export const findUserInfoAction = slice.actions;
export const findUserInfoSlice = slice;
