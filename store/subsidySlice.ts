import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Region {
  m9: string;
  m10: string;
}
interface ChargerKo {
  idx: number;
  kind: string;
  standType: string;
  channel: string;
  count: string;
}
interface ChargerEn {
  kind: string;
  standType: string;
  channel: string;
  count: string;
}
interface FindUserInfo {
  chargePurpose: number;
  chargerKo: ChargerKo[];
  chargerEn: ChargerEn[];

  chargeRegion: Region;
}

const initialState: FindUserInfo = {
  chargePurpose: -1,
  chargerKo: [
    {
      idx: 0,
      kind: '',
      standType: '',
      channel: '',
      count: '',
    },
  ],
  chargerEn: [{ kind: '', standType: '', channel: '', count: '' }],

  chargeRegion: {
    m9: '',
    m10: '',
  },
};

const slice = createSlice({
  name: 'findUserInfo',
  initialState,
  reducers: {
    addSubsidy(state, action: PayloadAction<FindUserInfo>) {
      state.chargePurpose = action.payload.chargePurpose;
      state.chargerKo = action.payload.chargerKo;
      state.chargerEn = action.payload.chargerEn;
      state.chargeRegion = action.payload.chargeRegion;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const subsidyAction = slice.actions;
export const subsidySlice = slice;
