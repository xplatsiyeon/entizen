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
import { CookiesProvider } from 'react-cookie';
import TagManager from 'react-gtm-module';
import Footer from 'components/Main/Footer';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const dispatch = useDispatch();
  const [queryClient] = useState(() => new QueryClient());

  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_BASE_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  queryClient.defaultQueryOptions({
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    suspense: true,
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

  // 기기별 userAgent 확인.
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

  //  ------------------브릿지-------------------
  // 휴대폰에 데이터 저장되어 있으면, 웹 세션 스토리지에 저장
  useEffect(() => {
    const iOS = navigator.userAgent.match(/iOS_App/i);
    const Android = navigator.userAgent.match(/Android_App/i);
    if (Android) {
      window.entizen!.getUserInfo();
    } else if (iOS) {
      window.webkit.messageHandlers.getUserInfo.postMessage('');
    }
  }, []);

  // 앱 -> 웹
  useEffect(() => {
    const iOS = navigator.userAgent.match(/iOS_App/i);
    const Android = navigator.userAgent.match(/Android_App/i);
    if (Android) {
      window.returnUserInfo = (userInfo) => {
        if (userInfo.length > 1) {
          const jsonGetUserInfo = JSON.parse(userInfo);
          sessionStorage.setItem(
            'SNS_MEMBER',
            JSON.stringify(jsonGetUserInfo.SNS_MEMBER),
          );
          sessionStorage.setItem(
            'MEMBER_TYPE',
            JSON.stringify(jsonGetUserInfo.MEMBER_TYPE),
          );
          sessionStorage.setItem(
            'ACCESS_TOKEN',
            JSON.stringify(jsonGetUserInfo.ACCESS_TOKEN),
          );
          sessionStorage.setItem(
            'REFRESH_TOKEN',
            JSON.stringify(jsonGetUserInfo.REFRESH_TOKEN),
          );
          sessionStorage.setItem(
            'USER_ID',
            JSON.stringify(jsonGetUserInfo.USER_ID),
          );
        }
      };
      // 아이폰 호출
    } else if (iOS) {
      window.returnUserInfo = (userInfo) => {
        if (typeof userInfo === 'object') {
          sessionStorage.setItem(
            'SNS_MEMBER',
            JSON.stringify(userInfo.SNS_MEMBER),
          );
          sessionStorage.setItem(
            'MEMBER_TYPE',
            JSON.stringify(userInfo.MEMBER_TYPE),
          );
          sessionStorage.setItem(
            'ACCESS_TOKEN',
            JSON.stringify(userInfo.ACCESS_TOKEN),
          );
          sessionStorage.setItem(
            'REFRESH_TOKEN',
            JSON.stringify(userInfo.REFRESH_TOKEN),
          );
          sessionStorage.setItem('USER_ID', JSON.stringify(userInfo.USER_ID));
        }
      };
    }
  }, []);

  //GTM 설치
  useEffect(() => {
    //USER ID 사용하는 경우(회원 정보를 가져온 다음 동작하도록 처리)
    /*
    TagManager.dataLayer({
        dataLayer: {
        user_id: "value",
        user_grade: "value",
        lastLoggedIn: "value",
        },
    });
    */

    //GTM 스니펫 삽입
    TagManager.initialize({
      gtmId: `GTM-P4MDKX9W`,
    });
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <CookiesProvider>
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
                  <meta
                    name="viewport"
                    content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
                  />
                  <meta
                    name="description"
                    content="복잡하고 어려운 전기차 충전기 설치. 엔티즌에서 한눈에 쉽게 비교하고, 나에게 꼭 맞는 충전기를 만나보세요!"
                  />
                  <meta
                    name="keywords"
                    content="엔티즌, 전기차 충전기, 전기차 집밥, 전기차 충전기 설치 비용, 전기차 충전기 비교, 전기차 충전기 설치, 가정용 전기차 충전기"
                  />

                  {/* Open Graph 메타 태그 */}
                  <meta property="og:type" content="website" />
                  <meta
                    property="og:title"
                    content="엔티즌 - 전기차 충전기 설치. 한눈에 비교하고 선택하세요!"
                  />
                  <meta
                    property="og:description"
                    content="복잡하고 어려운 전기차 충전기 설치 및 가정용 전기차 충전기 선택을 엔티즌에서 한눈에 쉽게 비교하고, 나에게 꼭 맞는 충전기를 만나보세요!"
                  />
                  {/* <meta property="og:image" content="http://경로/KakaoTalk_20231122_121211967_02.png"/> */}
                  <meta property="og:url" content="http://entizen.kr" />

                  {/* Twitter Card 메타 태그 */}
                  <meta name="twitter:card" content="summary_large_image" />
                  <meta
                    name="twitter:title"
                    content="엔티즌 - 전기차 충전기 설치. 한눈에 비교하고 선택하세요!"
                  />
                  <meta
                    name="twitter:description"
                    content="복잡하고 어려운 전기차 충전기 설치 및 가정용 전기차 충전기 선택을 엔티즌에서 한눈에 쉽게 비교하고, 나에게 꼭 맞는 충전기를 만나보세요!"
                  />
                  {/* <meta name="twitter:image" content="http://경로/KakaoTalk_20231122_121211967_02.png"/> */}

                  {/* Naver 메타 태그 */}
                  <meta
                    name="naver-site-verification"
                    content="74e7e0b0fd5d7d820bbc02c24129327741d1c8b9"
                  />

                  <title>
                    엔티즌 - 전기차 충전기 설치. 한눈에 비교하고 선택하세요!
                  </title>
                </Head>
                {/* </CustomProvider> */}
                <Component {...pageProps} />
                <Footer />
              </GoogleOAuthProvider>
            </PersistGate>
            <ReactQueryDevtools initialIsOpen={true} />
          </QueryClientProvider>
        </ApolloProvider>
      </CookiesProvider>
    </Suspense>
  );
};

export default wrapper.withRedux(MyApp);
