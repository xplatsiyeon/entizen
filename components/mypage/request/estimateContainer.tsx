import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import UpArrow from 'public/guide/up_arrow.svg';
import DownArrow from 'public/guide/down_arrow.svg';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import colors from 'styles/colors';
import styled from '@emotion/styled';
import { QuotationRequestsResponse } from 'pages/mypage/request/[id]';
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
} from 'assets/selectList';

type Props = {
  data: QuotationRequestsResponse;
};
const TAG = 'componsts/mypage/request/estimateContatiner.tsx';
const EstimateContainer = ({ data }: Props) => {
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    console.log(TAG + '🔥 ~line 29 ~data 잘 들어오는지 확인');
    console.log(data);
    console.log('data 있으면 재렌더링 되라앗..!');
  }, [data]);
  return (
    <Wrapper>
      <Badge>{data?.receivedQuotationRequest.badge}</Badge>
      {/* Close */}
      <ItemButton onClick={() => setOpen(!open)}>
        <StoreName>
          <h1>{data?.receivedQuotationRequest.installationAddress}</h1>
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
                {data?.receivedQuotationRequest.subscribeProduct}
              </span>
            </div>
            <div className="text-box">
              <span className="name">구독기간</span>
              <span className="text">{`${data?.receivedQuotationRequest.subscribePeriod} 개월`}</span>
            </div>
            <div className="text-box">
              <span className="name">수익지분</span>
              <span className="text">{`${
                Number(data?.receivedQuotationRequest.investRate) * 100
              } %`}</span>
            </div>
            <div className="text-box">
              <span className="name">충전기 종류 및 수량</span>

              {data?.receivedQuotationRequest.chargers?.map((item, index) => (
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
              ))}
            </div>
            <div className="text-box">
              <span className="name">충전기 설치 위치</span>
              <span className="text">
                {convertKo(
                  location,
                  locationEn,
                  data?.receivedQuotationRequest.installationLocation,
                )}
              </span>
            </div>
            <div className="text-box">
              <span className="name">충전기 설치 목적</span>
              <span className="text">
                {convertKo(
                  InstallationPurposeType,
                  InstallationPurposeTypeEn,
                  data?.receivedQuotationRequest.installationPurpose,
                )}
              </span>
            </div>
            <div className="text-box">
              <span className="name">기타 요청사항</span>
              <span className="text">
                {data?.receivedQuotationRequest.etcRequest}
              </span>
            </div>
            <div className="img-box">
              <Image src={DoubleArrow} alt="double-arrow" />
            </div>
          </Contents>
        </List>
      </Collapse>
    </Wrapper>
  );
};

export default EstimateContainer;

const Wrapper = styled.div`
  padding: 21pt 15pt 12.75pt 15pt;
  box-shadow: 0px 3pt 7.5pt rgba(137, 163, 201, 0.4);
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
