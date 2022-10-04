import styled from '@emotion/styled';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import colors from 'styles/colors';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch } from 'react-redux';
import { quotationAction } from 'store/quotationSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

interface Option {
  fisrt: string;
  second: string;
}

interface Props {
  tabNumber: number;
  setTabNumber: Dispatch<SetStateAction<number>>;
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
export const M11_LIST_EN = [
  'PRICE',
  'AS',
  'QUALITY',
  'CONVENIENCE',
  'DESIGN',
  'DEADLINE',
  'GUARANTEE',
];

const FifthStep = ({ tabNumber, setTabNumber }: Props) => {
  const dispatch = useDispatch();
  const { installationPoints } = useSelector(
    (state: RootState) => state.quotationData,
  );
  const [buttonActivate, setButtonActivate] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option>({
    fisrt: '',
    second: '',
  });
  const [selectedOptionEn, setSelectedOptionEn] = useState<Option>({
    fisrt: '',
    second: '',
  });
  // 셀렉터 옵션 체인지
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    const index = M11_LIST.indexOf(value);
    console.log(M11_LIST_EN[index]);

    setSelectedOptionEn(() => ({
      ...selectedOptionEn,
      [name]: M11_LIST_EN[index],
    }));
    setSelectedOption(() => ({
      ...selectedOption,
      [name]: value,
    }));
  };

  // 이전버튼
  const HandlePrevBtn = () => {
    setTabNumber(tabNumber - 1);
  };
  // 다음버튼
  const HandleNextBtn = () => {
    if (buttonActivate) {
      dispatch(
        quotationAction.setStep5([
          selectedOptionEn.fisrt,
          selectedOptionEn.second,
        ]),
      );
      setTabNumber(tabNumber + 1);
    }
  };

  // 데이터 기억
  useEffect(() => {
    if (installationPoints[0] && installationPoints[1]) {
      const index1 = M11_LIST_EN.indexOf(installationPoints[0]);
      const index2 = M11_LIST_EN.indexOf(installationPoints[1]);
      setSelectedOption({
        fisrt: M11_LIST[index1],
        second: M11_LIST[index2],
      });
    }
  }, []);
  // 버튼 활성화
  useEffect(() => {
    if (selectedOption.fisrt) {
      if (selectedOption.fisrt.length > 1 && selectedOption.second.length > 1) {
        setButtonActivate(true);
      }
    }
  }, [selectedOption]);

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
      <TwoBtn>
        <PrevBtn onClick={HandlePrevBtn}>이전</PrevBtn>
        <NextBtn buttonActivate={buttonActivate} onClick={HandleNextBtn}>
          다음
        </NextBtn>
      </TwoBtn>
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
const NextBtn = styled.div<{
  buttonActivate: boolean;
  subscribeNumber?: number;
}>`
  color: ${colors.lightWhite};
  width: ${({ subscribeNumber }) => (subscribeNumber === 0 ? '100%' : '64%')};
  padding: 15pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-top: 30pt;
  background-color: ${({ buttonActivate }) =>
    buttonActivate ? colors.main : colors.blue3};
  @media (max-width: 899pt) {
    padding: 15pt 0 39pt 0;
  }
`;
const PrevBtn = styled.div`
  color: ${colors.lightWhite};
  width: 36%;
  padding: 15pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-top: 30pt;
  background-color: ${colors.gray};
  @media (max-width: 899pt) {
    padding: 15pt 0 39pt 0;
  }
`;
const TwoBtn = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  @media (max-width: 899pt) {
    position: fixed;
  }
`;
