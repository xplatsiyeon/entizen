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
import { useDispatch } from 'react-redux';
import { requestAction } from 'store/requestSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

const Mypage2_1 = () => {
  const router = useRouter();
  const { pickDate, selectedDate } = useSelector(
    (state: RootState) => state.requestList,
  );
  const [partnerModal, setPartnerModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  return (
    <>
      {/* 일정 확정 */}
      {/* <ScheduleConfirm date={pickDate ? pickDate : selectedDate[0]} /> */}
      {/* 일정 변경 요청 */}
      {/* <ScheduleChange /> */}
      {/* 일정 변경 확인 중 */}
      {/* <Checking /> */}
      {/* 담당자 정보 */}
      {/* <ManagerInfo /> */}
      <TextBox>
        <CommunicationBox
          text="파트너와 소통하기"
          clickHandler={() => alert('개발중입니다.')}
        />
      </TextBox>
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
