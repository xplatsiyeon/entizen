import { isPostApi, isTokenPostApi } from 'api';
import { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import jwt_decode from 'jwt-decode';
import { JwtTokenType } from 'pages/signin';
import { useDispatch } from 'react-redux';
import { originUserAction } from 'store/userInfoSlice';
import { useRouter } from 'next/router';

function useLogin(
  userId: string,
  setErrorModal: Dispatch<SetStateAction<boolean>>,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  setUserCompleteModal: Dispatch<SetStateAction<boolean>>,
  memberType: 'USER' | 'COMPANY',
  signUp: boolean,
) {
  const dispatch = useDispatch();
  const router = useRouter();

  const ANGENT = JSON.parse(sessionStorage.getItem('ANGENT')!);

  const {
    mutate: loginMutate,
    isLoading: loginLoading,
    isError: loginError,
  } = useMutation(isPostApi, {
    onSuccess: async (res) => {
      const token: JwtTokenType = jwt_decode(res.data.accessToken);
      console.log(
        'res.data.isInitialLogin 초기값 뭐나오나욤',
        res.data.isInitialLogin,
      );
      setUserCompleteModal(res.data.isInitialLogin);
      sessionStorage.setItem('SNS_MEMBER', JSON.stringify(token.isSnsMember));
      sessionStorage.setItem('MEMBER_TYPE', JSON.stringify(token.memberType));
      sessionStorage.setItem(
        'ACCESS_TOKEN',
        JSON.stringify(res.data.accessToken),
      );
      sessionStorage.setItem(
        'REFRESH_TOKEN',
        JSON.stringify(res.data.refreshToken),
      );
      sessionStorage.setItem('USER_ID', JSON.stringify(userId));
      dispatch(originUserAction.set(userId));

      // 브릿지 연결
      const userInfo = {
        SNS_MEMBER: token.isSnsMember,
        MEMBER_TYPE: token.memberType,
        ACCESS_TOKEN: res.data.accessToken,
        REFRESH_TOKEN: res.data.refreshToken,
        USER_ID: userId,
      };
      if (window.entizen!) {
        if (ANGENT === 'Android_App') {
          window.entizen!.setUserInfo(JSON.stringify(userInfo));
          window.entizen!.getUserInfo();
        } else if (ANGENT === 'iOS_App') {
          window.webkit.messageHandlers.setUserInfo.postMessage(
            JSON.stringify(userInfo),
          );
          window.webkit.messageHandlers.getUserInfo.postMessage();
        }
      }

      if (signUp && memberType === 'USER') {
        await router.push('/signUp/Complete');
      } else if (signUp && memberType === 'USER') {
        await router.push('/signUp/CompleteCompany');
      } else if (res.data.isInitialLogin === false) {
        await router.push('/');
      } else if (res.data.isInitialLogin === undefined) {
        await router.push('/');
      } else if (res.data.isInitialLogin === true) {
        await router.push('/signin');
      } else {
        await router.push('/');
      }
    },
    onError: async (error: any) => {
      const { message } = error.response.data;
      if (message === '탈퇴된 회원입니다.') {
        setErrorModal(true);
        setErrorMessage(
          '탈퇴한 계정입니다.\n엔티즌 이용을 원하시면\n 다시 가입해주세요.',
        );
      } else if (message === '올바르지 않는 비밀번호입니다.') {
        setErrorModal(true);
        setErrorMessage('올바르지 않은 비밀번호 입니다.');
      } else {
        setErrorModal(true);
        setErrorMessage(message);
      }
    },
  });

  const signin = (password: string) => {
    loginMutate({
      url: '/members/login',
      data: {
        memberType: memberType,
        id: userId,
        password: password,
      },
    });
  };

  return {
    signin,
    loginLoading,
    loginError,
  };
}

export default useLogin;
