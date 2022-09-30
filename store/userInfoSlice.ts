import { createSlice } from '@reduxjs/toolkit';

interface OriginUserInfo {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

const initialState: OriginUserInfo = {
  userId: '',
  accessToken: '',
  refreshToken: '',
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
