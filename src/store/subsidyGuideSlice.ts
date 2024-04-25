import { createSlice } from '@reduxjs/toolkit';

export interface SubsidyGuideSlice {
  thisYearSubsidy: {
    ministryOfEnvironmentApplyPrice: number;
    koreaEnergyAgencyApplyPrice: number;
    localGovernmentApplyPrice: number;
    duplicateApplyPrice: number;
    maxApplyPrice: number;
    canDuplicateApply: boolean;
    date: string;
  };
  lastMaximumSubsidy: number;
  memberName: string;
  installationSiDo: string;
  installationSiGunGu: string;
}

const initialState: SubsidyGuideSlice = {
  thisYearSubsidy: {
    ministryOfEnvironmentApplyPrice: 0,
    koreaEnergyAgencyApplyPrice: 0,
    localGovernmentApplyPrice: 0,
    duplicateApplyPrice: 0,
    maxApplyPrice: 0,
    canDuplicateApply: false,
    date: '',
  },
  lastMaximumSubsidy: 0,
  memberName: '',
  installationSiDo: '',
  installationSiGunGu: '',
};

const slice = createSlice({
  name: 'subsidyGuideData',
  initialState,
  reducers: {
    addDate(state, action) {
      state.lastMaximumSubsidy = action.payload.lastMaximumSubsidy;
      state.thisYearSubsidy = { ...action.payload.thisYearSubsidy };
      state.memberName = action.payload.memberName;
    },
    addRegion(state, action) {
      state.installationSiDo = action.payload.installationSiDo;
      state.installationSiGunGu = action.payload.installationSiGunGu;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const subsidyGuideAction = slice.actions;
export const subsidyGuideSlice = slice;
