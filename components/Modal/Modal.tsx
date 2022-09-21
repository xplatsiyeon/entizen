import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React from 'react';
import colors from 'styles/colors';

type Props = {
  text: string;
  click: () => void;
  color?: string;
};

const Modal = ({ text, click, color }: Props) => {
  return (
    <ModalWrapper>
      <ModalBox>
        <Content>
          <ContentText>{text}</ContentText>
        </Content>
        <BtnBox>
          <BtnText color={color} onClick={click}>
            확인
          </BtnText>
        </BtnBox>
      </ModalBox>
    </ModalWrapper>
  );
};

const ModalWrapper = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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

const Content = styled(Box)`
  width: 100%;
`;

const BtnBox = styled(Box)`
  width: 100%;
  position: relative;
`;

const BtnText = styled(Typography)<{ color?: string }>`
  position: relative;
  margin-right: 15pt;
  margin-bottom: 21pt;
  font-size: 12pt;
  font-weight: 400;
  line-height: 12pt;
  letter-spacing: -2%;
  text-align: right;
  color: ${({ color }) => (color ? color : colors.main)};
`;

export default Modal;
