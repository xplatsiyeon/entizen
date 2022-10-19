import { combineReducers } from '@reduxjs/toolkit';
import { locationSlice } from './locationSlice';
import { lnglatSlice } from './lnglatSlice';
import { requestSlice } from './requestSlice';
import { subsidyGuideSlice } from './subsidyGuideSlice';
import { reviewContents } from './reviewSlice';
import { quotationSlice } from './quotationSlice';
import { naverSlice } from './naverSlice';
import { userSlice } from './userSlice';
import { originUserInfoSlice } from './userInfoSlice';
import { findUserInfoSlice } from './findSlice';
import { selectSlice } from './loginTypeSlice';
import { companySignUpSlice } from 'storeCompany/companySignUpSlice';
import { myEstimateSlice } from 'storeCompany/myQuotation';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  locationList: locationSlice.reducer,
  lnglatList: lnglatSlice.reducer,
  requestList: requestSlice.reducer,
  subsidyGuideData: subsidyGuideSlice.reducer,
  reviewList: reviewContents.reducer,
  quotationData: quotationSlice.reducer,
  navernaver: naverSlice.reducer,
  userList: userSlice.reducer,
  originUserData: originUserInfoSlice.reducer,
  findUserInfo: findUserInfoSlice.reducer,
  selectType: selectSlice.reducer,
  companySignUpData: companySignUpSlice.reducer,
  companymyEstimateData: myEstimateSlice.reducer,
});

export default rootReducer;
