import styled from '@emotion/styled';
import { Box, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import colors from 'styles/colors';
import { css } from '@emotion/react';

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
        {passowrdValid && <Alert>비밀번호가 일치하지 않습니다</Alert>}
        <BtnBox>
          <CheckBtn
            checkPassword={checkPassword}
            onClick={() => {
              setPasswordModal(false);
            }}
            check={false}
          >
            취소
          </CheckBtn>
          <CheckBtn
            checkPassword={checkPassword}
            disabled={!checkPassword}
            onClick={click}
            check={true}
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
  @media (min-width: 900pt) {
    top: 0;
    left: 0;
  }
`;

const ModalBox = styled(Box)`
  padding: 21pt 15pt;
  border-radius: 6pt;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 220.5pt;
  @media (min-width: 900pt) {
    margin-top: 10%;
    width: 354pt;
  }
`;

const ContentText = styled(Typography)`
  font-family: 'Spoqa Han Sans Neo';
  color: #222222;
  white-space: pre-wrap;
  font-size: 12pt;
  font-weight: 500;
  line-height: 18pt;
  letter-spacing: -2%;
  text-align: center;
  @media (min-width: 900pt) {
    font-size: 15pt;
    font-weight: 700;
    line-height: 24pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
`;
const Content = styled(Box)`
  width: 190.5pt;
`;
const Inputs = styled(TextField)`
  width: 190.5pt;
  margin-top: 21pt;
  width: 100%;
  border-radius: 6pt;
  outline: none;
  .MuiOutlinedInput-notchedOutline {
    border: 0.75pt solid #e2e5ed;
  }
  & .MuiInputBase-root {
    padding-right: 9pt;
    border-radius: 6pt;
  }
  .MuiOutlinedInput-root {
    &:hover fieldset {
      border-color: #e2e5ed;
    }
    &.Mui-focused fieldset {
      border: 0.75pt solid #5221cb;
    }
  }
  & > span {
    padding-top: 13.5pt;
    padding-bottom: 13.5pt;
    padding-left: 12pt;
  }
  @media (min-width: 900pt) {
    width: 297pt;
  }
`;
const BtnBox = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 30pt;
  gap: 9pt;
  @media (min-width: 900pt) {
    display: flex;
    align-items: center;
    gap: 12pt;
  }
`;
const CheckBtn = styled.button<{ checkPassword?: boolean; check?: boolean }>`
  width: 90.75pt;
  padding: 15pt 34.5pt;
  font-size: 12pt;
  font-weight: 400;
  border-radius: 6pt;
  line-height: 12pt;
  letter-spacing: -2%;

  color: #ffffff;
  background-color: ${({ check }) => (check === true ? '#B096EF' : '#E2E5ED')};
  ${({ checkPassword, check }) =>
    checkPassword === true &&
    check === true &&
    css`
      background-color: #5221cb;
    `}

  cursor: pointer;
  @media (min-width: 900pt) {
    width: 142.5pt;
    padding: 13.5pt 60pt;
  }
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
