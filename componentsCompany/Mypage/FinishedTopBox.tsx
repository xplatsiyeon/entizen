import styled from '@emotion/styled';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import colors from 'styles/colors';
import UpArrow from 'public/guide/up_arrow.svg';
import DownArrow from 'public/guide/down_arrow.svg';
import CommonBtns from 'components/mypage/as/CommonBtns';

type Props = {};

const FinishedTopBox = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Wrapper>
      <ItemButton onClick={() => setOpen(!open)}>
        <StoreName>
          <div className="badge">구독종료 D-678</div>
          <div>
            <h1>LS 카페 신림점</h1>
            {open ? (
              <ArrowImg>
                <Image src={DownArrow} alt="down_arrow" layout="fill" />
              </ArrowImg>
            ) : (
              <ArrowImg>
                <Image src={UpArrow} alt="up_arrow" layout="fill" />
              </ArrowImg>
            )}
          </div>
          <p>서울시 관악구 난곡로40길 30</p>
        </StoreName>
      </ItemButton>
      {/* Open */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Contents>
            <div className="text-box">
              <span className="name">프로젝트 번호</span>
              <span className="text">SEY0G002201</span>
            </div>
            <div className="text-box">
              <span className="name">구독상품</span>
              <span className="text">부분구독</span>
            </div>
            <div className="text-box">
              <span className="name">구독시작</span>
              <span className="text">22.03/17</span>
            </div>
            <div className="text-box">
              <span className="name">구독종료</span>
              <span className="text">25.03.16</span>
            </div>
            <div className="text-box">
              <span className="name">월 구독료</span>
              <span className="text">149,000 원</span>
            </div>
            <div className="text-box">
              <span className="name">충전요금</span>
              <span className="text">240 월/kW</span>
            </div>
            <div className="text-box">
              <span className="name">수익지분</span>
              <span className="text">50 %</span>
            </div>
            <div className="text-box">
              <span className="name">충전기 종류 및 수량</span>
              <span className="text">
                7 kW 충전기 (공용)
                <br />
                :벽걸이, 싱글, 2 대
              </span>
            </div>
            <div className="text-box">
              <span className="name">충전기 설치 목적</span>
              <span className="text">모객 효과</span>
            </div>
            <div className="text-box">
              <span className="name">충전기 제조사</span>
              <span className="text">LS ELECTRIC</span>
            </div>
          </Contents>
        </List>
      </Collapse>
    </Wrapper>
  );
};
const CustomerRequestContent = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.02em;
  text-align: center;
  color: ${colors.main};
  margin-top: 21pt;
`;

const Wrapper = styled.div`
  display: block;
  border-top: none;
  box-shadow: 0px 3pt 7.5pt -3pt #89a3c966;
  padding-left: 15pt;
  padding-right: 15pt;
  /* border-top: 1px solid #e2e5ed; */
  @media (max-width: 899pt) {
    display: flex;
    flex-direction: column;
  }
`;

const ItemButton = styled(ListItemButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  & div {
    margin: 0;
  }
`;

const StoreName = styled(ListItemText)`
  padding-top: 16.5pt;
  padding-bottom: 16.5pt;
  margin-top: 4.5pt;
  & div {
    margin-top: 12pt;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
  }
  .badge {
    padding: 4.5pt 7.5pt;
    background-color: ${colors.main};
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Spoqa Han Sans Neo;
    font-size: 9pt;
    width: 70pt;
    font-weight: 500;
    line-height: 9pt;
    letter-spacing: -0.02em;
    text-align: center;
    border-radius: 12pt;
  }
  & div > h1 {
    font-weight: 700;
    font-size: 15pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  & div > img {
    display: flex;
    align-items: center;
  }
  & p {
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 18pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
`;

const ArrowImg = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 6.5pt;
  width: 18pt;
  height: 18pt;
`;

const Contents = styled.div`
  padding-top: 19.5pt;
  padding-bottom: 18pt;
  border-bottom: 1px solid #e9eaee;
  .text-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    :not(:nth-of-type(1)) {
      padding-top: 12pt;
    }

    .emailText {
      font-family: Spoqa Han Sans Neo;
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: right;
    }
  }

  .name {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
  }
  .text {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: right;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .img-box {
    padding-top: 42pt;
    padding-bottom: 24pt;
    text-align: center;
  }

  .phone {
    text-decoration: underline;
    color: ${colors.main};
  }
`;

const Partner = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: 0em;
  text-align: left;
  padding-bottom: 24pt;
`;

export default FinishedTopBox;
