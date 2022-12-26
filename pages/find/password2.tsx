import styled from '@emotion/styled';
import colors from 'styles/colors';
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
  const [modalText, setModalText] = useState<string>('');
  const password = useDebounce(pwInput, 500);
  const checkPassword = useDebounce(checkPw, 500);

  const router = useRouter();

  useEffect(() => {
    if (password) {
      let check1 =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,20}$/.test(
          password,
        );
      console.log(check1);
      setCheckedPw(check1);
    }
    if (checkPassword) {
      if (password !== checkPassword) setCheckSamePw(false);
      else setCheckSamePw(true);
    }
    console.log(password, checkPassword);
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

    if (pwInput.length > 9 && checkPw === pwInput) {
      setBtnActive(!btnActive);
    }
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
  };

  const onClickButton = async () => {
    console.log('비밀번호 함수 실행');
    const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
    let key = sessionStorage.getItem('key');
    let data = JSON.parse(key!);
    const PROFILE_API = `https://test-api.entizen.kr/api/members/reset/password/${data.memberIdx}`;
    try {
      console.log('이름 =>   ' + data.name);
      console.log('번호 =>   ' + data.phone);

      await axios({
        method: 'patch',
        url: PROFILE_API,
        // params: { memberIdx: data.memberIdx },
        data: {
          password: pwInput,
        },
        headers: {
          ContentType: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }).then((res) => {
        console.log(res);
        setModalText('비밀번호 변경이 완료되었습니다.\n다시 로그인 해주세요.');
        setOpenModal(true);
        console.log(modalText);
      });
    } catch (error: any) {
      console.log('post 실패!!!!!!');
      console.log(error);
      setModalText(error.response.data.message);
      setOpenModal(true);
      console.log(modalText);
    }
  };

  useEffect(() => {
    console.log('여기요!~!');
    console.log(modalText);
    console.log(openModal);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalText, setModalText]);
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

  const handleClick = () => {
    console.log('test');
    setOpenModal(true);
  };
  const handleModalYes = () => {
    setOpenModal(false);
    if (modalText.includes('완료') || modalText.includes('회원가입')) {
      router.push('/signin');
    } else {
      setOpenModal(false);
    }
  };
  const beforeAdornment = beforePwSelected ? iconAdorment : {};
  const iconAdornment = pwSelected ? iconAdorment : {};
  const secondIconAdornment = checkPwSelected ? iconAdorment : {};

  useEffect(() => {
    let key = sessionStorage.getItem('key');
    let data = JSON.parse(key!);
    if (data.snsType) {
      setModalText(`${data.snsType}으로 회원가입 하셨습니다.`);
      setOpenModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <WebBody>
        <WebHeader />
        <Inner>
          <Wrapper>
            {openModal && <Modal text={modalText} click={handleModalYes} />}
            <MypageHeader back={true} title={'비밀번호 변경'} />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: '27pt',
                width: '100%',
              }}
            >
              <NewPassword>새 비밀번호를 설정해주세요</NewPassword>
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
            <BtnBox>
              <Btn onClick={onClickButton}>확인</Btn>
            </BtnBox>
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
    /* padding: 0 15pt 15pt 15pt; */
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
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 35pt;
  width: 100%;
  padding: 0 15pt;
`;
const Btn = styled.button`
  background: ${colors.main};
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
