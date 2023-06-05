import styled from '@emotion/styled';
import { isTokenDeleteApi } from 'api';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';

type Props = {
  deleteId: number;
  setModal: Dispatch<SetStateAction<boolean>>;
};
const QuitModal = ({ setModal, deleteId }: Props) => {
  const router = useRouter();
  const { mutate: deleteMutate, isLoading: deleteIsLoading } = useMutation(
    isTokenDeleteApi,
    {
      onSuccess: () => {
        setModal(false);
        router.back();
      },
      onError: (error) => {
        // console.log('에러 발생');
        // console.log(error);
      },
    },
  );

  // 채팅방 삭제
  const onClickDelete = () => {
    // console.log(deleteId);
    if (deleteId) {
      deleteMutate({
        url: `/chatting/${deleteId}`,
      });
    }
  };
  return (
    <Body>
      <Wrapper onClick={() => setModal(false)} />
      <Modal>
        <P>{`채팅방에서 나가시겠습니까? \n 나가기를 하면 채팅 목록 및 대화 내용이 모두 삭제 됩니다.`}</P>
        <Box>
          <Btn onClick={() => setModal(false)}>
            <span>취소</span>
          </Btn>
          {/* onClick에 대화 나가기 api(del) 달기. */}
          <Btn className="quit" onClick={onClickDelete}>
            <span>채팅방 나가기</span>
          </Btn>
        </Box>
      </Modal>
    </Body>
  );
};

export default QuitModal;

const Body = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background-color: #6b6b6b2e;
  @media (min-width: 900pt) {
    position: absolute;
    background-color: #6b6b6b2e;
  }
`;
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  background: #22222261;

  @media (min-width: 900pt) {
    background-color: transparent;
  }
`;
const Modal = styled.div`
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6pt;
  width: 80%;
  z-index: 10000001;
  @media (min-width: 900pt) {
    width: auto;
  }
`;
const P = styled.p`
  white-space: pre-wrap;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 12pt;
  line-height: 18pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: #222222;
  padding: 21pt 15pt;
  @media (min-width: 900pt) {
    width: 281.25pt;
    padding: 30pt 40pt 24pt;
    font-weight: 700;
    font-size: 20px;
    line-height: 30px;
    color: #222222;
  }
`;

const Box = styled.div`
  display: flex;

  @media (min-width: 900pt) {
    button {
      &:nth-of-type(1) {
        background: #e2e5ed;
      }
      &:nth-of-type(2) {
        background: #5221cb;
      }
    }
  }
`;
const Btn = styled.button`
  flex: 1;
  text-align: center;
  padding: 15pt 0;
  background: white;
  border-bottom-left-radius: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: #222222;
  border-top: 0.75pt solid #f3f4f7;
  &.quit {
    color: #f75015;
    border-bottom-left-radius: 0pt;
    border-bottom-right-radius: 6pt;
    border-left: 0.75pt solid #f3f4f7;
  }

  @media (min-width: 900pt) {
    margin: 0pt 30pt 30pt 0;
    border-radius: 6pt;
    font-weight: 700;
    border-top: none;
    &:nth-of-type(1) {
      margin: 0pt 12pt 30pt 30pt;
    }
    &.quit {
      border-radius: 6pt;
      color: white;
      border-left: none;
    }
  }
`;
