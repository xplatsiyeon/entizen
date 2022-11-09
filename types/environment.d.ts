namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    // ...
    KAKAO_ID: string;
    KAKAO_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
  }
}
