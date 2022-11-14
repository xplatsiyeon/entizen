import styled from "@emotion/styled";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material"
import Image from "next/image";
import { useState } from "react";
import colors from "styles/colors";
import CommonBtns from "../as/CommonBtns";

import UpArrow from 'public/guide/up_arrow.svg';
import DownArrow from 'public/guide/down_arrow.svg';
import { testArr2 } from "pages/mypage/place/[id]";
import { handleColor2 } from "utils/changeValue";

type Props ={
  data : testArr2;
}


const PlaceTopBox =({data}:Props)=>{

    const [open, setOpen] = useState<boolean>(false);

    let title ='';
    let bgColor ='';

    if(data){
      data.badge === 4 ? title = `구독시작 ${data.date}` : title = `구독종료 ${data.date}`
      bgColor = handleColor2(data.badge)
    }

    return (
    <Wrapper>
        <ItemButton onClick={()=>setOpen(!open)}>
        <StoreName> 
          <CommonBtns text={title} backgroundColor={bgColor}/> 
          <div>
            <h1>{data.storeName}</h1>
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
          <p>{''}</p>
        </StoreName>
      </ItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit >
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
            <span className="name">충전기 설치 목적</span>
            <span className="text">모객 효과</span>
          </div>
          <div className="text-box">
            <span className="name">기타 요청사항</span>
            <span className="text">없음</span>
          </div>
        </Contents>
      </List>
        </Collapse>
    </Wrapper>
    )
}

export default PlaceTopBox;


const Wrapper = styled.div`
  display: block;
  border-top: none;
  box-shadow: 0px 3pt 7.5pt -3pt #89a3c966;
  padding-left: 15pt;
  padding-right: 15pt;
  margin-top: 6pt;
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
  padding-top: 6pt;
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