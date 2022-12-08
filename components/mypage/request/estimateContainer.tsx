import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import UpArrow from 'public/guide/up_arrow.svg';
import DownArrow from 'public/guide/down_arrow.svg';
import Image from 'next/image';
import { useState } from 'react';
import colors from 'styles/colors';
import styled from '@emotion/styled';
import { QuotationRequestsResponse } from 'pages/mypage/request';
import { convertKo } from 'utils/calculatePackage';
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
import { HandleUserColor } from 'utils/changeValue';

type Props = {
  data: QuotationRequestsResponse;
};
const TAG = 'componsts/mypage/request/estimateContatiner.tsx';
const EstimateContainer = ({ data }: Props) => {
  const [open, setOpen] = useState<boolean>(true);

  console.log('⭐️ 상세 페이지 데이터 확인 ~line ' + TAG);
  console.log(data);

  return (
    <Wrapper>
      <Badge color={HandleUserColor(data?.badge)}>{data?.badge}</Badge>
      {/* Close */}
      <ItemButton onClick={() => setOpen(!open)}>
        <StoreName>
          <h1>{data?.quotationRequest.installationAddress}</h1>
          {/* {open && <p>서울시 관악구 난곡로40길 30</p>} */}
        </StoreName>

        {open ? (
          <ArrowImg>
            <Image src={DownArrow} alt="down_arrow" layout="fill" />
          </ArrowImg>
        ) : (
          <ArrowImg>
            <Image src={UpArrow} alt="up_arrow" layout="fill" />
          </ArrowImg>
        )}
      </ItemButton>

      {/* Open */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Contents>
            <div className="text-box">
              <span className="name">구독상품</span>
              <span className="text">
                {convertKo(
                  subscribeType,
                  subscribeTypeEn,
                  data?.quotationRequest?.subscribeProduct,
                )}
              </span>
            </div>
            <div className="text-box">
              <span className="name">구독기간</span>
              <span className="text">{`${data?.quotationRequest?.subscribePeriod} 개월`}</span>
            </div>
            <div className="text-box">
              <span className="name">수익지분</span>
              <span className="text">{`${
                Number(data?.quotationRequest?.investRate) * 100
              } %`}</span>
            </div>

            {data?.quotationRequest?.quotationRequestChargers?.map(
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

            <div className="text-box">
              <span className="name">충전기 설치 위치</span>
              <span className="text">
                {convertKo(
                  location,
                  locationEn,
                  data?.quotationRequest?.installationLocation,
                )}
              </span>
            </div>
            <div className="text-box">
              <span className="name">충전기 설치 목적</span>
              <span className="text">
                {convertKo(
                  InstallationPurposeType,
                  InstallationPurposeTypeEn,
                  data?.quotationRequest?.installationPurpose,
                )}
              </span>
            </div>

            {data?.quotationRequest?.etcRequest.length !== 0 ? (
              <ElseTextBox>
                <span className="name">기타 요청사항</span>
                <ElseText>{data?.quotationRequest?.etcRequest}</ElseText>
              </ElseTextBox>
            ) : (
              <div className="text-box">
                <span className="name">기타 요청사항</span>
                <span className="text">없음 </span>
              </div>
            )}
          </Contents>
        </List>
      </Collapse>
    </Wrapper>
  );
};

export default EstimateContainer;

const Wrapper = styled.div`
  padding: 21pt 15pt;
  box-shadow: 0px 3pt 7.5pt rgba(137, 163, 201, 0.4);
  @media (min-width: 900pt) {
    padding: 27pt 26.25pt;
  }
`;
const Badge = styled.span<{ color: string }>`
  background: ${({ color }) => color};
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
  align-items: flex-start;
  margin-top: 16.5pt;
  padding: 0;
  & div {
    margin: 0;
  }
`;
const StoreName = styled(ListItemText)`
  & h1 {
    font-weight: 700;
    font-size: 15pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
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
  width: 18pt;
  height: 18pt;
`;
const Contents = styled.div`
  padding-top: 36pt;
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
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }
  .img-box {
    padding-top: 42pt;
    padding-bottom: 24pt;
    text-align: center;
  }
`;

const ElseTextBox = styled.div`
  padding-top: 12pt;
  display: flex;
  flex-direction: column;
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
`;
