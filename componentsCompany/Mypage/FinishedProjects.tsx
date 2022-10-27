import styled from '@emotion/styled';
import { InputAdornment, TextField } from '@mui/material';
import Image from 'next/image';
import search from 'public/images/search.png';
import CaretDown24 from 'public/images/CaretDown24.png';
import React, { useState } from 'react';

import colors from 'styles/colors';
import { useRouter } from 'next/router';

type Props = {
  tabNumber: number;
};

const FinishedProjects = ({ tabNumber }: Props) => {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<number>(0);
  const handleDownload = () => {};
  return (
    <Wrapper>
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
      <List onClick={() => router.push('/company/mypage/successedProject')}>
        <ListTextBox>
          <ListTitle>타임스트림 쇼핑몰</ListTitle>
          <ListDate>2022년 4월 7일</ListDate>
        </ListTextBox>
        <ListIconBox>
          <Image src={CaretDown24} alt="RightArrow" />
        </ListIconBox>
      </List>
      <Button onClick={handleDownload}>완료 프로젝트 리스트 다운로드</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  padding-left: 15pt;
  padding-right: 15pt;
  padding-top: 20.25pt;
`;

const FilterBox = styled.div`
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
  padding: 12.75pt 13.5pt;
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;
  border-radius: 6pt;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ListTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5pt;
`;

const ListTitle = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: left;
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
`;

export default FinishedProjects;
