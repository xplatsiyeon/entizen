import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useRef } from 'react';
import colors from 'styles/colors';

type Props = {
  text: string;
  leftBtnText: string;
  leftBtnColor: string;
  rightBtnText: string;
  rightBtnColor: string;
  leftBtnControl?: () => void;
  rightBtnControl?: () => void;
  exit: () => void;
};

const ExitConfirmModal = ({
  text,
  leftBtnText,
  rightBtnText,
  leftBtnColor,
  rightBtnColor,
  leftBtnControl,
  rightBtnControl,

  exit,
}: Props) => {
  const outside = useRef(null);

  const handleModalClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (outside.current === e.target) {
      exit();
    }
  };

  return (
    <ModalWrapper ref={outside} onClick={(e) => handleModalClose(e)}>
      <ModalBox>
        <Content>
          <ContentText>{text}</ContentText>
        </Content>
        <BtnBox>
          <BtnLeft>
            <BtnText onClick={leftBtnControl} color={leftBtnColor}>
              {leftBtnText}
            </BtnText>
          </BtnLeft>
          <BtnLeftWeb>
            <BtnText onClick={leftBtnControl} color={'#595757'}>
              {leftBtnText}
            </BtnText>
          </BtnLeftWeb>
          <BtnRight>
            <BtnText onClick={rightBtnControl} color={rightBtnColor}>
              {rightBtnText}
            </BtnText>
          </BtnRight>
          <BtnRightWeb>
            <BtnText onClick={rightBtnControl} color={'#ffff'}>
              {rightBtnText}
            </BtnText>
          </BtnRightWeb>
        </BtnBox>
      </ModalBox>
    </ModalWrapper>
  );
};

const ModalWrapper = styled(Box)`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 99999;
`;

const ModalBox = styled(Box)`
  width: auto;
  border-radius: 6pt;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-items: center;
  padding: 30pt 17.625pt;
  width: 281.25pt;
  height: 193.5pt;
  @media (max-width: 899.25pt) {
    width: 220.5pt;
    padding: 0;
  }
`;

const ContentText = styled(Typography)`
  white-space: pre-wrap;
  font-size: 15pt;
  font-weight: 700;
  line-height: 22.5pt;
  letter-spacing: -0.02em;
  text-align: center;
  text-align: center;
  font-style: normal;
  color: ${colors.main2};
  font-family: 'Spoqa Han Sans Neo';
  margin-bottom: 24pt;
  @media (max-width: 899.25pt) {
    font-size: 12pt;
    font-weight: 500;
    line-height: 18pt;
    margin: 21pt 27.75pt 21pt;
  }
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
  display: none;
  @media (max-width: 899.25pt) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #f3f4f7;
    cursor: pointer;
  }
`;

const BtnLeftWeb = styled.button`
  width: 100%;
  border-radius: 4.5pt;
  background-color: #e2e5ed;
  cursor: pointer;
  margin-right: 8pt;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const BtnRightWeb = styled.button`
  width: 100%;
  border-radius: 4.5pt;
  background-color: #5221cb;
  cursor: pointer;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const BtnRight = styled(Box)`
  display: none;
  @media (max-width: 899.25pt) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid #f3f4f7;
    border-top: 1px solid #f3f4f7;
    cursor: pointer;
  }
`;

const BtnText = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  padding: 15pt 0;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${(props) => props.color};

  @media (max-width: 899.25pt) {
    padding: 15pt 0;
    font-size: 12pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -2%;
    font-family: 'Spoqa Han Sans Neo';
  }
`;

export default ExitConfirmModal;
