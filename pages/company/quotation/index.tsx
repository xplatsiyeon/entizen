import styled from '@emotion/styled';
import BottomNavigation from 'components/BottomNavigation';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { myEstimateAction } from 'storeCompany/myQuotation';
import Header from '../../../componentsCompany/CompanyQuotation/Header';
import RecieveRequest from '../../../componentsCompany/CompanyQuotation/RecieveRequest';
import SentRequest from '../../../componentsCompany/CompanyQuotation/SentRequest';
import Tab from '../../../componentsCompany/CompanyQuotation/Tab';

type Props = {};

export type filterType = '마감일순 보기' | '상태순 보기' | '날짜순 보기';

const CompanyQuotations = (props: Props) => {
  const dispatch = useDispatch();
  const [tabNumber, setTabNumber] = useState<number>(0);
  const [searchWord, setSearchWord] = useState<string>('');
  const [checkedFilterIndex, setCheckedFilterIndex] = useState<number>(0);
  const [checkedFilter, setCheckedFilter] =
    useState<filterType>('마감일순 보기');

  useEffect(() => {
    dispatch(myEstimateAction.reset());
  }, []);

  return (
    <>
      <Container>
        <Header />
        {/* 탭 / 필터링 / 검색창 */}
        <Tab
          tabNumber={tabNumber}
          setTabNumber={setTabNumber}
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          checkedFilterIndex={checkedFilterIndex}
          setCheckedFilterIndex={setCheckedFilterIndex}
          checkedFilter={checkedFilter}
          setCheckedFilter={setCheckedFilter}
        />
        {/* 받은 요청 */}
        {tabNumber === 0 && (
          <RecieveRequest checkedFilterIndex={checkedFilterIndex} />
        )}
        {/* 보낸 견적 */}
        {tabNumber === 1 && (
          <SentRequest checkedFilterIndex={checkedFilterIndex} />
        )}
      </Container>
      <BottomNavigation />
    </>
  );
};
const Container = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
`;
export default CompanyQuotations;
