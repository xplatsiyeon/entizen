import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import axios from 'axios';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import colors from 'styles/colors';
import Btn from './button';

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
  const router = useRouter();

  const [data, setData] = useState<any>();
  const [authCode, setAuthCode] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailCodeValid, setIsEmailCodeValid] = useState(false);
  const reg_email =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  // ========================== 본인인증 창 띄우기
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
  const handleForceClick = () => {
    let c = localStorage.getItem('key');
    if (c !== null) {
      let a = JSON.parse(c);
      console.log(a);
      console.log(a.isMember);
      setName(a.name);
      setPhoneNumber(a.phone);
      if (a.isMember) {
        alert('이미 회원가입 하셨습니다.');
        router.replace('/signin');
      }
      setLevel(level + 1);
    }

    // if(a && a.isMember)
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
      const EMAIL_API = 'https://test-api.entizen.kr/api/mail/auth';
      axios({
        method: 'post',
        url: EMAIL_API,
        data: {
          email,
        },
      }).then((res) => console.log(res));
    }
  };
  // 이메일 인증코드 확인
  const certifyEmailCode = () => {
    if (isEmailCodeValid) {
      const EMAIL_API = 'https://test-api.entizen.kr/api/mail/auth/validation';
      axios({
        method: 'post',
        url: EMAIL_API,
        data: {
          email,
          authCode,
        },
      }).then((res) => {
        if (res.data.isValidAuthCode) {
          setIsValid(true);
        }
      });
    }
  };

  useEffect(() => {
    console.log(localStorage.getItem('key'));
    const memberType = userType === 1 ? 'COMPANY' : 'USER';

    axios({
      method: 'post',
      url: 'https://test-api.entizen.kr/api/auth/nice',
      data: { memberType },
    })
      .then((res) => {
        // console.log(res.data);
        setData(res.data.executedData);
        // console.log(data);
        // encodeData = res.data.executedData;
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    reg_email.test(email) ? setIsEmailValid(true) : setIsEmailValid(false);
  }, [email]);
  useEffect(() => {
    authCode.length === 7
      ? setIsEmailCodeValid(true)
      : setIsEmailCodeValid(false);
  }, [authCode]);
  useEffect(() => {
    console.log(isValid);
  }, [isValid]);
  return (
    <>
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
export default ManagerInfo;
