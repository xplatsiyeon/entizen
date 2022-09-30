import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  user: {
    name: '',
    phone: '',
  },
};

const slice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    getname(state, action) {
      state.user.name = action.payload;
    },
    getphone(state, action) {
      state.user.phone = action.payload;
    },
  },
});

export const userAction = slice.actions;
export const userSlice = slice;
