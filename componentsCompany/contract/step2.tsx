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
import { commaInputLastFocus, inputPriceFormat } from 'utils/calculatePackage';
import { FinalQuotation } from 'QueryComponents/CompanyQuery';

type Props = {
  data: FinalQuotation;
};

export default function Step2({ data }: Props) {
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const { subscriptionFee } = useSelector(
    (state: RootState) => state.contractSlice,
  );

  useEffect(() => {
    if (subscriptionFee.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [subscriptionFee]);

  return (
    <Wrap>
      <Tab />
      <Notice>
        <h2>구매자에게 청구할 구독료를 입력해주세요.</h2>
      </Notice>

      {data?.finalQuotationChargers.map((charger, index) => (
        <ContentsSection key={index}>
          <ul>
            {/* 상단 정보  */}
            <Info charger={charger} />
            <Line />
            {/* 스텝 2 내용 */}
            <li>
              <Name>구독료</Name>
              <span>
                <input
                  onMouseDown={commaInputLastFocus}
                  type={'text'}
                  placeholder="0"
                  value={subscriptionFee[index]}
                  onChange={(e) =>
                    dispatch(
                      contractAction.setSubscribe([
                        index,
                        inputPriceFormat(e.currentTarget.value),
                        // e.currentTarget.value,
                      ]),
                    )
                  }
                />
                원/월
              </span>
            </li>
          </ul>
        </ContentsSection>
      ))}

      {/* 버튼 */}
      <ContractButton
        prev={true}
        prevValue={'이전'}
        prevOnClick={() => dispatch(contractAction.setStep(1))}
        value={'다음'}
        isValid={isValid}
        onClick={() => isValid && dispatch(contractAction.setStep(3))}
      />
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  position: relative;
  padding-top: 26.18pt;
  padding-left: 37.99pt;
  padding-right: 37.99pt;
  padding-bottom: 42pt;

  @media (max-width: 899.25pt) {
    min-height: calc(100vh - 48px);
    padding-top: 24pt;
    padding-left: 15pt;
    padding-right: 15pt;
    padding-bottom: 130pt;
  }
`;

const Notice = styled.div`
  padding-top: 15.75pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  letter-spacing: -0.02em;
  width: 100%;
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
`;

const ContentsSection = styled.section`
  background: ${colors.lightWhite4};
  border-radius: 6pt;
  width: 100%;
  :nth-of-type(1) {
    margin-top: 30pt;
  }
  :not(:last-of-type) {
    margin-bottom: 12pt;
  }
  ul {
    padding: 18pt 15pt;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    :not(:last-of-type) {
      margin-bottom: 12pt;
    }
  }
  label {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.lightGray7};
  }
  li > span {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: right;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  li > span > input {
    background: ${colors.lightWhite};
    border: 0.75pt solid ${colors.lightWhite3};
    border-radius: 6pt;
    text-align: end;
    padding: 13.5pt 12pt;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 500;
    font-size: 12pt;
    line-height: 12pt;
    text-align: right;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    margin-right: 12pt;
    width: 135pt;
    ::placeholder {
      color: ${colors.lightGray3};
    }
  }
`;

const Name = styled.span`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;

const Line = styled.div`
  border: 1px solid #e2e5ed;
  margin-top: 18pt;
  margin-bottom: 18pt;
`;
