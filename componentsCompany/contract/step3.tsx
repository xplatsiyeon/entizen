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

export default function Step3({ data }: Props) {
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const { extensionSubscriptionFee } = useSelector(
    (state: RootState) => state.contractSlice,
  );

  useEffect(() => {
    console.log('extensionSubscriptionFee : ', extensionSubscriptionFee);
    if (extensionSubscriptionFee.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [extensionSubscriptionFee]);

  return (
    <Wrap>
      <Tab />
      <Notice>
        <h2>구독기간이 자동 연장될 경우의 구독료를 입력해주세요.</h2>
        <p>
          구독기간은 만료 1개월 전까지 어느 당사자가 계약 갱신 사절의 의사를
          상대방 당사자에게 통지하지 아니하는 한 아래와 같은 조건으로 자동
          연장됩니다.
          <br />
          <br />
          1) 구독상품 - 전체구독 상품의 경우 부분구독 상품으로 변경 - 부분구독
          상품의 경우 상품 유지
          <br />
          <br />
          2) 구독기간 - 24개월로 연장
          <br />
          <br />
          3) 구독상품, 구독기간 외 다른 항목들은 동일한 조건으로 자동 연장
        </p>
      </Notice>

      {data?.finalQuotationChargers.map((charger, index) => (
        <ContentsSection key={index}>
          <ul>
            {/* 상단 정보  */}
            <Info charger={charger} />
            <Line />
            {/* 스텝 3 내용 */}
            <li>
              <Name>구독료</Name>
              <span>
                <input
                  onMouseDown={commaInputLastFocus}
                  type={'text'}
                  placeholder="0"
                  value={extensionSubscriptionFee[index]}
                  onChange={(e) => {
                    console.log('e :', e.currentTarget.value);
                    dispatch(
                      contractAction.setExtensionSubscriptionFee([
                        index,
                        inputPriceFormat(e.currentTarget.value),
                      ]),
                    );
                  }}
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
        prevOnClick={() => dispatch(contractAction.setStep(2))}
        value={'다음'}
        isValid={isValid}
        onClick={() => isValid && dispatch(contractAction.setStep(4))}
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
