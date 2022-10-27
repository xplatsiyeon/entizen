import { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from 'next/head';
import { PersistGate } from 'redux-persist/integration/react';
import { persistedReducer, persistor, wrapper } from 'store';
import { Provider } from 'react-redux';
import rootReducer from 'store/store';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <PersistGate persistor={persistor} loading={<div>loading...</div>}>
        <Head>
          <meta charSet="utf-8" />
          <title>Next Naver maps</title>
        </Head>
        <Component {...pageProps} />
      </PersistGate>
      <ReactQueryDevtools initialIsOpen={true} position="top-right" />
    </QueryClientProvider>
  );
};

export default wrapper.withRedux(MyApp);
