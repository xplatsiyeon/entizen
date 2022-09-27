import AsRequest from 'components/mypage/as/AsRequest';
import AsRequestFooter from 'components/mypage/as/AsRequestFooter';
import AsRequestPartner from 'components/mypage/as/AsRequestPartner';
import LookMyReview from 'components/mypage/as/LookMyReviewBtn';
import MyReviewModal from 'components/mypage/as/MyReviewModal';
import React, { useState } from 'react';

type Props = {};

// 리뷰 완료 리뷰 확인 가능 페이지

const AsReviewEnd = (props: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModalOpen(true);
    console.log('aa');
  };
  return (
    <>
      {modalOpen && (
        <MyReviewModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
      <AsRequest />
      <AsRequestPartner />
      <AsRequestFooter />
      <LookMyReview handleClick={handleClick} text={'내 리뷰 보기'} />
    </>
  );
};

export default AsReviewEnd;
