import { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from 'next/head';
import { PersistGate } from 'redux-persist/integration/react';
import { persistedReducer, persistor, wrapper } from 'store';
import { Provider } from 'react-redux';
import rootReducer from 'store/store';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());
  const client = new ApolloClient({
    uri: 'https://test-api.entizen.kr/api/graphql',
    cache: new InMemoryCache(),
  });

  // 에러 캐싱 방지 (테스트 필요)
  useEffect(() => {
    const errorsKeys = queryClient
      .getQueryCache()
      .getAll() // react-query의 query cache에서
      .filter((q) => q.state.status === 'error') // error를 캐싱한 것만 골라
      .map((e) => e.queryKey); // queryKey만 뽑아낸다

    return () => {
      queryClient.invalidateQueries(errorsKeys); // API Error 모달이 닫힐 때, 캐싱된 error response만을 삭제한다
    };
  }, [queryClient]);
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
};

export default wrapper.withRedux(MyApp);
