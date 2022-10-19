import styled from '@emotion/styled';
import React, { useState } from 'react';
import colors from 'styles/colors';

type Props = {};

const SentQuoatationFirst = (props: Props) => {
  // 상단 열고 닫기
  const [open, setOpen] = useState<boolean>(false);

  // 안쓰이나 ?
  const [text, setText] = useState<string>('');

  //
  return (
    <>
      <CustomerRequestContent>고객 요청 내용</CustomerRequestContent>
    </>
  );
};

const Wrapper = styled.div``;
const CustomerRequestContent = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.02em;
  text-align: center;
  color: ${colors.main};
  margin-top: 21pt;
`;

export default SentQuoatationFirst;
