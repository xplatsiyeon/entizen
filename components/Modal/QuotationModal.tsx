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

const QuotationModal = ({ setIsModal, isModal }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const outside = useRef();

  const handleModalClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (outside.current === e.target) {
      setIsModal((prev) => !prev);
    }
  };

  const HandleButton = () => {
    dispatch(quotationAction.init());
    dispatch(locationAction.reset());
    router.push('/quotation/request/complete');
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
          <h2 className="title">충전소 설치 주의사항</h2>
          <div className="text-box">
            <div className="check-icon">
              <Image src={CheckIcon} alt="check-icon" />
            </div>
            <p className="text">주차공간이 필요해요.</p>
          </div>
          <div className="text-box">
            <div className="check-icon">
              <Image src={CheckIcon} alt="check-icon" />
            </div>
            <p className="text">토지주의 동의가 필요해요.</p>
          </div>
        </ContentText>
        <BtnBox>
          <BtnLeft onClick={() => setIsModal(!isModal)}>
            <BtnText>취소</BtnText>
          </BtnLeft>
          <BtnRight onClick={HandleButton}>
            <BtnText>확인</BtnText>
          </BtnRight>
        </BtnBox>
      </ModalBox>
    </ModalWrapper>
  );
};

export default QuotationModal;

const ModalWrapper = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 100;
`;
const ModalBox = styled(Box)`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left:50%;
  transform: translate(-50%,-50%); 
  justify-content: center;
  align-items: center;
  border-radius: 20pt;
  padding-left: 15pt;
  padding-right: 15pt;
  background-color: ${colors.lightWhite};
  box-shadow: 3pt 0 7.5pt rgba(137, 163, 201, 0.2);
  @media (max-width: 899pt) {
    top: auto;
    left: auto;
    transform: none;
    border-radius: 20pt 20pt 0 0;
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
  padding-bottom: 18pt;
  .title {
    font-weight: 700;
    font-size: 15pt;
    line-height: 21pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    padding-top: 6pt;
    padding-bottom: 12pt;
  }
  .text-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 6pt;
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
  gap: 9pt;
  padding-bottom: 21pt;
  @media (max-width: 899pt) {
    padding-bottom: 30pt;
  }
`;
const BtnLeft = styled(Box)`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.darkGray};
  background: ${colors.gray};
  border-radius: 6pt;
`;
const BtnRight = styled(Box)`
  width: 223px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.main};
  color: ${colors.lightWhite};
  border-radius: 6pt;
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
