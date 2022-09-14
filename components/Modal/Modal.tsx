import styled from '@emotion/styled';
import { Box, Container, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import colors from 'styles/colors';

type Props = {
  text: string;
  setModalOpen?: Dispatch<SetStateAction<boolean>> | undefined;
  modalOpen?: boolean;
};

const Modal = (props: Props) => {
  const { text, setModalOpen, modalOpen } = props;
  const handleOnClick = () => {
    if (setModalOpen) {
      setModalOpen(!modalOpen);
    }
  };
  return (
    <ModalWrapper>
      <ModalBox>
        <Content>
          <ContentText>{text}</ContentText>
        </Content>
        <BtnBox>
          <BtnText onClick={handleOnClick}>확인</BtnText>
        </BtnBox>
      </ModalBox>
    </ModalWrapper>
  );
};
const ContentText = styled(Typography)`
  white-space: pre-wrap;
  font-size: 12pt;
  font-weight: 500;
  line-height: 18pt;
  letter-spacing: -2%;
  padding-left: 15pt;
  padding-top: 21pt;
  padding-bottom: 21pt;
`;

const ModalWrapper = styled(Box)`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;
const ModalBox = styled(Box)`
  width: 220.5pt;
  border-radius: 6pt;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  position: fixed;
  justify-content: center;
  align-items: center;
`;

const Content = styled(Box)`
  width: 100%;
`;

const BtnBox = styled(Box)`
  width: 100%;
  position: relative;
`;

const BtnText = styled(Typography)`
  position: relative;
  margin-right: 15pt;
  margin-bottom: 21pt;
  font-size: 12pt;
  font-weight: 400;
  line-height: 12pt;
  letter-spacing: -2%;
  text-align: right;
  color: ${colors.main};
`;

export default Modal;
