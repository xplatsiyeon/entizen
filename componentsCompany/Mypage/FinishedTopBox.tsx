import styled from '@emotion/styled';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import colors from 'styles/colors';
import UpArrow from 'public/guide/up_arrow.svg';
import DownArrow from 'public/guide/down_arrow.svg';
import { HistoryProjectsDetail } from 'QueryComponents/CompanyQuery';
import { convertKo } from 'utils/calculatePackage';
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
import { handleColor } from 'utils/changeValue';

type Props = {
  data: HistoryProjectsDetail;
};

const FinishedTopBox = ({ data }: Props) => {
  const formatter = new Intl.NumberFormat('ko');
  const formatter2 = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });
  const today = new Date();
  const started = new Date(data?.subscribeEndDate);
  // today - started
  const subscribePassed = Math.ceil(
    (started.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  const [open, setOpen] = useState<boolean>(false);

  const homeSelect = data?.finalQuotation?.finalQuotationChargers?.filter(
    (el) => el.kind === '7-HOME',
  );

  return (
    <Wrapper>
      <ItemButton onClick={() => setOpen(!open)}>
        <StoreName>
          <span className="badge">{`구독종료 D-${subscribePassed}`}</span>
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
          {/* <p>서울시 관악구 난곡로40길 30</p> */}
          {/* <p>현재 data에 전체 주소가 안오고 있음 백엔드 수정 된다면 여기에 전체 주소 넣어주세용</p> */}
        </StoreName>
      </ItemButton>
      {/* Open */}
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
                {data?.subscribeStartDate?.replaceAll('-', '.')}
              </span>
            </div>
            <div className="text-box">
              <span className="name">구독종료</span>
              <span className="text">
                {data?.subscribeEndDate?.replaceAll('-', '.')}
              </span>
            </div>
            <div className="text-box">
              <span className="name">월 구독료</span>
              <span className="text">{`${formatter.format(
                Number(data?.finalQuotation?.subscribePricePerMonth!),
              )} 원`}</span>
            </div>
            <div className="text-box">
              {/* <span className="text">
                {`${formatter.format(
                  Number(
                    data?.finalQuotation?.finalQuotationChargers[0]
                      ?.chargePrice,
                  ),
                )} 월/kW`}
              </span> */}
              <span className="name">충전요금</span>
              {data?.finalQuotation?.finalQuotationChargers[0]
                .chargePriceType === 'PURCHASER_AUTONOMY' ? (
                <span className="text">구매자 자율</span>
              ) : (
                <span className="text">
                  {`${formatter.format(
                    Number(
                      data?.finalQuotation?.finalQuotationChargers[0]
                        ?.chargePrice,
                    ),
                  )} 원/kW`}
                </span>
              )}
            </div>
            <div className="text-box">
              <span className="name">수익지분</span>
              {data?.finalQuotation?.finalQuotationChargers?.length! ===
              homeSelect?.length! ? (
                <span className="text">-</span>
              ) : (
                <span className="text">{`${Math.floor(
                  Number(data?.finalQuotation?.userInvestRate) * 100,
                )} %`}</span>
              )}
            </div>
            {data?.finalQuotation?.finalQuotationChargers?.map(
              (item, index) => (
                <React.Fragment key={index}>
                  <div className="text-box">
                    <span className="name">
                      {index === 0 ? '충전기 종류 및 수량' : ''}
                    </span>
                    <span className="text2">
                      {convertKo(M5_LIST, M5_LIST_EN, item.kind)}
                      <br />
                      {item.standType
                        ? //  standType 있으면
                          `: ${convertKo(
                            M6_LIST,
                            M6_LIST_EN,
                            item.standType,
                          )}, ${convertKo(
                            M7_LIST,
                            M7_LIST_EN,
                            item.channel,
                          )}, ${item.count} 대`
                        : // standType 없으면
                          `: ${convertKo(M7_LIST, M7_LIST_EN, item.channel)}, ${
                            item.count
                          } 대`}
                    </span>
                  </div>
                </React.Fragment>
              ),
            )}
            <div className="text-box">
              <span className="name">충전기 설치 목적</span>
              <span className="text">
                {convertKo(
                  InstallationPurposeType,
                  InstallationPurposeTypeEn,
                  data?.finalQuotation?.quotationRequest?.installationPurpose,
                )}
              </span>
            </div>
            {data?.finalQuotation?.finalQuotationChargers?.length === 1 && (
              <div className="text-box">
                <span className="name">충전기 제조사</span>
                <span className="text">
                  {
                    data?.finalQuotation?.finalQuotationChargers[0]
                      ?.manufacturer
                  }
                </span>
              </div>
            )}

            {/* 충전기 제조사 2개 이상 일 때 / 충전 요금 */}
            {data?.finalQuotation?.finalQuotationChargers?.length! !== 1 && (
              <>
                <MultiSection>
                  <BorderTop></BorderTop>
                  <Subtitle>충전요금</Subtitle>
                  {data?.finalQuotation?.finalQuotationChargers?.map(
                    (item, index) => (
                      <MultiBox key={index}>
                        <Item>
                          <span className="name">
                            {convertKo(M5_LIST, M5_LIST_EN, item?.kind)}
                          </span>
                          <span className="value">
                            {`${formatter.format(
                              Number(
                                data?.finalQuotation?.finalQuotationChargers[0]
                                  ?.chargePrice,
                              ),
                            )} 원/kW`}
                          </span>
                        </Item>
                      </MultiBox>
                    ),
                  )}
                </MultiSection>
              </>
            )}
            {/* 충전기 제조사 2개 이상 일 때 / 제조사 */}
            {data?.finalQuotation?.finalQuotationChargers?.length! !== 1 && (
              <>
                <MultiSection>
                  <BorderTop></BorderTop>
                  <Subtitle>충전기 제조사</Subtitle>
                  {data?.finalQuotation?.finalQuotationChargers?.map(
                    (item, index) => (
                      <MultiBox key={index}>
                        <Item>
                          <span className="name">
                            {convertKo(M5_LIST, M5_LIST_EN, item?.kind)}
                          </span>
                          <span className="value">
                            {
                              data?.finalQuotation?.finalQuotationChargers[0]
                                ?.manufacturer
                            }
                          </span>
                        </Item>
                      </MultiBox>
                    ),
                  )}
                </MultiSection>
              </>
            )}
          </Contents>
        </List>
      </Collapse>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: block;
  border-top: none;
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
  padding-left: 26.25pt;
  padding-right: 20.25pt;
  border-radius: 12pt;

  @media (max-width: 899.25pt) {
    display: flex;
    flex-direction: column;
    padding-left: 15pt;
    padding-right: 15pt;
    border-radius: 0;
  }
`;
const ItemButton = styled(ListItemButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  &:hover {
    background: transparent !important;
  }
  .MuiTouchRipple-root {
    display: none;
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
    padding: 6pt 9pt !important;
    background-color: ${colors.main1};
    width: max-content;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 9pt !important;
    font-weight: 500;
    line-height: 9pt !important;
    letter-spacing: -0.02em;
    text-align: center;
    border-radius: 12pt !important;
    @media (min-width: 900pt) {
      padding: 6pt 9pt !important;
      font-size: 10.5pt !important;
      line-height: 9pt !important;
    }
  }
  & div > h1 {
    font-weight: 700;
    font-size: 15pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 15pt;
      font-weight: 700;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
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
  /* border-bottom: 0.75pt solid #e9eaee; */
  .text-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    :not(:nth-of-type(1)) {
      padding-top: 12pt;
      @media (min-width: 900pt) {
        padding-top: 15pt;
      }
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
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }
  .text {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: right;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      //text-align: left;
    }
  }

  .text2 {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: right;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 18pt;
      letter-spacing: -0.02em;
      text-align: right;
    }
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
const BorderTop = styled.div`
  border-top: 0.75pt solid #e9eaee;
  padding: 0 15pt;
  padding-bottom: 15pt;
`;
const Subtitle = styled.h2`
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
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
  @media (max-width: 899.25pt) {
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

export default FinishedTopBox;
