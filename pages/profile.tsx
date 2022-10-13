import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from 'store/store';
import { originUserAction } from 'store/userInfoSlice';
import { userAction } from 'store/userSlice';
import { kakaoInit } from 'utils/kakao';
import jwt_decode from 'jwt-decode';
const Profile = () => {
  const [user_id, setUserId] = useState();
  const [email, setEmail] = useState();
  const [profileImage, setProfileImage] = useState();
  const { user } = useSelector((state: RootState) => state.userList);
  const dispatch = useDispatch();
  const router = useRouter();

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
        console.log(res);
        console.log(res.data);
        // const match = res.config.data.match(/\((.*)\)/);
        let c = res.data;
        let d = JSON.parse(res.config.data);
        console.log('카카오 로그인 axios 부분입니다 ! ======');
        console.log(c);
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
        // console.log('c 확인');
        // console.log(c);
        console.log(c.isMember);
        if (c.isMember === true) {
          // 로그인
          console.log('멤버 확인');
          console.log(data);
          const token: JwtTokenType = jwt_decode(res.data.accessToken);
          localStorage.setItem('SNS_MEMBER', JSON.stringify(token.isSnsMember));
          localStorage.setItem('USER_ID', data.kakao_account.email);
          // console.log(user.email);
          localStorage.setItem('ACCESS_TOKEN', JSON.stringify(c.accessToken));
          localStorage.setItem('REFRESH_TOKEN', JSON.stringify(c.refreshToken));
          dispatch(originUserAction.set(data.kakao_account.email));
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
  const getProfile = async () => {
    const kakao = kakaoInit();

    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await kakao.API.request({
        url: '/v2/user/me',
      });
      console.log('프로필 데이터');
      console.log(data);
      // 사용자 정보 변수에 저장
      setUserId(data.id);
      setEmail(data.kakao_account.email);
      KaKaApi(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
      <h2>{user_id}</h2>
      <h2>{email}</h2>
    </div>
  );
};
export default Profile;
