import styled from '@emotion/styled';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import useDebounce from 'hooks/useDebounce';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import colors from 'styles/colors';
import Btn from './button';
import axios from 'axios';

type Props = {
  idInput: string;
  setIdInput: Dispatch<SetStateAction<string>>;
  pwInput: string;
  setPwInput: Dispatch<SetStateAction<string>>;
  checkPw: string;
  setCheckPw: Dispatch<SetStateAction<string>>;
  pwShow: boolean;
  setPwShow: Dispatch<SetStateAction<boolean>>;
  pwSelected: boolean;
  setPwSelected: Dispatch<SetStateAction<boolean>>;
  checkPwSelected: boolean;
  setCheckPwSelected: Dispatch<SetStateAction<boolean>>;
  checkedPw: boolean;
  setCheckedPw: Dispatch<SetStateAction<boolean>>;
  checkSamePw: boolean;
  setCheckSamePw: Dispatch<SetStateAction<boolean>>;
  name: string;
  phoneNumber: string;
  fullTerms: boolean;
};

const IdPwInput = ({
  idInput,
  setIdInput,
  pwInput,
  setPwInput,
  checkPw,
  setCheckPw,
  pwShow,
  setPwShow,
  pwSelected,
  setPwSelected,
  checkPwSelected,
  setCheckPwSelected,
  checkedPw,
  setCheckedPw,
  checkSamePw,
  setCheckSamePw,
  name,
  phoneNumber,
  fullTerms,
}: Props) => {
  const route = useRouter();

  // 디바운스를 이용한 유효성 검사
  const password = useDebounce(pwInput, 500);
  const checkPassword = useDebounce(checkPw, 500);
  useEffect(() => {
    let num = password.search(/[0-9]/g);
    let eng = password.search(/[a-z]/gi);
    let spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (password) {
      if (password.length < 10 || password.length > 20) setCheckedPw(false);
      else if (password.search(/₩s/) != -1) setCheckedPw(false);
      else if (
        (num < 0 && eng < 0) ||
        (eng < 0 && spe < 0) ||
        (spe < 0 && num < 0)
      )
        setCheckedPw(false);
      else setCheckedPw(true);
    }
    if (checkPassword) {
      if (password !== checkPassword) setCheckSamePw(false);
      else setCheckSamePw(true);
    }
    console.log(password, checkPassword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, checkPassword]);

  // 인풋 값 변화, 중복확인 색 변경
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let overLap = document.querySelector('.overlap');
    if (e.target.name === 'id') {
      setIdInput((idInput) => e.target.value);
      if (idInput.length > 4) {
        overLap?.classList.add('changeColor');
      } else {
        overLap?.classList.remove('changeColor');
      }
    }
    if (e.target.name === 'pw') {
      setPwInput(e.target.value);
    }
    if (e.target.name === 'checkPw') {
      setCheckPw(e.target.value);
    }
  };
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
  };
  const iconAdorment = {
    endAdornment: (
      <InputAdornment position="start">
        <CancelRoundedIcon
          sx={{ color: '#E2E5ED', width: '10.5pt', marginRight: '9pt' }}
        />
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '16px',
            letterSpacing: '-0.02em',
            textAlign: 'left',
            color: `${colors.main}`,
          }}
          variant="subtitle1"
          onClick={() => setPwShow(!pwShow)}
          onMouseDown={handleMouseDownPassword}
        >
          {pwShow ? '미표시' : '표시'}
        </Typography>
      </InputAdornment>
    ),
  };
  const iconAdornment = pwSelected ? iconAdorment : {};
  const secondIconAdornment = checkPwSelected ? iconAdorment : {};

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (checkSamePw) {
      try {
        await axios({
          method: 'post',
          url: 'https://test-api.entizen.kr/api/members/join',
          data: {
            memberType: 'USER',
            name: name,
            phone: phoneNumber,
            id: idInput,
            password: checkPw,
            optionalTermsConsentStatus: [
              {
                optionalTermsType: 'LOCATION',
                consentStatus: fullTerms,
              },
            ],
          },
          headers: {
            ContentType: 'application/json',
          },
          withCredentials: true,
        }).then((res) => console.log(res));
      } catch (error) {
        console.log('post 실패!!!!!!');
        console.log(error);
      }
    }
    route.push('/signUp/Complete');
  };

  return (
    <>
      <Info>
        가입하실 아이디와
        <br />
        비밀번호를 설정해주세요
      </Info>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: '24pt',
          width: '100%',
          position: 'relative',
        }}
      >
        <Label>아이디</Label>
        <Input
          placeholder="아이디 입력"
          onChange={handleIdChange}
          value={idInput}
          name="id"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <OverlapBtn className="overlap">
                  <Typography className="checkOverlap">중복확인</Typography>
                </OverlapBtn>
              </InputAdornment>
            ),
          }}
        />
        <Box>
          <Typography
            sx={{
              color: '#F75015',
              fontSize: '9pt',
              lineHeight: '12pt',
              marginTop: '9pt',
            }}
          >
            {/* 이미 사용중인 아이디입니다. */}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: '30pt',
          width: '100%',
        }}
      >
        <Label>비밀번호</Label>
        <Input
          placeholder="비밀번호 입력"
          onChange={handleIdChange}
          type={pwShow ? 'text' : 'password'}
          value={pwInput}
          name="pw"
          hiddenLabel
          InputProps={iconAdornment}
          onFocus={(e) => setPwSelected(true)}
          onBlur={(e) => setPwSelected(false)}
        />
        {!checkedPw && pwInput.length > 4 ? (
          <Box>
            <Typography
              sx={{
                color: '#F75015',
                fontSize: '9pt',
              }}
            >
              영문,숫자,특수문자 조합 10자 이상
            </Typography>
          </Box>
        ) : (
          <></>
        )}
        <Input
          placeholder="비밀번호 재입력"
          onChange={handleIdChange}
          type={pwShow ? 'text' : 'password'}
          value={checkPw}
          name="checkPw"
          InputProps={secondIconAdornment}
          onFocus={(e) => setCheckPwSelected(true)}
          onBlur={(e) => setCheckPwSelected(false)}
        />
        {!checkSamePw && checkPw.length > 4 ? (
          <Box>
            <Typography
              sx={{
                color: '#F75015',
                fontSize: '9pt',
              }}
            >
              비밀번호를 확인해주세요
            </Typography>
          </Box>
        ) : (
          <></>
        )}
      </Box>
      <Btn
        isClick={checkedPw && checkSamePw && idInput.length > 6 ? true : false}
        text={'가입 완료'}
        marginTop={77.25}
        handleClick={handleClick}
      />
      <NameInput className="nameInput" />
      <PhoneInput className="phoneInput" />
    </>
  );
};

const Info = styled.p`
  padding-top: 6pt;
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  color: ${colors.main2};
`;
const Label = styled.label`
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;

const NameInput = styled.input`
  display: none;
`;
const PhoneInput = styled.input`
  display: none;
`;

const Input = styled(TextField)`
  border: 0.75pt solid ${colors.gray};
  border-radius: 6pt;
  margin-top: 9pt;
  & input {
    padding: 13.5pt 0 13.5pt 12pt;
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
  /* margin-top: 9pt;
  padding: 13.5pt 0;
  padding-left: 12pt; */
  /* ::placeholder {
    color: ${colors.gray};
    font-weight: 500;
  }
  font-family: 'pass', 'Roboto', Helvetica, Arial, sans-serif;
  font-size: 18px;
  &::-webkit-input-placeholder {
    transform: scale(0.77);
    transform-origin: 0 50%;
  }
  &::-moz-placeholder {
    font-size: 14px;
    opacity: 1;
  }
  &:-ms-input-placeholder {
    font-size: 14px;
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
  } */
`;
const OverlapBtn = styled.button`
  & .checkOverlap {
    padding: 7.5pt 9pt;
  }
  margin-right: 0;
  background: #e2e5ed;
  color: #ffffff;
  border-radius: 6pt;
  font-size: 10.5pt;
  font-weight: 500;
  line-height: 12pt;
  &.changeColor {
    background-color: ${colors.main};
  }
`;

export default IdPwInput;
