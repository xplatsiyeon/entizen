import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SelectedType = '' | 'USER' | 'COMPANY';

interface Terms {
  fullTerms: boolean;
  requiredTerms: boolean;
  selectTerms: boolean[];
  requiredCheck: boolean[];
}
export interface LoginType extends Terms {
  selectedType: SelectedType;
  signUpLevel: number;
}

const initialState: LoginType = {
  selectedType: '',
  signUpLevel: 0,
  fullTerms: false,
  requiredTerms: false,
  selectTerms: [false],
  requiredCheck: [false, false, false],
};

const slice = createSlice({
  name: 'LoginType',
  initialState,
  reducers: {
    select(state, action: PayloadAction<SelectedType>) {
      state.selectedType = action.payload;
    },
    setSignUpLevel(state, action: PayloadAction<number>) {
      state.signUpLevel = action.payload;
    },
    setTerm(state, action: PayloadAction<Terms>) {
      const {
        payload: { requiredCheck, selectTerms },
      } = action;
      state.selectTerms = selectTerms;
      state.requiredCheck = requiredCheck;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const selectAction = slice.actions;
export const selectSlice = slice;
