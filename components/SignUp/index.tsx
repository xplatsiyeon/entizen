import styled from '@emotion/styled';
import React, { useState } from 'react';
import MypageHeader from './header';
import TermContent from './TermContent';

type Props = {};

const SignUpContainer = (props: Props) => {
  const [level, setLevel] = useState<number>(0);
  return (
    <>
      {level === 0 && (
        <>
          <MypageHeader back={true} homeBtn={true} title={''} exitBtn={true} />
          <Wrapper>
            <TermContent setLevel={setLevel} level={level} />
          </Wrapper>
        </>
      )}
    </>
  );
};

const Wrapper = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
`;

export default SignUpContainer;
