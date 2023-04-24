import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  step: number;
};

const initialState: State = {
  step: 0,
};

const slice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    addStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const contractAction = slice.actions;
export const contractSlice = slice;
