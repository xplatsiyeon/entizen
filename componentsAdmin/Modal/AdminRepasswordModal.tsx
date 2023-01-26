import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { AdminBtn } from 'componentsAdmin/Layout';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';

type Props = {
  setAlertModal: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  size?: 'sm' | 'md' | 'lg';
};

const AdminRepasswordModal = ({
  setAlertModal,
  message,

  size = 'md',
}: Props) => {
  const router = useRouter();

  return (
    <Modal
      onClick={() => {
        setAlertModal(false);
      }}
    >
      <ModalBox size={size}>
        <MessageText>{message}</MessageText>
        <AdminBtn
          onClick={() => {
            setAlertModal(false);
            if (
              message ===
              '비밀번호 변경이 완료됐습니다.\n확인 버튼을 누르면 로그인 페이지로 이동합니다.'
            ) {
              router.push('/admin/login');
              setAlertModal(false);
            } else {
              setAlertModal(false);
            }
          }}
        >
          확인
        </AdminBtn>
      </ModalBox>
    </Modal>
  );
};

export default AdminRepasswordModal;

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

const ModalBox = styled.div<{ size: 'sm' | 'md' | 'lg' }>`
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
  ${({ size }) =>
    size === 'lg' &&
    css`
      width: 400px;
      height: 155px;
      gap: 25px;
    `};
`;

const MessageText = styled.div`
  text-align: center;
  color: #222222;
  font-size: 16px;
  font-weight: normal;
  font-family: 'Spoqa Han Sans Neo';
  line-height: 150%;
  padding-bottom: 10px;
  white-space: pre-wrap;
`;
