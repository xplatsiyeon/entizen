import styled from '@emotion/styled';
import MypageHeader from 'components/mypage/request/header';
import React from 'react';

type Props = {
  exit: () => void;
  // successText: string;
  // date: string;
};

const PrepareModal = ({ exit }: Props) => {
  const handleOnClick = () => {};
  return (
    <Wrapper>
      <MypageHeader
        title={'진행 프로젝트'}
        exitBtn={true}
        handleOnClick={exit}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 1000;
`;

export default PrepareModal;
