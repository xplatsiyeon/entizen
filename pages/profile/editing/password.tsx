import styled from '@emotion/styled';
import Header from 'components/header';
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
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import axios from 'axios';
import instance from 'api/interceptor/service';

interface Key {
  id: string;
  isMember: boolean;
  memberIdx: number;
  name: string;
  phone: number;
}

const FindPassword = () => {
  const [beforePasswordInput, setBeforePasswordInput] = useState<string>('');
  const [beforePwSelected, setBeforePwSelected] = useState<boolean>(false);
  const [pwInput, setPwInput] = useState<string>('');
  const [pwShow, setPwShow] = useState<boolean>(false);
  const [pwSelected, setPwSelected] = useState<boolean>(false);
  const [checkPwSelected, setCheckPwSelected] = useState<boolean>(false);
  const [checkedPw, setCheckedPw] = useState<boolean>(false);
  const [checkPw, setCheckPw] = useState<string>('');
  const [checkSamePw, setCheckSamePw] = useState<boolean>(false);
  const [btnActive, setBtnActive] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const password = useDebounce(pwInput, 500);
  const checkPassword = useDebounce(checkPw, 500);

  const key: Key = JSON.parse(sessionStorage.getItem('key')!);

  const router = useRouter();

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
  }, [password, checkPassword]);

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
    const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
    // const memberIdx = JSON.parse(sessionStorage.getItem('MEMBER_IDX')!);
    const PASSWORD_CHANGE = `${process.env.NEXT_PUBLIC_BASE_URL}/members/password/${key.memberIdx}`;
    try {
      instance({
        method: 'patch',
        url: `/members/password/${key.memberIdx}`,
        data: {
          oldPassword: beforePasswordInput,
          newPassword: password,
        },
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        //   ContentType: 'application/json',
        // },
        // withCredentials: true,
      }).then((res) => {
        setOpenModal(true);
      });
    } catch (error) {
      // console.log('비밀번호 변경 실패');
      // console.log(error);
    }
  };
  const handleModalYes = () => {
    sessionStorage.removeItem('key');
    setOpenModal(false);
    router.push('/signin');
  };
  const iconAdorment = {
    endAdornment: (
      <InputAdornment position="start">
        <CancelRoundedIcon
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
            cursor: 'pointer',
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
  const beforeAdornment = beforePwSelected ? iconAdorment : {};
  const iconAdornment = pwSelected ? iconAdorment : {};
  const secondIconAdornment = checkPwSelected ? iconAdorment : {};

  return (
    <React.Fragment>
      <WebBody>
        <WebHeader />
        <Inner>
          <Wrapper>
            {openModal && (
              <Modal
                text={'비밀번호 변경이 완료되었습니다.\n다시 로그인 해주세요.'}
                click={handleModalYes}
              />
            )}
            <Wrap>
              <MypageHeader back={true} title={'비밀번호 변경'} />
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
                type={pwShow ? 'text' : 'password'}
                value={beforePasswordInput}
                name="beforePw"
                hiddenLabel
                InputProps={beforeAdornment}
                onFocus={(e) => setBeforePwSelected(true)}
                onBlur={(e) => setBeforePwSelected(false)}
              />

              <NewPassword>새로운 비밀번호</NewPassword>
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
                    영문, 숫자, 특수문자 조합 8자 이상 입력해 주세요
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
                    비밀번호가 일치하지 않습니다
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
        </Inner>
        <WebFooter />
      </WebBody>
    </React.Fragment>
  );
};

export default FindPassword;

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  //height: 810pt;
  background: #fcfcfc;

  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  width: 345pt;
  //width: 281.25pt;
  background: #ffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0;
    padding: 0;
  }
`;

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
const Text = styled.p`
  margin-top: 6pt;
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  color: ${colors.main2};
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

// const InputBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: start;
//   margin-top: 45pt;
// `;
