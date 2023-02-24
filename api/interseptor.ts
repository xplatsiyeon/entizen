import axios from 'axios';
import { appLogout } from 'bridge/appToWeb';
import { handleLogoutOnClickModalClick } from './logout';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const REFRESH_URL = `${BASE_URL}/auth/token`;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
  withCredentials: true,
});

// 요청 interceptor
instance.interceptors.request.use((config) => {
  if (!config.headers) return config;
  let token: string | null = null;
  // refresh token을 호출하는 경우는 refresh 토큰을 찾아서 token 값에 넣어준다.
  if (config.url === REFRESH_URL) {
    token = JSON.parse(localStorage.getItem('REFRESH_TOKEN')!);
  } else {
    token = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  }
  // 토큰이 있으면 토큰을 header에 담아서 서버에 보낸다.
  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 interceptor
instance.interceptors.response.use(
  // ================== 응답 요청 성공했을 떄 ===================
  (response) => {
    // 아무런 오류 없이 정상적으로 데이터를 받아옴.
    console.log(`============ reponse success ==============`);
    console.log(response);
    return response;
  },
  // =================== 응답 요청 실패했을 떄 ====================
  async (err) => {
    // 요청 실패, 토큰이 만료 로직 처리.
    console.log('=============== response error ================= ');
    console.log(err);
    const {
      config,
      response: {
        status,
        data: { message, isSuccess, errorCode },
      },
    } = err;
    //  로컬 스토리지에 토큰 자체가 없는데 요청을 보낸 경우
    if (
      !isSuccess &&
      (message === 'jwt malformed' ||
        message === 'invalid token' ||
        message === 'USER - 회원이 아닙니다.' ||
        message === 'COMPANY - 회원이 아닙니다.' ||
        errorCode === 1003)
    ) {
      deleteData();
      return Promise.reject(err);
    }
    /** 2 */
    // 에세스 토큰이 만료되면 리프레쉬 토큰을 헤더에 담아서 다시 서버로 받아와서 보낸다.
    if (!isSuccess && message === 'jwt expired') {
      console.log('=============== 리프레쉬 토큰 ===================');
      config.sent = true;
      const ACCESS_TOKEN = await getRfreshToken();
      console.log('ACCESS_TOKEN===>', ACCESS_TOKEN);
      // return;
      if (ACCESS_TOKEN) {
        config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
      }
    }
    return axios(config);
  },
);

const deleteData = () => {
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
  console.log('================ getRfreshToken catch ================');
  // 리프레쉬 토큰을 요청하였는데도 실패가 했다는 건, 리프레쉬 토큰도 만료가 되었다는 것이기에 로그아웃 처리를 진행한다.
  localStorage.removeItem('SNS_MEMBER');
  localStorage.removeItem('ACCESS_TOKEN');
  localStorage.removeItem('REFRESH_TOKEN');
  localStorage.removeItem('USER_ID');
  localStorage.removeItem('MEMBER_TYPE');
  window.location.href = '/';
  appLogout(userAgent as string);
};

// 응답이 왔는데, 토큰이 만료되어 다시 리프레쉬 토큰으로 토큰 값 호출
const getRfreshToken = async (): Promise<string | void> => {
  try {
    const ACCESS_TOKEN = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
    const REFRESH_TOKEN = JSON.parse(localStorage.getItem('REFRESH_TOKEN')!);
    // 리프레쉬 토큰을 얻기 위해 토큰들을 담아서 다시 서버로 요청한다.
    // 유효한 에세스 토큰을 받았다면, 로컬 스토리지에 에세스 토큰을 교체해준다.
    await axios
      .post(REFRESH_URL, {
        accessToken: ACCESS_TOKEN,
        refreshToken: REFRESH_TOKEN,
      })
      .then((res) => {
        console.log('============ getRfreshToken then ===============');
        // 리프레쉬 토큰 요청 후 성공하면 로컬스토리지에 에세스 토큰과 리프레쉬 토큰을 저장한다.
        const ACCESS_TOKEN = res.data.accessToken;
        const REFRESH_TOKEN = res.data.refreshToken;
        localStorage.setItem('ACCESS_TOKEN', JSON.stringify(ACCESS_TOKEN));
        localStorage.setItem('REFRESH_TOKEN', JSON.stringify(REFRESH_TOKEN));
        return ACCESS_TOKEN;
      });
  } catch (e) {
    deleteData();
  }
};

export default instance;
