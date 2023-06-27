import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Image from 'next/image';
import React, { useRef } from 'react';
import colors from 'styles/colors';
import CheckCircleOn from 'public/images/CheckCircle-on.png';
import { useDispatch } from 'react-redux';

interface Props {
  buttonText: string;
  onClickCheck: (type: 'id' | 'password') => void;
  onClickCloseModal: () => void;
}

const MobileFindModal = ({
  buttonText,
  onClickCheck,
  onClickCloseModal,
}: Props) => {
  const outside = useRef();

  const handleModalClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (outside) {
      if (outside.current === e.target) {
        onClickCloseModal();
      }
    }
  };

  const onClickBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClickCheck('id');
    onClickCloseModal();
  };

  return (
    <ModalWrapper ref={outside} onClick={handleModalClose}>
      <ModalBox onSubmit={onClickBtn}>
        <ContentText>
          <p className="main">
            {`담당자 변경으로 인증이 어려우실 경우\n 엔티즌으로 연락바랍니다.`}
          </p>
          <h4>고객센터 1544-6811</h4>
          <p className="sub">
            평일 10:00 ~18:00 <br />
            (점심시간 12:00 ~13:00 / 주말. 공휴일 제외)
          </p>
        </ContentText>
        <BtnBox>
          <Btn type="submit">
            <BtnText>
              {buttonText === 'id' ? '아이디 찾기' : '비밀번호 찾기'}
            </BtnText>
          </Btn>
        </BtnBox>
      </ModalBox>
    </ModalWrapper>
  );
};

export default MobileFindModal;

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
const ModalBox = styled.form`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-items: center;
  border-radius: 20pt;
  padding-left: 15pt;
  padding-right: 15pt;
  background-color: ${colors.lightWhite};
  box-shadow: 3pt 0 7.5pt rgba(137, 163, 201, 0.2);
  @media (max-width: 899.25pt) {
    top: auto;
    left: auto;
    transform: none;
    border-radius: 20pt 20pt 0 0;
  }
`;

const ContentText = styled.div`
  white-space: pre-wrap;
  font-size: 12pt;
  font-weight: 500;
  line-height: 18pt;
  letter-spacing: -2%;
  padding-bottom: 18pt;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30pt;
  .main {
    text-align: center;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 15pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
  }
  .sub {
    text-align: center;
    font-weight: 400;
    font-size: 9pt;
    line-height: 9pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
  }
  & > h4 {
    font-weight: 700;
    font-size: 9pt;
    line-height: 9pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    padding-top: 21pt;
    padding-bottom: 6pt;
  }
`;
const BtnBox = styled(Box)`
  width: 100%;
  position: relative;
  display: flex;
  gap: 9pt;
  padding-bottom: 21pt;
  @media (max-width: 899.25pt) {
    padding-bottom: 30pt;
  }
`;
const Btn = styled.button`
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
  justify-content: center;
  color: ${(props) => props.color};
  width: 100%;
  padding: 15pt 0;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
`;
