import styled from '@emotion/styled';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import CommonBtns from 'components/mypage/as/CommonBtns';
import Image from 'next/image';
import UpArrow from 'public/guide/up_arrow.svg';
import DownArrow from 'public/guide/down_arrow.svg';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import React, { Dispatch, SetStateAction } from 'react';
import colors from 'styles/colors';
import { handleColor, handleColor2 } from 'utils/changeValue';
import { testArr2 } from 'pages/mypage/place/[id]';

interface Data {
  id: number;
  state:number;
  badge: string;
  storeName: string;
  date: string;
  contract : boolean;
  address : string;
  planed : string[]; // 인덱스[0]: 준비 목표일, [1]: 설치 목표일, [2]: 검수 목표일, [3]: 완료 목표일
}

type Props = {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  handleClick?: () => void;
  className?: string;
  info: Data | testArr2 ;
  tap: 'estimate' | 'project' |'as'|'place' ;
};

const TopBox = ({ open, className, setOpen, handleClick, info, tap }: Props) => {


  let bgColor='' ;
  let title='';
  let tapType ;

  switch(tap){

    case 'place' : 
    if(info.badge === 4){
      title  = `구독시작 ${info.date}`
    }else{
      title = `구독종료 ${info.date}`
    };
    if(typeof(info.badge) === 'number') bgColor = handleColor2(info.badge);
    break;

    case 'project' :
      if(typeof(info.badge)==='string'){
        title = info.badge;
        bgColor = handleColor(info.badge);
      }
      break;
  }




  const init = 
  <Wrapper className={className !== undefined ? className : ''}>
    <ItemButton onClick={handleClick}>
      <StoreName> 
        <CommonBtns text={'계약대기'} backgroundColor={bgColor}/> 
        <div>
          {<h1>LS 카페 신림점</h1>}
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
        <Contents>
          <Partner>파트너 정보</Partner>
          <div className="text-box">
            <span className="name">이름</span>
            <span className="text">윤세아</span>
          </div>
          <div className="text-box">
            <span className="name">이메일</span>
            <span className="text emailText">sayoon@LS-CaaS.com</span>
          </div>
          <div className="text-box">
            <span className="name">연락처</span>
            <span className="text phone">010-3522-2250</span>
          </div>
        </Contents>
      </List>
    </Collapse>
  </Wrapper>

  return (
    <>
    {info !== undefined ?
    <Wrapper className={className !== undefined ? className : ''}>
      <ItemButton onClick={handleClick}>
        <StoreName> 
          <CommonBtns text={title} backgroundColor={bgColor}/> 
          <div>
            <h1>{info.storeName}</h1>
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
          <p>{info.address}</p>
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
          <Contents>
            <Partner>파트너 정보</Partner>
            <div className="text-box">
              <span className="name">이름</span>
              <span className="text">윤세아</span>
            </div>
            <div className="text-box">
              <span className="name">이메일</span>
              <span className="text emailText">sayoon@LS-CaaS.com</span>
            </div>
            <div className="text-box">
              <span className="name">연락처</span>
              <span className="text phone">010-3522-2250</span>
            </div>
          </Contents>
        </List>
      </Collapse>
    </Wrapper>
    : init}
    </>
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

export default TopBox;
