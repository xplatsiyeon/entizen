import styled from '@emotion/styled';
import Footer from 'components/quotation/request/Footer';
import Header from 'components/quotation/request/Header';
import React from 'react';

type Props = {};

const QuotationReqeustPage = (props: { children?: JSX.Element }) => {
  return (
    <>
      <Wrapper>
        <Header />
        <ChildrenBox>{props.children}</ChildrenBox>
        <Footer />
      </Wrapper>
    </>
  );
};

const quotationRequest = (props: { children?: JSX.Element }) => {
  return (
    <>
      <QuotationReqeustPage>
        <div>아아아아아</div>
      </QuotationReqeustPage>
    </>
  );
};

const Wrapper = styled.div``;

const ChildrenBox = styled.div``;

export default quotationRequest;
