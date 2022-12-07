import Image from 'next/image';
import colors from 'styles/colors';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import fileImg from 'public/mypage/file-icon.svg';
import { css } from '@emotion/react';
import React, { useCallback } from 'react';
import { PreQuotationResponse } from 'pages/mypage/request/detail';
import { convertKo, PriceBasicCalculation } from 'utils/calculatePackage';
import {
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
import ManagerInfo from './ManagerInfo';
import { log } from 'console';

interface Props {
  pb?: number;
  data?: PreQuotationResponse;
  isSpot?: boolean;
}
const TAG = 'components/mypage/request/FinalQuotation.tsx';
const FinalQuotation = ({ pb, data, isSpot }: Props) => {
  console.log(TAG + '🔥 ~line 35 ~ 받아온 data값 확인 ');
  console.log(data);
  console.log(
    '충전기 카탈로그',
    data?.preQuotation.finalQuotation.finalQuotationChargers,
  );
  console.log(
    '사업자 등록증',
    data?.preQuotation.finalQuotation.finalQuotationDetailFiles,
  );

  const finalQuotation = data?.preQuotation?.finalQuotation;
  return (
    <Wrapper>
      {data?.companyMemberAdditionalInfo?.companyLogoImageUrl! !== '' ? (
        <ImageBox>
          <Image
            src={data?.companyMemberAdditionalInfo?.companyLogoImageUrl!}
            alt="logo-img"
            layout="fill"
            priority={true}
            unoptimized={true}
          />
        </ImageBox>
      ) : (
        <NoImage />
      )}

      <Title>{data?.companyMemberAdditionalInfo?.companyName}</Title>
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
          <span className="value">{finalQuotation?.subscribePeriod} 개월</span>
        </Item>
        <Item>
          <span className="name">월 구독료</span>
          <span className="value">
            {PriceBasicCalculation(finalQuotation?.subscribePricePerMonth!)} 원
          </span>
        </Item>
        <Item>
          {/* --- 수익지분 보류 --- */}
          <span className="name">수익지분</span>
          <span className="value">
            {`${Math.floor(Number(finalQuotation?.userInvestRate) * 100)} %`}
          </span>
        </Item>
        {finalQuotation?.finalQuotationChargers?.map((item, index) => (
          <Item key={index}>
            {index === 0 ? (
              <span className="name">충전기 종류 및 수량</span>
            ) : (
              <span className="name" />
            )}
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
            {`${finalQuotation?.constructionPeriod} 일`}
          </span>
        </Item>
        {finalQuotation?.finalQuotationChargers?.length == 1 ? (
          <>
            {/* 충전량 1개 일 때  */}
            <Item>
              <span className="name">충전요금</span>
              <span className="value">{`${finalQuotation?.finalQuotationChargers[0]?.chargePrice} 원 / kW`}</span>
            </Item>
            <Item>
              <span className="name">충전기 설치 위치</span>
              <span className="value">
                {`${convertKo(
                  location,
                  locationEn,
                  finalQuotation?.finalQuotationChargers[0]
                    ?.installationLocation,
                )}`}
              </span>
            </Item>
            <Item>
              <span className="name">충전기 제조사</span>
              <span className="value">
                {finalQuotation?.finalQuotationChargers[0]?.manufacturer}
              </span>
            </Item>
          </>
        ) : (
          <>
            {/* 충전량 2개 이상일 때 */}
            <MultiSection>
              <Subtitle>충전요금</Subtitle>
              {finalQuotation?.finalQuotationChargers?.map((item, index) => (
                <MultiBox key={item.finalQuotationChargerIdx}>
                  <Item>
                    <span className="name">{item?.kind}</span>
                    <span className="value">{`${PriceBasicCalculation(
                      item.chargePrice,
                    )} 원 / kW`}</span>
                  </Item>
                </MultiBox>
              ))}
            </MultiSection>
            <MultiSection>
              <Subtitle>충전기 설치 위치</Subtitle>
              {finalQuotation?.finalQuotationChargers?.map((item, index) => (
                <MultiBox key={item.finalQuotationChargerIdx}>
                  <Item>
                    <span className="name">{item.installationLocation}</span>
                    <span className="value">{`${PriceBasicCalculation(
                      item.chargePrice,
                    )} 원 / kW`}</span>
                  </Item>
                </MultiBox>
              ))}
            </MultiSection>
            <MultiSection>
              <Subtitle>충전기 제조사</Subtitle>
              {finalQuotation?.finalQuotationChargers?.map((item, index) => (
                <MultiBox key={item.finalQuotationChargerIdx}>
                  <Item>
                    <span className="name">{item?.kind}</span>
                    <span className="value">{item?.manufacturer}</span>
                  </Item>
                </MultiBox>
              ))}
            </MultiSection>
          </>
        )}
      </List>
      <Line />
      <Section>
        <FlexWrap2>
          {/* 현장실사 결과 */}
          <Label2>현장실사 결과</Label2>
          <FeaturesList2>{finalQuotation?.spotInspectionResult}</FeaturesList2>
        </FlexWrap2>
      </Section>
      <Line />
      <Section>
        <Subtitle>특장점</Subtitle>
        <FlexWrap>
          {/* 구독 상품 부분 */}
          <Label>구독 상품</Label>
          <FeaturesList3>
            {finalQuotation?.subscribeProductFeature
              ?.split('\n')
              .map((line) => (
                <li>
                  {line}
                  <br />
                </li>
              ))}
          </FeaturesList3>
          {/* 특장점 충전기 부분 */}
        </FlexWrap>
        {finalQuotation?.finalQuotationChargers?.map((item, index) => (
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
        ))}
      </Section>
      <Line />
      <Section grid={true}>
        <Subtitle>충전기 이미지</Subtitle>
        <GridImg>
          {finalQuotation?.finalQuotationChargers?.map((item, index) => (
            <React.Fragment key={item.finalQuotationChargerIdx}>
              {item.chargerImageFiles.map((img, index) => (
                <GridItem key={img.finalQuotationChargerFileIdx}>
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
          ))}
        </GridImg>
      </Section>
      <Line />
      <Section className="underLine" pb={pb}>
        <Subtitle>첨부 파일</Subtitle>
        {finalQuotation?.finalQuotationChargers?.map((item, index) => (
          <React.Fragment key={item.finalQuotationChargerIdx}>
            {item.catalogFiles.map((file, index) => (
              <FileDownloadBtn key={file.finalQuotationChargerFileIdx}>
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
        ))}
        {finalQuotation?.finalQuotationDetailFiles?.map((item, index) => (
          <FileDownloadBtn key={item.finalQuotationDetailFileIdx}>
            <FileDownload
              // onClick={DownloadFile}
              download={item.originalName}
              href={item.url}
            >
              <Image src={fileImg} alt="file-icon" layout="intrinsic" />
              {item.originalName}
            </FileDownload>
          </FileDownloadBtn>
        ))}
      </Section>
      <Line />
      <Contents>
        <Subtitle>파트너 정보</Subtitle>
        <div className="text-box">
          <span className="name">담당자</span>
          <span className="text">{data?.preQuotation?.member?.name}</span>
        </div>
        <div className="text-box">
          <span className="name">이메일</span>
          <span className="text">
            {data?.companyMemberAdditionalInfo.managerEmail}
          </span>
        </div>
        <div className="text-box">
          <span className="name">전화번호</span>
          <span className="text phone">
            {data?.preQuotation?.member?.phone}
          </span>
        </div>
      </Contents>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 60pt;

  @media (max-width: 899.25pt) {
    padding-top: 21pt;
  }
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 15pt;
  line-height: 15pt;
  padding: 0;
  margin-top: 21pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  @media (max-width: 899.25pt) {
    margin-top: 0pt;
    padding: 0 15pt;
  }
`;
const Section = styled.section<{ grid?: boolean; pb?: number }>`
  padding: 18pt 0pt;
  padding-bottom: ${({ pb }) => pb + 'pt'};
  ${({ grid }) =>
    grid &&
    css`
      padding-right: 0;
    `};

  @media (max-width: 899.25pt) {
    margin-left: 15pt;
  }
`;
const List = styled.ul`
  margin: 30pt 0 51pt;
  gap: 12pt;
  /* border-bottom: 0.75pt solid ${colors.lightGray}; */
  @media (max-width: 899.25pt) {
    margin: 30pt 15pt 0 15pt;
    padding-bottom: 18pt;
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
    /* border-bottom: 0.75pt solid ${colors.lightGray}; */
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
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }
  .value {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: left;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    flex: 2;
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
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
const ImageBox = styled.div`
  position: relative;
  width: 48pt;
  height: 48pt;
  margin-left: 15pt;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Subtitle = styled.h2`
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding-bottom: 24pt;
  @media (min-width: 900pt) {
    font-size: 15pt;
    line-height: 15pt;
  }
`;
const FlexWrap = styled.div`
  display: flex;
  flex-direction: row;
  &:nth-of-type(2) {
    margin-top: 61pt;
  }
  @media (max-width: 899.25pt) {
    display: block;
    &:nth-of-type(2) {
      margin-top: 0;
    }
  }
`;
const FlexWrap2 = styled.div`
  display: flex;
  flex-direction: row;

  &:nth-of-type(2) {
    margin-top: 61pt;
  }
  @media (max-width: 899.25pt) {
    display: block;
    &:nth-of-type(2) {
      margin-top: 0;
    }
  }

  @media (min-width: 900pt) {
    margin: 12pt 0;
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
  @media (max-width: 899.25pt) {
    flex: none;
  }
  @media (min-width: 900pt) {
    padding-left: 0;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
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
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 21pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
    :not(:nth-of-type(1)) {
      padding-top: 2pt;
    }
  }
  @media (max-width: 899.25pt) {
    flex: none;
  }
`;

const FeaturesList3 = styled.ol`
  padding-top: 6pt;
  list-style-type: decimal;
  list-style-position: inside;
  flex: 2;
  & li {
    list-style: none;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 18pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 21pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
    :not(:nth-of-type(1)) {
      padding-top: 2pt;
    }
  }
  @media (max-width: 899.25pt) {
    flex: none;
  }
`;
const GridImg = styled.div`
  display: flex;
  overflow-x: scroll;
  grid-template-columns: repeat(4, 1fr);
  padding-top: 15pt;
  gap: 6pt;
  cursor: pointer;
  @media (min-width: 900pt) {
    padding-left: 0;
  }
`;
const GridItem = styled.div`
  position: relative;
  border-radius: 6pt;
  width: 120pt;
  height: 144pt;
  flex-shrink: 0;

  @media (min-width: 900pt) {
    width: 178.5pt;
    height: 144pt;
  }
`;

const FileDownloadBtn = styled(Button)`
  margin: 0 15pt 6pt 0;
  padding: 7.5pt 6pt;
  border: 0.75pt solid ${colors.lightGray3};
  border-radius: 8px;
  @media (max-width: 899.25pt) {
    padding-bottom: 24pt;
  }
`;
const FileDownload = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 3pt;
  color: ${colors.gray2};
`;

const Line = styled.div`
  border-bottom: 0.75pt solid #e9eaee;
`;

const TextResult = styled.div`
  display: flex;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;

const Label2 = styled.div`
  font-weight: 700;
  font-size: 15pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  flex: 1;

  @media (max-width: 899.25pt) {
    flex: none;
    font-size: 10.5pt;
    line-height: 12pt;
  }
  @media (min-width: 900pt) {
    padding-left: 0;
    padding-top: 3pt;
  }
`;

const FeaturesList2 = styled.div`
  list-style-type: decimal;
  list-style-position: inside;
  flex: 2;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  @media (max-width: 899.25pt) {
    flex: none;
  }
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 500;
    line-height: 21pt;
    letter-spacing: -0.02em;
  }
`;

const NoImage = styled.div`
  height: 75pt;
  width: 75pt;
  border-radius: 6pt;
  background: #caccd1;
  @media (max-width: 899.25pt) {
    height: 48pt;
    width: 48pt;
    border-radius: 6pt;
    margin-left: 18pt;
    margin-bottom: 15pt;
  }
`;

const Contents = styled.div`
  padding-top: 19.5pt;
  padding-bottom: 18pt;
  padding: 19.5pt 15pt 18pt;
  @media (min-width: 900pt) {
    padding: 19.5pt 0 18pt;
  }

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
      @media (min-width: 900pt) {
        font-family: 'Spoqa Han Sans Neo';
        font-size: 12pt;
        font-weight: 500;
        line-height: 12pt;
        letter-spacing: -0.02em;
        text-align: right;
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

const Partner = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: 0em;
  text-align: left;
  padding-bottom: 24pt;
`;
export default FinalQuotation;
