import { isPostApi, isTokenPostApi } from 'api';
import { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import jwt_decode from 'jwt-decode';
import { JwtTokenType } from 'pages/signin';
import { useDispatch } from 'react-redux';
import { originUserAction } from 'store/userInfoSlice';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

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
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
  const { url } = useSelector((state: RootState) => state.redirectSlice);
  const {
    mutate: loginMutate,
    isLoading: loginLoading,
    isError: loginError,
  } = useMutation(isPostApi, {
    onSuccess: async (res) => {
      const token: JwtTokenType = jwt_decode(res.data.accessToken);
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

      // ================브릿지 연결=====================
      const userInfo = {
        SNS_MEMBER: token.isSnsMember,
        MEMBER_TYPE: token.memberType,
        ACCESS_TOKEN: res.data.accessToken,
        REFRESH_TOKEN: res.data.refreshToken,
        USER_ID: userId,
      };
      if (userAgent === 'Android_App') {
        window.entizen!.setUserInfo(JSON.stringify(userInfo));
      } else if (userAgent === 'iOS_App') {
        window.webkit.messageHandlers.setUserInfo.postMessage(
          JSON.stringify(userInfo),
        );
      }

      if (url.length > 0) {
        router.push(url);
      } else if (signUp && memberType === 'USER') {
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
      } else if (message === '"id" is not allowed to be empty') {
        setErrorModal(true);
        setErrorMessage('이메일를 입력해주세요.');
      } else if (message === '"password" is not allowed to be empty') {
        setErrorModal(true);
        setErrorMessage('비밀번호를 입력해주세요.');
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
