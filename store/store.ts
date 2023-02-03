import { combineReducers } from '@reduxjs/toolkit';
import { locationSlice } from './locationSlice';
import { lnglatSlice } from './lnglatSlice';
import { requestSlice } from './requestSlice';
import { subsidyGuideSlice } from './subsidyGuideSlice';
import { reviewContents } from '../storeCompany/reviewSlice';
import { quotationSlice } from './quotationSlice';
import { naverSlice } from './naverSlice';
import { userSlice } from './userSlice';
import { originUserInfoSlice } from './userInfoSlice';
import { findUserInfoSlice } from './findSlice';
import { selectSlice } from './loginTypeSlice';
import { myEstimateSlice } from 'storeCompany/myQuotation';
import { companyRequestFilterNumberSlice } from 'storeCompany/requestTabSlice';
import { finalQuotationSlice } from 'storeCompany/finalQuotation';
import { adminReverseSlice } from 'storeAdmin/adminReverseSlice';
import { adminPageNumberSlice } from 'storeAdmin/adminPageNumberSlice';
import { userAgentSlice } from './userAgent';
import { redirectSlice } from './redirectUrlSlice';
import { unavailableGraphSlice } from './ unavailableGraph';

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
  companymyEstimateData: myEstimateSlice.reducer,
  companyRequestFilterNumberData: companyRequestFilterNumberSlice.reducer,
  companyFinalQuotationData: finalQuotationSlice.reducer,
  adminReverseData: adminReverseSlice.reducer,
  adminPageNumber: adminPageNumberSlice.reducer,
  userAgent: userAgentSlice.reducer,
  redirectSlice: redirectSlice.reducer,
  unavailableGraphBoolean: unavailableGraphSlice.reducer,
});

export default rootReducer;
