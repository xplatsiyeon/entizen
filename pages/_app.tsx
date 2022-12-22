import { AppProps } from 'next/app';
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
import { CustomProvider } from 'rsuite';
import koKR from 'rsuite/locales/ko_KR';
import { NextPageContext } from 'next';
import { Android } from '@mui/icons-material';

interface Props {
  userAgent?: string;
}
const MyApp = ({ Component, pageProps, userAgent, header }: any) => {
  const [queryClient] = useState(() => new QueryClient());

  // console.log('index page', userAgent);
  // const arrAgent = userAgent?.split(' ');
  // const ANGENT = arrAgent![arrAgent?.length - 1];
  // const [messageFromAndroid, setMessageFromAndroid] = useState(
  //   'Hello Vite + React!',
  // );

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

  // useEffect(() => {
  //   const eventFromAndroid = async (event: any) => {
  //     setMessageFromAndroid(event.detail.data);
  //   };
  //   window.addEventListener('javascriptFunction', eventFromAndroid);

  //   // const ANGENT = JSON.parse(sessionStorage.getItem('ANGENT')!);
  //   // if ('Android_App' === ANGENT || 'iOS_App' === ANGENT) {
  //   //   sessionStorage.setItem('ANGENT', JSON.stringify(ANGENT));
  //   // }

  //   console.log('ANGENT 값 확인 --->   ' + ANGENT);
  //   if ((window as any).entizen!) {
  //     if (ANGENT === 'Android_App') {
  //       (window as any).entizen!.test('Hello Native Callback');
  //     } else if (ANGENT === 'iOS_App') {
  //       (window as any).webkit.messageHanlders.test.postMessage(
  //         'Hello Native Callback',
  //       );
  //     }
  //     // (window as any).entizen!.callJavaScriptFunction();
  //   }

  //   // return () => {
  //   //   window.removeEventListener('javascriptFunction', eventFromAndroid);
  //   // };
  // }, []);

  return (
    <Suspense fallback={<Loader />}>
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <PersistGate persistor={persistor} loading={<div>loading...</div>}>
            {/* <CustomProvider locale={koKR}> */}
            <Head>
              <meta charSet="utf-8" />
              <title>Next Naver maps</title>
            </Head>
            {/* </CustomProvider> */}
            <Component {...pageProps} />
          </PersistGate>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </ApolloProvider>
    </Suspense>
  );
};

export default wrapper.withRedux(MyApp);

// export const getServerSideProps = ({ req }: any) => {
//   const userAgent = req.headers['user-agent'];
//   return { props: { userAgent, header: req.headers } };
// };
