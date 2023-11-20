import { createSlice } from '@reduxjs/toolkit';

interface OriginUserInfo {
  userId: undefined | string;
  accessToken: undefined | string;
  refreshToken: undefined | string;
}

// XXX: test
const initialState: OriginUserInfo = {
  userId: '123',
  accessToken: '123',
  refreshToken: '123',
};

const slice = createSlice({
  name: 'userInfoSlice',
  initialState,
  reducers: {
    set(state, action) {
      state.userId = action.payload;
    },
    logout(state) {
      state = { userId: '', accessToken: '', refreshToken: '' };
    },
  },
});

export const originUserAction = slice.actions;
export const originUserInfoSlice = slice;
