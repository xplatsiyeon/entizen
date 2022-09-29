import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import colors from 'styles/colors';
import Arrow from 'public/guide/Arrow.svg';
import SliderSizes from './slider';
import { useDispatch } from 'react-redux';
import { quotationAction } from 'store/quotationSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

interface Props {
  setTabNumber: Dispatch<SetStateAction<number>>;
  tabNumber: number;
}

const SecondStep = ({ tabNumber, setTabNumber }: Props) => {
  const dispatch = useDispatch();
  const { subscribeProduct, investRate } = useSelector(
    (state: RootState) => state.quotationData,
  );
  const [value, setValue] = useState(50);
  const [disabled, setDisabled] = useState(true);
  const [buttonActivate, setButtonActivate] = useState<boolean>(false);
  const [subscribeNumber, setSubscribeNumber] = useState(-1);
  const subscribeType: any[] = ['전체구독', '부분구독'];

  // 이전
  const HandlePrevBtn = () => {
    if (tabNumber > 0) setTabNumber(tabNumber - 1);
  };

  // 다음버튼
  const HandleNextBtn = () => {
    if (buttonActivate) {
      // 전체 구독
      if (subscribeNumber === 0) {
        dispatch(
          quotationAction.setStep2({
            subscribeProduct: 'ENTIRETY',
            investRate: value.toString(),
          }),
        );
      }
      // 부분 구독
      if (subscribeNumber === 1) {
        dispatch(
          quotationAction.setStep2({
            subscribeProduct: 'PART',
            investRate: '',
          }),
        );
      }
      setTabNumber(tabNumber + 1);
    }
  };

  useEffect(() => {
    setButtonActivate(false);
    // 전체 구독
    if (subscribeNumber === 0) {
      if (!disabled) {
        setButtonActivate(true);
      }
    }
    // 부분 구독
    if (subscribeNumber === 1) {
      setButtonActivate(true);
    }
  }, [subscribeNumber, disabled]);

  // 데이터 기억
  useEffect(() => {
    if (subscribeProduct === 'ENTIRETY') {
      setSubscribeNumber(0);
      setValue(parseInt(investRate!));
      setDisabled(false);
    } else if (subscribeProduct === 'PART') setSubscribeNumber(1);
  }, []);

  return (
    <Wrraper>
      <Title>구독상품을 선택해주세요</Title>
      <SubTitle>구독상품 선택</SubTitle>
      <TypeBox>
        {subscribeType.map((type, index) => (
          <Tab
            key={index}
            idx={index.toString()}
            subscribeNumber={subscribeNumber.toString()}
            onClick={() => setSubscribeNumber(index)}
          >
            {type}
          </Tab>
        ))}
      </TypeBox>
      <Notice pt={15}>
        전체구독: 충전기 + 운영서비스 구독 <br />
        부분구독: 운영서비스 구독 (충전기는 일시불 구매)
      </Notice>
      <SubTitle>희망하는 수익지분을 선택해주세요.</SubTitle>
      <Notice pt={6}>* 선택하신 수익지분에 따라 구독료가 상승해요.</Notice>

      <SubTitleBox>
        <SubTitle>내 수익/투자</SubTitle>
        <SubTitle>판매자</SubTitle>
      </SubTitleBox>
      {/* slider  */}
      {subscribeNumber !== 1 ? (
        <SliderBox>
          <SliderSizes
            value={value}
            setValue={setValue}
            disabled={disabled}
            setDisabled={setDisabled}
          />
        </SliderBox>
      ) : (
        <Notice pt={15}>* 홈 충전기는 수익지분과 무관한 상품입니다.</Notice>
      )}
      <ChargeGuide>
        <span className="text">구독 가이드</span>
        <div className="arrow-icon">
          <Image src={Arrow} alt="arrow_icon" />
        </div>
      </ChargeGuide>
      <TwoBtn>
        <PrevBtn onClick={HandlePrevBtn}>이전</PrevBtn>
        <NextBtn buttonActivate={buttonActivate} onClick={HandleNextBtn}>
          다음
        </NextBtn>
      </TwoBtn>
    </Wrraper>
  );
};

export default SecondStep;
const SliderBox = styled.div`
  padding: 0 3pt;
`;
const Wrraper = styled.div`
  position: relative;
  padding-bottom: 96pt;
  padding: 0 15pt;
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
const SubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 45pt;
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const TypeBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 11.25pt;
  padding-top: 9pt;
`;
const Tab = styled.span<{ idx: string; subscribeNumber: string }>`
  font-weight: 400;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.lightGray2};
  width: 100%;
  border: 0.75pt solid ${colors.gray};
  border-radius: 6pt;
  padding: 13.5pt 0;
  text-align: center;
  ${({ idx, subscribeNumber }) =>
    idx === subscribeNumber &&
    css`
      border: 0.75pt solid ${colors.main};
      color: ${colors.main};
    `}
`;

const Notice = styled.p<{ pt: number }>`
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  padding-top: ${({ pt }) => pt + 'pt'};
`;
const SubTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChargeGuide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3pt;
  color: ${colors.gray2};
  margin-top: 75pt;
  .text {
    letter-spacing: -0.02em;
    border-bottom: 1px solid ${colors.gray2};
  }
  .arrow-icon {
    position: relative;
    width: 12pt;
    height: 12pt;
  }
`;
const NextBtn = styled.div<{
  buttonActivate: boolean;
  subscribeNumber?: number;
}>`
  color: ${colors.lightWhite};
  width: ${({ subscribeNumber }) => (subscribeNumber === 0 ? '100%' : '64%')};
  padding: 15pt 0 39pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-top: 30pt;
  background-color: ${({ buttonActivate }) =>
    buttonActivate ? colors.main : colors.blue3};
`;
const PrevBtn = styled.div`
  color: ${colors.lightWhite};
  width: 36%;
  padding: 15pt 0 39pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-top: 30pt;
  background-color: ${colors.gray};
`;
const TwoBtn = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`;
