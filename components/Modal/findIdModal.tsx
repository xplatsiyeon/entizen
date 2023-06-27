import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React, { useRef } from 'react';
import colors from 'styles/colors';

type Props = {
  buttonText: string;
  onClickCheck: (type: 'id' | 'password') => void;
  onClickCloseModal: () => void;
};

const FindIdModal = ({
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
        <Content>
          <p>담당자 변경으로 인증이 어려우실 경우 엔티즌으로 연락바랍니다.</p>
          <h2>고객센터 1544-6811</h2>
          <p>
            평일 10:00 ~18:00
            <br />
            (점심시간 12:00 ~13:00 / 주말. 공휴일 제외)
          </p>
        </Content>
        <BtnBox type="submit">
          {buttonText === 'id' ? '아이디 찾기' : '비밀번호 찾기'}
        </BtnBox>
      </ModalBox>
    </ModalWrapper>
  );
};

export default FindIdModal;

const ModalWrapper = styled(Box)`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const ModalBox = styled.form`
  padding: 30pt 37.5pt;
  border-radius: 6pt;
  background-color: white;
`;

const Content = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > p {
    text-align: center;
    font-weight: 500;
    font-size: 12pt;
    line-height: 21pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
  }
  & > h2 {
    font-weight: 700;
    font-size: 12pt;
    line-height: 9pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    padding-top: 18pt;
    padding-bottom: 15pt;
  }
`;

const BtnBox = styled.button`
  width: 100%;
  position: relative;
  text-align: center;
  background-color: ${colors.main};
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  padding: 15pt 144pt;
  border-radius: 6pt;
  margin-top: 24pt;
  cursor: pointer;
`;
