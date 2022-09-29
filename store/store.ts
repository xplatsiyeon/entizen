import { combineReducers } from '@reduxjs/toolkit';
import { locationSlice } from './locationSlice';
import { lnglatSlice } from './lnglatSlice';
import { requestSlice } from './requestSlice';
import { reviewContents } from './reviewSlice';
import { naverSlice } from './naverSlice';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  locationList: locationSlice.reducer,
  lnglatList: lnglatSlice.reducer,
  requestList: requestSlice.reducer,
  reviewList: reviewContents.reducer,
  navernaver: naverSlice.reducer,
});

export default rootReducer;
