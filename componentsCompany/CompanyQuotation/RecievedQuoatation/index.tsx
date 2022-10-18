import styled from '@emotion/styled';
import Btn from 'components/SignUp/button';
import MypageHeader from 'components/SignUp/header';
import { useRouter } from 'next/router';

import React from 'react';
import HeadOpenContent from './HeadOpenContent';

type Props = {};

const DdayRequest = (props: Props) => {
  return (
    <>
      <HeadOpenContent />
    </>
  );
};

// const Container = styled.div`
//   position: relative;
// `;

export default DdayRequest;
