import * as React from 'react';
import { NextPage } from 'next';
import styled from '@emotion/styled';
import Router, { useRouter } from 'next/router';
import {
  GoogleOAuthProvider,
  googleLogout,
  GoogleLogin,
  CredentialResponse,
} from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { useMutation } from 'react-query';
import { isTokenPostApi } from 'api';
import { useDispatch } from 'react-redux';
import { userAction } from 'store/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { JwtTokenType } from 'pages/signin';
import jwt_decode from 'jwt-decode';
import { originUserAction } from 'store/userInfoSlice';

export interface GoogleSignUpData {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
}

const google: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.userList);
  const [errorModal, setErrorModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const { mutate: googleLoginMutate, isLoading } = useMutation(isTokenPostApi, {
    onSuccess: (res) => {
      let resData = res.data;
      let jsonData = JSON.parse(res.config.data);
      // console.log('onSuccess date check -->>>');
      // console.log(resData);

      dispatch(
        userAction.add({
          ...user,
          uuid: jsonData.uuid,
          email: jsonData.email,
          snsType: jsonData.snsType,
          snsLoginIdx: resData.snsLoginIdx,
          isMember: resData.isMember,
        }),
      );
      if (resData.isMember === true) {
        // 로그인
        // console.log('멤버 확인');
        // console.log(resData);
        const token: JwtTokenType = jwt_decode(resData.accessToken);
        sessionStorage.setItem('SNS_MEMBER', JSON.stringify(token.isSnsMember));
        sessionStorage.setItem('MEMBER_TYPE', JSON.stringify(token.memberType));
        sessionStorage.setItem('USER_ID', JSON.stringify(jsonData.email));
        sessionStorage.setItem(
          'ACCESS_TOKEN',
          JSON.stringify(resData.accessToken),
        );
        sessionStorage.setItem(
          'REFRESH_TOKEN',
          JSON.stringify(resData.refreshToken),
        );
        dispatch(originUserAction.set(jsonData.email));
        router.push('/');
      } else {
        // 회원가입
        router.push('/signUp/SnsTerms');
      }
    },
    onError: (error: any) => {
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

  // 구글 로그인 후 서버로 회원가입 처리
  const handleGoogleSignUp = async (data: GoogleSignUpData) => {
    googleLoginMutate({
      url: '/members/login/sns',
      data: {
        uuid: data.sub,
        snsType: 'GOOGLE',
        snsResponse: JSON.stringify(data),
        email: data.email,
      },
    });
  };
  // 구글 로그인 성공
  const GoogleLoginonSuccess = (res: CredentialResponse) => {
    const data: GoogleSignUpData = jwt_decode(res.credential!);
    handleGoogleSignUp(data);
  };
  // 구글 로그인 실패
  const GoogleLoginonFailed = () => {
    // console.log('Login Failed');
  };
  // 구글 로그아웃
  const handleGoogleLogout = () => {
    // console.log('🔥 google 로그아웃 되었습니다.');
    googleLogout();
  };
  return (
    <Wrapper>
      <GoogleOAuthProvider
        // clientId={process.env.GOOGLE_CLIENT_ID}

        clientId={
          '648537683223-gn7j135rk9b1scqroj2botm8t746ci9i.apps.googleusercontent.com'
        }
      >
        <GoogleLogin
          onSuccess={GoogleLoginonSuccess}
          onError={GoogleLoginonFailed}
        />
      </GoogleOAuthProvider>

      <LogoutBtn onClick={handleGoogleLogout}>로그아웃</LogoutBtn>
    </Wrapper>
  );
};

export default google;

const Wrapper = styled.div``;

const LogoutBtn = styled.button`
  margin-top: 50px;
  height: 50px;
  width: 100%;
`;
