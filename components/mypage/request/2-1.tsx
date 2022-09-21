import BiddingQuote from './BiddingQuote';
import ManagerInfo from './ManagerInfo';
import ScheduleChange from './ScheduleChange';
import ScheduleConfirm from './ScheduleConfirm';

const Mypage2_1 = () => {
  return (
    <>
      {/* request 2-1 페이지 */}
      {/* 일정 확정 */}
      <ScheduleConfirm />
      {/* 일정 변경 요청 */}
      <ScheduleChange />
      <BiddingQuote />
      {/* 담당자 정보 */}
      <ManagerInfo />
    </>
  );
};

export default Mypage2_1;
