import styled from '@emotion/styled';
import Image from 'next/image';
import React, { useLayoutEffect, useState } from 'react';
import colors from 'styles/colors';
import ExitBtn from 'public/adminImages/Group.png';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';
import {
  adminDateFomat,
  convertKo,
  hyphenFn,
  PriceBasicCalculation,
} from 'utils/calculatePackage';
import {
  M5_LIST,
  M5_LIST_EN,
  M6_LIST,
  M6_LIST_EN,
  M7_LIST,
  M7_LIST_EN,
  M8_LIST,
  M8_LIST_EN,
} from 'assets/selectList';

type Props = {
  preQuotationIdx: number;
};

interface QuotationRequestCharger {
  preQuotationChargerIdx: number;
  chargePriceType: string;
  chargePrice: number;
  manufacturer: string;
  preQuotationFiles: {
    chargerProductFileIdx: number;
    productFileType: string;
    originalName: string;
    url: string;
  }[];
}
interface QuotationRequestChargers {
  quotationRequestChargerIdx: number;
  kind: string;
  standType: string;
  channel: string;
  count: number;
}
interface PreQuotationRespnse {
  isSuccess: boolean;
  data: {
    preQuotation: {
      preQuotationIdx: number;
      createdAt: string;
      subscribePricePerMonth: number;
      chargingStationInstallationPrice: number;
      constructionPeriod: number;
      member: {
        memberIdx: number;
        name: string;
        phone: string;
        companyMemberAdditionalInfo: {
          companyMemberAdditionalInfoIdx: number;
          companyName: string;
          companyAddress: string;
          companyDetailAddress: string;
          companyZipCode: string;
          managerEmail: string;
        };
      };
      quotationRequest: {
        quotationRequestIdx: number;
        investRate: string;
        quotationRequestChargers: QuotationRequestChargers[];
      };
      preQuotationChargers: QuotationRequestCharger[];
    };
  };
}
const TAG = 'components/Admin/RverseAuction/PreQuotation.tsx';
const PreQuotation = ({ preQuotationIdx }: Props) => {
  const [constructionPeriod, setConstructionPeriod] = useState<number>();
  const { data, isLoading, isError } = useQuery<PreQuotationRespnse>(
    'preQuotaion',
    () => isTokenGetApi(`/admin/quotations/pre-quotations/${preQuotationIdx}`),
  );

  const onChangePeriod = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConstructionPeriod(Number(event.currentTarget.value));
  };

  useLayoutEffect(() => {
    setConstructionPeriod(data?.data?.preQuotation?.constructionPeriod);
  }, []);
  console.log('🔥 가견적서 데이터 확인 -> ' + TAG);
  console.log(data);
  return (
    <>
      {isLoading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <Contatiner>
          <MainList>
            <Item>
              <label className="label">기업명</label>
              <span>
                {
                  data?.data?.preQuotation?.member?.companyMemberAdditionalInfo
                    ?.companyName
                }
              </span>
            </Item>
            <Item>
              <label className="label">기업주소</label>
              <span>
                {
                  data?.data?.preQuotation?.member?.companyMemberAdditionalInfo
                    ?.companyAddress
                }
              </span>
            </Item>
            <Item>
              <label className="label">담당자 이름</label>
              <span>{data?.data?.preQuotation?.member?.name}</span>
            </Item>
            <Item>
              <label className="label">전화번호</label>
              <span>{hyphenFn(data?.data?.preQuotation?.member?.phone!)}</span>
            </Item>
            <Item>
              <label className="label">이메일 주소</label>
              <span>
                {
                  data?.data?.preQuotation?.member?.companyMemberAdditionalInfo
                    ?.managerEmail
                }
              </span>
            </Item>
            <Item>
              <label className="label">신청일자</label>
              <span>
                {adminDateFomat(data?.data?.preQuotation?.createdAt!)}
              </span>
            </Item>
            <Item>
              <label className="label">월 구독료</label>
              <span>{`${PriceBasicCalculation(
                data?.data?.preQuotation?.subscribePricePerMonth!,
              )} 원`}</span>
            </Item>
            <Item>
              <label className="label">수익지분</label>
              <span>
                {`${Math.floor(
                  Number(
                    data?.data?.preQuotation?.quotationRequest?.investRate!,
                  ) * 100,
                )}`}
              </span>
            </Item>
            <Item>
              {data?.data?.preQuotation?.quotationRequest?.quotationRequestChargers?.map(
                (charger, index) => (
                  <React.Fragment key={index}>
                    <label className="label">
                      {index > 0 ? '' : '충전기 종류 및 수량'}
                    </label>
                    <span>{`${convertKo(
                      M5_LIST,
                      M5_LIST_EN,
                      charger?.kind,
                    )} : ${convertKo(
                      M6_LIST,
                      M6_LIST_EN,
                      charger?.standType,
                    )},${convertKo(M7_LIST, M7_LIST_EN, charger?.channel)},${
                      charger?.count
                    }대`}</span>
                  </React.Fragment>
                ),
              )}
            </Item>
            <Item>
              <label className="label">공사기간</label>
              <input
                className="input"
                value={constructionPeriod}
                onChange={onChangePeriod}
              />
            </Item>
            <Item>
              {data?.data?.preQuotation?.quotationRequest?.quotationRequestChargers?.map(
                (charger, index) => (
                  <React.Fragment key={index}>
                    <label className="label">
                      {index > 0 ? '' : '충전요금'}
                    </label>
                    <span>
                      <span className="chargerName">
                        {convertKo(M5_LIST, M5_LIST_EN, charger?.kind)}
                      </span>
                      <span className="chargerPrice">{`${PriceBasicCalculation(
                        data?.data?.preQuotation?.preQuotationChargers[index]
                          .chargePrice,
                      )} 원 / kW`}</span>
                    </span>
                  </React.Fragment>
                ),
              )}
            </Item>
            <Item>
              {data?.data?.preQuotation?.preQuotationChargers?.map(
                (charger, index) => (
                  <React.Fragment key={index}>
                    <label className="label">
                      {index > 0 ? '' : '충전기 제조사'}
                    </label>
                    <span>{charger?.manufacturer}</span>
                  </React.Fragment>
                ),
              )}
            </Item>
          </MainList>
          <Line />
          <ImgList>
            <label className="label">충전기 이미지</label>
            <div className="container">
              {data?.data?.preQuotation?.preQuotationChargers?.map(
                (charger, index) => (
                  <React.Fragment key={index}>
                    {charger?.preQuotationFiles?.map(
                      (innerCharger, innerIndex) =>
                        innerCharger.productFileType === 'IMAGE' && (
                          <div className="imgBox" key={innerIndex}>
                            <Image
                              src={innerCharger.url!}
                              alt="charge-img"
                              priority={true}
                              unoptimized={true}
                              layout="fill"
                            />
                            <div className="imgExit">
                              <Image src={ExitBtn} alt="exit" layout="fill" />
                            </div>
                          </div>
                        ),
                    )}
                  </React.Fragment>
                ),
              )}
            </div>
          </ImgList>
          <Line />
          <BusinessList>
            <label className="label">첨부파일</label>
            {data?.data?.preQuotation?.preQuotationChargers?.map(
              (charger, index) => (
                <div key={index} className="fileContainer">
                  {charger?.preQuotationFiles?.map(
                    (innerCharger, innerIndex) =>
                      innerCharger.productFileType === 'CATALOG' && (
                        <div className="fileBox" key={innerIndex}>
                          <p className="businessName">
                            Charge Porint 카탈로그_7KW.pdf
                          </p>
                          <button className="businessBtn">삭제</button>
                        </div>
                      ),
                  )}
                </div>
              ),
            )}
          </BusinessList>
        </Contatiner>
      )}
    </>
  );
};

export default PreQuotation;

const LoaderContainer = styled.div`
  width: 946px;
  height: 836px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Contatiner = styled.div`
  /* border: 2px solid ${colors.lightGray5}; */
  border-radius: 4px;
  width: 946px;
`;
const MainList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 24px;
  padding-left: 16px;
`;
const Item = styled.li`
  display: flex;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: ${colors.dark2};
  .label {
    width: 129px;
    margin-right: 45px;
  }
  .text {
  }
  .input {
    border: 1px solid #e2e5ed;
    border-radius: 2px;
    padding-top: 2px;
    padding-left: 8px;
  }
  .chargerName {
    margin-right: 46px;
  }
  .chargerPrice {
  }
`;

const Line = styled.div`
  margin: 0 15px;
  height: 2px;
  /* background: ${colors.lightGray6}; */
`;
const ImgList = styled.div`
  padding-top: 14px;
  padding-left: 16px;
  padding-bottom: 14px;
  .label {
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: ${colors.dark2};
  }
  .imgBox {
    position: relative;
    width: 173px;
    height: 130px;
    background-color: gray;
    margin-top: 10px;
    border-radius: 4px;
    :not(:nth-last-of-type()) {
      margin-right: 10px;
    }
  }
  .imgExit {
    position: absolute;
    top: 4px;
    right: 4px;
    border: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    z-index: 10;
    border-radius: 50%;
    background-color: ${colors.lightGray2};
  }
  .container {
    display: flex;
    gap: 10px;
  }
`;

const BusinessList = styled.div`
  padding-top: 14px;
  padding-left: 16px;
  padding-bottom: 24px;
  .label {
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: ${colors.dark2};
  }
  .fileBox {
    display: flex;
    align-items: center;
  }
  .businessName {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    /* identical to box height, or 24px */
    color: #747780;
    border: 1px solid #a6a9b0;
    border-radius: 2px;
    padding: 4px 14px 4px 10px;
    gap: 8px;
    margin-right: 10px;
  }
  .businessBtn {
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    /* identical to box height, or 21px */
    background: none;
    text-decoration-line: underline;

    color: #747780;
  }
  .fileContainer {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;
