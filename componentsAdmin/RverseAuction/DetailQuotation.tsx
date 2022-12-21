import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import AdminHeader from 'componentsAdmin/Header';
import Prequotion from './Prequotion';
import UserPreQuotation from './UserPreQuotation';
type Props = {
  setIsDetail: Dispatch<SetStateAction<boolean>>;
  //   type: 'USER' | 'COMPANY';
  //   memberIdx: number | string;
};

const DetailQuotation = ({ setIsDetail }: Props) => {
  const handleBackBtn = () => {
    setIsDetail(false);
  };
  return (
    <Background>
      <Wrapper>
        <AdminHeader
          title="역경매 관리"
          type="detail"
          backBtn={handleBackBtn}
          exelHide={false}
        />
        <Prequotion />
        <UserPreQuotation />
      </Wrapper>
    </Background>
  );
};

export default DetailQuotation;

const Background = styled.div`
  width: 100%;
  background-color: ${colors.lightWhite};
  padding: 0 18pt;
  position: absolute;
  left: 154.5pt;
  z-index: 999;
`;

const Wrapper = styled.div`
  width: 946px;
`;

const QuotationTitle = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: ${colors.dark2};
  text-align: left;
`;

const SelectBox = styled.select``;
const SelectValue = styled.option``;
