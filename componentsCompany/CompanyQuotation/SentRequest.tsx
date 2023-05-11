import styled from '@emotion/styled';
import Image from 'next/image';
import CaretDown24 from 'public/images/CaretDown24.png';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import CommonBtn from 'components/mypage/as/CommonBtn';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { isTokenGetApi, isTokenPatchApi } from 'api';
import Loader from 'components/Loader';
import { filterType } from 'pages/company/quotation';
import Sort from './Sort';
import Search from './Search';
import { HandleColor } from 'utils/changeValue';
import WebSort from './WebSort';
import NoEstimate from './NoEstimate';
import useDebounce from 'hooks/useDebounce';
import { useMediaQuery } from 'react-responsive';
import PaginationCompo from 'components/PaginationCompo';
import { headerAction } from 'storeCompany/headerSlice';
import { useDispatch } from 'react-redux';

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
  maskingInstallationAddress: string;
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
  data: {
    sendQuotationRequests: SendQuotationRequests[];
    totalCount: number;
  };
}
const TAG = 'components/Company/CompanyQuotation/SentRequest.tsx';
const filterTypeEn = ['deadline', 'status', 'date'];
const SentRequest = ({}: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  // 페이지 네이션
  const desktop = useMediaQuery({
    query: '(min-width:900pt)',
  });
  const limit = desktop ? 20 : 100000000;
  const [sendPage, setSendPage] = useState(1);

  const [searchWord, setSearchWord] = useState<string>('');
  const [checkedFilterIndex, setcheckedFilterIndex] = useState<number>(0);

  const [checkedFilter, setCheckedFilter] =
    useState<filterType>('마감일순 보기');

  const keyword = useDebounce(searchWord, 2000);
  const { data, isError, isLoading, error, refetch } =
    useQuery<SentrequestResponse>(
      'sent-request',
      () =>
        isTokenGetApi(
          `/quotations/sent-request?keyword=${keyword}&sort=${filterTypeEn[checkedFilterIndex]}&limit=${limit}&page=${sendPage}`,
        ),
      {
        enabled: false,
        // suspense: true,
      },
    );

  useEffect(() => {
    refetch();
  }, [checkedFilterIndex, keyword, sendPage]);

  // 보낸 견적 알림 읽음 처리
  const queryClient = useQueryClient();
  const { mutate: updateAlertMutate } = useMutation(isTokenPatchApi, {
    onSuccess: () => {
      queryClient.invalidateQueries('v1/alerts');
    },
    onError: () => {},
  });
  useEffect(() => {
    updateAlertMutate({
      url: '/v1/alerts/unread-points',
      data: {
        wasReadCompanySentQuotation: true,
      },
    });
  }, []);

  useEffect(() => {
    dispatch(headerAction.setTab(0));
    dispatch(headerAction.setTabIdx(1));
    dispatch(headerAction.setType('estimate'));
  }, []);

  if (isError) {
    // console.log(TAG + '🔥 ~line  68 ~ error 콘솔');
    // console.log(error);
  }
  if (isLoading) {
    return <Loader />;
  }

  // console.log(TAG + `🌈 보낸 견적 데이터 로그 ~ 라인 89 `);
  // console.log(data);

  // console.log('badge', data?.sendQuotationRequests);

  //maskingInstallationAddress
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
      {data !== undefined ? (
        <ContentsContainer>
          {data?.data.sendQuotationRequests?.map((el, index) => (
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
                {el?.badge === '선택대기' ? (
                  <AddressBox>
                    {el?.quotationRequest.maskingInstallationAddress}
                  </AddressBox>
                ) : (
                  <AddressBox>
                    {el?.quotationRequest.installationAddress}
                  </AddressBox>
                )}
              </DdayNAddress>
              <IconBox>
                <ArrowIconBox>
                  <Image src={CaretDown24} alt="RightArrow" />
                </ArrowIconBox>
              </IconBox>
            </Contents>
          ))}
          {desktop && (
            <PaginationWrap>
              <PaginationCompo
                setPage={setSendPage}
                page={sendPage}
                list={data.data.sendQuotationRequests!}
                limit={limit}
                total={data.data.totalCount!}
              />
            </PaginationWrap>
          )}
        </ContentsContainer>
      ) : (
        <NoEstimate type={'보낸 견적이 없습니다.'} />
      )}
    </>
  );
};

const ContentsContainer = styled.div`
  margin-top: 18pt;
  padding-bottom: 75pt;
  @media (min-width: 900pt) {
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
  @media (min-width: 900pt) {
    padding: 24pt 13.5pt;
  }
`;
const DdayBox = styled.div`
  margin-bottom: 16.5pt;
  cursor: pointer;
`;

const DdayNAddress = styled.div`
  position: relative;
`;

const AddressBox = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  position: relative;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  margin-top: 12pt;
  color: ${colors.main2};
`;

const TopContainer = styled.div`
  @media (min-width: 900pt) {
    width: 580.5pt;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    margin-bottom: 30pt;
  }
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

const PaginationWrap = styled.div`
  padding-top: 30pt;
`;

export default SentRequest;
