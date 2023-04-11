import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GraphBoolean {
  keyword: string;
}

const initialState: GraphBoolean = {
  keyword: '',
};

const slice = createSlice({
  name: 'addressSlice',
  initialState,
  reducers: {
    setAddressSlice(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const addressSliceAction = slice.actions;
export const addressSlice = slice;
