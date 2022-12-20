import axios from 'axios';
import qs from 'qs';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { kakaoInit } from 'utils/kakao';

const Auth = () => {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  // 테스트 리다이렉트
  // const REDIRECT_URI = 'http://localhost:3000/kakaoAuth';
  const REDIRECT_URI = 'https://api.entizen.kr/auth/kakao';
  // 라이브 리다이렉트 주소
  // const REDIRECT_URI = 'https://api.entizen.kr/auth/kakao';

  const CLIENT_SECRET = 'asdasdakhj1243789123798';
  // calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get('code');
  const kakao = kakaoInit();
  const router = useRouter();

  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: 'authorization_code',
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      client_secret: CLIENT_SECRET,
    });
    try {
      // access token 가져오기
      const res = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        payload,
      );
      console.log(res);

      // Kakao Javascript SDK 초기화
      // kakao.init(REST_API_KEY);
      kakao.isInitialized(REST_API_KEY);
      // access token 설정
      kakao.Auth.setAccessToken(res.data.access_token);
      router.replace('/auth/kakaoRedirect');
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  return null;
};
export default Auth;
