import { createSlice } from '@reduxjs/toolkit';

interface SubsidyGuideSlice {
  installationPurpose:
    | 'BUSINESS'
    | 'WELFARE'
    | 'MARKETING'
    | 'PERSONAL'
    | 'ETC';
  chargers: string[];
  region: string;
  region2: string;
}

const initialState: SubsidyGuideSlice = {
  installationPurpose: 'BUSINESS',
  chargers: [],
  region: '',
  region2: '',
};

const slice = createSlice({
  name: 'subsidyGuideData',
  initialState,
  reducers: {
    addDate(state, action) {
      state.chargers = action.payload;
    },
  },
});

export const subsidyGuideAction = slice.actions;
export const subsidyGuideSlice = slice;
