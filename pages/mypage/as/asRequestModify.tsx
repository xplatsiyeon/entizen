import AsRequest from 'components/mypage/as/AsRequest';
import AsRequestFooter from 'components/mypage/as/AsRequestFooter';
import AsRequestPartner from 'components/mypage/as/AsRequestPartner';
import React from 'react';

type Props = {};

const AsRequestModify = (props: Props) => {
  return (
    <>
      <AsRequest />
      <AsRequestPartner />
      <AsRequestFooter />
    </>
  );
};

export default AsRequestModify;
