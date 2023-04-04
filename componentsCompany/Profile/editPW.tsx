import styled from '@emotion/styled';
import colors from 'styles/colors';
import Btn from 'components/button';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useEffect, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import MypageHeader from 'components/mypage/request/header';
import { useRouter } from 'next/router';
import Modal from 'components/Modal/Modal';
import React from 'react';
import { useMutation } from 'react-query';
import { isTokenPatchApi } from 'api';
import { JwtTokenType } from 'pages/signin';
import jwt_decode from 'jwt-decode';
interface Key {
  id: string;
  isMember: boolean;
  memberIdx: number;
  name: string;
  phone: number;
}

type Props = {
  setComponent?: React.Dispatch<React.SetStateAction<number>>;
};

const EditPW = ({ setComponent }: Props) => {
  const [beforePasswordInput, setBeforePasswordInput] = useState<string>('');
  const [beforePwSelected, setBeforePwSelected] = useState<boolean>(false);
  const [pwInput, setPwInput] = useState<string>('');
  const [pwShow, setPwShow] = useState<boolean[]>([false, false, false]);
  const [pwSelected, setPwSelected] = useState<boolean>(false);
  const [checkPwSelected, setCheckPwSelected] = useState<boolean>(false);
  const [checkedPw, setCheckedPw] = useState<boolean>(false);
  const [checkPw, setCheckPw] = useState<string>('');
  const [checkSamePw, setCheckSamePw] = useState<boolean>(false);
  const [btnActive, setBtnActive] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState('');

  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const password = useDebounce(pwInput, 500);
  const checkPassword = useDebounce(checkPw, 500);

  const key: Key = JSON.parse(sessionStorage.getItem('key')!);
  const router = useRouter();
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const token: JwtTokenType = jwt_decode(accessToken);

  // 원버튼 모달

  const { mutate: passwordMutate, isLoading: passwordLoading } = useMutation(
    isTokenPatchApi,
    {
      onSuccess: () => {
        setOpenModal(true);
        setModalMessage('비밀번호 변경이 완료되었습니다.');
      },
      onError: (err: any) => {
        if (
          err?.response?.data?.message! ===
          '기존과 동일한 비밀번호로 변경할 수 없습니다.'
        ) {
          setPasswordError(true);
          setErrorMessage('기존과 동일한 비밀번호로 변경할 수 없습니다.');
          // console.log('비밀번호 확인 -->>', err?.response?.data?.message!);
        }
        if (err?.response?.data?.message! === '올바르지 않는 비밀번호입니다.') {
          setPasswordError(true);
          setErrorMessage('비밀번호가 일치하지 않습니다.');
        }
      },
    },
  );

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'pw') {
      setPwInput(e.target.value);
    }
    if (e.target.name === 'checkPw') {
      setCheckPw(e.target.value);
    }
    if (e.target.name === 'beforePw') {
      setBeforePasswordInput(e.target.value);
    }

    if (pwInput.length > 7 && checkPw === pwInput) {
      setBtnActive(!btnActive);
    }
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
  };
  // 비밀번호 변경 api
  const handleClick = () => {
    // console.log('check');
    passwordMutate({
      url: `/members/password/${token?.memberIdx}`,
      data: {
        oldPassword: beforePasswordInput,
        newPassword: password,
      },
    });
  };
  // 원버튼 모달 온클릭
  const handleModalYes = () => {
    sessionStorage.removeItem('key');
    setOpenModal(false);
    if (modalMessage === '비밀번호 변경이 완료되었습니다.') setComponent!(1);
    /*router.push('/signin'); */
  };

  const handleShowBtn = (id: number) => {
    let temp = [...pwShow];
    temp[id] = !temp[id];
    setPwShow(temp);
  };

  useEffect(() => setPasswordError(false), [beforePasswordInput]);

  useEffect(() => {
    if (password) {
      if (password) {
        let check1 =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/.test(
            password,
          );
        // console.log(check1);
        setCheckedPw(check1);
      }
    }
    if (checkPassword) {
      if (password !== checkPassword) setCheckSamePw(false);
      else setCheckSamePw(true);
    }
    // console.log(password, checkPassword);
  }, [password, checkPassword, checkSamePw]);

  const beforeIcon = {
    endAdornment: (
      <InputAdornment position="start">
        <CloseWrap
          onMouseDown={handleMouseDownPassword}
          onClick={() => setBeforePasswordInput('')}
        >
          <CancelRoundedIcon
            sx={{
              color: '#E2E5ED',
              width: '10.5pt',
              marginRight: '9pt',
              cursor: 'pointer',
            }}
          />
        </CloseWrap>
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
          onClick={() => handleShowBtn(0)}
          onMouseDown={handleMouseDownPassword}
        >
          {pwShow[0] ? '미표시' : '표시'}
        </Typography>
      </InputAdornment>
    ),
  };

  const icon = {
    endAdornment: (
      <InputAdornment position="start">
        <CloseWrap
          onMouseDown={handleMouseDownPassword}
          onClick={() => setPwInput('')}
        >
          <CancelRoundedIcon
            sx={{
              color: '#E2E5ED',
              width: '10.5pt',
              marginRight: '9pt',
              cursor: 'pointer',
            }}
          />
        </CloseWrap>
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
          onClick={() => handleShowBtn(1)}
          onMouseDown={handleMouseDownPassword}
        >
          {pwShow[1] ? '미표시' : '표시'}
        </Typography>
      </InputAdornment>
    ),
  };

  const secondIcon = {
    endAdornment: (
      <InputAdornment position="start">
        <CloseWrap
          onMouseDown={handleMouseDownPassword}
          onClick={() => setCheckPw('')}
        >
          <CancelRoundedIcon
            sx={{
              color: '#E2E5ED',
              width: '10.5pt',
              marginRight: '9pt',
              cursor: 'pointer',
            }}
          />
        </CloseWrap>
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
          onClick={() => handleShowBtn(2)}
          onMouseDown={handleMouseDownPassword}
        >
          {pwShow[2] ? '미표시' : '표시'}
        </Typography>
      </InputAdornment>
    ),
  };
  const beforeAdornment = beforePwSelected ? beforeIcon : {};
  const iconAdornment = pwSelected ? icon : {};
  const secondIconAdornment = checkPwSelected ? secondIcon : {};

  return (
    <Wrapper>
      {openModal && <Modal text={modalMessage} click={handleModalYes} />}
      <Wrap>
        <MypageHeader
          handle={setComponent ? true : undefined}
          back={true}
          title={'비밀번호 변경'}
          // handleOnClick={setComponent ? () => setComponent(1) : undefined}
          // handleBackClick={setComponent ? () => setComponent(1) : undefined}
          handleOnClick={setComponent ? () => setComponent(0) : undefined}
          handleBackClick={setComponent ? () => setComponent(0) : undefined}
        />
      </Wrap>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: '27pt',
          width: '100%',
        }}
      >
        <BeforePassword>기존 비밀번호</BeforePassword>
        <Input
          placeholder="기존 비밀번호 입력"
          onChange={handleIdChange}
          type={pwShow[0] ? 'text' : 'password'}
          value={beforePasswordInput}
          name="beforePw"
          hiddenLabel
          InputProps={beforeAdornment}
          onFocus={(e) => setBeforePwSelected(true)}
          onBlur={(e) => setBeforePwSelected(false)}
        />
        {passwordError && (
          <Box>
            <Typography
              sx={{
                color: '#F75015',
                fontSize: '9pt',
              }}
            >
              {errorMessage}
            </Typography>
          </Box>
        )}
        <NewPassword>새로운 비밀번호</NewPassword>
        <Input
          placeholder="비밀번호 입력"
          onChange={handleIdChange}
          type={pwShow[1] ? 'text' : 'password'}
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
              영문,숫자,특수문자 조합 8자 이상
            </Typography>
          </Box>
        ) : (
          <></>
        )}
        <Input
          placeholder="비밀번호 재입력"
          onChange={handleIdChange}
          type={pwShow[2] ? 'text' : 'password'}
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
        isClick={
          checkPw.length > 7 && pwInput.length > 7 && pwInput === checkPw
            ? true
            : false
        }
        handleClick={handleClick}
        marginTop="33.75"
        text={'수정 완료'}
      />
    </Wrapper>
  );
};

export default EditPW;

const Wrap = styled.div`
  margin-left: -15pt;
`;

const BeforePassword = styled.p`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 500;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
`;
const NewPassword = styled.p`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 500;
  margin-top: 30pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0pt 31.875pt;

  @media (max-width: 899.25pt) {
    height: 100%;
    margin: 0 15pt 15pt 15pt;
  }
`;

const Input = styled(TextField)`
  /* border: 0.75pt solid ${colors.gray};
  border-radius: 6pt; */
  margin-top: 9pt;
  outline: none;
  .MuiOutlinedInput-root {
    &:hover fieldset {
      border: 0.75pt solid #e2e5ed;
    }
    &.Mui-focused fieldset {
      border: 0.75pt solid #5221cb;
    }
  }
  .MuiOutlinedInput-notchedOutline {
    border: 0.75pt solid ${colors.gray};
    border-radius: 6pt;
  }
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

const CloseWrap = styled.div`
  width: 10pt;
  height: 11pt;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 5pt;
`;
