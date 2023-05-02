import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import colors from 'styles/colors';

import Arrow from 'public/guide/Arrow.svg';
import { useDispatch } from 'react-redux';
import { quotationAction } from 'store/quotationSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useRouter } from 'next/router';
import zIndex from '@mui/material/styles/zIndex';

interface Props {
  tabNumber: number;
  // setTabNumber: Dispatch<SetStateAction<number>>;
}

const ThirdStep = ({ tabNumber }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { subscribeProduct, subscribePeriod, investRate, chargersKo } =
    useSelector((state: RootState) => state.quotationData);
  const [monthNumber, setMonthNumber] = useState(-1);
  const [isMessage, setIsMessage] = useState(false);
  const [buttonActivate, setButtonActivate] = useState<boolean>(false);
  const subscribeType: string[] = ['24', '36', '48', '60'];

  // 이전버튼
  const HandlePrevBtn = () =>
    dispatch(quotationAction.setTabNumber(tabNumber - 1));
  // 다음버튼
  const HandleNextBtn = () => {
    if (buttonActivate) {
      if (isMessage) {
        dispatch(quotationAction.setStep3(subscribeType[0]));
      } else {
        dispatch(quotationAction.setStep3(subscribeType[monthNumber]));
      }
      dispatch(quotationAction.setTabNumber(tabNumber + 1));
    }
  };
  const handleGuide = () => {
    if (buttonActivate) {
      if (isMessage) {
        dispatch(quotationAction.setStep3(subscribeType[0]));
      } else {
        dispatch(quotationAction.setStep3(subscribeType[monthNumber]));
      }
    }
    router.push({
      pathname: '/guide/subscribe',
      query: {
        id: 2,
        tab: 2,
      },
    });
  };
  // 클릭한 값 기억하기
  useEffect(() => {
    if (subscribePeriod) {
      setMonthNumber(subscribeType.indexOf(subscribePeriod));
    }
  }, []);
  // 전체 구독 버튼 활성화
  useEffect(() => {
    if (subscribeProduct === 'PART' || monthNumber !== -1) {
      setButtonActivate(true);
    }
  }, [monthNumber, subscribeProduct]);
  // 부분 구독 선택 불가
  useEffect(() => {
    if (
      chargersKo.length === 1 &&
      chargersKo[0].kind === '7 kW 홈 충전기 (가정용)' &&
      subscribeProduct === 'PART'
    ) {
      setIsMessage(true);
      setMonthNumber(-1);
    }
  }, []);

  return (
    <Wrap>
      {/* 선택불가 메세지 */}
      {isMessage && (
        <ImpossibleMessage>
          <Contents>
            홈 충전기(부분구독)은 <br />
            구독기간과 무관한 상품입니다.
          </Contents>
        </ImpossibleMessage>
      )}
      <Title>구독기간을 선택해주세요</Title>
      <SubTitle>구독기간 선택</SubTitle>
      <TypeBox>
        {subscribeType.map((type, index) => (
          <Tab
            key={index}
            idx={index.toString()}
            tabNumber={monthNumber.toString()}
            onClick={() => setMonthNumber(index)}
          >
            {type}개월
          </Tab>
        ))}
      </TypeBox>
      <ChargeGuide>
        <span className="text" onClick={handleGuide}>
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
    </Wrap>
  );
};

export default ThirdStep;

const Wrap = styled.div`
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
  padding-top: 45pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  font-family: 'Spoqa Han Sans Neo';
  color: ${colors.main2};
`;
const TypeBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 11.25pt;
  padding-top: 9pt;
  @media (min-width: 900pt) {
    display: flex;
    flex-direction: column;
  }
`;
const Tab = styled.span<{ idx: string; tabNumber: string }>`
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
  box-sizing: border-box;
  cursor: pointer;
  ${({ idx, tabNumber }) =>
    idx === tabNumber &&
    css`
      border: 0.75pt solid ${colors.main};
      color: ${colors.main};
    `}
`;
const ChargeGuide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3pt;
  color: ${colors.gray2};
  margin-top: 139pt;
  margin-left: 30pt;
  @media (min-width: 900pt) {
    margin-top: 70pt;
  }
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
    padding-bottom: 120pt;
  }

  @media (min-width: 900pt) {
    padding-bottom: 90pt;
    display: flex;
    justify-content: flex-end;
  }
`;
// 부분구독 선택 시 불가 화면
const ImpossibleMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(34, 34, 34, 0.4);
  z-index: 9999;
`;
const Contents = styled.p`
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 16.5pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
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
  font-family: 'Spoqa Han Sans Neo';
  border-radius: 6pt;
  margin-top: 30pt;
  background-color: ${({ buttonActivate }) =>
    buttonActivate ? colors.main : colors.blue3};
  cursor: pointer;
  @media (max-width: 899.25pt) {
    padding: 15pt 0 39pt 0;
    border-radius: 0;
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
  font-family: 'Spoqa Han Sans Neo';
  border-radius: 6pt;
  margin-top: 30pt;
  background-color: ${colors.gray};
  cursor: pointer;
  @media (max-width: 899.25pt) {
    padding: 15pt 0 39pt 0;
    border-radius: 0;
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
  z-index: 9999;
  @media (max-width: 899.25pt) {
    position: fixed;
    gap: 0;
  }
`;
