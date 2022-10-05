import React, { useEffect } from 'react';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import Btn from 'components/button';
import { useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import Modal from 'components/Modal/Modal';
import TwoBtnModal from 'components/Modal/TwoBtnModal';
import { useRouter } from 'next/router';
import Header from 'components/header';
import WebFooter from 'web-components/WebFooter';
import WebHeader from 'web-components/WebHeader';
import axios from 'axios';

interface State {
  pwInput: string;
  showPassword: boolean;
}

const SignUpCheck = () => {
  const route = useRouter();
  // id pw pw확인 상태
  const [idInput, setIdInput] = useState<string>('');
  const [pwInput, setPwInput] = useState<string>('');
  const [checkPw, setCheckPw] = useState<string>('');

  // 아이디 중복 체크
  const [checkId, setCheckId] = useState<number>(-1);
  // 패스워드 보여주기 true false
  const [pwShow, setPwShow] = useState<boolean>(false);

  const [pwSelected, setPwSelected] = useState<boolean>(false);
  const [checkPwSelected, setCheckPwSelected] = useState<boolean>(false);
  const [checkedPw, setCheckedPw] = useState<boolean>(false);
  const [checkSamePw, setCheckSamePw] = useState<boolean>(false);

  // 모달 on / off
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
    // console.log(password, checkPassword);
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
  // 모달 핸들러
  const leftBtnControl = () => {
    if (setModalOpen) setModalOpen(!modalOpen);
  };
  const rightBtnControl = () => route.push('/');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // setModalOpen(!modalOpen);
    route.push('/signUp/Complete');
  };
  // 아이디 중복 체크
  const overlabCheck = () => {
    const OVERLAB_CHECK_POST = `https://test-api.entizen.kr/api/members?id=${idInput}&memberType=USER`;
    try {
      axios({
        method: 'get',
        url: OVERLAB_CHECK_POST,
      }).then((res) => {
        const check = res.data.isMember;
        if (check === true) {
          setCheckId(1);
        } else {
          setCheckId(0);
        }
      });
    } catch (error) {
      console.log('아이디 중복 체크 에러 발생!!');
      console.log(error);
    }
  };

  // 인풋 안의 x , 표시
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
  return (
    <React.Fragment>
      <Body>
        <WebHeader />
        <Inner>
          {modalOpen ? (
            <TwoBtnModal
              text={'로그아웃하시겠습니까?'}
              rightBtnText={'예'}
              leftBtnText={'아니오'}
              rightBtnColor={'#222222'}
              leftBtnColor={'#FF1B2D'}
              leftBtnControl={leftBtnControl}
              rightBtnControl={rightBtnControl}
            />
          ) : (
            <></>
          )}
          <Wrapper>
            <Header isHome={true} />
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
                      <OverlapBtn className="overlap" onClick={overlabCheck}>
                        <Typography className="checkOverlap">
                          중복확인
                        </Typography>
                      </OverlapBtn>
                    </InputAdornment>
                  ),
                }}
              />
              <Box>
                {checkId === 1 && (
                  <Typography
                    sx={{
                      color: '#F75015',
                      fontSize: '9pt',
                      lineHeight: '12pt',
                      marginTop: '9pt',
                    }}
                  >
                    이미 사용중인 아이디입니다.
                  </Typography>
                )}
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
              isClick={
                checkId === 0 && checkedPw && checkSamePw && idInput.length > 6
                  ? true
                  : false
              }
              text="가입 완료"
              marginTop="30"
              handleClick={handleClick}
            />
          </Wrapper>
        </Inner>
        <WebFooter />
      </Body>
    </React.Fragment>
  );
};

export default SignUpCheck;

const Body = styled.div`
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
  margin: 45.75pt auto 0;
  width: 345pt;
  //width: 281.25pt;
  background: #ffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;

  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    padding: 0;
    margin: 0 auto;
    box-shadow: none;
    background: none;
  }
  @media (max-height: 500pt) {
    height: 100%;
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0 31.875pt;

  @media (max-width: 899pt) {
    height: 100%;
    margin: 0;
    padding: 0 15pt;
  }
`;
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
