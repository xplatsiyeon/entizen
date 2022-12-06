import styled from '@emotion/styled';
import colors from 'styles/colors';
import Image from 'next/image';
import PlusCircle from 'public/guide/PlusCircle.svg';
import XCircle from 'public/guide/XCircle.svg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { Option, Region } from 'pages/guide/1-2';
import {
  Seoul,
  Busan,
  Chungbuk,
  Chungnam,
  Daegu,
  Daejeon,
  Gangwon,
  Gwangju,
  GyeongGi,
  Gyeongbuk,
  Gyeongnam,
  Incheon,
  Jeju,
  Jeonbuk,
  Jeonnam,
  Sejong,
  Ulsan,
  M9_LIST,
} from 'assets/region';
import { M5_LIST, M5_TYPE_SET, M5_CHANNEL_SET } from 'assets/selectList';
import { useState } from 'react';
export const M8_LIST = [
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

interface Props {
  selectedOption: Option[];
  handleOptionChange: (
    event: SelectChangeEvent<unknown>,
    index: number,
  ) => void;
  HandleRegionChange: (event: SelectChangeEvent<unknown>) => void;
  selectedRegion: Region;
  onClickAdd: () => void;
  onClickMinus: (index: number) => void;
  m5Index: number;
}

const Step2 = ({
  selectedOption,
  handleOptionChange,
  selectedRegion,
  HandleRegionChange,
  onClickAdd,
  onClickMinus,
  m5Index,
}: Props) => {
  // 지역에 따라 도시 변환 함수
  const HandleM10 = () => {
    switch (selectedRegion.m9) {
      case '서울':
        return Seoul;
      case '경기':
        return GyeongGi;
      case '부산':
        return Busan;
      case '대구':
        return Daegu;
      case '인천':
        return Incheon;
      case '광주':
        return Gwangju;
      case '대전':
        return Daejeon;
      case '울산':
        return Ulsan;
      case '세종':
        return Sejong;
      case '강원':
        return Gangwon;
      case '충북':
        return Chungbuk;
      case '충남':
        return Chungnam;
      case '전북':
        return Jeonbuk;
      case '전남':
        return Jeonnam;
      case '경북':
        return Gyeongbuk;
      case '경남':
        return Gyeongnam;
      case '제주':
        return Jeju;
      default:
        break;
    }
  };

  return (
    <>
      <Title>STEP 2</Title>
      <Text>
        보조금 최대 수령을 위해 <br /> 아래 항목을 입력해주세요.
      </Text>

      {selectedOption?.map((item, index) => (
        <div key={index}>
          <QuantityBox>
            <span className="name">충전기 종류 및 수량 선택</span>
            {index >= 1 ? (
              <div
                className="add-img"
                onClick={() => onClickMinus(index)}
                style={{ cursor: 'ponter' }}
              >
                <Image src={XCircle} alt="add-img" />
              </div>
            ) : (
              <div
                className="add-img"
                onClick={onClickAdd}
                style={{ cursor: 'ponter' }}
              >
                <Image src={PlusCircle} alt="add-img" />
              </div>
            )}
          </QuantityBox>
          <SelectContainer>
            <SelectBox
              value={item.kind}
              name="kind"
              displayEmpty
              onChange={(event) => handleOptionChange(event, index)}
              IconComponent={() => <SelectIcon />}
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
          </SelectContainer>

          <SelectContainer>
            <SelectSmall
              value={item.standType}
              name="standType"
              onChange={(event) => handleOptionChange(event, index)}
              displayEmpty
              IconComponent={() => <SelectIcon />}
            >
              <MenuItem value="">
                <Placeholder>타입</Placeholder>
              </MenuItem>
              {M5_TYPE_SET[item.idx].map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </SelectSmall>
            <SelectSmall
              value={item.channel}
              name="channel"
              onChange={(event) => handleOptionChange(event, index)}
              IconComponent={() => <SelectIcon />}
              displayEmpty
            >
              <MenuItem value="">
                <Placeholder>타입</Placeholder>
              </MenuItem>
              {M5_CHANNEL_SET[item.idx].map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </SelectSmall>
            <SelectSmall
              value={item.count}
              name="count"
              onChange={(event) => handleOptionChange(event, index)}
              IconComponent={() => <SelectIcon />}
              displayEmpty
            >
              <MenuItem value="">
                <Placeholder>타입</Placeholder>
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
      <Label>충전기 설치 지역</Label>
      <SelectContainer>
        <SelectBox
          value={selectedRegion.m9}
          name="m9"
          onChange={HandleRegionChange}
          IconComponent={() => <SelectIcon />}
          displayEmpty
        >
          <MenuItem value="">
            <Placeholder>타입</Placeholder>
          </MenuItem>
          {M9_LIST.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </SelectBox>
        <SelectBox
          value={selectedRegion.m10}
          name="m10"
          onChange={HandleRegionChange}
          IconComponent={() => <SelectIcon />}
          displayEmpty
        >
          <MenuItem value="">
            <Placeholder>타입</Placeholder>
          </MenuItem>
          {HandleM10()?.map((option, index) => (
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
const Placeholder = styled.em`
  font-weight: 400;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.lightGray3};
`;
const SelectBox = styled(Select)`
  width: 100%;
  border: 0.75pt solid #e2e5ed;
  border-radius: 8px;
  margin-top: 9pt;
  font-weight: 400;
  font-size: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  cursor: all-scroll;
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
  color: ${colors.main2};
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
