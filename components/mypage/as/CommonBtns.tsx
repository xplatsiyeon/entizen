import styled from '@emotion/styled';
import React from 'react';

type Props = {
  text: string;
  backgroundColor: string;
};

const CommonBtns = (props: Props) => {
  const { text, backgroundColor } = props;
  return (
    <StatusBtn backgroundColor={backgroundColor}>
      <p>{text}</p>
    </StatusBtn>
  );
};

const StatusBtn = styled.span<{ backgroundColor: string }>`
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
  & p {
    position: relative;
    background-color: ${({ backgroundColor }) => backgroundColor};
    /* padding: 4.5pt 7.5pt; */
    padding: 6pt 9pt;
    border-radius: 12pt;
    font-size: 9pt;
    font-weight: 500;
    line-height: 9pt;
    letter-spacing: -0.02em;
    top: 1pt;
    color: #ffffff !important;
    font-family: 'Spoqa Han Sans Neo';
  }
`;

export default CommonBtns;
