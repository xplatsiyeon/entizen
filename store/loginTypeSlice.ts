import { createSlice } from '@reduxjs/toolkit';

export interface LoginType {
  selectedType: 'USER' | 'COMPANY';
}

const initialState: LoginType = {
  selectedType: 'COMPANY',
};

const slice = createSlice({
  name: 'selectedType',
  initialState,
  reducers: {
    select(state, action) {
      state.selectedType = action.payload;
    },
  },
});

export const selectAction = slice.actions;
export const selectSlice = slice;
