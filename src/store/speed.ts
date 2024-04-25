import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Speed {
  year: string;
  chargeQuantity: number;
  sales: number;
}
export interface State {
  slowCharger: Speed[] | undefined;
  fastCharger: Speed[] | undefined;
}

const initialState: State = {
  slowCharger: undefined,
  fastCharger: undefined,
};

const slice = createSlice({
  name: 'speed',
  initialState,
  reducers: {
    addSlowSpeed(state, action: PayloadAction<Speed[]>) {
      state.slowCharger = action.payload;
    },
    addFastSpeed(state, action: PayloadAction<Speed[]>) {
      state.fastCharger = action.payload;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const speedAction = slice.actions;
export const speedSlice = slice;
