import styled from '@emotion/styled';
import colors from '../../styles/colors';
import { Box, Button } from '@mui/material';
import Header from 'components/header';
import React from 'react';
import WebFooter from 'web-components/WebFooter';
import WebHeader from 'web-components/WebHeader';

const findingId2 = () => {
  return (
    <React.Fragment>
      <Body>
        <WebHeader />
          <Inner>
            <Wrapper>
      <Header />
      <Inform>
        <div>
          고객님의 정보와
          <br />
          일치하는 아이디입니다
        </div>
      </Inform>
      <UserId>sayoon0511</UserId>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          sx={{
            fontWeight: '700',
            margin: '60pt 15pt 0 15pt',
            width: '100%',
            height: '42pt',
            padding: '15pt 0',
            fontSize: '12pt',
            borderRadius: '6pt',
            alignItems: 'center',
            background: '#5a2dc9',
            color: 'white',
          }}
        >
          로그인
        </Button>
      </Box>

      <Password>
        <Box
          sx={{
            fontSize: '10.5pt',
            fontWeight: '400',
            lineHeight: '12pt',
            cursor: 'pointer',
            paddingBottom: '1.5pt',
            letterSpacing: '-0.02em',
            textDecorationLine: 'underline',
            textUnderlinePosition: 'under',
            color: '#747780',
          }}
        >
          비밀번호 찾기
        </Box>
      </Password>
            </Wrapper>
        </Inner>  
      <WebFooter />
    </Body>
  </React.Fragment>
  );
};

export default findingId2;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  //height: 810pt;
  background:#fcfcfc;

  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 0 auto;
  width: 345pt;
  //width: 281.25pt;  
  background:#ffff;
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
`;

const Wrapper = styled.div`
  position:relative;  
  margin: 32.25pt 31.875pt 42pt;

  @media (max-width: 899pt) {
    height: 100%;
  }
`;

const Inform = styled.div`
  margin-top: 12pt;
  margin-left: 15pt;
  & > div {
    font-size: 18pt;
    font-weight: 700;
    line-height: 24pt;
    color: ${colors.main2};
  }
`;
const UserId = styled.div`
  margin-top: 54pt;
  text-align: center;
  font-weight: 700;
  color: ${colors.main};
`;
const Password = styled.div`
  margin-top: 26.25pt;
  padding: 3.75pt 0;
  text-align: center;
`;
