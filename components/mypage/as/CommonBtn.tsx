import styled from '@emotion/styled';
import React from 'react';

type Props = {
  text: string;
  backgroundColor: string;
};

const CommonBtn = (props: Props) => {
  const { text, backgroundColor } = props;
  return (
    <StatusBtn backgroundColor={backgroundColor}>
      <p>{text}</p>
    </StatusBtn>
  );
};

const StatusBtn = styled.span<{ backgroundColor: string }>`
  padding: 4.5pt 7.5pt;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: #ffffff;
  border-radius: 12pt;
  font-size: 9pt;
  font-weight: 500;
  line-height: 9pt;
  letter-spacing: -0.02em;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  & p {
    position: relative;
    top: 1pt;
  }
`;

export default CommonBtn;
