import styled from '@emotion/styled';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import CommonBtns from 'components/mypage/as/CommonBtns';
import Image from 'next/image';
import { useState } from 'react';
import UpArrow from 'public/guide/up_arrow.svg';
import DownArrow from 'public/guide/down_arrow.svg';
import { handleColorAS } from 'utils/changeValue';
import colors from 'styles/colors';

type Props = {
  id?: number;
};

const AsCompTop = ({ id }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => setOpen(!open);

  // mock data 충전기 위치 갯수에 따라서 나오는 위치도 변경댐!
  // const data = [0];
  const data = [0, 1, 2];

  return (
    <>
      <Wrapper>
        {/* Close */}
        <ItemButton onClick={handleClick}>
          <StoreName>
            {/* a/s 히스토리는 완료된 배지만 사용 (검은색) */}
            <CommonBtns text={'A/S'} backgroundColor={handleColorAS(3)} />
            <div>
              <h1>LS 안양 주유소</h1>
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
            <p>경기도 안양시 동안구 엘에스로 127</p>
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
                <span className="text">60 개월</span>
              </div>
              <div className="text-box">
                <span className="name">수익지분</span>
                <span className="text">100%</span>
              </div>

              {/* 충전기 종류 및 수량은 복수일 수 있으므로... 임의의 배열.map() 해둠*/}
              <div className="text-box  charger-list">
                <span className="name">충전기 종류 및 수량</span>
                <div className="charger">
                  {data.map((el, index) => {
                    return (
                      <span className="text" key={index}>
                        100kW 충전기
                        <br />
                        {':'}
                        스탠드, 싱글, 3대
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* 충전기 설치 위치는 복수일 수 있으므로... 임의의 배열.map() 해둠*/}
              {/* 충전기 제조사 1개 일 때 */}
              <>
                {data.length === 1 && (
                  <div className="text-box charger-place">
                    <span className="name">충전기 설치 위치</span>
                    <div className="charger">
                      {[0].map((el, index) => {
                        return (
                          <span className="text" key={index}>
                            건물 밖
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>

              <div className="text-box">
                <span className="name">충전기 설치 목적</span>
                <span className="text">전기차 충전 사업</span>
              </div>
              <div className="text-box">
                <span className="name">기타 요청 사항</span>
                <span className="text">없음</span>
              </div>
              {/* 충전기 제조사 2개 이상 일 때 */}
              {data.length !== 1 && (
                <>
                  <MultiSection>
                    <BorderTop></BorderTop>
                    <Subtitle>충전기 설치위치</Subtitle>
                    {data.map((item, index) => (
                      <MultiBox key={index}>
                        <Item>
                          <span className="name">100kW 충전기(공용)</span>
                          <span className="value">건물 안</span>
                        </Item>
                      </MultiBox>
                    ))}
                  </MultiSection>
                </>
              )}
            </Contents>
          </List>
        </Collapse>
      </Wrapper>
    </>
  );
};

export default AsCompTop;

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
    &.charger-list {
      align-items: flex-start;
    }
    &.charger-place {
      align-items: flex-start;
    }
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
  .charger {
    display: flex;
    flex-direction: column;
    span {
      margin-bottom: 6pt;
    }
  }
  .img-box {
    padding-top: 42pt;
    padding-bottom: 24pt;
    text-align: center;
  }
`;
const BorderTop = styled.div`
  border-top: 1px solid #e9eaee;
  padding: 0 15pt;
  padding-bottom: 15pt;
`;
const MultiSection = styled.div`
  padding-top: 18pt;
  display: flex;
  flex-direction: column;
  gap: 12pt;

  :nth-of-type(1) {
    padding-bottom: 18pt;
    margin-top: 18pt;
    border-bottom: 0.75pt solid ${colors.lightGray};
    border-top: 0.75pt solid ${colors.lightGray};
  }
`;
const MultiBox = styled.div`
  padding-top: 3pt;
`;
const Item = styled.li`
  display: flex;

  :not(:nth-of-type(1)) {
    padding-top: 12pt;
  }
  .name {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
    flex: 1;
  }
  .value {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: left;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    flex: 2;
  }

  @media (max-width: 899pt) {
    justify-content: space-between;
    .name {
      flex: none;
    }
    .value {
      flex: none;
      text-align: right;
    }
  }
`;

const Subtitle = styled.h2`
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
