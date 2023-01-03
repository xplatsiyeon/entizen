import React from 'react';
import styled from '@emotion/styled';
import { AdminBtn } from 'componentsAdmin/Layout';

type Props = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  setIsDetail?: React.Dispatch<React.SetStateAction<boolean>>;
};

const AlertModal = ({ setIsModal, message, setIsDetail }: Props) => {
  return (
    <Modal>
      <ModalBox>
        <MessageText>{message}</MessageText>
        <AdminBtn
          onClick={() => {
            setIsModal(false);
            if (message === '추가가 완료 됐습니다.' && setIsDetail) {
              setIsModal(false);
              setIsDetail(false);
            } else if (message === '수정이 완료됐습니다!' && setIsDetail) {
              setIsModal(false);
              setIsDetail(false);
            } else if (message === '삭제가 완료 됐습니다.' && setIsDetail) {
              setIsModal(false);
              setIsDetail(false);
            }
          }}
        >
          확인
        </AdminBtn>
      </ModalBox>
    </Modal>
  );
};

export default AlertModal;

const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 0 10pt;
  transition: all 600ms cubic-bezier(0.86, 0, 0.07, 1);
  z-index: 200;
`;

const ModalBox = styled.div`
  background-color: #ffffff;
  top: 30%;
  left: 27%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 210px;
  height: 138px;
  border-radius: 8px;
  padding: 10px;
`;

const MessageText = styled.div`
  text-align: center;
  color: #222222;
  font-size: 16px;
  font-weight: normal;
  font-family: 'Spoqa Han Sans Neo';
  line-height: 150%;
  padding-bottom: 10px;
`;
