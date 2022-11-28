import { isTokenPostApi } from 'api';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import jwt_decode from 'jwt-decode';
import { JwtTokenType } from 'pages/signin';
import { AxiosError } from 'axios';

const TAG = 'hooks/useCreateChatting.ts';

/**
 * 해당 함수는 유저,기업 채팅방을 생성하고 해당 채팅방으로 라우팅 해주는 함수이다.
 * @returns
 * createChatting: 채팅방 생성 함수 (인자 값으로 상대방(파트너 or 고객) ID값을 받아야 한다.
 * isLoading: API 호출동안 로딩 유무를 확인해준다.
 */
const useCreateChatting = () => {
  const router = useRouter();
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  const token: JwtTokenType = jwt_decode(accessToken);

  const { mutate, isLoading: createLoading } = useMutation(isTokenPostApi, {
    onSuccess: (data) => {
      console.log(data);
      const index = data?.data?.chattingRoom?.chattingRoomIdx;
      console.log(index);
      if (token && token.memberType === 'USER') {
        router.push(`/chatting/${index}`);
      } else {
        router.push(`/company/chatting/${index}`);
      }
    },
    onError: (error: AxiosError) => {
      console.log('🔥 채팅방 생성하기 오류 ~line 27 -> ' + TAG);
      console.log(error.response?.data);
    },
  });

  const createChatting = (opponentId: number | string) => {
    if (token && token.memberType === 'USER') {
      mutate({
        url: '/chatting',
        data: {
          userMemberIdx: token.memberIdx,
          companyMemberIdx: opponentId,
        },
      });
    } else {
      mutate({
        url: '/chatting',
        data: {
          userMemberIdx: opponentId,
          companyMemberIdx: token.memberIdx,
        },
      });
    }
  };

  return {
    createChatting,
    createLoading,
  };
};

export default useCreateChatting;
