import styled from '@emotion/styled';
import Image from 'next/image';
import CaretDown24 from 'public/images/CaretDown24.png';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import colors from 'styles/colors';
import CommonBtn from 'components/mypage/as/CommonBtn';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader';
import { filterType } from 'pages/company/quotation';
import Sort from './Sort';
import Search from './Search';
import { HandleColor } from 'utils/changeValue';
import WebSort from './WebSort';

type Props = {};
export interface QuotationRequest {
  changedDate: string;
  createdAt: string;
  etcRequest: string;
  expiredAt: string;
  installationAddress: string;
  installationLocation: string;
  installationPurpose: string;
  investRate: string;
  memberIdx: number;
  quotationRequestIdx: number;
  quotationStatus: string;
  subscribePeriod: number;
  subscribeProduct: string;
}
export interface PreQuotation {
  changedDate: string;
  constructionPeriod: number;
  createdAt: string;
  memberIdx: number;
  preQuotationIdx: number;
  preQuotationStatus: string;
  quotationRequestIdx: number;
  subscribePricePerMonth: number;
  subscribeProductFeature: string;
}
export interface SendQuotationRequests {
  badge: string;
  preQuotation: PreQuotation;
  quotationRequest: QuotationRequest;
}
export interface SentrequestResponse {
  isSuccess: boolean;
  sendQuotationRequests: SendQuotationRequests[];
}
const TAG = 'components/Company/CompanyQuotation/SentRequest.tsx';
const SentRequest = ({}: Props) => {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState<string>('');
  const [checkedFilterIndex, setcheckedFilterIndex] = useState<number>(0);
  const [checkedFilter, setCheckedFilter] =
    useState<filterType>('마감일순 보기');

  const { data, isError, isLoading, error } = useQuery<SentrequestResponse>(
    'sent-request',
    () => isTokenGetApi('/quotations/sent-request'),
  );

  if (isError) {
    console.log(TAG + '🔥 ~line  68 ~ error 콘솔');
    console.log(error);
    return (
      <Modal
        text="다시 시도해주세요"
        click={() => {
          router.push('/');
        }}
      />
    );
  }
  if (isLoading) {
    return <Loader />;
  }

  console.log(TAG + `🌈 보낸 견적 데이터 로그 ~ 라인 89 `);
  console.log(data);

  return (
    <>
      <Sort
        checkedFilter={checkedFilter}
        setCheckedFilter={setCheckedFilter}
        checkedFilterIndex={checkedFilterIndex}
        setcheckedFilterIndex={setcheckedFilterIndex}
      />
      <TopContainer>
        <Search searchWord={searchWord} setSearchWord={setSearchWord} />
        <WebSort
          checkedFilter={checkedFilter}
          setCheckedFilter={setCheckedFilter}
          checkedFilterIndex={checkedFilterIndex}
          setcheckedFilterIndex={setcheckedFilterIndex}
        />
      </TopContainer>

      <ContentsContainer>
        {data?.sendQuotationRequests?.map((el, index) => (
          <Contents
            key={index}
            onClick={() =>
              router.push({
                pathname: '/company/sentProvisionalQuotation',
                query: {
                  preQuotationIdx: el?.preQuotation?.preQuotationIdx,
                },
              })
            }
          >
            <DdayNAddress>
              <DdayBox>
                <CommonBtn
                  text={el?.badge}
                  backgroundColor={HandleColor(el?.badge)}
                  bottom={'12pt'}
                />
              </DdayBox>
              <AddressBox>
                테스트
                {/* {el?.quotationRequest.installationAddress} */}
              </AddressBox>
            </DdayNAddress>
            <IconBox>
              <ArrowIconBox>
                <Image src={CaretDown24} alt="RightArrow" />
              </ArrowIconBox>
            </IconBox>
          </Contents>
        ))}
      </ContentsContainer>
    </>
  );
};

const ContentsContainer = styled.div`
  margin-top: 18pt;
  @media (min-width: 899pt) {
    width: 580.5pt;
    margin: 0 auto;
  }
`;
const Contents = styled.div`
  padding: 12pt 13.5pt;
  display: flex;
  margin-bottom: 9pt;
  justify-content: space-between;
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;
  border-radius: 6pt;
  cursor: pointer;
`;
const DdayBox = styled.div`
  margin-bottom: 16.5pt;
  cursor: pointer;
`;
const DdayNAddress = styled.div`
  position: relative;
`;
const AddressBox = styled.div`
  font-family: Spoqa Han Sans Neo;
  position: relative;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  margin-top: 12pt;
  color: ${colors.main2};
`;
const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ArrowIconBox = styled.div`
  width: 18pt;
  height: 18pt;
`;
const TopContainer = styled.div`
  @media (min-width: 899pt) {
    width: 580.5pt;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    margin-top: 60pt;
    margin-bottom: 30pt;
  }
`;

export default SentRequest;
