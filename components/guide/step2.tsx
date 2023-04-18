import styled from '@emotion/styled';
import colors from 'styles/colors';
import Image from 'next/image';
import PlusCircle from 'public/guide/PlusCircle.svg';
import XCircle from 'public/guide/XCircle.svg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { Region, SelectedOption } from 'pages/guide/subsidy';
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
import SelectComponents from 'components/Select';
import { Option } from 'store/quotationSlice';
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
  selectedOption: SelectedOption[];
  handleSelectBox: (item: string, name: string, index: number) => void;
  HandleRegionChange: (item: string, name: string) => void;
  selectedRegion: Region;
  onClickAdd: () => void;
  onClickMinus: (index: number) => void;
}

const Step2 = ({
  selectedOption,
  handleSelectBox,
  selectedRegion,
  HandleRegionChange,
  onClickAdd,
  onClickMinus,
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
          <SelectBoxWrapper>
            <SelectComponents
              value={item.kind}
              option={M5_LIST}
              name="kind"
              placeholder="충전기 종류"
              index={index}
              onClickCharger={handleSelectBox}
            />
          </SelectBoxWrapper>
          {/* 타입,채널,수량 옵션 박스 */}
          <SelectComponentsContainer>
            <SelectComponents
              value={item.standType}
              option={M5_TYPE_SET[item.idx]}
              name="standType"
              placeholder="타입"
              index={index}
              onClickCharger={handleSelectBox}
              fontSize={'small'}
            />
            <SelectComponents
              value={item.channel}
              option={M5_CHANNEL_SET[item.idx]}
              name="channel"
              placeholder="채널"
              index={index}
              onClickCharger={handleSelectBox}
              fontSize={'small'}
            />
            <SelectComponents
              value={item.count}
              option={M8_LIST}
              name="count"
              placeholder="수량"
              index={index}
              onClickCharger={handleSelectBox}
              fontSize={'small'}
            />
          </SelectComponentsContainer>
        </div>
      ))}
      <Label className="chargerRegion">충전기 설치 지역</Label>
      <SelectBoxWrapper>
        <SelectComponents
          value={selectedRegion.m9}
          option={M9_LIST}
          name="m9"
          placeholder="선택"
          onClickCharger={HandleRegionChange}
          fontSize={'small'}
        />
        <SelectComponents
          value={selectedRegion.m10}
          option={HandleM10()}
          name="m10"
          placeholder="선택"
          onClickCharger={HandleRegionChange}
          fontSize={'small'}
        />
      </SelectBoxWrapper>
    </>
  );
};

export default Step2;

const Text = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 400;
  font-size: 12pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  padding-top: 7.5pt;
  color: ${colors.main2};
`;
const Title = styled.h3`
  font-family: 'Spoqa Han Sans Neo';
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
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 700;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    @media (min-width: 900pt) {
      font-size: 12pt;
      font-weight: 700;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
      padding-bottom: 9pt;
    }
  }
`;
const SelectBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8.25pt;
`;

const SelectComponentsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 9pt;
  gap: 9pt;
`;

const Label = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  margin-top: 33pt;
  &.chargerRegion {
    margin-bottom: 9pt;
  }

  @media (min-width: 900pt) {
    font-size: 12pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
