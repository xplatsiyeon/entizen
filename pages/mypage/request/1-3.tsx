import styled from '@emotion/styled';
import TwoBtnModal from 'components/Modal/TwoBtnModal';
import EstimateContainer from 'components/mypage/request/estimateContainer';
import MypageHeader from 'components/mypage/request/header';
import SubscriptionProduct from 'components/mypage/request/subscriptionProduct';
import { useRouter } from 'next/router';
import { useState } from 'react';
import colors from 'styles/colors';
import Mypage1_4 from './1-4';
import BiddingQuote from 'components/mypage/request/BiddingQuote';
import ScheduleConfirm from 'components/mypage/request/ScheduleConfirm';
import ScheduleChange from 'components/mypage/request/ScheduleChange';
import ManagerInfo from 'components/mypage/request/ManagerInfo';
import CommunicationBox from 'components/CommunicationBox';
import Mypage2_1 from 'components/mypage/request/2-1';
import Button from 'components/mypage/request/Button';
import WebHeader from 'web-components/WebHeader';
import WebFooter from 'web-components/WebFooter';
import Request from '..';
import RequestMain from 'components/mypage/request/requestMain';


const Mypage1_3 = ({ data }: any) => {
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
      )}<Body>
      <WebHeader num={0} now={'mypage'} />
      <Inner>
        <FlexBox>
          <Wrap1>
            <RequestMain />
          </Wrap1>
          <Wrap2>
      <MypageHeader
        title="내 견적서"
        cancel="견적 취소"
        back={true}
        handleOnClick={handleOnClick}
      />
      <EstimateContainer />
      {/* request 1-3 */}
      <SubscriptionProduct />
      <TextBox>
        <div>선택하기 어려우신가요?</div>
        <CommunicationBox
          text="엔티즌과 소통하기"
          clickHandler={() => route.push('/chatting/1')}
        />
      </TextBox>
      </Wrap2>
        </FlexBox>
      </Inner>
      <WebFooter />
    </Body>

      {/* request 2-3 */}
      {/* <Mypage2_1 /> */}
    </>
  );
};

export default Mypage1_3;


const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  //height: 810pt;
  background: #fcfcfc;

  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  width: 900pt;
  margin: 45.75pt auto 0;

  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0 auto;
  }
`;

const FlexBox = styled.div`
  display: flex;
  position: relative;
`;

const Wrap1 = styled.div`
  //width: 255pt;
  border: 1px solid #e9eaee;
  border-radius: 6pt;
  height: 100%;

  @media (max-width: 899pt) {
    display: none;
  }
`;
const Wrap2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 60pt;

  @media (max-width: 899pt) {
    padding-left: 0pt;
  }
`;

const TextBox = styled.div`
  width: 100%;
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
  @media (max-width: 899pt) {
  padding-top: 75pt;
  }
`;
