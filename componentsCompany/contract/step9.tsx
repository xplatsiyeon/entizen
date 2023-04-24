import styled from '@emotion/styled';
import React from 'react';
import colors from 'styles/colors';
import ContractButton from './Button';
import Tab from './Tab';
import { contractAction } from 'storeCompany/contract';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

type Props = {};

export default function Step9(props: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Wrap>
      <Tab />
      <Notice>
        <h2>계약서 서명을 위해 아래에 운영사업자 정보를 입력해주세요.</h2>
      </Notice>

      {/* 내용 */}
      <Label pt={24}>사업자 등록번호</Label>
      <Input placeholder="예) 123-45-67890" />
      <P>사업자 등록번호에는 숫자만 입력해주세요.</P>

      <Label pt={30}>대표자 이름</Label>
      <Input placeholder="예) 홍길동" />

      <ContractButton
        prev={true}
        prevValue={'이전'}
        prevOnClick={() => dispatch(contractAction.addStep(8))}
        value={'계약서 요청'}
        isValid={true}
        onClick={() => dispatch(contractAction.addStep(10))}
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
const Label = styled.label<{ pt: number }>`
  width: 100%;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding-top: ${({ pt }) => pt}pt;
`;
const Input = styled.input`
  width: 100%;
  border: 0.75pt solid gray;
  border-radius: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.lightGray3};
  padding: 13.5pt 12pt;
  margin-top: 9pt;
`;
const P = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 10.5pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  margin-top: 6pt;
  width: 100%;
`;
