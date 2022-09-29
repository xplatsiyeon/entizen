import AsRequestEndReview from 'components/mypage/as/AsRequestEndReview';
import AsRequestWriteReview from 'components/mypage/as/AsRequestWriteReview';
import React from 'react';
import styled from '@emotion/styled';
import WebFooter from 'web-components/WebFooter';
import WebHeader from 'web-components/WebHeader';

type Props = {};

// 리뷰 작성

const AsReviewWrite = (props: Props) => {
  return (
    
  <React.Fragment>
  <Body>
    <WebHeader />
      <Inner>
        <Wrapper>
          <AsRequestEndReview />
        </Wrapper>
      </Inner>  
    <WebFooter />
  </Body>
  </React.Fragment>
  );
};

export default AsReviewWrite;


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
`;