/* eslint-disable @next/next/no-sync-scripts */
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import Script from 'next/script';

declare global {
  interface Window {
    entizen?: any;
    webkit?: any;
    returnUserInfo?: (userInfo: any) => void;
    onClickBackButton: () => void;
    openGallery?: () => void;
    openFileUpload?: () => void;
    responseGoogleLogin?: (
      isSuccess: String,
      id: String,
      email: String,
    ) => void;
  }
  interface Document {
    form_chk: HTMLFormElement;
  }
}

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
            rel="stylesheet"
            type="text/css"
          ></link>
          <Script
            strategy="beforeInteractive"
            src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_KEY}`}
          ></Script>
          <Script
            strategy="beforeInteractive"
            src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_KEY}&submodules=geocoder`}
          ></Script>
          <Script src="https://unpkg.com/axios/dist/axios.min.js"></Script>
          <Script type="text/javascript" src="public/testsss.js"></Script>
        </Head>

        <body>
          <Main />
          <script
            type="text/javascript"
            src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js"
            charSet="utf-8"
          ></script>
          <script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
          <script type="text/javascript" src="/testsss.js"></script>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
