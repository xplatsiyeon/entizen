import { isTokenPostApi } from 'api';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useMutation } from 'react-query';
import jwt_decode from 'jwt-decode';
import { JwtTokenType } from 'pages/signin';
import { useDispatch } from 'react-redux';
import { originUserAction } from 'store/userInfoSlice';
import { useRouter } from 'next/router';

interface Props {
  userId: string;
  memberType: string;
  password: string;
  setErrorModal: Dispatch<SetStateAction<boolean>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
}

function useLogin({
  userId,
  memberType,
  password,
  setErrorModal,
  setErrorMessage,
}: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    mutate: loginMutate,
    isLoading: loginLoading,
    isError: loginError,
  } = useMutation(isTokenPostApi, {
    onSuccess: async (res) => {
      const token: JwtTokenType = jwt_decode(res.data.accessToken);
      localStorage.setItem('SNS_MEMBER', JSON.stringify(token.isSnsMember));
      localStorage.setItem('MEMBER_TYPE', JSON.stringify(token.memberType));
      localStorage.setItem(
        'ACCESS_TOKEN',
        JSON.stringify(res.data.accessToken),
      );
      localStorage.setItem(
        'REFRESH_TOKEN',
        JSON.stringify(res.data.refreshToken),
      );
      localStorage.setItem('USER_ID', JSON.stringify(userId));
      dispatch(originUserAction.set(userId));
      await router.push('/');
    },
    onError: async (error: any) => {
      const { message } = error.response.data;
      if (message === '탈퇴된 회원입니다.') {
        setErrorModal(true);
        setErrorMessage(
          '탈퇴한 계정입니다.\n엔티즌 이용을 원하시면\n 다시 가입해주세요.',
        );
      } else {
        setErrorModal(true);
        setErrorMessage(message);
      }
    },
  });

  const signin = () => {
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
