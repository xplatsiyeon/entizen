import axios from 'axios';
import { appLogout } from 'bridge/appToWeb';
import { kakaoInit } from 'utils/kakao';
import { getCookie } from './cookie';
import instance from './interceptor/service';

const LOG_OUT_API = `${process.env.NEXT_PUBLIC_BASE_URL}/members/logout`;
// 관리자 로그아웃 API
const ADMIN_LOG_OUT_API = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/auth/logout`;

// 네이버 로그아웃
export const NaverLogout = async () => {
  // 실제 url은 https://nid.naver.com/oauth2.0/token이지만 proxy를 적용하기 위해 도메인은 제거
  const localToken = sessionStorage.getItem('com.naver.nid.access_token');
  const res = await axios.get('/oauth2.0/token', {
    params: {
      grant_type: 'delete',
      client_id: process.env.NEXT_PUBLIC_NAVER_LOGIN_CLIENT_ID, // Client ID
      client_secret: process.env.NEXT_PUBLIC_NAVER_LOGIN_CLIENT_SECRET, // Client Secret
      access_token: localToken, // 발급된 Token 정보
      service_provider: 'NAVER',
    },
  });
  // console.log('네이버 로그아웃=>' + res);
  // console.log(res);
};
// 카카오 로그아웃
export const KakaoLogout = () => {
  const kakao = kakaoInit();
  kakao.API.request({
    url: '/v1/user/unlink',
    success: (res: any) => {
      // 로그인 성공할 경우 정보 확인 후 / 페이지로 push
      // console.log('---------카카오로그아웃----------.');
      // console.log(res);
    },
    fail: (error: any) => {
      // console.log(error);
    },
  });
};
// 일반회원 로그아웃
export const handleLogoutOnClickModalClick = async (userAgent?: string) => {
  // console.log('=============== 로그아웃 =================');
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const csrfToken = getCookie('CSRF-TOKEN');
  if (accessToken) {
    await instance({
      method: 'post',
      data: {
        'csrf-token': csrfToken,
      },
      url: LOG_OUT_API,
      // headers: {
      //   Authorization: `Bearer ${accessToken}`,
      //   ContentType: 'application/json',
      //   local: 'true',
      // },
      withCredentials: true,
    }).then((res) => {
      sessionStorage.removeItem('SNS_MEMBER');
      sessionStorage.removeItem('ACCESS_TOKEN');
      sessionStorage.removeItem('REFRESH_TOKEN');
      sessionStorage.removeItem('USER_ID');
      sessionStorage.removeItem('MEMBER_TYPE');
      // 로그아웃 브릿지 연결
      appLogout(userAgent as string);
    });
  }
};

// 관리자 로그아웃
export const handleLogoutOnClickAdmin = async () => {
  const accessToken = JSON.parse(sessionStorage.getItem('ADMIN_ACCESS_TOKEN')!);
  const csrfToken = getCookie('CSRF-TOKEN');
  await axios({
    method: 'post',
    data: {
      'csrf-token': csrfToken,
    },
    url: ADMIN_LOG_OUT_API,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ContentType: 'application/json',
      local: 'true',
    },
    withCredentials: true,
  }).then((res) => {
    sessionStorage.removeItem('ADMIN_ACCESS_TOKEN');
    sessionStorage.removeItem('ADMIN_REFRESH_TOKEN');
  });
};
