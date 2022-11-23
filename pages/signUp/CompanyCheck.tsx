import React from 'react';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import Btn from 'components/button';
import Header from 'components/header';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';

const SignUpCheck = () => {
  return (
    <React.Fragment>
      <Body>
        <WebHeader />
        <Inner>
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
                marginTop: '18pt',
                width: '100%',
                position: 'relative',
              }}
            >
              <Label>아이디</Label>
              <Input placeholder="아이디 입력" />
              <OverlapBtn>중복 확인</OverlapBtn>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: '22.5pt',
                width: '100%',
              }}
            >
              <Label>비밀번호</Label>
              <Input placeholder="비밀번호 입력" />
              <Input placeholder="비밀번호 재입력" />
            </Box>
            <Btn text="가입 승인 받기" marginTop="111" />
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
    padding: 0;
    box-shadow: none;
    background: none;
    margin: 0;
  }
  @media (max-height: 500pt) {
    height: 100%;
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0 31.875pt;
  @media (max-width: 899.25pt) {
    margin: 0;
    padding: 0 15pt 15pt 15pt;
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
const Input = styled.input`
  border: 0.75pt solid ${colors.gray};
  border-radius: 6pt;
  margin-top: 9pt;
  padding: 13.5pt 0;
  padding-left: 12pt;
  ::placeholder {
    color: ${colors.gray};
    font-weight: 500;
  }
`;
const OverlapBtn = styled.button`
  position: absolute;
  right: 8pt;
  top: 28.5pt;
  background: #e2e5ed;
  color: #ffffff;
  border-radius: 6pt;
  padding: 7.5pt 9pt;
  font-size: 10.5pt;
  font-weight: 500;
  line-height: 12pt;
`;
