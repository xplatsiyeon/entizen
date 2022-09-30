import { createSlice } from '@reduxjs/toolkit';

interface NaverLoginTypes {
  uuid: string;
  email: string;
  snsType: string;
  name: string;
  phone: string;
  term: boolean;
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
