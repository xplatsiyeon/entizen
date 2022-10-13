import styled from '@emotion/styled';
import { Box, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import colors from 'styles/colors';

type Props = {
  passwordInput: string;
  checkPassword: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setPasswordModal: Dispatch<SetStateAction<boolean>>;
  setPasswordInput: Dispatch<SetStateAction<string>>;
  click?: () => void;
  passowrdValid: boolean;
};

const PasswordModal = ({
  passwordInput,
  onChange,
  checkPassword,
  click,
  setPasswordModal,
  setPasswordInput,
  passowrdValid,
}: Props) => {
  const outside = useRef();

  const handleModalClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (outside.current === e.target) {
      setPasswordModal((prev) => !prev);
      setPasswordInput('');
    }
  };

  // passwordInput 업데이트
  useEffect(() => {}, [passwordInput]);

  return (
    <ModalWrapper ref={outside} onClick={(e) => handleModalClose(e)}>
      <ModalBox>
        <Content>
          <ContentText>
            비밀번호 인증을 해주세요.
            <br />
            인증 후 탈퇴가 가능합니다.
          </ContentText>
        </Content>
        <Inputs value={passwordInput} onChange={onChange} type="password" />
        {passowrdValid && <Alert>올바르지 않는 비밀번호입니다.</Alert>}
        <BtnBox>
          <CheckBtn
            checkPassword={checkPassword}
            disabled={!checkPassword}
            onClick={click}
          >
            확인
          </CheckBtn>
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
  justify-content: center;
  align-items: center;
  z-index: 100;
`;
const ModalBox = styled(Box)`
  padding: 21pt 15pt;
  border-radius: 6pt;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentText = styled(Typography)`
  white-space: pre-wrap;
  font-size: 12pt;
  font-weight: 500;
  line-height: 18pt;
  letter-spacing: -2%;
  text-align: center;
`;
const Content = styled(Box)`
  width: 190.5pt;
`;
const Inputs = styled(TextField)`
  margin-top: 21pt;
  width: 100%;
  border-radius: 6pt;
  & > span {
    padding-top: 13.5pt;
    padding-bottom: 13.5pt;
    padding-left: 12pt;
  }
`;
const BtnBox = styled(Box)`
  width: 100%;
  margin-top: 30pt;
`;
const CheckBtn = styled.button<{ checkPassword: boolean }>`
  width: 100%;
  padding: 15pt 84pt;
  font-size: 12pt;
  font-weight: 400;
  border-radius: 6pt;
  line-height: 12pt;
  letter-spacing: -2%;
  background-color: ${({ checkPassword }) =>
    checkPassword ? `${colors.main}` : `${colors.lightGray}`};
  color: #ffffff;
`;
const Alert = styled.p`
  margin-top: 9pt;
  color: ${colors.sub4};
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
`;
export default PasswordModal;
