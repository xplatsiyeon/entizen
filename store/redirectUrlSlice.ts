import { createSlice } from '@reduxjs/toolkit';

export interface LoginType {
  selectedType: 'USER' | 'COMPANY';
}

const initialState: LoginType = {
  selectedType: 'USER',
};

const slice = createSlice({
  name: 'selectedType',
  initialState,
  reducers: {
    select(state, action) {
      console.log(state.selectedType);
    },
    reset(state, action) {
      Object.assign(state, initialState);
    },
  },
});

export const redirectSliceAction = slice.actions;
export const redirectSlice = slice;
