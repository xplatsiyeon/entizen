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
      state.selectedType = action.payload;
    },
    reset(state, action) {
      Object.assign(state, initialState);
    },
  },
});

export const selectAction = slice.actions;
export const selectSlice = slice;
