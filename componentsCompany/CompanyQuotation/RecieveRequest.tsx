import styled from '@emotion/styled';
import CommonBtn from 'components/mypage/as/CommonBtn';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CaretDown24 from 'public/images/CaretDown24.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import colors from 'styles/colors';
import { HandleColor } from 'utils/changeValue';
import {
  filterType,
  filterTypeEn,
  ReceivedRequest,
} from 'pages/company/quotation';
import { isTokenGetApi } from 'api';
import { useQuery } from 'react-query';
import useDebounce from 'hooks/useDebounce';
import Loader from 'components/Loader';
import Sort from './Sort';
import Search from './Search';
import Modal from 'components/Modal/Modal';
import WebSort from './WebSort';

type Props = {
  searchWord: string;
  setSearchWord: Dispatch<SetStateAction<string>>;
  checkedFilterIndex: number;
  setcheckedFilterIndex: Dispatch<SetStateAction<number>>;
  checkedFilter: filterType;
  setCheckedFilter: Dispatch<SetStateAction<filterType>>;
  keyword: string;
  data: ReceivedRequest;
};

const TAG = '👀 ~RecieveRequest ~line 20 queryData';
const RecieveRequest = ({
  searchWord,
  setSearchWord,
  checkedFilterIndex,
  setcheckedFilterIndex,
  checkedFilter,
  setCheckedFilter,
  keyword,
  data,
}: Props) => {
  const router = useRouter();

  return (
    <>
      <Sort
        checkedFilter={checkedFilter}
        setCheckedFilter={setCheckedFilter}
        checkedFilterIndex={checkedFilterIndex}
        setcheckedFilterIndex={setcheckedFilterIndex}
      />
      <TopContainer>
        <Search searchWord={searchWord} setSearchWord={setSearchWord} />
        <WebSort
          checkedFilter={checkedFilter}
          setCheckedFilter={setCheckedFilter}
          checkedFilterIndex={checkedFilterIndex}
          setcheckedFilterIndex={setcheckedFilterIndex}
        />
      </TopContainer>
      <ContentsContainer>
        {data?.receivedQuotationRequests?.map((el, idx) => (
          <Contents
            key={el?.quotationRequest?.quotationRequestIdx}
            onClick={() =>
              router.push({
                pathname: '/company/recievedRequest',
                query: {
                  quotationRequestIdx:
                    el?.quotationRequest?.quotationRequestIdx,
                },
              })
            }
          >
            <DdayNAddress>
              <DdayBox>
                <CommonBtn
                  text={el?.badge}
                  backgroundColor={HandleColor(el?.badge)}
                  bottom={'12pt'}
                />
              </DdayBox>
              <AddressBox>
                {el?.quotationRequest?.installationAddress}
              </AddressBox>
            </DdayNAddress>
            <IconBox>
              <ArrowIconBox>
                <Image src={CaretDown24} alt="RightArrow" />
              </ArrowIconBox>
            </IconBox>
          </Contents>
        ))}
      </ContentsContainer>
    </>
  );
};

const ContentsContainer = styled.div`
  margin-top: 18pt;

  padding-bottom: 75pt;
  @media (min-width: 900pt) {
    width: 580.5pt;
    margin: 0 auto;
  }
`;

const Contents = styled.div`
  padding: 12pt 13.5pt;
  display: flex;
  margin-bottom: 9pt;
  justify-content: space-between;
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;
  border-radius: 6pt;
  cursor: pointer;
  @media (min-width: 900pt) {
    border: 1px solid red;
    padding: 24pt 13.5pt;
  }
`;

const DdayBox = styled.div`
  margin-bottom: 16.5pt;
  cursor: pointer;
`;

const DdayNAddress = styled.div`
  position: relative;
`;

const AddressBox = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  position: relative;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  margin-top: 12pt;
  color: ${colors.main2};
`;

const TopContainer = styled.div`
  @media (min-width: 900pt) {
    width: 580.5pt;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    margin-bottom: 30pt;
  }
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowIconBox = styled.div`
  width: 18pt;
  height: 18pt;
`;

export default RecieveRequest;
