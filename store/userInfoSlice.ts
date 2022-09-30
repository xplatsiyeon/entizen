import { createSlice } from '@reduxjs/toolkit';

interface OriginUserInfo {
  userId: undefined | string;
  accessToken: undefined | string;
  refreshToken: undefined | string;
}

const initialState: OriginUserInfo = {
  userId: undefined,
  accessToken: undefined,
  refreshToken: undefined,
};

const slice = createSlice({
  name: 'userInfoSlice',
  initialState,
  reducers: {
    set(state, action) {
      state = action.payload;
    },
    logout(state) {
      state = { userId: '', accessToken: '', refreshToken: '' };
    },
  },
});

export const originUserAction = slice.actions;
export const originUserInfoSlice = slice;
