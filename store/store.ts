import { combineReducers } from '@reduxjs/toolkit';

import { locationSlice } from './locationSlice';
import { lnglatSlice } from './lnglatSlice';
import { requestSlice } from './requestSlice';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  locationList: locationSlice.reducer,
  lnglatList: lnglatSlice.reducer,
  requestList: requestSlice.reducer,
});

export default rootReducer;
