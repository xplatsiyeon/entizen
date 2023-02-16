import { googleLogout } from '@react-oauth/google';
import { BASE_URL } from 'api';
import axios from 'axios';
import { appLogout } from 'bridge/appToWeb';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { kakaoInit } from 'utils/kakao';

const LOG_OUT_API = `${BASE_URL}/members/logout`;
// 관리자 로그아웃 API
const ADMIN_LOG_OUT_API = `${BASE_URL}/admin/auth/logout`;

// 네이버 로그아웃
export const NaverLogout = async () => {
  // 실제 url은 https://nid.naver.com/oauth2.0/token이지만 proxy를 적용하기 위해 도메인은 제거
  const localToken = localStorage.getItem('com.naver.nid.access_token');
  const res = await axios.get('/oauth2.0/token', {
    params: {
      grant_type: 'delete',
      client_id: process.env.NEXT_PUBLIC_NAVER_LOGIN_CLIENT_ID, // Client ID
      client_secret: process.env.NEXT_PUBLIC_NAVER_LOGIN_CLIENT_SECRET, // Client Secret
      access_token: localToken, // 발급된 Token 정보
      service_provider: 'NAVER',
    },
  });
  console.log('네이버 로그아웃=>' + res);
  console.log(res);
};
// 카카오 로그아웃
export const KakaoLogout = () => {
  const kakao = kakaoInit();
  console.log(kakao.Auth.getAccessToken()); // 카카오 접근 토큰 확인 (로그인 후 해당 토큰을 이용하여 추가 기능 수행 가능)
  // 카카오 로그인 링크 해제
  kakao.API.request({
    url: '/v1/user/unlink',
    success: (res: any) => {
      // 로그인 성공할 경우 정보 확인 후 / 페이지로 push
      console.log('---------카카오로그아웃----------.');
      console.log(res);
    },
    fail: (error: any) => {
      console.log(error);
    },
  });
};
// 일반회원 로그아웃
export const handleLogoutOnClickModalClick = async (userAgent?: string) => {
  const isSns = JSON.parse(localStorage.getItem('SNS_MEMBER')!);
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);

  await axios({
    method: 'post',
    url: LOG_OUT_API,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  }).then((res) => {
    localStorage.removeItem('SNS_MEMBER');
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
    localStorage.removeItem('USER_ID');
    localStorage.removeItem('MEMBER_TYPE');
    // 로그아웃 브릿지 연결
    appLogout(userAgent as string);

    // if (isSns) {
    //   NaverLogout();
    //   KakaoLogout();
    //   googleLogout();
    // }
  });
};

// 관리자 로그아웃
export const handleLogoutOnClickAdmin = async () => {
  const accessToken = JSON.parse(localStorage.getItem('ADMIN_ACCESS_TOKEN')!);
  await axios({
    method: 'post',
    url: ADMIN_LOG_OUT_API,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ContentType: 'application/json',
    },
    withCredentials: true,
  }).then((res) => {
    localStorage.removeItem('ADMIN_ACCESS_TOKEN');
    localStorage.removeItem('ADMIN_REFRESH_TOKEN');
  });
};
