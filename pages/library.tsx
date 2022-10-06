import styled from '@emotion/styled';
import MypageHeader from 'components/mypage/request/header';
import Image from 'next/image';
import React from 'react';
import colors from 'styles/colors';
import arrowImg from 'public/images/blueArrow16.png';
import newImg from 'public/images/new-label.png';
import { useRouter } from 'next/router';
import WebHeader from 'web-components/WebHeader';
import WebFooter from 'web-components/WebFooter';

const Library = () => {
  const route = useRouter();
  const HandleOnClick = () => {
    window.open('http://post.naver.com/entizen_ev', 'entizen_post');
  };

  return (
    <WebBody>
    <WebHeader />
        <Inner>
      <MypageHeader back={true} title={'엔티즌 도서관'} />
      <Body>
        {[1, 1, 1, 1, 1, 1, 1].map((_, index) => (
          <List key={index} onClick={HandleOnClick}>
            <div className="badge-img">
              {/* <Image src={} alt="badge" /> */}
            </div>
            <div className="text-box">
              <div>추후 문구 추가</div>
              <div className="color-text">
                자세히 보기
                <div className="arrow-img">
                  <Image src={arrowImg} alt="arrow" layout="fill" />
                </div>
              </div>
            </div>
            {/* 뉴 아이콘 */}
            {/* <NewIcon>
              <Image src={newImg} alt="new-icon" />
            </NewIcon> */}
          </List>
        ))}
      </Body>
      </Inner>
        <WebFooter />
    </WebBody>
  );
};

export default Library;
const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  //height: 810pt;
  background: #fcfcfc;
  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;
const Body = styled.ul`
  margin-top: 12.75pt;
  padding-right: 10.5pt;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 899pt) {
  //padding-top: 12pt;
  position: relative;
  //padding-left: 9.75pt;
  padding-right: 0pt;
  box-shadow: 0px 0px 10px 0px #89a3c933;
  border-radius: 6pt;
  display: block;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  width: 900pt;
  height: 100%;
  //width: 281.25pt;
  border-radius: 12pt;
  margin: 45.75pt auto ;

  @media (max-width: 899pt) {
    width: 100%;
    position: relative;
    margin: 0 auto;
    padding: 0;
    background: none;
  }
`;


const List = styled.li`
  display: flex;
  gap: 7.5pt;
  width: 436.5pt;
  height: 120pt;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 16px;
  padding: 13.5pt 0 12pt;
  align-items: center;
  margin-bottom: 22.5pt;

  .badge-img {
    width: 75pt;
    height: 75pt;
    margin-left: 22.5pt;
    border-radius: 50%;
    background: ${colors.lightWhite};
    border: 1px solid #e2e5ed;
  }
  .text-box {
    display: flex;
    flex-direction: column;
    gap: 3pt;
    font-weight: 400;
    font-size: 12pt;
    line-height: 18pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .color-text {
    display: flex;
    font-weight: 500;
    font-size: 9pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
    color: ${colors.main};
  }
  .arrow-img {
    position: relative;
    top: 1.87pt;
    width: 9pt;
    height: 9pt;
  }

  @media (max-width: 899pt) {
  width:100% ;
  margin-bottom: 0;
  height: auto;
  border-bottom: 0.75pt solid ${colors.lightGray};
  box-shadow: none;
  border-radius: 0;
  .badge-img {
    width: 44px;
    height: 44px;
    margin-left: 15pt;
  }
  }
  
`;
const NewIcon = styled.div`
  position: absolute;
`;


/*
 */