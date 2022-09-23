import styled from '@emotion/styled';
import AsRequest from 'components/mypage/as/AsRequest';
import AsRequestPartner from 'components/mypage/as/AsRequestPartner';
import React from 'react';

type Props = {};

const AsShow = (props: Props) => {
  return (
    <>
      <AsRequest />
      <AsRequestPartner />
    </>
  );
};

const Container = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
`;

export default AsShow;
