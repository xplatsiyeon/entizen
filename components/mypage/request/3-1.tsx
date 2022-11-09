import CommunicationBox from 'components/CommunicationBox';
import RequestModal from 'components/Modal/RequestModal';
import { useState } from 'react';
import BiddingQuote from 'components/mypage/request/BiddingQuote3-1';
import Checking from 'components/mypage/request/Checking';
import ManagerInfo from 'components/mypage/request/ManagerInfo';
import ScheduleChange from 'components/mypage/request/ScheduleChange';
import ScheduleConfirm from 'components/mypage/request/ScheduleConfirm';
import Button from 'components/mypage/request/Button';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import colors from 'styles/colors';

const Mypage3_1 = () => {
  const route = useRouter();
  const [partnerModal, setPartnerModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  return (
    <>
      {/* 일정 확정 */}
      {/* <ScheduleConfirm /> */}

      {/* <BiddingQuote /> */}
      {/* 담당자 정보 */}
      {/* <ManagerInfo /> */}
      <TextBox>
        <CommunicationBox
          text="파트너와 소통하기"
          clickHandler={() => alert('개발중입니다.')}
        />
      </TextBox>
      <Button
        setPartnerModal={setPartnerModal}
        setConfirmModal={setConfirmModal}
      />
      {/* 파트너 모달 */}
      {partnerModal && (
        <RequestModal
          exit={() => setPartnerModal((prev) => !prev)}
          title={'다른 파트너에게\n 재견적을 받아보시겠습니까?'}
          leftControl={() => setPartnerModal((prev) => !prev)}
          rightControl={() => route.push('/mypage/request/3-2')}
        />
      )}
      {/* 확정 모달 */}
      {confirmModal && (
        <RequestModal
          exit={() => setConfirmModal((prev) => !prev)}
          title={'Charge Point로\n 확정하시겠습니까?'}
          leftControl={() => setConfirmModal((prev) => !prev)}
          rightControl={() => route.push('/mypage/request/3-2')}
        />
      )}
    </>
  );
};

export default Mypage3_1;

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
