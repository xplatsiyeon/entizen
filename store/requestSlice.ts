import { createSlice } from '@reduxjs/toolkit';

interface RequestSlice {
  selectedDate: string[];
  pickDate: string;
}

const initialState: RequestSlice = {
  selectedDate: [],
  pickDate: '',
};

const slice = createSlice({
  name: 'requestList',
  initialState,
  reducers: {
    addDate(state, action) {
      state.selectedDate = action.payload;
    },
    addPick(state, action) {
      state.pickDate = action.payload;
    },
  },
});

export const requestAction = slice.actions;
export const requestSlice = slice;
