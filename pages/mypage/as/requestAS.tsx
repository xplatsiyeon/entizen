import AsRequestWrite from 'components/mypage/as/AsRequestWrite';
import React from 'react';
import styled from '@emotion/styled';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import { useRouter } from 'next/router';

type Props = {};

// AS 요청
const AsRequest = (props: Props) => {
  const router = useRouter();
  const query = router.query.afterSalesServiceIdx;
  return (
    <React.Fragment>
      <Body className="target">
        <WebHeader />
        <Inner>
          <Wrapper>
            <AsRequestWrite rewrite={Boolean(query)} />
          </Wrapper>
        </Inner>
        <WebFooter />
      </Body>
    </React.Fragment>
  );
};

export default AsRequest;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fcfcfc;
  @media (max-height: 400pt) {
    display: block;
  }
`;
const Inner = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  width: 345pt;
  background: #ffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;
  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 0;
    margin: 0;
    padding: 0;
  }
`;
const Wrapper = styled.div`
  position: relative;
  margin: 0 46.5pt;
  @media (max-width: 899.25pt) {
    margin: 0;
    height: 100%;
  }
`;
