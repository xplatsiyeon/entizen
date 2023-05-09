import styled from '@emotion/styled';
import { Button } from '@mui/material';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import colors from 'styles/colors';
import fileImg from 'public/mypage/file-icon.svg';
import { css } from '@emotion/react';
import {
  PreQuotationCharger,
  SentRequestResponse,
} from './SentProvisionalQuoatation';
import { convertKo, PriceBasicCalculation } from 'utils/calculatePackage';
import { M5_LIST, M5_LIST_EN } from 'assets/selectList';
import { fileDownload } from 'bridge/appToWeb';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import ImgDetailCarousel, { ImgType } from 'components/ImgDetailCarousel';

type Props = {
  pb?: number;
  data: SentRequestResponse;
};

const BottomBox = ({ pb, data }: Props) => {
  // const { userAgent } = useSelector((state: RootState) => state.userAgent);
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
  // 부분 구독 판별
  const partSubscribe =
    data?.sendQuotationRequest?.quotationRequest?.subscribeProduct;

  // 데이터 역순으로 나오는거 reverse
  const preQuotationChargers =
    data?.sendQuotationRequest?.preQuotation?.preQuotationCharger!;
  const reverseNewArr: PreQuotationCharger[] = [];
  preQuotationChargers?.forEach((el, idx) => reverseNewArr.unshift(el));

  const homeSelect =
    data?.sendQuotationRequest?.quotationRequest?.quotationRequestChargers?.filter(
      (el) => el.kind === '7-HOME',
    );

  // 이미지 상세보기 모달창
  const [openImgModal, setOpenImgModal] = useState(false);

  // 충전기 이미지 클릭시 뭐 눌렀는지 확인
  const idxRef = useRef(-1);

  const initialSlideOnChange = (idx: number) => {
    idxRef.current = idx;
  };

  // 이미지 확대 보기에 전달 할 배열
  let fileArr: ImgType[] = [];
  data?.sendQuotationRequest?.preQuotation?.preQuotationCharger?.map((item) => {
    item?.chargerImageFiles.map((e) => fileArr?.unshift(e));
  });

  return (
    <Wrapper>
      {data?.sendQuotationRequest.companyMemberAdditionalInfo
        .companyLogoImageUrl !== '' ? (
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
            objectFit="cover"
          />
        </ImageBox>
      ) : (
        <NoImage />
      )}

      <Title>
        {data?.sendQuotationRequest?.companyMemberAdditionalInfo?.companyName}
      </Title>
      <List>
        {/* 부분구독일 경우 충전소 설치비 데이터 불러와야함 */}
        {partSubscribe === 'PART' && (
          <Item>
            <span className="name">충전소 설치비</span>
            <span className="value">{`${PriceBasicCalculation(
              data?.sendQuotationRequest?.preQuotation
                ?.chargingStationInstallationPrice!,
            )} 원`}</span>
          </Item>
        )}
        <Item>
          <span className="name">월 구독료</span>
          <span className="value">
            {`${PriceBasicCalculation(
              data?.sendQuotationRequest?.preQuotation?.subscribePricePerMonth,
            )} 원`}
          </span>
        </Item>
        <Item>
          {/* --- 수익지분 보류 --- */}
          <span className="name">수익지분</span>
          {data?.sendQuotationRequest?.quotationRequest
            ?.quotationRequestChargers?.length! === homeSelect?.length! ? (
            <span className="value">-</span>
          ) : (
            <span className="value">
              {`${Math.floor(
                Number(
                  data?.sendQuotationRequest?.quotationRequest?.investRate,
                ) * 100,
              )} %`}
            </span>
          )}
        </Item>
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
              {data?.sendQuotationRequest?.preQuotation?.preQuotationCharger[0]
                .chargePriceType === 'PURCHASER_AUTONOMY' ? (
                <span className="value">구매자 자율</span>
              ) : (
                <span className="value">
                  {`${data?.sendQuotationRequest?.preQuotation?.preQuotationCharger[0]?.chargePrice} 원 / kW`}
                </span>
              )}
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
            <Line2 />
            <MultiSection>
              <Subtitle>충전요금</Subtitle>
              {reverseNewArr?.map((item, index) => (
                <MultiBox key={item.preQuotationChargerIdx}>
                  {item.chargePriceType !== 'PURCHASER_AUTONOMY' ? (
                    <Item>
                      <span className="name">
                        {convertKo(
                          M5_LIST,
                          M5_LIST_EN,
                          data?.sendQuotationRequest?.quotationRequest
                            ?.quotationRequestChargers[index]?.kind,
                        )}
                      </span>
                      <span className="value">{`${PriceBasicCalculation(
                        item.chargePrice,
                      )} 원 /  kW`}</span>
                    </Item>
                  ) : (
                    <Item>
                      <span className="name">
                        {convertKo(
                          M5_LIST,
                          M5_LIST_EN,
                          data?.sendQuotationRequest?.quotationRequest
                            ?.quotationRequestChargers[index]?.kind,
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
              {reverseNewArr?.map((item, index) => (
                <MultiBox key={item.preQuotationChargerIdx}>
                  <Item>
                    <span className="name">
                      {convertKo(
                        M5_LIST,
                        M5_LIST_EN,
                        data?.sendQuotationRequest?.quotationRequest
                          ?.quotationRequestChargers[index]?.kind,
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
      <Line />
      <Section>
        <Subtitle>특장점</Subtitle>
        <FlexWrap>
          {/* 구독 상품 부분 */}
          <Label>구독 상품</Label>
          <FeaturesList>
            {data?.sendQuotationRequest?.preQuotation?.subscribeProductFeature
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
        {reverseNewArr?.map((item, index) => (
          <FlexWrap key={item.preQuotationChargerIdx}>
            <Label>
              {convertKo(
                M5_LIST,
                M5_LIST_EN,
                data?.sendQuotationRequest?.quotationRequest
                  ?.quotationRequestChargers[index]?.kind,
              )}
            </Label>
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
          {data?.sendQuotationRequest?.preQuotation?.preQuotationCharger?.map(
            (item, index) => (
              <React.Fragment key={item.preQuotationChargerIdx}>
                {item.chargerImageFiles.map((img, index) => (
                  <GridItem
                    key={img.chargerProductFileIdx}
                    onClick={() => {
                      setOpenImgModal(!openImgModal);
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
                    />
                  </GridItem>
                ))}
              </React.Fragment>
            ),
          )}
        </GridImg>
      </Section>
      <Line />
      {/* 이미지 자세히 보기 기능 */}
      {openImgModal && (
        <ImgDetailCarousel
          file={fileArr!}
          setOpenImgModal={setOpenImgModal}
          idxRef={idxRef}
        />
      )}
      <Section className="underLine" pb={pb}>
        <Subtitle>첨부 파일</Subtitle>
        {data?.sendQuotationRequest?.preQuotation?.preQuotationCharger?.map(
          (item, index) => (
            <React.Fragment key={item.preQuotationChargerIdx}>
              {item.catalogFiles.map((file, index) => (
                <FileDownloadBtn key={file.chargerProductFileIdx}>
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

  @media (max-width: 899.25pt) {
    padding-top: 21pt;
  }
  @media (min-width: 900pt) {
    padding-top: 21pt;
  }
`;

const ImageBox = styled.div`
  width: 48pt;
  height: 48pt;
  position: relative;
  margin-left: 15pt;
  margin-bottom: 15pt;
  & > span {
    border-radius: 6pt;
  }
  @media (min-width: 900pt) {
    margin-left: 0;
    width: 75pt;
    height: 75pt;
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
  /* border-bottom: 0.75pt solid ${colors.lightGray}; */
  padding-bottom: ${({ pb }) => pb + 'pt'};
  ${({ grid }) =>
    grid &&
    css`
      padding-right: 0;
    `};
  @media (min-width: 900pt) {
    padding: 30pt 0pt;
  }
`;
const List = styled.ul`
  padding: 30pt 0 51pt;
  gap: 12pt;
  /* border-bottom: 0.75pt solid ${colors.lightGray}; */
  @media (max-width: 899.25pt) {
    padding-top: 30pt;
    padding-bottom: 18pt;
  }
  @media (min-width: 900pt) {
    padding: 30pt 0 30pt;
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
  font-family: 'Spoqa Han Sans Neo';
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
  font-family: 'Spoqa Han Sans Neo';
  padding-top: 6pt;
  list-style-type: decimal;
  list-style-position: inside;
  list-style: none;
  flex: 2;

  & li {
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 21pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
    font-family: 'Spoqa Han Sans Neo';
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
  padding-left: 15pt;
  gap: 6pt;
  @media (min-width: 900pt) {
    padding-left: 0;
    flex-wrap: wrap;
    width: 580.5pt;
    display: flex;
    padding-top: 24pt;
    padding-bottom: 30pt;
    gap: 22.5pt;
  }
`;
const GridItem = styled.span`
  cursor: pointer;
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

const Line2 = styled.div`
  border-bottom: 0.75pt solid #e9eaee;
  padding-top: 30pt;
`;
const Line = styled.div`
  border-bottom: 0.75pt solid ${colors.lightGray};
  @media (max-width: 899.25pt) {
    width: calc(100% - 30pt);
    margin: 0 auto;
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

export default BottomBox;
