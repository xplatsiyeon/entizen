import Image from 'next/image';
import colors from 'styles/colors';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import fileImg from 'public/mypage/file-icon.svg';
import { css } from '@emotion/react';
import React, { useRef, useState } from 'react';
import {
  convertKo,
  hyphenFn,
  PriceBasicCalculation,
} from 'utils/calculatePackage';
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
import { PreQuotations } from 'pages/mypage/request';
import { fileDownload } from 'bridge/appToWeb';
import ImgDetailCarousel from 'components/ImgDetailCarousel';

interface Props {
  pb?: number;
  data?: PreQuotations;
  isSpot?: boolean;
  isFinalItmeIndex?: number;
}
const FinalQuotation = ({ pb, data, isFinalItmeIndex }: Props) => {
  // const { userAgent } = useSelector((state: RootState) => state.userAgent);
  // 이미지 상세보기 모달창
  const [openImgModal, setOpenImgModal] = useState(false);
  // 충전기 이미지 클릭시 뭐 눌렀는지 확인
  const idxRef = useRef(-1);

  const initialSlideOnChange = (idx: number) => {
    idxRef.current = idx;
  };
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);

  const chargerFile = data?.finalQuotation?.finalQuotationChargers?.map(
    (item) => item?.chargerImageFiles.reverse(),
  );

  const chargerFile2 = { ...chargerFile };
  const callPhone = hyphenFn(data?.member?.phone!);
  const finalQuotation = data?.finalQuotation;
  const homeSelect = data?.finalQuotation?.finalQuotationChargers.filter(
    (el) => el.kind === '7-HOME',
  );

  return (
    <Wrapper>
      {data?.member?.companyMemberAdditionalInfo?.companyLogoImageUrl! !==
      '' ? (
        <ImageBox>
          <Image
            src={
              data?.member?.companyMemberAdditionalInfo?.companyLogoImageUrl!
            }
            alt="logo-img"
            layout="fill"
            priority={true}
            unoptimized={true}
            objectFit="cover"
            style={{ borderRadius: '6pt' }}
          />
        </ImageBox>
      ) : (
        <NoImage />
      )}

      <Title>{data?.member?.companyMemberAdditionalInfo?.companyName}</Title>
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
        {/* 부분 구독일 경우 충전소 설치비 나와야함 */}
        {data?.finalQuotation?.subscribeProduct === 'PART' && (
          <Item>
            <span className="name">충전소 설치비</span>
            <span className="value">
              {`${PriceBasicCalculation(
                data?.finalQuotation?.chargingStationInstallationPrice,
              )} 원`}
            </span>
          </Item>
        )}

        <Item>
          <span className="name">월 구독료</span>
          <span className="value">
            {`${PriceBasicCalculation(
              finalQuotation?.subscribePricePerMonth!,
            )} 원`}
          </span>
        </Item>
        <Item>
          {/* --- 수익지분 보류 --- */}
          <span className="name">수익지분</span>
          <span className="value">
            {finalQuotation?.userInvestRate === '-'
              ? finalQuotation?.userInvestRate
              : `${Math.floor(Number(finalQuotation?.userInvestRate) * 100)} %`}
          </span>
        </Item>
        {finalQuotation?.finalQuotationChargers?.map((item, index) => (
          <Item key={index}>
            {index === 0 ? (
              <span className="name">충전기 종류 및 수량</span>
            ) : (
              <span className="name" />
            )}
            <span className="value2" style={{ lineHeight: '18pt' }}>
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
              {finalQuotation?.finalQuotationChargers[0]?.chargePriceType !==
              'PURCHASER_AUTONOMY' ? (
                <span className="value">{`${finalQuotation?.finalQuotationChargers[0]?.chargePrice} 원 / kW`}</span>
              ) : (
                <span className="value">구매자 자율</span>
              )}
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
              <Subtitle2>충전요금</Subtitle2>
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
            <Line2 />
            <MultiSection>
              <Subtitle2>충전기 설치 위치</Subtitle2>
              {finalQuotation?.finalQuotationChargers?.map((item, index) => (
                <MultiBox key={item.finalQuotationChargerIdx}>
                  <Item>
                    <span className="name">
                      {convertKo(M5_LIST, M5_LIST_EN, item?.kind)}
                    </span>
                    <span className="value">
                      {convertKo(
                        location,
                        locationEn,
                        item.installationLocation,
                      )}
                    </span>
                  </Item>
                </MultiBox>
              ))}
            </MultiSection>
            <Line2 />
            <MultiSection>
              <Subtitle2>충전기 제조사</Subtitle2>
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
      <Line style={{ paddingTop: '30pt' }} />
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
            {finalQuotation?.subscribeProductFeature}
          </FeaturesList3>
          {/* 특장점 충전기 부분 */}
        </FlexWrap>
        {finalQuotation?.finalQuotationChargers?.map((item, index) => {
          return (
            <FlexWrap key={item.finalQuotationChargerIdx}>
              <Label>{convertKo(M5_LIST, M5_LIST_EN, item?.kind)}</Label>
              <FeaturesList>
                {/* {item.productFeature
                  ? item.productFeature.split('\n').map((line, idx) => (
                      <li key={idx}>
                        {line}
                        <br />
                      </li>
                    ))
                  : ''} */}
                {item.productFeature}
              </FeaturesList>
            </FlexWrap>
          );
        })}
      </Section>
      <Line />
      <Section grid={true} width={true} className="noMargin">
        <Subtitle className="ml-15">충전기 이미지</Subtitle>
        <GridImg>
          {finalQuotation?.finalQuotationChargers?.map((item, index) => (
            <React.Fragment key={item.finalQuotationChargerIdx}>
              {item.chargerImageFiles.map((img, index) => (
                <GridItem
                  key={img.finalQuotationChargerFileIdx}
                  onClick={() => {
                    initialSlideOnChange(index);
                  }}
                >
                  <Image
                    src={img.url}
                    alt="img-icon"
                    layout="fill"
                    priority={true}
                    unoptimized={true}
                    objectFit="cover"
                    onClick={() => {
                      setOpenImgModal(!openImgModal);
                    }}
                  />
                </GridItem>
              ))}
            </React.Fragment>
          ))}
        </GridImg>
      </Section>
      {/* 이미지 자세히 보기 기능 */}
      {openImgModal && (
        <ImgDetailCarousel
          file={chargerFile2[0]!}
          setOpenImgModal={setOpenImgModal}
          idxRef={idxRef}
        />
      )}
      <Line />
      <Section className="underLine" pb={pb}>
        <Subtitle>첨부 파일</Subtitle>
        <FileWrapper>
          {finalQuotation?.finalQuotationChargers?.map((item, index) => (
            <React.Fragment key={item.finalQuotationChargerIdx}>
              {item.catalogFiles.map((file, index) => (
                <FileDownloadBtn key={file.finalQuotationChargerFileIdx}>
                  <FileDownload
                    download={file.originalName}
                    // href={file.url}
                    onClick={() => {
                      fileDownload(userAgent, file.originalName, file.url);
                    }}
                  >
                    <Image src={fileImg} alt="file-icon" layout="intrinsic" />
                    <FileName>{file.originalName}</FileName>
                  </FileDownload>
                </FileDownloadBtn>
              ))}
            </React.Fragment>
          ))}
          {finalQuotation?.finalQuotationDetailFiles?.map((item, index) => (
            <FileDownloadBtn key={item.finalQuotationDetailFileIdx}>
              <FileDownload
                download={item.originalName}
                onClick={() => {
                  fileDownload(userAgent, item.originalName, item.url);
                }}
              >
                <Image src={fileImg} alt="file-icon" layout="intrinsic" />
                <FileName>{item.originalName}</FileName>
              </FileDownload>
            </FileDownloadBtn>
          ))}
        </FileWrapper>
      </Section>
      <Line />
      <Contents>
        <Subtitle>담당자 정보</Subtitle>
        <div className="text-box">
          <span className="name">담당자</span>
          <span className="text">{data?.member?.name}</span>
        </div>
        <div className="text-box">
          <span className="name">이메일</span>
          <span className="text">
            {data?.member?.companyMemberAdditionalInfo?.managerEmail}
          </span>
        </div>
        <div className="text-box">
          <span className="name">전화번호</span>
          <a href={'tel:' + callPhone} className="phone">
            {callPhone}
          </a>
          <span className="webPhone">{callPhone}</span>
        </div>
      </Contents>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* padding-top: 36.75pt; */
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
const Section = styled.section<{
  grid?: boolean;
  pb?: number;
  width?: boolean;
}>`
  font-family: 'Spoqa Han Sans Neo' !important;
  padding: 30pt 0pt;
  ${({ grid }) =>
    grid &&
    css`
      padding-right: 0;
    `};
  @media (max-width: 899.25pt) {
    margin-left: 15pt;
    padding: 18pt 0;
    &.noMargin {
      margin-left: 0pt;
    }
  }
  @media (min-width: 900pt) {
    ${({ width }) =>
      width &&
      css`
        width: 580.5pt;
      `}
  }
`;
const List = styled.ul`
  margin: 30pt 0 30pt;
  gap: 12pt;
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
  @media (min-width: 900pt) {
    padding-top: 30pt;
  }

  :nth-of-type(1) {
    margin-top: 18pt;
    border-top: 0.75pt solid ${colors.lightGray};
    @media (min-width: 900pt) {
      margin-top: 30pt;
    }
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
    font-family: 'Spoqa Han Sans Neo';
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
    font-family: 'Spoqa Han Sans Neo';
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

  .value2 {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: right;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    flex: 2;
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 18pt;
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
  width: 75pt;
  height: 75pt;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 900pt) {
    width: 48pt;
    height: 48pt;
    margin-left: 15pt;
    margin-bottom: 15pt;
  }
`;
const Subtitle = styled.h2`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding-bottom: 15pt;
  @media (min-width: 900pt) {
    font-size: 15pt;
    line-height: 15pt;
    padding-bottom: 24pt;
  }
  @media (max-width: 899.25pt) {
    &.ml-15 {
      margin-left: 15pt;
    }
  }
`;
const Subtitle2 = styled.h2`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
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
`;
const Label = styled.h3`
  font-family: 'Spoqa Han Sans Neo';
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
const FeaturesList = styled.div`
  white-space: pre-wrap;
  padding-top: 6pt;
  list-style-type: decimal;
  list-style-position: inside;
  flex: 2;
  list-style: none;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  /* width: max-content;
  max-width: 280pt; */
  word-break: break-all;
  padding-right: 15pt;
  :not(:nth-of-type(1)) {
    padding-top: 2pt;
  }
  @media (min-width: 900pt) {
    width: max-content;
    max-width: 380pt;
    word-break: break-all;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 500;
    line-height: 21pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
  @media (max-width: 899.25pt) {
    flex: none;
  }
`;
const FeaturesList3 = styled.div`
  padding-top: 6pt;
  list-style-type: decimal;
  list-style-position: inside;
  flex: 2;
  list-style: none;
  /* .productText { */
  list-style: none;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  word-break: break-all;
  padding-right: 15pt;
  @media (min-width: 900pt) {
    word-break: break-all;
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
  /* } */
  @media (max-width: 899.25pt) {
    flex: none;
  }
`;
const GridImg = styled.div`
  display: flex;
  overflow-x: scroll;
  grid-template-columns: repeat(4, 1fr);
  gap: 6pt;
  cursor: pointer;
  @media (min-width: 900pt) {
    flex-wrap: wrap;
    width: 580.5pt;
    display: flex;
    padding-top: 24pt;
    padding-bottom: 30pt;
    gap: 22.5pt;
  }
  @media (max-width: 899.25pt) {
    padding-left: 15pt;
  }
`;
const GridItem = styled.div`
  position: relative;
  border-radius: 6pt;
  width: 120pt;
  height: 144pt;
  flex-shrink: 0;

  & > span {
    border-radius: 6pt;
  }
  @media (min-width: 900pt) {
    width: 178.5pt;
    height: 144pt;
    /* margin-right: 22.5pt; */
  }
`;

const FileDownloadBtn = styled(Button)`
  margin: 0 15pt 6pt 0;
  padding: 7.5pt 6pt;
  border: 0.75pt solid ${colors.lightGray3};
  border-radius: 8px;
  @media (max-width: 899.25pt) {
    /* padding-bottom: 24pt; */
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
  border-bottom: 0.75pt solid ${colors.lightGray};
  @media (max-width: 899.25pt) {
    width: calc(100% - 30pt);
    margin: 0 auto;
  }
`;
const Line2 = styled.div`
  border-bottom: 0.75pt solid #e9eaee;
  padding-top: 30pt;
  @media (max-width: 899.25pt) {
    padding-top: 18pt;
  }
  /* margin-top: 18pt; */
`;
const Label2 = styled.div`
  font-family: 'Spoqa Han Sans Neo';
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
    margin-bottom: 15pt;
  }
  @media (min-width: 900pt) {
    padding-left: 0;
    padding-top: 3pt;
  }
`;
const FeaturesList2 = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  list-style-type: decimal;
  list-style-position: inside;
  flex: 2;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};

  @media (max-width: 899.25pt) {
    /* width: max-content;
    max-width: 250pt;
    /* word-break: break-all; */
    word-break: break-all;
    flex: none;
    padding-right: 15pt;
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

const FileWrapper = styled.div`
  width: 200pt;
  display: flex;
  flex-direction: column;
`;
export default FinalQuotation;
