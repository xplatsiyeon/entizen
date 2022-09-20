import React from 'react';
import styled from '@emotion/styled';
import Footer from 'components/quotationRequest/Footer';
import Header from 'components/quotationRequest/Header';

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

const Wrapper = styled.div``;

const ChildrenBox = styled.div``;

export default QuotationReqeustPage;
