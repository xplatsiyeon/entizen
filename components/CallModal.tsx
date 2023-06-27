import React, { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import CallPng from '../public/images/PhoneCall.png';

type Props = {
  callBtnModal: boolean;
  setCallBtnModal: Dispatch<SetStateAction<boolean>>;
};

const CallModal = ({ callBtnModal, setCallBtnModal }: Props) => {
  return (
    <Modal>
      <ButtonContainer>
        <ButtonBox
        // onClick={() => {
        //   alert('나중에 전화 연결 부탁드립니다.');
        // }}
        >
          <a href="tel:010-3392-0580"></a>
          <ImageIcon>
            <Image src={CallPng} alt="call" />
          </ImageIcon>
          {/* 통화 1544-6811 */}
          <a href="tel:010-4998-8965">통화 1544-6811</a>
        </ButtonBox>
        <ButtonCancel
          onClick={() => {
            setCallBtnModal(false);
          }}
        >
          취소
        </ButtonCancel>
      </ButtonContainer>
    </Modal>
  );
};

export default CallModal;

const Modal = styled.div`
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 0 10pt;
  transition: all 600ms cubic-bezier(0.86, 0, 0.07, 1);

  display: flex;
  justify-content: flex-end;
  align-items: end;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30pt;
  width: 100%;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 12pt 67pt 12.75pt 8.75pt;
  background-color: #ffffff;
  border-radius: 9pt;
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 400;
  font-size: 13.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #007afe;
  margin-bottom: 6.75pt;
  cursor: pointer;
`;

const ImageIcon = styled.div`
  width: 20pt;
  margin-right: 51pt;
  margin-left: 10pt;
`;

const ButtonCancel = styled.div`
  padding: 15pt 112.25pt;
  background-color: #ffffff;
  border-radius: 9pt;
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 400;
  font-size: 13.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #007afe;
  cursor: pointer;
`;
