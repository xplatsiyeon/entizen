import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import AdminHeader from 'componentsAdmin/Header';
import UserPreQuotation from './UserPreQuotation';
import CompanyPreQuotation from './CompanyPreQuotation';
import Qutation from './Qutation';
type Props = {
  detatilId: string;
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailId: React.Dispatch<React.SetStateAction<string>>;
};

const DetailQuotation = ({ detatilId, setIsDetail, setDetailId }: Props) => {
  return (
    <Background>
      <Wrapper>
        <AdminHeader title="역경매 관리" type="detail" exelHide={false} />
        <UserPreQuotation detatilId={detatilId} />
        <CompanyPreQuotation
          detatilId={detatilId}
          setIsDetail={setIsDetail}
          setDetailId={setDetailId}
        />
        {/* <Qutation /> */}
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
  position: absolute;
  left: 154.5pt;
  z-index: 10;
  overflow-y: scroll;
  padding-bottom: 75px;
`;

const Wrapper = styled.div`
  min-width: 964px;
`;
