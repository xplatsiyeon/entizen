import React from 'react';
import styled from '@emotion/styled';
import Footer from 'components/quotation/request/Footer';
import Header from 'components/quotation/request/Header';

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
