import styled from '@emotion/styled';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import colors from 'styles/colors';
import AddIcon from 'public/images/add-img.svg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import Arrow from 'public/guide/Arrow.svg';
import XCircle from 'public/guide/XCircle.svg';
import {
  M5_LIST,
  M5_LIST_EN,
  M6_LIST,
  M6_LIST_EN,
  M7_LIST,
  M7_LIST_EN,
  M8_LIST,
  M8_LIST_EN,
} from 'assets/selectList';
import { M5_CHANNEL_SET, M5_TYPE_SET } from 'assets/selectList';
import { useDispatch } from 'react-redux';
import { Option, quotationAction } from 'store/quotationSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

interface Props {
  tabNumber: number;
  setTabNumber: Dispatch<SetStateAction<number>>;
}

const FirstStep = ({ tabNumber, setTabNumber }: Props) => {
  const dispatch = useDispatch();
  const { chargersKo } = useSelector((state: RootState) => state.quotationData);
  const [isValid, setIsValid] = useState(false);
  const [m5Index, setM5Index] = useState(0);
  const [selectedOption, setSelectedOption] = useState<Option[]>([
    {
      kind: '',
      standType: '',
      channel: '',
      count: '',
    },
  ]);
  // 백엔드에 보내줄 이름
  const [selectedOptionEn, setSelectedOptionEn] = useState<Option[]>([
    {
      kind: '',
      standType: '',
      channel: '',
      count: '',
    },
  ]);

  // 셀렉터 옵션 체인지
  const handleChange = (event: any, index: number) => {
    const { name, value } = event.target;
    const copy: any = [...selectedOption];
    const copyEn: any = [...selectedOptionEn];
    // 영어 값 추출
    let valueEn;

    if (name === 'kind') {
      const idx = M5_LIST.indexOf(value);
      setM5Index(idx);
      valueEn = M5_LIST_EN[idx];
      copy[index] = {
        kind: '',
        standType: '',
        channel: '',
        count: '',
      };
    } else if (name === 'standType') {
      const idx = M6_LIST.indexOf(value);
      if (value === '-') {
        valueEn = '';
      } else {
        valueEn = M6_LIST_EN[idx];
      }
    } else if (name === 'channel') {
      const idx = M7_LIST.indexOf(value);

      valueEn = M7_LIST_EN[idx];
    } else if (name === 'count') {
      const idx = M8_LIST.indexOf(value);
      valueEn = M8_LIST_EN[idx];
    }
    copy[index][name] = value;
    copyEn[index][name] = valueEn;
    setSelectedOption(copy);
    setSelectedOptionEn(copyEn);
  };
  // 셀렉터 추가
  const onClickAdd = () => {
    if (selectedOption.length === 5 && selectedOptionEn.length === 5) return;
    const temp = selectedOption.concat({
      kind: '',
      standType: '',
      channel: '',
      count: '',
    });
    const tempEn = selectedOptionEn.concat({
      kind: '',
      standType: '',
      channel: '',
      count: '',
    });

    setSelectedOption(temp);
    setSelectedOptionEn(tempEn);
  };
  // 셀렉터 박스 빼기
  const onClickMinus = (index: number) => {
    const copy = [...selectedOption];
    const copyEn = [...selectedOptionEn];
    copy.splice(index, 1);
    copyEn.splice(index, 1);
    setSelectedOption(copy);
    setSelectedOptionEn(copyEn);
  };
  // 버튼 온클릭
  const buttonOnClick = () => {
    if (isValid && tabNumber !== 5) {
      dispatch(quotationAction.setChargers(selectedOptionEn));
      dispatch(quotationAction.setChargersKo(selectedOption));
      setTabNumber(tabNumber + 1);
    }
  };
  // 버튼 유효성 검사
  const validation = () => {
    const copy: any = [...selectedOption];
    for (const option of copy) {
      for (const key in option) {
        if (option[key].length < 1) {
          setIsValid(false);
        }
      }
    }
  };
  // 버튼 on/off
  useEffect(() => {
    setIsValid(true);
    validation();
  }, [selectedOption]);
  // 내용 기억
  useEffect(() => {
    console.log(selectedOption);
    setSelectedOption(chargersKo);
  }, []);
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
            value={option.kind}
            name="kind"
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
              value={option.standType}
              name="standType"
              onChange={(event) => handleChange(event, index)}
              displayEmpty
              IconComponent={() => <SelectIcon />}
            >
              <MenuItem value="">
                <Placeholder>타입</Placeholder>
              </MenuItem>
              {M5_TYPE_SET[m5Index].map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </SelectSmall>
            <SelectSmall
              value={option.channel}
              name="channel"
              onChange={(event) => handleChange(event, index)}
              IconComponent={() => <SelectIcon />}
              displayEmpty
            >
              <MenuItem value="">
                <Placeholder>채널</Placeholder>
              </MenuItem>
              {M5_CHANNEL_SET[m5Index].map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </SelectSmall>
            <SelectSmall
              value={option.count}
              name="count"
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
      <Btn buttonActivate={isValid} tabNumber={0} onClick={buttonOnClick}>
        다음
      </Btn>
    </Wrraper>
  );
};

export default FirstStep;

const Wrraper = styled.div`
  position: relative;
  padding: 0 15pt;

  @media (max-width: 899pt) {
  margin-bottom: 96pt;
  }
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
const Btn = styled.div<{ buttonActivate: boolean; tabNumber?: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  color: ${colors.lightWhite};
  width: ${({ tabNumber }) => (tabNumber === 0 ? '100%' : '64%')};
  padding: 15pt 0 15pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-top: 30pt;
  background-color: ${({ buttonActivate }) =>
    buttonActivate ? colors.main : colors.blue3};


  @media (max-width: 899pt) {
    position: fixed;
    padding: 15pt 0 39pt 0;
  }
`;
