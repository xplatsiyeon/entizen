import styled from '@emotion/styled';
import colors from 'styles/colors';
import Btn from 'components/button';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useEffect, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import { useRouter } from 'next/router';
import Modal from 'components/Modal/Modal';
import React from 'react';
import BackImg from 'public/images/back-btn.svg';
import Image from 'next/image';
import axios from 'axios';
import { JwtTokenType } from 'pages/signin';
import jwt_decode from 'jwt-decode';
import { handleLogoutOnClickModalClick } from 'api/logout';

export interface Key {
  id: string;
  isMember: boolean;
  memberIdx: number;
  name: string;
  phone: number;
}

type Props = {
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
};

const PasswordModify = ({ setTabNumber }: Props) => {
  const [beforePasswordInput, setBeforePasswordInput] = useState<string>('');
  const [beforePwSelected, setBeforePwSelected] = useState<boolean>(false);
  const [pwInput, setPwInput] = useState<string>('');
  const [pwShow, setPwShow] = useState<boolean[]>([false, false, false]);
  const [pwShowId, setPwShowId] = useState<number>(0);
  const [pwSelected, setPwSelected] = useState<boolean>(false);
  const [checkPwSelected, setCheckPwSelected] = useState<boolean>(false);
  const [checkedPw, setCheckedPw] = useState<boolean>(false);
  const [checkPw, setCheckPw] = useState<string>('');
  const [checkSamePw, setCheckSamePw] = useState<boolean>(false);
  const [btnActive, setBtnActive] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const password = useDebounce(pwInput, 500);
  const checkPassword = useDebounce(checkPw, 500);

  const key: Key = JSON.parse(sessionStorage.getItem('key')!);

  const router = useRouter();

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

  const handleShowBtn = () => {
    let id = 0;
    if (pwSelected === true) {
      id = 1;
      setPwShowId(1);
    } else if (checkPwSelected === true) {
      id = 2;
      setPwShowId(2);
    } else {
      id = 0;
      setPwShowId(0);
    }

    let temp = [...pwShow];
    temp[id] = !temp[id];
    setPwShow(temp);
  };
  const handlePassowrd = () => {
    if (pwSelected === true) {
      setPwInput('');
    } else if (checkPwSelected === true) {
      setCheckPw('');
    } else {
      setBeforePasswordInput('');
    }
  };
  // 비밀번호 변경 api
  const handleClick = () => {
    const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
    const token: JwtTokenType = jwt_decode(accessToken);
    const PASSWORD_CHANGE = `${process.env.NEXT_PUBLIC_BASE_URL}/members/password/${token.memberIdx}`;
    // const PASSWORD_CHANGE = `api/members/password/${token.memberIdx}`;

    axios({
      method: 'patch',
      url: PASSWORD_CHANGE,
      data: {
        oldPassword: beforePasswordInput,
        newPassword: password,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
      withCredentials: true,
    })
      .then((res) => {
        setOpenModal(true);
      })
      .catch((err) => {
        // console.log('===============err==================');
        // console.log(err);
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
      });
  };
  const handleModalYes = () => {
    const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
    sessionStorage.removeItem('key');
    handleLogoutOnClickModalClick(userAgent);
    setOpenModal(false);
    router.push('/signin');
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
      if (password !== checkPassword) {
        setCheckSamePw(false);
      } else {
        setCheckSamePw(true);
      }
    }
    // console.log(password, checkPassword);
  }, [password, checkPassword, checkSamePw]);

  const iconAdorment = {
    endAdornment: (
      <InputAdornment position="start">
        <CloseWrap
          onMouseDown={handleMouseDownPassword}
          onClick={handlePassowrd}
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
          onClick={handleShowBtn}
          onMouseDown={handleMouseDownPassword}
        >
          {pwShow[pwShowId] ? '미표시' : '표시'}
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
        <Inner>
          <Wrapper>
            {openModal && (
              <Modal
                text={'비밀번호 변경이 완료되었습니다.\n다시 로그인 해주세요.'}
                click={handleModalYes}
              />
            )}
            <Wrap>
              <WebHidden>
                <Header>
                  <div className="img-item" onClick={() => setTabNumber(2)}>
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
                  <span className="text">비밀번호 변경</span>
                </Header>
              </WebHidden>
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
            <BtnBox>
              <Btn
                isClick={
                  checkPw.length > 7 &&
                  pwInput.length > 7 &&
                  pwInput === checkPw
                    ? true
                    : false
                }
                handleClick={handleClick}
                marginTop="33.75"
                text={'수정 완료'}
              />
            </BtnBox>
          </Wrapper>
        </Inner>
      </WebBody>
    </React.Fragment>
  );
};

export default PasswordModify;

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
    height: 100%;
  }

  @media (min-width: 900pt) {
    height: auto;
  }
  @media (max-width: 899.25pt) {
    width: 100vw;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  background: #ffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;
  width: 580.5pt;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    box-shadow: none;
    border-radius: 0;
    margin: 0;
    padding: 0;
    border-radius: 0;
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
    padding: 0 15pt 15pt 15pt;
    margin: 0;
  }
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
const BtnBox = styled.div`
  width: 100%;
  margin-top: 229pt;
  @media (max-width: 899.25pt) {
    position: relative;
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
