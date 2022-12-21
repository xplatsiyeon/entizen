import { createSlice } from '@reduxjs/toolkit';

interface DatePicker {
  date: any;
}

const initialState: DatePicker = {
  date: 0,
};

const slice = createSlice({
  name: 'adminDateStore',
  initialState,
  reducers: {
    setDate(state, action) {
      state.date = action.payload;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const adminDateAction = slice.actions;
export const adminDateSlice = slice;
