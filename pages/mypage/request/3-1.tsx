import TwoBtnModal from 'components/Modal/TwoBtnModal';
import Mypage3_1 from 'components/mypage/request/3-1';
import EstimateContainer from 'components/mypage/request/estimateContainer';
import MypageHeader from 'components/mypage/request/header';
import { useRouter } from 'next/router';
import { useState } from 'react';
import colors from 'styles/colors';

const Mypage3 = ({ data }: any) => {
  const route = useRouter();
  // 모달 on / off
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // 모달 왼쪽, 오른쪽 버튼 핸들러
  const backPage = () => route.back();
  const handleOnClick = () => setModalOpen(!modalOpen);
  return (
    <>
      {/* 모달 */}
      {modalOpen && (
        <TwoBtnModal
          text="견적을 취소하시겠습니까?"
          leftBtnText="취소하기"
          leftBtnColor={colors.orange}
          rightBtnText="아니오"
          rightBtnColor={colors.main2}
          leftBtnControl={backPage}
          rightBtnControl={handleOnClick}
        />
      )}
      <MypageHeader
        title="내 견적서"
        cancel="견적 취소"
        back={true}
        handleOnClick={handleOnClick}
      />
      <EstimateContainer />

      <Mypage3_1 />
    </>
  );
};

export default Mypage3;
