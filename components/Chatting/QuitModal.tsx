import styled from '@emotion/styled';
import { isTokenDeleteApi } from 'api';
import { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';

type Props = {
  deleteId?: number | undefined;
  setModal: Dispatch<SetStateAction<boolean>>;
};
const QuitModal = ({ setModal, deleteId }: Props) => {
  const { mutate: deleteMutate, isLoading: deleteIsLoading } = useMutation(
    isTokenDeleteApi,
    {
      onSuccess: () => {
        setModal(false);
      },
      onError: (error) => {
        console.log('에러 발생');
        console.log(error);
      },
    },
  );

  // 채팅방 삭제
  const onClickDelete = () => {
    if (deleteId) {
      deleteMutate({
        url: `/chatting/${deleteId}`,
      });
    }
  };
  return (
    <Body>
      <Wrapper />
      <Modal>
        <P>{`채팅방에서 나가시겠습니까? \n 나가기를 하면 채팅 목록 및 대화 내용이 모두 삭제 됩니다.`}</P>
        <Box>
          <Btn onClick={() => setModal(false)}>
            <span>취소</span>
          </Btn>

          {/* onClick에 대화 나가기 api(del) 달기. */}
          <Btn className="quit" onClick={onClickDelete}>
            <span>나가기</span>
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
  z-index: 5;
`;
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #22222261;
`;
const Modal = styled.div`
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6pt;
  width: 80%;
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
`;

const Box = styled.div`
  display: flex;
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
  &.quit {
    color: #f75015;
    border-bottom-left-radius: 0pt;
    border-bottom-right-radius: 6pt;
  }
`;
