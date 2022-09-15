import styled from '@emotion/styled';
import { Box } from '@mui/system';
import Image from 'next/image';
import colors from 'styles/colors';
import BackImg from 'public/images/back-btn.svg';
import Home from 'public/images/home.svg';
import { useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import arrow_small from 'public/guide/Arrow.svg';
import Step1 from 'components/guide/step1';
import Step2 from 'components/guide/step2';

interface Option {
  m5: string;
  m6: string;
  m7: string;
  m8: string;
  m9: string;
  m10: string;
}

const Guide1_2 = () => {
  const [clicked, setClicked] = useState(-1);
  const [selectCharger, setSelectCharger] = useState<boolean>(false);
  const [buttonActivate, setButtonActivate] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option>({
    m5: '',
    m6: '',
    m7: '',
    m8: '',
    m9: '',
    m10: '',
  });
  // STEP 1 탭기능
  const handlePurposeOnClick = (index: number) => setClicked(index);
  // STEP 2 옵션 추가
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const { name, value } = event.target;
    setSelectedOption(() => ({
      ...selectedOption,
      [name]: value,
    }));
  };
  // 버튼 활성화
  useEffect(() => {
    const { m9, m10 } = selectedOption;
    if (clicked !== -1 && 0 < m9.length && 0 < m10.length) {
      setButtonActivate(true);
    } else {
      setButtonActivate(false);
    }
  }, [clicked, selectedOption]);

  useEffect(() => {
    console.log(selectedOption);
  }, [selectedOption]);
  return (
    <Wrapper>
      <Header>
        <div className="back-img">
          <Image
            style={{
              cursor: 'pointer',
              width: '18pt',
              height: '18pt',
            }}
            src={BackImg}
            alt="btn"
          />
        </div>
        <span className="text">보조금 가이드</span>
        <div className="setting-img">
          <Image
            style={{
              cursor: 'pointer',
              width: '18pt',
              height: '18pt',
            }}
            src={Home}
            alt="home"
          />
        </div>
      </Header>
      <Step1 clicked={clicked} handlePurposeOnClick={handlePurposeOnClick} />
      <Step2
        selectedOption={selectedOption}
        selectCharger={selectCharger}
        setSelectCharger={setSelectCharger}
        handleChange={handleChange}
      />
      <ChargeGuide>
        <span className="text">충전기 가이드</span>
        <div className="img">
          <Image src={arrow_small} alt="arrow_small" />
        </div>
      </ChargeGuide>
      <Btn buttonActivate={buttonActivate}> 보조금 확인하기</Btn>
    </Wrapper>
  );
};

export default Guide1_2;

const Wrapper = styled.div`
  padding-bottom: 100pt;
  padding-left: 15pt;
  padding-right: 15pt;
`;
const Header = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36pt;
  padding: 9pt 0;
  padding: 0 15pt;
  .back-img {
    position: absolute;
    left: 7pt;
    padding: 5px;
  }
  .text {
    font-weight: 700;
    font-size: 12pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .setting-img {
    position: absolute;
    right: 7pt;
    padding: 5px;
  }
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
