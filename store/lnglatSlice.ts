import { createSlice } from '@reduxjs/toolkit';

export interface CoordinateType {
  lng: number;
  lat: number;
}

interface LngLatListTypes {
  lnglatList: CoordinateType;
}

const initialState: LngLatListTypes = {
  lnglatList: {
    lng: 127.0110855,
    lat: 37.5807661,
  },
};

const slice = createSlice({
  name: 'lnglatList',
  initialState,
  reducers: {
    set(state, action) {
      state.lnglatList = action.payload;
    },
    reset(state) {
      state.lnglatList = {
        lng: 127.0110855,
        lat: 37.5807661,
      };
    },
  },
});

export const coordinateAction = slice.actions;
export const lnglatSlice = slice;
