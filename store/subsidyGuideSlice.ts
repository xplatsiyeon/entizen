import { createSlice } from '@reduxjs/toolkit';

export interface SubsidyGuideSlice {
  // 환경부 보조금
  ministryOfEnvironmentApplyPrice: number;
  // 한국에너지공단 보조금
  koreaEnergyAgencyApplyPrice: number;
  // 지자체 보조금
  localGovernmentApplyPrice: number;
  // 중복 보조금
  duplicateApplyPrice: number;
  // 최대 보조금
  maxApplyPrice: number;
  // 중복 지원 여부
  canDuplicateApply: boolean;
  // 지자체 이름
}

const initialState: SubsidyGuideSlice = {
  ministryOfEnvironmentApplyPrice: 0,
  koreaEnergyAgencyApplyPrice: 0,
  localGovernmentApplyPrice: 0,
  duplicateApplyPrice: 0,
  maxApplyPrice: 0,
  canDuplicateApply: false,
};

const slice = createSlice({
  name: 'subsidyGuideData',
  initialState,
  reducers: {
    addDate(state, action) {
      state.ministryOfEnvironmentApplyPrice =
        action.payload.ministryOfEnvironmentApplyPrice;
      state.koreaEnergyAgencyApplyPrice =
        action.payload.koreaEnergyAgencyApplyPrice;
      state.localGovernmentApplyPrice =
        action.payload.localGovernmentApplyPrice;
      state.duplicateApplyPrice = action.payload.duplicateApplyPrice;
      state.maxApplyPrice = action.payload.maxApplyPrice;
      state.canDuplicateApply = action.payload.canDuplicateApply;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const subsidyGuideAction = slice.actions;
export const subsidyGuideSlice = slice;
