import AsRequest from 'components/mypage/as/AsRequest';
import AsRequestDone from 'components/mypage/as/AsRequestDone';
import AsRequestFooter from 'components/mypage/as/AsRequestFooter';
import AsRequestPartner from 'components/mypage/as/AsRequestPartner';
import React from 'react';

type Props = {};

// 리뷰 끝내기

const AsRequestComplete = (props: Props) => {
  return (
    <>
      <AsRequest />
      <AsRequestPartner />
      <AsRequestFooter />
      <AsRequestDone />
    </>
  );
};

export default AsRequestComplete;
