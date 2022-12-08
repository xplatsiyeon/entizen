import Image from 'next/image';
import colors from 'styles/colors';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import fileImg from 'public/mypage/file-icon.svg';
import { css } from '@emotion/react';
import React, { useCallback, useState } from 'react';
import {
  PreQuotationChargers,
  PreQuotationResponse,
} from 'pages/mypage/request/detail';
import { convertKo, PriceBasicCalculation } from 'utils/calculatePackage';
import { M5_LIST, M5_LIST_EN } from 'assets/selectList';
import ManagerInfo from './ManagerInfo';
import { SolarPower } from '@mui/icons-material';
import TwoButton from './TwoButton';
import { reverse } from 'dns';

interface Props {
  pb?: number;
  data?: PreQuotationResponse;
  isSpot?: boolean;
  onClcikModal?: () => void;
}
const TAG = 'components/mypage/request/BiddingQuote.tsx';
const BiddingQuote = ({ pb, data, isSpot, onClcikModal }: Props) => {
  console.log(TAG + '🔥 ~line 35 ~ 받아온 data값 확인 ');
  console.log(data);

  const [chargeIdx, setChargeIdx] = useState<number>(0);
  const [webIdx, setWebIdx] = useState<number>(0);
  const [rightUrl, setRightUrl] = useState<string>();

  const webHandleNum = (idx: number) => {
    setWebIdx(idx);
  };

  // 오른쪽 큰 이미지
  const DataFilter =
    data?.preQuotation?.preQuotationChargers[chargeIdx]?.chargerImageFiles[
      webIdx
    ]?.url;

  // 부분 구독 판별
  const partSubscribe = data?.quotationRequest?.subscribeProduct;

  // 데이터 역순으로 나오는거 reverse
  const preQuotationChargers = data?.preQuotation?.preQuotationChargers!;
  const reverseNewArr: PreQuotationChargers[] = [];
  preQuotationChargers?.forEach((el, idx) => reverseNewArr.unshift(el));

  return (
    <Wrapper>
      {isSpot === undefined && (
        <TopWebRapper>
          {/* 웹 사진이 들어갈 공간*/}
          <WebFinishedPhotoWrapper>
            <WebLeftPhotoWrapper>
              {data?.preQuotation.preQuotationChargers.map((item, index) => (
                <WebLeftPhotoBox key={index}>
                  {item.chargerImageFiles.map((img, idx) => (
                    <WebLeftPhotos
                      key={idx}
                      onClick={() => {
                        webHandleNum(idx);
                        setChargeIdx(index);
                      }}
                      chargeIdx={chargeIdx}
                      index={index}
                    >
                      <div className="imgBox">
                        <Image
                          src={img.url}
                          alt="img-icon"
                          layout="fill"
                          priority={true}
                          unoptimized={true}
                        />
                      </div>
                    </WebLeftPhotos>
                  ))}
                </WebLeftPhotoBox>
              ))}
            </WebLeftPhotoWrapper>
            <WebRightPhotoBox>
              <div className="imgBox">
                <Image
                  src={DataFilter!}
                  alt="img-icon"
                  layout="fill"
                  priority={true}
                  unoptimized={true}
                />
              </div>
            </WebRightPhotoBox>
          </WebFinishedPhotoWrapper>

          {/* 충전소 회사 정보 */}

          <ChareCompanyInfo>
            {data?.companyMemberAdditionalInfo?.companyLogoImageUrl !== '' ? (
              <ImageBox>
                <Image
                  src={data?.companyMemberAdditionalInfo?.companyLogoImageUrl!}
                  alt="icon"
                  priority={true}
                  unoptimized={true}
                  layout="fill"
                />
              </ImageBox>
            ) : (
              <NoImage />
            )}

            <Title>{data?.companyMemberAdditionalInfo?.companyName}</Title>
            <WebList>
              {/* 부분구독일경우 충전소 설치비 불러와야함 */}
              {partSubscribe === 'PART' && (
                <WebItem>
                  <span className="name">충전소 설치비</span>
                  <span className="value">원</span>
                </WebItem>
              )}
              <WebItem>
                <span className="name">월 구독료</span>
                <span className="value">
                  {PriceBasicCalculation(
                    data?.preQuotation?.subscribePricePerMonth!,
                  )}
                  원
                </span>
              </WebItem>
              <WebItem>
                <span className="name">수익지분</span>
                <span className="value">
                  {Number(data?.quotationRequest?.investRate) * 100} %
                </span>
              </WebItem>
              <WebItem>
                <span className="name">공사기간</span>
                <span className="value">
                  {data?.preQuotation?.constructionPeriod} 일
                </span>
              </WebItem>
              {/* 충전기 제조사 1개 일 때 */}
              {data?.preQuotation?.preQuotationChargers.length === 1 ? (
                <>
                  <WebItem>
                    <span className="name">충전요금</span>
                    {data?.preQuotation?.preQuotationChargers[0]
                      ?.chargePriceType === 'PURCHASER_AUTONOMY' ? (
                      <span className="value">구매자 자율</span>
                    ) : (
                      <span className="value">
                        {
                          data?.preQuotation?.preQuotationChargers[0]
                            .chargePrice
                        }
                        원 / kW
                      </span>
                    )}
                  </WebItem>
                  <WebItem>
                    <span className="name">충전기 제조사</span>
                    <span className="value">
                      {data?.preQuotation?.preQuotationChargers[0].manufacturer}
                    </span>
                  </WebItem>
                </>
              ) : (
                <>
                  {/* 충전기 제조사 2개 이상 일 때 */}
                  <MultiSection>
                    <Subtitle>충전요금</Subtitle>
                    {/* 2개 이상일때도 요금 구매자 자율이면 '구매자 자율'문자 반영 */}
                    {/* index 뒤집어져서 나오는 이슈가 있어서 여기는 map전에 reverse()해줌 이상있으면 바로 수정 / 여기 위치는 웹에서 오른쪽 상단박스 */}
                    {reverseNewArr?.map((item, index) => (
                      <MultiBox key={index}>
                        {item.chargePriceType !== 'PURCHASER_AUTONOMY' ? (
                          <WebItem>
                            <span className="name">
                              {convertKo(
                                M5_LIST,
                                M5_LIST_EN,
                                data?.quotationRequest
                                  ?.quotationRequestChargers[index]?.kind,
                              )}
                            </span>
                            <span className="value">{`${PriceBasicCalculation(
                              item.chargePrice,
                            )} 원 / kW`}</span>
                          </WebItem>
                        ) : (
                          <WebItem>
                            <span className="name">
                              {convertKo(
                                M5_LIST,
                                M5_LIST_EN,
                                data?.quotationRequest
                                  ?.quotationRequestChargers[index]?.kind,
                              )}
                            </span>
                            <span className="value">구매자 자율</span>
                          </WebItem>
                        )}
                      </MultiBox>
                    ))}
                  </MultiSection>
                  <MultiSection>
                    <Subtitle>충전기 제조사</Subtitle>
                    {/* 2개 이상일때도 요금 구매자 자율이면 '구매자 자율'문자 반영 */}
                    {/* 여기도 역순으로 나오면 reverse() 해야함 */}
                    {reverseNewArr?.map((item, index) => (
                      <MultiBox key={index}>
                        <WebItem>
                          <span className="name">
                            {convertKo(
                              M5_LIST,
                              M5_LIST_EN,
                              data?.quotationRequest?.quotationRequestChargers[
                                index
                              ]?.kind,
                            )}
                          </span>
                          <span className="value">{item.manufacturer}</span>
                        </WebItem>
                      </MultiBox>
                    ))}
                  </MultiSection>
                </>
              )}
            </WebList>
            <TwoButton
              onClcikModal={onClcikModal!}
              id={data?.companyMemberAdditionalInfo?.memberIdx}
            />
          </ChareCompanyInfo>
        </TopWebRapper>
      )}

      <>
        {data?.companyMemberAdditionalInfo?.companyLogoImageUrl !== '' ? (
          <ImageBox>
            <Image
              src={data?.companyMemberAdditionalInfo?.companyLogoImageUrl!}
              alt="icon"
              priority={true}
              unoptimized={true}
              layout="fill"
            />
          </ImageBox>
        ) : (
          <NoImage />
        )}

        <Title>{data?.companyMemberAdditionalInfo?.companyName}</Title>
        <List>
          {/* 부분구독일 경우 충전소 설치비 데이터 불러와야함 */}
          {partSubscribe === 'PART' && (
            <Item>
              <span className="name">충전소 설치비</span>
              <span className="value">원</span>
            </Item>
          )}
          <Item>
            <span className="name">월 구독료</span>
            <span className="value">
              {PriceBasicCalculation(
                data?.preQuotation?.subscribePricePerMonth!,
              )}
              원
            </span>
          </Item>
          <Item>
            <span className="name">수익지분</span>
            <span className="value">
              {Number(data?.quotationRequest?.investRate) * 100} %
            </span>
          </Item>
          <Item>
            <span className="name">공사기간</span>
            <span className="value">
              {data?.preQuotation?.constructionPeriod} 일
            </span>
          </Item>
          {/* 충전기 제조사 1개 일 때 */}
          {/* 구매자 자율이면 '구매자 자율'문자 반영 */}
          {data?.preQuotation?.preQuotationChargers.length === 1 ? (
            <>
              <Item>
                <span className="name">충전요금</span>
                {data?.preQuotation?.preQuotationChargers[0].chargePriceType !==
                'PURCHASER_AUTONOMY' ? (
                  <span className="value">
                    {data?.preQuotation?.preQuotationChargers[0].chargePrice} 원
                    / kW
                  </span>
                ) : (
                  <span className="value">구매자 자율</span>
                )}
              </Item>
              <Item>
                <span className="name">충전기 제조사</span>
                <span className="value">
                  {data?.preQuotation?.preQuotationChargers[0].manufacturer}
                </span>
              </Item>
            </>
          ) : (
            <>
              {/* 충전기 제조사 2개 이상 일 때 */}
              <MultiSection>
                <Subtitle>충전요금</Subtitle>
                {/* 2개 이상일때도 요금 구매자 자율이면 '구매자 자율'문자 반영 */}
                {/* 여기도 역순으로 나오면 reverse() 해야함 */}
                {reverseNewArr?.map((item, index) => (
                  <MultiBox key={index}>
                    {item.chargePriceType !== 'PURCHASER_AUTONOMY' ? (
                      <Item>
                        <span className="name">
                          {convertKo(
                            M5_LIST,
                            M5_LIST_EN,
                            data?.quotationRequest?.quotationRequestChargers[
                              index
                            ]?.kind,
                          )}
                        </span>
                        <span className="value">{`${PriceBasicCalculation(
                          item.chargePrice,
                        )} 원 / kW`}</span>
                      </Item>
                    ) : (
                      <Item>
                        <span className="name">
                          {convertKo(
                            M5_LIST,
                            M5_LIST_EN,
                            data?.quotationRequest?.quotationRequestChargers[
                              index
                            ]?.kind,
                          )}
                        </span>
                        <span className="value">구매자 자율</span>
                      </Item>
                    )}
                  </MultiBox>
                ))}
              </MultiSection>
              <MultiSection>
                <Subtitle>충전기 제조사</Subtitle>
                {/* 2개 이상일때도 요금 구매자 자율이면 '구매자 자율'문자 반영 */}
                {/* 여기도 역순으로 나오면 reverse() 해야함 */}
                {reverseNewArr?.map((item, index) => (
                  <MultiBox key={index}>
                    <Item>
                      <span className="name">
                        {convertKo(
                          M5_LIST,
                          M5_LIST_EN,
                          data?.quotationRequest?.quotationRequestChargers[
                            index
                          ]?.kind,
                        )}
                      </span>
                      <span className="value">{item.manufacturer}</span>
                    </Item>
                  </MultiBox>
                ))}
              </MultiSection>
            </>
          )}
        </List>
      </>
      <Line />
      <Section>
        <Subtitle>특장점</Subtitle>
        <FlexWrap>
          <Label>구독 상품</Label>
          <FeaturesList>
            {/* textarea 줄바꿈 */}
            {data?.preQuotation?.subscribeProductFeature
              ?.split('\n')
              .map((line) => (
                <li>
                  {line}
                  <br />
                </li>
              ))}
          </FeaturesList>
        </FlexWrap>
        {reverseNewArr?.map((item, index) => (
          <FlexWrap key={index}>
            <Label>
              {convertKo(
                M5_LIST,
                M5_LIST_EN,
                data?.quotationRequest?.quotationRequestChargers[index]?.kind,
              )}
            </Label>
            {/* textarea 줄바꿈 */}
            {/* 여기 특장점 2개부터 인덱스가 반대로 나와서 reverse() 사용 */}
            <FeaturesList>
              {item?.productFeature?.split('\n').map((line, index) => (
                <li key={index}>
                  {line}
                  <br />
                </li>
              ))}
              {/* <li>{item.modelName}</li> */}
            </FeaturesList>
          </FlexWrap>
        ))}
      </Section>
      <Line />
      {/* 이미지 부분 */}
      <Section imgBox={true}>
        <Subtitle>충전기 이미지</Subtitle>
        <GridImg>
          {data?.preQuotation.preQuotationChargers.map((item, index) => (
            <React.Fragment key={index}>
              {item.chargerImageFiles.map((img, index) => (
                <GridItem key={index}>
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
      {/* 파일 부분 */}
      <ChargeSection pb={pb}>
        <Subtitle>충전기 카탈로그</Subtitle>
        <FileContainer>
          {data?.preQuotation.preQuotationChargers.map((item, index) => (
            <React.Fragment key={index}>
              {item.catalogFiles.map((file, index) => (
                <FileDownloadBtn key={index}>
                  <FileDownload download={file.originalName} href={file.url}>
                    <Image src={fileImg} alt="file-icon" layout="intrinsic" />
                    {file.originalName}
                  </FileDownload>
                </FileDownloadBtn>
              ))}
            </React.Fragment>
          ))}
        </FileContainer>
      </ChargeSection>
      {isSpot !== undefined && (
        <Section pb={pb}>
          {/* 담당자 정보 */}
          {isSpot && (
            <ManagerInfo
              name={data?.preQuotation?.member?.name!}
              email={data?.companyMemberAdditionalInfo?.managerEmail!}
              phone={data?.preQuotation?.member?.phone!}
            />
          )}
        </Section>
      )}
    </Wrapper>
  );
};

const TopWebRapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 900pt;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const ChareCompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 255pt;

  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const Wrapper = styled.div`
  /* padding-top: 60pt; */

  @media (max-width: 899.25pt) {
    padding-top: 21pt;
  }
`;
const Title = styled.h1`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 700;
  font-size: 15pt;
  line-height: 15pt;
  padding: 0;
  margin-top: 21pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  @media (max-width: 899.25pt) {
    margin-top: 15pt;
    padding: 0 15pt;
    font-size: 15pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
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

  @media (max-width: 899.25pt) {
    margin-left: 15pt;
  }

  @media (min-width: 900pt) {
    overflow-x: scroll;
    padding: 40pt 0;

    :not(:last-child) {
      border-bottom: 0;
      padding-bottom: 0;
    }
  }
`;

const ChargeSection = styled.section<{ imgBox?: boolean; pb?: number }>`
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

  @media (max-width: 899.25pt) {
    margin-left: 15pt;
    padding-bottom: 80.25pt;
  }

  @media (min-width: 900pt) {
    border-bottom: 0;
    padding: 30pt 0;
  }
`;

const Line = styled.div`
  width: 580.5pt;
  border-bottom: 0.75pt solid ${colors.lightGray};
  padding-top: 21pt;

  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const List = styled.ul`
  margin-top: 30pt;
  gap: 12pt;

  @media (max-width: 899.25pt) {
    margin: 30pt 15pt 0 15pt;
    padding-bottom: 18pt;
  }
`;

const WebList = styled.div`
  margin: 30pt 0 41pt;

  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const WebHide = styled.div`
  @media (min-width: 900pt) {
    display: none;
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
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
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

const WebItem = styled.li`
  display: flex;

  :not(:nth-of-type(1)) {
    padding-top: 15pt;
  }
  .name {
    font-weight: 500;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
    flex: 1;
  }
  .value {
    font-weight: 500;
    font-size: 12pt;
    line-height: 12pt;
    text-align: left;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    flex: 2;
  }

  @media (min-width: 900pt) {
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
  @media (min-width: 900pt) {
    margin-left: 0;
    width: 75pt;
    height: 75pt;
  }
`;

const SendTextTitle = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 18pt;
  font-weight: 700;
  line-height: 18.75pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #5221cb;
  padding-top: 60pt;
  padding-bottom: 21pt;
`;
const Subtitle = styled.h2`
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 15pt;
    font-weight: 700;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;
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
  list-style: none;

  & li {
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 21pt;
      letter-spacing: -0.02em;
      text-align: left;
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
`;

const GridImg = styled.div`
  display: flex;
  overflow-x: scroll;
  padding-top: 15pt;
  gap: 6pt;
  cursor: pointer;
  @media (min-width: 900pt) {
    width: 580.5pt;
    display: flex;
    overflow: scroll;
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
  }
`;
const FileContainer = styled.div`
  padding-top: 15pt;
  @media (min-width: 900pt) {
    width: 580.5pt;
  }
`;
const FileDownloadBtn = styled(Button)`
  margin: 0 15pt 6pt 0;
  padding: 7.5pt 6pt;
  border: 0.75pt solid ${colors.lightGray3};
  border-radius: 6pt;
`;
const FileDownload = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 3pt;
  color: ${colors.gray2};
`;

const WebFinishedPhotoWrapper = styled.div`
  @media (min-width: 900pt) {
    width: 580.5pt;
    display: flex;
    justify-content: space-between;
    margin-bottom: 51pt;
  }
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const WebLeftPhotoBox = styled.div``;

const WebLeftPhotoWrapper = styled.div`
  @media (min-width: 900pt) {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    height: 396pt;
  }
`;

const WebLeftPhotos = styled.div<{ index: number; chargeIdx: number }>`
  @media (min-width: 900pt) {
    margin-bottom: 9pt;
    width: 60pt;
    height: 60pt;
    border-radius: 6pt;
    border: ${({ index, chargeIdx }) =>
      index === chargeIdx ? `0.75pt solid #5221cb` : 'none'};
    cursor: pointer;
    .imgBox {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
`;

const WebRightPhotoBox = styled.div`
  @media (min-width: 900pt) {
    width: 508.5pt;
    height: 396pt;
    border-radius: 12pt;
    .imgBox {
      position: relative;
      border-radius: 12pt;
      width: 100%;
      height: 100%;
    }
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
    margin-left: 15pt;
    margin-bottom: 15pt;
  }
`;

export default BiddingQuote;
