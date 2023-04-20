import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import axios from 'axios';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import colors from 'styles/colors';
import Btn from './button';
import Modal from 'components/Modal/Modal';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { selectAction } from 'store/loginTypeSlice';
import { reg_email } from 'utils/user';
import { useMutation } from 'react-query';
import { isTokenPostApi } from 'api';

type Props = {
  email: string;
  setName: Dispatch<SetStateAction<string>>;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  userType: number;
  setBirthday: Dispatch<SetStateAction<string>>;
};

const ManagerInfo = ({
  email,
  setName,
  setEmail,
  setPhoneNumber,
  setBirthday,
  userType,
}: Props) => {
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const { signUpLevel } = useSelector((state: RootState) => state.LoginType);
  const [data, setData] = useState<any>();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isModal, setIsModal] = useState(false);
  const loginTypeEnList: string[] = ['USER', 'COMPANY'];
  // 이메일 인증
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [isSuccessEmail, setIsSuccessEmail] = useState(false);
  const [buttonMsg, setButtonMsg] = useState<'확인' | '재인증'>('확인');
  // 이메일 코드 인증
  const [authCode, setAuthCode] = useState<string>('');
  const [isEmailCodeValid, setIsEmailCodeValid] = useState(false);
  const [emailCodeAlert, setEmailCodeAlert] = useState(false);
  const [emailCodeMessage, setEmailCodeMessage] = useState('');
  const [isSuccessCode, setIsSuccessCode] = useState(false);

  // 이메일 인증 번호 발송
  const { mutate: certifyEmailMutate } = useMutation(isTokenPostApi, {
    onSuccess(res) {
      setEmailAlert(true);
      setEmailMessage('이메일로 인증번호가 전송되었습니다.');
      setIsSuccessEmail(true);
      setButtonMsg('재인증');
    },
  });

  // 이메일 인증번호 체크
  const { mutate: emailIdMutate } = useMutation(isTokenPostApi, {
    onSuccess(res) {
      if (res.data.isValidAuthCode) {
        setIsSuccessCode(true);
        setEmailCodeAlert(true);
        setEmailCodeMessage('인증번호가 확인되었습니다.');
        setIsValid(true);
      } else {
        setEmailAlert(false);
        setEmailCodeAlert(true);
        setEmailCodeMessage('인증번호가 잘못되었습니다.');
      }
      // setIsSuccessEmail(false);
      setEmailMessage('');
    },
  });

  // 나이스 인증 팝업창
  const fnPopup = () => {
    if (typeof window !== 'object') return;
    else {
      window.open(
        '',
        'popupChk',
        'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no',
      );
      let cloneDocument = document as any;
      cloneDocument.form_chk.action =
        'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb';
      cloneDocument.form_chk.target = 'popupChk';
      cloneDocument.form_chk.submit();
    }
  };
  // 나이스 인증 온클릭 버튼 (인증 후 자동 실행)
  const handleForceClick = () => {
    let key = sessionStorage.getItem('key');
    if (key !== null) {
      let data = JSON.parse(key);
      setName(data.name);
      setPhoneNumber(data.phone);
      setBirthday(data.birthDate);

      if (data.isMember === true) {
        setIsModal(true);
        setModalMessage('이미 회원가입 하셨습니다.');
      } else if (data.isMember === false) {
        // setLevel(level + 1);
        dispatch(selectAction.setSignUpLevel(signUpLevel + 1));
      }
    }
  };
  const onClickModal = () => {
    if (modalMessage === '이미 회원가입 하셨습니다.') {
      router.replace('/signin');
    }
    setIsModal(false);
  };
  // email 상태
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
  };
  const onChangeEmailCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAuthCode(value);
  };
  // 이메일 인증
  const certifyEmail = () => {
    if (isEmailValid) {
      certifyEmailMutate({
        url: '/mail/auth',
        data: { email },
      });
    }
  };
  // 이메일 인증코드 확인
  const certifyEmailCode = () => {
    if (isEmailCodeValid) {
      emailIdMutate({
        url: '/mail/auth/validation',
        data: { email, authCode },
      });
    }
  };

  useEffect(() => {
    const memberType = loginTypeEnList[userType];
    axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/nice`,
      data: { memberType },
    })
      .then((res) => {
        setData(res.data.executedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // 유효성 검사
  useEffect(() => {
    reg_email.test(email) ? setIsEmailValid(true) : setIsEmailValid(false);
    authCode.length === 7
      ? setIsEmailCodeValid(true)
      : setIsEmailCodeValid(false);
  }, [email, authCode]);

  return (
    <>
      {isModal && (
        <Modal text={modalMessage} click={onClickModal} color={colors.sub4} />
      )}
      {mobile && (
        <Info>
          진행할 담당자 정보를
          <br />
          입력해주세요
        </Info>
      )}
      {!mobile && <Info>진행할 담당자 정보를 입력해주세요</Info>}
      <SpanText>고객에게 전달되는 정보에요!</SpanText>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: mobile ? '30pt' : '49.5pt',
          width: '100%',
        }}
      >
        <Label>담당자 이메일</Label>
        <Input
          placeholder="이메일 입력"
          onChange={onChangeEmail}
          value={email}
          name="id"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <OverlapBtn isValid={isEmailValid}>
                  <Typography className="checkOverlap" onClick={certifyEmail}>
                    {buttonMsg}
                  </Typography>
                </OverlapBtn>
              </InputAdornment>
            ),
          }}
        />
        {emailAlert && emailMessage && (
          <AlertMessage isSuccess={isSuccessEmail}>{emailMessage}</AlertMessage>
        )}
        {!isEmailValid && email.length > 1 && (
          <AlertMessage isSuccess={isSuccessEmail}>
            이메일을 형식에 맞게 입력해주세요.
          </AlertMessage>
        )}

        <Input
          placeholder="이메일 인증번호 입력"
          onChange={onChangeEmailCode}
          value={authCode}
          name="id"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <OverlapBtn isValid={isEmailCodeValid}>
                  <Typography
                    className="checkOverlap"
                    onClick={certifyEmailCode}
                  >
                    확인
                  </Typography>
                </OverlapBtn>
              </InputAdornment>
            ),
          }}
        />
        {/* 이메일 인증 유효성 검사 */}
        {emailCodeAlert && (
          <AlertMessage isSuccess={isSuccessCode}>
            {emailCodeMessage}
          </AlertMessage>
        )}
      </Box>

      <div>
        <form name="form_chk" method="get">
          <input type="hidden" name="m" value="checkplusService" />
          {/* <!-- 필수 데이타로, 누락하시면 안됩니다. --> */}
          <input
            type="hidden"
            id="encodeData"
            name="EncodeData"
            value={data !== undefined && data}
          />
          <input type="hidden" name="recvMethodType" value="get" />
          {/* <!-- 위에서 업체정보를 암호화 한 데이타입니다. --> */}
          <Btn
            isClick={isValid}
            text={'본인인증하기'}
            handleClick={fnPopup}
            marginTop={59.25}
          />
        </form>
        <Buttons className="firstNextPage" onClick={handleForceClick}>
          아아
        </Buttons>
      </div>
    </>
  );
};

const Info = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  padding-top: 6pt;
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  color: ${colors.main2};
  @media (min-width: 900pt) {
    padding-top: 45.75pt;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 15pt;
    font-weight: 700;
    line-height: 22.5pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

const SpanText = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  margin-top: 9pt;
  font-size: 10.5pt;
  font-weight: 500;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #747780;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const Input = styled(TextField)`
  border-radius: 6pt;
  margin-top: 9pt;
  outline: none;
  .MuiOutlinedInput-notchedOutline {
    border: 1px solid #e2e5ed;
  }
  & input {
    padding: 10.875pt 0 10.875pt 12pt;
    font-size: 12pt;
    line-height: 12pt;
    ::placeholder {
      /* color: ${colors.gray}; */
      color: #caccd1;
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }

  & .MuiInputBase-root {
    padding-right: 9pt;
    border-radius: 6pt;
  }
  .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border: 0.75pt solid #5221cb;
    }
  }
  & .remove {
    display: none;
  }
  :focus > .remove {
    display: block;
  }
`;
const OverlapBtn = styled.button<{
  isValid: boolean;
}>`
  & .checkOverlap {
    padding: 4.5pt 9pt;
  }
  margin-right: 0;
  color: ${colors.lightWhite};
  border-radius: 6pt;
  font-size: 10.5pt;
  font-weight: 500;
  line-height: 12pt;
  cursor: pointer;
  background-color: ${({ isValid }) => (isValid ? colors.main : colors.gray)};
`;
const Buttons = styled.button`
  display: none;
`;
const AlertMessage = styled.p<{ isSuccess: boolean }>`
  color: ${({ isSuccess }) => (isSuccess ? colors.main1 : colors.sub4)};
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-top: 9pt;
`;
export default ManagerInfo;
