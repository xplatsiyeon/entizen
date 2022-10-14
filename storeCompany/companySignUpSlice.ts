import { createSlice } from '@reduxjs/toolkit';

interface StateType {
  memberType: '';
  name: '';
  phone: '';
  id: '';
  password: '';
  optionalTermsConsentStatus: [
    {
      optionalTermsType: 'LOCATION';
      consentStatus: false;
    },
  ];
  companyName: '';
  companyAddress: '';
  companyDetailAddress: '';
  companyZipCode: '';
  managerEmail: '';
  // 사업자등록증 파일 목록
  businessRegistrationFiles: [
    {
      url: '';
      size: 0;
      originalName: '';
    },
  ];
}

const initialState: StateType = {
  memberType: '',
  name: '',
  phone: '',
  id: '',
  password: '',
  optionalTermsConsentStatus: [
    {
      optionalTermsType: 'LOCATION',
      consentStatus: false,
    },
  ],
  companyName: '',
  companyAddress: '',
  companyDetailAddress: '',
  companyZipCode: '',
  managerEmail: '',
  // 사업자등록증 파일 목록
  businessRegistrationFiles: [
    {
      url: '',
      size: 0,
      originalName: '',
    },
  ],
};

const slice = createSlice({
  name: 'findUserInfo',
  initialState,
  reducers: {
    addId(state, action) {
      state.id = action.payload;
    },
  },
});

export const companySignUpActions = slice.actions;
export const companySignUpSlice = slice;
