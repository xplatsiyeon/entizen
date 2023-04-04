import '../styles/globals.css';
import Head from 'next/head';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, wrapper } from 'store';
import { Suspense, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Loader from 'components/Loader';
import 'rsuite/dist/rsuite.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProps } from 'next/app';
import { useDispatch } from 'react-redux';
import { userAgentAction } from 'store/userAgent';
import { useRouter } from 'next/router';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_BASE_URL}/graphql`,
    cache: new InMemoryCache(),
  });
  // 에러 캐싱 방지 (테스트 필요)
  useEffect(() => {
    const errorsKeys = queryClient
      .getQueryCache()
      .getAll() // react-query의 query cache에서
      .filter((query) => query.state.status === 'error') // error를 캐싱한 것만 골라
      .map((el) => el.queryKey); // queryKey만 뽑아낸다

    return () => {
      queryClient.invalidateQueries(errorsKeys); // API Error 모달이 닫힐 때, 캐싱된 error response만을 삭제한다
    };
  }, [queryClient]);

  const dispatch = useDispatch();

  useEffect(() => {
    const iOS = navigator.userAgent.match(/iOS_App/i);
    const Android = navigator.userAgent.match(/Android_App/i);
    if (iOS) {
      sessionStorage.setItem('userAgent', JSON.stringify('iOS_App'));
      dispatch(userAgentAction.set('iOS_App'));
    }
    if (Android) {
      sessionStorage.setItem('userAgent', JSON.stringify('Android_App'));
      dispatch(userAgentAction.set('Android_App'));
    }
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <PersistGate persistor={persistor} loading={<div>loading...</div>}>
            <GoogleOAuthProvider
              clientId={
                '648537683223-gn7j135rk9b1scqroj2botm8t746ci9i.apps.googleusercontent.com'
              }
            >
              {/* <CustomProvider locale={koKR}> */}
              <Head>
                {/* <meta charSet="utf-8" /> */}
                <meta
                  name="viewport"
                  content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
                />
                <title>Next Naver maps</title>
              </Head>
              {/* </CustomProvider> */}
              <Component {...pageProps} />
            </GoogleOAuthProvider>
          </PersistGate>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </ApolloProvider>
    </Suspense>
  );
};

export default wrapper.withRedux(MyApp);
