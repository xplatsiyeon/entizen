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
import WebFooter from 'web-components/WebFooter';
import WebHeader from 'web-components/WebHeader';

export interface Option {
  m5: string;
  m6: string;
  m7: string;
  m8: string;
}
export interface Region {
  m9: string;
  m10: string;
}

const Guide1_2 = () => {
  const router = useRouter();
  const [clicked, setClicked] = useState(-1);
  const [isValid, setIsValid] = useState(true);
  const [buttonActivate, setButtonActivate] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option[]>([
    {
      m5: '',
      m6: '',
      m7: '',
      m8: '',
    },
  ]);
  const [selectedRegion, setSelectedRegion] = useState<Region>({
    m9: '',
    m10: '',
  });

  // STEP 1 탭기능
  const handlePurposeOnClick = (index: number) => setClicked(index);
  // STEP 2 충전기 옵션 체인지
  const handleOptionChange = (
    event: SelectChangeEvent<unknown>,
    index: number,
  ) => {
    const { name, value } = event.target;
    const copy: any = [...selectedOption];
    // m5 바뀌면 초기화 시켜줌
    if (name === 'm5') {
      copy[index] = {
        m5: '',
        m6: '',
        m7: '',
        m8: '',
      };
    }
    // 객체 key에 value 값 추가
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
  return (
    <Body>
    <WebHeader/>
    <Inner>
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
        handleOptionChange={handleOptionChange}
        HandleRegionChange={HandleRegionChange}
        onClickAdd={onClickAdd}
        onClickMinus={onClickMinus}
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
      </Inner>
    <WebFooter/>
    </Body>
  );
};

export default Guide1_2;


const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  //height: 810pt;
  background:#fcfcfc;

  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 0 auto;
  width: 345pt;
  //width: 281.25pt;  
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  background: #ffff;

  @media (max-width: 899pt) {
    width: 100%;
    position: relative;
    top: 0;
    left: 0%;
    transform: none;
  }
`;

const Wrapper = styled.div`

  padding-bottom: 100pt;
  padding-left: 15pt;
  padding-right: 15pt;
  position: relative;
  margin: 0 31.875pt;
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
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  color: ${colors.lightWhite};
  padding: 15pt 0 15pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-top: 33pt;
  background-color: ${({ buttonActivate }) =>
    buttonActivate ? colors.main : '#e2e5ed'};

  @media (max-width: 899pt) {
    position: fixed;
    padding: 15pt 0 39pt 0;
    width: 100%;
  }
`;
