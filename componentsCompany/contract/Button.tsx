import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import colors from 'styles/colors';

type Props = {
  prev?: boolean;
  prevValue?: string;
  prevOnClick?: () => void;
  value: string;
  isValid: boolean;
  onClick: () => void;
};

export default function ContractButton({
  prev,
  prevValue,
  prevOnClick,
  value,
  isValid,
  onClick,
}: Props) {
  console.log('🔥 isValid : ', isValid);
  {
    return (
      <Wrap>
        <Btn prev={prev} className="prev" onClick={prevOnClick}>
          {prevValue}
        </Btn>
        <Btn isValid={isValid} onClick={onClick}>
          {value}
        </Btn>
      </Wrap>
    );
  }
}
const Wrap = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const Btn = styled.button<{ prev?: boolean; isValid?: boolean }>`
  display: ${({ prev }) => (prev === false ? 'none' : 'block')};
  width: 100%;
  background-color: ${colors.main1};
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  padding-top: 15pt;
  padding-bottom: 39pt;
  flex: 2;

  ${({ isValid }) =>
    !isValid &&
    css`
      background-color: ${colors.blue3};
    `}

  &.prev {
    background-color: ${colors.gray} !important;
    flex: 1;
  }
`;
