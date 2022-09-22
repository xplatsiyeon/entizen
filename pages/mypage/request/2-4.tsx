import styled from '@emotion/styled';
import MypageHeader from 'components/mypage/request/header';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Calendar from 'components/mypage/request/Calendar';
import ScheduleIcon from 'public/mypage/schedule-icon.svg';
import colors from 'styles/colors';
import Image from 'next/image';
import { Button } from '@mui/material';
import Modal from 'components/Modal/Modal';

const Mypage2_4 = () => {
  const route = useRouter();
  const [selectedDays, SetSelectedDays] = useState<string[]>([]); // 클릭 날짜
  const [isModal, setModal] = useState(false);

  return (
    <Wrapper>
      {/* 모달 / 라우터 수정  */}
      {isModal && (
        <Modal text="변경 요청 되었습니다." click={() => route.push('/')} />
      )}
      <MypageHeader title="다른 날짜 선택" exitBtn={true} back={true} />
      <Title>가능한 날짜를 선택해주세요</Title>
      <Calendar selectedDays={selectedDays} SetSelectedDays={SetSelectedDays} />
      <UL>
        {selectedDays.map((day, index) => (
          <li className="list" key={index}>
            <div className="img-box">
              <Image src={ScheduleIcon} alt="img" />
            </div>
            <div className="due-date">
              <div>현장실사 방문 예정일</div>
              <div>{day}</div>
            </div>
          </li>
        ))}
      </UL>
      <Btn onClick={() => setModal((prev) => !prev)}>변경 요청</Btn>
    </Wrapper>
  );
};

export default Mypage2_4;

const Wrapper = styled.div`
  padding-bottom: 225pt;
`;
const Title = styled.h1`
  font-weight: 500;
  font-size: 18pt;
  line-height: 24pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding-left: 15pt;
  padding-top: 27pt;
`;
const UL = styled.ul`
  padding: 24pt 15pt 0 15pt;
  .list {
    background-color: rgba(90, 45, 201, 0.7);
    border-radius: 6pt;
    padding: 6pt;
    margin-bottom: 9pt;
    display: flex;
    gap: 12pt;
  }
  .due-date {
    font-weight: 500;
    font-size: 9pt;
    line-height: 9pt;
    letter-spacing: -0.02em;
    padding-top: 2pt;
    color: ${colors.lightWhite};
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;
const Btn = styled(Button)`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  background: ${colors.main};
  padding-top: 15pt;
  padding-bottom: 39pt;
`;
