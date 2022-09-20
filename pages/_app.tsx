import { AppProps } from 'next/app';
import '../styles/globals.css';
import { useState } from 'react';
import Script from 'next/script';
import Head from 'next/head';
import { createStore } from '@reduxjs/toolkit';
import { PersistGate } from 'redux-persist/integration/react';
import {
  persistedReducer,
  persistor,
  RootState,
  wrapper,
} from '../store/store';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const store = createStore(persistedReducer);
  return (
    <PersistGate persistor={persistor} loading={<div>loading...</div>}>
      <Head>
        <meta charSet="utf-8" />
        <title>Next Naver maps</title>
      </Head>
      <Component {...pageProps} />
    </PersistGate>
  );
};

export default MyApp;
