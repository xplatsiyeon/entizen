import axios from 'axios';
import { appLogout } from 'bridge/appToWeb';

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
    token = JSON.parse(sessionStorage.getItem('REFRESH_TOKEN')!);
  } else {
    token = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
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
    return response;
  },
  // =================== 응답 요청 실패했을 떄 ====================
  async (err) => {
    const {
      config,
      response: {
        status,
        data: { message, isSuccess, errorCode },
      },
    } = err;
    //  로컬 스토리지에 토큰 자체가 없는데 요청을 보낸 경우
    // 로그인이 필요합니다
    if (
      !isSuccess &&
      (message === 'jwt malformed' ||
        message === 'invalid token' ||
        message === 'USER - 회원이 아닙니다.' || // 탈퇴한 회원
        message === 'COMPANY - 회원이 아닙니다.' || // 탈퇴한 회원
        errorCode === 1003)
    ) {
      console.log('================ 토큰 오류 발생 ================');
      // console.log('⭐️ message : ', message);
      // alert('푸쉬알림 테스트 중 : token error');
      // alert(message);
      deleteData();
    }
    /** 2 */
    // 에세스 토큰이 만료되면 리프레쉬 토큰을 헤더에 담아서 다시 서버로 받아와서 보낸다.
    if (!isSuccess && message === 'jwt expired') {
      console.log('리프레쉬 토큰 호출');
      console.log('=============== 리프레쉬 토큰 ===================');
      config.sent = true;
      await getRfreshToken();
      const ACCESS_TOKEN = await JSON.parse(
        sessionStorage.getItem('ACCESS_TOKEN')!,
      );
      console.log('🔥 ACCESS_TOKEN===>', ACCESS_TOKEN);
      if (ACCESS_TOKEN) {
        console.log('🔥 if문 진입');
        config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
        return await axios(config);
      }
    }

    return Promise.reject(err);
  },
);

const deleteData = () => {
  // alert('푸쉬알림 테스트 중 : intersepor deleteData');
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
  // console.log('================ getRfreshToken catch ================');
  // 리프레쉬 토큰을 요청하였는데도 실패가 했다는 건, 리프레쉬 토큰도 만료가 되었다는 것이기에 로그아웃 처리를 진행한다.
  sessionStorage.removeItem('SNS_MEMBER');
  sessionStorage.removeItem('ACCESS_TOKEN');
  sessionStorage.removeItem('REFRESH_TOKEN');
  sessionStorage.removeItem('USER_ID');
  sessionStorage.removeItem('MEMBER_TYPE');
  // window.location.href = '/';
  appLogout(userAgent as string);
};

// 응답이 왔는데, 토큰이 만료되어 다시 리프레쉬 토큰으로 토큰 값 호출
const getRfreshToken = async (): Promise<string | void> => {
  const ACCESS_TOKEN = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const REFRESH_TOKEN = JSON.parse(sessionStorage.getItem('REFRESH_TOKEN')!);
  // 리프레쉬 토큰을 얻기 위해 토큰들을 담아서 다시 서버로 요청한다.
  // 유효한 에세스 토큰을 받았다면, 로컬 스토리지에 에세스 토큰을 교체해준다.
  await axios
    .post(REFRESH_URL, {
      accessToken: ACCESS_TOKEN,
      refreshToken: REFRESH_TOKEN,
    })
    .then(async (res) => {
      console.log('============ getRfreshToken then ===============');
      console.log('res=>', res);
      // 리프레쉬 토큰 요청 후 성공하면 로컬스토리지에 에세스 토큰과 리프레쉬 토큰을 저장한다.
      const ACCESS_TOKEN = res.data.accessToken;
      const REFRESH_TOKEN = res.data.refreshToken;
      console.log('🔥 ACCESS_TOKEN : ', ACCESS_TOKEN);
      console.log('🔥 REFRESH_TOKEN : ', REFRESH_TOKEN);

      await sessionStorage.removeItem('ACCESS_TOKEN');
      await sessionStorage.removeItem('REFRESH_TOKEN');
      await sessionStorage.setItem(
        'ACCESS_TOKEN',
        JSON.stringify(ACCESS_TOKEN),
      );
      await sessionStorage.setItem(
        'REFRESH_TOKEN',
        JSON.stringify(REFRESH_TOKEN),
      );
      // window.location.href = '/';
      return;
    })
    .catch((err) => {
      // 리프레쉬 토큰으로 토큰을 추가로 요청 했지만, 리프레쉬도 만료되었다면 데이터 삭제.
      console.log('🔥 리프레쉬 토큰 만료로 리셋');
      console.log('🔥 err : ', err);
      // alert('리프레쉬 토큰 만료');
      // alert('푸쉬알림 테스트 중 : refresh token expired');
      deleteData();
    });
};

export default instance;
