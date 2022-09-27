import AsRequest from 'components/mypage/as/AsRequest';
import AsRequestFooter from 'components/mypage/as/AsRequestFooter';
import AsRequestPartner from 'components/mypage/as/AsRequestPartner';
import AsRequestReviewBtn from 'components/mypage/as/AsRequestReviewBtn';
import React from 'react';

type Props = {};

// 리뷰 작성하기

const AsGoReviewPage = (props: Props) => {
  return (
    <>
      <AsRequest />
      <AsRequestPartner />
      <AsRequestFooter />
      <AsRequestReviewBtn />
    </>
  );
};

export default AsGoReviewPage;
