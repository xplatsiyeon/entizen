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
import Loader from 'components/Loader';
import styled from '@emotion/styled';
import Modal from 'components/Modal/Modal';
import colors from 'styles/colors';
import instance from 'api/interceptor/service';

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const { userAgent } = useSelector((state: RootState) => state.userAgent);
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
  const { user } = useSelector((state: RootState) => state.userList);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    // const KAKAO_POST = `${process.env.NEXT_PUBLIC_BASE_URL}/members/login/sns`;
    // try {

    instance
      .post('/members/login/sns', {
        uuid: '' + data.id,
        snsType: 'KAKAO',
        snsResponse: JSON.stringify(data),
        email: data.kakao_account.email,
      })
      .then((res) => console.log('res : ', res))
      .catch((error) => console.log('error : ', error));
    return;
    await instance({
      method: 'post',
      url: '/members/login/sns',
      data: {
        uuid: '' + data.id,
        snsType: 'KAKAO',
        snsResponse: JSON.stringify(data),
        email: data.kakao_account.email,
      },
      // headers: {
      //   ContentType: 'application/json',
      // },
      // withCredentials: true,
    })
      .then((res) => {
        let resData = res.data;
        let jsonData = JSON.parse(res.config.data);
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
          sessionStorage.setItem(
            'SNS_MEMBER',
            JSON.stringify(token.isSnsMember),
          );
          sessionStorage.setItem(
            'MEMBER_TYPE',
            JSON.stringify(token.memberType),
          );
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

          // ================브릿지 연결=====================
          const userInfo = {
            SNS_MEMBER: token.isSnsMember,
            MEMBER_TYPE: token.memberType,
            ACCESS_TOKEN: resData.accessToken,
            REFRESH_TOKEN: resData.refreshToken,
            USER_ID: jsonData.email,
          };
          if (userAgent === 'Android_App') {
            window.entizen!.setUserInfo(JSON.stringify(userInfo));
          } else if (userAgent === 'iOS_App') {
            window.webkit.messageHandlers.setUserInfo.postMessage(
              JSON.stringify(userInfo),
            );
          }
          router.replace('/');
        } else {
          // 회원가입
          router.replace('/signUp/SnsTerms');
        }
      })
      .catch((error) => {
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
      });
    // } catch (error: any) {
    //   // console.log('post 요청 실패');
    //   // console.log('카카오로그인 에러  =>   ' + error);
    //   // console.log(error);
    //   setErrorMessage(error);
    //   setErrorModal(true);
    // }
  };
  // 토큰 보내기
  const getProfile = async () => {
    const kakao = kakaoInit();
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await kakao.API.request({
        url: '/v2/user/me',
      });
      // console.log('프로필 데이터');
      // console.log(data);
      KaKaApi(data);
    } catch (err) {
      // console.log(err);
    }
  };
  // 모달창 핸들러
  const onClickModal = () => {
    setErrorModal((prev) => !prev);
    router.push('/');
  };

  // 토큰 보내기 함수 실행
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <Wrapper>
      {errorModal && (
        <Modal text={errorMessage} color={colors.main} click={onClickModal} />
      )}
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
