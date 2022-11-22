import Modal from 'components/Modal/Modal';
import { useRouter } from 'next/router';
import { AsDetailReseponse } from 'pages/mypage/as';
import React, { Dispatch, SetStateAction, useState } from 'react';
import AsRequest from './AsRequest';
import AsRequestWriteReview from './AsRequestWriteReview';

type Props = {
  data: AsDetailReseponse;};

const AsRequestEndReview = ({data}: Props) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  // 리액트쿼리 쿼리키 호출/사용. 

  const handleClick = () => {
    router.push('/mypage/as/asReviewEnd');
  };

  return (
    <>
      {modalOpen && (
        <Modal text={'소중한 의견 감사합니다.'} click={handleClick} />
      )}
      <AsRequest data={data}/* id={쿼리키} */ />
      <AsRequestWriteReview setModalOpen={setModalOpen} modalOpen={modalOpen} />
    </>
  );
};

export default AsRequestEndReview;
