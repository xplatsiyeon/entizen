import React from 'react';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import UpArrow from 'public/guide/up_arrow.svg';
import DownArrow from 'public/guide/down_arrow.svg';
import Image from 'next/image';
import { useState } from 'react';
import colors from 'styles/colors';
import styled from '@emotion/styled';
import MypageHeader from '../request/header';
import CommonBtns from './CommonBtns';
import { handleColorAS } from 'utils/changeValue';
import { AsDetailReseponse } from 'pages/mypage/as';
import { useQuery } from '@apollo/client';
import { AsRequest, asRequest } from 'QueryComponents/UserQuery';
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
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

type Props = {
  data: AsDetailReseponse;
};
const TAG = 'components/mypage/as/AsRequest.tsx';
const AsRequest = ({ data }: Props) => {
  const router = useRouter();
  const projectIdx =
    data?.data?.afterSalesService?.afterSalesService?.projectIdx;
  const mobile = useMediaQuery({
    query: '(min-width:900pt)',
  });

  // alert(id)
  const [open, setOpen] = useState<boolean>(false);

  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
    refetch,
  } = useQuery<AsRequest>(asRequest, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    },
    variables: {
      projectIdx: projectIdx,
    },
  });

  // console.log('🔥 프로젝트  상단 데이터 확인 ~line 45 ' + TAG);
  // console.log(projectData);

  const homeSelect =
    projectData?.project?.finalQuotation?.finalQuotationChargers?.filter(
      (el) => el.kind === '7-HOME',
    );

  const handleClick = () => setOpen(!open);
  const headerOnClick = () => {
    router.push({
      pathname: '/mypage',
      query: {
        id: '2',
      },
    });
  };

  return (
    <Body>
      {!mobile && (
        <MypageHeader
          title={'A/S'}
          back={true}
          handle={true}
          handleOnClick={headerOnClick}
          handleBackClick={headerOnClick}
        />
      )}
      <Wrapper>
        {/* Close */}
        <ItemButton onClick={handleClick}>
          <StoreName>
            <CommonBtns
              text={data?.data?.afterSalesService?.badge!}
              backgroundColor={handleColorAS(
                data?.data?.afterSalesService?.badge!,
              )}
            />
            <div>
              <h1>{projectData?.project?.projectName}</h1>
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
          </StoreName>
        </ItemButton>

        {/* Open */}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Contents>
              <div className="text-box">
                <span className="name">프로젝트 번호</span>
                <span className="text">
                  {projectData?.project?.projectNumber}
                </span>
              </div>
              <div className="text-box">
                <span className="name">구독상품</span>
                <span className="text">
                  {convertKo(
                    subscribeType,
                    subscribeTypeEn,
                    projectData?.project?.finalQuotation?.subscribeProduct,
                  )}
                </span>
              </div>
              <div className="text-box">
                <span className="name">구독기간</span>
                <span className="text">
                  {`${projectData?.project?.finalQuotation?.subscribePeriod} 개월`}
                </span>
              </div>
              <div className="text-box">
                <span className="name">수익지분</span>
                {projectData?.project?.finalQuotation?.finalQuotationChargers
                  .length! === homeSelect?.length! ? (
                  <span className="text">-</span>
                ) : (
                  <span className="text">{`${Math.floor(
                    Number(
                      projectData?.project?.finalQuotation?.userInvestRate,
                    ) * 100,
                  )} %`}</span>
                )}
              </div>

              {projectData?.project?.finalQuotation?.finalQuotationChargers?.map(
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
                            `: ${convertKo(
                              M7_LIST,
                              M7_LIST_EN,
                              item.channel,
                            )}, ${item.count} 대`}
                      </span>
                    </div>
                  </React.Fragment>
                ),
              )}

              {/* 충전기 설치 위치  1개 */}
              {projectData?.project?.finalQuotation?.finalQuotationChargers
                ?.length === 1 && (
                <div className="text-box">
                  <span className="name">충전기 설치 위치</span>
                  <span className="text">
                    {convertKo(
                      location,
                      locationEn,
                      projectData?.project?.finalQuotation
                        ?.finalQuotationChargers[0]?.installationLocation,
                    )}
                  </span>
                </div>
              )}
              <div className="text-box">
                <span className="name">충전기 설치 목적</span>
                <span className="text">
                  {convertKo(
                    InstallationPurposeType,
                    InstallationPurposeTypeEn,
                    projectData?.project?.finalQuotation?.quotationRequest
                      ?.installationPurpose,
                  )}
                </span>
              </div>
              {/* 기타 요청사항 */}
              {projectData?.project?.finalQuotation?.quotationRequest
                ?.etcRequest.length! >= 1 ? (
                <ElseText
                  dataLength={
                    projectData?.project?.finalQuotation?.quotationRequest
                      ?.etcRequest.length!
                  }
                >
                  <span className="name">기타 요청사항</span>
                  <span className="text">
                    {
                      projectData?.project?.finalQuotation?.quotationRequest
                        ?.etcRequest
                    }
                  </span>
                </ElseText>
              ) : (
                <div className="text-box">
                  <span className="name">기타 요청사항</span>
                  <span className="text">없음</span>
                </div>
              )}

              {/* 충전기 제조사 2개 이상 일 때 */}
              {projectData?.project.finalQuotation.finalQuotationChargers
                .length! > 1 && (
                <>
                  <MultiSection>
                    <BorderTop></BorderTop>
                    <Subtitle>충전기 설치위치</Subtitle>
                    {projectData?.project?.finalQuotation?.finalQuotationChargers?.map(
                      (item, index) => (
                        <MultiBox key={index}>
                          <Item>
                            <span className="name">
                              {convertKo(M5_LIST, M5_LIST_EN, item?.kind)}
                            </span>
                            <span className="value">
                              {convertKo(
                                location,
                                locationEn,
                                item?.installationLocation,
                              )}
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
    </Body>
  );
};

export default AsRequest;

const Body = styled.div`
  /* display: none; */
  @media (max-width: 899.25pt) {
    display: block;
  }
`;

const Wrapper = styled.div`
  display: block;
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
  padding-left: 26.25pt;
  padding-right: 26.25pt;
  border-radius: 12pt;
  @media (max-width: 899.25pt) {
    display: flex;
    flex-direction: column;
    padding-left: 15pt;
    padding-right: 15pt;
  }
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
  & div > h1 {
    font-weight: 700;
    font-size: 15pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    font-family: 'Spoqa Han Sans Neo' !important;
  }
  & div > img {
    display: flex;
    align-items: center;
  }
  & p {
    font-family: 'Spoqa Han Sans Neo';
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
    :not(:nth-of-type(1)) {
      padding-top: 12pt;
      @media (min-width: 900pt) {
        padding-top: 15pt;
      }
    }
  }

  .name {
    font-family: 'Spoqa Han Sans Neo';
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
  border-top: 1px solid #e9eaee;
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

const ElseText = styled.div<{ dataLength: number }>`
  padding-top: 19.5pt;
  /* padding-bottom: 18pt; */

  display: flex;
  justify-content: ${({ dataLength }) =>
    dataLength === 0 ? 'space-between' : ''};
  flex-direction: ${({ dataLength }) => (dataLength === 0 ? '' : 'column')};
  align-items: ${({ dataLength }) =>
    dataLength === 0 ? 'center' : 'flex-start'};

  :not(:nth-of-type(1)) {
    padding-top: 12pt;
    @media (min-width: 900pt) {
      padding-top: 15pt;
    }
  }
  .name {
    font-family: 'Spoqa Han Sans Neo';
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
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: right;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    border: ${({ dataLength }) =>
      dataLength > 0 ? '0.75pt solid #e2e5ed' : ''};
    padding: 7.5pt;
    border-radius: 6pt;
    width: 97%;
    height: auto;
    margin-top: ${({ dataLength }) => (dataLength === 0 ? '' : '7.5pt')};
    text-align: left;
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 400;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }
`;
