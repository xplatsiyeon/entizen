import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React from 'react';
import colors from 'styles/colors';

type Props = {
  text: string;
};

const TwoBtnModal = (props: Props) => {
  const { text } = props;
  return (
    <ModalWrapper>
      <ModalBox>
        <Content>
          <ContentText>{text}</ContentText>
        </Content>
        <BtnBox>
          <BtnArea>
            <BtnText>확인</BtnText>
          </BtnArea>
          <BtnArea>
            <BtnText>확인</BtnText>
          </BtnArea>
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
  display: flex;
`;

const BtnArea = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnText = styled(Typography)`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  /* margin-right: 15pt;
  margin-bottom: 21pt; */
  font-size: 12pt;
  font-weight: 400;
  line-height: 12pt;
  letter-spacing: -2%;
  color: ${colors.main};
`;

export default TwoBtnModal;
