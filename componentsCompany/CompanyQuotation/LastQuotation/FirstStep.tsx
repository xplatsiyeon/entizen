import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
import colors from 'styles/colors';
import { M5_CHANNEL_SET, M5_TYPE_SET } from 'assets/selectList';
import AddIcon from 'public/images/add-img2.svg';
import XCircle from 'public/guide/XCircle.svg';
import Image from 'next/image';
import { commaInputLastFocus, inputPriceFormat } from 'utils/calculatePackage';
import { chargers } from 'storeCompany/finalQuotation';
import SelectComponents from 'components/Select';
import { SentRequestResponse } from '../SentQuotation/SentProvisionalQuoatation';

type Props = {
  isHomePercent: boolean;
  setIsHomePercent: Dispatch<SetStateAction<boolean>>;
  tabNumber: number;
  setTabNumber: Dispatch<SetStateAction<number>>;
  canNext: boolean;
  SetCanNext: Dispatch<SetStateAction<boolean>>;
  subscribeProduct: string;
  setSubscribeProduct: Dispatch<SetStateAction<string>>;
  subscribePeriod: string;
  setSubscribePeriod: Dispatch<SetStateAction<string>>;
  userInvestRate: string;
  setUserInvestRate: Dispatch<SetStateAction<string>>;
  companyInvestRate: string;
  setCompanyInvestRate: Dispatch<SetStateAction<string>>;
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
  setChargeNum: React.Dispatch<React.SetStateAction<number>>;
  chargeNum?: number;
  sendData: SentRequestResponse;
  partSubscribe?: string;
  chargingStationInstallationPrice: string;
  setChargingStationInstallationPrice: Dispatch<SetStateAction<string>>;
};
const subScribe = ['전체구독', '부분구독'];

const subscribeType: string[] = ['24 개월', '36 개월', '48 개월', '60 개월'];
const FirstStep = ({
  isHomePercent,
  setIsHomePercent,
  tabNumber,
  setTabNumber,
  canNext,
  SetCanNext,
  subscribeProduct,
  setSubscribeProduct,
  subscribePeriod,
  setSubscribePeriod,
  userInvestRate,
  setUserInvestRate,
  companyInvestRate,
  setCompanyInvestRate,
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
  setChargeNum,
  chargeNum,
  sendData,
  partSubscribe,
  chargingStationInstallationPrice,
  setChargingStationInstallationPrice,
}: Props) => {
  console.log('🔥 selectedOption : ', selectedOption);
  const [isChangePoint, setIsChangePoint] = useState(false);
  // 셀렉터 옵션 체인지
  const handleSelectBox = (value: string, name: string, index: number) => {
    let copy: chargers[] = [...selectedOption];
    let copyEn: chargers[] = [...selectedOptionEn];
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
  // 충전기 종류 및 수량 마이너스
  const onClickMinus = (index: number) => {
    const copy = [...selectedOption];
    const copyEn = [...selectedOptionEn];
    copy.splice(index, 1);
    copyEn.splice(index, 1);
    setSelectedOption(copy);
    setSelectedOptionEn(copyEn);
    // dispatch(finalQuotationAction.removeChargeStep(index));
  };
  // 충전기 종류 및 수량 추가
  const onClickChargerAdd = () => {
    if (selectedOptionEn.length === 5) return;
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
    const tempEn = selectedOptionEn.concat({
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
    // console.log(selectedOption);
    // console.log(selectedOptionEn);

    setSelectedOption(temp);
    setSelectedOptionEn(tempEn);
  };
  // 구독상품 온체인지
  const handleChangeProduct = (value: string) => {
    if (value === '부분구독') {
      setUserInvestRate('100');
      setCompanyInvestRate('0');
    }
    setSubscribeProduct(value);
  };
  // 구독기간 온체인지
  const handleChangePeriod = (value: string) => {
    setSubscribePeriod(value);
  };
  const onChangeProfitableInterestUser = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: Dispatch<SetStateAction<string>>,
    opponentState: string,
    setOpponentState: Dispatch<SetStateAction<string>>,
  ) => {
    const str = e.target.value.replace(/[^0-9]/g, '');
    // const valueNum = Number(e.target.value);
    const valueNum = Number(str);
    const opponentNum = Number(opponentState);
    const targetResult = 100 - valueNum;
    const valueResult = 100 - opponentNum;

    if (e.currentTarget.value === '-') {
      setOpponentState('-');
      setState('-');
    } else {
      if (valueNum + opponentNum !== 100) {
        if (targetResult <= 100 && targetResult > -1) {
          setOpponentState(targetResult.toString());
        }
      } else {
        if (valueResult <= 100 && valueResult > -1) {
          setState(valueResult.toString());
        }
      }
      setState(str);
    }
  };

  // 다음 버튼 클릭
  const buttonOnClick = () => {
    // console.log('check');
    if (canNext) {
      setTabNumber(tabNumber + 1);
    }
  };

  // 페이지 이동시 스크롤 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tabNumber]);

  // 유효성 검사
  useEffect(() => {
    if (
      subscribeProduct === '부분구독' &&
      chargingStationInstallationPrice === ''
    ) {
      SetCanNext(false);
      return;
    }
    if (
      subscribeProduct !== '' &&
      subscribePeriod !== '' &&
      userInvestRate !== '' &&
      companyInvestRate !== '' &&
      subscribePricePerMonth !== '' &&
      dueDiligenceResult !== '' &&
      selectedOption.filter((e) => {
        return !e.kind || !e.channel || !e.count || !e.standType;
      }).length === 0
    ) {
      SetCanNext(true);
    } else {
      SetCanNext(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedOption,
    subscribeProduct,
    subscribePeriod,
    userInvestRate,
    companyInvestRate,
    dueDiligenceResult,
    subscribePricePerMonth,
    chargingStationInstallationPrice,
  ]);

  // 수익 지분 100% 맞춰 주는 업데이트 useEffect
  useEffect(() => {
    console.log(userInvestRate);
    console.log(companyInvestRate);
  }, [userInvestRate, companyInvestRate]);
  // 충전기 개수
  useEffect(() => {
    const num = selectedOption.length;
    if (chargeNum !== undefined) {
      setChargeNum(3 + num - 1);
    }
  }, [selectedOption.length]);

  console.log('🔥 isHomePercent : ', isHomePercent);

  return (
    <WebRapper>
      <Wrapper>
        <TopStep>
          <div className="step">STEP 1</div>
          <span className="important">
            <span className="redColor">*</span> 필수 입력
          </span>
        </TopStep>
        <SubWord>
          최종 견적가 및<br />
          현장실사 결과를 입력해주세요
        </SubWord>
        <InputBox>
          <div className="withAfter">구독상품</div>
          <SelectContainer>
            <SelectComponents
              value={subscribeProduct}
              option={subScribe}
              placeholder="구독 종류"
              onClickEvent={handleChangeProduct}
            />
          </SelectContainer>
        </InputBox>
        <InputBox>
          <div className="withAfter">구독기간</div>
          <SelectContainer>
            <SelectComponents
              value={
                subscribePeriod?.includes('개월')
                  ? subscribePeriod
                  : `${subscribePeriod} 개월`
              }
              option={subscribeType}
              placeholder="구독 기간"
              onClickEvent={handleChangePeriod}
            />
          </SelectContainer>
        </InputBox>
        <InputBox>
          <div className="withAfter">수익지분</div>
          <ProfitBox>
            <FirstBox>
              <SubTitle>고객</SubTitle>
              <SmallInputBox>
                <Input
                  isHomePercent={isHomePercent}
                  value={
                    isHomePercent === true
                      ? '-'
                      : userInvestRate[0] !== '0'
                      ? userInvestRate
                      : userInvestRate.replace(/(^0+)/, '')
                  }
                  className="inputText inputTextLeft"
                  onChange={(event) => {
                    onChangeProfitableInterestUser(
                      event,
                      setUserInvestRate,
                      companyInvestRate,
                      setCompanyInvestRate,
                    );
                  }}
                  type="text"
                  placeholder={isHomePercent ? '-' : '0'}
                  name="subscribeMoney"
                  InputProps={{
                    readOnly: isHomePercent || subscribeProduct === '부분구독',
                  }}
                />
                <Percent>%</Percent>
              </SmallInputBox>
            </FirstBox>
            <FirstBox>
              <SubTitle>
                {
                  sendData?.sendQuotationRequest?.companyMemberAdditionalInfo
                    ?.companyName!
                }
              </SubTitle>
              <SmallInputBox>
                <Input
                  isHomePercent={isHomePercent}
                  value={
                    isHomePercent === true
                      ? '-'
                      : companyInvestRate[0] !== '0'
                      ? companyInvestRate
                      : companyInvestRate.replace(/(^0+)/, '')
                  }
                  className="inputText inputTextRight"
                  onChange={(event) => {
                    onChangeProfitableInterestUser(
                      event,
                      setCompanyInvestRate,
                      userInvestRate,
                      setUserInvestRate,
                    );
                  }}
                  type="text"
                  placeholder={isHomePercent ? '-' : '0'}
                  name="subscribeMoney"
                  InputProps={{
                    readOnly: isHomePercent || subscribeProduct === '부분구독',
                  }}
                />
                <Percent>%</Percent>
              </SmallInputBox>
            </FirstBox>
          </ProfitBox>
        </InputBox>
        {(partSubscribe === 'PART' || subscribeProduct === '부분구독') && (
          <PartSubscribeVisible subscribeProduct={subscribeProduct}>
            <InputBox>
              <div className="withAfter">충전소 설치비</div>
              <div className="monthFlex">
                <Input
                  onMouseDown={commaInputLastFocus}
                  onChange={(e) => {
                    if (e.target.value[0] !== '0') {
                      setChargingStationInstallationPrice(
                        inputPriceFormat(e.target.value),
                      );
                    } else if (
                      e.target.value.length > 1 &&
                      e.target.value[0] === '0'
                    ) {
                      setChargingStationInstallationPrice(
                        inputPriceFormat(e.target.value.replace(/(^0+)/, '')),
                      );
                    }
                  }}
                  value={chargingStationInstallationPrice}
                  name="chargeInstall"
                />
                <AfterWord>
                  <span>원</span>
                </AfterWord>
              </div>
            </InputBox>
          </PartSubscribeVisible>
        )}
        <InputBox>
          <div className="withAfter">월 구독료</div>
          <div className="monthFlex">
            <Input
              // onFocus={commaInputLastFocus}
              onMouseDown={commaInputLastFocus}
              onChange={(e) => {
                // console.log('월구독료 길이', e.target.value.length);
                if (e.target.value[0] !== '0') {
                  setSubscribePricePerMonth(inputPriceFormat(e.target.value));
                } else if (
                  e.target.value.length > 1 &&
                  e.target.value[0] === '0'
                ) {
                  setSubscribePricePerMonth(
                    inputPriceFormat(e.target.value.replace(/(^0+)/, '')),
                  );
                } else if (
                  e.target.value.length === 1 &&
                  e.target.value[0] === '0'
                ) {
                  setSubscribePricePerMonth(inputPriceFormat(e.target.value));
                }
              }}
              value={subscribePricePerMonth}
              name="subscribeMoney"
            />
            <AfterWord>
              <span>원</span>
            </AfterWord>
          </div>
        </InputBox>

        {/* 충전기 종류 및 수량 선택  */}
        {selectedOption?.map((item, index) => (
          <WebInputBox>
            <InputBox className={index > 0 ? 'marginTop' : ''} key={index}>
              <div>
                <SubTitle>
                  {index === 0 && (
                    <h3 className="name">충전기 종류 및 수량 선택</h3>
                  )}
                  {1 <= index ? (
                    <div className="deleteBox">
                      <div
                        className="x-img"
                        style={{ cursor: 'pointer' }}
                        onClick={() => onClickMinus(index)}
                      >
                        <Image src={XCircle} alt="add-img" />
                      </div>
                    </div>
                  ) : (
                    <div
                      className="add-img"
                      style={{ cursor: 'pointer' }}
                      onClick={onClickChargerAdd}
                    >
                      <Image src={AddIcon} alt="add-img" />
                    </div>
                  )}
                </SubTitle>
                <SelectComponents
                  value={item.kind}
                  option={M5_LIST}
                  name="kind"
                  placeholder="충전기 종류"
                  index={index}
                  onClickCharger={handleSelectBox}
                />
                {/* 타입,채널,수량 옵션 박스 */}
                <SelectComponentsContainer>
                  <SelectComponents
                    value={item.standType}
                    option={M5_TYPE_SET[item.idx!]}
                    name="standType"
                    placeholder="타입"
                    index={index}
                    onClickCharger={handleSelectBox}
                    fontSize={'small'}
                  />
                  <SelectComponents
                    value={item.channel}
                    option={M5_CHANNEL_SET[item.idx!]}
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
            </InputBox>
          </WebInputBox>
        ))}
        <InputBox>
          <div className="withAfter">공사기간</div>
          <div className="monthFlex">
            <Input
              onChange={(e) => {
                if (e.target.value[0] !== '0') {
                  setConstructionPeriod(e.target.value);
                } else if (
                  e.target.value.length > 1 &&
                  e.target.value[0] === '0'
                ) {
                  setConstructionPeriod(e.target.value.replace(/(^0+)/, ''));
                }
              }}
              value={constructionPeriod}
              name="subscribeMoney"
            />
            <AfterWord>
              <span>일</span>
            </AfterWord>
          </div>
        </InputBox>
        <InputBox>
          <div className="withAfter withTextNumber">
            <span>현장실사 결과</span>
            <span className="textLength">{dueDiligenceResult?.length}/500</span>
          </div>
          <div className="monthFlex">
            <TextArea
              onChange={(e) => setDueDiligenceResult(e.target.value)}
              value={dueDiligenceResult}
              name="firstPageTextArea"
              placeholder="현장실사 결과를 입력해주세요."
              rows={7}
              maxLength={500}
            />
          </div>
        </InputBox>
        <InputBox className="lastInputBox">
          <div className="withTextNumber">
            <span>구독상품 특장점</span>
            <span className="textLength">
              {subscribeProductFeature?.length!}/500
            </span>
          </div>
          <div className="monthFlex">
            <TextArea
              onChange={(e) => setSubscribeProductFeature(e.target.value)}
              value={subscribeProductFeature}
              name="firstPageTextArea"
              placeholder="선택 입력 사항."
              rows={5}
              maxLength={500}
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
    </WebRapper>
  );
};

const Wrapper = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  box-sizing: border-box;
  height: 100vh;
  .marginTop {
    margin-top: 55.5pt;
  }
  .lastInputBox {
    margin-bottom: 120pt;
    padding-bottom: 100pt;
    @media (min-width: 900pt) {
      padding-bottom: 0;
    }
  }
  @media (min-width: 900pt) {
    padding-left: 25pt;
    padding-right: 25pt;
    height: auto;
  }
`;
const TopStep = styled.div`
  margin-top: 24pt;
  display: flex;
  justify-content: space-between;
  color: #222222;
  & div:first-of-type {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 15pt;
    font-weight: 500;
    line-height: 21pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: ${colors.main};
  }
  & div:nth-of-type(2) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 9pt;
    font-weight: 500;
    line-height: 10.5pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
  @media (min-width: 900pt) {
    padding-top: 50pt;
    .step {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 18pt;
      font-weight: 500;
      line-height: 24pt;
      letter-spacing: -0.02em;
      text-align: left;
      color: ${colors.main};
    }
  }
  .important {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 9pt;
    font-weight: 500;
    line-height: 10.5pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #222222;
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 10.5pt;
      font-weight: 500;
      line-height: 10.5pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }
  .redColor {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 9pt;
    font-weight: 500;
    line-height: 10.5pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #f75015;
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 10.5pt;
      font-weight: 500;
      line-height: 10.5pt;
      letter-spacing: -0.02em;
      text-align: left;
      color: #f75015;
    }
  }
`;
const InputBox = styled.div`
  display: flex;
  gap: 9pt;
  flex-direction: column;
  position: relative;
  margin-top: 30pt;
  @media (min-width: 900pt) {
    gap: 12pt;
  }
  & > div {
  }
  & > div:first-of-type {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #222222;
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 15pt;
      font-weight: 700;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
      color: #222222;
    }
    .textLength {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 9pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: right;
      color: #222222;
      @media (min-width: 900pt) {
        font-family: 'Spoqa Han Sans Neo';
        font-size: 10.5pt;
        font-weight: 500;
        line-height: 10.5pt;
        letter-spacing: -0.02em;
        text-align: right;
      }
    }
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
      font-family: 'Spoqa Han Sans Neo';
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
      font-family: 'Spoqa Han Sans Neo';
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

const PartSubscribeVisible = styled.div<{ subscribeProduct: string }>`
  display: ${({ subscribeProduct }) =>
    subscribeProduct !== '부분구독' ? 'none' : ''};
`;

const WebInputBox = styled.div``;
const AfterWord = styled.div`
  display: flex;
  gap: 12pt;
  align-items: center;
  & div {
  }

  span {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: right;
    color: #222222;
  }
`;
const Input = styled(TextField)<{ isHomePercent?: boolean }>`
  & input {
    padding: 10.885pt 0 10.885pt 12pt;
    text-align: right;
    font-weight: 500;
    font-size: 12pt;
    line-height: 12pt;
    color: ${({ isHomePercent }) => isHomePercent === true && '#caccd1'};
  }
  /* border: 0.75pt solid ${colors.gray}; */
  border-radius: 6pt;
  width: 100%;
  outline: none;
  .MuiOutlinedInput-root {
    &:hover fieldset {
      border: 0.75pt solid #e2e5ed;
    }
    &.Mui-focused fieldset {
      border: 0.75pt solid #5221cb;
    }
  }
  .MuiOutlinedInput-notchedOutline {
    border: 0.75pt solid #e2e5ed;
  }

  /* & fieldset {
    border: 0.75pt solid ${colors.gray};
  } */
  & .MuiInputBase-root {
    padding-right: 9pt;
    /* @media (min-width: 900pt) {
      width: 512.25pt;
    } */
  }
  ::placeholder {
    /* color: ${colors.gray}; */
    color: #caccd1;
    font-weight: 500;
    font-family: 'Spoqa Han Sans Neo';
    @media (min-width: 900pt) {
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
    }
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
  @media (min-width: 900pt) {
    gap: 75pt;
  }
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
    @media (min-width: 900pt) {
      width: 202.5pt;
    }
    & input {
      text-align: center;
    }
  }
  .inputTextRight {
    @media (min-width: 900pt) {
      width: 202.5pt;
    }
    & input {
      text-align: center;
    }
  }
`;
const SubTitle = styled.div`
  font-family: 'Spoqa Han Sans Neo';
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
  color: #222222;
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
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
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #222222;
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 15pt;
      font-weight: 700;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
      padding-bottom: 12pt;
    }
    &::after {
      content: ' *';
      margin-left: 1pt;
      color: #f75015;
    }
  }
`;
const SubWord = styled.div`
  margin-top: 21pt;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 18pt;
  font-weight: 500;
  line-height: 24pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #222222;
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
  :focus {
    border: 0.75pt solid #5221cb;
    font-weight: 400;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 400;
    line-height: 19.5pt;
    letter-spacing: -0.02em;
    text-align: left;
    @media (max-width: 899.25pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 400;
      line-height: 18pt;
      letter-spacing: -0.02em;
      text-align: left;
      color: #222222;
    }
  }
`;
const Btn = styled.div<{ buttonActivate: boolean; tabNumber?: number }>`
  font-family: 'Spoqa Han Sans Neo';
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
  @media (min-width: 900pt) {
    padding: 15pt 0;
    border-radius: 8pt;
    position: static;
    margin: 0 auto;
    margin-top: -15%;
    margin-bottom: 40.5pt;
  }
`;
const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8.25pt;
`;
const SelectComponentsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 9pt;
  gap: 9pt;
`;

const WebRapper = styled.div`
  @media (min-width: 900pt) {
    height: 100%;
    width: 580.5pt;
    background-color: #ffffff;
    box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
    border-radius: 12pt;
    margin-bottom: 54pt;
    margin-top: -2.1%;
  }
`;

const Percent = styled.span`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 500;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: right;
  color: #3e3a39;
  padding-top: 15pt;
`;
export default FirstStep;
