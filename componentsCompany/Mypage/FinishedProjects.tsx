import styled from '@emotion/styled';
import { InputAdornment, TextField } from '@mui/material';
import Image from 'next/image';
import search from 'public/images/search.png';
import CaretDown24 from 'public/images/CaretDown24.png';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import { useRouter } from 'next/router';
import NoProject from './NoProject';
import { useQuery } from '@apollo/client';
import {
  GET_historyProjectsDetail,
  ResponseHistoryProjectsDetail,
} from 'QueryComponents/CompanyQuery';
import Loader from 'components/Loader';
import { changeDataFn } from 'utils/calculatePackage';
import useDebounce from 'hooks/useDebounce';

type Props = {
  tabNumber: number;
  componentId?: number;
  setComponentId: React.Dispatch<React.SetStateAction<number | undefined>>;
};
const TAG = 'components/Company/Mypage/FinishedProjects.tsx';
const FinishedProjects = ({
  tabNumber,
  setComponentId,
  componentId,
}: Props) => {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<number>(0);
  const [searchWord, setSearchWord] = useState<string>('');
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  const keyword = useDebounce(searchWord, 2000);
  const sortType = ['SUBSCRIBE_START', 'SUBSCRIBE_END'];
  const {
    loading: historyLoading,
    error: historyError,
    data: historyData,
  } = useQuery<ResponseHistoryProjectsDetail>(GET_historyProjectsDetail, {
    variables: {
      searchKeyword: keyword,
      sort: sortType[selectedFilter],
    },
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    },
  });

  if (historyLoading) {
    return <Loader />;
  }
  if (historyError) {
    console.log(historyError);
  }

  const handleDownload = () => {};

  if (historyData?.completedProjects?.length! === 0) {
    console.log(historyData);
    return <NoProject />;
  }

  console.log('🔥 ~line 69 완료 프로젝트 데이터 확인 ' + TAG);
  // console.log(TAG);
  console.log(historyData);

  return (
    <Wrapper>
      {componentId === undefined && (
        <>
          <FilterBox>
            <FilterText
              className={
                selectedFilter !== undefined && selectedFilter === 0
                  ? 'selected'
                  : ''
              }
              onClick={() => setSelectedFilter(0)}
            >
              구독 시작
            </FilterText>
            <Divider></Divider>
            <FilterText
              className={
                selectedFilter !== undefined && selectedFilter === 1
                  ? 'selected'
                  : ''
              }
              onClick={() => setSelectedFilter(1)}
            >
              구독 종료
            </FilterText>
          </FilterBox>
          <Input
            placeholder="프로젝트를 검색하세요."
            type="text"
            onChange={(e) => setSearchWord(e.currentTarget.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <div style={{ width: '15pt', height: '15pt' }}>
                    <Image src={search} alt="searchIcon" layout="intrinsic" />
                  </div>
                </InputAdornment>
              ),
            }}
          />
          {tabNumber === 1 && historyData?.completedProjects?.length! > 0 && (
            <ListContainer>
              {historyData?.completedProjects?.map((el, index) => (
                <div key={el.projectIdx}>
                  <List
                    onClick={() => {
                      setComponentId(index);
                      router.push({
                        pathname: '/company/mypage/successedProject/',
                        query: {
                          projectIdx: el?.projectIdx,
                        },
                      });
                    }}
                  >
                    <ListTextBox>
                      {/* <ListTitle>{el.storeName}</ListTitle> */}
                      <ListTitle>{el?.projectName}</ListTitle>
                      <ListRight>
                        <ListDate>{changeDataFn(el.subscribeEndDate)}</ListDate>
                        <ListIconBox>
                          <Image src={CaretDown24} alt="RightArrow" />
                        </ListIconBox>
                      </ListRight>
                    </ListTextBox>
                  </List>
                </div>
              ))}
            </ListContainer>
          )}
        </>
      )}
      <Button onClick={handleDownload}>완료 프로젝트 리스트 다운로드</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  padding-left: 15pt;
  padding-right: 15pt;
  padding-top: 20.25pt;
  display: flex;
  flex-direction: column;
  @media (min-width: 900pt) {
    margin: 0 auto;
    padding-top: 0;
  }
`;

const FilterBox = styled.div`
  @media (min-width: 900pt) {
    position: absolute;
    display: flex;
    width: 580.5pt;
    justify-content: flex-end;
    padding-top: 15pt;
    top: 20%;
  }
  display: flex;
  gap: 6pt;
  align-items: center;
  justify-content: end;
  font-family: Spoqa Han Sans Neo;
  font-size: 9pt;
  font-weight: 500;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  .selected {
    color: #222222;
  }
`;

const Divider = styled.div`
  height: 7.5pt;
  width: 0.5pt;
  border: 0.25pt solid #caccd1;
`;

const FilterText = styled.div`
  color: #caccd1;
`;

const Input = styled(TextField)`
  @media (min-width: 900pt) {
    position: static;
    bottom: 82.6%;
    width: 580.5pt;
    margin-bottom: 15%;
    margin-top: 0;
    margin-bottom: 65pt;
  }
  width: 100%;
  border-radius: 6pt;
  border: 2.5pt solid ${colors.main};
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  margin-top: 9pt;
  margin-bottom: 18pt;
  .MuiInputBase-root {
    padding: 8.955pt 12pt;
  }
  & input {
    font-size: 10.5pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -2%;
    /* color: ${colors.lightGray3}; */
    text-align: left;
    padding: 0;
  }

  ::placeholder {
    color: ${colors.gray};
    font-weight: 400;
  }
  & span > img {
    width: 15pt;
    height: 15pt;
  }
  & fieldset {
    border: none;
  }
`;

const List = styled.div`
  height: 60pt;
  margin-bottom: 10pt;
  @media (min-width: 900pt) {
    display: flex;
    flex-direction: column;
    width: 580.5pt;
    height: 76.5pt;
  }
  padding: 12.75pt 13.5pt;
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;
  border-radius: 6pt;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ListContainer = styled.div`
  margin-top: 21pt;
  /* padding-left: 15pt;
  padding-right: 15pt; */
  @media (min-width: 900pt) {
    margin: 0 auto;
    gap: 10pt;
  }
`;

const ListTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5pt;
  @media (min-width: 900pt) {
    display: flex;
    flex-direction: row;
    width: 510pt;
    justify-content: space-between;
    margin: auto 0;
  }
`;

const ListTitle = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: left;
  @media (max-width: 899.25pt) {
    padding-top: 20pt;
  }
`;
const ListDate = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: left;
`;
const ListIconBox = styled.div`
  width: 18pt;
  height: 18pt;
  position: relative;
  margin-left: 40pt;
  @media (max-width: 899.25pt) {
    left: 170pt;
    bottom: 28pt;
  }
  @media (min-width: 900pt) {
    margin-left: 10pt;
  }
`;

const ListRight = styled.div`
  @media (min-width: 900pt) {
    display: flex;
    align-items: center;
  }
`;

const Button = styled.div`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #e2e5ed;
  border-radius: 6pt;
  padding-top: 15pt;
  padding-bottom: 15pt;
  color: #a6a9b0;
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
  margin-top: 25pt;
  margin-bottom: 100pt;
  @media (min-width: 900pt) {
    width: 251.25pt;
    margin: 0 auto;
    margin-top: 75pt;
    margin-bottom: 20pt;
  }
`;

export default FinishedProjects;
