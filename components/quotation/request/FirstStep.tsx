import styled from '@emotion/styled';
import Image from 'next/image';
import React, { useState } from 'react';
import colors from 'styles/colors';
import AddIcon from 'public/images/add-img.svg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import Arrow from 'public/guide/Arrow.svg';
import XCircle from 'public/guide/XCircle.svg';
import { M5_LIST, M6_LIST, M7_LIST, M8_LIST } from 'components/guide/step2';
interface Option {
  m5: string;
  m6: string;
  m7: string;
  m8: string;
}

const FirstStep = () => {
  const [selectedOption, setSelectedOption] = useState<Option[]>([
    {
      m5: '',
      m6: '',
      m7: '',
      m8: '',
    },
  ]);
  // 셀렉터 옵션 체인지
  const handleChange = (event: SelectChangeEvent<unknown>, index: number) => {
    const { name, value } = event.target;
    const copy: any = [...selectedOption];
    copy[index][name] = value;
    setSelectedOption(copy);
  };
  // 셀렉터 추가
  const onClickAdd = () => {
    if (selectedOption.length === 5) return;
    const temp = selectedOption.concat({
      m5: '',
      m6: '',
      m7: '',
      m8: '',
    });
    setSelectedOption(temp);
  };
  // 셀렉터 빼기
  const onClickMinus = (index: number) => {
    console.log(index);
    const copy = [...selectedOption];
    copy.splice(index, 1);
    setSelectedOption(copy);
  };

  return (
    <Wrraper>
      <Title>
        어떤 종류의 충전기를 <br />
        설치하고 싶으세요?
      </Title>
      {selectedOption?.map((option, index) => (
        <div key={index}>
          <SubTitle>
            <h3 className="name">충전기 종류 및 수량 선택</h3>
            {1 <= index ? (
              <div className="add-img" onClick={() => onClickMinus(index)}>
                <Image src={XCircle} alt="add-img" />
              </div>
            ) : (
              <div className="add-img" onClick={onClickAdd}>
                <Image src={AddIcon} alt="add-img" />
              </div>
            )}
          </SubTitle>
          {/* 충전기 종류 옵션 박스 */}
          <SelectBox
            value={option.m5}
            name="m5"
            onChange={(event) => handleChange(event, index)}
            IconComponent={() => <SelectIcon />}
            displayEmpty
          >
            <MenuItem value="">
              <Placeholder>충전기 종류</Placeholder>
            </MenuItem>
            {M5_LIST.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </SelectBox>
          {/* 타입,채널,수량 옵션 박스 */}
          <SelectContainer>
            <SelectSmall
              value={option.m6}
              name="m6"
              onChange={(event) => handleChange(event, index)}
              displayEmpty
              IconComponent={() => <SelectIcon />}
            >
              <MenuItem value="">
                <Placeholder>타입</Placeholder>
              </MenuItem>
              {M6_LIST.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </SelectSmall>
            <SelectSmall
              value={option.m7}
              name="m7"
              onChange={(event) => handleChange(event, index)}
              IconComponent={() => <SelectIcon />}
              displayEmpty
            >
              <MenuItem value="">
                <Placeholder>채널</Placeholder>
              </MenuItem>
              {M7_LIST.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </SelectSmall>
            <SelectSmall
              value={option.m8}
              name="m8"
              onChange={(event) => handleChange(event, index)}
              IconComponent={() => <SelectIcon />}
              displayEmpty
            >
              <MenuItem value="">
                <Placeholder>수량</Placeholder>
              </MenuItem>
              {M8_LIST.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </SelectSmall>
          </SelectContainer>
        </div>
      ))}
      <ChargeGuide>
        <span className="text">충전기 가이드</span>
        <div className="arrow-icon">
          <Image src={Arrow} alt="arrow_icon" />
        </div>
      </ChargeGuide>
    </Wrraper>
  );
};

export default FirstStep;

const Wrraper = styled.div`
  position: relative;
  padding-bottom: 96pt;
  padding: 0 15pt;
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
const SubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 45pt;
  .name {
    font-weight: 700;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .add-img {
  }
`;

const SelectContainer = styled.div`
  display: flex;
  gap: 8.25pt;
`;
const SelectBox = styled(Select)`
  width: 100%;
  border: 1px solid #e2e5ed;
  border-radius: 8px;
  margin-top: 9pt;
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
const SelectSmall = styled(Select)`
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  margin-top: 9pt;
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  border: 1px solid #e2e5ed;
  width: 100%;
  & div {
    padding-left: 12pt;
    padding-top: 13.5pt;
    padding-bottom: 13.5pt;
    width: 0;
  }
  & svg {
    padding-right: 12pt;
  }
  & fieldset {
    border: none;
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
const ChargeGuide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3pt;
  color: ${colors.gray2};
  margin-top: 75pt;
  .text {
    letter-spacing: -0.02em;
    border-bottom: 1px solid ${colors.gray2};
  }
  .arrow-icon {
    position: relative;
    width: 12pt;
    height: 12pt;
  }
`;
