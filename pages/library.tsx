import styled from '@emotion/styled';
import MypageHeader from 'components/mypage/request/header';
import Image from 'next/image';
import React from 'react';
import colors from 'styles/colors';
import arrowImg from 'public/images/blueArrow16.png';
import newImg from 'public/images/new-label.png';
import { useRouter } from 'next/router';

const library = () => {
  const route = useRouter();
  const HandleOnClick = () => {
    // 어디로..?
    route.push('');
  };

  return (
    <div>
      <MypageHeader back={true} title={'엔티즌 도서관'} />
      <Body>
        {[1, 1, 1, 1, 1, 1, 1].map((_, index) => (
          <List onClick={HandleOnClick}>
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
            <NewIcon>
              <Image src={newImg} alt="new-icon" />
            </NewIcon>
          </List>
        ))}
      </Body>
    </div>
  );
};

export default library;

const Body = styled.ul`
  padding-top: 12pt;
  position: relative;
`;
const List = styled.li`
  display: flex;
  padding-left: 15pt;
  padding-bottom: 12pt;
  border-bottom: 0.75pt solid ${colors.lightGray};
  padding-top: 13.5pt;
  gap: 7.5pt;
  .badge-img {
    width: 44px;
    height: 44px;
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
`;
const NewIcon = styled.div`
  position: absolute;
`;
