import styled from '@emotion/styled';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import useDebounce from 'hooks/useDebounce';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import colors from 'styles/colors';
import Btn from './button';
import { BusinessRegistrationType } from '.';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { api } from 'api';
import useLogin from 'hooks/useLogin';
import { css } from '@emotion/react';
import { useMediaQuery } from 'react-responsive';

type Props = {
  idInput: string;
  setIdInput: Dispatch<SetStateAction<string>>;
  pwInput: string;
  setPwInput: Dispatch<SetStateAction<string>>;
  checkPw: string;
  setCheckPw: Dispatch<SetStateAction<string>>;
  pwSelected: boolean;
  setPwSelected: Dispatch<SetStateAction<boolean>>;
  checkPwSelected: boolean;
  setCheckPwSelected: Dispatch<SetStateAction<boolean>>;
  checkedPw: boolean;
  setCheckedPw: Dispatch<SetStateAction<boolean>>;
  checkSamePw: boolean;
  setCheckSamePw: Dispatch<SetStateAction<boolean>>;
  setModalMessage: Dispatch<SetStateAction<string>>;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  setUserCompleteModal: Dispatch<SetStateAction<boolean>>;
  name: string;
  phoneNumber: string;
  birthday: string;
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

const loginTypeEnList = ['USER', 'COMPANY'];

const CompoIdPwInput = ({
  email,
  idInput,
  setIdInput,
  pwInput,
  setPwInput,
  checkPw,
  setCheckPw,
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
  birthday,
  fullTerms,
  userType,
  companyName,
  postNumber,
  companyAddress,
  companyDetailAddress,
  businessRegistration,
  setModalMessage,
  setIsModal,
  setUserCompleteModal,
}: Props) => {
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  const router = useRouter();
  const queryClient = useQueryClient();
  const [initIdAlert, setInitIdAlert] = useState(false);
  const [idLength, setIdLength] = useState(false);
  const [isChangeColor, setIsChangeColor] = useState(false);
  // 패스워드 보여주기 true false
  const [pwShow, setPwShow] = useState<boolean[]>([false, false, false]);

  const { loginError, loginLoading, signin } = useLogin(
    idInput,
    setIsModal,
    setModalMessage,
    setUserCompleteModal,
    loginTypeEnList[userType] as 'USER' | 'COMPANY',
    true,
  );

  const { data, refetch } = useQuery<ValidatedId>(
    'ValidIdCheck',
    () =>
      api({
        method: 'GET',
        endpoint: `/members?id=${idInput}&memberType=${loginTypeEnList[userType]}`,
      }),
    {
      enabled: false,
      onError: (error) => {
        alert('다시 시도해주세요.');
      },
    },
  );
  // 일반 유저 회원가입 mutate
  const {
    mutate: userMutate,
    isLoading: userLoading,
    error: userError,
  } = useMutation(api, {
    onSuccess: async (res) => {
      queryClient.invalidateQueries();

      if (res?.isSuccess === true) {
        signin(checkPw);
      }
    },
    onError: (error) => {
      alert('회원가입 실패했습니다. 다시 시도해주세요.');
    },
  });

  // 기업 유저 회원가입 mutate
  const {
    mutate: companyMutate,
    isLoading: companyLoading,
    error: companyError,
  } = useMutation(api, {
    onSuccess: () => {
      // console.log('성공');
      queryClient.invalidateQueries();
      router.push('/signUp/CompleteCompany');
    },
    onError: (error) => {
      alert('회원가입 실패했습니다. 다시 시도해주세요.');
    },
  });

  // 디바운스를 이용한 유효성 검사
  const passwords = useDebounce(pwInput, 500);
  const checkPassword = useDebounce(checkPw, 500);
  // 인풋 값 변화, 중복확인 색 변경
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const idRegExp = /^[a-zA-z0-9]{4,12}$/; //아이디 유효성 검사
    if (e.target.name === 'id') {
      setInitIdAlert(false);
      setIdInput(value);
      idRegExp.test(value) ? setIsChangeColor(true) : setIsChangeColor(false);
    }
    if (e.target.name === 'pw') setPwInput(value);
    if (e.target.name === 'checkPw') setCheckPw(value);
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.isPropagationStopped();
  };

  const overlabCheck = () => {
    setInitIdAlert(true);
    refetch();
  };
  // 일반 회원가입 온클릭
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // alert('!!')
    if (checkSamePw) {
      await userMutate({
        method: 'POST',
        endpoint: '/members/join',
        data: {
          memberType: 'USER',
          name: name,
          phone: phoneNumber,
          birthDate: birthday,
          id: idInput,
          password: checkPw,
          optionalTermsConsentStatus: [
            {
              optionalTermsType: 'EVENT',
              consentStatus: fullTerms,
            },
          ],
        },
      });
    }
  };
  // 기업 회원가입 온클릭
  const handleCompanyClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (checkSamePw) {
      const newBusinessRegistration = businessRegistration?.map((e) => {
        return {
          url: e.url,
          size: e.size,
          originalName: e.originalName,
        };
      });

      companyMutate({
        method: 'POST',
        endpoint: '/members/join',
        data: {
          memberType: 'COMPANY',
          name: name,
          phone: phoneNumber,
          birthDate: birthday,
          id: idInput,
          password: checkPw,
          optionalTermsConsentStatus: [
            {
              optionalTermsType: 'EVENT',
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
          businessRegistrationFiles: newBusinessRegistration,
        },
      });
    }
  };
  const handleShowBtn = (id: number) => {
    let temp = [...pwShow];
    temp[id] = !temp[id];
    setPwShow(temp);
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
    // console.log(passwords, checkPassword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwords, checkPassword]);

  // 중복확인 버튼 비활성화
  useEffect(() => {
    if (idInput.length <= 4) {
      setIsChangeColor(false);
      setIdLength(true);
    } else {
      setIdLength(false);
      setIsChangeColor(true);
    }
  }, [initIdAlert, idInput]);

  const iconAdorment = {
    endAdornment: (
      <InputAdornment position="start">
        <Typography
          onClick={() => setPwInput('')}
          onMouseDown={handleMouseDownPassword}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CancelRoundedIcon
            sx={{
              color: '#E2E5ED',
              width: '10.5pt',
              marginRight: '9pt',
              cursor: 'pointer',
            }}
          />
        </Typography>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '16px',
            letterSpacing: '-0.02em',
            textAlign: 'left',
            color: `${colors.main}`,
            cursor: 'pointer',
          }}
          variant="subtitle1"
          onClick={() => handleShowBtn(0)}
          onMouseDown={handleMouseDownPassword}
        >
          {pwShow[0] ? '미표시' : '표시'}
        </Typography>
      </InputAdornment>
    ),
  };
  const secondIconAdorment = {
    endAdornment: (
      <InputAdornment position="start">
        <Typography
          onClick={() => setCheckPw('')}
          onMouseDown={handleMouseDownPassword}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CancelRoundedIcon
            sx={{
              color: '#E2E5ED',
              width: '10.5pt',
              marginRight: '9pt',
              cursor: 'pointer',
            }}
          />
        </Typography>
        <Typography
          sx={{
            fontSize: '10.5pt',
            fontWeight: '400',
            lineHeight: '12pt',
            letterSpacing: '-0.02em',
            textAlign: 'left',
            color: `${colors.main}`,
            cursor: 'pointer',
          }}
          variant="subtitle1"
          onClick={() => handleShowBtn(1)}
          onMouseDown={handleMouseDownPassword}
        >
          {pwShow[1] ? '미표시' : '표시'}
        </Typography>
      </InputAdornment>
    ),
  };
  const iconAdornment = pwSelected ? iconAdorment : {};
  const secondIconAdornment = checkPwSelected ? secondIconAdorment : {};
  return (
    <>
      <Info>
        {`가입하실 ${
          loginTypeEnList[userType] === 'USER' ? '이메일과' : '아이디와'
        }`}
        <br />
        비밀번호를 설정해주세요
      </Info>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: mobile ? '24pt' : '',
          width: '100%',
          position: 'relative',
        }}
      >
        <Label>아이디</Label>
        <Input
          autoComplete="new-password"
          borderBoolean1={
            data?.isMember === true && initIdAlert && !idLength ? true : false
          }
          borderBoolean2={
            data?.isMember === false && initIdAlert && idLength ? true : false
          }
          placeholder="아이디 입력"
          onChange={handleIdChange}
          value={idInput}
          name="id"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <OverlapBtn className="overlap" isChangeColor={isChangeColor}>
                  <ButtonText className="checkOverlap" onClick={overlabCheck}>
                    중복확인
                  </ButtonText>
                </OverlapBtn>
              </InputAdornment>
            ),
          }}
        />
        <Box>
          {data?.isMember === false && initIdAlert && !idLength && (
            <MessageId>사용가능한 아이디입니다.</MessageId>
          )}
          {data?.isMember === true && initIdAlert && !idLength && (
            <MessageErrId>이미 사용중인 아이디입니다.</MessageErrId>
          )}
          {data?.isMember === false && initIdAlert && idLength && (
            <MessageErrId>5글자 이상 입력해주세요</MessageErrId>
          )}
          {/* {data?.isMember === true &&
              initIdAlert &&
              '이미 사용중인 아이디입니다.'}
            {data?.isMember === false &&
              initIdAlert &&
              '사용가능한 아이디입니다.'} */}
        </Box>
      </Box>
      <BoxPW>
        <LabelPW>비밀번호</LabelPW>
        <Input
          autoComplete="new-password"
          borderBoolean1={!checkedPw && pwInput.length > 4 ? true : false}
          placeholder="비밀번호 입력"
          onChange={handleIdChange}
          type={pwShow[0] ? 'text' : 'password'}
          value={pwInput}
          name="pw"
          hiddenLabel
          InputProps={iconAdornment}
          onFocus={(e) => setPwSelected(true)}
          onBlur={(e) => setPwSelected(false)}
        />
        {!checkedPw && pwInput.length > 4 ? (
          <Box>
            <MessageErrPW>
              영문, 숫자, 특수문자 조합 8자 이상 입력해 주세요
            </MessageErrPW>
          </Box>
        ) : (
          <></>
        )}
        <Input
          autoComplete="new-password"
          borderBoolean1={!checkSamePw && checkPw.length > 4 ? true : false}
          placeholder="비밀번호 재입력"
          onChange={handleIdChange}
          type={pwShow[1] ? 'text' : 'password'}
          value={checkPw}
          name="checkPw"
          InputProps={secondIconAdornment}
          onFocus={(e) => setCheckPwSelected(true)}
          onBlur={(e) => setCheckPwSelected(false)}
        />
        {!checkSamePw && checkPw.length > 4 ? (
          <Box>
            <MessageErrPW>비밀번호가 일치하지 않습니다</MessageErrPW>
          </Box>
        ) : (
          <></>
        )}
      </BoxPW>
      <Btn
        isClick={
          data?.isMember === false && checkedPw && checkSamePw && initIdAlert
            ? true
            : false
        }
        text={'가입 완료'}
        marginTop={77.25}
        handleClick={userType === 0 ? handleClick : handleCompanyClick}
      />
      <NameInput className="nameInput" />
      <PhoneInput className="phoneInput" />
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
const Label = styled.label`
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  font-family: 'Spoqa Han Sans Neo';
  color: ${colors.main2};
  margin-top: 49.5pt;
  @media (max-width: 899.25pt) {
    margin-top: 0;
  }
`;

const LabelPW = styled.label`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  margin-top: 0pt;
`;

const NameInput = styled.input`
  display: none;
`;
const PhoneInput = styled.input`
  display: none;
`;
const Input = styled(TextField)<{
  borderBoolean1?: boolean;
  borderBoolean2?: boolean;
}>`
  outline: none;
  .MuiOutlinedInput-notchedOutline {
    border: 0.75pt solid #e2e5ed;
  }
  .MuiOutlinedInput-root {
    /* &:hover fieldset {
      border-color: #5221cb;
    } */
    &.Mui-focused fieldset {
      ${({ borderBoolean1 }) =>
        borderBoolean1 === true &&
        css`
          border: 0.75pt solid #5221cb;
        `}
      ${({ borderBoolean2 }) =>
        borderBoolean2 === true &&
        css`
          border: 0.75pt solid #5221cb;
        `}
    }
  }
  /* .Mui-focused {
    outline: 1px solid #5221cb;
    border-style: none;
  } */
  /* border: 0.75pt solid ${colors.gray}; */
  border-radius: 6pt;
  margin-top: 9pt;
  & input {
    padding: 13.5pt 0 13.5pt 12pt;
    font-size: 12pt;
    line-height: 12pt;
    height: 11.25pt !important;
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
    &:hover fieldset {
      border-color: #e2e5ed;
    }
    &.Mui-focused fieldset {
      border: 0.75pt solid #5221cb;
    }
  }
  ::placeholder {
    color: ${colors.gray};
    font-weight: 500;
    font-family: 'Spoqa Han Sans Neo';
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

const BoxPW = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 60pt;
  width: 100%;
  position: relative;
`;

const ButtonText = styled(Typography)`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #ffffff;
`;

const MessageId = styled.p`
  color: ${colors.main};
  font-size: 10.5pt;
  line-height: 10.5pt;
  margin-top: 9pt;
  font-family: 'Spoqa Han Sans Neo';
  position: absolute;
  bottom: -20pt;
  @media (max-width: 899.25pt) {
    font-size: 9pt;
    line-height: 12pt;
  }
`;

const MessageErrId = styled.p`
  color: ${colors.sub4};
  font-size: 10.5pt;
  line-height: 10.5pt;
  margin-top: 12pt;
  font-family: 'Spoqa Han Sans Neo';
  position: absolute;
  bottom: -20pt;
  margin-top: 12pt;
  @media (max-width: 899.25pt) {
    font-size: 9pt;
    line-height: 12pt;
  }
`;
const MessageErrPW = styled.p`
  color: ${colors.sub4};
  font-size: 10.5pt;
  line-height: 10.5pt;
  margin-top: 12pt;
  font-family: 'Spoqa Han Sans Neo';
  margin-top: 12pt;
  @media (max-width: 899.25pt) {
    font-size: 9pt;
    line-height: 12pt;
  }
`;
export default CompoIdPwInput;
