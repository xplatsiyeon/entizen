import styled from '@emotion/styled';
import Search from 'componentsCompany/CompanyQuotation/Search';
import { useState } from 'react';
import blackDownArrow from 'public/images/blackDownArrow16.png';
import Image from 'next/image';
import FilterModal from './filterModal';
import NoAsHistyory from './noAsHistrory';
import { useRouter } from 'next/router';
import CaretDown24 from 'public/images/CaretDown24.png';
import { useQuery } from 'react-query';
import { CompanyAsListResposne } from './newAs';
import { HistoryResponse } from 'componentsCompany/AS/asHistory';
import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';

const TAG = 'componentsCompany/AS/AsHistoryUnder.tsx';
const AsHistoryUnder = () => {
  const router = useRouter();
  // 기업 AS 리스트 보기
  const { data, isLoading, isError, error } = useQuery<HistoryResponse>(
    'company-asList',
    () =>
      isTokenGetApi(
        '/after-sales-services/histories?sort=status&searchKeyword',
      ),
  );

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    // console.log('🔥 에러 발생 ~line 28 ->' + TAG);
    // console.log(error);
  }

  const handleRoute = (afterSalesServiceIdx: number) => {
    router.push({
      pathname: '/company/as/history',
      query: {
        afterSalesServiceIdx: afterSalesServiceIdx,
      },
    });
  };

  return (
    <Body>
      <List>
        {data?.data.afterSalesServiceHistories?.length! > 0 ? (
          <ListWrap>
            {data?.data?.afterSalesServiceHistories?.map((el, idx) => (
              <ListBox
                key={el?.afterSalesServices[0]?.afterSalesServiceIdx}
                onClick={() =>
                  handleRoute(el?.afterSalesServices[0]?.afterSalesServiceIdx)
                }
              >
                <StoreName>
                  {
                    el?.finalQuotation?.preQuotation?.quotationRequest
                      ?.installationAddress
                  }
                </StoreName>
                <ListIconBox>
                  <Image src={CaretDown24} alt="RightArrow" />
                </ListIconBox>
              </ListBox>
            ))}
          </ListWrap>
        ) : (
          <NoAsHistyory />
        )}
      </List>
      {/* {arr.length > 0 && <BtnBox>A/S 히스토리 다운받기</BtnBox>} */}
    </Body>
  );
};

export default AsHistoryUnder;

const Body = styled.div`
  flex: 1;
  /* margin: 0 15pt; */
  font-family: 'Spoqa Han Sans Neo' !important;
  display: flex;
  flex-direction: column;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const ListWrap = styled.div`
  margin: 18pt 0;
  height: 190pt;
  overflow-y: scroll;
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
  width: 180.5pt;
  height: 21pt;
  margin-bottom: 9pt;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;
const StoreName = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  color: #222222;
`;
const ListIconBox = styled.div`
  width: 18pt;
  height: 18pt;
  position: relative;
`;
