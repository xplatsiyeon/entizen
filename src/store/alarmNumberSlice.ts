import { createSlice } from '@reduxjs/toolkit';

interface GraphBoolean {
  alarmNumberSlice: number;
}

const initialState: GraphBoolean = {
  alarmNumberSlice: 0,
};

const slice = createSlice({
  name: 'alarmNumberSliceState',
  initialState,
  reducers: {
    setalarmNumberSlice(state, action) {
      state.alarmNumberSlice = action.payload;
    },
  },
});

export const alarmNumberSliceAction = slice.actions;
export const alarmNumberSlice = slice;
