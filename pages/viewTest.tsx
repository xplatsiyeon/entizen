import styled from '@emotion/styled';
import React from 'react';

type Props = {};

const viewTest = (props: Props) => {
  return (
    <Wrapper>
      <span>로고</span>
      <Div>
        <span>메뉴</span>
        <span>메뉴</span>
        <span>메뉴</span>
      </Div>
    </Wrapper>
  );
};

export default viewTest;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & > span {
    border-right: 1px solid black;
    padding-right: 5px;
    margin-right: 5px;
  }
`;
const Div = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  width: 100%;
  & > span {
    flex: auto;
    border: 1px solid black;
    padding: 10px;
  }
`;
