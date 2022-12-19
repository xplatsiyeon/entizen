import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useRef } from 'react';
import colors from 'styles/colors';
import CheckIcon from 'public/images/check-small.png';
import CheckCircleOn from 'public/images/CheckCircle-on.png';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useDispatch } from 'react-redux';
import { quotationAction } from 'store/quotationSlice';
import { locationAction } from 'store/locationSlice';

interface Props {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

const CompleteModal = ({ setIsModal, isModal }: Props) => {
  const router = useRouter();
  const outside = useRef();

  const handleModalClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (outside.current === e.target) {
      setIsModal((prev) => !prev);
    }
  };

  return (
    <ModalWrapper ref={outside} onClick={(e) => handleModalClose(e)}>
      <ModalBox>
        <ImageBox>
          <div className="checkCicleOn-icon">
            <Image src={CheckCircleOn} alt="checkCicleOn-icon" />
          </div>
        </ImageBox>
        <ContentText>
          <h2 className="title">회원가입이 완료되었습니다!</h2>
          <div className="text-box">
            <p className="text">새로운 고객들을 만나보세요</p>
          </div>
        </ContentText>
        <BtnBox>
          <Btn onClick={() => router.push('/')}>
            <BtnText>확인</BtnText>
          </Btn>
        </BtnBox>
      </ModalBox>
    </ModalWrapper>
  );
};

export default CompleteModal;

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
  align-items: flex-end;
  z-index: 100;
`;
const ModalBox = styled(Box)`
  display: flex;
  flex-direction: column;
  position: fixed;
  justify-content: center;
  align-items: center;
  width: 251.25pt;
  border-radius: 20pt 20pt 0 0;
  padding-left: 15pt;
  padding-right: 15pt;
  background-color: ${colors.lightWhite};
  box-shadow: 3pt 0 7.5pt rgba(137, 163, 201, 0.2);
  @media (min-width: 900pt) {
    width: 560px;
    height: 282px;
    border-radius: 16px;
    top: 40%;
  }
`;
const ImageBox = styled.div`
  padding-top: 21.9975pt;
`;

const ContentText = styled.div`
  white-space: pre-wrap;
  font-size: 12pt;
  font-weight: 500;
  line-height: 18pt;
  letter-spacing: -2%;

  .title {
    font-weight: 700;
    font-size: 15pt;
    line-height: 21pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    padding-top: 12pt;
  }
  .text-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 6pt;
    padding-top: 6pt;
  }
  .text {
    font-weight: 400;
    font-size: 12pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
`;
const BtnBox = styled(Box)`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  gap: 9pt;
  padding: 33pt 15pt 30pt 15pt;
  box-sizing: border-box;
`;

const Btn = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.main};
  color: ${colors.lightWhite};
  border-radius: 6pt;
  cursor: pointer;
`;
const BtnText = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  padding: 15pt 0;
  font-size: 12pt;
  font-weight: 400;
  line-height: 12pt;
  letter-spacing: -2%;
  color: ${(props) => props.color};
`;
