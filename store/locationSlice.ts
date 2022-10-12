import { createSlice } from '@reduxjs/toolkit';

export interface LocationType {
  jibunAddr: string;
  roadAddrPart: string;
  sggNm: string;
  siNm: string;
}
export interface LocationListTypes {
  locationList: LocationType;
}

const initialState: LocationListTypes = {
  locationList: {
    jibunAddr: '',
    roadAddrPart: '',
    sggNm: '',
    siNm: '',
  },
};

const slice = createSlice({
  name: 'locationList',
  initialState,
  reducers: {
    load(state, action) {
      state.locationList = action.payload;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const locationAction = slice.actions;
export const locationSlice = slice;
