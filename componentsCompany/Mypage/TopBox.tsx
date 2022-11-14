import styled from '@emotion/styled';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import CommonBtns from 'components/mypage/as/CommonBtns';
import Image from 'next/image';
import UpArrow from 'public/guide/up_arrow.svg';
import DownArrow from 'public/guide/down_arrow.svg';
import React, { Dispatch, SetStateAction } from 'react';
import colors from 'styles/colors';
import { handleColor } from 'utils/changeValue';
import { InProgressProjectsDetailResponse } from 'QueryComponents/CompanyQuery';
import { convertKo, hyphenFn } from 'utils/calculatePackage';
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

interface Data {
  id: number;
  state: number;
  badge: string;
  storeName: string;
  date: string;
  contract: boolean;
  address: string;
  planed: string[]; // 인덱스[0]: 준비 목표일, [1]: 설치 목표일, [2]: 검수 목표일, [3]: 완료 목표일
}

type Props = {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  handleClick?: () => void;
  className?: string;
  data: InProgressProjectsDetailResponse;
};
const TAG = 'componentsCompany/Mypage/TopBox.tsx';
const TopBox = ({ open, className, setOpen, handleClick, data }: Props) => {
  return (
    <>
      <Wrapper className={className !== undefined ? className : ''}>
        <ItemButton onClick={handleClick}>
          <StoreName>
            <CommonBtns
              text={data?.project?.badge!}
              backgroundColor={handleColor(data?.project?.badge!)}
            />
            <div>
              <h1>{data?.project?.projectName}</h1>
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
            {/* <p>{info.address}</p> */}
          </StoreName>
        </ItemButton>
        {/* Open */}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Contents>
              <div className="text-box">
                <span className="name">프로젝트 번호</span>
                <span className="text">{data?.project?.projectNumber}</span>
              </div>
              <div className="text-box">
                <span className="name">구독상품</span>
                <span className="text">
                  {convertKo(
                    subscribeType,
                    subscribeTypeEn,
                    data?.project?.finalQuotation?.subscribeProduct,
                  )}
                </span>
              </div>
              <div className="text-box">
                <span className="name">구독기간</span>
                <span className="text">
                  {`${data?.project?.finalQuotation?.subscribePeriod} 개월`}
                </span>
              </div>
              <div className="text-box">
                <span className="name">수익지분</span>
                <span className="text">
                  {`${Math.floor(
                    Number(data?.project?.finalQuotation?.userInvestRate) * 100,
                  )} %`}
                </span>
              </div>
              {data?.project?.finalQuotation?.finalQuotationChargers?.map(
                (item, index) => (
                  <>
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
                            )}, ${convertKo(
                              M7_LIST,
                              M7_LIST_EN,
                              item.channel,
                            )}, ${item.count} 대`
                          : `: ${convertKo(
                              M7_LIST,
                              M7_LIST_EN,
                              item.channel,
                            )}, ${item.count} 대`}
                      </span>
                    </div>
                    <div className="text-box">
                      {index === 0 ? (
                        <span className="name">충전기 설치 위치</span>
                      ) : (
                        <span className="name" />
                      )}
                      <span className="text">
                        {convertKo(
                          location,
                          locationEn,
                          item?.installationLocation,
                        )}
                      </span>
                    </div>
                  </>
                ),
              )}
              <div className="text-box">
                <span className="name">충전기 설치 목적</span>
                <span className="text">
                  {convertKo(
                    InstallationPurposeType,
                    InstallationPurposeTypeEn,
                    data?.project?.finalQuotation?.quotationRequest
                      ?.installationPurpose,
                  )}
                </span>
              </div>
              {/* 기타 사항 CSS 수정 필요 */}
              {data?.project?.finalQuotation?.subscribeProductFeature
                ?.length! >= 1 ? (
                <>
                  <div className="text-box">
                    <span className="name">기타 요청사항</span>
                    <span className="text">
                      {data?.project?.finalQuotation?.subscribeProductFeature}
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-box">
                  <span className="name">기타 요청사항</span>
                  <span className="text">없음</span>
                </div>
              )}
            </Contents>
            <Contents>
              <Partner>파트너 정보</Partner>
              <div className="text-box">
                <span className="name">이름</span>
                <span className="text">{data?.project?.userMember?.name}</span>
              </div>
              <div className="text-box">
                <span className="name">연락처</span>
                <span className="text phone">
                  {hyphenFn(data?.project?.userMember?.phone!)}
                </span>
              </div>
            </Contents>
          </List>
        </Collapse>
      </Wrapper>
    </>
  );
};

const CustomerRequestContent = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.02em;
  text-align: center;
  color: ${colors.main};
  margin-top: 21pt;
`;

const Wrapper = styled.div`
  display: block;
  border-top: none;
  box-shadow: 0px 3pt 7.5pt -3pt #89a3c966;
  padding-left: 15pt;
  padding-right: 15pt;
  margin-top: 6pt;
  /* border-top: 1px solid #e2e5ed; */
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
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: 0em;
  text-align: left;
  padding-bottom: 24pt;
`;

export default TopBox;
