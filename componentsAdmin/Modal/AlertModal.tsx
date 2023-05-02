import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { AdminBtn } from 'componentsAdmin/Layout';
import { css } from '@emotion/react';

type Props = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  setIsDetail?: React.Dispatch<React.SetStateAction<boolean>>;
  setChangeNumber?: React.Dispatch<React.SetStateAction<boolean>>;
  size?: 'sm' | 'md' | 'lg';
  isModal?: boolean;
};

const AlertModal = ({
  setIsModal,
  message,
  setIsDetail,
  setChangeNumber,
  isModal,
  size = 'md',
}: Props) => {
  // 모달 확인 버튼 클릭
  const onClickButton = () => {
    console.log('모달 확인 버튼 클릭');
    if (setChangeNumber) {
      setChangeNumber(true);
    }
    if (message === '추가가 완료 됐습니다.' && setIsDetail) {
      setIsModal(false);
      setIsDetail(false);
    } else if (message === '수정이 완료됐습니다!' && setIsDetail) {
      setIsModal(false);
      setIsDetail(false);
    } else if (message === '삭제가 완료 됐습니다.' && setIsDetail) {
      setIsModal(false);
      setIsDetail(false);
    } else if (message === '승인이 변경 됐습니다.' && setIsDetail) {
      setIsModal(false);
      setIsDetail(false);
    } else if (
      message === '수정 요청을 실패했습니다.\n다시 시도해주세요.' &&
      setIsDetail
    ) {
      setIsModal(false);
    } else if (message === '프로젝트 삭제가 완료됐습니다.' && setIsDetail) {
      setIsModal(false);
      setIsDetail(false);
    } else if (message === '간편견적 삭제가 완료됐습니다.' && setIsDetail) {
      setIsModal(false);
      setIsDetail(false);
    } else if (
      message === '추가 요청을 실패했습니다.\n다시 시도해주세요.' &&
      setIsDetail
    ) {
      setIsModal(false);
      setIsDetail(false);
    } else if (
      message === '삭제 요청을 실패했습니다.\n다시 시도해주세요.' &&
      setIsDetail
    ) {
      setIsDetail(false);
      setIsModal(false);
    } else {
      console.log('else');
      setIsModal(false);
    }
  };

  return (
    <Modal
      onClick={() => {
        setIsModal(false);
      }}
    >
      <ModalBox size={size}>
        <MessageText>{message}</MessageText>
        <AdminBtn onClick={onClickButton}>확인</AdminBtn>
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
`;
