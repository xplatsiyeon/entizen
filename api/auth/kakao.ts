import axios from 'axios';
import Router from 'next/router';
import { userAction } from 'store/userSlice';
import { kakaoInit } from 'utils/kakao';

const KAKAO_POST = `https://test-api.entizen.kr/api/members/login/sns`;

interface Data {
  accessToken: string;
  isMember: boolean;
  isSuccess: boolean;
  refreshToken: string;
  snsLoginIdx: number;
}
// 백엔드로 데이터 전송
export const KaKaApi = async (data: any) => {
  try {
    await axios({
      method: 'post',
      url: KAKAO_POST,
      data: {
        uuid: '' + data.id,
        snsType: 'KAKAO',
        snsResponse: JSON.stringify(data),
        email: data.kakao_account.email,
      },
      headers: {
        ContentType: 'application/json',
      },
      withCredentials: true,
    }).then((res) => {
      console.log('카카오로그인 KaKaAPI =>  ' + res);
      console.log(res);
      console.log(res.data);
      // const match = res.config.data.match(/\((.*)\)/);
      let c = res.data;
      let d = JSON.parse(res.config.data);
      console.log('카카오 로그인 axios 부분입니다 ! ======');
      console.log(c);
      // dispatch(
      //   userAction.add({
      //     ...userAction,
      //     uuid: d.uuid,
      //     email: d.email,
      //     snsType: d.snsType,
      //     snsLoginIdx: c.snsLoginIdx,
      //     isMember: c.isMember,
      //   }),
      // );
      // if ((c.isMemeber = true)) {
      //   localStorage.setItem('USER_ID', data.user.email);
      //   console.log(user.email);
      //   localStorage.setItem('ACCESS_TOKEN', JSON.stringify(c.accessToken));
      //   localStorage.setItem('REFRESH_TOKEN', JSON.stringify(c.refreshToken));
      //   dispatch(originUserAction.set(data.user.email));
      //   router.push('/');
      // }
    });
  } catch (error) {
    console.log('post 요청 실패');
    console.log('카카오로그인 에러  =>   ' + error);
    console.log(error);
  }
};

// 카카오 로그인 버튼
export const kakaoLogin = async () => {
  // 카카오 초기화
  const kakao = kakaoInit();
  // 카카오 로그인 구현
  kakao.Auth.login({
    success: () => {
      kakao.API.request({
        url: '/v2/user/me', // 사용자 정보 가져오기
        success: (res: any) => {
          // 로그인 성공할 경우 정보 확인 후 /kakao 페이지로 push
          KaKaApi(res);
        },
        fail: (error: any) => {
          console.log(error);
        },
      });
    },
    fail: (error: any) => {
      console.log(error);
    },
  });
};
// 카카오 로그아웃 버튼
const KakaoLogout = () => {
  const kakao = kakaoInit();
  console.log(kakao.Auth.getAccessToken()); // 카카오 접근 토큰 확인 (로그인 후 해당 토큰을 이용하여 추가 기능 수행 가능)
  // 카카오 로그인 링크 해제
  kakao.API.request({
    url: '/v1/user/unlink',
    success: (res: any) => {
      // 로그인 성공할 경우 정보 확인 후 / 페이지로 push
      console.log(res);
      Router.push('/');
    },
    fail: (error: any) => {
      console.log(error);
    },
  });
};
