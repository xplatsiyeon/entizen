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
import { inputPriceFormat } from 'utils/calculatePackage';
import { FinalQuotation } from 'QueryComponents/CompanyQuery';
import { useMediaQuery } from 'react-responsive';

type Props = {
  data: FinalQuotation;
};

export default function Step1({ data }: Props) {
  console.log('🔥 data : ', data);
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const { productPrice, installationCost } = useSelector(
    (state: RootState) => state.contractSlice,
  );

  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  useEffect(() => {
    if (productPrice.length > 0 && installationCost.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [productPrice, installationCost]);

  return (
    <Wrap>
      {!mobile && <Title>구독 계약서</Title>}
      <Tab />
      <Notice>
        <h2>
          구매자에게 청구할 충전기의 제품 가격과 설치공사비를 입력해주세요.
        </h2>
        <p>
          충전기 제품가격과 설치공사비가 모두 구독료에 포함되어 있다면, 0원으로
          입력 후 다음 단계로 넘어가주세요.
        </p>
      </Notice>

      {data?.finalQuotationChargers.map((charger, index) => (
        <ContentsSection key={index}>
          <ul>
            {/* 상단 정보  */}
            <Info charger={charger} />
            {/* 스텝 1 내용 */}
            <Line />
            <li>
              <Name>제품 가격</Name>
              <span>
                <input
                  onChange={(e) =>
                    dispatch(
                      contractAction.setProductPrice([
                        index,
                        e.currentTarget.value,
                      ]),
                    )
                  }
                  type={'text'}
                  placeholder="0"
                  value={inputPriceFormat(productPrice[index])}
                />
                원
              </span>
            </li>
            <li>
              <Name>설치공사비</Name>
              <span>
                <input
                  onChange={(e) =>
                    dispatch(
                      contractAction.setInstallationCost([
                        index,
                        e.currentTarget.value,
                      ]),
                    )
                  }
                  type={'text'}
                  placeholder="0"
                  value={inputPriceFormat(installationCost[index])}
                />
                원
              </span>
            </li>
          </ul>
        </ContentsSection>
      ))}

      <ContractButton
        prev={false}
        value={'다음'}
        isValid={isValid}
        onClick={() => isValid && dispatch(contractAction.setStep(2))}
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

const Title = styled.h1`
  margin-bottom: 24.44pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 35.5pt;
  line-height: 35.5pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;

const Notice = styled.div`
  padding-top: 15.75pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  width: 100%;
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
