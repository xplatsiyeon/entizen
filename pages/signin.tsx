import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Divider,
} from '@mui/material';
import Link from 'next/link';
import styled from '@emotion/styled';
import WebHeader from 'web-components/WebHeader';
import WebFooter from 'web-components/WebFooter';
type Props = {};

const Signin = (props: Props) => {
  const [password, setPassword] = useState<string>('');

  const [selectedLoginType, setSelectedLoginType] = useState<number>(0);
  const loginTypeList: string[] = ['일반회원 로그인', '기업회원 로그인'];
  return (
    <React.Fragment>
      <Body>
        <WebHeader />
        <Inner>
          <Wrapper>
            <Container
              disableGutters
              sx={{
                width: '100%',
                height: '609pt',
                overflow: 'scroll !important',
              }}
            >
              <BackBox>
                <BackBtn src="/images/back-btn.svg" />
              </BackBox>
              <Container
                disableGutters
                sx={{
                  width: '100%',
                  paddingLeft: '9pt',
                  paddingRight: '9pt',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '6pt',
                  }}
                >
                  {loginTypeList.map((loginType, index) => (
                    <Box key={index} sx={{ marginRight: '24pt' }}>
                      <Typography
                        variant="h6"
                        key={index}
                        onClick={() => {
                          setSelectedLoginType(index);
                        }}
                        sx={{
                          fontWeight: '700',
                          fontSize: '12pt',
                          lineHeight: '15pt',
                          padding: '6pt',
                          letterSpacing: '-0.02em',
                          color:
                            selectedLoginType == index ? '#5A2DC9' : '#CACCD1',
                        }}
                      >
                        {loginType}
                      </Typography>
                      <Box
                        sx={{
                          width: '3pt',
                          height: '3pt',
                          background:
                            selectedLoginType == index ? '#5A2DC9' : '#fff',
                          margin: '6pt auto 0 auto',
                          borderRadius: '100%',
                        }}
                      ></Box>
                    </Box>
                  ))}
                </Box>
              </Container>
              <Container
                disableGutters
                sx={{
                  width: '100%',
                  marginTop: '42pt',
                  padding: '0 25pt',
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <TextField
                    id="outlined-basic"
                    placeholder="아이디 입력"
                    sx={{
                      width: '100%',
                      fontWeight: '400',
                      border: '1px solid #E2E5ED',
                      fontSize: '12pt',
                      lineHeight: '12pt',
                      borderRadius: '6pt',
                    }}
                  />
                  <TextField
                    value={password}
                    id="outlined-basic"
                    placeholder="비밀번호 입력"
                    type="password"
                    onBlur={(e) => {
                      //유효성 검사
                    }}
                    onChange={(e) => {
                      //비밀번호 입력값 변경
                      setPassword(e.target.value);
                    }}
                    sx={{
                      width: '100%',
                      marginTop: '9pt',
                      border: '1px solid #E2E5ED',
                      borderRadius: '6pt',
                    }}
                  />
                </Box>
                <LoginBtn>
                  <BtnSpan>로그인</BtnSpan>
                </LoginBtn>
                <Box
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  <Link href={`/findAccount`}>
                    <Typography
                      sx={{
                        textAlign: 'center',
                        textDecorationLine: 'underline',
                        marginTop: '22.5pt',
                        color: '#747780',
                      }}
                    >
                      아이디 / 비밀번호 찾기
                    </Typography>
                  </Link>
                </Box>
                <Box
                  sx={{
                    width: 'calc(100% - 37.5pt)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '102pt auto 0',
                  }}
                >
                  <Box sx={{ height: '33pt', marginRight: '15pt' }}>
                    <img src="/images/kakao.svg"></img>
                  </Box>
                  <Box sx={{ height: '33pt', marginRight: '15pt' }}>
                    <img src="/images/apple.svg"></img>
                  </Box>
                  <Box sx={{ height: '33pt', marginRight: '15pt' }}>
                    <img src="/images/naver.svg"></img>
                  </Box>
                  <Box sx={{ height: '33pt' }}>
                    <img src="/images/google.svg"></img>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '18pt 24.75pt 0 24.75pt',
                  }}
                >
                  <Divider
                    sx={{
                      background: '#CACCD1',
                      width: '35%',
                      height: '0.75pt',
                    }}
                  ></Divider>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 400,
                      fontSize: '10.5pt',
                      lineHeight: '12pt',
                      textAlign: 'center',
                      letterSpacing: '-0.02em',
                      color: '#CACCD1',
                    }}
                  >
                    또는
                  </Typography>
                  <Divider
                    sx={{
                      background: '#CACCD1',
                      width: '35%',
                      height: '0.75pt',
                    }}
                  ></Divider>
                </Box>
                <Box
                  sx={{
                    margin: '18pt 18pt 0 18pt',
                  }}
                >
                  <IdRegist>
                    <IdRegistBtnSpan>아이디로 가입하기</IdRegistBtnSpan>
                  </IdRegist>
                </Box>
              </Container>
            </Container>
          </Wrapper>
        </Inner>
        <WebFooter />
      </Body>
    </React.Fragment>
  );
};

{
  /* 덜 된 부분: 글자크기, 간격 */
}

export default Signin;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  //height: 810pt;
  //background:#fcfcfc;

  @media (max-width: 1439pt) {
    width: 100%;
  }
  @media (max-height: 800pt) {
    display: block;
  }
`;
const Inner = styled.div`
  position: relative;
  width: 100%;
`;

const Text = styled.p`
  // h2?
  margin-top: 66pt;
  text-align: center;
  position: relative;
  font-size: 21pt;
  font-weight: 700;
  line-height: 21pt;
  color: #222;

  @media (max-width: 899pt) {
    display: none;
  }
`;
const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  //width:345pt;
  width: 281.25pt;
  height: 500.25pt;
  overflow-y: scroll;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;

  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    top: 0;
    left: 0%;
    transform: none;
  }
  @media (max-height: 809pt) {
    display: block;
    position: relative;
    top: 0;
    left: 0;
    transform: none;
    margin: 0 auto;
  }
`;

const BackBtn = styled.img`
  margin: auto 0;
`;

const LoginBtn = styled.button`
  background: #5a2dc9;
  width: 100%;
  color: #fff;
  margin-top: 28.5pt;
  padding: 15pt 0;
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
`;

const BtnSpan = styled.span``;

/* background-color: '{`${colors.gold}`}', */
const IdRegist = styled.button`
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 8px;
  width: 100%;
  padding: 15pt 0;
  font-weight: 700;
  font-size: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: #595757;
`;

const IdRegistBtnSpan = styled.span``;

const BackBox = styled(Box)`
  display: none;

  @media (max-width: 899pt) {
    display: block;
    width: 100%;
    padding-top: 9pt;
    padding-bottom: 9pt;
    padding-left: 15pt;
    padding-right: 15pt;
  }
`;
const TabBox = styled(Box)`
  width: 100%;
  display: flex;
  alignitems: center;
  background: #f9f7ff;

  @media (max-width: 899pt) {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 6pt;
  }
`;
// const Tab = styled(Box)`
//   width:50%;
//   padding-top:18pt;
//   padding-bottom:8pt;
//   background: selectedLoginType == index? '#ffff' : '#f9f7ff';
//   border-radius: '8pt 8pt 0 0';

//   @media (max-width:899pt) {
//     width:auto;
//     padding-top:0;
//     padding-bottom:0;
//     background:#ffff;
//     border-radius:0;
//     margin-right:24pt;
//   }
// `
