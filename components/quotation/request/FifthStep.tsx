import styled from '@emotion/styled';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';
import colors from 'styles/colors';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface Option {
  fisrt: string;
  second: string;
}

export const M11_LIST = [
  '가격',
  'A/S',
  '품질',
  '편의성',
  '디자인',
  '납기',
  '보증기간',
];

const FifthStep = () => {
  const [selectedOption, setSelectedOption] = useState<Option>({
    fisrt: '',
    second: '',
  });
  // 셀렉터 옵션 체인지
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const { name, value } = event.target;
    setSelectedOption(() => ({
      ...selectedOption,
      [name]: value,
    }));
  };

  return (
    <Wrraper>
      <Title>
        충전기의 어떤 점을 <br />
        중요하게 생각하시나요?
      </Title>
      <Notice>맞춤 상품으로 준비해 드릴게요!</Notice>
      <SelectSection>
        <InputBox>
          <label>1순위</label>
          <SelectBox
            value={selectedOption.fisrt}
            name="fisrt"
            onChange={handleChange}
            IconComponent={() => <SelectIcon />}
            displayEmpty
          >
            <MenuItem value="">
              <Placeholder>충전기 종류</Placeholder>
            </MenuItem>
            {M11_LIST.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </SelectBox>
        </InputBox>
        <InputBox>
          <label>2순위</label>
          <SelectBox
            value={selectedOption.second}
            name="second"
            onChange={handleChange}
            IconComponent={() => <SelectIcon />}
            displayEmpty
          >
            <MenuItem value="">
              <Placeholder>충전기 종류</Placeholder>
            </MenuItem>
            {M11_LIST.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </SelectBox>
        </InputBox>
      </SelectSection>
    </Wrraper>
  );
};

export default FifthStep;

const Wrraper = styled.div`
  position: relative;
  padding-bottom: 96pt;
  padding-left: 15pt;
  padding-right: 15pt;
`;
const Title = styled.h1`
  padding-top: 24pt;
  font-weight: 500;
  font-size: 18pt;
  line-height: 24pt;
  text-align: left;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const Notice = styled.p`
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  padding-top: 9pt;
`;
const SelectSection = styled.div`
  padding-top: 45pt;
`;
const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 9pt;
  width: 100%;
  .label {
    font-weight: 500;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
`;
const SelectBox = styled(Select)`
  width: 204pt;
  border: 1px solid #e2e5ed;
  border-radius: 8px;
  font-weight: 400;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  & div {
    padding-left: 12.75pt;
    padding-top: 13.5pt;
    padding-bottom: 13.5pt;
  }
  & fieldset {
    border: none;
  }
  & svg {
    padding-right: 11.25pt;
  }
`;
const SelectIcon = styled(KeyboardArrowDownIcon)`
  width: 18pt;
  height: 18pt;
  color: ${colors.dark};
`;
const Placeholder = styled.em`
  font-weight: 400;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.lightGray3};
`;
