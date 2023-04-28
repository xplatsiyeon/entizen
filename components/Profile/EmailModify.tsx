import styled from '@emotion/styled';
import colors from 'styles/colors';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BackImg from 'public/images/back-btn.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useDebounce from 'hooks/useDebounce';
import { useMutation, useQuery } from 'react-query';
import { api, isPostApi, isTokenPatchApi } from 'api';
import Modal from 'components/Modal/Modal';
import { checkedPassword } from 'utils/calculatePackage';
import EmailComponents from 'components/EmailComponents';
import PasswordInputBox from 'components/PasswordInputBox';
import useProfile from 'hooks/useProfile';
import { ValidatedId } from 'components/SignUp/IdPwInput';

type Props = {
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
};
const EmailModify = ({ setTabNumber }: Props) => {
  const router = useRouter();

  const memeberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const userID = JSON.parse(sessionStorage.getItem('USER_ID')!);

  // step 0 : 비밀번호 , 1: 이메일 확인 , 2: 이메일 변경
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState(''); // 변경될 이메일

  const [existingPassword, setExistingPassword] = useState('');
  const value = useDebounce(existingPassword, 500);
  const [isFailedPassword, setIsFailedPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  // 모달창
  const [isModal, setIsModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  // 유저 정보 불러오기
  const { profile } = useProfile(accessToken);

  // 비밀번호 체크 mutate
  const { mutate: passowrdCheckMutate } = useMutation(isPostApi, {
    onSuccess: (res) => {
      console.log('🔥 res : ', res);
      if (res.data.isSuccess === true) {
        sessionStorage.setItem(
          'ACCESS_TOKEN',
          JSON.stringify(res.data.accessToken),
        );
        sessionStorage.setItem(
          'REFRESH_TOKEN',
          JSON.stringify(res.data.refreshToken),
        );
        setStep(1);
        setIsValid(false);
      } else {
        setIsFailedPassword(true);
      }
    },
    onError: (error) => {
      setIsFailedPassword(true);
    },
  });

  // 이메일 변경하기
  const { mutate: emailChangeMutate } = useMutation(isTokenPatchApi, {
    onSuccess: (res) => {
      setModalMessage('이메일 변경이 완료되었습니다.\n다시 로그인 해주세요.');
      setIsModal(true);
    },
    onError: () => {},
  });

  // 버튼 step에 따라 API 호출 변경
  const onClickChangeBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    switch (step) {
      case 0:
        if (isValid) {
          passowrdCheckMutate({
            url: '/members/login',
            data: {
              memberType: memeberType,
              id: userID,
              password: value,
            },
          });
        }
        break;
      case 2:
        emailChangeMutate({
          url: '/members',
          data: {
            name: profile?.name,
            phone: profile?.phone,
            email,
          },
        });
        break;
    }
  };

  return (
    <React.Fragment>
      {isModal && (
        <Modal
          click={() => {
            modalMessage.includes('이메일 변경이 완료되었습니다.')
              ? router.push('/signin')
              : setIsModal(false);
          }}
          text={modalMessage}
        />
      )}
      <WebBody>
        <Inner>
          <Wrapper>
            <WebHidden>
              <Header>
                <div className="img-item" onClick={() => setTabNumber(-1)}>
                  <Image
                    style={{
                      cursor: 'pointer',
                      width: '18pt',
                      height: '18pt',
                    }}
                    src={BackImg}
                    alt="btn"
                  />
                </div>
                <span className="text">이메일 변경</span>
              </Header>
            </WebHidden>

            {step === 0 ? (
              // ======================= 이메일 변경 1단계 =========================
              <>
                <Title>비밀번호</Title>
                {/* 비밀번호 컴포넌트  */}
                <PasswordInputWrap>
                  <PasswordInputBox
                    value={existingPassword}
                    setValue={setExistingPassword}
                    placeholder={'비밀번호 입력'}
                    name={existingPassword}
                    handleIdChange={(e) =>
                      setExistingPassword(e.currentTarget.value)
                    }
                    isValid={isValid}
                    setIsValid={setIsValid}
                  />
                </PasswordInputWrap>
                {/*  비밀번호 일치 여부 확인  */}
                {isFailedPassword && (
                  <AlertMessage color={colors.sub4}>
                    비밀번호가 일치하지 않습니다.
                  </AlertMessage>
                )}
              </>
            ) : // ======================= 이메일 변경 2단계 =========================
            step === 1 ? (
              <>
                <Title>이메일</Title>
                <InputBox>
                  <Input type="text" readOnly placeholder={userID} />
                  <ConfirmButton onClick={() => setStep(2)}>변경</ConfirmButton>
                </InputBox>
              </>
            ) : (
              // ======================= 이메일 변경 3단계 =========================
              <>
                <Title>이메일</Title>
                {/* 이메일 컴포넌트  */}
                <EmailComponents
                  email={email}
                  setEmail={setEmail}
                  emailValid={isValid}
                  setEmailValid={setIsValid}
                />
              </>
            )}

            <BtnBox>
              <Btn
                isValid={isValid}
                onClick={
                  isValid
                    ? (e) => onClickChangeBtn(e)
                    : (e) => {
                        e.preventDefault();
                      }
                }
              >
                {step === 0 && '변경하기'}
                {step === 1 && '수정완료'}
                {step === 2 && '수정완료'}
              </Btn>
            </BtnBox>
          </Wrapper>
        </Inner>
      </WebBody>
    </React.Fragment>
  );
};

export default EmailModify;

const WebHidden = styled.div`
  @media (min-width: 900pt) {
    display: none;
  }
`;

const Header = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36pt;
  padding: 9pt 0;
  padding: 0 15pt;
  .img-item {
    position: absolute;
    left: 7pt;
    padding: 5px;
  }
  .text {
    font-weight: 700;
    font-size: 12pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
`;

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;

  @media (max-height: 809pt) {
    display: block;
  }
  @media (min-width: 900pt) {
    width: 580.5pt;
    height: auto;
  }
  @media (max-width: 899.25pt) {
    width: 100vw;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  width: 100%;
  background: ${colors.lightWhite};
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;
  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0;
    padding: 0;
    border-radius: 0;
  }

  @media (min-width: 900pt) {
    padding-bottom: 425pt;
  }
`;
const Wrapper = styled.div`
  position: relative;
  margin: 0pt 31.875pt;
  @media (max-width: 899.25pt) {
    height: 100%;
    margin: 0;
  }
`;
const Title = styled.h1`
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding-top: 27pt;
  padding-left: 15pt;
`;

const AlertMessage = styled.p<{ color: string }>`
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${({ color }) => color};
  padding-left: 15pt;
  padding-top: 9pt;
`;
const InputBox = styled.div`
  position: relative;
  padding: 0 15pt;
`;
const Input = styled.input`
  padding: 13.5pt 0;
  margin-top: 9pt;
  border: 0.75pt solid ${colors.gray};
  border-radius: 6pt;
  width: calc(100% - 15pt);
  position: relative;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding-left: 15pt;
  width: 100%;
  max-height: 39pt;
  &::placeholder {
    color: ${colors.lightGray4};
  }
`;
const PasswordInputWrap = styled.div`
  padding: 0 15pt;
`;
const BtnBox = styled.div`
  position: fixed;
  box-sizing: border-box;
  left: 0;
  bottom: 30pt;
  width: 100%;
  padding: 0 15pt;
  /* width: 100%; */
  @media (min-width: 900pt) {
    position: relative;
    top: 300pt;
  }
`;
const Btn = styled.button<{ isValid: boolean }>`
  cursor: pointer;
  cursor: ${({ isValid }) => (isValid ? 'pointer' : 'auto')};
  background: ${({ isValid }) => (isValid ? colors.main : colors.gray)};
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  width: 100%;
  padding: 15pt 0;
`;

const ConfirmButton = styled.button`
  position: absolute;
  right: 23pt;
  top: 15pt;
  width: 37.5pt;
  height: 27pt;
  background: ${colors.main1};
  border-radius: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  cursor: pointer;
`;
