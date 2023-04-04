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
import WebChargerInfo from './WebChargerInfo';
import Loader from 'components/Loader';
import { coordinateAction } from 'store/lnglatSlice';
import { checkSearchedWord } from 'utils/adrressFilter';
import useCharger from 'hooks/useCharger';
import { useMediaQuery } from 'react-responsive';

type Props = {
  setType?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCharger: number;
  setSelectedCharger: Dispatch<SetStateAction<number>>;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  searchWord: string;
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
  selectedCharger,
  setSelectedCharger,
  setSearchWord,
  searchWord,
}: Props) => {
  // const [fakeWord, setFakeWord] = useState<string>('');
  const [results, setResults] = useState<addressType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const { callInfo } = useCharger();

  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  let keyWord = useDebounce(searchWord, 300);
  const { searchKeyword, locationList, isChargeInfoOpen, fakeWord } =
    useSelector((state: RootState) => state.locationList);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setFakeWord('');
    dispatch(locationAction.changeFakeWord('')); // 주소 마스킹
    setSearchWord(() => e.target.value);
    dispatch(locationAction.changeIsChargeInfoOpen(false)); // 충전기 정보 변경
  };

  const handleOnClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const { jibun, roadad, sggnm, sinm } = e.currentTarget.dataset;
    // setFakeWord(roadad!);
    dispatch(locationAction.changeFakeWord(roadad!)); // 주소 마스킹
    dispatch(coordinateAction.setMark(true));
    // 조건준 이유: 모바일일때는 호출 하지 말라고
    if (!mobile) {
      // 검색 키워드
      dispatch(locationAction.addKeyword(searchWord));
      dispatch(
        locationAction.load({
          jibunAddr: jibun,
          roadAddrPart: roadad,
          sggNm: sggnm,
          siNm: sinm,
        }),
      );
    }

    // 예상 매출 금액
    const location = {
      jibunAddr: jibun,
      roadAddrPart: roadad,
      sggNm: sggnm,
      siNm: sinm,
    };

    callInfo('SLOW', location);
    callInfo('FAST', location);

    dispatch(locationAction.changeIsChargeInfoOpen(true)); // 충전기 정보 변경
  };

  // 특수 문자 예외 처리
  const findAddresss = async () => {
    if (keyWord !== '') {
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
      // setChargeInfoOpen(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!mobile && keyWord === '') {
      // 모바일이 아니고 키워드가 없다면 빈값처리
      setResults([]);
      dispatch(locationAction.changeIsChargeInfoOpen(false)); // 충전기 정보 변경
    }
  }, []);

  useEffect(() => {
    if (checkSearchedWord(keyWord) === true) {
      findAddresss();
    } else {
      setSearchWord('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyWord]);

  // 처음 검색 시 배열 0번째 주소로 이동
  useEffect(() => {
    // 조건준 이유: 모바일일때는 호출 하지 말라고
    if (!mobile) {
      dispatch(coordinateAction.setMark(true));
      setSearchWord(searchKeyword);
      dispatch(locationAction.changeIsChargeInfoOpen(true)); // 충전기 정보 변경
    }
  }, []);

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
          placeholder="도로명/지번 주소를 입력해 주세요"
          onChange={handleChange}
          value={fakeWord?.length > 0 ? fakeWord : searchWord}
        />

        {searchWord?.length > 0 ? (
          <span className="exitIcon">
            <Image
              onClick={() => {
                setSearchWord('');
                setResults([]);
                dispatch(locationAction.changeFakeWord('')); // 주소 마스킹
                dispatch(locationAction.changeIsChargeInfoOpen(false)); // 충전기 정보 변경
              }}
              src={xBtn}
              alt="xButton"
              layout="fill"
            />
          </span>
        ) : (
          <span className="img-box">
            <Image src={mapPin} alt="searchIcon" layout="fill" />
          </span>
        )}
      </HeaderBox>
      {isChargeInfoOpen ? (
        <WebChargerInfo
          selectedCharger={selectedCharger}
          setSelectedCharger={setSelectedCharger}
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
  .exitIcon {
    position: relative;
    width: 15pt;
    height: 15pt;
    cursor: pointer;
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
