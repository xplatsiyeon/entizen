import styled from '@emotion/styled';
import Search from 'componentsCompany/CompanyQuotation/Search';
import { useEffect, useState } from 'react';
import blackDownArrow from 'public/images/blackDownArrow16.png';
import Image from 'next/image';
import FilterModal from './filterModal';
import NoAsHistyory from './noAsHistrory';
import { useRouter } from 'next/router';
import WebFilter from './webFilter';
import useDebounce from 'hooks/useDebounce';
import { useQuery } from 'react-query';
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
    afterSalesServiceHistories: [
      {
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
      },
    ];
  };
}
const TAG = 'componentsCompany/AS/asHistroty.tsx';
const AsHistory = () => {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState<string>('');
  const [selected, setSelected] = useState<string>('현장별 보기');
  const [filterTypeEn, setFilterTypeEn] = useState('date');
  const [modal, setModal] = useState<boolean>(false);
  const keyword = useDebounce(searchWord, 2000);
  // 기업 AS 리스트 보기
  const { data, isLoading, isError, error, refetch } =
    useQuery<HisttoryResponse>('company-asList', () =>
      isTokenGetApi(
        `/after-sales-services/histories?sort=${filterTypeEn}&searchKeyword=${''}`,
      ),
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
    refetch();
  }, [filterTypeEn, keyword]);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    console.log('🔥 에러 발생 ~line 66 ->' + TAG);
    console.log(error);
  }

  return (
    <Body>
      {modal && (
        <FilterModal
          setModal={setModal}
          setSelected={setSelected}
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
        <WebFilter setSelected={setSelected} type={'historyAS'} />
        <InputWrap>
          <Search searchWord={searchWord} setSearchWord={setSearchWord} />
        </InputWrap>
      </Wrap>
      <List>
        {data?.data?.afterSalesServiceHistories?.length! > 0 ? (
          <ListWrap>
            {data?.data?.afterSalesServiceHistories?.map((el, idx) => (
              <ListBox
                key={el?.finalQuotation?.finalQuotationIdx}
                onClick={() =>
                  handleRoute(el.afterSalesServices[0].afterSalesServiceIdx)
                }
              >
                <StoreName>
                  {
                    el?.finalQuotation?.preQuotation?.quotationRequest
                      ?.installationAddress
                  }
                </StoreName>
                {el.afterSalesServices.map((el) => (
                  <FlexWrap key={el.afterSalesServiceIdx}>
                    <Text>{el.requestTitle}</Text>
                    <Score>
                      {el.afterSalesServiceReview?.averagePoint
                        ? `평점 ${el.afterSalesServiceReview?.averagePoint}`
                        : null}
                    </Score>
                  </FlexWrap>
                ))}
              </ListBox>
            ))}
            {/* 히스토리 다운 받는 로직 추가 해야합니다! */}
            <BtnBox>A/S 히스토리 다운받기</BtnBox>
          </ListWrap>
        ) : (
          <NoAsHistyory />
        )}
      </List>
      {/* {arr.length > 0 && <BtnBox>A/S 히스토리 다운받기</BtnBox>} */}
    </Body>
  );
};

export default AsHistory;

const Body = styled.div`
  flex: 1;
  margin: 0 15pt;
  font-family: 'Spoqa Han Sans Neo';
  display: flex;
  flex-direction: column;
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
  cursor: pointer;
`;
const StoreName = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  color: #222222;
  margin-bottom: 6pt;
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

const FlexWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
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
