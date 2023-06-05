import styled from '@emotion/styled';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import CommonBtns from 'components/mypage/as/CommonBtns';
import Image from 'next/image';
import UpArrow from 'public/guide/up_arrow.svg';
import DownArrow from 'public/guide/down_arrow.svg';
import React, { Dispatch, SetStateAction } from 'react';
import colors from 'styles/colors';
import {
  SentRequestResponse,
  SpotDataResponse,
} from './SentProvisionalQuoatation';
import { HandleColor } from 'utils/changeValue';
import {
  InstallationPurposeType,
  InstallationPurposeTypeEn,
  location,
  locationEn,
  M5_LIST,
  M5_LIST_EN,
  M6_LIST,
  M6_LIST_EN,
  M7_LIST,
  M7_LIST_EN,
  subscribeType,
  subscribeTypeEn,
} from 'assets/selectList';
import { convertKo, hyphenFn } from 'utils/calculatePackage';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleClick: () => void;
  data: SentRequestResponse;
  spotData: SpotDataResponse;
};

const TopBox = ({ data, spotData, open, setOpen, handleClick }: Props) => {
  // console.log(
  //   data?.sendQuotationRequest.quotationRequest.etcRequest,
  //   '39번째줄',
  // );
  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);

  const callPhone = hyphenFn(
    data?.sendQuotationRequest?.quotationRequest?.member?.phone,
  );

  const homeSelect =
    data?.sendQuotationRequest?.quotationRequest?.quotationRequestChargers?.filter(
      (el) => el.kind === '7-HOME',
    );

  return (
    <Wrapper>
      <ItemButton onClick={handleClick}>
        <StoreName>
          <CommonBtns
            text={data?.sendQuotationRequest?.badge!}
            backgroundColor={HandleColor(data?.sendQuotationRequest?.badge)}
          />

          <div>
            {data?.sendQuotationRequest?.badge! === '선택대기' ? (
              <h1>
                {
                  data?.sendQuotationRequest?.quotationRequest
                    ?.maskingInstallationAddress
                }
              </h1>
            ) : (
              <h1>
                {
                  data?.sendQuotationRequest?.quotationRequest
                    ?.installationAddress
                }
              </h1>
            )}

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
        </StoreName>
      </ItemButton>
      {/* Open */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* 상세 정보 */}
          <Contents
            isPartner={spotData?.data?.spotInspection ? true : false}
            className="detail"
          >
            <div className="text-box">
              <span className="name">구독상품</span>
              <span className="text">
                {convertKo(
                  subscribeType,
                  subscribeTypeEn,
                  data?.sendQuotationRequest?.quotationRequest
                    ?.subscribeProduct,
                )}
              </span>
            </div>
            <div className="text-box">
              <span className="name">구독기간</span>
              <span className="text">{`${data?.sendQuotationRequest?.quotationRequest?.subscribePeriod} 개월`}</span>
            </div>
            <div className="text-box">
              <span className="name">수익지분</span>
              {data?.sendQuotationRequest?.quotationRequest
                ?.quotationRequestChargers?.length! === homeSelect?.length! ? (
                <span className="text">-</span>
              ) : (
                <span className="text">{`${Math.floor(
                  Number(
                    data?.sendQuotationRequest?.quotationRequest?.investRate!,
                  ) * 100,
                )} %`}</span>
              )}
            </div>
            {data?.sendQuotationRequest?.quotationRequest?.quotationRequestChargers!.map(
              (item, index) => (
                <div className="text-box" key={index}>
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
            {/* 충전기가 1대 */}

            <div className="text-box">
              <span className="name">충전기 설치 위치</span>
              <span className="text">
                {convertKo(
                  location,
                  locationEn,
                  data?.sendQuotationRequest?.quotationRequest
                    ?.installationLocation,
                )}
              </span>
            </div>

            <div className="text-box">
              <span className="name">충전기 설치 목적</span>
              <span className="text">
                {convertKo(
                  InstallationPurposeType,
                  InstallationPurposeTypeEn,
                  data?.sendQuotationRequest?.quotationRequest
                    ?.installationPurpose,
                )}
              </span>
            </div>
            {data?.sendQuotationRequest.quotationRequest.etcRequest !== '' ? (
              <ElseTextBox>
                <span className="name">기타 요청사항</span>
                <ElseText>
                  {data?.sendQuotationRequest.quotationRequest.etcRequest}
                </ElseText>
              </ElseTextBox>
            ) : (
              <div className="text-box">
                <span className="name">기타 요청사항</span>
                <span className="text">없음</span>
              </div>
            )}
          </Contents>
          {/* ------------------- 파트너 정보 ---------------- */}
          {spotData?.data?.spotInspection && (
            <Contents>
              {memberType === 'COMPANY' ? (
                <Partner>고객 정보</Partner>
              ) : (
                <Partner>파트너 정보</Partner>
              )}

              <div className="text-box">
                <span className="name">이름</span>
                <span className="text">
                  {data?.sendQuotationRequest?.quotationRequest?.member?.name}
                </span>
              </div>
              <div className="text-box">
                <span className="name">연락처</span>
                <a href={'tel:' + callPhone} className="textPhone">
                  {callPhone}
                </a>
                <span className="webPhone">{callPhone}</span>
              </div>
            </Contents>
          )}
        </List>
      </Collapse>
    </Wrapper>
  );
};

const CustomerRequestContent = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 15pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: ${colors.main};
  margin-top: 21pt;
`;

const Wrapper = styled.div`
  display: block;
  box-shadow: 0pt 5pt 7.5pt rgba(137, 163, 201, 0.2);
  padding-left: 15pt;
  padding-right: 15pt;
  margin-top: 15pt;
  /* border-top: 0.75pt solid #e2e5ed; */
  display: flex;
  flex-direction: column;
  @media (min-width: 900pt) {
    box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
    border-radius: 12pt;
    padding-top: 6pt;
    border-top: 0;
    padding-left: 26.25pt;
    padding-right: 26.25pt;
  }
`;

const ItemButton = styled(ListItemButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  &div {
    margin: 0;
  }
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

const Contents = styled.div<{ isPartner?: boolean }>`
  padding-top: 19.5pt;
  padding-bottom: 18pt;
  &.detail {
    border-bottom: ${({ isPartner }) => isPartner && '0.75pt solid #e2e5ed'};
  }
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
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: right;
    }
  }

  .name {
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
  }
  .text {
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      line-height: 18pt;
      letter-spacing: -0.02em;
      //text-align: left;
    }
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

  .textPhone {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: right;
    color: #0057ff;
    cursor: pointer;
    @media (min-width: 900pt) {
      display: none;
    }
  }

  .webPhone {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: right;
    @media (max-width: 899.25pt) {
      display: none;
    }
  }
`;

const Partner = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: 0em;
  text-align: left;
  padding-bottom: 10.5pt;
  color: #222222;
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 15pt;
    font-weight: 700;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;
    padding-top: 10.5pt;
  }
`;
const ElseTextBox = styled.div`
  padding-top: 12pt;
  display: flex;
  flex-direction: column;
  @media (min-width: 900pt) {
    padding-top: 15pt;
  }
`;

const ElseText = styled.div`
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  text-align: left;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  margin-top: 10pt;
  border: 0.75pt solid #e2e5ed;
  padding: 8pt;
  border-radius: 6pt;
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 400;
    line-height: 16pt;
    letter-spacing: -0.02em;
    text-align: left;
    margin-bottom: 12pt;
  }
`;

export default TopBox;
