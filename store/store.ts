import {
  applyMiddleware,
  combineReducers,
  createSlice,
  createStore,
  Reducer,
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';

export interface LocationType {
  jibunAddr: string;
  roadAddrPart: string;
}

interface LocationListTypes {
  locationList: LocationType;
}

const locationIntitalState: LocationListTypes = {
  locationList: {
    jibunAddr: '',
    roadAddrPart: '',
  },
};

const locationSlice = createSlice({
  name: 'locationList',
  initialState: locationIntitalState,
  reducers: {
    load(state, action) {
      state.locationList = action.payload;
    },
  },
});

export interface CoordinateType {
  lng: number;
  lat: number;
}

interface LngLatListTypes {
  lnglatList: CoordinateType;
}

const lnglatInitialState: LngLatListTypes = {
  lnglatList: {
    lng: 127.0110855,
    lat: 37.5807661,
  },
};

const lnglatSlice = createSlice({
  name: 'lnglatList',
  initialState: lnglatInitialState,
  reducers: {
    set(state, action) {
      state.lnglatList = action.payload;
    },
  },
});

const rootReducer = combineReducers({
  locationList: locationSlice.reducer,
  lnglatList: lnglatSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['lnglatList'],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeConfiguredStore = (reducer: Reducer) =>
  createStore(reducer, undefined, applyMiddleware(logger));
const makeStore = () => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return makeConfiguredStore(rootReducer);
  } else {
    const store = makeConfiguredStore(persistedReducer);
    let persistor = persistStore(store);
    return { persistor, ...store };
  }
};

export const persistor = persistStore(makeConfiguredStore(persistedReducer));

export const locationAction = locationSlice.actions;
export const coordinateAction = lnglatSlice.actions;

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
});
