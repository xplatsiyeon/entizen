import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SelectedType = 'USER' | 'COMPANY';
export interface LoginType {
  selectedType: SelectedType;
  signUpLevel: number;
}

const initialState: LoginType = {
  selectedType: 'USER',
  signUpLevel: 0,
};

const slice = createSlice({
  name: 'LoginType',
  initialState,
  reducers: {
    select(state, action: PayloadAction<SelectedType>) {
      state.selectedType = action.payload;
    },
    setSignUpLevel(state, action: PayloadAction<number>) {
      state.signUpLevel = action.payload;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const selectAction = slice.actions;
export const selectSlice = slice;
