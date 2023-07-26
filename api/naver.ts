import { Route } from '@mui/icons-material';
import axios from 'axios';
import Router, { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import instance from './interceptor/service';

export const login = (
  naverLogin: any,
  callBack: (_naverLogin: any) => void,
) => {
  console.log('naverLogin', naverLogin);
  const naver = (window as any).naver;
  // if (naverLogin) {
  naverLogin = new naver.LoginWithNaverId({
    clientId: process.env.NEXT_PUBLIC_NAVER_LOGIN_CLIENT_ID, // ClientID
    // 테스트 리다이렉트 주소
    callbackUrl: `https://entizen.kr/signin`,
    isPopup: false, // 팝업 형태로 인증 여부
    callbackHandle: true,
    loginButton: {
      color: 'green', // 색상
      type: 3, // 버튼 크기
      height: '60', // 버튼 높이
    }, // 로그인 버튼 설정
  });

  // console.log('naverLogin');
  naverLogin?.init();

  callBack(naverLogin);
  // }
};

export const getToken = (naverLogin: any, callBack: (result: any) => void) => {
  const hash = Router.asPath.split('#')[1]; // 네이버 로그인을 통해 전달받은 hash 값
  if (hash) {
    const token = hash.split('=')[1].split('&')[0]; // token값 확인
    naverLogin.getLoginStatus((status: any) => {
      if (status) {
        // 로그인 상태 값이 있을 경우
        // console.log('[로그인상태값] 네이버 => ' + status);
        // console.log('[whj] 네이버 로그인 데이터 => ' + naverLogin);
        let email = naverLogin.user.getEmail();
        NaverApi(naverLogin, function (result) {
          callBack(result);
        });
        // /naver 페이지로 token값과 함께 전달 (서비스할 땐 token 전달을 하지 않고 상태 관리를 사용하는 것이 바람직할 것으로 보임)
        Router.push({
          pathname: '/signin',
          query: {
            token: token,
          },
        });
      } else {
        Router.push('/signin');
      }
    });
  } else {
    Router.push('/signin');
  }
};
const NaverApi = async (data: any, callBack: (result: any) => void) => {
  const NAVER_POST = `/members/login/sns`;
  try {
    await instance({
      method: 'post',
      url: NAVER_POST,
      data: {
        uuid: '' + data.user.id,
        snsType: 'NAVER',
        snsResponse: JSON.stringify(data),
        email: data.user.email,
      },
      headers: {
        ContentType: 'application/json',
      },
      withCredentials: true,
    }).then((res) => {
      // console.log('[axios] 리스폰스 => ' + res);
      callBack(res);
    });
  } catch (error) {
    // console.log('post 요청 실패');
    // console.log(error);
  }
};
