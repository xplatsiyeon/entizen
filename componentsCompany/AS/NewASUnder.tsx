import styled from '@emotion/styled';
import Search from 'componentsCompany/CompanyQuotation/Search';
import { useState } from 'react';
import blackDownArrow from 'public/images/blackDownArrow16.png';
import Image from 'next/image';
import FilterModal from './filterModal';
import { bgcolor } from '@mui/system';
import { handleColorAS } from 'utils/changeValue';
import { useRouter } from 'next/router';
import colors from 'styles/colors';
import WebFilter from './webFilter';
import CaretDown24 from 'public/images/CaretDown24.png';
import { CompanyAsListResposne } from './newAs';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';
import NoAsHistyoryUnder from './noAsHistoryUnder';

type Props = {
  tabNumber: number;
  componentId?: number;
  setComponentId?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const TAG = 'componentsCompany/AS/NewASUnder.tsx';
const NewASUnder = ({ tabNumber, componentId, setComponentId }: Props) => {
  const router = useRouter();
  const routerId = router?.query?.afterSalesServiceIdx;

  // 기업 AS 리스트 보기
  const { data, isLoading, isError, error } = useQuery<CompanyAsListResposne>(
    'company-asList',
    () => isTokenGetApi('/after-sales-services/new?sort=status&searchKeyword'),
  );

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    // console.log('🔥 에러 발생 ~line 66 ->' + TAG);
    // console.log(error);
  }
  // console.log('🔥 기업 AS 리스트 데이터 확인 ~line 69 -> ' + TAG);
  // console.log(data);

  const handleId = (idx: number) => {
    if (setComponentId !== undefined) {
      setComponentId(idx);
    }
  };

  // console.log('data.length', data?.data?.newReceivedAfterSalesServices?.length);

  return (
    <Body>
      <List length={data?.data?.newReceivedAfterSalesServices?.length}>
        {data?.data?.newReceivedAfterSalesServices?.length! > 0 ? (
          data?.data?.newReceivedAfterSalesServices?.map((el, idx) => {
            return (
              <div key={idx}>
                <ListBox
                  componentId={componentId!}
                  idx={Number(el.afterSalesService.afterSalesServiceIdx)}
                  key={idx}
                  onClick={() => {
                    handleId(idx);
                    router.push({
                      pathname: '/company/as/receivedAS/',
                      query: {
                        afterSalesServiceIdx:
                          el.afterSalesService.afterSalesServiceIdx,
                      },
                    });
                  }}
                >
                  <ListLeftBox>
                    <FlexWrap>
                      <Badge bgColor={handleColorAS(el?.badge)}>
                        {el?.badge}
                      </Badge>
                    </FlexWrap>
                    <StoreName>
                      {
                        el?.afterSalesService?.project?.finalQuotation
                          ?.preQuotation?.quotationRequest?.installationAddress
                      }
                    </StoreName>
                  </ListLeftBox>
                  <ListIconBox>
                    <Image src={CaretDown24} alt="RightArrow" />
                  </ListIconBox>
                </ListBox>
              </div>
            );
          })
        ) : (
          <NoAsHistyoryUnder />
        )}
      </List>
    </Body>
  );
};

export default NewASUnder;

const Body = styled.div`
  /* margin: 0 15pt; */
  font-family: 'Spoqa Han Sans Neo';
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const List = styled.div<{ length?: number }>`
  margin: ${({ length }) => (length === 0 ? 0 : ' 18pt auto')};
  max-height: 170pt;
  overflow-y: scroll;
`;

const ListBox = styled.div<{ idx: number; componentId: number }>`
  /* margin: 0 auto; */
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 6pt;
  width: 196pt;
  padding: 9pt 13.5pt;
  transform: translateX(3.5pt);
  margin-bottom: 9pt;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: ${({ idx, componentId }) =>
    componentId === idx ? `0.75pt solid #5221CB` : ``};
`;

const ListLeftBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const StoreName = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  color: #222222;
  width: 150pt;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FlexWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12pt;
`;

const Badge = styled.div<{ bgColor: string }>`
  background: ${({ bgColor }) => (bgColor ? bgColor : '#F75015')};
  font-style: normal;
  font-weight: 500;
  font-size: 9pt !important;
  line-height: 9pt !important;
  letter-spacing: -0.02em;
  color: #ffffff;
  padding: 4.5pt 7.5pt !important;
  border-radius: 12pt !important;
`;

const ListIconBox = styled.div`
  width: 18pt;
  height: 18pt;
  position: relative;
`;
