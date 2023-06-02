import styled from '@emotion/styled';
import { api, isTokenPostApi } from 'api';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import colors from 'styles/colors';
import { reg_email } from 'utils/user';
import { ValidatedId } from './SignUp/IdPwInput';

type Props = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  emailValid: boolean;
  setEmailValid: Dispatch<SetStateAction<boolean>>;
};

export default function Email({
  email,
  setEmail,
  emailValid,
  setEmailValid,
}: Props) {
  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);
  // 이메일 인증
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [isSuccessEmail, setIsSuccessEmail] = useState(false);
  const [emailCheckBtn, setEmailCheckBtn] = useState<'인증' | '재전송'>('인증');
  // 이메일 코드 인증
  const [authCode, setAuthCode] = useState<string>('');
  const [isEmailCodeValid, setIsEmailCodeValid] = useState(false);
  const [emailCodeAlert, setEmailCodeAlert] = useState(false);
  const [emailCodeMessage, setEmailCodeMessage] = useState('');
  const [isSuccessCode, setIsSuccessCode] = useState(false);

  const { data, refetch } = useQuery<ValidatedId>(
    'ValidIdCheck',
    () =>
      api({
        method: 'GET',
        endpoint: `/members?id=${email}&memberType=${memberType}`,
      }),
    {
      enabled: false,
      onSuccess: (res) => {
        if (!res.isMember) {
          // 이메일 인증
          certifyEmailMutate({
            url: '/mail/auth',
            data: {
              email,
            },
          });
        } else {
          setEmailAlert(true);
          setEmailMessage('이미 사용중인 이메일입니다.');
          setIsSuccessEmail(false);
        }
      },
      onError: (error) => {
        alert('다시 시도해주세요.');
      },
    },
  );

  // 이메일 인증 번호 발송
  const { mutate: certifyEmailMutate } = useMutation(isTokenPostApi, {
    onSuccess(res) {
      setEmailAlert(true);
      setIsSuccessEmail(true);
      setEmailCheckBtn('재전송');

      if (emailCheckBtn === '재전송') {
        setEmailMessage('재전송 되었습니다. 스팸메일함도 확인해주세요.');
      } else {
        setEmailMessage('인증번호가 이메일로 전송되었습니다.');
      }
    },
  });

  // 이메일 인증번호 체크
  const { mutate: emailIdMutate } = useMutation(isTokenPostApi, {
    onSuccess(res) {
      if (res.data.isValidAuthCode) {
        setIsSuccessCode(true);
        setEmailCodeAlert(true);
        setEmailCodeMessage('인증이 완료되었습니다.');
        setEmailValid(true);
      } else {
        setEmailAlert(false);
        setEmailCodeAlert(true);
        setEmailCodeMessage('인증번호가 잘못되었습니다.');
      }
      setEmailMessage('');
    },
  });

  // email 상태
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    setEmailMessage('');
    setEmailValid(false);
    setEmailCheckBtn('인증');
  };
  // email code 변경
  const onChangeEmailCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAuthCode(value);
    setEmailCodeMessage('');
    setEmailValid(false);
    setIsSuccessCode(false);
  };

  // 이메일 인증
  const certifyEmail = () => {
    if (isEmailValid) {
      refetch();
      // certifyEmailMutate({
      //   url: '/mail/auth',
      //   data: { email },
      // });
    }
  };
  // 이메일 인증코드 확인
  const certifyEmailCode = () => {
    if (isSuccessEmail && isEmailCodeValid) {
      emailIdMutate({
        url: '/mail/auth/validation',
        data: { email, authCode },
      });
    }
  };

  // 유효성 검사
  useEffect(() => {
    reg_email.test(email) ? setIsEmailValid(true) : setIsEmailValid(false);
    authCode.length === 7
      ? setIsEmailCodeValid(true)
      : setIsEmailCodeValid(false);
  }, [email, authCode]);

  useEffect(() => {
    console.log('🔥 data : ', data);
  }, [data]);

  return (
    <div>
      <Wrap>
        <InputBox>
          <Input
            placeholder="이메일 입력"
            onChange={onChangeEmail}
            value={email}
          />
          <ConfirmButton isValid={isEmailValid} onClick={certifyEmail}>
            {emailCheckBtn}
          </ConfirmButton>
        </InputBox>
        {/* 이메일 유효성 검사 */}
        {emailAlert && emailMessage && (
          <AlertMessage isSuccess={isSuccessEmail}>{emailMessage}</AlertMessage>
        )}
        {!isEmailValid && email.length > 1 && (
          <AlertMessage isSuccess={isSuccessEmail}>
            이메일을 형식에 맞게 입력해주세요.
          </AlertMessage>
        )}

        <InputBox>
          <Input
            placeholder="이메일 인증번호 입력"
            onChange={onChangeEmailCode}
            value={authCode}
          />
          <ConfirmButton isValid={isEmailCodeValid} onClick={certifyEmailCode}>
            인증
          </ConfirmButton>
        </InputBox>
        {/* 이메일 인증 유효성 검사 */}
        {emailCodeAlert && (
          <AlertMessage isSuccess={isSuccessCode}>
            {emailCodeMessage}
          </AlertMessage>
        )}
      </Wrap>
    </div>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* margin-top: mobile ? 30pt : 49.5pt; */
  width: 100%;
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

const ConfirmButton = styled.button<{ isValid: boolean }>`
  position: absolute;
  right: 23pt;
  top: 15pt;
  padding: 7.5pt 9pt;
  background-color: ${({ isValid }) => (isValid ? colors.main1 : colors.gray)};
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
const AlertMessage = styled.p<{ isSuccess: boolean }>`
  color: ${({ isSuccess }) => (isSuccess ? colors.main1 : colors.sub4)};
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-top: 9pt;
  padding-left: 15pt;
`;
