import styled from '@emotion/styled';
import TwoBtnModal from 'components/Modal/TwoBtnModal';
import EstimateContainer from 'components/mypage/request/EstimateContainer';
import MypageHeader from 'components/mypage/request/header';
import SubscriptionProduct from 'components/mypage/request/subscriptionProduct';
import RightArrow from 'public/images/black-right-arrow.svg';
import CommunicationIcon from 'public/images/communication-icon.svg';
import { useRouter } from 'next/router';
import { useState } from 'react';
import colors from 'styles/colors';
import Image from 'next/image';

const Mypage1_3 = ({ data }: any) => {
  const route = useRouter();
  // 모달 on / off
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // 모달 왼쪽, 오른쪽 버튼 핸들러
  const backPage = () => route.back();
  const handleOnClick = () => setModalOpen(!modalOpen);

  return (
    <>
      {modalOpen && (
        <TwoBtnModal
          text="견적을 취소하시겠습니까?"
          leftBtnText="취소하기"
          leftBtnColor={colors.orange}
          rightBtnText="아니오"
          rightBtnColor={colors.main2}
          modalOpen={modalOpen}
          leftBtnControll={backPage}
          rightBtnControll={handleOnClick}
        />
      )}
      <MypageHeader
        title="내 견적서"
        cancel="견적 취소"
        handleOnClick={handleOnClick}
      />
      <EstimateContainer />
      <SubscriptionProduct />
      <TextBox>
        <div>선택하기 어려우신가요?</div>
        <Button onClick={() => route.push('/chatting/1')}>
          <div>
            <Image src={CommunicationIcon} alt="right-arrow" />
          </div>
          엔티즌과 소통하기
          <div>
            <Image src={RightArrow} alt="right-arrow" />
          </div>
        </Button>
      </TextBox>
    </>
  );
};

export default Mypage1_3;

const TextBox = styled.div`
  width: 100%;
  padding-top: 75pt;
  margin-bottom: 9pt;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > div {
    font-weight: 500;
    font-size: 12pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
    color: ${colors.lightGray3};
  }
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15pt;
  padding: 10.5pt 12pt;
  border-radius: 21.75pt;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  background: #f3f4f7;
  color: ${colors.main2};
`;
