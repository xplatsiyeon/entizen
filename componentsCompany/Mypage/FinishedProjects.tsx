import styled from '@emotion/styled';
import { InputAdornment, TextField } from '@mui/material';
import Image from 'next/image';
import search from 'public/images/search.png';
import CaretDown24 from 'public/images/CaretDown24.png';
import React, { useEffect, useState } from 'react';

import colors from 'styles/colors';
import { useRouter } from 'next/router';
import NoProject from './NoProject';

type Props = {
  tabNumber: number;
  successComponentId?: number;
  setSuccessComponentId: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
};
interface Data {
  id: number;
  storeName: string;
  date: string;
}
// 데이터 없을 때 나오는 페이지
// const tempProceeding: [] = [];
const tempProceeding: Data[] = [
  {
    id: 0,
    storeName: '타임스트림 쇼핑몰',
    date: '2022년 4월 7일',
  },
  {
    id: 1,
    storeName: '맥도날드 대이동점',
    date: '2021.05.10',
  },
  {
    id: 2,
    storeName: 'LS카페 신림점',
    date: '2021.03.10',
  },
  {
    id: 3,
    storeName: 'LS카페 마곡점',
    date: '2021.07.23',
  },
  {
    id: 4,
    storeName: '스타벅스 마곡점',
    date: '2021.07.23',
  },
  {
    id: 5,
    storeName: 'LS카페 계양점',
    date: '2021.07.23',
  },
  {
    id: 6,
    storeName: 'LS카페 신림점',
    date: '2021.07.23',
  },
];

const FinishedProjects = ({
  tabNumber,
  setSuccessComponentId,
  successComponentId,
}: Props) => {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<number>(0);
  const handleDownload = () => {};

  if (tempProceeding.length === 0) {
    return <NoProject />;
  }

  return (
    <Wrapper>
      {successComponentId === undefined && (
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
          {tabNumber === 1 && tempProceeding.length > 0 && (
            <ListContainer>
              {tempProceeding.map((el, index) => (
                <div key={index}>
                  <List
                    onClick={() => {
                      setSuccessComponentId(index);
                      router.push(
                        `/company/mypage/successedProject/${successComponentId}`,
                      );
                    }}
                  >
                    <ListTextBox key={el.id}>
                      <ListTitle>{el.storeName}</ListTitle>
                      <ListRight>
                        <ListDate>{el.date}</ListDate>
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
  @media (min-width: 899pt) {
    margin: 0 auto;
    top: 6%;
  }
`;

const FilterBox = styled.div`
  @media (min-width: 899pt) {
    display: flex;
    width: 580.5pt;
    justify-content: flex-end;
    padding: 15pt 0 15pt 0;
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
  @media (min-width: 899pt) {
    position: absolute;
    bottom: 82.6%;
    width: 580.5pt;
    margin-bottom: 25%;
    margin-left: 2%;
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
  @media (min-width: 899pt) {
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
  padding-left: 15pt;
  padding-right: 15pt;
  @media (min-width: 899pt) {
    display: grid;
    flex-direction: column;
    margin: 0 auto;
    gap: 10pt;
  }
`;

const ListTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5pt;
  @media (min-width: 899pt) {
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
  @media (max-width: 899pt) {
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
  @media (max-width: 899pt) {
    left: 200pt;
    bottom: 28pt;
  }
`;

const ListRight = styled.div`
  @media (min-width: 899pt) {
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
  margin-top: 45pt;
  @media (min-width: 899pt) {
    width: 251.25pt;
    margin: 0 auto;
    margin-top: 75pt;
    margin-bottom: 90pt;
  }
`;

export default FinishedProjects;
