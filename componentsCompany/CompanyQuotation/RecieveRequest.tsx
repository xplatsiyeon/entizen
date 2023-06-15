import styled from '@emotion/styled';
import CommonBtn from 'components/mypage/as/CommonBtn';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CaretDown24 from 'public/images/CaretDown24.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import colors from 'styles/colors';
import { HandleColor } from 'utils/changeValue';
import {
  filterType,
  filterTypeEn,
  ReceivedRequest,
} from 'pages/company/quotation';
import Sort from './Sort';
import Search from './Search';
import WebSort from './WebSort';
import NoEstimate from './NoEstimate';
import { useMediaQuery } from 'react-responsive';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { isTokenGetApi, isTokenPatchApi } from 'api';
import Modal from 'components/Modal/Modal';
import PaginationCompo from 'components/PaginationCompo';
import { useDispatch } from 'react-redux';
import { headerAction } from 'storeCompany/headerSlice';

type Props = {
  searchWord: string;
  setSearchWord: Dispatch<SetStateAction<string>>;
  checkedFilterIndex: number;
  setcheckedFilterIndex: Dispatch<SetStateAction<number>>;
  checkedFilter: filterType;
  setCheckedFilter: Dispatch<SetStateAction<filterType>>;
  keyword: string;
};

const RecieveRequest = ({
  searchWord,
  setSearchWord,
  checkedFilterIndex,
  setcheckedFilterIndex,
  checkedFilter,
  setCheckedFilter,
  keyword,
}: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // 페이지 네이션
  const desktop = useMediaQuery({
    query: '(min-width:900pt)',
  });
  const limit = desktop ? 20 : 100000000;
  const [receivedPage, setReceivedPage] = useState(1);

  // api 호출
  const { data, isLoading, isError, error, refetch } =
    useQuery<ReceivedRequest>(
      'received-request',
      () =>
        isTokenGetApi(
          `/quotations/received-request?keyword=${keyword}&sort=${filterTypeEn[checkedFilterIndex]}&limit=${limit}&page=${receivedPage}`,
        ),
      {
        enabled: false,
      },
    );

  useEffect(() => {
    refetch();
  }, [checkedFilterIndex, keyword, receivedPage]);

  const queryClient = useQueryClient();
  // 받은 견적 알림 읽음 처리
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
        wasReadCompanyReceivedQuotation: true,
      },
    });
  }, []);

  useEffect(() => {
    console.log(
      'data?.data.receivedQuotationRequests : ',
      data?.data.receivedQuotationRequests,
    );
    dispatch(headerAction.setTabIdx(0));
    dispatch(headerAction.setTab(0));
    dispatch(headerAction.setType('estimate'));
  }, []);

  if (isError) {
    return (
      <Modal
        text="다시 시도해주세요"
        click={() => {
          router.push('/');
        }}
      />
    );
  }

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
          {data?.data.receivedQuotationRequests?.map((el, idx) => (
            <Contents
              key={el?.quotationRequest?.quotationRequestIdx}
              onClick={() =>
                router.push({
                  pathname: '/company/recievedRequest',
                  query: {
                    quotationRequestIdx:
                      el?.quotationRequest?.quotationRequestIdx,
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
                  {el?.quotationRequest?.installationAddress}
                </AddressBox>
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
                setPage={setReceivedPage}
                page={receivedPage}
                list={data?.data.receivedQuotationRequests!}
                limit={limit}
                total={data?.data.totalCount!}
              />
            </PaginationWrap>
          )}
        </ContentsContainer>
      ) : (
        <NoEstimate type={'받은 요청이 없습니다'} />
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

export default RecieveRequest;
