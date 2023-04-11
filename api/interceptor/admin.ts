import axios from 'axios';
import { appLogout } from 'bridge/appToWeb';
import mem from 'mem';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const REFRESH_URL = `${BASE_URL}/auth/token`;

// 초기 interceptor 값
const adminInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
  withCredentials: true,
});

// ============================= request interceptor ===================================
adminInstance.interceptors.request.use((config) => {
  if (!config.headers) return config;
  let token: string | null = null;
  // refresh token을 호출하는 경우는 refresh 토큰을 찾아서 token 값에 넣어준다.
  if (config.url === REFRESH_URL) {
    token = JSON.parse(sessionStorage.getItem('ADMIN_REFRESH_TOKEN')!);
  } else {
    token = JSON.parse(sessionStorage.getItem('ADMIN_ACCESS_TOKEN')!);
  }
  // 토큰이 있으면 토큰을 header에 담아서 서버에 보낸다.
  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log('🔥 token : ', token);
  return config;
});

// 응답이 왔는데, 토큰이 만료되어 다시 리프레쉬 토큰으로 토큰 값 호출
const getRefreshToken = mem(
  async (): Promise<string | void> => {
    try {
      const ACCESS_TOKEN = JSON.parse(
        sessionStorage.getItem('ADMIN_ACCESS_TOKEN')!,
      );
      const REFRESH_TOKEN = JSON.parse(
        sessionStorage.getItem('ADMIN_REFRESH_TOKEN')!,
      );
      const {
        data: { accessToken },
      } = await axios.post<{
        accessToken: string;
        refreshToken: string | null;
      }>(REFRESH_URL, {
        accessToken: ACCESS_TOKEN,
        refreshToken: REFRESH_TOKEN,
      });

      await sessionStorage.setItem(
        'ADMIN_ACCESS_TOKEN',
        JSON.stringify(accessToken),
      );

      // refreshToken은 따로 갱신하지 않아서 주석처리
      // if (refreshToken !== null) {
      //   sessionStorage.setItem('REFRESH_TOKEN', JSON.stringify(refreshToken));
      // }

      return accessToken;
    } catch (error) {
      // alert('로그인 테스트 진행 중 입니다.');
      // alert(error);
      deleteData();
    }
  },
  { maxAge: 1000 },
);
// ============================= response interceptor ===================================
adminInstance.interceptors.response.use(
  // 응답 요청 성공했을 떄
  (response) => response,
  // 응답 요청 실패했을 떄
  async (err) => {
    const {
      config,
      response: {
        status,
        data: { message, isSuccess, errorCode },
      },
    } = err;
    const originalRequest = config;
    /** 1 */
    //  로컬 스토리지에 토큰 자체가 없는데 요청을 보낸 경우 데이터 전체 삭제하고 메인페이지로 이동
    if (
      !isSuccess &&
      (message === 'jwt malformed' ||
        message === 'invalid token' ||
        message === 'USER - 회원이 아닙니다.' || // 탈퇴한 회원
        message === 'COMPANY - 회원이 아닙니다.' || // 탈퇴한 회원
        errorCode === 1003)
    ) {
      console.log('================ 토큰 오류 발생 ================');
      // alert('message 테스트 중 : ' + message);
      deleteData(); // 데이터 삭제
    }

    /** 2 */
    // 에세스 토큰이 만료되면 리프레쉬 토큰을 헤더에 담아서 다시 서버로 받아와서 보낸다.
    if (!isSuccess && message === 'jwt expired') {
      console.log('=============== 리프레쉬 토큰 ===================');
      originalRequest.sent = true;
      const accessToken = await getRefreshToken(); // 갱선한 토큰

      if (accessToken) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return await axios(originalRequest);
      }
    }

    return Promise.reject(err);
  },
);

// 리프레쉬 토큰을 요청하였는데도 실패가 했다는 건, 리프레쉬 토큰도 만료가 되었다는 것이기에 로그아웃 처리를 진행한다.
const deleteData = () => {
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
  sessionStorage.removeItem('ADMIN_ACCESS_TOKEN');
  sessionStorage.removeItem('ADMIN_REFRESH_TOKEN');
  window.location.href = '/admin/login';

  appLogout(userAgent as string);
};

export default adminInstance;
