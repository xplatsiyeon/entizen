import styled from '@emotion/styled';
import { MenuItem, Select, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import colors from 'styles/colors';
import CompanyHeader from './\bHeader';

type Props = {};

const ProductAddComponent = (props: Props) => {
  const router = useRouter();

  // 임시 데이터
  const chargerData: string[] = [
    'LECS-007ADE',
    'LECS-006ADE',
    'LECS-005ADE',
    'LECS-004ADE',
  ];

  // 모델명
  const [modelName, setModelName] = useState<string>('');

  // 상단 확인버튼 function
  const handleCheckClick = () => {
    router.push('/company/myProductList');
  };

  return (
    <>
      {/* 헤더 */}
      <CompanyHeader
        back={true}
        title={'제품 추가하기'}
        check={true}
        handleCheckClick={handleCheckClick}
      />
      {/* 인풋 바디 */}
      <InputContainer>
        <InputBox>
          <LabelBox>
            <RequiredLabel>모델명</RequiredLabel>
            <RightLabel>필수 입력</RightLabel>
          </LabelBox>
          <Input
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            required
          />
        </InputBox>
        <InputBox>
          <LabelBox>
            <RequiredLabel>충전기 종류</RequiredLabel>
          </LabelBox>
          <SelectBox
            //   value={item.kind}
            placeholder="충전기 종류"
            name="kind"
            //   onChange={(event) => handleChange(event, index)}
            IconComponent={() => <SelectIcon />}
            displayEmpty
          >
            <MenuItem value="">
              <Placeholder>충전기 종류</Placeholder>
            </MenuItem>

            {chargerData.map((el, index) => (
              <MenuItem key={index} value={el}>
                {el}
              </MenuItem>
            ))}
          </SelectBox>
        </InputBox>
        <InputBox>
          <LabelBox>
            <RequiredLabel>충전 채널</RequiredLabel>
          </LabelBox>
          <Input />
        </InputBox>
        <InputBox>
          <LabelBox>
            <RequiredLabel>충전 방식</RequiredLabel>
          </LabelBox>
          <Input />
        </InputBox>
        <InputBox>
          <LabelBox>
            <RequiredLabel>제조사</RequiredLabel>
          </LabelBox>
          <Input />
        </InputBox>
      </InputContainer>
    </>
  );
};

const InputContainer = styled.div`
  margin-top: 11.25pt;
  padding-left: 15pt;
  padding-right: 15pt;
`;

const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 9pt;
  margin-bottom: 24pt;
`;

const LabelBox = styled.div``;

//  별 붙은 필수 요소 라벨
const RequiredLabel = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  &::after {
    content: ' *';
    margin-left: 1pt;
    color: #f75015;
  }
`;

const RightLabel = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 9pt;
  font-weight: 500;
  line-height: 10.5pt;
  letter-spacing: -0.02em;
  text-align: left;
  position: absolute;
  right: 0;
  top: 0;
  &::before {
    content: '* ';
    margin-left: 1pt;
    color: #f75015;
  }
`;

const Input = styled(TextField)`
  width: 100%;
  & input {
    padding: 10.885pt 0 10.885pt 12pt;
    text-align: right;
    font-weight: 500;
    font-size: 12pt;
    line-height: 12pt;
  }
  & .MuiInputBase-root {
    padding-right: 9pt;
  }
  ::placeholder {
    color: ${colors.gray};
    font-weight: 500;
  }
  & .remove {
    display: none;
  }
  :focus > .remove {
    display: block;
  }
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
    padding-top: 10.135pt;
    padding-bottom: 10.135pt;
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

export default ProductAddComponent;
