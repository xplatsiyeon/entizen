import styled from '@emotion/styled';
import colors from 'styles/colors';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useEffect, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import { useRouter } from 'next/router';
import Modal from 'components/Modal/Modal';
import React from 'react';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import axios from 'axios';
import PassowrdStep1 from 'components/Find/PassowrdStep1';
import backIcon from 'public/images/backIcon.svg';
import Image from 'next/image';
import instance from 'api/interceptor/service';

const FindPassword = () => {
  const router = useRouter();
  const key = JSON.parse(sessionStorage.getItem('key')!);

  const [step, setStep] = useState(0);
  const [beforePasswordInput, setBeforePasswordInput] = useState<string>('');
  const [pwInput, setPwInput] = useState<string>('');
  // const [pwShow, setPwShow] = useState<boolean>(false);
  const [pwSelected, setPwSelected] = useState<boolean>(false);
  const [checkPwSelected, setCheckPwSelected] = useState<boolean>(false);
  const [checkedPw, setCheckedPw] = useState<boolean>(false);
  const [checkPw, setCheckPw] = useState<string>('');
  const [checkSamePw, setCheckSamePw] = useState<boolean>(false);
  const [btnActive, setBtnActive] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>('');
  const password = useDebounce(pwInput, 500);
  const checkPassword = useDebounce(checkPw, 500);

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
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
  };

  const onClickButton = async () => {
    // console.log('비밀번호 함수 실행');
    const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
    let key = sessionStorage.getItem('key');
    let data = JSON.parse(key!);
    const PROFILE_API = `${process.env.NEXT_PUBLIC_BASE_URL}/members/reset/password/${data.memberIdx}`;
    try {
      // console.log('이름 =>   ' + data.name);
      // console.log('번호 =>   ' + data.phone);
      await instance({
        method: 'patch',
        url: `/members/reset/password/${data.memberIdx}`,
        data: {
          password: pwInput,
        },
        // headers: {
        //   ContentType: 'application/json',
        //   Authorization: `Bearer ${accessToken}`,
        // },
        // withCredentials: true,
      }).then((res) => {
        // console.log(res);
        setModalText('비밀번호 변경이 완료되었습니다.\n다시 로그인 해주세요.');
        setOpenModal(true);
        // console.log(modalText);
      });
    } catch (error: any) {
      // console.log('post 실패!!!!!!');
      // console.log(error);
      setModalText(error.response.data.message);
      setOpenModal(true);
      // console.log(modalText);
    }
  };

  // const iconAdorment = {
  //   endAdornment: (
  //     <InputAdornment position="start">
  //       <Typography
  //         onClick={() => setPwInput('')}
  //         onMouseDown={handleMouseDownPassword}
  //         sx={{
  //           cursor: 'pointer',
  //           display: 'flex',
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //         }}
  //       >
  //         <CancelRoundedIcon
  //           sx={{
  //             color: '#E2E5ED',
  //             width: '10.5pt',
  //             marginRight: '9pt',
  //             cursor: 'pointer',
  //           }}
  //         />
  //       </Typography>
  //       <Typography
  //         sx={{
  //           fontSize: '14px',
  //           fontWeight: '400',
  //           lineHeight: '16px',
  //           letterSpacing: '-0.02em',
  //           textAlign: 'left',
  //           color: `${colors.main}`,
  //           cursor: 'pointer',
  //         }}
  //         variant="subtitle1"
  //         onClick={() => setPwShow(!pwShow)}
  //         onMouseDown={handleMouseDownPassword}
  //       >
  //         {pwShow ? '미표시' : '표시'}
  //       </Typography>
  //     </InputAdornment>
  //     // <InputAdornment position="start">
  //     //   <CancelRoundedIcon
  //     //     sx={{
  //     //       color: '#E2E5ED',
  //     //       width: '10.5pt',
  //     //       marginRight: '9pt',
  //     //       cursor: 'pointer',
  //     //     }}
  //     //   />
  //     //   <Typography
  //     //     sx={{
  //     //       fontSize: '14px',
  //     //       fontWeight: '400',
  //     //       lineHeight: '16px',
  //     //       letterSpacing: '-0.02em',
  //     //       textAlign: 'left',
  //     //       color: `${colors.main}`,
  //     //       cursor: 'pointer',
  //     //     }}
  //     //     variant="subtitle1"
  //     //     onClick={() => setPwShow(!pwShow)}
  //     //     onMouseDown={handleMouseDownPassword}
  //     //   >
  //     //     {pwShow ? '미표시' : '표시'}
  //     //   </Typography>
  //     // </InputAdornment>
  //   ),
  // };
  // 패스워드 보여주기 true false
  const [pwShow, setPwShow] = useState<boolean[]>([false, false, false]);
  const handleShowBtn = (id: number) => {
    let temp = [...pwShow];
    temp[id] = !temp[id];
    setPwShow(temp);
  };

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
  const handleModalYes = () => {
    setOpenModal(false);
    if (modalText.includes('완료') || modalText.includes('회원가입')) {
      router.push('/signin');
    } else {
      setOpenModal(false);
    }
  };

  const iconAdornment = pwSelected ? iconAdorment : {};
  const secondIconAdornment = checkPwSelected ? secondIconAdorment : {};

  useEffect(() => {
    if (pwInput.length > 7 && checkPw === pwInput) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }
  }, [pwInput, checkPw]);

  useEffect(() => {
    if (password) {
      let check1 =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/.test(
          password,
        );
      // console.log(check1);
      setCheckedPw(check1);
    }
    if (checkPassword) {
      if (password !== checkPassword) setCheckSamePw(false);
      else setCheckSamePw(true);
    }
    // console.log(password, checkPassword);
  }, [password, checkPassword]);

  useEffect(() => {
    if (key) {
      setStep(1);
    }
  }, [key]);

  return (
    <React.Fragment>
      <WebBody>
        <WebHeader />
        <Inner>
          <Wrapper>
            {openModal && <Modal text={modalText} click={handleModalYes} />}
            {step === 0 ? (
              <PassowrdStep1 setStep={setStep} />
            ) : (
              <>
                <div className="container">
                  <HeadWrapper>
                    <HeaderText
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        router.push('/signin');
                      }}
                    >
                      <Image src={backIcon} alt="back" />
                      <span>비밀번호 찾기</span>
                    </HeaderText>
                  </HeadWrapper>
                  <DivWrapper>
                    <NewPassword>새 비밀번호를 설정해주세요</NewPassword>
                    <Input
                      placeholder="새 비밀번호 입력"
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
                        <Typography
                          sx={{
                            color: '#F75015',
                            fontSize: '9pt',
                            margin: '9pt 0 0',
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
                      type={pwShow[1] ? 'text' : 'password'}
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
                            margin: '9pt 0 0',
                          }}
                        >
                          비밀번호가 일치하지 않습니다
                        </Typography>
                      </Box>
                    ) : (
                      <></>
                    )}
                    <BtnBox>
                      <Btn isValid={btnActive} onClick={onClickButton}>
                        확인
                      </Btn>
                    </BtnBox>
                  </DivWrapper>
                </div>
              </>
            )}
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

const HeadWrapper = styled.div`
  display: flex;
  position: relative;
`;

const HeaderText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 18pt;
  font-weight: 700;
  line-height: 21pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #222222;

  @media (max-width: 899.25pt) {
    margin: 12.375pt 15pt;
  }
  > span {
    width: max-content;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    @media (max-width: 899.25pt) {
      display: none;
    }
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
  padding: 5.25pt 0 42pt;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0;
    padding: 0;
    box-shadow: none;
    border-radius: 0;
  }
`;
const NewPassword = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  margin-top: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  font-style: normal;
  font-weight: 700;
  font-size: 18pt;
  line-height: 27pt;
  color: #222222;
  margin-bottom: 36pt;

  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 15pt;
    font-weight: 700;
    line-height: 22.5pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #222222;
    padding-bottom: 21pt;
    margin-top: 45.75pt;
    padding-left: 0pt;
    margin-bottom: 0;
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0pt 31.875pt;
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 27pt;
    width: 100%;
  }
  @media (max-width: 899.25pt) {
    height: 100%;
    margin: 0pt;
    .container {
      margin-top: 0;
    }
  }
`;
const Input = styled(TextField)`
  border: 0.75pt solid #e2e5ed !important;
  border-radius: 6pt;
  margin: 9pt 0 0 !important;
  width: 100% !important;
  & input {
    padding: 13.5pt 0 13.5pt 12pt;
    font-size: 12pt;
    line-height: 12pt;
  }

  & .MuiInputBase-root {
    padding-right: 9pt;
  }

  ::placeholder {
    color: #caccd1;
    font-weight: 500;
  }
  & .remove {
    display: none;
  }
  :focus > .remove {
    display: block;
  }
  @media (max-width: 900pt) {
    margin-left: 15pt;
    margin-right: 15pt;
    :nth-of-type(2) {
      margin-top: 45pt;
    }
  }
`;
const BtnBox = styled.div`
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 35pt;
  width: 100%;
  padding: 0 15pt;
  @media (min-width: 900pt) {
    position: static;
    padding: 30pt 0 0 0;
  }
`;
const Btn = styled.button<{ isValid: boolean }>`
  background-color: ${({ isValid }) =>
    isValid ? colors.main : colors.lightWhite3};

  border-radius: 6pt;
  width: 100%;
  padding: 15pt 0;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  cursor: pointer;
`;

const DivWrapper = styled.div`
  margin: 0 16pt;

  @media (max-width: 899.25pt) {
    margin: 0 15pt;
  }
`;
