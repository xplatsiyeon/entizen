import styled from '@emotion/styled';
import React from 'react';
import colors from 'styles/colors';
import ContractButton from './Button';
import Tab from './Tab';
import Info from './Info';
import { contractAction } from 'storeCompany/contract';
import { useDispatch } from 'react-redux';

type Props = {};

export default function Step5(props: Props) {
  const dispatch = useDispatch();

  return (
    <Wrap>
      <Tab />
      <Notice>
        <h2>
          <span className="companyName">기업 이름</span> 에서 제공하는
          구독상품에 대한 설명이 계약서에 포함되어 있습니다. 구매자의 Needs가
          반영된 항목들이 기본 값으로 입력되어 있으며, 필요할 경우 수정해주세요.
        </h2>
      </Notice>
      <H3>
        <span className="name">전체구독</span> 상품에는{' '}
      </H3>
      {/* 내용 */}
      <Contents
        placeholder="충전인프라 구입/설치/운영관리/유지보수 비용, 통신망 이용료, 한전불입금, 전기 기본요금 이(가) 포함되어 있다."
        maxLength={500}
      />

      <ContractButton
        prev={true}
        prevValue={'이전'}
        prevOnClick={() => dispatch(contractAction.addStep(4))}
        value={'다음'}
        isValid={true}
        onClick={() => dispatch(contractAction.addStep(6))}
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
const H3 = styled.h3`
  width: 100%;
  padding-top: 24pt;
  text-align: start;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 12pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  .name {
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
