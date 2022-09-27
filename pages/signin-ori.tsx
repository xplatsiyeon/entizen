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
import colors from 'styles/colors';
type Props = {};

const Signin = (props: Props) => {
  const [password, setPassword] = useState<string>('');
  const [selectedLoginType, setSelectedLoginType] = useState<number>(0);
  const loginTypeList: string[] = ['일반회원 로그인', '기업회원 로그인'];
  return (
    <React.Fragment>
      <Container
        disableGutters
        sx={{ width: '100%', height: '609pt', overflow: 'scroll !important' }}
      >
        <Container
          disableGutters
          sx={{
            width: '100%',
            paddingTop: '9pt',
            paddingBottom: '9pt',
            paddingLeft: '15pt',
            paddingRight: '15pt',
          }}
        >
          <BackBtn src="/images/back-btn.svg" />
        </Container>
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
                    color: selectedLoginType == index ? '#5A2DC9' : '#CACCD1',
                  }}
                >
                  {loginType}
                </Typography>
                <Box
                  sx={{
                    width: '3pt',
                    height: '3pt',
                    background: selectedLoginType == index ? '#5A2DC9' : '#fff',
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
            paddingLeft: '15pt',
            paddingRight: '15pt',
            marginTop: '42pt',
          }}
        >
          <Box>
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
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '102pt 37.5pt 0 37.5pt',
            }}
          >
            <Box sx={{ height: '33pt' }}>
              <img src="/images/kakao.svg"></img>
            </Box>
            <Box sx={{ height: '33pt' }}>
              <img src="/images/apple.svg"></img>
            </Box>
            <Box sx={{ height: '33pt' }}>
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
    </React.Fragment>
  );
};

export default Signin;

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
