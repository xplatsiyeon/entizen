import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoginType {
  url: string;
}

const initialState: LoginType = {
  url: '',
};

const slice = createSlice({
  name: 'selectedType',
  initialState,
  reducers: {
    addUrl(state, action: PayloadAction<string>) {
      state.url = action.payload;
    },
    reset(state, action) {
      Object.assign(state, initialState);
    },
  },
});

export const redirectAction = slice.actions;
export const redirectSlice = slice;
