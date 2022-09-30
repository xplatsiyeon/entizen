import styled from '@emotion/styled';
import Image from 'next/image';
import colors from 'styles/colors';
import { useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import arrow_small from 'public/guide/Arrow.svg';
import Step1 from 'components/guide/step1';
import Step2 from 'components/guide/step2';
import GuideHeader from 'components/guide/header';
import { useRouter } from 'next/router';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
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
import { useDispatch } from 'react-redux';
import { subsidyGuideAction } from 'store/subsidyGuideSlice';

export interface Option {
  kind: string;
  standType: string;
  channel: string;
  count: string;
}
export interface Region {
  m9: string;
  m10: string;
}

const Guide1_2 = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { subsidyGuideData } = useSelector((state: RootState) => state);
  const InstallationPurposeType = [
    'BUSINESS',
    'WELFARE',
    'MARKETING',
    'PERSONAL',
    'ETC',
  ];
  const [clicked, setClicked] = useState(-1);
  const [isValid, setIsValid] = useState(true);
  const [m5Index, setM5Index] = useState(0);
  const [buttonActivate, setButtonActivate] = useState<boolean>(false);
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
  const [selectedRegion, setSelectedRegion] = useState<Region>({
    m9: '',
    m10: '',
  });

  // STEP 1 탭기능
  const handlePurposeOnClick = (index: number) => setClicked(index);
  // STEP 2 충전기 옵션 체인지
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
    if (selectedOption.length === 5) return;
    const temp = selectedOption.concat({
      kind: '',
      standType: '',
      channel: '',
      count: '',
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
  // 지역 옵션 체인지
  const HandleRegionChange = (event: SelectChangeEvent<unknown>) => {
    const { name, value } = event.target;
    const copy = selectedRegion;
    if (name === 'm9') {
      copy.m10 = '';
    }
    setSelectedRegion(() => ({
      ...copy,
      [name]: value,
    }));
  };
  // 버튼 온클릭
  const onClickButton = () => {
    dispatch(
      subsidyGuideAction.addDate({
        installationPurpose: InstallationPurposeType[clicked],
        chargers: selectedOptionEn,
        region: selectedRegion.m9,
        region2: selectedRegion.m10,
      }),
    );
    console.log('버튼 클릭');
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
  // 버튼 활성화
  useEffect(() => {
    const { m9, m10 } = selectedRegion;
    setIsValid(true);
    validation();
    if (isValid && clicked !== -1 && m9.length > 0 && m10.length > 0) {
      setButtonActivate(true);
    } else {
      setButtonActivate(false);
    }
  }, [clicked, selectedOption, selectedRegion, isValid]);

  useEffect(() => {
    console.log('영어 ->');
    console.log(selectedOptionEn);
    console.log('한글 ->');
    console.log(selectedOption);
  }, [selectedOptionEn, selectedOption]);
  return (
    <Wrapper>
      <GuideHeader
        title={'보조금 가이드'}
        leftOnClick={() => router.back()}
        rightOnClick={() => router.push('/')}
      />
      <Step1 clicked={clicked} handlePurposeOnClick={handlePurposeOnClick} />
      <Step2
        selectedRegion={selectedRegion}
        selectedOption={selectedOption}
        handleOptionChange={handleChange}
        HandleRegionChange={HandleRegionChange}
        onClickAdd={onClickAdd}
        onClickMinus={onClickMinus}
        m5Index={m5Index}
      />
      <ChargeGuide>
        <span className="text">충전기 가이드</span>
        <div className="img">
          <Image src={arrow_small} alt="arrow_small" />
        </div>
      </ChargeGuide>
      <Btn buttonActivate={buttonActivate} onClick={onClickButton}>
        보조금 확인하기
      </Btn>
    </Wrapper>
  );
};

export default Guide1_2;

const Wrapper = styled.div`
  padding-bottom: 100pt;
  padding-left: 15pt;
  padding-right: 15pt;
`;
const ChargeGuide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3pt;
  padding-top: 75pt;
  color: ${colors.gray2};
  .text {
    letter-spacing: -0.02em;
    border-bottom: 1px solid ${colors.gray2};
  }
  .img {
    position: relative;
    width: 12pt;
    height: 12pt;
  }
`;
const Btn = styled.div<{ buttonActivate: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  color: ${colors.lightWhite};
  width: 100%;
  padding: 15pt 0 39pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-top: 33pt;
  background-color: ${({ buttonActivate }) =>
    buttonActivate ? colors.main : '#e2e5ed'};
`;
