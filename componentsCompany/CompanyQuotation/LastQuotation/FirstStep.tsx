import styled from '@emotion/styled';
import { MenuItem, Select, TextField } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { chargerData } from 'storeCompany/myQuotation';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import colors from 'styles/colors';
import { M5_CHANNEL_SET, M5_TYPE_SET } from 'assets/selectList';
import AddIcon from 'public/images/add-img.svg';
import XCircle from 'public/guide/XCircle.svg';
import Image from 'next/image';
import { inputPriceFormat } from 'utils/calculatePackage';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { chargers, finalQuotationAction } from 'storeCompany/finalQuotation';

type Props = {
  tabNumber: number;
  setTabNumber: Dispatch<SetStateAction<number>>;

  canNext: boolean;
  SetCanNext: Dispatch<SetStateAction<boolean>>;
  subscribeProduct: chargerData;
  setSubscribeProduct: Dispatch<SetStateAction<chargerData>>;
  subscribePeriod: string;
  setSubscribePeriod: Dispatch<SetStateAction<string>>;
  profitableInterestUser: string;
  setProfitableInterestUser: Dispatch<SetStateAction<string>>;
  chargePoint: string;
  setChargePoint: Dispatch<SetStateAction<string>>;
  subscribePricePerMonth: string;
  setSubscribePricePerMonth: Dispatch<SetStateAction<string>>;
  selectedOption: chargers[];
  setSelectedOption: Dispatch<SetStateAction<chargers[]>>;
  selectedOptionEn: chargers[];
  setSelectedOptionEn: Dispatch<SetStateAction<chargers[]>>;
  constructionPeriod: string;
  setConstructionPeriod: Dispatch<SetStateAction<string>>;
  dueDiligenceResult: string;
  setDueDiligenceResult: Dispatch<SetStateAction<string>>;
  subscribeProductFeature: string;
  setSubscribeProductFeature: Dispatch<SetStateAction<string>>;
};
const subScribe = ['전체구독', '부분구독'];
const subscribeType: string[] = ['24', '36', '48', '60'];

const FirstStep = ({
  tabNumber,
  setTabNumber,
  canNext,
  SetCanNext,
  subscribeProduct,
  setSubscribeProduct,
  subscribePeriod,
  setSubscribePeriod,
  profitableInterestUser,
  setProfitableInterestUser,
  chargePoint,
  setChargePoint,
  subscribePricePerMonth,
  setSubscribePricePerMonth,
  selectedOption,
  setSelectedOption,
  selectedOptionEn,
  setSelectedOptionEn,
  constructionPeriod,
  setConstructionPeriod,
  dueDiligenceResult,
  setDueDiligenceResult,
  subscribeProductFeature,
  setSubscribeProductFeature,
}: Props) => {
  const dispatch = useDispatch();
  const { companyFinalQuotationData } = useSelector(
    (state: RootState) => state,
  );
  const handleChange = (event: any, index: number) => {
    const { name, value } = event.target;
    let copy: chargers[] = [...selectedOption];
    let copyEn: chargers[] = [...selectedOptionEn];
    // 영어 값 추출
    let valueEn: string;
    // 충전기 종류
    if (name === 'kind') {
      const idx = M5_LIST.indexOf(value);
      valueEn = M5_LIST_EN[idx];
      copy[index] = {
        idx: 0,
        kind: '',
        standType: '',
        channel: '',
        count: '',
        chargePriceType: '',
        chargePrice: '',
        installationLocation: '',
        modelName: '',
        manufacturer: '',
        productFeature: '',
        chargerImageFiles: [],
        catalogFiles: [],
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
      // console.log('index -> ' + idx);
      if (value === '-') {
        valueEn = '';
      } else {
        valueEn = M6_LIST_EN[idx];
      }
      copy[index] = {
        ...copy[index],
        standType: value,
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
  // 충전기 종류 및 수량 마이너스
  const onClickMinus = (index: number) => {
    const copy = [...selectedOption];

    copy.splice(index, 1);
    setSelectedOption(copy);
    // dispatch(finalQuotationAction.removeChargeStep(index));
  };
  // 충전기 종류 및 수량 추가
  const onClickChargerAdd = () => {
    if (selectedOption.length === 5) return;
    const temp = selectedOption.concat({
      idx: 0,
      kind: '',
      standType: '',
      channel: '',
      count: '',
      chargePriceType: '',
      chargePrice: '',
      installationLocation: '',
      modelName: '',
      manufacturer: '',
      productFeature: '',
      chargerImageFiles: [],
      catalogFiles: [],
    });
    setSelectedOption(temp);
    // dispatch(finalQuotationAction.addChargeStep());
  };

  // 다음 버튼 클릭
  const buttonOnClick = () => {
    if (canNext) {
      dispatch(
        finalQuotationAction.addFirstStep({
          subscribeProduct: subscribeProduct,
          subscribePeriod: Number(subscribePeriod),
          userInvestRate: Number(profitableInterestUser),
          chargingPointRate: Number(chargePoint),
          subscribePricePerMonth: Number(
            subscribePricePerMonth.replaceAll(',', ''),
          ),
          chargers: selectedOptionEn,
          chargersKo: selectedOption,
        }),
      );

      setTabNumber(tabNumber + 1);
    }
  };

  // 유효성 검사
  useEffect(() => {
    if (
      subscribeProduct !== '' &&
      subscribePeriod !== '' &&
      profitableInterestUser !== '' &&
      chargePoint !== '' &&
      subscribePricePerMonth !== '' &&
      dueDiligenceResult !== ''
    ) {
      SetCanNext(true);
    } else {
      SetCanNext(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    subscribeProduct,
    subscribePeriod,
    profitableInterestUser,
    chargePoint,
    dueDiligenceResult,
    subscribePricePerMonth,
  ]);

  return (
    <Wrapper>
      <TopStep>
        <div>STEP 1</div>
        <div>* 필수 입력</div>
      </TopStep>
      <SubWord>
        최종 견적가 및<br />
        현장실사 결과를 입력해주세요
      </SubWord>
      <InputBox>
        <div className="withAfter">구독상품</div>
        <SelectContainer>
          <SelectBox
            value={subscribeProduct}
            onChange={(e: any) => setSubscribeProduct(e.target.value)}
            IconComponent={SelectIcon}
            displayEmpty
          >
            <MenuItem value="">
              <Placeholder>구독 종류</Placeholder>
            </MenuItem>

            {subScribe.map((el, index) => (
              <MenuItem key={index} value={el}>
                {el}
              </MenuItem>
            ))}
          </SelectBox>
        </SelectContainer>
      </InputBox>
      <InputBox>
        <div className="withAfter">구독기간</div>
        <SelectContainer>
          <SelectBox
            value={subscribePeriod}
            onChange={(e: any) => setSubscribePeriod(e.target.value)}
            IconComponent={SelectIcon}
            displayEmpty
          >
            <MenuItem value="">
              <Placeholder>구독 종류</Placeholder>
            </MenuItem>

            {subscribeType.map((el, index) => (
              <MenuItem key={index} value={el}>
                {el}
              </MenuItem>
            ))}
          </SelectBox>
        </SelectContainer>
      </InputBox>
      <InputBox>
        <div className="withAfter">수익지분</div>
        <ProfitBox>
          <FirstBox>
            <SubTitle>고객</SubTitle>
            <SmallInputBox>
              <Input
                value={profitableInterestUser}
                className="inputTextLeft"
                onChange={(e: any) => setProfitableInterestUser(e.target.value)}
                type="number"
                placeholder="0"
                name="subscribeMoney"
              />
              <div className="percent">%</div>
            </SmallInputBox>
          </FirstBox>
          <FirstBox>
            <SubTitle>Charge Point</SubTitle>
            <SmallInputBox>
              <Input
                value={chargePoint}
                className="inputTextLeft"
                onChange={(e: any) => setChargePoint(e.target.value)}
                type="number"
                placeholder="0"
                name="subscribeMoney"
              />
              <div className="percent">%</div>
            </SmallInputBox>
          </FirstBox>
        </ProfitBox>
      </InputBox>
      <InputBox>
        <div className="withAfter">월 구독료</div>
        <div className="monthFlex">
          <Input
            onChange={(e) =>
              setSubscribePricePerMonth(inputPriceFormat(e.target.value))
            }
            value={subscribePricePerMonth}
            name="subscribeMoney"
          />
          <AfterWord>원</AfterWord>
        </div>
      </InputBox>

      {/* 충전기 종류 및 수량 선택  */}
      {selectedOption?.map((item, index) => (
        <InputBox className={index > 0 ? 'marginTop' : ''} key={index}>
          <div>
            <SubTitle>
              {index === 0 && (
                <h3 className="name">충전기 종류 및 수량 선택</h3>
              )}
              {1 <= index ? (
                <div className="deleteBox">
                  <div className="x-img" onClick={() => onClickMinus(index)}>
                    <Image src={XCircle} alt="add-img" />
                  </div>
                </div>
              ) : (
                <div className="add-img" onClick={onClickChargerAdd}>
                  <Image src={AddIcon} alt="add-img" />
                </div>
              )}
            </SubTitle>
            {/* 충전기 종류 옵션 박스 */}
            <SelectBox
              value={item.kind}
              name="kind"
              onChange={(event) => handleChange(event, index)}
              IconComponent={SelectIcon}
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
                value={item.standType}
                name="standType"
                onChange={(event) => handleChange(event, index)}
                displayEmpty
                IconComponent={SelectIcon}
              >
                <MenuItem value="">
                  <Placeholder>타입</Placeholder>
                </MenuItem>
                {M5_TYPE_SET[item.idx!].map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </SelectSmall>
              <SelectSmall
                value={item.channel}
                name="channel"
                onChange={(event) => handleChange(event, index)}
                IconComponent={SelectIcon}
                displayEmpty
              >
                <MenuItem value="">
                  <Placeholder>채널</Placeholder>
                </MenuItem>
                {M5_CHANNEL_SET[item.idx!].map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </SelectSmall>
              <SelectSmall
                value={item.count}
                name="count"
                onChange={(event) => handleChange(event, index)}
                IconComponent={SelectIcon}
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
        </InputBox>
      ))}
      <InputBox>
        <div className="withAfter">공사기간</div>
        <div className="monthFlex">
          <Input
            onChange={(e) => setConstructionPeriod(e.target.value)}
            value={constructionPeriod}
            name="subscribeMoney"
          />
          <AfterWord>일</AfterWord>
        </div>
      </InputBox>
      <InputBox>
        <div className="withAfter withTextNumber">
          <span>현장실사 결과</span>
          <span>{dueDiligenceResult.length}/500</span>
        </div>
        <div className="monthFlex">
          <TextArea
            onChange={(e) => setDueDiligenceResult(e.target.value)}
            value={dueDiligenceResult}
            name="firstPageTextArea"
            placeholder="현장실사 결과를 입력해주세요."
            rows={7}
          />
        </div>
      </InputBox>
      <InputBox className="lastInputBox">
        <div className="withTextNumber">
          <span>구독상품 특장점</span>
          <span>{dueDiligenceResult.length}/500</span>
        </div>
        <div className="monthFlex">
          <TextArea
            onChange={(e) => setSubscribeProductFeature(e.target.value)}
            value={subscribeProductFeature}
            name="firstPageTextArea"
            placeholder="선택 입력 사항."
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
  /* margin-bottom: 500pt; */
  height: 100vh;
  .marginTop {
    margin-top: 55.5pt;
  }
  .lastInputBox {
    padding-bottom: 120pt;
  }
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
  position: relative;
  margin-top: 30pt;
  & > div {
    /* margin-top: ; */
  }
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
  & > .withTextNumber {
    position: relative;
    & span:nth-of-type(2) {
      position: absolute;
      right: 0;
      font-family: Spoqa Han Sans Neo;
      font-size: 9pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: right;
    }
  }
  & > .withAfter {
    position: relative;
    & span:nth-of-type(2) {
      position: absolute;
      right: 0;
      font-family: Spoqa Han Sans Neo;
      font-size: 9pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: right;
    }
  }
  & div:nth-of-type(2) {
    display: flex;
  }

  .monthFlex {
    display: flex;
    gap: 12pt;
  }
`;

const AfterWord = styled.div`
  display: flex;
  gap: 12pt;
  align-items: center;
  & div {
  }
`;

const Input = styled(TextField)`
  /* border: 0.75pt solid ${colors.gray}; */
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
  & > .MuiInputBase-root > fieldset {
    border: 1pt solid #e2e5ed !important;
    border-radius: 6pt !important;
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

const ProfitBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 39.75pt;
`;

const FirstBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: left;
  gap: 12.5175pt;
`;

const SmallInputBox = styled.div`
  display: flex;
  text-align: left;
  gap: 12.5175pt;
  .percent {
    display: flex;
    align-items: center;
  }
  .inputTextLeft {
    & input {
      text-align: center;
    }
  }
`;
const SubTitle = styled.div`
  font-family: Spoqa Han Sans Neo;
  position: relative;
  font-size: 10.5pt;
  font-weight: 500;
  line-height: 12pt;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  letter-spacing: -0.02em;
  text-align: left !important;
  .x-img {
    position: absolute;
    right: 0;
    top: -25pt;
  }
  .deleteBox {
    position: relative;
    width: 100%;
  }
  .name {
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
  }
`;
const SubTitles = styled.span`
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 500;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left !important;
`;

const SubWord = styled.div`
  margin-top: 21pt;
  font-family: Spoqa Han Sans Neo;
  font-size: 18pt;
  font-weight: 500;
  line-height: 24pt;
  letter-spacing: -0.02em;
  text-align: left;
`;

const TextArea = styled.textarea`
  resize: none;
  border: 1px solid ${colors.gray};
  width: 100%;
  padding: 12pt;
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

const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8.25pt;
`;
const SelectBox = styled(Select)`
  width: 100%;
  height: 100%;
  border: 1px solid #e2e5ed;
  border-radius: 8px;
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
    margin-right: 12pt;
  }
`;
const Placeholder = styled.em`
  font-weight: 400;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.lightGray3};
`;
const SelectIcon = styled(KeyboardArrowDownIcon)`
  width: 18pt;
  height: 18pt;
  color: ${colors.dark} !important;
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
  }
  & svg {
    margin-right: 12pt;
  }
  & fieldset {
    border: none;
  }
`;

export default FirstStep;
