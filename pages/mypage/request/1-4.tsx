import MypageHeader from 'components/mypage/request/header';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import TwoButton from 'components/mypage/request/TwoButton';
import RequestModal from 'components/Modal/RequestModal';
import BiddingQuote from 'components/mypage/request/BiddingQuote';

const Mypage1_4 = ({ data }: any) => {
  const [isModal, setModal] = useState(false);
  const route = useRouter();
  const handleOnClick = () => route.back();

  // 모달 컨트롤
  const onClcikModal = () => setModal((prev) => !prev);
  const rightControl = () => route.push('/mypage/request/1-5');
  return (
    <>
      {isModal && (
        <RequestModal leftControl={onClcikModal} rightControl={rightControl} />
      )}
      <MypageHeader
        title="상세내용"
        exitBtn={true}
        handleOnClick={handleOnClick}
      />
      <BiddingQuote />
      <TwoButton onClcikModal={onClcikModal} />
    </>
  );
};

export default Mypage1_4;
