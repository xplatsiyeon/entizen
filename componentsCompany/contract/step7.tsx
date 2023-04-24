import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import ContractButton from './Button';
import Tab from './Tab';

import { contractAction } from 'storeCompany/contract';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

type Props = {
  subscribeProduct: 'ENTIRETY' | 'PART' | undefined;
};

export default function Step7({ subscribeProduct }: Props) {
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const { deadlineDate, paymentDeadlineDate, handlingFee } = useSelector(
    (state: RootState) => state.contractSlice,
  );

  useEffect(() => {
    if (
      deadlineDate !== '' &&
      paymentDeadlineDate !== '' &&
      handlingFee !== ''
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [deadlineDate, paymentDeadlineDate, handlingFee]);

  return (
    <Wrap>
      <Tab />
      <Notice>
        {subscribeProduct === 'ENTIRETY' ? (
          <h2>
            충전인프라 운영으로 인하여 발생한 수익은 구매자와 운영사업자
            간에&nbsp;
            <span className="emphasis">70:30</span> 비율로 배분됩니다. 수익 배분
            날짜와 취급수수료 비율을 입력해주세요.
          </h2>
        ) : (
          <h2>
            충전인프라 운영으로 인하여 발생한 수익은 구매자와 운영사업자
            간에&nbsp;
            <span className="emphasis">0:100</span> 비율로 배분됩니다.
          </h2>
        )}
        <p>0:100 일 경우 수익을 배분할 필요가 없습니다.</p>
      </Notice>

      {subscribeProduct === 'ENTIRETY' && (
        <>
          {' '}
          <P className="first">운영사업자는</P>
          <P>매월 말일을 기준으로 정산한 후, </P>
          <DateWrap>
            <span className="month">익월</span>
            <input
              type="text"
              value={deadlineDate}
              placeholder="날짜를 입력해주세요."
              onChange={(e) =>
                dispatch(contractAction.setDeadlineDate(e.currentTarget.value))
              }
            />
            <span className="day">일</span>
          </DateWrap>
          <P>까지 운영 매출 및 수익 내역을 구매자에게 제공한다.</P>
          {/* 2 */}
          <P className="first">내역 제공 후</P>
          <DateWrap>
            <input
              className="setSize"
              type="text"
              value={paymentDeadlineDate}
              placeholder="날짜를 입력해주세요."
              onChange={(e) =>
                dispatch(
                  contractAction.setPaymentDeadlineDate(e.currentTarget.value),
                )
              }
            />
            <span className="day">일 이내에</span>
          </DateWrap>
          <P>위 비율에 따른 구매자의 수익분을 지급하되,</P>
          {/* 3 */}
          <P className="first">월 수익에서 PG사 수수료 등 </P>
          <DateWrap>
            <span className="fee">취급수수료</span>
            <input
              type="text"
              value={handlingFee}
              placeholder="날짜를 입력해주세요."
              onChange={(e) =>
                dispatch(
                  contractAction.setPaymentDeadlineDate(e.currentTarget.value),
                )
              }
            />
            <span className="day">%</span>
          </DateWrap>
          <P>를 공제한 후 지급한다.</P>
        </>
      )}

      <ContractButton
        prev={true}
        prevValue={'이전'}
        prevOnClick={() => dispatch(contractAction.setStep(6))}
        value={'다음'}
        isValid={
          subscribeProduct === 'ENTIRETY' ? (isValid ? true : false) : true
        }
        onClick={() => {
          if (subscribeProduct === 'ENTIRETY') {
            isValid && dispatch(contractAction.setStep(8));
          } else {
            dispatch(contractAction.setStep(8));
          }
        }}
      />
    </Wrap>
  );
}

const Wrap = styled.div`
  padding-top: 24pt;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-left: 15pt;
  padding-right: 15pt;
  position: relative;
  min-height: calc(100vh - 48px);
  padding-bottom: 130pt;
`;

const Notice = styled.div`
  padding-top: 15.75pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  letter-spacing: -0.02em;
  h2 {
    font-weight: 500;
    font-size: 15pt;
    line-height: 22.5pt;
    color: ${colors.main2};
  }
  p {
    padding-top: 15pt;
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 18pt;
    color: ${colors.lightGray7};
  }
  .emphasis {
    color: ${colors.main1};
  }
`;
const P = styled.p`
  width: 100%;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 12pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  /* padding-top: 6pt; */
  /* margin-top: 0%; */
  &.first {
    padding-top: 24pt;
  }
`;
const DateWrap = styled.div`
  margin: 3pt 0;
  width: 100%;
  display: flex;
  justify-content: start3;
  align-items: center;

  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 12pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  .fee {
    margin-right: 12pt;
    min-width: 54.75pt;
  }
  .month {
    margin-right: 12pt;
    min-width: 22.5pt;
  }
  .day {
    padding-left: 12pt;
  }
  input {
    border: 0.75pt solid ${colors.gray};
    border-radius: 6pt;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    padding: 6pt 7.5pt;
    width: 100%;
    color: ${colors.main2};
    ::placeholder {
      color: ${colors.gray};
    }
    &.setSize {
      width: 164.25pt;
    }
  }
`;
