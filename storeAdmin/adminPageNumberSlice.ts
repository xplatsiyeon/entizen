import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

interface AdminNumber {
  isAdminPage: number;
}

const initialState: AdminNumber = {
  isAdminPage: 4,
};

const slice = createSlice({
  name: 'adminPageNumberStore',
  initialState,
  reducers: {
    setIsAdminPage(state, action: PayloadAction<number>) {
      // console.log(action.payload);
      state.isAdminPage = action.payload;
    },

    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const adminPageNumberAction = slice.actions;
export const adminPageNumberSlice = slice;
