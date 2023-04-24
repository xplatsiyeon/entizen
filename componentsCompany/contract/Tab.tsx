import styled from '@emotion/styled';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import colors from 'styles/colors';

type Props = {};

const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export default function Tab(props: Props) {
  const { step } = useSelector((state: RootState) => state.contractSlice);
  return (
    <Wrap>
      {steps.map((item) => (
        <span className={step === item ? 'target' : ''}>{item}</span>
      ))}
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 100%;
  span {
    display: inline-block;
    background: ${colors.gray3};
    color: ${colors.gray2};
    text-align: center;
    min-width: 13.5pt;
    min-height: 13.5pt;
    border-radius: 50%;
    margin-right: 3pt;
  }
  .target {
    color: ${colors.lightWhite};
    background: ${colors.main1};
  }
`;
