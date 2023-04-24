import styled from '@emotion/styled';
import React from 'react';
import colors from 'styles/colors';
import ContractButton from './Button';
import Tab from './Tab';
import { contractAction } from 'storeCompany/contract';
import { useDispatch } from 'react-redux';

type Props = {};

export default function Step8(props: Props) {
  const dispatch = useDispatch();

  return (
    <Wrap>
      <Tab />
      <Notice>
        <h2>구독 중도해지 위약금에 대한 내용을 입력해주세요.</h2>
      </Notice>
      <p>
        구매자가 구독기간 만료 이전에 본 계약을 해지하는 경우,
        <br />
        <br />
        <span>전체구독</span> 상품을 이용중인 구매자는
      </p>

      {/* 내용 */}
      <Contents
        placeholder="수익지분 100% 기준의 충전기 +공사 가격에서 (남은 구독기간/전체구독기간)에 비례한 금액 을(를) 위약금으로 지급하여야 한다."
        maxLength={500}
      />

      <ContractButton
        prev={true}
        prevValue={'이전'}
        prevOnClick={() => dispatch(contractAction.addStep(7))}
        value={'다음'}
        isValid={true}
        onClick={() => dispatch(contractAction.addStep(9))}
      />
    </Wrap>
  );
}

const Wrap = styled.div`
  padding-top: 18.375pt;
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
