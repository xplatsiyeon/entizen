import Image from 'next/image';
import colors from 'styles/colors';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import fileImg from 'public/mypage/file-icon.svg';
import { css } from '@emotion/react';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { convertKo, PriceBasicCalculation } from 'utils/calculatePackage';
import { M5_LIST, M5_LIST_EN } from 'assets/selectList';
import ManagerInfo from './ManagerInfo';
import TwoButton from './TwoButton';
import { fileDownload } from 'bridge/appToWeb';
import { useMediaQuery } from 'react-responsive';
import ImgDetailCarousel from 'components/ImgDetailCarousel';
import arrow_icon from 'public/images/gray_arraow_icon.svg';
import { useRouter } from 'next/router';
import {
  preQuotationFiles,
  PreQuotationsV1,
  QuotationRequestV1,
} from 'types/quotation';

interface Props {
  pb?: number;
  data?: PreQuotationsV1;
  isSpot?: boolean;
  quotationNewData?: QuotationRequestV1;
  onClcikModal?: () => void;
}

const BiddingQuote = ({
  pb,
  data,
  isSpot,
  onClcikModal,
  quotationNewData,
}: Props) => {
  const router = useRouter();
  const mobile = useMediaQuery({
    query: '(max-width:810pt)',
  });
  const desktop = useMediaQuery({
    query: '(min-width:900pt)',
  });

  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
  const [webIdx, setWebIdx] = useState<number>(0);
  const [newChargerImageFiles, setNewChargerImageFiles] = useState<string[]>();

  // 이미지 상세보기 모달창
  const [openImgModal, setOpenImgModal] = useState(false);

  // 충전기 이미지 클릭시 뭐 눌렀는지 확인
  const idxRef = useRef(-1);

  const initialSlideOnChange = (idx: number) => {
    idxRef.current = idx;
  };

  const webHandleNum = (idx: number) => {
    setWebIdx(idx);
  };

  // 부분 구독 판별
  const partSubscribe = data?.quotationRequest?.subscribeProduct;
  const homeSelect = data?.quotationRequest?.quotationRequestChargers?.filter(
    (el) => el.kind === '7-HOME',
  );

  // 이건 캐러셀에 내려줄 이미지 파일 합친 데이터
  const newChargerImageFiles2 = data?.preQuotationChargers
    ?.map((item) =>
      item.preQuotationFiles.filter((el) => el.productFileType === 'IMAGE'),
    )
    .flat();

  // 충전기 이미지 상태 관리
  useEffect(() => {
    if (data) {
      let temp: preQuotationFiles[] = [];
      data?.preQuotationChargers.forEach((e) => {
        const result = e.preQuotationFiles.filter(
          (e) => e.productFileType === 'IMAGE',
        );
        temp = temp.concat(result);
      });
      const url = temp.map((e) => e.url);
      setNewChargerImageFiles(url);
    }
  }, [data]);

  console.log('🔥 quotationNewData : ', quotationNewData);
  // 앱 -> 웹
  useLayoutEffect(() => {
    // 안드로이드 호출
    const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
    if (userAgent === 'Android_App') {
      if (openImgModal === true) {
        alert('뒤로가기 클릭');
        window.onClickBackButton = () => setOpenImgModal(false);
      }
    }
  }, [openImgModal]);

  return (
    <Wrap>
      {/* ================= 웹 왼쪽 영역 ================= */}
      {desktop && isSpot === undefined && (
        <LeftSection>
          <ProductList>
            <h1>
              총{' '}
              <span className="emphasis">
                {quotationNewData?.quotationStatusHistories?.length}
              </span>
              개의 구독상품이
              <br />
              도착했습니다.
            </h1>
            <p>
              상세 내용을 비교해보고,
              <br />
              나에게 맞는 상품을 선택해보세요!
            </p>
            <ul>
              {quotationNewData?.quotationStatusHistories?.map(
                (data, index) => (
                  <li
                    key={index}
                    className={
                      data?.preQuotationIdx ===
                      Number(router?.query?.preQuotationIdx)
                        ? 'target'
                        : ''
                    }
                    // 온클릭
                    onClick={async () => {
                      await router.push(
                        `/mypage/request/detail?preQuotationIdx=${data?.preQuotationIdx}`,
                      );
                    }}
                  >
                    <div className="leftBox">
                      {data?.preQuotation?.member?.companyMemberAdditionalInfo
                        ?.companyLogoImageUrl ? (
                        <div className="imgBox">
                          <Image
                            src={
                              data?.preQuotation?.member
                                ?.companyMemberAdditionalInfo
                                ?.companyLogoImageUrl
                            }
                            alt="logo"
                            layout="fill"
                            priority={true}
                            unoptimized={true}
                            objectFit="cover"
                          />
                        </div>
                      ) : (
                        <NoImage2 />
                      )}
                      <span>
                        <div className="companyName">
                          {
                            data?.preQuotation?.member
                              ?.companyMemberAdditionalInfo?.companyName
                          }
                        </div>
                        <div className="price">
                          {' '}
                          {PriceBasicCalculation(
                            data?.preQuotation?.subscribePricePerMonth,
                          )
                            ? `${PriceBasicCalculation(
                                data?.preQuotation?.subscribePricePerMonth,
                              )}원`
                            : '무료'}
                        </div>
                      </span>
                    </div>

                    <Image src={arrow_icon} alt="arrow_icon" />
                  </li>
                ),
              )}
            </ul>
          </ProductList>
          <TwoButton
            onClcikModal={onClcikModal!}
            id={data?.member?.companyMemberAdditionalInfo?.memberIdx}
          />
        </LeftSection>
      )}
      {/* ================= 웹 오른쪽 영역 ==================== */}
      <RightSection>
        {isSpot === undefined && (
          <TopWebRapper>
            {/* ============== 웹 사진이 들어갈 공간 =================*/}
            <WebFinishedPhotoWrapper>
              <WebLeftPhotoBox>
                <Image
                  src={
                    newChargerImageFiles ? newChargerImageFiles[webIdx] : '#'
                  }
                  alt="img-icon"
                  layout="fill"
                  priority={true}
                  unoptimized={true}
                  // objectFit="cover"
                  objectFit="contain"
                />
              </WebLeftPhotoBox>
              <WebRightPhotoWrapper>
                {newChargerImageFiles?.map((item, idx) => (
                  <WebLeftPhotos
                    key={idx}
                    onClick={() => {
                      webHandleNum(idx);
                    }}
                    chargeIdx={idx}
                    index={webIdx}
                  >
                    <div className="imgBox">
                      <Image
                        src={item}
                        alt="img-icon"
                        layout="fill"
                        priority={true}
                        unoptimized={true}
                        objectFit="cover"
                      />
                    </div>
                  </WebLeftPhotos>
                ))}
              </WebRightPhotoWrapper>
            </WebFinishedPhotoWrapper>

            {/* 충전소 회사 정보 */}
            <ChareCompanyInfo>
              {data?.member?.companyMemberAdditionalInfo
                ?.companyLogoImageUrl !== null ? (
                <ImageBox>
                  <Image
                    src={
                      data?.member?.companyMemberAdditionalInfo
                        ?.companyLogoImageUrl!
                        ? data?.member?.companyMemberAdditionalInfo
                            ?.companyLogoImageUrl!
                        : '#'
                    }
                    alt="icon"
                    priority={true}
                    unoptimized={true}
                    layout="fill"
                    objectFit="cover"
                    style={{ borderRadius: '6pt' }}
                  />
                </ImageBox>
              ) : (
                <NoImage />
              )}

              <Title>
                {data?.member?.companyMemberAdditionalInfo?.companyName}
              </Title>
              <WebList>
                {/* 🍎 부분구독일경우 충전소 설치비 불러와야함 */}
                {partSubscribe === 'PART' && (
                  <WebItem>
                    <span className="name">충전소 설치비</span>
                    <span className="value">{`${PriceBasicCalculation(
                      data?.chargingStationInstallationPrice!,
                    )} 원`}</span>
                  </WebItem>
                )}
                <WebItem>
                  <span className="name">월 구독료</span>
                  <span className="value">
                    {`${PriceBasicCalculation(
                      data?.subscribePricePerMonth!,
                    )} 원`}
                  </span>
                </WebItem>
                <WebItem>
                  <span className="name">수익지분</span>
                  {data?.quotationRequest?.quotationRequestChargers?.length! ===
                  homeSelect?.length! ? (
                    <span className="value">-</span>
                  ) : (
                    <span className="value">{`${Math.floor(
                      Number(data?.quotationRequest?.investRate) * 100,
                    )} %`}</span>
                  )}
                </WebItem>
                <WebItem>
                  <span className="name">공사기간</span>
                  <span className="value">
                    {data?.constructionPeriod
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    일
                  </span>
                </WebItem>
                {/* 🍎 충전기 제조사 1개 일 때 */}
                {data?.preQuotationChargers?.length! === 1 && (
                  <>
                    <WebItem>
                      <span className="name">충전요금</span>
                      {data?.preQuotationChargers[0]?.chargePriceType ===
                      'PURCHASER_AUTONOMY' ? (
                        <span className="value">구매자 자율</span>
                      ) : (
                        <span className="value">
                          {data?.preQuotationChargers[0].chargePrice}원 / kW
                        </span>
                      )}
                    </WebItem>
                    <WebItem>
                      <span className="name">충전기 제조사</span>
                      <span className="value">
                        {data?.preQuotationChargers[0].manufacturer}
                      </span>
                    </WebItem>
                  </>
                )}
              </WebList>
            </ChareCompanyInfo>
          </TopWebRapper>
        )}

        <>
          {mobile && (
            <>
              {data?.member?.companyMemberAdditionalInfo
                ?.companyLogoImageUrl !== null ? (
                <ImageBox>
                  <Image
                    src={
                      data?.member?.companyMemberAdditionalInfo
                        ?.companyLogoImageUrl!
                    }
                    alt="icon"
                    priority={true}
                    unoptimized={true}
                    layout="fill"
                    objectFit="cover"
                  />
                </ImageBox>
              ) : (
                <NoImage />
              )}
              <Title>
                {data?.member?.companyMemberAdditionalInfo?.companyName}
              </Title>
              <List>
                {/* 🍎 부분구독일 경우 충전소 설치비 데이터 불러와야함 */}
                {partSubscribe === 'PART' && (
                  <Item>
                    <span className="name">충전소 설치비</span>
                    <span className="value">{`${PriceBasicCalculation(
                      data?.chargingStationInstallationPrice!,
                    )} 원`}</span>
                  </Item>
                )}
                <Item>
                  <span className="name">월 구독료</span>
                  <span className="value">
                    {`${PriceBasicCalculation(
                      data?.subscribePricePerMonth!,
                    )} 원`}
                  </span>
                </Item>
                <Item>
                  <span className="name">수익지분</span>
                  {data?.quotationRequest?.quotationRequestChargers?.length! ===
                  homeSelect?.length! ? (
                    <span className="text">-</span>
                  ) : (
                    <span className="text">{`${Math.floor(
                      Number(data?.quotationRequest?.investRate) * 100,
                    )} %`}</span>
                  )}
                </Item>
                <Item>
                  <span className="name">공사기간</span>
                  <span className="value">
                    {data?.constructionPeriod
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    일
                  </span>
                </Item>
                {/* 🍎 충전기 제조사 1개 일 때 */}
                {/* 🍎 구매자 자율이면 '구매자 자율'문자 반영 */}
                {data?.preQuotationChargers.length === 1 ? (
                  <>
                    <Item>
                      <span className="name">충전요금</span>
                      {data?.preQuotationChargers[0].chargePriceType !==
                      'PURCHASER_AUTONOMY' ? (
                        <span className="value">
                          {data?.preQuotationChargers[0].chargePrice} 원 / kW
                        </span>
                      ) : (
                        <span className="value">구매자 자율</span>
                      )}
                    </Item>
                    <Item>
                      <span className="name">충전기 제조사</span>
                      <span className="value">
                        {data?.preQuotationChargers[0].manufacturer}
                      </span>
                    </Item>
                  </>
                ) : (
                  <>
                    {/* 🍎 충전기 제조사 2개 이상 일 때 */}
                    <MultiSection>
                      <Subtitle>충전요금</Subtitle>
                      {/* 🍎 2개 이상일때도 요금 구매자 자율이면 '구매자 자율'문자 반영 */}
                      {/* 🍎 여기도 역순으로 나오면 reverse() 해야함 */}
                      {data?.preQuotationChargers?.map((item, index) => (
                        <MultiBox key={index}>
                          {item.chargePriceType !== 'PURCHASER_AUTONOMY' ? (
                            <Item>
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
                            </Item>
                          ) : (
                            <Item>
                              <span className="name">
                                {convertKo(
                                  M5_LIST,
                                  M5_LIST_EN,
                                  data?.quotationRequest
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
                      {/* 🍎 2개 이상일때도 요금 구매자 자율이면 '구매자 자율'문자 반영 */}
                      {/* 🍎 여기도 역순으로 나오면 reverse() 해야함 */}
                      {data?.preQuotationChargers?.map((item, index) => (
                        <MultiBox key={index}>
                          <Item>
                            <span className="name">
                              {convertKo(
                                M5_LIST,
                                M5_LIST_EN,
                                data?.quotationRequest
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
            </>
          )}
        </>
        {data?.preQuotationChargers !== undefined &&
          data?.preQuotationChargers.length > 1 && (
            <Line style={{ marginTop: '60pt' }} />
          )}
        <UnderInfo>
          {!mobile && (
            <>
              {/* 🍎 충전기 제조사 1개 일 때 */}
              {data?.preQuotationChargers !== undefined &&
                data?.preQuotationChargers.length > 1 && (
                  <>
                    {/* 🍎 충전기 제조사 2개 이상 일 때 */}
                    <Section pb={580.5}>
                      <Subtitle>충전요금</Subtitle>
                      {/* 🍎 2개 이상일때도 요금 구매자 자율이면 '구매자 자율'문자 반영 */}
                      {/* 🍎 index 뒤집어져서 나오는 이슈가 있어서 여기는 map전에 reverse()해줌 이상있으면 바로 수정 / 여기 위치는 웹에서 오른쪽 상단박스 */}
                      {data?.preQuotationChargers?.map((item, index) => (
                        <MultiBox key={index}>
                          {item.chargePriceType !== 'PURCHASER_AUTONOMY' ? (
                            <FlexWrap>
                              <Label>
                                {convertKo(
                                  M5_LIST,
                                  M5_LIST_EN,
                                  data?.quotationRequest
                                    ?.quotationRequestChargers[index]?.kind,
                                )}
                              </Label>
                              <FeaturesList>
                                <li>{`${PriceBasicCalculation(
                                  item.chargePrice,
                                )} 원 / kW`}</li>
                              </FeaturesList>
                            </FlexWrap>
                          ) : (
                            <WebItem>
                              <Label>
                                {convertKo(
                                  M5_LIST,
                                  M5_LIST_EN,
                                  data?.quotationRequest
                                    ?.quotationRequestChargers[index]?.kind,
                                )}
                              </Label>
                              <FeaturesList>
                                <li>구매자 자율</li>
                              </FeaturesList>
                            </WebItem>
                          )}
                        </MultiBox>
                      ))}
                    </Section>
                    <Line style={{ marginTop: '30pt', marginBottom: '16pt' }} />
                    <MultiSection>
                      <Subtitle>충전기 제조사</Subtitle>
                      {/* 🍎 2개 이상일때도 요금 구매자 자율이면 '구매자 자율'문자 반영 */}
                      {/* 🍎 여기도 역순으로 나오면 reverse() 해야함 */}
                      {data?.preQuotationChargers?.map((item, index) => (
                        <MultiBox key={index}>
                          <FlexWrap>
                            <Label>
                              {convertKo(
                                M5_LIST,
                                M5_LIST_EN,
                                data?.quotationRequest
                                  ?.quotationRequestChargers[index]?.kind,
                              )}
                            </Label>
                            <FeaturesList>
                              <li>{item.manufacturer}</li>
                            </FeaturesList>
                          </FlexWrap>
                        </MultiBox>
                      ))}
                    </MultiSection>
                  </>
                )}
            </>
          )}
          <Line style={{ marginTop: '30pt' }} />
          <Section className="borderOn">
            <Subtitle>특장점</Subtitle>
            <FlexWrap>
              <Label>구독 상품</Label>
              <FeaturesList>
                {/* textarea 줄바꿈 */}
                {data?.subscribeProductFeature?.split('\n').map((line, idx) => (
                  <li key={idx}>
                    {line}
                    <br />
                  </li>
                ))}
              </FeaturesList>
            </FlexWrap>
            {data?.preQuotationChargers?.map((item, index) => (
              <FlexWrap key={index}>
                <Label>
                  {convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    data?.quotationRequest?.quotationRequestChargers[index]
                      ?.kind,
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
          <Line style={{ marginTop: '30pt' }} />
          {/* 이미지 부분 */}
          <Section imgBox={true} length={true}>
            <Subtitle>충전기 이미지</Subtitle>
            <GridImg>
              {data?.preQuotationChargers?.map((item, index) => (
                <React.Fragment key={index}>
                  {item.preQuotationFiles
                    .filter((e) => e.productFileType === 'IMAGE')
                    .map((img, index) => (
                      <GridItem
                        key={index}
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
                          style={{ borderRadius: '6pt' }}
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
              file={newChargerImageFiles2!}
              setOpenImgModal={setOpenImgModal}
              idxRef={idxRef}
            />
          )}
          <Line />
          {/* 파일 부분 */}
          <ChargeSection pb={pb}>
            <Subtitle>충전기 카탈로그</Subtitle>
            <FileContainer>
              {data?.preQuotationChargers?.map((item, index) => (
                <React.Fragment key={index}>
                  {item.preQuotationFiles
                    .filter((e) => e.productFileType === 'CATALOG')
                    .map((file, index) => (
                      <FileDownloadBtn key={index}>
                        <FileDownload
                          download={file.originalName}
                          // href={file.url}
                          onClick={() => {
                            fileDownload(
                              userAgent,
                              file.originalName,
                              file.url,
                            );
                          }}
                        >
                          <Image
                            src={fileImg}
                            alt="file-icon"
                            layout="intrinsic"
                          />
                          <FileName> {file.originalName}</FileName>
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
                  name={data?.member?.name!}
                  email={
                    data?.member?.companyMemberAdditionalInfo?.managerEmail!
                  }
                  phone={data?.member?.phone!}
                />
              )}
            </Section>
          )}
        </UnderInfo>
      </RightSection>
    </Wrap>
  );
};
const Wrap = styled.div`
  display: flex;
  /* border: 1px solid red; */
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 196.5pt;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;

  @media (max-width: 899.25pt) {
    padding-top: 21pt;
    display: block;
    width: 100%;
  }
`;
const ProductList = styled.div`
  width: 255pt;
  height: 424.5pt;
  border: 0.75pt solid ${colors.gray};
  border-radius: 12pt;
  margin-right: 60pt;

  overflow: scroll;
  h1 {
    padding-left: 28.5pt;
    padding-right: 28.5pt;
    padding-top: 42pt;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 700;
    font-size: 18pt;
    line-height: 27pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    position: sticky;
    top: 0;
    width: 100%;
    background-color: ${colors.lightWhite};
    z-index: 10;
  }
  p {
    padding-left: 28.5pt;
    padding-right: 28.5pt;
    padding-top: 9pt;
    padding-bottom: 9pt;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 18pt;
    letter-spacing: -0.02em;
    color: ${colors.lightGray2};
    position: sticky;
    top: 96pt;
    background-color: ${colors.lightWhite};
    z-index: 10;
  }
  ul {
    margin-top: 30pt;
    padding-left: 28.5pt;
    padding-right: 28.5pt;
  }
  li {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 18pt;
    letter-spacing: -0.02em;
    color: ${colors.lightGray2};
    box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
    border-radius: 6pt;
    margin-bottom: 9pt;
    padding-top: 16.5pt;
    padding-bottom: 16.5pt;
    padding-left: 12pt;
    padding-right: 19.125pt;
  }
  .target {
    border: 0.75pt solid ${colors.main1};
  }
  .leftBox {
    display: flex;
    gap: 9pt;
  }
  .imgBox {
    position: relative;
    width: 30pt;
    height: 30pt;
  }
  .companyName {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.lightGray7};
  }
  .price {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    margin-top: 9pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .emphasis {
    color: ${colors.main1};
  }
`;

const TopWebRapper = styled.div`
  width: 580.5pt;
  display: flex;
  align-items: flex-end;
  flex-direction: column;

  @media (max-width: 899.25pt) {
    display: none;
    width: 100%;
  }
`;

const ChareCompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 255pt; */
  width: 100%;
  /* border: 1px solid red; */

  @media (max-width: 899.25pt) {
    display: none;
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
const Section = styled.section<{
  imgBox?: boolean;
  pb?: number;
  length?: boolean;
}>`
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
    margin: 0 15pt;

    &.borderOn {
      border-top: 0.75pt solid #e9eaee;
    }
  }

  @media (min-width: 900pt) {
    overflow-x: scroll;
    padding: 30pt 0;
    ${({ length }) =>
      length &&
      css`
        width: 580.5pt;
      `}
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
  /* padding-top: 21pt; */

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
    font-family: 'Spoqa Han Sans Neo';
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
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
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 500;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
    flex: 1;
  }
  .value {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 500;
    font-size: 12pt;
    line-height: 12pt;
    text-align: left;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    flex: 2;
  }

  @media (min-width: 900pt) {
    .name {
      flex: 1;
    }
    .value {
      flex: 2;
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
  /* margin-top: 60pt; */
  @media (min-width: 900pt) {
    margin-top: 60pt;
    margin-left: 0;
    width: 75pt;
    height: 75pt;
  }
  & > span {
    border-radius: 6pt;
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
  font-family: 'Spoqa Han Sans Neo';
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
    margin-top: 51pt;
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
  font-family: 'Spoqa Han Sans Neo';
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
      word-break: break-all;
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
    word-break: break-all;
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
  }
`;
const FileContainer = styled.div`
  padding-top: 15pt;
  @media (min-width: 900pt) {
    width: 200pt;
    /* width: 580.5pt; */
    display: flex;
    flex-direction: column;
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
    justify-content: flex-start;
    /* border: 1px solid red; */
    /* justify-content: space-between; */
    /* margin-bottom: 51pt; */
  }
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const WebRightPhotoWrapper = styled.div`
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
    /* border-radius: 6pt; */
    border: ${({ index, chargeIdx }) =>
      index === chargeIdx ? `0.75pt solid #5221cb` : 'none'};
    border-radius: 6pt;
    cursor: pointer;
    & > span {
      border-radius: 6pt;
    }
    .imgBox {
      /* border: 2px solid blue; */
      position: relative;
      & > span {
        border-radius: 6pt;
      }

      width: 100%;
      height: 100%;
    }
  }
`;

const WebLeftPhotoBox = styled.div`
  @media (min-width: 900pt) {
    width: 508.5pt;
    height: 396pt;
    border-radius: 12pt;
    position: relative;
    margin-right: 12pt;
    & > span {
      border-radius: 12pt;
    }
  }
`;

const NoImage = styled.div`
  height: 75pt;
  width: 75pt;
  border-radius: 6pt;
  background: #caccd1;
  margin-top: 60pt;
  @media (max-width: 899.25pt) {
    margin-top: 0;
    height: 48pt;
    width: 48pt;
    border-radius: 6pt;
    margin-left: 15pt;
    margin-bottom: 15pt;
  }
`;

const NoImage2 = styled.div`
  height: 30pt;
  width: 30pt;
  border-radius: 6pt;
  background: #caccd1;
  /* margin-top: 60pt; */
  @media (max-width: 899.25pt) {
    height: 25pt;
    width: 25pt;
    border-radius: 6pt;
    margin-left: 15pt;
    margin-bottom: 15pt;
  }
`;

const FileName = styled.div`
  display: block;
  width: 150pt;
  font-weight: 500;
  padding-top: 2pt;
  white-space: nowrap;
  font-size: 10.5pt;
  line-height: 9pt;
  letter-spacing: -0.02em;
  color: #747780;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const UnderInfo = styled.div`
  /* border: 1px solid red; */
`;

export default BiddingQuote;
