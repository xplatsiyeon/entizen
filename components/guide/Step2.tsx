import styled from '@emotion/styled';
import colors from 'styles/colors';
import Image from 'next/image';
import PlusCircle from 'public/guide/PlusCircle.svg';
import XCircle from 'public/guide/XCircle.svg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
const M5_LIST = [
  '3.5 kW 과금형 콘센트',
  '7 kW 홈 충전기 (가정용)',
  '7 kW 충전기 (공용, 경제형)',
  '7 kW 충전기 (공용)',
  '11 kW 충전기',
  '14 kW 충전기',
  '17.6 kW 충전기',
  '20 kW 충전기',
  '50 kW 충전기',
  '100 kW 충전기',
  '200 kW 충전기',
  '300 kW 충전기',
  '350 kW 충전기',
  '400 kW 충전기',
  '300 kW 충전기 (버스)',
  '350 kW 충전기 (버스)',
  '400 kW 충전기 (버스)',
];
const M6_LIST = ['-', '벽걸이', '스탠드', '키오스크'];
const M7_LIST = ['-', '싱글', '듀얼', '3모드'];
const M8_LIST = [
  '1대',
  '2대',
  '3대',
  '4대',
  '5대',
  '6대',
  '7대',
  '8대',
  '9대',
  '10대',
];
const M9_LIST = [
  '서울특별시',
  '경기도',
  '강원도',
  '충청남도',
  '충청북도',
  '경상북도',
  '전라북도',
];
const M10_LIST = [
  '포천시',
  '남양주시',
  '하남시',
  '성남시',
  '수원시',
  '화성시',
  '평택시',
];
interface Option {
  m5: string;
  m6: string;
  m7: string;
  m8: string;
  m9: string;
  m10: string;
}
interface Props {
  selectedOption: Option;
  selectCharger: boolean;
  setSelectCharger: Dispatch<SetStateAction<boolean>>;
  handleChange: (event: SelectChangeEvent<unknown>) => void;
}
const Step2 = ({
  selectedOption,
  selectCharger,
  setSelectCharger,
  handleChange,
}: Props) => {
  return (
    <>
      <Title>STEP 2</Title>
      <Text>
        보조금 최대 수령을 위해 <br /> 아래 항목을 입력해주세요.
      </Text>
      <QuantityBox>
        <span className="name">충전기 종류 및 수량 선택</span>
        <Image
          src={selectCharger ? XCircle : PlusCircle}
          alt="PlusCircle"
          onClick={() => setSelectCharger((prev: boolean) => !prev)}
        />
      </QuantityBox>
      {selectCharger && (
        <>
          <SelectContainer>
            <SelectBox
              value={selectedOption.m5}
              name="m5"
              onChange={handleChange}
              displayEmpty
              IconComponent={() => <SelectIcon />}
            >
              <MenuItem value="">
                <em>충전기 종류</em>
              </MenuItem>
              {M5_LIST.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </SelectBox>
          </SelectContainer>

          <SelectContainer>
            <SelectSmall
              value={selectedOption.m6}
              name="m6"
              onChange={handleChange}
              displayEmpty
              IconComponent={() => <SelectIcon />}
            >
              <MenuItem value="">
                <em>타입</em>
              </MenuItem>
              {M6_LIST.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </SelectSmall>
            <SelectSmall
              value={selectedOption.m7}
              name="m7"
              onChange={handleChange}
              IconComponent={() => <SelectIcon />}
              displayEmpty
            >
              <MenuItem value="">
                <em>타입</em>
              </MenuItem>
              {M7_LIST.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </SelectSmall>
            <SelectSmall
              value={selectedOption.m8}
              name="m8"
              onChange={handleChange}
              IconComponent={() => <SelectIcon />}
              displayEmpty
            >
              <MenuItem value="">
                <em>타입</em>
              </MenuItem>
              {M8_LIST.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </SelectSmall>
          </SelectContainer>
        </>
      )}
      <Label>충전기 설치 지역</Label>
      <SelectContainer>
        <SelectBox
          value={selectedOption.m9}
          name="m9"
          onChange={handleChange}
          IconComponent={() => <SelectIcon />}
          displayEmpty
        >
          <MenuItem value="">
            <em>타입</em>
          </MenuItem>
          {M9_LIST.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </SelectBox>
        <SelectBox
          value={selectedOption.m10}
          name="m10"
          onChange={handleChange}
          IconComponent={() => <SelectIcon />}
          displayEmpty
        >
          <MenuItem value="">
            <em>타입</em>
          </MenuItem>
          {M10_LIST.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </SelectBox>
      </SelectContainer>
    </>
  );
};

export default Step2;

const Text = styled.p`
  font-weight: 400;
  font-size: 12pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  padding-top: 7.5pt;
  color: ${colors.main2};
`;

const Title = styled.h3`
  padding-top: 45pt;
  font-weight: 500;
  font-size: 15pt;
  line-height: 21pt;
  letter-spacing: -0.02em;
  color: ${colors.main};
`;
const QuantityBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30pt;
  .name {
    font-weight: 700;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
`;
const SelectIcon = styled(KeyboardArrowDownIcon)`
  width: 24px;
  height: 24px;
  color: ${colors.dark};
`;
const SelectBox = styled(Select)`
  width: 100%;
  border: 1px solid #e2e5ed;
  border-radius: 8px;
  margin-top: 9pt;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: -0.02em;
  color: ${colors.lightGray2};
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
  border: 1px solid #e2e5ed;
  border-radius: 8px;
  margin-top: 9pt;
  font-weight: 400;
  font-size: 12px;
  letter-spacing: -0.02em;
  color: ${colors.lightGray2};
  width: 100%;
  display: flex;
  justify-content: space-between;
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
const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8.25pt;
`;
const Label = styled.div`
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  margin-top: 33pt;
`;
