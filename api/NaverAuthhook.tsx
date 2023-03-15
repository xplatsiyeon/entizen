import axios from "axios";
import { useRouter } from "next/router";
import { JwtTokenType } from "pages/signin";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { originUserAction } from "store/userInfoSlice";
import { userAction } from "store/userSlice";
import jwt_decode from 'jwt-decode';
import { useEffect } from "react";




export const NaverAuthHook =()=>{

  const dispatch = useDispatch();  
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.userList);

 //let naverLogin: any;


 const checkHash = (naverLogin:any) => {
  const hash = router.asPath.split('#')[1]; // 네이버 로그인을 통해 전달받은 hash 값
   console.log('⭐️hash -> ' + hash);

  if (hash) {
    const token = hash.split('=')[1].split('&')[0]; // token값 확인
    // console.log('⭐️ token : ', token);
    naverLogin.getLoginStatus((status: any) => {
      if (status) {
        // console.log('⭐️ status : ', status);
        NaverApi(naverLogin);
        // console.log('⭐️ naverLogin : ', naverLogin);
        dispatch(
          userAction.add({
            ...user,
            email: naverLogin.user.email,
            snsType: naverLogin.user.snsType,
          }),
        );
        // /naver 페이지로 token값과 함께 전달 (서비스할 땐 token 전달을 하지 않고 상태 관리를 사용하는 것이 바람직할 것으로 보임)
        router.push({
          pathname: '/signUp/Terms',
          query: {
            token: token,
          },
        });
      }
    });
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}

  const loginNaver = (
    naverLogin : any
  ) => {
    const naver = (window as any).naver;
    // if (naverLogin) {
    naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.NEXT_PUBLIC_NAVER_LOGIN_CLIENT_ID, // ClientID
      // 테스트 리다이렉트 주소
      callbackUrl: `https://api.entizen.kr/signin`,
      isPopup: false, // 팝업 형태로 인증 여부
      callbackHandle: true,
      loginButton: {
        color: 'green', // 색상
        type: 3, // 버튼 크기
        height: '60', // 버튼 높이
      }, // 로그인 버튼 설정
    });
  
    console.log('naverLogin',naverLogin);
    naverLogin.init();
    //checkHash(naverLogin);
    //callBack(naverLogin);
    // }
  };

  const NaverApi = async (data: any) => {
    const NAVER_POST = `${process.env.NEXT_PUBLIC_BASE_URL}/members/login/sns`;
    await axios({
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
      // console.log('[axios] 리스폰스 => ');
      // console.log(res);
      // console.log(res.data);
      // const match = res.config.data.match(/\((.*)\)/);
      let c = res.data;
      let d = JSON.parse(res.config.data);
      // console.log('signin.tsx 65번째줄 axios 부분입니다 ! ======');
      // console.log(c);
      dispatch(
        userAction.add({
          ...user,
          uuid: d.uuid,
          email: d.email,
          snsType: d.snsType,
          snsLoginIdx: c.snsLoginIdx,
          isMember: c.isMember,
        }),
      );
      if (c.isMember === true) {
        const token: JwtTokenType = jwt_decode(res.data.accessToken);
        localStorage.setItem('SNS_MEMBER', JSON.stringify(token.isSnsMember));
        localStorage.setItem('MEMBER_TYPE', JSON.stringify(token.memberType));
        localStorage.setItem('USER_ID', JSON.stringify(data.user.email));
        localStorage.setItem('ACCESS_TOKEN', JSON.stringify(c.accessToken));
        localStorage.setItem('REFRESH_TOKEN', JSON.stringify(c.refreshToken));
        dispatch(originUserAction.set(data.user.email));

        router.push('/');
      } else {
        router.push('/signUp/SnsTerms');
      }
    });
  };
  // 네이버 온클릭
//   const handleNaver = async () => {
//     console.log(naverRef.current.children[0]);
//     if (naverRef) {
//       naverRef.current.children[0].click();
//     }
//   };

   return {loginNaver}
}