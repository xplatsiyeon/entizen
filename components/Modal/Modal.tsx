import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import colors from 'styles/colors';

type Props = {
  size?: string;
  text: string;
  click: () => void;
  color?: string;
  setIsModal?: React.Dispatch<React.SetStateAction<boolean>>;
  textAlignLeft?: boolean;
};

const Modal = ({
  text,
  click,
  color,
  setIsModal,
  size,
  textAlignLeft,
}: Props) => {
  const outside = useRef();

  const handleModalClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (outside) {
      if (outside.current === e.target) {
        click();
      }
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      click();
      // setIsModal!(false);
    }
  };

  return (
    <ModalWrapper ref={outside} onClick={(e) => handleModalClose(e)}>
      <ModalBox size={size!}>
        <Content>
          <ContentText textAlignLeft={textAlignLeft}>{text}</ContentText>
        </Content>
        <BtnBox>
          <BtnText color={color} onClick={click}>
            확인
          </BtnText>
          <Hide type="text" autoFocus onKeyDown={onKeyPress} readOnly />
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
  z-index: 10000;
`;
const ModalBox = styled(Box)<{ size: string }>`
  width: ${({ size }) => (size ? `${size}pt` : '205.5pt')};
  border-radius: 6pt;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  position: fixed;
  justify-content: center;
  align-items: center;
  width: 220.5pt;
  padding: 21pt 18pt;
  @media (min-width: 900pt) {
    width: 280.5pt;
  }
`;
const ContentText = styled(Typography)<{ textAlignLeft?: boolean }>`
  color: #222222;
  font-family: 'Spoqa Han Sans Neo';
  white-space: pre-wrap;
  font-size: 12pt;
  font-weight: 500;
  line-height: 18pt;
  letter-spacing: -2%;
  /* padding-top: 21pt;
  padding-bottom: 21pt; */
  text-align: left;
  @media (min-width: 900pt) {
    font-size: 12pt;
    font-weight: 500;
    line-height: 18pt;
    letter-spacing: -0.02em;
  }
`;

const Content = styled(Box)`
  width: 100%;
`;

const BtnBox = styled(Box)`
  width: 100%;
  position: relative;
`;

const BtnText = styled(Typography)<{ color?: string }>`
  font-family: 'Spoqa Han Sans Neo';
  cursor: pointer;
  position: relative;
  /* margin-bottom: 21pt; */
  padding-top: 28px;
  font-size: 12pt;
  font-weight: 500;
  line-height: 12pt;
  letter-spacing: -2%;
  text-align: right;
  color: ${({ color }) => (color ? color : colors.main)};
  height: 30pt;
  background-color: #ffffff;
  z-index: 10;
`;

const Hide = styled.input`
  position: absolute;
  z-index: 1;
  top: 30%;
`;

export default Modal;
