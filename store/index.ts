import { applyMiddleware, createStore, Reducer } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import rootReducer from './store';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['lnglatList', 'locationList', 'requestList', 'quotationData'],
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

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
});
