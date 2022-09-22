import MypageHeader from 'components/mypage/request/header';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import TwoButton from 'components/mypage/request/TwoButton';
import RequestModal from 'components/Modal/RequestModal';
import BiddingQuote from 'components/mypage/request/BiddingQuote';
import styled from '@emotion/styled';

const Mypage1_4 = ({ data }: any) => {
  const [isModal, setModal] = useState(false);
  const route = useRouter();
  const handleOnClick = () => route.back();

  // 모달 컨트롤
  const onClcikModal = () => setModal((prev) => !prev);
  const rightControl = () => route.push('/mypage/request/1-5');

  const title = () => {
    return (
      <>
        Charge Point 의 구독상품으로 <br />
        선택하시겠습니까?
      </>
    );
  };
  const subtitle = () => {
    return (
      <>
        선택 후 정확한 견적을 위해 현장실사가 진행되며,
        <br /> 고객님의 연락처가 전달됩니다.{' '}
      </>
    );
  };
  return (
    <>
      {isModal && (
        <RequestModal
          title={title}
          subtitle={subtitle}
          leftControl={onClcikModal}
          rightControl={rightControl}
        />
      )}
      <MypageHeader
        title="상세내용"
        exitBtn={true}
        handleOnClick={handleOnClick}
      />
      <BiddingQuote pb={101.25} />
      <TwoButton onClcikModal={onClcikModal} />
    </>
  );
};

export default Mypage1_4;
