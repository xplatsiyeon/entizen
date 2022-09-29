import { createSlice } from '@reduxjs/toolkit';

export interface NaverType {
  res: any;
}
interface NaverListTypes {
  navernaver: NaverType;
}

const initialState: NaverListTypes = {
  navernaver: {
    res: [],
  },
};

const slice = createSlice({
  name: 'navernaver',
  initialState,
  reducers: {
    load(state, action) {
      state.navernaver = action.payload;
    },
  },
});

export const naverAction = slice.actions;
export const naverSlice = slice;
