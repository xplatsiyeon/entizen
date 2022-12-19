import styled from '@emotion/styled';
import Search from 'componentsCompany/CompanyQuotation/Search';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import blackDownArrow from 'public/images/blackDownArrow16.png';
import Image from 'next/image';
import FilterModal from './filterModal';
import NoAsHistyory from './noAsHistrory';
import { useRouter } from 'next/router';
import WebFilter from './webFilter';
import useDebounce from 'hooks/useDebounce';
import { QueryClient, useQueries, useQuery, useQueryClient } from 'react-query';
import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';

export interface AfterSalesServices {
  requestTitle: string;
  afterSalesServiceIdx: number;
  afterSalesServiceReview: {
    afterSalesServiceReviewIdx: number;
    averagePoint: string;
  };
}
export interface HisttoryResponse {
  isSuccess: true;
  data: {
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
const TAG = 'componentsCompany/AS/asHistroty.tsx';
const AsHistory = () => {
  const router = useRouter();
  const queryclient = useQueryClient();
  const [searchWord, setSearchWord] = useState<string>('');
  const [selected, setSelected] = useState<string>('현장별 보기');
  const [filterTypeEn, setFilterTypeEn] = useState('site');
  const [modal, setModal] = useState<boolean>(false);
  const keyword = useDebounce(searchWord, 2000);
  // 기업 AS 리스트 보기
  const { data, isLoading, isError, error, refetch, remove } =
    useQuery<HisttoryResponse>(
      'company-asList',
      () =>
        isTokenGetApi(
          `/after-sales-services/histories?sort=${filterTypeEn}&searchKeyword=${keyword}`,
        ),
      {
        enabled: router.isReady,
      },
    );

  const handleRoute = (afterSalesServiceIdx: number) => {
    router.push({
      pathname: '/company/as/history',
      query: {
        afterSalesServiceIdx: afterSalesServiceIdx,
      },
    });
  };
  useEffect(() => {
    console.log(data);
    refetch();
  }, [filterTypeEn, keyword, data]);

  useEffect(() => {
    return () => {
      queryclient.removeQueries('company-asList');
    };
  }, []);

  if (isError) {
    console.log('🔥 에러 발생 ~line 66 ->' + TAG);
    console.log(error);
  }

  console.log(
    '길이 가져왕...',
    data?.data?.afterSalesServiceHistories[0].afterSalesServices,
  );

  return (
    <Body>
      {modal && (
        <FilterModal
          setModal={setModal}
          setSelected={setSelected}
          setFilterTypeEn={setFilterTypeEn}
          type={'historyAS'}
        />
      )}

      <Wrap>
        <MobFilter onClick={() => setModal(true)}>
          <span>{selected}</span>
          <IconBox>
            <Image src={blackDownArrow} alt="rijgtArrow" />
          </IconBox>
        </MobFilter>
        <WebFilter
          setSelected={setSelected}
          setFilterTypeEn={setFilterTypeEn}
          type={'historyAS'}
        />
        <InputWrap>
          <Search searchWord={searchWord} setSearchWord={setSearchWord} />
        </InputWrap>
      </Wrap>
      {isLoading ? (
        <Loader />
      ) : (
        <List>
          {/* 데이터 없을 때 */}
          {data && data?.data?.afterSalesServiceHistories?.length! === 0 && (
            <NoAsHistyory />
          )}
          {/* 데이터 있을 때 */}
          {data && data?.data?.afterSalesServiceHistories?.length > 0 && (
            <ListWrap>
              {data?.data?.afterSalesServiceHistories?.map((el, idx) => (
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
                            data?.data?.afterSalesServiceHistories[idx]
                              ?.afterSalesServices.length
                          }
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
              ))}
              {/* 히스토리 다운 받는 로직 추가 해야합니다! */}
              <BtnBox>A/S 히스토리 다운받기</BtnBox>
            </ListWrap>
          )}
        </List>
      )}
    </Body>
  );
};

export default AsHistory;

const Body = styled.div`
  /* flex: 1; */
  margin: 0 15pt;
  font-family: 'Spoqa Han Sans Neo';
  display: flex;
  flex-direction: column;
  height: 100%;
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
  //transform: ${({ arrow }) => (arrow !== true ? `` : `rotate(180deg)`)};
`;

const List = styled.div`
  //margin-top: 18pt;
  flex: 1;
  min-height: 174pt;
  position: relative;
`;
const ListBox = styled.div`
  background: white;
  box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 6pt;
  padding: 13.5pt;
  margin-bottom: 9pt;
`;
const StoreName = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  color: #222222;
  /* margin-bottom: 6pt; */
  margin-bottom: 14pt;
`;
const Text = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 10.5pt;
  line-height: 18pt;
  color: #222222;
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
`;

const FlexWrap = styled.div<{ afterSalesService: number }>`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  cursor: pointer;
  :hover {
    box-shadow: 4px 0px 10px rgba(137, 163, 201, 0.2);
  }

  &:not(:first-of-type) {
    border-top: ${({ afterSalesService }) =>
      afterSalesService === 1 ? '' : '0.75pt dashed #CACCD1'};
    padding-top: ${({ afterSalesService }) =>
      afterSalesService === 1 ? '' : '9.75pt '};
  }
  &:not(:last-of-type) {
    padding-bottom: ${({ afterSalesService }) =>
      afterSalesService === 1 ? '' : '9.75pt '};
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
  padding: 9pt 30pt;
  background-color: #5221cb;
  border-radius: 6pt;
  width: 83.25pt;
  margin: 27pt auto 90pt;
  @media (min-width: 900pt) {
    margin-bottom: 0;
  }
`;

// lowRate: 낮은 평점순, highRate: 높은 평점 site: 현장 순
