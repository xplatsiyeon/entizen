import styled from '@emotion/styled';
import { isTokenPatchApi } from 'api';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Phone from 'public/mypage/Phone.svg';
import { Dispatch, SetStateAction } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import colors from 'styles/colors';
import checkSmall from 'public/images/chat_check_small.svg';
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
        <div
          className={`list fisrt ${alarm ? 'check' : ''}`}
          onClick={() => onClickAlarm(routerId)}
        >
          {alarm ? (
            <div>
              <span className="img">
                <Image src={checkSmall} alt="checkSmall" />
              </span>
              알람끄기
            </div>
          ) : (
            <div>알람켜기</div>
          )}
        </div>
        <div
          className="list last"
          onClick={() => {
            setMoreModal(false);
            setQuitModal(true);
          }}
        >
          채팅방 나가기
        </div>
        {/* <div
          className="list"
          onClick={() => {
            setReportModal(true);
          }}
        >
          신고하기
        </div> */}
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
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  gap: 6.75pt;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;
const Box = styled.div`
  position: absolute;
  right: 20.25pt;
  top: 60pt;
  overflow: hidden;
  padding: 9pt;
  z-index: 5;
  /* ------------------------- */
  /* shadow */
  background: ${colors.lightWhite};
  box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 6pt;
  .list {
    padding-left: 12pt;
    padding-right: 12pt;
    width: 100%;
    background: ${colors.lightWhite};
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 9pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .fisrt {
    padding-bottom: 6pt;
    border-bottom: 1px solid #f3f4f7;
  }
  .last {
    padding-top: 6pt;
  }
  .check {
    padding-left: 0;
  }

  .img {
    margin-right: 3pt;
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
