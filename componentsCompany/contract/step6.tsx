import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import ContractButton from './Button';
import Tab from './Tab';
import Info from './Info';
import { contractAction } from 'storeCompany/contract';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

type Props = {};

export default function Step6(props: Props) {
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const { invoiceDeliveryDate, subscriptionPaymentDate } = useSelector(
    (state: RootState) => state.contractSlice,
  );

  useEffect(() => {
    if (invoiceDeliveryDate !== '' && subscriptionPaymentDate !== '') {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [invoiceDeliveryDate, subscriptionPaymentDate]);

  return (
    <Wrap>
      <Tab />
      <Notice>
        <h2>
          운영사업자의 구독료 청구서 교부 날짜와 구매자의 구독료 지급 날짜를
          입력해주세요.
        </h2>
      </Notice>

      <P className="first">운영사업자는</P>
      <P>매월 말일을 기준으로 정산한 후, </P>
      <DateWrap>
        <span className="month">익월</span>
        <input
          type="text"
          value={invoiceDeliveryDate}
          placeholder="날짜를 입력해주세요."
          onChange={(e) =>
            dispatch(
              contractAction.setInvoiceDeliveryDate(e.currentTarget.value),
            )
          }
        />
        <span className="day">일</span>
      </DateWrap>
      <P>까지 구독료 청구서를 구매자에게 교부하며,</P>
      <P className="first">구매자는</P>
      <DateWrap>
        <span className="month">익월</span>
        <input
          type="text"
          value={subscriptionPaymentDate}
          placeholder="날짜를 입력해주세요."
          onChange={(e) =>
            dispatch(
              contractAction.setSubscriptionPaymentDate(e.currentTarget.value),
            )
          }
        />
        <span className="day">일</span>
      </DateWrap>
      <P>까지 구독료를 지급하여야 한다.</P>

      <ContractButton
        prev={true}
        prevValue={'이전'}
        prevOnClick={() => dispatch(contractAction.setStep(5))}
        value={'다음'}
        isValid={isValid}
        onClick={() => isValid && dispatch(contractAction.setStep(7))}
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
  .companyName {
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
  justify-content: space-between;
  align-items: center;

  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 12pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
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
  }
`;
