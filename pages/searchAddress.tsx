import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import Image from 'next/image';
import btnImg from 'public/images/back-btn.svg';
import xBtn from 'public/images/XCircle.svg';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import whiteMapPin from 'public/images/mapPinWhite.png';
import useDebounce from 'hooks/useDebounce';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { locationAction } from 'store/locationSlice';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import rootReducer, { RootState } from 'store/store';
import { checkSearchedWord } from 'utils/adrressFilter';
import { coordinateAction } from 'store/lnglatSlice';
import useCharger from 'hooks/useCharger';

type Props = {
  setType?: React.Dispatch<React.SetStateAction<boolean>>;
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

const SearchAddress = (props: Props) => {
  // 주소 검색하면 여기로 넘어옴!

  const [searchWord, setSearchWord] = useState<string>('');
  const [results, setResults] = useState<addressType[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const keyWord = useDebounce(searchWord, 300);
  const { callInfo } = useCharger();
  const { searchKeyword } = useSelector(
    (state: RootState) => state.locationList,
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(() => e.target.value);
  };

  const handleOnClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const { jibun, roadad, sggnm, sinm } = e.currentTarget.dataset;
    // 검색 키워드
    dispatch(locationAction.addKeyword(searchWord));
    dispatch(coordinateAction.setMark(true));
    dispatch(
      locationAction.load({
        jibunAddr: jibun,
        roadAddrPart: roadad,
        sggNm: sggnm,
        siNm: sinm,
      }),
    );
    dispatch(locationAction.changeFakeWord(roadad!)); // 주소 마스킹
    dispatch(locationAction.changeIsChargeInfoOpen(true)); // 충전기 정보 변경
    // 예상 매출 금액
    const location = {
      jibunAddr: jibun,
      roadAddrPart: roadad,
      sggNm: sggnm,
      siNm: sinm,
    };

    callInfo('SLOW', location);
    callInfo('FAST', location);

    console.log('/searchAddress 주소에서 location ', location);

    await dispatch(locationAction.load(location));
    router.push('/chargerMap');
  };

  useEffect(() => {
    const findAddresss = async () => {
      if (searchWord === '') {
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
          // setResults(cc);
          let aa = await jsonResult?.map((el: any, index: number) => {
            cc.push(el);
          });
          setResults(cc);
          // console.log(cc);
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
    if (searchKeyword.length >= 1) {
      setSearchWord(searchKeyword);
    }
  }, [searchKeyword, setSearchWord]);

  return (
    <Container>
      <HeaderBox>
        <Image onClick={() => router.push('/')} src={btnImg} alt="backBtn" />
        <FindAddress
          placeholder="도로명/지번 주소를 입력해 주세요"
          onChange={handleChange}
          value={searchWord}
        />
        {searchWord.length > 0 && (
          <Image onClick={() => setSearchWord('')} src={xBtn} alt="xButton" />
        )}
      </HeaderBox>

      {results.map((el, index) => (
        <SearchResult
          data-jibun={el.jibunAddr}
          data-roadad={el.roadAddrPart1}
          data-sggnm={el.sggNm}
          data-sinm={el.siNm}
          key={index}
          onClick={handleOnClick}
        >
          <IconBox>
            <Image src={whiteMapPin} alt="mapPin" />
          </IconBox>
          <AddressBox>
            <div>{el.roadAddrPart1}</div>
            <div>{el.jibunAddr}</div>
          </AddressBox>
        </SearchResult>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const HeaderBox = styled.div`
  padding-left: 15pt;
  padding-right: 12pt;
  border-bottom: 0.75pt solid #e9eaee;
  display: flex;
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
    font-size: 10.5pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -2%;
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
`;
const SearchResult = styled.div`
  display: flex;
  padding-left: 15pt;
  padding-top: 15pt;
  padding-bottom: 15pt;
  border-bottom: 1px solid #e9eaee;
  cursor: pointer;
`;
const IconBox = styled.div`
  position: relative;
  margin-right: 9pt;
`;
const AddressBox = styled.div`
  display: flex;
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

export default SearchAddress;
