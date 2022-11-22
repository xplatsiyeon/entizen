import React, { useEffect } from 'react';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import UpArrow from 'public/guide/up_arrow.svg';
import DownArrow from 'public/guide/down_arrow.svg';
import Image from 'next/image';
import { useState } from 'react';
import colors from 'styles/colors';
import styled from '@emotion/styled';
import MypageHeader from '../request/header';
import CommonBtns from './CommonBtns';
import { handleColorAS } from 'utils/changeValue';

type Props = {
  id?: number;
};

const AsRequest = ({ id }: Props) => {
  // alert(id)
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => setOpen(!open);

  return (
    <Body>
      <MypageHeader title={'A/S'} back={true} />
      <Wrapper>
        {/* Close */}
        <ItemButton onClick={handleClick}>
          <StoreName>
            {/* {id?<CommonBtns text={'A/S'} backgroundColor={handleColorAS(id)} />:null} */}
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
                <span className="text">GGO0M002203</span>
              </div>
              <div className="text-box">
                <span className="name">구독상품</span>
                <span className="text">부분구독</span>
              </div>
              <div className="text-box">
                <span className="name">구독기간</span>
                <span className="text">60개월</span>
              </div>
              <div className="text-box">
                <span className="name">수익지분</span>
                <span className="text">100 %</span>
              </div>
              <div className="text-box">
                <span className="name">충전기 종류 및 수량</span>
                <span className="text">
                  100 kW 충전기
                  <br />
                  :벽걸이, 싱글, 3 대
                </span>
              </div>
              <div className="text-box">
                <span className="name">충전기 설치 위치</span>
                <span className="text">건물 밖</span>
              </div>
              <div className="text-box">
                <span className="name">전기차 충전 사업</span>
                <span className="text">없음</span>
              </div>
            </Contents>
          </List>
        </Collapse>
      </Wrapper>
    </Body>
  );
};

export default AsRequest;

const Body = styled.div`
  display: none;
  @media (max-width: 899pt) {
    display: block;
  }
`;

const Wrapper = styled.div`
  display: block;
  box-shadow: 0px 3pt 7.5pt rgba(137, 163, 201, 0.4);
  padding-left: 15pt;
  padding-right: 15pt;
  @media (max-width: 899pt) {
    display: flex;
    flex-direction: column;
  }
`;

const Badge = styled.span`
  background: ${colors.orange};
  color: ${colors.lightWhite};
  border-radius: 12pt;
  padding: 4.5pt 7.5pt;
  font-weight: 500;
  font-size: 9pt;
  line-height: 9pt;
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
  padding-bottom: 21pt;
  .text-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    :not(:nth-of-type(1)) {
      padding-top: 12pt;
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
`;
