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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 899.25pt) {
    width: 100vw;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

const Btn = styled.button<{ prev?: boolean; isValid?: boolean }>`
  display: ${({ prev }) => (prev === false ? 'none' : 'block')};
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
  padding-bottom: 15pt;
  flex: 2;

  max-height: 42pt;
  margin-top: 45pt;
  border-radius: 6pt;
  ${({ isValid }) =>
    !isValid &&
    css`
      background-color: ${colors.blue3};
    `}

  &.prev {
    margin-right: 8.7375pt;
    background-color: ${colors.gray} !important;
    flex: 1;
  }
  @media (max-width: 899.25pt) {
    width: 100%;
    padding-top: 15pt;
    padding-bottom: 39pt;
    min-width: none;
    margin-top: none;
    border-radius: 0;
    margin-right: auto;
    max-height: auto;
  }
`;
