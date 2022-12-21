import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import AdminHeader from 'componentsAdmin/Header';
import UserPreQuotation from './UserPreQuotation';
import CompanyPreQuotation from './CompanyPreQuotation';
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
        <UserPreQuotation />
        <CompanyPreQuotation />
      </Wrapper>
    </Background>
  );
};

export default DetailQuotation;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${colors.lightWhite};
  padding: 0 18pt;
  /* position: absolute; */
  left: 154.5pt;
  z-index: 10;
  overflow-y: scroll;
  padding-bottom: 75px;
`;

const Wrapper = styled.div`
  min-width: 964px;
`;
