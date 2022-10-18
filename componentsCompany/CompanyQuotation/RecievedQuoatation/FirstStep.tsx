import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import colors from 'styles/colors';

type Props = {
  tabNumber: number;
  setTabNumber: Dispatch<SetStateAction<number>>;
  monthlySubscribePrice: string;
  setMonthleSubscribePrice: Dispatch<SetStateAction<string>>;
  constructionPeriod: string;
  setConstructionPeriod: Dispatch<SetStateAction<string>>;
  firstPageTextArea: string;
  setFirstPageTextArea: Dispatch<SetStateAction<string>>;
  canNext: boolean;
  SetCanNext: Dispatch<SetStateAction<boolean>>;
};

const FirstStep = ({
  tabNumber,
  setTabNumber,
  monthlySubscribePrice,
  setMonthleSubscribePrice,
  constructionPeriod,
  setConstructionPeriod,
  firstPageTextArea,
  setFirstPageTextArea,
  canNext,
  SetCanNext,
}: Props) => {
  useEffect(() => {
    if (monthlySubscribePrice !== '' && constructionPeriod !== '') {
      SetCanNext(true);
    } else if (monthlySubscribePrice === '' && constructionPeriod === '') {
      SetCanNext(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthlySubscribePrice, constructionPeriod]);

  const buttonOnClick = () => {
    setTabNumber(tabNumber + 1);
  };

  return (
    <Wrapper>
      <TopStep>
        <div>STEP 1</div>
        <div>* 필수 입력</div>
      </TopStep>
      <SubWord>월 구독료와 특장점을 입력해주세요.</SubWord>
      <InputBox>
        <div className="withAfter">월 구독료</div>
        <div>
          <Input
            onChange={(e) => setMonthleSubscribePrice(e.target.value)}
            value={monthlySubscribePrice}
            name="subscribeMoney"
          />
          <div>원</div>
        </div>
      </InputBox>
      <InputBox>
        <div className="withAfter">공사기간</div>
        <div>
          <Input
            onChange={(e) => setConstructionPeriod(e.target.value)}
            value={constructionPeriod}
            name="constructionPeriod"
          />
          <div>일</div>
        </div>
      </InputBox>
      <InputBox>
        <div>구독상품 특장점</div>
        <div>
          <TextArea
            onChange={(e) => setFirstPageTextArea(e.target.value)}
            value={firstPageTextArea}
            name="firstPageTextArea"
            placeholder="선택 입력사항"
            rows={5}
          />
        </div>
      </InputBox>
      <Btn
        buttonActivate={canNext}
        tabNumber={tabNumber}
        onClick={buttonOnClick}
      >
        다음
      </Btn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  box-sizing: border-box;
  padding-bottom: 45pt;
  height: 100vh;
`;

const TopStep = styled.div`
  margin-top: 24pt;
  display: flex;
  justify-content: space-between;
  & div:first-of-type {
    font-family: Spoqa Han Sans Neo;
    font-size: 15pt;
    font-weight: 500;
    line-height: 21pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: ${colors.main};
  }
  & div:nth-of-type(2) {
    font-family: Spoqa Han Sans Neo;
    font-size: 9pt;
    font-weight: 500;
    line-height: 10.5pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

const InputBox = styled.div`
  display: flex;
  gap: 9pt;
  flex-direction: column;
  margin-top: 30pt;
  & > div:first-of-type {
    font-family: Spoqa Han Sans Neo;
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
  & > .withAfter::after {
    content: ' *';
    margin-left: 1pt;
    color: #f75015;
  }
  & div:nth-of-type(2) {
    display: flex;
    gap: 12pt;
    align-items: center;
    & div {
    }
  }
`;

const Input = styled(TextField)`
  border: 0.75pt solid ${colors.gray};
  border-radius: 6pt;
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

const SubWord = styled.div`
  margin-top: 6pt;
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 400;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: left;
`;

const TextArea = styled.textarea`
  resize: none;
  border: 1px solid ${colors.gray};
  width: 100%;
  padding: 12pt;
  margin-top: 9pt;
  border-radius: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 12pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  &::placeholder {
    color: #caccd1;
  }
`;

const Btn = styled.div<{ buttonActivate: boolean; tabNumber?: number }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  color: ${colors.lightWhite};
  padding: 15pt 0 39pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-top: 30pt;
  cursor: pointer;
  background-color: ${({ buttonActivate }) =>
    buttonActivate ? colors.main : colors.blue3};
`;

export default FirstStep;
//
