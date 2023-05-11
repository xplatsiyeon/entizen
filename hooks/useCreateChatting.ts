import { isTokenPostApi } from 'api';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import jwt_decode from 'jwt-decode';
import { JwtTokenType } from 'pages/signin';

const TAG = 'hooks/useCreateChatting.ts';

/**
 * 해당 함수는 유저,기업 채팅방을 생성하고 해당 채팅방으로 라우팅 해주는 함수이다.
 * @returns
 * createChatting: 채팅방 생성 함수 (인자 값으로 상대방(파트너 or 고객) ID값을 받아야 한다.
 * isLoading: API 호출동안 로딩 유무를 확인해준다.
 */
const useCreateChatting = () => {
  const router = useRouter();
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const token: JwtTokenType = accessToken && jwt_decode(accessToken!);
  // ------------- 채팅방 생성하기 API ---------------
  const { mutate: createMutate, isLoading: createLoading } = useMutation(
    isTokenPostApi,
    {
      onSuccess: (res) => {
        // 채팅방 아이디 값 추출
        const index = res?.data?.data?.chattingRoom?.chattingRoomIdx;
        // 유저면 유저 채팅방, 기업이면 기업 채팅방으로 이동
        if (index && token && token?.memberType === 'USER') {
          // console.log('🔥 채팅방 생성 인덱스 확인!! ', index);
          router.push({
            pathname: '/chatting/chattingRoom',
            query: {
              chattingRoomIdx: index,
            },
          });
        } else if (index && token && token?.memberType === 'COMPANY') {
          router.push({
            pathname: '/company/chatting/chattingRoom',
            query: {
              chattingRoomIdx: index,
            },
          });
        }
      },
      onError: async (error: any) => {
        // 채팅방이 존재하면 생성없이 바로 채팅방으로 이동
        const message = await error.response?.data?.message;

        if (message && message.includes('이미 채팅방이 존재합니다.')) {
          // 채팅방 아이디 값 추출
          const regex = /[^0-9]/g;
          const index = await message.replace(regex, '');
          // 유저면 유저 채팅방, 기업이면 기업 채팅방으로 이동
          if (index && token && token.memberType === 'USER') {
            router.push({
              pathname: '/chatting/chattingRoom',
              query: {
                chattingRoomIdx: index,
              },
            });
          } else {
            router.push({
              pathname: '/company/chatting/chattingRoom',
              query: {
                chattingRoomIdx: index,
              },
            });
          }
        }
      },
    },
  );
  /**
   * 채팅방 생성해주는 함수.
   * @param opponentId 나와 대화할 상대방 ID값을 파라미터로 받는다. (유저라면 기업ID, 기업이라면 유저ID)
   */
  const createChatting = (opponentId: number | string) => {
    if (token && token.memberType === 'USER') {
      createMutate({
        url: '/chatting',
        data: {
          userMemberIdx: token.memberIdx,
          companyMemberIdx: opponentId,
        },
      });
    } else {
      createMutate({
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
