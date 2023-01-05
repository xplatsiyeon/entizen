import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import axios from 'axios';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import colors from 'styles/colors';
import Btn from './button';
import Modal from 'components/Modal/Modal';

type Props = {
  email: string;
  setName: Dispatch<SetStateAction<string>>;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  level: number;
  userType: number;
  setLevel: Dispatch<SetStateAction<number>>;
};

const ManagerInfo = ({
  email,
  setName,
  setEmail,
  setPhoneNumber,
  level,
  setLevel,
  userType,
}: Props) => {
  const TAB = 'components/SignUp/ManagerInfo';
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [authCode, setAuthCode] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailCodeValid, setIsEmailCodeValid] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isModal, setIsModal] = useState(false);
  const loginTypeEnList: string[] = ['COMPANY', 'USER'];

  // 이메일 유효성 검사
  const reg_email =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

  // --- 본인인증 창 띄우기 ----
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
      if (data.isMember === true) {
        setIsModal(true);
        setModalMessage('이미 회원가입 하셨습니다.');
      } else if (data.isMember === false) {
        setLevel(level + 1);
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
      const EMAIL_API = 'https:///test-api.entizen.kr/api/mail/auth';
      axios({
        method: 'post',
        url: EMAIL_API,
        data: {
          email,
        },
      }).then((res) => {
        console.log(res);
        setModalMessage('이메일로 인증번호가 전송되었습니다.');
        setIsModal(true);
      });
    }
  };

  // 이메일 인증코드 확인
  const certifyEmailCode = () => {
    if (isEmailCodeValid) {
      const EMAIL_API = 'https:///test-api.entizen.kr/api/mail/auth/validation';
      axios({
        method: 'post',
        url: EMAIL_API,
        data: {
          email,
          authCode,
        },
      }).then((res) => {
        if (res.data.isValidAuthCode) {
          setModalMessage('인증번호가 확인되었습니다.');
          setIsModal(true);
          setIsValid(true);
        } else {
          setModalMessage('잘못된 인증번호입니다.');
          setIsModal(true);
        }
      });
    }
  };

  useEffect(() => {
    const memberType = loginTypeEnList[userType];
    console.log(TAB + '->>멤버타입 확인');
    console.log(memberType);
    axios({
      method: 'post',
      url: 'https:///test-api.entizen.kr/api/auth/nice',
      data: { memberType },
    })
      .then((res) => {
        setData(res.data.executedData);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Info>
        진행할 담당자 정보를
        <br />
        입력해주세요
      </Info>
      <SpanText>고객에게 전달되는 정보에요!</SpanText>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: '30pt',
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
                    인증
                  </Typography>
                </OverlapBtn>
              </InputAdornment>
            ),
          }}
        />
        {!isEmailValid && email.length > 1 && (
          <AlertMessage>이메일을 형식에 맞게 입력해주세요.</AlertMessage>
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
            // name={'form_chk'}
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

const BtnBox = styled.div`
  display: absolute;
  bottom: 30pt;
`;

const Info = styled.p`
  padding-top: 6pt;
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  color: ${colors.main2};
`;

const SpanText = styled.p`
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
  border: 0.75pt solid ${colors.gray};
  border-radius: 6pt;
  margin-top: 9pt;
  & input {
    padding: 10.875pt 0 10.875pt 12pt;
    font-size: 12pt;
    line-height: 12pt;
  }
  & .MuiInputBase-root {
    padding-right: 9pt;
  }
  ::placeholder {
    color: ${colors.gray};
    font-weight: 500;
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
const AlertMessage = styled.p`
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.sub4};
  margin-top: 9pt;
`;
export default ManagerInfo;
