import styled from '@emotion/styled';
import { EditSharp } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { myEstimateAction } from 'storeCompany/myQuotation';
import colors from 'styles/colors';
import { inputPriceFormat } from 'utils/calculatePackage';
import { SentRequestResponse } from '../SentQuotation/SentProvisionalQuoatation';

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
  editData: SentRequestResponse;
  partSubscribe?: string;
  chargingStationInstallationPrice: string;
  setChargingStationInstallationPrice: Dispatch<SetStateAction<string>>;
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
  editData,
  partSubscribe,
  chargingStationInstallationPrice,
  setChargingStationInstallationPrice,
}: Props) => {
  console.log(partSubscribe);

  const dispatch = useDispatch();
  const router = useRouter();
  // 글자수 변환
  const [textLength, setTextLength] = useState<number>(0);

  useEffect(() => {
    if (monthlySubscribePrice !== '' && constructionPeriod !== '') {
      SetCanNext(true);
    } else {
      SetCanNext(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthlySubscribePrice, constructionPeriod]);

  // 다음 버튼 클릭
  const buttonOnClick = () => {
    if (canNext) {
      dispatch(
        myEstimateAction.addFisrtData({
          chargingStationInstallationPrice: Math.floor(
            Number(chargingStationInstallationPrice?.replaceAll(',', '')),
          ),
          subscribePricePerMonth: Math.floor(
            Number(monthlySubscribePrice?.replaceAll(',', '')),
          ),
          constructionPeriod: Math.floor(
            Number(constructionPeriod?.replaceAll(',', '')),
          ),
          subscribeProductFeature: firstPageTextArea,
        }),
      );
      setTabNumber(tabNumber + 1);
    }
  };

  // 수정하기
  useEffect(() => {
    if (editData) {
      const { preQuotation } = editData?.sendQuotationRequest;
      console.log(`👀 수정하기 가견적 데이터 확인 ~81 ->> `);
      console.log(preQuotation);
      setChargingStationInstallationPrice(
        preQuotation?.chargingStationInstallationPrice?.toString(),
      );
      setMonthleSubscribePrice(
        preQuotation?.subscribePricePerMonth?.toString(),
      );
      setConstructionPeriod(preQuotation?.constructionPeriod?.toString());
      setFirstPageTextArea(preQuotation?.subscribeProductFeature!);
      setTextLength(preQuotation?.subscribeProductFeature!.length);
    }
  }, [editData]);

  console.log('textLength', textLength);

  // 페이지 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tabNumber]);

  return (
    <Wrapper>
      <TopStep>
        <div>STEP 1</div>
        <div>* 필수 입력</div>
      </TopStep>
      <SubWord>월 구독료와 특장점을 입력해주세요.</SubWord>
      {/* 부분구독은 충전기 설치비 추가로 생겨야함 */}
      {(partSubscribe === 'PART' || router.query.part === 'true') && (
        <InputBox>
          <div className="withAfter">충전소 설치비</div>
          <div>
            <Input
              onChange={(e) =>
                setChargingStationInstallationPrice(
                  inputPriceFormat(e.target.value),
                )
              }
              value={chargingStationInstallationPrice}
              name="chargeInstall"
            />
            <div>원</div>
          </div>
        </InputBox>
      )}
      <InputBox>
        <div className="withAfter">월 구독료</div>
        <div>
          <Input
            onChange={(e) =>
              setMonthleSubscribePrice(inputPriceFormat(e.target.value))
            }
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
      <InputBox2>
        <TextFlex>
          <div>구독상품 특장점</div>
          <div>
            {textLength}
            /500
          </div>
        </TextFlex>
        <div>
          <TextArea
            onChange={(e) => {
              setFirstPageTextArea(e.target.value);
              setTextLength(e.target.value.length);
            }}
            value={firstPageTextArea}
            name="firstPageTextArea"
            placeholder="선택 입력사항"
            rows={5}
          />
        </div>
      </InputBox2>
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
  @media (min-width: 900pt) {
    height: auto;
    padding-left: 25pt;
    padding-right: 25pt;
  }
  @media (max-width: 899.25pt) {
    padding-top: 20pt;
  }
`;

const TopStep = styled.div`
  margin-top: 24pt;
  display: flex;
  justify-content: space-between;
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
  }
`;

const InputBox = styled.div`
  display: flex;
  gap: 9pt;
  flex-direction: column;
  margin-top: 30pt;

  & > div:first-of-type {
    font-family: 'Spoqa Han Sans Neo';
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

const InputBox2 = styled.div`
  display: flex;
  gap: 9pt;
  flex-direction: column;
  margin-top: 30pt;
  @media (max-width: 899.25pt) {
    padding-bottom: 100pt;
  }
  & > div:first-of-type {
    font-family: 'Spoqa Han Sans Neo';
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
  & fieldset {
    border: 0.75pt solid ${colors.gray};
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
  font-family: 'Spoqa Han Sans Neo';
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
  @media (min-width: 900pt) {
    margin: 0 auto;
    padding: 15pt 0 30pt 0;
    height: 42pt;
    position: relative;
    border-radius: 6pt;
    margin-top: 20pt;
  }
`;

const TextFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default FirstStep;
