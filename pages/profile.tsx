import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from 'store/store';
import { originUserAction } from 'store/userInfoSlice';
import { userAction } from 'store/userSlice';
import { kakaoInit } from 'utils/kakao';
import jwt_decode from 'jwt-decode';
import Loader from 'components/Loader';
import styled from '@emotion/styled';

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.userList);

  interface JwtTokenType {
    exp: number;
    iat: number;
    isSnsMember: boolean;
    iss: string;
    memberIdx: number;
    memberType: string;
  }

  // 카카오 백엔드 API
  const KaKaApi = async (data: any) => {
    const KAKAO_POST = `https://test-api.entizen.kr/api/members/login/sns`;
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
        console.log(res.data);
        let resData = res.data;
        let jsonData = JSON.parse(res.config.data);
        console.log('카카오 로그인 axios 부분입니다 ! ======');
        console.log(jsonData);
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
          console.log('멤버 확인');
          console.log(resData);
          const token: JwtTokenType = jwt_decode(resData.accessToken);
          localStorage.setItem('SNS_MEMBER', JSON.stringify(token.isSnsMember));
          localStorage.setItem('USER_ID', resData.kakao_account.email);
          localStorage.setItem(
            'ACCESS_TOKEN',
            JSON.stringify(resData.accessToken),
          );
          localStorage.setItem(
            'REFRESH_TOKEN',
            JSON.stringify(resData.refreshToken),
          );
          dispatch(originUserAction.set(resData.kakao_account.email));
          router.push('/');
        } else {
          // 회원가입
          router.push('/signUp/SnsTerms');
        }
      });
    } catch (error: any) {
      console.log('post 요청 실패');
      console.log('카카오로그인 에러  =>   ' + error);
      console.log(error);
    }
  };
  // 토큰 보내기
  const getProfile = async () => {
    const kakao = kakaoInit();
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await kakao.API.request({
        url: '/v2/user/me',
      });
      console.log('프로필 데이터');
      console.log(data);
      KaKaApi(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <Wrapper>
      <Loader />
      <Text>카카오 로그인 중입니다...</Text>
    </Wrapper>
  );
};
export default Profile;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;
const Text = styled.div`
  margin-top: 10pt;
  font-size: 14pt;
  font-weight: 700;
`;
