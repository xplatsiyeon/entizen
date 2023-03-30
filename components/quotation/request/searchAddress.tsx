import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import Image from 'next/image';
import btnImg from 'public/images/back-btn.svg';
import xBtn from 'public/images/XCircle.svg';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import colors from 'styles/colors';
import whiteMapPin from 'public/images/mapPinWhite.png';
import useDebounce from 'hooks/useDebounce';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { locationAction } from 'store/locationSlice';
import { useRouter } from 'next/router';
import { checkSearchedWord } from 'utils/adrressFilter';
import { coordinateAction } from 'store/lnglatSlice';
import { useMediaQuery } from 'react-responsive';

type Props = {
  isSearch?: boolean;
  setIsSearch: Dispatch<SetStateAction<boolean>>;
  setKeyword: Dispatch<SetStateAction<string>>;
};

export interface addressType {
  admCd: string;
  jibunAddr: string;
  roadAddr: string;
  roadAddrPart1: string;
  bdKdcd?: string;
  bdMgtSn?: string;
  bdNm?: string;
  buldMnnm?: string;
  buldSlno?: string;
  detBdNmList?: string;
  emdNm?: string;
  emdNo?: string;
  engAddr?: string;
  liNm?: string;
  lnbrMnnm?: string;
  lnbrSlno?: string;
  mtYn?: string;
  rn?: string;
  rnMgtSn?: string;
  roadAddrPart2?: string;
  sggNm?: string;
  siNm?: string;
  udrtYn?: string;
  zipNo?: string;
}

const SearchAddress = ({ isSearch, setIsSearch, setKeyword }: Props) => {
  const [searchWord, setSearchWord] = useState<string>('');
  const [results, setResults] = useState<addressType[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const keyWord = useDebounce(searchWord, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(() => e.target.value);
  };
  const handleOnClick = (result: addressType) => {
    dispatch(
      locationAction.load({
        jibunAddr: result.jibunAddr,
        roadAddrPart: result.roadAddrPart1,
      }),
    );
    setIsSearch(!isSearch);
    setKeyword(result.roadAddrPart1);
  };
  useEffect(() => {
    const findAddresss = async () => {
      if (searchWord == '') {
        setResults([]);
      }
      if (searchWord !== '') {
        try {
          const { data } = await axios.get(
            `https://business.juso.go.kr/addrlink/addrLinkApiJsonp.do?currentPage=1&countPerPage=50&keyword=${keyWord}&confmKey=${process.env.NEXT_PUBLIC_ADDRESS_FIND_KEY}&resultType=json`,
          );
          const match = await data.match(/\((.*)\)/);

          let jsonResult = await JSON.parse(match[1].toString()).results.juso;
          let cc: any = [];
          setResults(cc);
          let aa = await jsonResult?.map((el: any, index: number) => {
            cc.push(el);
          });

          setResults(cc);
        } catch (err) {
          // console.log(err);
        }
      }
    };

    if (checkSearchedWord(keyWord) === true) {
      findAddresss();
    } else {
      setSearchWord('');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyWord]);
  useEffect(() => {
    // console.log(results !== undefined && results);
  }, [results]);

  return (
    <Wrap>
      <Container>
        <HeaderBox>
          <ImgBox
            onClick={() => {
              setIsSearch(!isSearch);
              // setProgressShow(true);
            }}
          >
            <Image src={btnImg} alt="backBtn" />
          </ImgBox>

          <FindAddress
            placeholder="도로명/지번 주소를 입력해 주세요"
            onChange={handleChange}
            value={searchWord}
          />
          {searchWord.length > 0 && (
            <Image onClick={() => setSearchWord('')} src={xBtn} alt="xButton" />
          )}
        </HeaderBox>

        {results.map((result, index) => (
          <SearchResult key={index} onClick={() => handleOnClick(result)}>
            <IconBox>
              <Image src={whiteMapPin} alt="mapPin" />
            </IconBox>
            <AddressBox>
              <div>{result.roadAddrPart1}</div>
              <div>{result.jibunAddr}</div>
            </AddressBox>
          </SearchResult>
        ))}
      </Container>
    </Wrap>
  );
};

// 어떻게 한건지 다시 정리하기.

const Wrap = styled.div`
  width: 252pt;
  //border: 1px solid blue;
  z-index: 3;
  position: relative;
  background-color: #fff;

  @media (max-width: 899.25pt) {
    width: 100%;
    padding-left: 0pt;
    padding-right: 0pt;
  }
`;

const Container = styled.div`
  width: 100%;
  z-index: 2;
`;

const HeaderBox = styled.div`
  padding-left: 20.625pt;
  padding-right: 0pt;
  border: 0.75pt solid #e9eaee;
  border-radius: 6pt;
  display: flex;

  @media (max-width: 899.25pt) {
    border: 0;
    border-radius: 0;
    border-bottom: 0.75pt solid #e9eaee;
    padding-left: 15pt;
    padding-right: 12pt;
  }
`;

const FindAddress = styled(TextField)`
  width: 100%;
  padding: 0;
  margin-left: 6pt;
  display: flex;
  justify-content: center;

  .MuiInputBase-root {
    padding-top: 12pt;
    padding-bottom: 12pt;
    padding-left: 0pt;
  }
  & input {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    /* color: ${colors.lightGray3}; */
    text-align: left;
    padding: 0;
  }

  ::placeholder {
    color: ${colors.lightGray3};
    font-weight: 400;
  }
  & fieldset {
    border: none;
  }

  @media (max-width: 899.25pt) {
    & input {
      font-size: 10.5pt;
      font-weight: 400;
      line-height: 12pt;
      letter-spacing: -2%;
    }
  }
`;

const SearchResult = styled.div`
  display: flex;
  /* position: fixed; */
  padding-left: 15pt;
  padding-top: 15pt;
  padding-bottom: 15pt;
  border-bottom: 0.75pt solid #e9eaee;
  cursor: pointer;
`;

const IconBox = styled.div`
  position: relative;
  margin-right: 9pt;
`;

const AddressBox = styled.div`
  display: flex;
  /* width: 100%; */
  flex-direction: column;

  & :first-of-type {
    margin-bottom: 6pt;
    font-size: 10.5pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -0.02em;
    padding-top: 1.5pt;
    text-align: left;
  }

  & :nth-of-type(2) {
    font-size: 9pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #747780;
  }
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;

  cursor: pointer;
`;

export default SearchAddress;
