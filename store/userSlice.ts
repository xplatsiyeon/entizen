import { createSlice } from '@reduxjs/toolkit';

interface NaverLoginTypes {
  kind: number;
  speed: number;
  pro: number;
  satisfy: number;
  reviewText: string;
  uuid: string;
}

interface NaverLoginType {
  user: NaverLoginTypes[];
}

const initialState: NaverLoginType = {
  user: [],
};

const slice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    add(state, action) {
      state.user = action.payload;
    },
  },
});

export const userAction = slice.actions;
export const userSlice = slice;
