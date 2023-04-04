import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LocationType {
  jibunAddr: string;
  roadAddrPart: string;
  sggNm: string;
  siNm: string;
}
export interface LocationListTypes {
  locationList: LocationType;
  searchKeyword: string;
  isChargeInfoOpen: boolean;
  fakeWord: string;
}

const initialState: LocationListTypes = {
  locationList: {
    jibunAddr: '',
    roadAddrPart: '',
    sggNm: '',
    siNm: '',
  },
  searchKeyword: '',
  isChargeInfoOpen: false,
  fakeWord: '',
};

const slice = createSlice({
  name: 'locationList',
  initialState,
  reducers: {
    load(state, action) {
      state.locationList = action.payload;
      // state.filter((ele)=> ele.locationList === action.payload)
    },
    addKeyword(state, action: PayloadAction<string>) {
      state.searchKeyword = action.payload;
    },
    changeIsChargeInfoOpen(state, action: PayloadAction<boolean>) {
      state.isChargeInfoOpen = action.payload;
    },
    changeFakeWord(state, action: PayloadAction<string>) {
      state.fakeWord = action.payload;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const locationAction = slice.actions;
export const locationSlice = slice;
