import CommunicationBox from 'components/CommunicationBox';
import RequestModal from 'components/Modal/RequestModal';
import { useState } from 'react';
import BiddingQuote from './BiddingQuote';
import Checking from './Checking';
import ManagerInfo from './ManagerInfo';
import ScheduleChange from './ScheduleChange';
import ScheduleConfirm from './ScheduleConfirm';
import Button from 'components/mypage/request/Button';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import colors from 'styles/colors';

const Mypage2_1 = () => {
  const route = useRouter();
  const [partnerModal, setPartnerModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  // 모달 text
  const partnerTitle = () => {
    return (
      <>
        다른 파트너에게 <br />
        재견적을 받아보시겠습니까?
      </>
    );
  };
  const cofirmTitle = () => {
    return (
      <>
        Charge Point로 <br />
        확정하시겠습니까?
      </>
    );
  };

  return (
    <>
      {/* 일정 확정 */}
      <ScheduleConfirm />
      {/* 일정 변경 요청 */}
      <ScheduleChange />
      {/* 일정 변경 확인 중 */}
      <Checking />
      <BiddingQuote />
      {/* 담당자 정보 */}
      <ManagerInfo />
      <TextBox>
        <CommunicationBox
          text="파트너와 소통하기"
          clickHandler={() => route.push('/chatting/1-3')}
        />
      </TextBox>
      <Button
        setPartnerModal={setPartnerModal}
        setConfirmModal={setConfirmModal}
      />
      {/* 파트너 모달 */}
      {partnerModal && (
        <RequestModal
          title={partnerTitle}
          leftControl={() => setPartnerModal((prev) => !prev)}
          rightControl={() => route.push('/mypage/request')}
        />
      )}
      {/* 확정 모달 */}
      {confirmModal && (
        <RequestModal
          title={cofirmTitle}
          leftControl={() => setConfirmModal((prev) => !prev)}
          rightControl={() => route.push('/mypage/request')}
        />
      )}
    </>
  );
};

export default Mypage2_1;

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
