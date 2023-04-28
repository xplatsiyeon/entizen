import styled from '@emotion/styled';
import Search from 'componentsCompany/CompanyQuotation/Search';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import blackDownArrow from 'public/images/blackDownArrow16.png';
import Image from 'next/image';
import FilterModal from './filterModal';
import NoAsHistyory from './noAsHistrory';
import { useRouter } from 'next/router';
import WebFilter from './webFilter';
import Loader from 'components/Loader';
import { useDispatch } from 'react-redux';
import { redirectAction } from 'store/redirectUrlSlice';
import { excelDownloadFile } from 'hooks/excelDown';
import { useMediaQuery } from 'react-responsive';
import useDebounce from 'hooks/useDebounce';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import PaginationCompo from 'components/PaginationCompo';

export interface AfterSalesServices {
  requestTitle: string;
  afterSalesServiceIdx: number;
  afterSalesServiceReview: {
    afterSalesServiceReviewIdx: number;
    averagePoint: string;
  };
}
export interface HistoryResponse {
  isSuccess: true;
  data: {
    totalCount: number;
    afterSalesServiceHistories: {
      finalQuotation: {
        finalQuotationIdx: number;
        preQuotation: {
          preQuotationIdx: number;
          quotationRequest: {
            quotationRequestIdx: number;
            installationAddress: string;
          };
        };
      };
      afterSalesServices: AfterSalesServices[];
    }[];
  };
}

interface Props {}

const AsHistory = ({}: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);
  const [modal, setModal] = useState<boolean>(false);
  const excelUrl =
    '/after-sales-services/histories/download?sort=lowRate&searchKeyword=';
  // 페이지 네이션
  const desktop = useMediaQuery({
    query: '(min-width:900pt)',
  });
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  const limit = desktop ? 20 : 100000000;
  const [historyAsPage, setHistoryAsPage] = useState(1);
  // HISTORY AS 리스트 보기
  const [historySearchWord, setHistorySearchWord] = useState<string>('');
  const [historyFilterTypeEn, setHistoryFilterTypeEn] = useState('site');
  const [historySelected, setHistorySelected] = useState<string>('현장별 보기');
  const historyKeyword = useDebounce(historySearchWord, 2000);
  const {
    data: historyData,
    isLoading: historyLoading,
    refetch: historyRefetch,
  } = useQuery<HistoryResponse>(
    'company-history-as',
    () =>
      isTokenGetApi(
        `/after-sales-services/histories?sort=${historyFilterTypeEn}&searchKeyword=${historyKeyword}&limit=${limit}&page=${historyAsPage}`,
      ),
    {
      enabled: router?.isReady && accessToken ? true : false,
    },
  );

  // history 키워드, 필터 업데이트
  useEffect(() => {
    historyRefetch();
  }, [historyFilterTypeEn, historyKeyword, historySelected, historyAsPage]);

  const handleRoute = (afterSalesServiceIdx: number) => {
    router.push({
      pathname: '/company/as/history',
      query: {
        afterSalesServiceIdx: afterSalesServiceIdx,
      },
    });
  };

  if (!accessToken && memberType !== 'COMPANY') {
    dispatch(redirectAction.addUrl(router.asPath));
    router.push('/signin');
    return <div></div>;
  } else {
    return (
      <Body>
        {modal && (
          <FilterModal
            setModal={setModal}
            setSelected={setHistorySelected}
            setFilterTypeEn={setHistoryFilterTypeEn}
            type={'historyAS'}
          />
        )}

        <Wrap>
          <MobFilter onClick={() => setModal(true)}>
            <span>{historySelected}</span>
            <IconBox>
              <Image src={blackDownArrow} alt="rijgtArrow" />
            </IconBox>
          </MobFilter>
          <WebFilter
            setSelected={setHistorySelected}
            setFilterTypeEn={setHistoryFilterTypeEn}
            type={'historyAS'}
          />
          <InputWrap>
            <Search
              searchWord={historyKeyword}
              setSearchWord={setHistorySearchWord}
            />
          </InputWrap>
        </Wrap>
        {historyLoading ? (
          <Loader />
        ) : (
          <List>
            {historyData &&
            historyData?.data?.afterSalesServiceHistories?.length > 0 ? (
              <ListWrap>
                {historyData?.data?.afterSalesServiceHistories?.map(
                  (el, idx) => (
                    <React.Fragment key={idx}>
                      <ListBox key={idx}>
                        <StoreName>
                          {
                            el?.finalQuotation?.preQuotation?.quotationRequest
                              ?.installationAddress
                          }
                        </StoreName>
                        {el?.afterSalesServices?.map(
                          (afterSalesService, afterSalesServiceIdx) => (
                            <FlexWrap
                              key={afterSalesServiceIdx}
                              onClick={() =>
                                handleRoute(
                                  el?.afterSalesServices[afterSalesServiceIdx]
                                    ?.afterSalesServiceIdx,
                                )
                              }
                              afterSalesService={
                                historyData?.data?.afterSalesServiceHistories[
                                  idx
                                ]?.afterSalesServices.length
                              }
                              mobile={mobile}
                            >
                              <Text>{afterSalesService.requestTitle}</Text>
                              <Score>
                                {afterSalesService.afterSalesServiceReview
                                  ?.averagePoint
                                  ? `평점 ${afterSalesService.afterSalesServiceReview?.averagePoint}`
                                  : null}
                              </Score>
                            </FlexWrap>
                          ),
                        )}
                      </ListBox>
                    </React.Fragment>
                  ),
                )}
                {desktop && (
                  <PaginationWrap>
                    <PaginationCompo
                      setPage={setHistoryAsPage}
                      page={historyAsPage}
                      list={historyData.data.afterSalesServiceHistories!}
                      limit={limit}
                      total={historyData.data.totalCount!}
                    />
                  </PaginationWrap>
                )}
                {/* 히스토리 다운 받는 로직 추가 해야합니다! */}
                <BtnBox
                  onClick={() => {
                    excelDownloadFile(excelUrl, accessToken);
                  }}
                >
                  A/S 히스토리 다운받기
                </BtnBox>
              </ListWrap>
            ) : (
              <NoAsHistyory />
            )}
          </List>
        )}
      </Body>
    );
  }
};

export default AsHistory;

const Body = styled.div`
  /* flex: 1; */
  font-family: 'Spoqa Han Sans Neo' !important;
  display: flex;
  flex-direction: column;
  height: 100%;
  @media (max-width: 899.25pt) {
    padding: 0 15pt;
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: row-reverse;
  @media (max-width: 899.25pt) {
    flex-direction: column;
    align-items: flex-end;
  }
`;

const MobFilter = styled.button`
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-content: center;
  font-style: normal;
  font-weight: 500;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #222222;
  @media (min-width: 900pt) {
    display: none;
  }
`;

const InputWrap = styled.div`
  width: 100%;
`;
const IconBox = styled.div<{ arrow?: boolean }>`
  align-self: center;
  width: 10pt;
  margin-left: 9pt;
  display: flex;
  align-items: center;
`;

const List = styled.div`
  margin: 18pt 0;
  @media (max-width: 899.25pt) {
    padding-bottom: 80pt;
    margin: 0;
  }
`;
const ListBox = styled.div`
  background: white;
  box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 6pt;
  padding: 13.5pt;
  margin-bottom: 9pt;
  @media (min-width: 900pt) {
    padding: 21.75pt 26.25pt;
    border-radius: 12pt;
  }
`;
const StoreName = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  color: #222222;
  margin-bottom: 6pt;
  @media (min-width: 900pt) {
    font-size: 13.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
    margin-bottom: 15pt;
  }
`;
const Text = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 10.5pt;
  line-height: 18pt;
  color: #222222;
  @media (min-width: 900pt) {
    font-size: 12pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const Score = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #caccd1;
  width: 50pt;
  @media (min-width: 900pt) {
    font-size: 10.5pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: right;
  }
`;

const FlexWrap = styled.div<{ afterSalesService: number; mobile: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  cursor: pointer;
  /* :hover {
    box-shadow: 4px 0px 10px rgba(137, 163, 201, 0.2);
  } */

  &:not(:first-of-type) {
    border-top: ${({ afterSalesService }) =>
      afterSalesService === 1 ? '' : '0.75pt dashed #CACCD1'};
    /* padding-top: ${({ afterSalesService }) =>
      afterSalesService === 1 ? '' : '9.75pt '}; */
    padding-top: ${({ afterSalesService, mobile }) =>
      afterSalesService === 1 ? '' : mobile ? '9.75pt' : '12pt '};
  }
  &:not(:last-of-type) {
    padding-bottom: ${({ afterSalesService, mobile }) =>
      afterSalesService === 1 ? '' : mobile ? '9.75pt' : '12pt '};
  }
`;

const ListWrap = styled.div`
  margin: 18pt 0;
`;

const BtnBox = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #ffffff;
  padding: 9pt 0pt;
  cursor: pointer;
  background-color: #5221cb;
  border-radius: 6pt;
  width: 142.25pt;
  margin: 27pt auto 90pt;
  @media (min-width: 900pt) {
    margin-bottom: 0;
    padding: 15pt 0;
    width: 251.25pt;
    font-size: 12pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
`;

const PaginationWrap = styled.div`
  padding-top: 30pt;
`;
