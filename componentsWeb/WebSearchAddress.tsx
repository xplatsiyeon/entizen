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
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import mapPin from 'public/images/Web-MapPin.png';
import { SlowFast } from 'pages/chargerMap';
import WebChargerInfo from './WebChargerInfo';
import Loader from 'components/Loader';

type Props = {
  setType?: React.Dispatch<React.SetStateAction<boolean>>;
  chargeInfoOpen: boolean;
  setChargeInfoOpen: Dispatch<SetStateAction<boolean>>;
  selectedCharger: number;
  setSelectedCharger: Dispatch<SetStateAction<number>>;
  slowCharger: SlowFast[];
  fastCharger: SlowFast[];
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

const WebSearchAddress = ({
  chargeInfoOpen,
  setChargeInfoOpen,
  setType,
  selectedCharger,
  setSelectedCharger,
  slowCharger,
  fastCharger,
}: Props) => {
  const [searchWord, setSearchWord] = useState<string>('');
  const [results, setResults] = useState<addressType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const keyWord = useDebounce(searchWord, 300);
  const { searchKeyword } = useSelector(
    (state: RootState) => state.locationList,
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(() => e.target.value);
  };
  const handleOnClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const { jibun, roadad, sggnm, sinm } = e.currentTarget.dataset;
    dispatch(
      locationAction.load({
        jibunAddr: jibun,
        roadAddrPart: roadad,
        sggNm: sggnm,
        siNm: sinm,
      }),
    );
    setChargeInfoOpen(true);
  };

  useEffect(() => {
    const findAddresss = async () => {
      if (searchWord === '') {
        setResults([]);
      }
      if (searchWord !== '') {
        try {
          setIsLoading(true);
          let result: any = [];
          const { data } = await axios.get(
            `https://business.juso.go.kr/addrlink/addrLinkApiJsonp.do?currentPage=1&countPerPage=50&keyword=${keyWord}&confmKey=${process.env.NEXT_PUBLIC_ADDRESS_FIND_KEY}&resultType=json`,
          );
          const match = await data.match(/\((.*)\)/);
          let jsonResult = await JSON.parse(match[1].toString()).results.juso;
          await jsonResult?.map((el: any, index: number) => {
            result.push(el);
          });
          setResults(result);
          setChargeInfoOpen(false);
          console.log(result);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      }
    };
    findAddresss();
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
        <Image onClick={() => router.back()} src={btnImg} alt="backBtn" />
        <FindAddress
          placeholder="상호명 또는 주소 검색"
          onChange={handleChange}
          value={searchWord}
        />

        {searchWord.length > 0 ? (
          <Image onClick={() => setSearchWord('')} src={xBtn} alt="xButton" />
        ) : (
          <span className="img-box">
            <Image src={mapPin} alt="searchIcon" layout="fill" />
          </span>
        )}
      </HeaderBox>
      {chargeInfoOpen ? (
        <WebChargerInfo
          selectedCharger={selectedCharger}
          setSelectedCharger={setSelectedCharger}
          slowCharger={slowCharger}
          fastCharger={fastCharger}
        />
      ) : (
        <>
          {keyWord !== '' && isLoading && <Loader />}
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
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  overflow-y: scroll;
`;
const HeaderBox = styled.div`
  padding-left: 15pt;
  padding-right: 12pt;
  border-bottom: 1px solid #e9eaee;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 99999;
  background-color: ${colors.lightWhite};
  .img-box {
    position: relative;
    width: 17.51pt; //width 15pt 인데 안맞아서 약간 수정
    height: 15pt;
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

export default WebSearchAddress;
