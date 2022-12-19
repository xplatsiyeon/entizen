import { isTokenPostApi } from 'api';
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

  memberType: 'USER' | 'COMPANY',
  signUp: boolean,
) {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    mutate: loginMutate,
    isLoading: loginLoading,
    isError: loginError,
  } = useMutation(isTokenPostApi, {
    onSuccess: async (res) => {
      const token: JwtTokenType = jwt_decode(res.data.accessToken);
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

      if (signUp && memberType === 'USER') {
        await router.push('/signUp/Complete');
      } else if (signUp && memberType === 'USER') {
        await router.push('/signUp/CompleteCompany');
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
