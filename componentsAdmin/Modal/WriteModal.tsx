import React from 'react';
import styled from '@emotion/styled';
import { AdminBtn } from 'componentsAdmin/Layout';
import Image from 'next/image';
import Attention from 'public/adminImages/Attention.svg';
import { off } from 'process';
import { css } from '@emotion/react';

type Props = {
  message?: string;
  subMessage?: string;
  leftBtn?: string;
  rightBtn?: string;
  leftBtnHandle?: () => void;
  rightBtnHandle?: () => void;
  size: 'sm' | 'md' | 'lg';
};

const WriteModal = ({
  message,
  subMessage,
  leftBtn,
  rightBtn,
  leftBtnHandle,
  rightBtnHandle,
  size = 'md',
}: Props) => {
  return (
    <Modal>
      <ModalBox>
        <MainMessage>
          <Image src={Attention} alt="Attention" />
          <SubMessage>
            <MessageText>{message}</MessageText>
            <MessageSubText>{subMessage}</MessageSubText>
          </SubMessage>
        </MainMessage>
        <Line />
        <BtnBox size={size}>
          {leftBtn && (
            <AdminBtn
              onClick={() => {
                if (leftBtnHandle) {
                  leftBtnHandle();
                }
              }}
              style={{
                background: '#464646',
                color: '#ffffff',
                border: 'none',
              }}
            >
              {leftBtn}
            </AdminBtn>
          )}
          {rightBtn && (
            <AdminBtn
              onClick={() => {
                if (rightBtnHandle) {
                  rightBtnHandle();
                }
              }}
              style={{
                background: '#464646',
                color: '#ffffff',
                border: 'none',
                textAlign: 'center',
              }}
            >
              {rightBtn}
            </AdminBtn>
          )}
        </BtnBox>
      </ModalBox>
    </Modal>
  );
};

export default WriteModal;

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
  width: 400px;
  height: 160px;
  border-radius: 8px;
  padding: 10px;
`;

const MessageText = styled.div`
  text-align: center;
  color: #222222;
  font-size: 16px;
  font-weight: 500;
  font-family: 'Spoqa Han Sans Neo';
  line-height: 150%;
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: #e7e7e7;
  padding-left: 0;
  padding-right: 0;
  margin-top: 25px;
  margin-bottom: 10px;
`;

const MessageSubText = styled.div`
  text-align: center;
  color: #222222;
  font-size: 16px;
  font-weight: 400;
  font-family: 'Spoqa Han Sans Neo';
  line-height: 150%;
`;

const MainMessage = styled.div`
  display: flex;
  align-items: baseline;
`;

const SubMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 8px;
`;

const BtnBox = styled.div<{ size: 'sm' | 'md' | 'lg' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 240px;
  ${({ size }) =>
    size === 'lg' &&
    css`
      border: 1px solid red;
      width: 200px;
    `};
`;
