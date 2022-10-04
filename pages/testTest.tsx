import SignUpContainer from 'components/SignUp';
import React from 'react';
import WebFooter from 'web-components/WebFooter';
import WebHeader from 'web-components/WebHeader';
import styled from '@emotion/styled';

type Props = {};

const TestTest = (props: Props) => {
  return (
    <>
      <Body>
        <WebHeader />
        <Inner>
          <Wrapper>
            <SignUpContainer />
          </Wrapper>
        </Inner>
        <WebFooter />
      </Body>
    </>
  );
};

export default TestTest;

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
  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    top: 0;
    left: 0%;
    transform: none;
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
  @media (max-width: 899pt) {
    height: 100%;
    margin: 0;
    padding: 0 15pt 15pt 15pt;
  }
`;
