import styled from '@emotion/styled';
import BottomNavigation from 'components/BottomNavigation';
import React, { useState } from 'react';
import Header from './Header';
import RecieveRequest from './RecieveRequest';
import Tab from './Tab';

type Props = {};

export type filterType = '마감일순 보기' | '상태순 보기' | '날짜순 보기';

const CompanyQuotations = (props: Props) => {
  const [tabNumber, setTabNumber] = useState<number>(0);
  const [searchWord, setSearchWord] = useState<string>('');
  const [checkedFilterIndex, setCheckedFilterIndex] = useState<number>(0);
  const [checkedFilter, setCheckedFilter] =
    useState<filterType>('마감일순 보기');
  return (
    <>
      <Container>
        <Header />
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
        <RecieveRequest checkedFilterIndex={checkedFilterIndex} />
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
