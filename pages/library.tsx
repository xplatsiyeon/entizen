import styled from '@emotion/styled';
import MypageHeader from 'components/mypage/request/header';
import Image from 'next/image';
import React from 'react';
import colors from 'styles/colors';
import arrowImg from 'public/images/blueArrow.png';
import { useRouter } from 'next/router';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';

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
        <WebInnerHeader>엔티즌 도서관</WebInnerHeader>
        <Body>
          {[1, 1, 1, 1, 1, 1, 1].map((_, index) => (
            <List key={index} onClick={HandleOnClick}>
              <div className="badge-img">
                {/* <Image src={} alt="badge" /> */}
              </div>
              <div className="text-box">
                <div>엔티즌을 더 잘 쓰는 꿀팁 확인하기</div>
                <div className="color-box">
                  <div className="color-text">자세히 보기</div>

                  <span className="arrow-img">
                    <Image src={arrowImg} alt="arrow" layout="fill" />
                  </span>
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
  background: #fcfcfc;
  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;
const WebInnerHeader = styled.h1`
  font-weight: 700;
  font-size: 25.5pt;
  line-height: 37.5pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding-top: 55.5pt;
  padding-bottom: 45pt;
  text-align: center;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;
const Body = styled.ul`
  margin-top: 12.75pt;
  padding-right: 10.5pt;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 899.25pt) {
    position: relative;
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
  border-radius: 12pt;
  margin-top: 0;
  margin: 0 auto 45.75pt auto;
  @media (max-width: 899.25pt) {
    width: 100%;
    position: relative;
    margin: 0 auto;
    padding: 0;
    background: none;
  }
`;
const List = styled.li`
  display: flex;
  gap: 15pt;
  width: 436.5pt;
  height: 120pt;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 16px;
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
    gap: 9.75pt;
    font-weight: 400;
    font-size: 19.5pt;
    line-height: 18pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .color-box {
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;
    color: ${colors.main};
  }
  .color-text {
    position: relative;
    top: 1.2pt; //  가운데 정렬 디테일 수정
    font-weight: 500;
    font-size: 13.5pt;
    line-height: 15pt;
  }
  .arrow-img {
    position: relative;
    width: 15pt;
    height: 15pt;
  }
  @media (max-width: 899.25pt) {
    width: 100%;
    margin-bottom: 0;
    border-radius: 0;
    height: auto;
    gap: 7.5pt;
    border-bottom: 0.75pt solid ${colors.lightGray};
    box-shadow: none;
    padding: 13.5pt 0 12pt;
    .text-box {
      font-size: 12pt;
      gap: 3pt;
    }
    .badge-img {
      width: 44px;
      height: 44px;
      margin-left: 15pt;
    }
    .color-text {
      top: 0.7pt; //  가운데 정렬 디테일 수정
      font-size: 9pt;
    }
    .arrow-img {
      width: 9pt;
      height: 9pt;
    }
  }
`;
const NewIcon = styled.div`
  position: absolute;
`;

/*
 */
