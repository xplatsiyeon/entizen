import Image from 'next/image';
import colors from 'styles/colors';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import fileImg from 'public/mypage/file-icon.svg';
import { css } from '@emotion/react';
import React, { useCallback } from 'react';
import { PreQuotationResponse } from 'pages/mypage/request/detail/[id]';
import { convertKo, PriceBasicCalculation } from 'utils/calculatePackage';
import { M5_LIST, M5_LIST_EN } from 'assets/selectList';
import ManagerInfo from './ManagerInfo';

interface Props {
  pb?: number;
  data?: PreQuotationResponse;
}
const TAG = 'components/mypage/request/BiddingQuote.tsx';
const BiddingQuote = ({ pb, data }: Props) => {
  console.log(TAG + '🔥 ~line 35 ~ 받아온 data값 확인 ');
  console.log(data);

  return (
    <Wrapper>
      <ImageBox>
        <Image
          src={data?.companyMemberAdditionalInfo.companyLogoImageUrl!}
          alt="icon"
          priority={true}
          unoptimized={true}
          layout="fill"
        />
      </ImageBox>
      <Title>{data?.companyMemberAdditionalInfo.companyName}</Title>
      <List>
        <Item>
          <span className="name">월 구독료</span>
          <span className="value">
            {PriceBasicCalculation(data?.preQuotation.subscribePricePerMonth!)}
            원
          </span>
        </Item>
        <Item>
          <span className="name">수익지분</span>
          <span className="value">
            {Number(data?.quotationRequest.investRate) * 100} %
          </span>
        </Item>
        <Item>
          <span className="name">공사기간</span>
          <span className="value">
            {data?.preQuotation.constructionPeriod} 일
          </span>
        </Item>
        {/* 충전기 제조사 1개 일 때 */}
        {data?.preQuotation.preQuotationChargers.length === 1 ? (
          <>
            <Item>
              <span className="name">충전요금</span>
              <span className="value">
                {data?.preQuotation.preQuotationChargers[0].chargePrice} 원 / kW
              </span>
            </Item>
            <Item>
              <span className="name">충전기 제조사</span>
              <span className="value">
                {data?.preQuotation.preQuotationChargers[0].manufacturer}
              </span>
            </Item>
          </>
        ) : (
          <>
            {/* 충전기 제조사 2개 이상 일 때 */}
            <MultiSection>
              <Subtitle>충전요금</Subtitle>
              {data?.preQuotation.preQuotationChargers.map((item, index) => (
                <MultiBox key={item.preQuotationChargerIdx}>
                  <Item>
                    <span className="name">
                      {convertKo(
                        M5_LIST,
                        M5_LIST_EN,
                        data?.quotationRequest.quotationRequestChargers[index]
                          .kind,
                      )}
                    </span>
                    <span className="value">{`${PriceBasicCalculation(
                      item.chargePrice,
                    )} 원 / kW`}</span>
                  </Item>
                </MultiBox>
              ))}
            </MultiSection>
            <MultiSection>
              <Subtitle>충전기 제조사</Subtitle>
              {data?.preQuotation.preQuotationChargers.map((item, index) => (
                <MultiBox key={item.preQuotationChargerIdx}>
                  <Item>
                    <span className="name">
                      {convertKo(
                        M5_LIST,
                        M5_LIST_EN,
                        data?.quotationRequest.quotationRequestChargers[index]
                          .kind,
                      )}
                    </span>
                    <span className="value">{`${PriceBasicCalculation(
                      item.chargePrice,
                    )} 원 / kW`}</span>
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
          <Label>구독 상품</Label>
          <FeaturesList>
            {/* textarea 줄바꿈 */}
            {data?.preQuotation.subscribeProductFeature
              .split('\n')
              .map((line) => (
                <li>
                  {line}
                  <br />
                </li>
              ))}
          </FeaturesList>
        </FlexWrap>
        {data?.preQuotation.preQuotationChargers.map((item, index) => (
          <FlexWrap key={item.preQuotationChargerIdx}>
            <Label>
              {convertKo(
                M5_LIST,
                M5_LIST_EN,
                data?.quotationRequest.quotationRequestChargers[index].kind,
              )}
            </Label>
            {/* textarea 줄바꿈 */}
            <FeaturesList>
              {item.productFeature.split('\n').map((line) => (
                <li>
                  {line}
                  <br />
                </li>
              ))}
              {/* <li>{item.productFeature}</li> */}
            </FeaturesList>
          </FlexWrap>
        ))}
      </Section>
      {/* 이미지 부분 */}
      <Section imgBox={true}>
        <Subtitle>충전기 이미지</Subtitle>
        <GridImg>
          {data?.preQuotation.preQuotationChargers.map((item, index) => (
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
          ))}
        </GridImg>
      </Section>
      {/* 파일 부분 */}
      <Section pb={pb}>
        <Subtitle>충전기 카탈로그</Subtitle>
        <FileContainer>
          {data?.preQuotation.preQuotationChargers.map((item, index) => (
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
          ))}
        </FileContainer>
      </Section>
      <Section pb={pb}>
        {/* 담당자 정보 */}
        <ManagerInfo
          name={data?.preQuotation?.member?.name!}
          email={data?.companyMemberAdditionalInfo?.managerEmail!}
          phone={data?.preQuotation?.member?.phone!}
        />
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 60pt;
  @media (max-width: 899pt) {
    padding-top: 21pt;
    padding-bottom: 150pt;
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
  @media (max-width: 899pt) {
    margin-top: 0pt;
    padding: 0 15pt;
  }
`;
const Section = styled.section<{ imgBox?: boolean; pb?: number }>`
  padding: 18pt 0pt;
  padding-bottom: ${({ pb }) => pb + 'pt'};
  :not(:last-child) {
    border-bottom: 0.75pt solid ${colors.lightGray};
  }
  ${({ imgBox }) =>
    imgBox &&
    css`
      padding-right: 0;
    `};

  @media (max-width: 899pt) {
    margin-left: 15pt;
  }
`;
const List = styled.ul`
  margin: 30pt 0 51pt;
  gap: 12pt;
  border-bottom: 0.75pt solid ${colors.lightGray};
  @media (max-width: 899pt) {
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
    border-bottom: 0.75pt solid ${colors.lightGray};
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
`;
const FlexWrap = styled.div`
  display: flex;
  flex-direction: row;
  &:nth-of-type(2) {
    margin-top: 61pt;
  }
  @media (max-width: 899pt) {
    display: block;
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
  grid-template-columns: repeat(4, 1fr);
  padding-top: 15pt;
  gap: 6pt;
`;
const GridItem = styled.div`
  background-color: blue;
  position: relative;
  border-radius: 6pt;
  width: 120pt;
  height: 144pt;
  flex-shrink: 0;
`;
const FileContainer = styled.div`
  padding-top: 15pt;
`;
const FileDownloadBtn = styled(Button)`
  margin: 0 15pt 6pt 0;
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

export default BiddingQuote;
