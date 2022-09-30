import AsRequest from 'components/mypage/as/AsRequest';
import AsRequestFooter from 'components/mypage/as/AsRequestFooter';
import AsRequestPartner from 'components/mypage/as/AsRequestPartner';
import LookMyReview from 'components/mypage/as/LookMyReviewBtn';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

// 기본 페이지

const AsShow = (props: Props) => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/mypage/as/1-2');
  };
  return (
    <>
      <AsRequest />
      <AsRequestPartner />
      <AsRequestFooter />
      <LookMyReview handleClick={handleClick} text={'수정하기'} />
    </>
  );
};

export default AsShow;
