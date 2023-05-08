import SignUpContainer from 'components/SignUp';
import React from 'react';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import styled from '@emotion/styled';

type Props = {};

const Terms = (props: Props) => {
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

export default Terms;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;
  font-family: 'Spoqa Han Sans Neo';
  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  width: 345pt; //460px
  background: #ffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;

  @media (max-width: 899.25pt) {
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
  margin: 0 31.875pt; //42.5px
  @media (max-width: 899.25pt) {
    margin: 0;
  }
`;
