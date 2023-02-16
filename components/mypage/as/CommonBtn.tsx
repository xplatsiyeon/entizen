import styled from '@emotion/styled';
import React from 'react';

type Props = {
  text: string;
  backgroundColor: string;
  bottom?: string;
  top?: string;
  left?: string;
};

const CommonBtn = (props: Props) => {
  const { text, backgroundColor, bottom, top, left } = props;

  return (
    <StatusBtn
      backgroundColor={backgroundColor}
      bottom={bottom !== undefined && bottom.length > 0 ? bottom : '0pt'}
      top={top}
      left={left}
    >
      {text}
    </StatusBtn>
  );
};

const StatusBtn = styled.span<{
  backgroundColor: string;
  bottom: string;
  top: string | undefined;
  left: string | undefined;
}>`
  padding: 4.5pt 7.5pt;
  font-family: 'Spoqa Han Sans Neo';
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 12pt;
  position: relative;
  margin-top: ${({ bottom }) => bottom};
  text-align: center;
  position: relative;
  top: ${({ top }) => (top ? top : '1pt')};
  left: ${({ left }) => (left ? left : '0')};
  color: #ffffff;
  font-size: 9pt;
  font-weight: 500;
  line-height: 9pt;
  letter-spacing: -0.02em;
  & span {
  }
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 500;
    line-height: 9pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

export default CommonBtn;
