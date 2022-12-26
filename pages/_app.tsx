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
import { NextPageContext } from 'next';
import { AppProps } from 'next/app';
import { useDispatch } from 'react-redux';
import { userAgentAction, userAgentSlice } from 'store/userAgent';

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
      .filter((query) => query.state.status === 'error') // error를 캐싱한 것만 골라
      .map((el) => el.queryKey); // queryKey만 뽑아낸다

    return () => {
      queryClient.invalidateQueries(errorsKeys); // API Error 모달이 닫힐 때, 캐싱된 error response만을 삭제한다
    };
  }, [queryClient]);

  // ------------브릿지 -------------

  // 웹 -> 앱
  // useEffect(() => {
  //   console.log('🔥 ANGENT 값 확인하기 --->' + ANGENT);

  //   if ('Android_App' === ANGENT || 'iOS_App' === ANGENT) {
  //     sessionStorage.setItem('ANGENT', JSON.stringify(ANGENT));
  //   }
  //   if ((window as any).entizen!) {
  //     if (ANGENT === 'Android_App') {
  //       (window as any).entizen!.test('Hello Native Callback');
  //     } else if (ANGENT === 'iOS_App') {
  //       (window as any).webkit.messageHandlers.test.postMessage(
  //         'Hello Native Callback' + ANGENT,
  //       );
  //     }
  //   }
  // }, []);

  // // 앱 -> 웹으로 호출하는 함수
  // // const testFution = () => {
  // //   const iosTest: any = window.document.querySelectorAll('.iosTest');
  // //   if (iosTest[0]) {
  // //     iosTest[0].style.color = 'red';
  // //     // window.document.querySelectorAll('.iosTest')[0]?.style.color = 'red';
  // //   }
  // // };

  // // 앱 -> 웹
  // useEffect(() => {
  //   // 안드로이드 호출 테스트
  //   if (ANGENT === 'Android_App') {
  //     (window as any).test = () => {
  //       alert('안드로이드 테스트 중..');
  //     };
  //     // 아이폰 호출 테스트
  //   } else if (ANGENT === 'iOS_App') {
  //     window.testEntizen = {
  //       testtest: () => {
  //         alert('iOS 테스트 중..');
  //       },
  //     };
  //     // (window as any).test = () => {
  //     //   alert('iOS 테스트 중..');
  //     // };
  //   }
  // }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    const iOS = navigator.userAgent.match(/iOS_App/i);
    const Android = navigator.userAgent.match(/Android_App/i);
    if (iOS) dispatch(userAgentAction.set('iOS_App'));
    if (Android) dispatch(userAgentAction.set('Android_App'));
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
                <meta charSet="utf-8" />
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
