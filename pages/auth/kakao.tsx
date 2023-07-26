import axios from 'axios';
import qs from 'qs';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { kakaoInit } from 'utils/kakao';

export default function Auth() {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const REDIRECT_URI = 'https://entizen.kr/auth/kakao';
  const CLIENT_SECRET = 'asdasdakhj1243789123798';
  // calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get('code');
  const kakao = kakaoInit();
  const router = useRouter();

  // 카카오 토큰 받아오기
  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: 'authorization_code',
      client_id: REST_API_KEY, // 클라이언트 id
      redirect_uri: REDIRECT_URI, // 리다이렉트 url
      code: code, // 인가코드
      client_secret: CLIENT_SECRET, // 클라이언트 시크릿
    });
    try {
      // access token 가져오기
      const res = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        payload,
      );

      kakao.isInitialized(REST_API_KEY); // 카톡 초기화
      kakao.Auth.setAccessToken(res.data.access_token); // access token 설정
      router.replace('/auth/kakaoRedirect'); // 리다이렉트
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getToken();
  }, []);
}
