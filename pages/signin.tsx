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
        sx={{
          width: '100%',
          height: 'calc(0.75*48pt)',
          // paddingLeft: 'calc(0.75*12pt)',
          // paddingRight: 'calc(0.75*12pt)',
          overflow: 'scroll',
          // display: 'flex',
          // alignItems: 'center',
        }}
      >
        <BackBtn src="/images/back-btn.svg" />
      </Container>
      <Container
        sx={{
          width: '100%',
          paddingLeft: 'calc(0.75*12pt)',
          paddingRight: 'calc(0.75*12pt)',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            marginTop: 'calc(0.75*8pt)',
          }}
        >
          {loginTypeList.map((loginType, index) => (
            <Box key={index} sx={{ marginRight: 'calc(0.75*20pt)' }}>
              <Typography
                variant="h6"
                key={index}
                onClick={() => {
                  setSelectedLoginType(index);
                }}
                sx={{
                  fontWeight: '700',
                  fontSize: 'calc(0.75*16pt)',
                  lineHeight: 'calc(0.75*20pt)',
                  padding: 'calc(0.75*8pt)',
                  letterSpacing: '-0.02em',
                  color: selectedLoginType == index ? '#5A2DC9' : '#CACCD1',
                }}
              >
                {loginType}
              </Typography>
              <Box
                sx={{
                  width: '4px',
                  height: '4px',
                  background: selectedLoginType == index ? '#5A2DC9' : '#fff',
                  margin: 'calc(0.75*8pt) auto 0 auto',
                  borderRadius: '100%',
                }}
              ></Box>
            </Box>
          ))}
        </Box>
      </Container>
      <Container
        sx={{
          width: '100%',
          paddingLeft: 'calc(0.75*20pt)',
          paddingRight: 'calc(0.75*20pt)',
          marginTop: 'calc(0.75*56pt)',
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
              fontSize: 'calc(0.75*16pt)',
              lineHeight: 'calc(0.75*16pt)',
              borderRadius: '8px',
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
              marginTop: 'calc(0.75*12pt)',
              border: '1px solid #E2E5ED',
              borderRadius: '8px',
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
                marginTop: 'calc(0.75*30pt)',
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
            margin: 'calc(0.75*136pt) calc(0.75*50pt) 0 calc(0.75*50pt)',
          }}
        >
          <Box sx={{ height: 'calc(0.75*44pt)' }}>
            <img src="/images/kakao.svg"></img>
          </Box>
          <Box sx={{ height: 'calc(0.75*44pt)' }}>
            <img src="/images/apple.svg"></img>
          </Box>
          <Box sx={{ height: 'calc(0.75*44pt)' }}>
            <img src="/images/naver.svg"></img>
          </Box>
          <Box sx={{ height: 'calc(0.75*44pt)' }}>
            <img src="/images/google.svg"></img>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 'calc(0.75*24pt) calc(0.75*33pt) 0 calc(0.75*33pt)',
          }}
        >
          <Divider
            sx={{
              background: '#CACCD1',
              width: '35%',
              height: '1px',
            }}
          ></Divider>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '16px',
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
              height: '1px',
            }}
          ></Divider>
        </Box>
        <Box
          sx={{
            margin: 'calc(0.75*24pt) calc(0.75*24pt) 0 calc(0.75*24pt)',
          }}
        >
          <Button
            sx={{
              // background: '#FFFFFF',
              backgroundColor: '{`${colors.gold}`}',
              boxShadow: '0px 0px 10px rgba(137, 163, 201, 0.2)',
              borderRadius: '8px',
              width: '100%',
              padding: 'calc(0.75*20pt) calc(0.75*80pt)',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                textAlign: 'center',
                letterSpacing: '-0.02em',
                backgroundColor: "'${colors.lightDark}'",
                color: '#595757',
              }}
            >
              아이디로 가입하기
            </Typography>
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Signin;

const BackBtn = styled.img`
  /* padding: calc(0.75 * 12pt) calc(0.75 * 8pt); */
  /* height: 100%; */

  margin: auto 0;
`;

const LoginBtn = styled.button`
  background: #5a2dc9;
  width: 100%;
  color: #fff;
  margin-top: calc(0.75 * 38pt);
  padding: 15pt 0;
  border-radius: 8px;
  font-weight: 700;
  font-size: calc(0.75 * 16pt);
`;

const BtnSpan = styled.span`
  padding: calc(0.75 * 20pt) calc(0.75 * 145pt);
  /* color: ${colors.lightDark}; */
`;

const IdRegist = styled.span`
  font-size: calc(0.75 * 16pt);
  font-weight: 700;
  line-height: calc(0.75 * 16pt);
  letter-spacing: -0.02em;
  text-align: center;
`;
