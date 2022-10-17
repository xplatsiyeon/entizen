import React, { useEffect } from 'react';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import UpArrow from 'public/guide/up_arrow.svg';
import DownArrow from 'public/guide/down_arrow.svg';
import Image from 'next/image';
import { useState } from 'react';
import colors from 'styles/colors';
import styled from '@emotion/styled';

import { useRouter } from 'next/router';

import MypageHeader from 'components/SignUp/header';
import CommonBtns from 'components/mypage/as/CommonBtns';
import Btn from 'components/SignUp/button';

type Props = {};

const HeadOpenContent = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const router = useRouter();
  useEffect(() => {
    if (router.pathname.includes('1-1')) {
      setText('접수요청 D-3');
    }
    if (router.pathname.includes('asGoReview')) {
      setText('완료대기');
    }
    if (router.pathname.includes('asReviewEnd')) {
      setText('A/S완료');
    }
  }, [router]);
  console.log(router);

  const handleClick = () => setOpen(!open);
  const handleBackClick = () => {
    router.back();
  };

  return (
    <>
      <MypageHeader
        back={true}
        title={'받은 요청'}
        handleBackClick={handleBackClick}
      />

      <Wrapper>
        <ItemButton onClick={handleClick}>
          <StoreName>
            <CommonBtns text={'접수요청 D-1'} backgroundColor={'#F75015'} />

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

      <Btn
        isClick={true}
        handleClick={handleBackClick}
        text={'가견적 작성하기'}
        paddingOn={true}
      />
    </>
  );
};

const Wrapper = styled.div`
  display: block;
  box-shadow: 0px 3pt 7.5pt rgba(137, 163, 201, 0.4);
  /* width: 100%; */
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

export default HeadOpenContent;
