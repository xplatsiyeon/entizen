import styled from '@emotion/styled';
import React from 'react';
import colors from 'styles/colors';
import ContractButton from './Button';
import Tab from './Tab';
import Info from './Info';
import { contractAction } from 'storeCompany/contract';
import { useDispatch } from 'react-redux';

type Props = {};

export default function Step2(props: Props) {
  const dispatch = useDispatch();

  return (
    <Wrap>
      <Tab />
      <Notice>
        <h2>구매자에게 청구할 구독료를 입력해주세요.</h2>
      </Notice>
      <ContentsSection>
        <Info
          // 자식요소로 추가 데이터 내려 주기
          children={
            <>
              <li>
                <Name>구독료</Name>
                <span>
                  <input type={'text'} placeholder="0" value={''} />
                  원/월
                </span>
              </li>
            </>
          }
        />
      </ContentsSection>
      {/* 버튼 */}
      <ContractButton
        prev={true}
        prevValue={'이전'}
        prevOnClick={() => dispatch(contractAction.addStep(1))}
        value={'다음'}
        isValid={true}
        onClick={() => dispatch(contractAction.addStep(3))}
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
`;

const ContentsSection = styled.section`
  margin-top: 30pt;
  background: ${colors.lightWhite4};
  border-radius: 6pt;
  width: 100%;
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
    color: ${colors.lightGray3};
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
