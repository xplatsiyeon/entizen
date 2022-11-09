import * as React from 'react';
import { NextPage } from 'next';
import styled from '@emotion/styled';
import Router from 'next/router';
import {
  GoogleOAuthProvider,
  googleLogout,
  GoogleLogin,
  CredentialResponse,
} from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

const google: NextPage = () => {
  const GoogleLoginonSuccess = (res: CredentialResponse) => {
    console.log(res);
    const data = jwtDecode(res.credential!);
    console.log(data);
  };
  const GoogleLoginonFailed = () => {
    console.log('Login Failed');
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

      <LogoutBtn onClick={() => googleLogout()}>로그아웃</LogoutBtn>
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
