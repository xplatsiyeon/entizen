import AsRequest from 'components/mypage/as/AsRequest';
import AsRequestFooter from 'components/mypage/as/AsRequestFooter';
import AsRequestPartner from 'components/mypage/as/AsRequestPartner';
import AsRequestReviewBtn from 'components/mypage/as/AsRequestReviewBtn';
import React from 'react';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import RequestMain from 'components/mypage/request/requestMain';
import styled from '@emotion/styled';

type Props = {};

// 리뷰 작성하기

const AsGoReviewPage = (props: Props) => {
  return (
    <Body>
      <WebHeader />
      <Inner>
        <FlexBox>
          <Wrap1>
            <RequestMain page={2} />
          </Wrap1>
          <Wrap2>
            <AsRequest />
            <AsRequestPartner />
            <AsRequestFooter />
            <AsRequestReviewBtn />
          </Wrap2>
        </FlexBox>
      </Inner>
      <WebFooter />
    </Body>
  );
};

export default AsGoReviewPage;

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
  width: 900pt;
  //width: 281.25pt;

  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0 auto;
  }
`;

const FlexBox = styled.div`
  display: flex;
  position: relative;
`;

const Wrap1 = styled.div`
  width: 255pt;
  border: 1px solid #e9eaee;
  border-radius: 6pt;
  height: 100%;

  @media (max-width: 899pt) {
    display: none;
  }
`;
const Wrap2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 60pt;

  @media (max-width: 899pt) {
    padding-left: 0pt;
  }
`;
