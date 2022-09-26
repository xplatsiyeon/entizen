import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import React, { useEffect, useState } from 'react';

const SliderSizes = () => {
  const [value, setValue] = useState(50);
  const [backValue, setBackValue] = useState(100);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <SliderCustom width={'100%'}>
      <Slider
        value={value}
        onChange={handleChange}
        defaultValue={value}
        aria-label=""
        valueLabelDisplay="auto"
      />
      <PersentBadge
        client={true}
        persent={value / 2}
      >{`${value}%`}</PersentBadge>
      <PersentBadge client={false} persent={value + (backValue - value) / 2}>
        {`${backValue - value}%`}
      </PersentBadge>
    </SliderCustom>
  );
};

export default SliderSizes;

const SliderCustom = styled(Box)`
  position: relative;
  padding: 6pt 0;
  .css-187mznn-MuiSlider-root {
    color: #e2e5ed;
    border-radius: 2px;
  }
  .css-1gv0vcd-MuiSlider-track {
    color: ${colors.main};
  }
  .css-eg0mwd-MuiSlider-thumb::after {
    background: #ffffff;
    box-shadow: 0px 0px 5px rgba(117, 130, 149, 0.6);
    width: 15pt;
    height: 15pt;
  }
  .css-14pt78w-MuiSlider-rail {
  }
`;

const PersentBadge = styled.span<{ persent: number; client: boolean }>`
  position: absolute;
  left: ${({ persent }) => `calc(${persent}% - 15pt)`};
  bottom: -10.5pt;
  color: ${colors.lightWhite};
  background-color: ${({ client }) => (client ? colors.main : colors.gray)};
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
      client ? colors.main : colors.gray};
  }
`;
