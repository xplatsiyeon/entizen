import styled from '@emotion/styled';
import { isTokenPatchApi } from 'api';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Phone from 'public/mypage/Phone.svg';
import { Dispatch, SetStateAction } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import colors from 'styles/colors';
import QuitModal from './QuitModal';

interface Props {
  setMoreModal: Dispatch<SetStateAction<boolean>>;
  setQuitModal: Dispatch<SetStateAction<boolean>>;
  setReportModal: Dispatch<SetStateAction<boolean>>;
  alarm?: boolean;
}

const WebMoreModal = ({
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
    <>
      <Box>
        <div className="list fisrt" onClick={() => onClickAlarm(routerId)}>
          {alarm ? '알람끄기' : '알람켜기'}
        </div>
        <div
          className="list fisrt"
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
            setReportModal(true);
          }}
        >
          신고하기
        </div>
      </Box>
      <Wrapper onClick={() => setMoreModal(false)} />
    </>
  );
};

export default WebMoreModal;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: none;
  display: flex;
  justify-content: end;
  align-items: center;
  flex-direction: column;
  gap: 6.75pt;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;
const Box = styled.div`
  position: absolute;
  right: 9pt;
  overflow: hidden;
  border-radius: 9pt;
  background: white;
  //border: 1px solid;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  padding: 9pt 21pt;
  z-index: 5;
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

  @media (max-width: 899.25pt) {
    display: none;
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
