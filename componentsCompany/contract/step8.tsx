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

export default function Step8({ subscribeProduct }: Props) {
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const [placeHolder, setPlaceHolder] = useState('');
  const { penalty } = useSelector((state: RootState) => state.contractSlice);

  useEffect(() => {
    if (subscribeProduct === 'ENTIRETY') {
      setPlaceHolder(
        '충전인프라 구입/설치/운영관리/유지보수 비용, 통신망 이용료, 한전불입금, 전기 기본요금 이(가) 포함되어 있다.',
      );
    } else {
      setPlaceHolder(
        '충전인프라 운영관리/유지보수 비용, 통신망 이용료, 한전불입금, 전기 기본요금 이(가) 포함되어 있다.',
      );
    }
  }, [subscribeProduct]);

  useEffect(() => {
    if (penalty !== '') {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [penalty]);

  return (
    <Wrap>
      <Tab />
      <Notice>
        <h2>구독 중도해지 위약금에 대한 내용을 입력해주세요.</h2>
        <p>
          구매자가 구독기간 만료 이전에 본 계약을 해지하는 경우,
          <br />
          <br />
          <span className="emphasis">
            {subscribeProduct === 'ENTIRETY' ? '전체구독' : '부분구독'}{' '}
          </span>{' '}
          상품을 이용중인 구매자는
        </p>
      </Notice>

      {/* 내용 */}
      <Contents
        // placeholder="수익지분 100% 기준의 충전기 +공사 가격에서 (남은 구독기간/전체구독기간)에 비례한 금액 을(를) 위약금으로 지급하여야 한다."
        maxLength={500}
        value={penalty}
        placeholder={placeHolder}
        onChange={(e) => {
          dispatch(contractAction.setPenalty(e.currentTarget.value));
        }}
        onFocus={(e) => {
          if (penalty === '') {
            dispatch(contractAction.setPenalty(placeHolder));
          }
        }}
      />

      <ContractButton
        prev={true}
        prevValue={'이전'}
        prevOnClick={() => dispatch(contractAction.setStep(7))}
        value={'다음'}
        isValid={isValid}
        onClick={() => isValid && dispatch(contractAction.setStep(9))}
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

  .emphasis {
    color: ${colors.main1};
  }
`;

const Contents = styled.textarea`
  width: 100%;
  padding: 12pt;
  height: 90pt;
  background: ${colors.lightWhite};
  border: 0.75pt solid ${colors.gray};
  border-radius: 6pt;
  margin-top: 9pt;
  outline: none;
  resize: none;
  :placeholder {
  }
  :placeholder:after {
  }
`;
