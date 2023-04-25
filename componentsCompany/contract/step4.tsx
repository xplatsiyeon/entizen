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

export default function Step3(props: Props) {
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const { otherSpecifics } = useSelector(
    (state: RootState) => state.contractSlice,
  );

  useEffect(() => {
    if (otherSpecifics !== '') {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [otherSpecifics]);

  return (
    <Wrap>
      <Tab />
      <Notice>
        <h2>
          최종견적서에 제출했던 내용과 관련하여 기타 특이사항이 있다면
          입력해주세요.
        </h2>
      </Notice>
      {/* 내용 */}
      <Contents
        value={otherSpecifics}
        placeholder="[선택] 기타 특이사항을 입력해주세요."
        maxLength={500}
        onChange={(e) =>
          dispatch(contractAction.setOtherSpecifics(e.currentTarget.value))
        }
      />

      {/* 버튼 */}
      <ContractButton
        prev={true}
        prevValue={'이전'}
        prevOnClick={() => dispatch(contractAction.setStep(3))}
        value={'다음'}
        isValid={true}
        onClick={() => isValid && dispatch(contractAction.setStep(5))}
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
const Contents = styled.textarea`
  width: 100%;
  padding: 12pt;
  height: 150pt;
  background: ${colors.lightWhite};
  border: 0.75pt solid ${colors.gray};
  border-radius: 6pt;
  margin-top: 24pt;
  outline: none;
  resize: none;
`;
