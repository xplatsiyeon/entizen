import styled from '@emotion/styled';
import { Button } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import colors from 'styles/colors';
import fileImg from 'public/mypage/file-icon.svg';
import { css } from '@emotion/react';
import { SentRequestResponse } from './SentProvisionalQuoatation';
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

type Props = {
  pb?: number;
  data: SentRequestResponse | undefined;
};
const TAG =
  'componentsCompany/CompanyQuotation/SentQuotation/FinalBottomBox.tsx';
const FinalBottomBox = ({ pb, data }: Props) => {
  const finalQuotation =
    data?.sendQuotationRequest?.preQuotation?.finalQuotation!;

  // 부분 구독 판독
  const partSubscribe =
    data?.sendQuotationRequest?.quotationRequest?.subscribeProduct;

  return (
    <Wrapper>
      {data?.sendQuotationRequest?.companyMemberAdditionalInfo
        ?.companyLogoImageUrl !== '' ? (
        <ImageBox>
          <Image
            src={
              data?.sendQuotationRequest?.companyMemberAdditionalInfo
                ?.companyLogoImageUrl!
            }
            alt="logo-img"
            layout="fill"
            priority={true}
            unoptimized={true}
          />
        </ImageBox>
      ) : (
        <NoImage />
      )}

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
          <span className="value">{finalQuotation?.subscribePeriod} 개월</span>
        </Item>
        {/* 부분구독일 경우 충전소 설치비 추가 */}
        {partSubscribe === 'PART' && (
          <Item>
            <span className="name">충전소 설치비</span>
            <span className="value">20 원</span>
          </Item>
        )}

        <Item>
          <span className="name">월 구독료</span>
          <span className="value">
            {PriceBasicCalculation(finalQuotation?.subscribePricePerMonth)} 원
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
        <Line2 />
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
              {/* 2개 이상일때도 요금 구매자 자율이면 '구매자 자율'문자 반영 */}
              {finalQuotation?.finalQuotationChargers?.map((item, index) => (
                <MultiBox key={item.finalQuotationChargerIdx}>
                  {item.chargePriceType !== 'PURCHASER_AUTONOMY' ? (
                    <Item>
                      <span className="name">
                        {convertKo(M5_LIST, M5_LIST_EN, item?.kind)}
                      </span>
                      <span className="value">{`${PriceBasicCalculation(
                        item.chargePrice,
                      )} 원 / kW`}</span>
                    </Item>
                  ) : (
                    <Item>
                      <span className="name">
                        {convertKo(M5_LIST, M5_LIST_EN, item?.kind)}
                      </span>
                      <span className="value">구매자 자율</span>
                    </Item>
                  )}
                </MultiBox>
              ))}
            </MultiSection>
            <MultiSection>
              <Subtitle>충전기 제조사</Subtitle>
              {finalQuotation?.finalQuotationChargers?.map((item, index) => (
                <MultiBox key={item.finalQuotationChargerIdx}>
                  <Item>
                    <span className="name">
                      {convertKo(M5_LIST, M5_LIST_EN, item?.kind)}
                    </span>
                    <span className="value">{item?.manufacturer}</span>
                  </Item>
                </MultiBox>
              ))}
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
            {/* {data?.sendQuotationRequest?.preQuotation?.finalQuotation?.subscribeProductFeature
              ?.split('\n')
              .map((line, idx) => (
                <li key={idx}>
                  {line}
                  <br />
                </li>
              ))} */}
            {
              data?.sendQuotationRequest?.preQuotation?.finalQuotation
                ?.subscribeProductFeature
            }
          </FeaturesList>
          {/* 특장점 충전기 부분 */}
        </FlexWrap>
        {data?.sendQuotationRequest?.preQuotation?.finalQuotation?.finalQuotationChargers?.map(
          (item, index) => (
            <FlexWrap key={item.finalQuotationChargerIdx}>
              <Label>{convertKo(M5_LIST, M5_LIST_EN, item?.kind)}</Label>
              <FeaturesList>
                {item.productFeature?.split('\n').map((line, idx) => (
                  <li key={idx}>
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
          {data?.sendQuotationRequest?.preQuotation?.finalQuotation?.finalQuotationChargers?.map(
            (item, index) => (
              <React.Fragment key={item?.finalQuotationChargerIdx! + index}>
                {item?.chargerImageFiles?.map((img, index) => (
                  <GridItem key={img?.finalQuotationChargerIdx + index}>
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
        {/* 여기에 충전기 카탈로그 + 사업자 등록증 같이 나와야함 */}
        <Subtitle>첨부 파일</Subtitle>
        {/* 충전기 카탈로그 불러옴 */}
        {data?.sendQuotationRequest?.preQuotation?.finalQuotation?.finalQuotationChargers?.map(
          (item, index) => (
            <React.Fragment key={item?.finalQuotationChargerIdx! + index}>
              {item?.catalogFiles?.map((file, index) => (
                <FileDownloadBtn key={file?.finalQuotationChargerIdx + index}>
                  <FileDownload
                    // onClick={DownloadFile}
                    download={file.originalName}
                    href={file.url}
                  >
                    <Image src={fileImg} alt="file-icon" layout="intrinsic" />
                    <FileName>{file.originalName}</FileName>
                  </FileDownload>
                </FileDownloadBtn>
              ))}
            </React.Fragment>
          ),
        )}
        {/* 사업자 등록증 불러옴 */}
        {finalQuotation?.finalQuotationDetailFiles.map((item, index) => (
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* padding-top: 60pt; */

  .underLine {
    border-bottom: none;
  }

  @media (max-width: 899.25pt) {
    padding-top: 21pt;
  }
  @media (max-width: 900pt) {
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
  @media (max-width: 899.25pt) {
    margin-top: 0pt;
    padding: 0 15pt;
  }
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 15pt;
    font-weight: 700;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;
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
  @media (max-width: 899.25pt) {
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
    @media (min-width: 900pt) {
      padding-top: 15pt;
    }
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

  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 15pt;
    font-weight: 700;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;
    padding: 0;
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
    @media (min-width: 900pt) {
      padding-top: 18pt;
    }
  }
  @media (max-width: 899.25pt) {
    flex: none;
  }
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
    padding-left: 0;
  }
`;
const FeaturesList = styled.ol`
  padding-top: 6pt;
  list-style-type: decimal;
  list-style-position: inside;
  flex: 2;
  & li {
    list-style: none;
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 21pt;
      letter-spacing: -0.02em;
      text-align: left;
      padding-top: 5pt;
    }
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 18pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    :not(:nth-of-type(1)) {
      padding-top: 2pt;
    }
  }
  @media (max-width: 899.25pt) {
    flex: none;
  }

  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const GridImg = styled.div`
  display: flex;
  overflow-x: scroll;
  padding-top: 15pt;
  padding-left: 15pt;
  gap: 6pt;

  @media (min-width: 900pt) {
    padding-left: 0;
  }
`;
const GridItem = styled.span`
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
  margin: 15pt 15pt 6pt 15pt;
  padding: 7.5pt 6pt;
  border: 0.75pt solid ${colors.lightGray3};
  border-radius: 8px;
  @media (min-width: 900pt) {
    margin-left: 0;
  }
`;

const FileDownload = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 3pt;
  color: ${colors.gray2};
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

const Line = styled.div`
  border-bottom: 0.75pt solid #e9eaee;
`;
const Line2 = styled.div`
  border-bottom: 0.75pt solid #e9eaee;
  margin-top: 30pt;
`;

const FileName = styled.div`
  display: block;
  width: 150pt;
  font-weight: 400;
  padding-top: 2pt;
  white-space: nowrap;
  font-size: 10.5pt;
  line-height: 9pt;
  letter-spacing: -0.02em;
  color: ${colors.dark2};
  text-overflow: ellipsis;
  overflow: hidden;
`;

export default FinalBottomBox;
