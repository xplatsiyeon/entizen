import { createSlice } from '@reduxjs/toolkit';

export interface CoordinateType {
  lng: number;
  lat: number;
}

interface LngLatListTypes {
  lnglatList: CoordinateType;
  isMark: boolean;
}

const initialState: LngLatListTypes = {
  lnglatList: {
    lng: 127.0110855,
    lat: 37.5807661,
  },
  isMark: false,
};

const slice = createSlice({
  name: 'lnglatList',
  initialState,
  reducers: {
    set(state, action) {
      state.lnglatList = action.payload;
    },
    setMark(state, action) {
      state.isMark = action.payload;
    },
    reset(state) {
      state.lnglatList = {
        lng: 127.0110855,
        lat: 37.5807661,
      };
      state.isMark = false;
    },
  },
});

export const coordinateAction = slice.actions;
export const lnglatSlice = slice;
