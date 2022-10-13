import { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from 'next/head';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, wrapper } from 'store';

const MyApp = ({ Component, pageProps }: AppProps<{}>) => {
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

export default wrapper.withRedux(MyApp);
