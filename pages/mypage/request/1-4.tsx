import TwoBtnModal from 'components/Modal/TwoBtnModal';
import EstimateContainer from 'components/mypage/request/EstimateContainer';
import MypageHeader from 'components/mypage/request/header';
import SubscriptionProduct from 'components/mypage/request/subscriptionProduct';
import { useRouter } from 'next/router';
import { useState } from 'react';
import colors from 'styles/colors';

const Mypage1_4 = ({ data }: any) => {
  const route = useRouter();
  // 모달 on / off
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // 모달 왼쪽, 오른쪽 버튼 핸들러
  const backPage = () => route.back();
  const handleOnClick = () => setModalOpen(!modalOpen);

  return (
    <>
      <MypageHeader title="내 견적서" handleOnClick={handleOnClick} />
    </>
  );
};

export default Mypage1_4;
