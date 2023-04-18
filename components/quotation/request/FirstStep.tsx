import styled from '@emotion/styled';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import colors from 'styles/colors';
import AddIcon from 'public/images/add-img2.svg';
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
import { useRouter } from 'next/router';
import SelectComponents from 'components/Select';

interface Props {
  tabNumber: number;
  // setTabNumber: Dispatch<SetStateAction<number>>;
}

export interface SelectedOption {
  idx: number;
  kind: string;
  standType: string;
  channel: string;
  count: string;
}

const FirstStep = ({ tabNumber }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { chargersKo, chargers } = useSelector(
    (state: RootState) => state.quotationData,
  );
  const [isValid, setIsValid] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectedOption[]>([
    {
      idx: 0,
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
  const handleSelectBox = (value: string, name: string, index: number) => {
    let copy: SelectedOption[] = [...selectedOption];
    let copyEn: Option[] = [...selectedOptionEn];
    // 영어 값 추출
    let valueEn: string;
    // 충전기 종류
    if (name === 'kind') {
      const idx = M5_LIST.indexOf(value);
      valueEn = M5_LIST_EN[idx];
      copy[index] = {
        idx: idx,
        kind: '',
        standType: '',
        channel: '',
        count: '',
      };
      copy[index] = {
        ...copy[index],
        kind: value,
      };
      copyEn[index] = {
        ...copyEn[index],
        kind: valueEn,
      };
      // 타입
    } else if (copy[index].kind.length > 1 && name === 'standType') {
      const idx = M6_LIST.indexOf(value);
      if (value === '-') {
        valueEn = '';
      } else {
        valueEn = M6_LIST_EN[idx];
      }
      copy[index] = {
        ...copy[index],
        standType: value,
      };
      copyEn[index] = {
        ...copyEn[index],
        standType: valueEn,
      };
    } else if (copy[index].kind.length > 1 && name === 'channel') {
      const idx = M7_LIST.indexOf(value);
      valueEn = M7_LIST_EN[idx];
      copy[index] = {
        ...copy[index],
        channel: value,
      };
      copyEn[index] = {
        ...copyEn[index],
        channel: valueEn,
      };
      // 개수
    } else if (copy[index].kind.length > 1 && name === 'count') {
      const idx = M8_LIST.indexOf(value);
      valueEn = M8_LIST_EN[idx];
      copy[index] = {
        ...copy[index],
        count: value,
      };
      copyEn[index] = {
        ...copyEn[index],
        count: valueEn,
      };
    }

    setSelectedOption(copy);
    setSelectedOptionEn(copyEn);
  };
  // 셀렉터 추가
  const onClickAdd = () => {
    if (selectedOption.length === 5 && selectedOptionEn.length === 5) return;
    const temp = selectedOption.concat({
      idx: 0,
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
      dispatch(quotationAction.setTabNumber(tabNumber + 1));
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
  const goToGuide = () => {
    if (isValid && tabNumber !== 5) {
      dispatch(quotationAction.setChargers(selectedOptionEn));
      dispatch(quotationAction.setChargersKo(selectedOption));
    }
    router.push({
      pathname: '/guide/charger',
      query: {
        id: 0,
      },
    });
  };

  // 버튼 on/off
  useEffect(() => {
    setIsValid(true);
    validation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);
  // 내용 기억
  useEffect(() => {
    setSelectedOption(chargersKo);
    setSelectedOptionEn(chargers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log(selectedOption);
  }, [selectedOption]);
  return (
    <Wrraper>
      <Title>
        어떤 종류의 충전기를 <br />
        설치하고 싶으세요?
      </Title>
      {selectedOption?.map((item, index) => (
        <div key={index}>
          <SubTitle>
            <h3 className="name" style={{ fontFamily: 'Spoqa Han Sans Neo' }}>
              충전기 종류 및 수량 선택
            </h3>
            {1 <= index ? (
              <div
                className="add-img"
                onClick={() => onClickMinus(index)}
                style={{ cursor: 'pointer' }}
              >
                <Image src={XCircle} alt="add-img" />
              </div>
            ) : (
              <div
                className="add-img"
                onClick={onClickAdd}
                style={{ cursor: 'pointer' }}
              >
                <Image src={AddIcon} alt="add-img" />
              </div>
            )}
          </SubTitle>
          {/* 충전기 종류 옵션 박스 */}
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
      <ChargeGuide>
        <span className="text" onClick={goToGuide}>
          충전기 가이드
        </span>
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

  @media (max-width: 899.25pt) {
    margin-bottom: 96pt;
    padding: 0 15pt;
  }
`;
const Title = styled.h1`
  padding-top: 38pt;
  font-weight: 500;
  font-size: 18pt;
  line-height: 24pt;
  text-align: left;
  font-family: 'Spoqa Han Sans Neo';
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const SubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 45pt;
  .name {
    font-style: normal;
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    font-family: 'Spoqa Han Sans Neo';
  }
  .add-img {
  }
`;
const SelectBoxWrapper = styled.div`
  padding-top: 4.5pt;
`;
const SelectComponentsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 9pt;
  gap: 9pt;
`;
const ChargeGuide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3pt;
  color: ${colors.gray2};
  margin-top: 75pt;
  cursor: pointer;

  .text {
    letter-spacing: -0.02em;
    border-bottom: 1px solid ${colors.gray2};
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
    @media (min-width: 900pt) {
      text-align: right;
    }
  }
  .arrow-icon {
    position: relative;
    width: 12pt;
    height: 12pt;
  }
  @media (min-width: 900pt) {
    padding-bottom: 90pt;
    display: flex;
    justify-content: flex-end;
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
  font-family: 'Spoqa Han Sans Neo';
  letter-spacing: -0.02em;
  margin-top: 30pt;
  border-radius: 6pt;
  cursor: pointer;
  background-color: ${({ buttonActivate }) =>
    buttonActivate ? colors.main : colors.blue3};

  @media (max-width: 899.25pt) {
    position: fixed;
    padding: 15pt 0 39pt 0;
    border-radius: 0;
  }
`;
