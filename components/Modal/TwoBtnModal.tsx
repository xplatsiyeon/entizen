import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import colors from 'styles/colors';

type Props = {
  text: string;
  leftBtnText: string;
  leftBtnColor: string;
  rightBtnText: string;
  rightBtnColor: string;
  setModalOpen?: Dispatch<SetStateAction<boolean>> | undefined;
  modalOpen?: boolean;
};

const TwoBtnModal = (props: Props) => {
  const {
    text,
    leftBtnText,
    rightBtnText,
    leftBtnColor,
    rightBtnColor,
    setModalOpen,
    modalOpen,
  } = props;
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
          <BtnLeft>
            <BtnText onClick={handleOnClick} color={leftBtnColor}>
              {leftBtnText}
            </BtnText>
          </BtnLeft>
          <BtnRight>
            <BtnText color={rightBtnColor}>{rightBtnText}</BtnText>
          </BtnRight>
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
  text-align: center;
  margin: 21pt 15pt 21pt 15pt;
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
  display: flex;
`;

const BtnLeft = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #f3f4f7;
`;
const BtnRight = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #f3f4f7;
  border-top: 1px solid #f3f4f7;
`;

const BtnText = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  padding: 15pt 39pt;
  font-size: 12pt;
  font-weight: 400;
  line-height: 12pt;
  letter-spacing: -2%;
  color: ${(props) => props.color};
`;

export default TwoBtnModal;
