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

  const [list1, setList1] = useState(M11_LIST);
  const [list2, setList2] = useState(M11_LIST);

  const [fisrtData, setFisrtData] = useState<string>('');
  const [fisrtDataEn, setFisrtDataEn] = useState<string>('');
  const [secondData, setSendData] = useState<string>('');
  const [secondDataEn, setSendDataEn] = useState<string>('');
  // 셀렉터 옵션 체인지
  const handleChange = (event: any) => {
    const { value } = event.target;
    const index = M11_LIST.indexOf(value);
    const seletedName = M11_LIST_EN[index];
    if (seletedName !== secondDataEn) {
      setFisrtData(M11_LIST[index]);
      setFisrtDataEn(seletedName);
      const copy = [...M11_LIST];
      copy.splice(index, 1);
      setList2(copy);
    }
  };
  // 셀렉터 옵션 체인지2
  const handleChange2 = (event: any) => {
    const { value } = event.target;
    const index = M11_LIST.indexOf(value);
    const seletedName = M11_LIST_EN[index];
    if (seletedName !== fisrtDataEn) {
      setSendData(M11_LIST[index]);
      setSendDataEn(M11_LIST_EN[index]);
      const copy = [...M11_LIST];
      copy.splice(index, 1);
      setList1(copy);
    }
  };

  // 이전버튼
  const HandlePrevBtn = () => {
    setTabNumber(tabNumber - 1);
  };
  // 다음버튼
  const HandleNextBtn = () => {
    if (buttonActivate) {
      dispatch(quotationAction.setStep5([fisrtDataEn, secondDataEn]));
      setTabNumber(tabNumber + 1);
    }
  };

  useEffect(() => {
    const copy = [...M11_LIST];
    if (list2.includes(fisrtData)) {
      const index = copy.indexOf(fisrtData);
      copy.splice(index, 1);
      setList2(copy);
    }
  }, [secondData]);

  // 데이터 기억
  useEffect(() => {
    if (installationPoints[0] && installationPoints[1]) {
      const index1 = M11_LIST_EN.indexOf(installationPoints[0]);
      const index2 = M11_LIST_EN.indexOf(installationPoints[1]);
      setFisrtData(M11_LIST[index1]);
      setSendData(M11_LIST[index2]);

      const copy1 = [...M11_LIST];
      const copy2 = [...M11_LIST];
      copy1.splice(index1, 1);
      copy2.splice(index2, 1);

      setList1(copy2);
      setList2(copy1);
    }
  }, []);
  // 버튼 활성화
  useEffect(() => {
    if (fisrtData.length > 1 && secondData.length > 1) {
      setButtonActivate(true);
    }
  }, [fisrtData, secondData]);

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
            value={fisrtData}
            name="fisrt"
            onChange={handleChange}
            IconComponent={SelectIcon}
            displayEmpty
          >
            <MenuItem value="">
              <Placeholder>충전기 종류</Placeholder>
            </MenuItem>
            {list1.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </SelectBox>
        </InputBox>
        <InputBox>
          <label>2순위</label>
          <SelectBox
            value={secondData}
            name="second"
            onChange={handleChange2}
            IconComponent={SelectIcon}
            displayEmpty
          >
            <MenuItem value="">
              <Placeholder>충전기 종류</Placeholder>
            </MenuItem>
            {list2.map((option, index) => (
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

  @media (max-width: 899pt) {
    padding-left: 15pt;
    padding-right: 15pt;
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
    margin-right: 11.25pt;
  }
`;
const SelectIcon = styled(KeyboardArrowDownIcon)`
  width: 18pt;
  height: 18pt;
  color: ${colors.dark} !important;
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
  cursor: pointer;
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
  cursor: pointer;
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
