import { createSlice } from '@reduxjs/toolkit';

interface OriginUserInfo {
  userAgent: string;
}

const initialState: OriginUserInfo = {
  userAgent: '',
};

const slice = createSlice({
  name: 'userAgent',
  initialState,
  reducers: {
    set(state, action) {
      state.userAgent = action.payload;
    },
  },
});

export const userAgentAction = slice.actions;
export const userAgentSlice = slice;
