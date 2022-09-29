import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { css } from '@emotion/react';

interface Props {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
}

const SliderSizes = ({ value, setValue, disabled, setDisabled }: Props) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    setDisabled(false);
    setValue(newValue as number);
  };

  return (
    <SliderCustom width={'100%'} disabled={disabled} client={true.toString()}>
      {/* 슬라이더 */}
      <Slider
        step={5}
        value={value}
        onChange={handleChange}
        defaultValue={50}
        valueLabelDisplay="auto"
      />
      {/* 하단 뱃지 */}
      <PersentBadge
        disabled={disabled}
        client={true.toString()}
        persent={value / 2}
      >
        {`${value}%`}
      </PersentBadge>
      <PersentBadge
        disabled={disabled}
        client={false.toString()}
        persent={value + (100 - value) / 2}
      >
        {`${100 - value}%`}
      </PersentBadge>
    </SliderCustom>
  );
};

export default SliderSizes;

const SliderCustom = styled(Box)<{ disabled: boolean; client: string }>`
  position: relative;
  padding-top: 6pt;
  padding-bottom: 10.5pt;
  .MuiSlider-root {
    color: ${colors.gray};
    border-radius: 2px;
    width: 100%;
    box-sizing: border-box;
  }
  .MuiSlider-track {
    color: ${({ client }) => (client ? colors.main : colors.gray)};
    border: 0;
    right: 0;
    /* 초기값 */
    ${({ disabled }) =>
      disabled &&
      css`
        color: ${colors.lightGray2};
      `}
  }
  .MuiSlider-thumb::after {
    background: #ffffff;
    box-shadow: 0px 0px 5px rgba(117, 130, 149, 0.6);
    width: 15pt;
    height: 15pt;
  }
`;

const PersentBadge = styled.span<{
  persent: number;
  disabled: boolean;
  client: string;
}>`
  position: absolute;
  left: ${({ persent }) => `calc(${persent}% - 15pt)`};
  bottom: 0;
  color: ${colors.lightWhite};
  background-color: ${({ client }) =>
    client === 'true' ? colors.main : colors.gray};
  border-radius: 6pt;
  padding: 4.5pt 7.5pt;
  font-size: 9pt;
  line-height: 9pt;
  letter-spacing: -0.02em;
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: -20px;
    transform: translate(-50%);
    border: solid transparent;
    border-width: 9pt 6pt;
    border-bottom-color: ${({ client }) =>
      client === 'true' ? colors.main : colors.gray};
  }
  /* 초기값 */
  ${({ disabled, client }) =>
    disabled &&
    css`
      background-color: ${client === 'true' ? colors.lightGray2 : colors.gray};
      &:after {
        border-bottom-color: ${client === 'true'
          ? colors.lightGray2
          : colors.gray};
      }
    `}
`;
