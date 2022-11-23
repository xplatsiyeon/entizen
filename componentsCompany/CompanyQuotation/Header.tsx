import styled from '@emotion/styled';
import React from 'react';

type Props = {};

const Header = (props: Props) => {
  return <HeadWrapper>견적</HeadWrapper>;
};

const HeadWrapper = styled.div`
  padding-top: 9pt;
  padding-bottom: 9pt;
  margin: 0 auto;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 700;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: center;
`;
export default Header;
