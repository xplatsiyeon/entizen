import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import React from 'react';
import colors from 'styles/colors';

type Props = {};

// 날짜 정하기
const CenterBox = (props: Props) => {
  const router = useRouter();
  return (
    <Wrapper>
      <DownArrowBox>
        <Image src={DoubleArrow} alt="double-arrow" />
      </DownArrowBox>
      <ReservationDate>
        <div className="text">현장실사 가능 날짜가 도착했습니다.</div>
        <div className="btnBox">
          <div
            className="btn right"
            onClick={() => router.push('/company/datePick')}
          >
            달력으로 확인하기
          </div>
          <div className="btn left">사진으로 대체하기</div>
        </div>
      </ReservationDate>
      <ConfirmedReservation>
        <div className="text">현장실사 일정이 확정되었습니다.</div>
        <div className="date">2022.01.12</div>
      </ConfirmedReservation>

      <SecondTitle>보낸 가견적서</SecondTitle>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  padding-top: 21pt;
  padding-left: 15pt;
  padding-right: 15pt;
  padding-bottom: 15pt;
  border-bottom: 1px solid #e2e5ed;
`;

const DownArrowBox = styled.div`
  display: flex;
  justify-content: center;
`;

// 보낸 가견적서
const SecondTitle = styled.div`
  font-family: Spoqa Han Sans Neo;
  margin-top: 30pt;
  color: ${colors.main};
  font-size: 15pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;
`;

const ReservationDate = styled.div`
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;
  margin-top: 15pt;
  border-radius: 6pt;
  padding: 18pt 24.75pt;
  .text {
    font-family: Spoqa Han Sans Neo;
    font-size: 12pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
    color: #747780;
  }
  .btnBox {
    display: flex;
    gap: 9pt;
    margin-top: 15pt;
    .right {
      background-color: ${colors.main};
      color: #eeeeee;
    }
    .left {
      border: 1px solid #222222;
      color: #222222;
    }
  }
  .btnBox > .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6pt 9pt;
    font-family: Spoqa Han Sans Neo;
    font-size: 10pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
    border-radius: 12pt;
  }
`;

const ConfirmedReservation = styled.div`
  padding: 18pt 45.75pt;
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;
  margin-top: 15pt;
  border-radius: 6pt;
  .text {
    font-family: Spoqa Han Sans Neo;
    color: #747780;
    margin-bottom: 12pt;
    font-size: 12pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
  .date {
    font-family: Spoqa Han Sans Neo;
    font-size: 15pt;
    font-weight: 500;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
`;

export default CenterBox;
