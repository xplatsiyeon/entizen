import styled from '@emotion/styled';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import useDebounce from 'hooks/useDebounce';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import colors from 'styles/colors';
import Btn from './button';
import axios from 'axios';
import { BusinessRegistrationType } from '.';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { onSubmitCompany, ValidIdCheck } from 'api/auth/login';

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
  userType: number;
  email?: string;
  companyName?: string;
  postNumber?: string;
  companyAddress?: string;
  companyDetailAddress?: string;
  businessRegistration?: BusinessRegistrationType[];
};

interface ValidatedId {
  isMember: boolean;
  isSuccess: boolean;
}

const IdPwInput = ({
  email,
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
  userType,
  companyName,
  postNumber,
  companyAddress,
  companyDetailAddress,
  businessRegistration,
}: Props) => {
  const route = useRouter();
  const queryClient = useQueryClient();
  const [initIdAlert, setInitIdAlert] = useState(false);
  const [isChangeColor, setIsChangeColor] = useState(false);
  const { data, refetch } = useQuery<ValidatedId>(
    'ValidIdCheck',
    () => ValidIdCheck(idInput, userType === 0 ? 'USER' : 'COMPANY'),
    {
      enabled: false,
      onError: (error) => {
        console.log('----아이디 중복체크----');
        console.log(error);
        alert('다시 시도해주세요.');
      },
    },
  );
  const { mutate, isLoading, error } = useMutation(onSubmitCompany, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      route.push('/signUp/Complete');
    },
    onError: (error) => {
      console.log('----회원가입 실패----');
      console.log(error);
      alert('다시 시도해주세요.');
    },
  });

  // 디바운스를 이용한 유효성 검사
  const passwords = useDebounce(pwInput, 500);
  const checkPassword = useDebounce(checkPw, 500);
  // 인풋 값 변화, 중복확인 색 변경
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idRegExp = /^[a-zA-z0-9]{4,12}$/; //아이디 유효성 검사
    if (e.target.name === 'id') {
      setIdInput(e.target.value);
      idRegExp.test(idInput) ? setIsChangeColor(true) : setIsChangeColor(false);
    }
    if (e.target.name === 'pw') setPwInput(e.target.value);
    if (e.target.name === 'checkPw') setCheckPw(e.target.value);
  };
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.isPropagationStopped();
  };

  const overlabCheck = () => {
    setInitIdAlert(true);
    refetch();
  };
  const handleDelete = () => setPwInput('');
  const handleTwoDelete = () => setCheckPw('');

  // 일반 회원가입 온클릭
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (checkSamePw) {
      mutate({
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
      });
    }
  };
  // 기업 회원가입 온클릭
  const handleCompanyClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (checkSamePw)
      mutate({
        memberType: 'COMPANY',
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
        // 기업 추가 내용
        companyName,
        companyAddress,
        companyDetailAddress,
        companyZipCode: postNumber,
        managerEmail: email,

        // 사업자등록증 파일 목록
        businessRegistrationFiles: businessRegistration,
      });
  };
  // 유효성 검사
  useEffect(() => {
    if (passwords) {
      let check1 =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/.test(
          passwords,
        );
      setCheckedPw(check1);
    }
    if (checkPassword) {
      if (passwords !== checkPassword) setCheckSamePw(false);
      else setCheckSamePw(true);
    }
    console.log(passwords, checkPassword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwords, checkPassword]);
  // 중복확인 버튼 활성화
  useEffect(() => {
    if (idInput.length === 0) {
      setInitIdAlert(false);
      setIsChangeColor(false);
    }
  }, [initIdAlert, idInput]);
  useEffect(() => {
    console.log(data);
  }, [data]);
  // 로딩처리
  if (isLoading) {
    console.log('로딩중...');
  }

  const iconAdorment = {
    endAdornment: (
      <InputAdornment position="start">
        <CancelRoundedIcon
          onClick={handleDelete}
          sx={{
            color: '#E2E5ED',
            width: '10.5pt',
            marginRight: '9pt',
            cursor: 'pointer',
          }}
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
  const secondIconAdorment = {
    endAdornment: (
      <InputAdornment position="start">
        <CancelRoundedIcon
          onClick={handleTwoDelete}
          sx={{
            color: '#E2E5ED',
            width: '10.5pt',
            marginRight: '9pt',
            cursor: 'pointer',
          }}
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
  const secondIconAdornment = checkPwSelected ? secondIconAdorment : {};
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
                <OverlapBtn className="overlap" isChangeColor={isChangeColor}>
                  <Typography className="checkOverlap" onClick={overlabCheck}>
                    중복확인
                  </Typography>
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
            {data?.isMember === true &&
              initIdAlert &&
              '이미 사용중인 아이디입니다.'}
            {data?.isMember === false &&
              initIdAlert &&
              '사용가능한 아이디입니다.'}
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
        isClick={checkedPw && checkSamePw && idInput.length > 4 ? true : false}
        text={'가입 완료'}
        marginTop={77.25}
        handleClick={userType === 0 ? handleCompanyClick : handleClick}
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
`;
const OverlapBtn = styled.button<{ isChangeColor: boolean }>`
  & .checkOverlap {
    padding: 7.5pt 9pt;
    cursor: pointer;
  }
  margin-right: 0;
  color: ${colors.lightWhite};
  border-radius: 6pt;
  font-size: 10.5pt;
  font-weight: 500;
  line-height: 12pt;

  background-color: ${({ isChangeColor }) =>
    isChangeColor ? colors.main : colors.gray};
`;

export default IdPwInput;
