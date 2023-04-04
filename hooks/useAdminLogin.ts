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

function useAdminLogin(
  userId: string,
  setErrorModal: Dispatch<SetStateAction<boolean>>,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  signUp: boolean,
) {
  const router = useRouter();
  const { url } = useSelector((state: RootState) => state.redirectSlice);
  const {
    mutate: adminLoginMutate,
    isLoading: adminLoginLoading,
    isError: adminLoginError,
  } = useMutation(isPostApi, {
    onSuccess: async (res) => {
      const token: JwtTokenType = jwt_decode(res.data.accessToken);
      sessionStorage.setItem(
        'ADMIN_ACCESS_TOKEN',
        JSON.stringify(res.data.accessToken),
      );
      sessionStorage.setItem(
        'ADMIN_REFRESH_TOKEN',
        JSON.stringify(res.data.refreshToken),
      );
      sessionStorage.setItem('ADMIN_NAME', JSON.stringify(userId));
      //   dispatch(originUserAction.set(userId));

      if (url.length > 0) {
        router.push(url);
      } else if (res.data.isInitialLogin === false) {
        await router.push('/admin');
      } else if (res.data.isInitialLogin === undefined) {
        await router.push('/admin');
      } else if (res.data.isInitialLogin === true) {
        await router.push('/admin/login');
      } else {
        await router.push('/admin');
      }
    },
    onError: async (error: any) => {
      const { message } = error.response.data;
      if (message === '탈퇴된 회원입니다.') {
        setErrorModal(true);
        setErrorMessage(
          '탈퇴한 계정입니다.\n엔티즌 이용을 원하시면\n 다시 가입해주세요.',
        );
        // console.log(
        //   '탈퇴한 계정입니다.\n엔티즌 이용을 원하시면\n 다시 가입해주세요.',
        // );
      } else if (message === '올바르지 않는 비밀번호입니다.') {
        setErrorModal(true);
        setErrorMessage('올바르지 않은 비밀번호 입니다.');
        // console.log('올바르지 않은 비밀번호 입니다.');
      } else {
        setErrorModal(true);
        setErrorMessage(message);
        // console.log('error: ' + JSON.stringify(sessionStorage));
      }
    },
  });

  const signinAdmin = (password: string) => {
    adminLoginMutate({
      url: '/admin/auth/login',
      data: {
        id: userId,
        password: password,
      },
    });
  };

  return {
    signinAdmin,
    adminLoginLoading,
    adminLoginError,
  };
}

export default useAdminLogin;
