import styled from '@emotion/styled';
import React from 'react';

type Props = {
  text: string;
  backgroundColor: string;
  bottom?: string;
};

const CommonBtn = (props: Props) => {
  const { text, backgroundColor, bottom } = props;
  console.log(bottom);
  return (
    <StatusBtn
      backgroundColor={backgroundColor}
      bottom={bottom !== undefined && bottom.length > 0 ? bottom : '0pt'}
    >
      {text}
    </StatusBtn>
  );
};

const StatusBtn = styled.span<{ backgroundColor: string; bottom: string }>`
  padding: 4.5pt 7.5pt;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 12pt;
  position: relative;
  margin-top: ${({ bottom }) => bottom};
  text-align: center;
  position: relative;
  top: 1pt;
  color: #ffffff;
  font-size: 9pt;
  font-weight: 500;
  line-height: 9pt;
  letter-spacing: -0.02em;
  & span {
  }
`;

export default CommonBtn;
