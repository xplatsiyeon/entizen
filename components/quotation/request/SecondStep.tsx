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
import { useRouter } from 'next/router';
import { unavailableGraphAction } from 'store/unavailableGraph';

interface Props {
  // setTabNumber: Dispatch<SetStateAction<number>>;
  tabNumber: number;
}

const SecondStep = ({ tabNumber }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { subscribeProduct, investRate, chargersKo, chargers } = useSelector(
    (state: RootState) => state.quotationData,
  );

  const [value, setValue] = useState(50);
  const [disabled, setDisabled] = useState(true);
  const [unavailableGraph, setUnavailableGraph] = useState(false);
  const [buttonActivate, setButtonActivate] = useState<boolean>(false);
  const [subscribeNumber, setSubscribeNumber] = useState(-1);
  const subscribeType: string[] = ['전체구독', '부분구독'];
  const subscribeTypeEn: string[] = ['ENTIRETY', 'PART'];

  // 이전
  const HandlePrevBtn = () => {
    if (tabNumber > 0) {
      dispatch(quotationAction.setTabNumber(tabNumber - 1));
    }
    // setTabNumber(tabNumber - 1);
  };

  // 다음버튼
  const HandleNextBtn = () => {
    if (buttonActivate) {
      // 홈충전기 그래프 선택 불가 상품일 경우
      if (unavailableGraph) {
        dispatch(
          quotationAction.setStep2({
            subscribeProduct: subscribeTypeEn[subscribeNumber],
            investRate: '0',
          }),
        );
        // 일반 경우
      } else {
        dispatch(
          quotationAction.setStep2({
            subscribeProduct: subscribeTypeEn[subscribeNumber],
            investRate: (value / 100).toString(),
          }),
        );
      }
      dispatch(quotationAction.setTabNumber(tabNumber + 1));
      // setTabNumber(tabNumber + 1);
    }
  };
  const goToGuide = () => {
    if (buttonActivate) {
      // 홈충전기 그래프 선택 불가 상품일 경우
      if (unavailableGraph) {
        dispatch(
          quotationAction.setStep2({
            subscribeProduct: subscribeTypeEn[subscribeNumber],
            investRate: '0',
          }),
        );
        // 일반 경우
      } else {
        dispatch(
          quotationAction.setStep2({
            subscribeProduct: subscribeTypeEn[subscribeNumber],
            investRate: (value / 100).toString(),
          }),
        );
      }
    }
    router.push({
      pathname: '/guide/subscribe',
      query: {
        id: 1,
      },
    });
  };
  // 버튼 유효성 검사
  useEffect(() => {
    setButtonActivate(false);
    // 그래프 선택 불가 일 경우
    if (unavailableGraph) {
      if (subscribeNumber !== -1) {
        setButtonActivate(true);
      }
      // 그래프 선택 가능 일 경우
    } else {
      if (subscribeNumber !== -1 && disabled === false) {
        setButtonActivate(true);
      }
    }
  }, [disabled, unavailableGraph, subscribeNumber]);

  // 컴포넌트 이동 시에도 데이터 기억하기
  useEffect(() => {
    const newValue = Math.floor(Number(investRate) * 100);
    const homeType = chargers.every((e) => e.kind === '7-HOME');
    if (subscribeProduct === 'ENTIRETY') {
      if (homeType) {
        setSubscribeNumber(0);
      } else {
        setSubscribeNumber(0);
        setValue(newValue);
        setDisabled(false);
      }
    }
    if (subscribeProduct === 'PART') {
      if (homeType) {
        setSubscribeNumber(1);
      } else {
        setSubscribeNumber(1);
        setValue(newValue);
        setDisabled(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 홈 충전기 수익지분 그래프 on/off
  useEffect(() => {
    if (
      chargersKo.length === 1 &&
      chargersKo[0].kind === '7 kW 홈 충전기 (가정용)'
    ) {
      setUnavailableGraph(true);
      dispatch(unavailableGraphAction.setUnavailableGraph(true));
    } else {
      setUnavailableGraph(false);
      dispatch(unavailableGraphAction.setUnavailableGraph(false));
    }
  }, [chargersKo, subscribeNumber]);

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
      {unavailableGraph ? (
        <Notice pt={15}>
          전체구독: 충전기 렌탈 구매 (구독기간 종료 후 본인 소유) <br />
          부분구독: 충전기 일시불 구매
        </Notice>
      ) : (
        <Notice pt={15}>
          전체구독: 충전기 + 운영서비스 구독 <br />
          부분구독: 운영서비스 구독 (충전기는 일시불 구매)
        </Notice>
      )}

      <SubTitle>희망하는 수익지분을 선택해주세요.</SubTitle>
      <Notice pt={6}>* 선택하신 수익지분에 따라 구독료가 상승해요.</Notice>

      <SubTitleBox disabled={disabled}>
        <SubTitle className="slider-bar-user">내 수익/투자</SubTitle>
        <SubTitle className="slider-bar-company">판매자</SubTitle>
      </SubTitleBox>
      {/* slider (수익/투자 그래프)  */}
      {/* 홈충전기 부분구독 일경우 사용 X*/}
      {unavailableGraph ? (
        <Notice pt={15}>* 홈 충전기는 수익지분과 무관한 상품입니다.</Notice>
      ) : (
        <SliderBox>
          <SliderSizes
            subscribeNumber={subscribeNumber}
            value={value}
            setValue={setValue}
            disabled={disabled}
            setDisabled={setDisabled}
          />
        </SliderBox>
      )}
      <ChargeGuide>
        <span className="text" onClick={goToGuide}>
          구독 가이드
        </span>
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
  @media (max-width: 899.25pt) {
    margin-bottom: 96pt;
    padding: 0 15pt;
  }
`;
const Title = styled.h1`
  padding-top: 38pt;
  font-weight: 500;
  font-size: 18pt;
  line-height: 24pt;
  text-align: left;
  letter-spacing: -0.02em;
  font-family: 'Spoqa Han Sans Neo';
  color: ${colors.main2};
`;
const SubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Spoqa Han Sans Neo';
  padding-top: 45pt;
  font-weight: 700;
  font-size: 12pt;
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
  box-sizing: border-box;
`;
const Tab = styled.span<{ idx: string; subscribeNumber: string }>`
  font-weight: 400;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  font-family: 'Spoqa Han Sans Neo';
  color: ${colors.lightGray2};
  width: 100%;
  border: 0.75pt solid ${colors.gray};
  border-radius: 6pt;
  padding: 13.5pt 0;
  text-align: center;
  cursor: pointer;
  ${({ idx, subscribeNumber }) =>
    idx === subscribeNumber &&
    css`
      border: 0.75pt solid ${colors.main};
      color: ${colors.main};
    `}
`;

const Notice = styled.p<{ pt: number }>`
  font-weight: 400;
  font-size: 10.5pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  font-family: 'Spoqa Han Sans Neo';
  color: ${colors.gray2};
  padding-top: ${({ pt }) => pt + 'pt'};
`;
const SubTitleBox = styled.div<{ disabled: boolean }>`
  display: flex;
  justify-content: space-between;
  .slider-bar-user {
    color: ${({ disabled }) => (disabled ? colors.lightGray2 : colors.main)};
  }
  .slider-bar-company {
    color: ${colors.lightGray2};
  }
`;
const ChargeGuide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3pt;
  color: ${colors.gray2};
  margin-top: 75pt;
  margin-left: 30pt;
  .text {
    letter-spacing: -0.02em;
    border-bottom: 1px solid ${colors.gray2};
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
    @media (min-width: 900pt) {
      text-align: right;
    }
  }
  .arrow-icon {
    position: relative;
    width: 12pt;
    height: 12pt;
  }
  @media (max-width: 899.25pt) {
    margin-left: 0;
    /* padding-bottom: 76.5pt; */
    padding-bottom: 120pt;
  }
  @media (min-width: 900pt) {
    padding-bottom: 90pt;
    display: flex;
    justify-content: flex-end;
  }
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
  font-family: 'Spoqa Han Sans Neo';
  letter-spacing: -0.02em;
  margin-top: 30pt;
  border-radius: 6pt;
  background-color: ${({ buttonActivate }) =>
    buttonActivate ? colors.main : colors.blue3};
  cursor: pointer;
  @media (max-width: 899.25pt) {
    border-radius: 0;
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
  font-family: 'Spoqa Han Sans Neo';
  letter-spacing: -0.02em;
  margin-top: 30pt;
  background-color: ${colors.gray};
  border-radius: 6pt;
  cursor: pointer;
  @media (max-width: 899.25pt) {
    border-radius: 0;
    padding: 15pt 0 39pt 0;
  }
  @media (min-width: 900pt) {
    border: 0.75pt solid #e2e5ed;
    background-color: white;
    color: #a6a9b0;
  }
`;
const TwoBtn = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  gap: 8.7pt;
  @media (max-width: 899.25pt) {
    position: fixed;
    gap: 0;
  }
`;
