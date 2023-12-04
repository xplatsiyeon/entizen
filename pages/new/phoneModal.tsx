import React, { useState } from 'react';
import styled from '@emotion/styled';

type Props = {
  open: boolean;
  setOpen: Function;
};

const PhoneModal = ({ open, setOpen }: Props) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const confirmHandler = () => {
    if (phoneNumber.length === 0) {
      alert('핸드폰 번호를 입력해주세요.');
      return;
    }
    var regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (!regPhone.test(phoneNumber)) {
      alert('핸드폰 번호를 올바르게 입력해주세요.');
      return;
    }
    sessionStorage.setItem('phone_number', phoneNumber);
    setOpen(false);
  };
  return open ? (
    <Modal>
      <ContentsArea>
        <TitleArea>
          맞춤 견적서의 본인확인을 위해
          <br />
          연락처를 입력해 주세요.
          <CloseBtn onClick={() => setOpen(false)}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="X">
                <path
                  id="Vector"
                  d="M21.875 6.125L6.125 21.875"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  id="Vector_2"
                  d="M21.875 21.875L6.125 6.125"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
          </CloseBtn>
        </TitleArea>

        <CustomInput
          placeholder="연락처를 입력해 주세요."
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <ConfirmBtn onClick={confirmHandler}>확인</ConfirmBtn>
      </ContentsArea>
    </Modal>
  ) : (
    <></>
  );
};

export default PhoneModal;

const Modal = styled.div`
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  transition: all 600ms cubic-bezier(0.86, 0, 0.07, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 480px) {
    align-items: flex-end;
  }
`;

const ContentsArea = styled.div`
  width: 460px;
  height: 275px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(137, 163, 201, 0.2);
  padding: 42px 37px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 480px) {
    width: 100%;
    height: 40%;
    border-radius: 36px 36px 0px 0px;
    background: var(--Sub3, #fff);
  }
`;

const TitleArea = styled.p`
  color: var(--Main2, #222);
  font-family: Spoqa Han Sans Neo;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 480px) {
    color: #222;
    font-family: Spoqa Han Sans Neo;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px;
    letter-spacing: -0.48px;
  }
`;

const CloseBtn = styled.button`
  position: absolute
  display: flex;
  width: 28px;
  height: 28px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const CustomInput = styled.input`
  padding-left: 10px;
  width: 100%;
  height: 48px;
  stroke-width: 1px;
  stroke: #909fb7;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(137, 163, 201, 0.2);
`;

const ConfirmBtn = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  background: var(--Main1, #5221cb);
  color: #fff;
  text-align: center;
  font-family: Spoqa Han Sans Neo;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: -0.32px;
  @media screen and (max-width: 480px) {
    border-radius: 8px;
    background: var(--Main1, #5221cb);
    box-shadow: 0px 0px 10px 0px rgba(137, 163, 201, 0.2);
  }
`;
