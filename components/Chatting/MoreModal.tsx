import styled from '@emotion/styled';
import { isTokenPatchApi } from 'api';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Phone from 'public/mypage/Phone.svg';
import { Dispatch, SetStateAction, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import colors from 'styles/colors';

interface Props {
  setMoreModal: Dispatch<SetStateAction<boolean>>;
  setQuitModal: Dispatch<SetStateAction<boolean>>;
  setReportModal: Dispatch<SetStateAction<boolean>>;
  alarm?: boolean;
}

const MoreModal = ({
  setMoreModal,
  setQuitModal,
  alarm,
  setReportModal,
}: Props) => {
  const router = useRouter();
  const routerId = router?.query?.chattingRoomIdx!;
  const queryClinet = useQueryClient();
  const {
    mutate: patchMutate,
    isLoading: patchIsLoading,
    isError: patchIsError,
  } = useMutation(isTokenPatchApi, {
    onSuccess: () => {
      queryClinet.invalidateQueries('chatting-data');
      setMoreModal(false);
    },
    onError: (error) => {
      // console.log('채팅 알림 기능 에러');
      // console.log(error);
      setMoreModal(false);
    },
  });
  const onClickAlarm = (chattingRoomIdx: string | string[]) => {
    patchMutate({
      url: `/chatting/${chattingRoomIdx}/notification`,
    });
  };
  return (
    <Body>
      <Wrapper onClick={() => setMoreModal(false)} />
      <Box>
        <div className="list fisrt" onClick={() => onClickAlarm(routerId)}>
          {alarm ? '알람끄기' : '알람켜기'}
        </div>
        <div
          className="list"
          onClick={() => {
            setMoreModal(false);
            setQuitModal(true);
          }}
        >
          채팅방 나가기
        </div>
        <div
          className="list"
          onClick={() => {
            setMoreModal(false);
            setReportModal(true);
          }}
        >
          신고하기
        </div>
        <BottomBtn onClick={() => setMoreModal(false)}>취소</BottomBtn>
      </Box>
    </Body>
  );
};

export default MoreModal;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 50;

  @media (min-width: 900pt) {
    display: none;
  }
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  @media (min-width: 900pt) {
    display: none;
  }
`;

const Box = styled.div`
  position: fixed;
  bottom: 0;
  overflow: hidden;
  width: 100%;
  border-radius: 9pt;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  gap: 6.75pt;
  z-index: 100;

  .list {
    width: 100%;
    background: ${colors.lightWhite};
    font-weight: 400;
    font-size: 12pt;
    line-height: 12pt;
    padding: 15pt 0;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.blue4};
    cursor: pointer;
  }
  .fisrt {
    border-bottom: 1px solid #f3f4f7;
  }
`;
const BottomBtn = styled.div`
  width: 100%;
  background: ${colors.lightWhite};
  font-weight: 400;
  font-size: 12pt;
  line-height: 12pt;
  padding: 15pt 0;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  border-radius: 9pt;
  cursor: pointer;
`;
