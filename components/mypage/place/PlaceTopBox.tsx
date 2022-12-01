import styled from '@emotion/styled';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import colors from 'styles/colors';
import CommonBtns from '../as/CommonBtns';

import UpArrow from 'public/guide/up_arrow.svg';
import DownArrow from 'public/guide/down_arrow.svg';
import { testArr2 } from 'pages/mypage/place';
import { handleColor, handleColor2 } from 'utils/changeValue';
import {
  ChargingStations,
  FinalQuotation,
  FinalQuotationChargers,
} from 'QueryComponents/UserQuery';
import {
  convertEn,
  convertKo,
  PriceBasicCalculation,
} from 'utils/calculatePackage';
import {
  InstallationPurposeType,
  InstallationPurposeTypeEn,
  M5_LIST,
  M5_LIST_EN,
  M6_LIST,
  M6_LIST_EN,
  M7_LIST,
  M7_LIST_EN,
  subscribeType,
  subscribeTypeEn,
} from 'assets/selectList';

type Props = {
  data: ChargingStations;
};

const PlaceTopBox = ({ data }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const addCharge = (FinalQuotationChargers: FinalQuotationChargers[]) => {
    return FinalQuotationChargers?.map((el) => el.chargePrice).reduce(
      (prev, curr) => prev + curr,
      0,
    );
  };

  return (
    <Wrapper>
      <ItemButton onClick={() => setOpen(!open)}>
        <StoreName>
          <CommonBtns
            text={data?.badge}
            backgroundColor={handleColor(data?.badge)}
          />
          <div>
            <h1>{data?.projectName}</h1>
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
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Contents>
            <div className="text-box">
              <span className="name">프로젝트 번호</span>
              <span className="text">{data?.projectNumber}</span>
            </div>
            <div className="text-box">
              <span className="name">구독상품</span>
              <span className="text">
                {convertKo(
                  subscribeType,
                  subscribeTypeEn,
                  data?.finalQuotation?.subscribeProduct,
                )}
              </span>
            </div>
            <div className="text-box">
              <span className="name">구독시작</span>
              <span className="text">
                {data?.subscribeStartDate.replaceAll('-', '.')}
              </span>
            </div>
            <div className="text-box">
              <span className="name">구독종료</span>
              <span className="text">
                {data?.subscribeEndDate.replaceAll('-', '.')}
              </span>
            </div>
            <div className="text-box">
              <span className="name">월 구독료</span>
              <span className="text">
                {`${PriceBasicCalculation(
                  data?.finalQuotation.subscribePricePerMonth,
                )} 원`}
              </span>
            </div>
            <div className="text-box">
              <span className="name">충전요금</span>
              <span className="text">
                {`${PriceBasicCalculation(
                  addCharge(data?.finalQuotation?.finalQuotationChargers),
                )} 원/kW`}
              </span>
            </div>
            <div className="text-box">
              <span className="name">수익지분</span>
              <span className="text">
                {`${Math.floor(
                  Number(data?.finalQuotation?.userInvestRate) * 100,
                )} %`}
              </span>
            </div>
            {/* 충전기 종류 및 수량 */}
            {data?.finalQuotation?.finalQuotationChargers?.map(
              (item, index) => (
                <div className="text-box">
                  {index === 0 ? (
                    <span className="name">충전기 종류 및 수량</span>
                  ) : (
                    <span className="name" />
                  )}
                  <span className="text">
                    {convertKo(M5_LIST, M5_LIST_EN, item.kind)}
                    <br />
                    {item.standType
                      ? `: ${convertKo(
                          M6_LIST,
                          M6_LIST_EN,
                          item.standType,
                        )}, ${convertKo(M7_LIST, M7_LIST_EN, item.channel)}, ${
                          item.count
                        } 대`
                      : `: ${convertKo(M7_LIST, M7_LIST_EN, item.channel)}, ${
                          item.count
                        } 대`}
                  </span>
                </div>
              ),
            )}
            <div className="text-box">
              <span className="name">충전기 설치 목적</span>
              {/* 영어 변경 */}
              <span className="text">
                {convertKo(
                  InstallationPurposeType,
                  InstallationPurposeTypeEn,
                  data?.finalQuotation?.quotationRequest?.installationPurpose,
                )}
              </span>
            </div>
            {/* 현재 충전기 종류 및 수량처럼 개수만 증가 */}
            {data?.finalQuotation?.finalQuotationChargers.map((el, idx) => (
              <div className="text-box">
                <span className="name">
                  {idx === 0 ? '충전기 제조사' : null}
                </span>
                <span className="text">{el.manufacturer}</span>
              </div>
            ))}
          </Contents>
        </List>
      </Collapse>
    </Wrapper>
  );
};

export default PlaceTopBox;

const Wrapper = styled.div`
  display: block;
  border-top: none;
  box-shadow: 0px 3pt 7.5pt -3pt #89a3c966;
  padding-left: 15pt;
  padding-right: 15pt;
  margin-top: 6pt;

  /* border-top: 1px solid #e2e5ed; */
  @media (max-width: 899.25pt) {
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
      font-family: 'Spoqa Han Sans Neo';
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
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: 0em;
  text-align: left;
  padding-bottom: 24pt;
`;
