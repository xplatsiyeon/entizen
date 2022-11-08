import styled from '@emotion/styled';
import { Button } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import colors from 'styles/colors';
import fileImg from 'public/mypage/file-icon.svg';
import { css } from '@emotion/react';
import { useCallback } from 'react';
import { SentRequestResponse } from './SentProvisionalQuoatation';
import {
  convertEn,
  convertKo,
  PriceBasicCalculation,
} from 'utils/calculatePackage';
import {
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
  pb?: number;
  data: SentRequestResponse;
};
const TAG =
  'componentsCompany/CompanyQuotation/SentQuotation/FinalBottomBox.tsx';
const FinalBottomBox = ({ pb, data }: Props) => {
  const { finalQuotation } = data?.sendQuotationRequest?.preQuotation;

  console.log(TAG + '🔥 ~line 34 파이널 바텀 체크');
  return (
    <Wrapper>
      <ImageBox>
        <Image
          src={
            data?.sendQuotationRequest?.companyMemberAdditionalInfo
              ?.companyLogoImageUrl
          }
          alt="logo-img"
          layout="fill"
          priority={true}
          unoptimized={true}
        />
      </ImageBox>
      <Title>
        {data?.sendQuotationRequest?.companyMemberAdditionalInfo?.companyName}
      </Title>
      <List>
        <Item>
          <span className="name">구독상품</span>
          <span className="value">
            {convertKo(
              subscribeType,
              subscribeTypeEn,
              finalQuotation?.subscribeProduct,
            )}
          </span>
        </Item>
        <Item>
          <span className="name">구독기간</span>
          <span className="value">{finalQuotation?.subscribePeriod}개월</span>
        </Item>
        <Item>
          <span className="name">월 구독료</span>
          <span className="value">
            {PriceBasicCalculation(finalQuotation?.subscribePricePerMonth)}원
          </span>
        </Item>
        <Item>
          {/* --- 수익지분 보류 --- */}
          <span className="name">수익지분</span>
          <span className="value">
            {`${Number(finalQuotation?.chargingPointRate) * 100} %`}
          </span>
        </Item>
        {finalQuotation?.finalQuotationChargers?.map((item, index) => (
          <Item key={index}>
            <span className="name">충전기 종류 및 수량</span>
            <span className="value">
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
          </Item>
        ))}
        <Item>
          <span className="name">공사기간</span>
          <span className="value">
            {`${data?.sendQuotationRequest?.preQuotation?.constructionPeriod} 일`}
          </span>
        </Item>
        {data?.sendQuotationRequest?.preQuotation?.preQuotationCharger
          ?.length == 1 ? (
          <>
            {/* 충전량 1개 일 때  */}
            <Item>
              <span className="name">충전요금</span>
              {`${data?.sendQuotationRequest?.preQuotation?.preQuotationCharger[0]?.chargePrice} 원 / kW`}
              <span className="value"></span>
            </Item>
            <Item>
              <span className="name">충전기 제조사</span>
              <span className="value">
                {
                  data?.sendQuotationRequest?.preQuotation
                    ?.preQuotationCharger[0]?.manufacturer
                }
              </span>
            </Item>
          </>
        ) : (
          <>
            {/* 충전량 2개 이상일 때 */}
            <MultiSection>
              <Subtitle>충전요금</Subtitle>
              {data?.sendQuotationRequest?.preQuotation?.preQuotationCharger?.map(
                (item, index) => (
                  <MultiBox key={item.preQuotationChargerIdx}>
                    <Item>
                      <span className="name">
                        {
                          data?.sendQuotationRequest?.quotationRequest
                            ?.quotationRequestChargers[index]?.kind
                        }
                      </span>
                      <span className="value">{`${PriceBasicCalculation(
                        item.chargePrice,
                      )} 원 / kW`}</span>
                    </Item>
                  </MultiBox>
                ),
              )}
            </MultiSection>
            <MultiSection>
              <Subtitle>충전기 제조사</Subtitle>
              {data?.sendQuotationRequest?.preQuotation?.preQuotationCharger?.map(
                (item, index) => (
                  <MultiBox key={item.preQuotationChargerIdx}>
                    <Item>
                      <span className="name">
                        {
                          data?.sendQuotationRequest?.quotationRequest
                            ?.quotationRequestChargers[index]?.kind
                        }
                      </span>
                      <span className="value">{item.manufacturer}</span>
                    </Item>
                  </MultiBox>
                ),
              )}
            </MultiSection>
          </>
        )}
      </List>
      <Section>
        <Subtitle>특장점</Subtitle>
        <FlexWrap>
          {/* 구독 상품 부분 */}
          <Label>구독 상품</Label>
          <FeaturesList>
            {data?.sendQuotationRequest?.preQuotation?.finalQuotation?.subscribeProductFeature
              ?.split('\n')
              .map((line) => (
                <li>
                  {line}
                  <br />
                </li>
              ))}
          </FeaturesList>
          {/* 특장점 충전기 부분 */}
        </FlexWrap>
        {data?.sendQuotationRequest?.preQuotation?.finalQuotation?.finalQuotationChargers?.map(
          (item, index) => (
            <FlexWrap key={item.finalQuotationChargerIdx}>
              <Label>{convertKo(M5_LIST, M5_LIST_EN, item?.kind)}</Label>
              <FeaturesList>
                {item.productFeature.split('\n').map((line) => (
                  <li>
                    {line}
                    <br />
                  </li>
                ))}
              </FeaturesList>
            </FlexWrap>
          ),
        )}
      </Section>
      <Section grid={true}>
        <Subtitle>충전기 이미지</Subtitle>
        <GridImg>
          {data?.sendQuotationRequest?.preQuotation?.preQuotationCharger?.map(
            (item, index) => (
              <React.Fragment key={item.preQuotationChargerIdx}>
                {item.chargerImageFiles.map((img, index) => (
                  <GridItem key={img.chargerProductFileIdx}>
                    <Image
                      src={img.url}
                      alt="img-icon"
                      layout="fill"
                      priority={true}
                      unoptimized={true}
                    />
                  </GridItem>
                ))}
              </React.Fragment>
            ),
          )}
        </GridImg>
      </Section>
      <Section className="underLine" pb={pb}>
        <Subtitle>충전기 카탈로그</Subtitle>
        {data?.sendQuotationRequest?.preQuotation?.preQuotationCharger?.map(
          (item, index) => (
            <React.Fragment key={item.preQuotationChargerIdx}>
              {item.catalogFiles.map((file, index) => (
                <FileDownloadBtn key={file.chargerProductFileIdx}>
                  <FileDownload
                    // onClick={DownloadFile}
                    download={file.originalName}
                    href={file.url}
                  >
                    <Image src={fileImg} alt="file-icon" layout="intrinsic" />
                    {file.originalName}
                  </FileDownload>
                </FileDownloadBtn>
              ))}
            </React.Fragment>
          ),
        )}
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 60pt;
  .underLine {
    border-bottom: none;
  }

  @media (max-width: 899pt) {
    padding-top: 21pt;
  }
`;

const ImageBox = styled.div`
  width: 48pt;
  height: 48pt;
  position: relative;
  margin-left: 15pt;
  margin-bottom: 15pt;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 15pt;
  line-height: 15pt;
  padding: 0;
  margin-top: 21pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  @media (max-width: 899pt) {
    margin-top: 0pt;
    padding: 0 15pt;
  }
`;

const Section = styled.section<{ grid?: boolean; pb?: number }>`
  padding: 18pt 0pt;
  border-bottom: 0.75pt solid ${colors.lightGray};
  padding-bottom: ${({ pb }) => pb + 'pt'};
  ${({ grid }) =>
    grid &&
    css`
      padding-right: 0;
    `};
`;
const List = styled.ul`
  padding: 30pt 0 51pt;
  gap: 12pt;
  border-bottom: 0.75pt solid ${colors.lightGray};
  @media (max-width: 899pt) {
    padding-top: 30pt;
    padding-bottom: 18pt;
  }
`;
const MultiSection = styled.div`
  padding-top: 18pt;

  display: flex;
  flex-direction: column;
  gap: 12pt;
  :not(:last-child) {
    padding-bottom: 18pt;
    border-bottom: 0.75pt solid ${colors.lightGray};
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
    padding-left: 15pt;
    padding-right: 15pt;
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
  padding: 0 15pt;
  color: ${colors.main2};
`;
const FlexWrap = styled.div`
  display: flex;
  flex-direction: row;
  &:nth-of-type(2) {
    margin-top: 61pt;
  }
  @media (max-width: 899pt) {
    display: block;
    padding: 0 15pt;
    &:nth-of-type(2) {
      margin-top: 0;
    }
  }
`;
const Label = styled.h3`
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  flex: 1;
  :nth-of-type(1) {
    padding-top: 15pt;
  }
  :nth-of-type(2) {
    padding-top: 24pt;
  }
  @media (max-width: 899pt) {
    flex: none;
  }
`;
const FeaturesList = styled.ol`
  padding-top: 6pt;
  list-style-type: decimal;
  list-style-position: inside;
  flex: 2;
  & li {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 18pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    :not(:nth-of-type(1)) {
      padding-top: 2pt;
    }
  }
  @media (max-width: 899pt) {
    flex: none;
  }
`;
const GridImg = styled.div`
  display: flex;
  overflow-x: scroll;
  padding-top: 15pt;
  padding-left: 15pt;
  gap: 6pt;
`;
const GridItem = styled.span`
  position: relative;
  border-radius: 6pt;
  width: 120pt;
  height: 144pt;
  flex-shrink: 0;
`;
const FileDownloadBtn = styled(Button)`
  margin: 15pt 15pt 6pt 15pt;
  padding: 7.5pt 6pt;
  border: 0.75pt solid ${colors.lightGray3};
  border-radius: 8px;
`;

const FileDownload = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 3pt;
  color: ${colors.gray2};
`;

export default FinalBottomBox;
