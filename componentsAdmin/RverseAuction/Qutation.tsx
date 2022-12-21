import styled from '@emotion/styled';
import Image from 'next/image';
import React, { useState } from 'react';
import colors from 'styles/colors';
import ExitBtn from 'public/adminImages/Group.png';
import FinalQuotaion from './FinalQuotation';
import Prequotion from './PreQuotation';

type Props = {};

const Qutation = (props: Props) => {
  const [optionValue, setOptionValue] = useState<string>();
  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    console.log(event);
    setOptionValue(event?.target?.value);
  };
  return (
    <Wrapper>
      <Menu>
        <select className="selectBox" onChange={onChangeSelect}>
          <option value="가견적서">가견적서</option>
          <option value="최종견적서">최종견적서</option>
        </select>
        <Btn>수정</Btn>
      </Menu>
      {/* 가견적 */}

      {optionValue === '가견적서' && <Prequotion preQuotationIdx={304} />}
      {/* 최종견적 */}
      {optionValue === '최종견적서' && <FinalQuotaion finalQuotationIdx={88} />}
    </Wrapper>
  );
};

export default Qutation;

const Wrapper = styled.div``;
const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  width: 946px;
  .selectBox {
    width: 134px;
    height: 36px;
    padding-left: 6px;
    cursor: pointer;
  }
`;
const Btn = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  color: #747780;
  line-height: 150%;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  border: 1px solid #747780;
  background-color: #e2e5ed;
  border-radius: 4px;
  width: 64px;
  height: 26px;
  padding-top: 2px;
  cursor: pointer;
`;
