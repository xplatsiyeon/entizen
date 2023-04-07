import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import colors from 'styles/colors';
import mapPin from 'public/images/MapPin.png';
import Image from 'next/image';
import { addressType } from 'hooks/userAddressHooks';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { locationAction } from 'store/locationSlice';
import useCharger from 'hooks/useCharger';

type Props = {
  isSearchBar: boolean;
  setIsSearchBar: Dispatch<SetStateAction<boolean>>;
  results: addressType[];
  isScroll: boolean;
  setIsScroll: Dispatch<SetStateAction<boolean>>;
};

export default function SearchBar({
  isSearchBar,
  setIsSearchBar,
  results,
  isScroll,
  setIsScroll,
}: Props) {
  console.log('🔥 results : ', results);
  const searchBarRef = useRef<HTMLUListElement | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { callInfo } = useCharger();

  const handleCloseSelect = (e: any) => {
    if (
      isSearchBar === true &&
      (!searchBarRef.current || !searchBarRef.current.contains(e.target))
    ) {
      setIsSearchBar(false);
    }
  };

  const onClickAddress = (result: addressType) => {
    const location = {
      jibunAddr: result.jibunAddr,
      roadAddrPart: result.roadAddrPart1,
      sggNm: result.sggNm,
      siNm: result.siNm,
    };

    dispatch(locationAction.load(location));
    dispatch(locationAction.addKeyword(result.roadAddrPart1));

    callInfo('SLOW', location);
    callInfo('FAST', location);
    router.push('/chargerMap');
  };

  useEffect(() => {
    window.addEventListener('click', handleCloseSelect);
    return () => {
      window.removeEventListener('click', handleCloseSelect);
    };
  });

  return (
    <Wrap
      isScroll={isScroll}
      ref={searchBarRef}
      onScroll={() => setIsScroll(true)}
    >
      {results?.map((result) => (
        <li onClick={() => onClickAddress(result)}>
          <span>
            <div style={{ minWidth: '15pt', minHeight: '15pt' }}>
              <Image src={mapPin} alt="searchIcon" layout="intrinsic" />
            </div>
            <p className="name">{result.bdNm ? result.bdNm : result.emdNm}</p>
          </span>

          <p>{result.roadAddrPart1}</p>
        </li>
      ))}
    </Wrap>
  );
}

const Wrap = styled.ul<{ isScroll: boolean }>`
  background-color: rgb(255, 255, 255);
  margin-top: 9.75pt;
  display: flex;
  flex-direction: column;
  z-index: 999;
  padding: 0 56.25pt;
  /* ::-webkit-scrollbar {
    display: initial;
    width: 7.5pt;
  }
  ::-webkit-scrollbar-track {
  }
  ::-webkit-scrollbar-thumb {
    background: #caccd1;
    border-radius: 100px;
    height: 15%;
  } */

  li {
    min-width: 324pt;

    line-height: 20.25pt;
    position: relative;
    z-index: 999;
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    border-radius: 6pt;
    box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
    padding: 12pt 15pt 12pt 18pt;
    margin: 4.875pt 0;
    cursor: pointer;
  }
  li > span {
    display: flex;
    align-items: center;
    gap: 6pt;
    width: 130px;
    margin-right: 28px;
  }

  li > p {
    /* width: 200px; */
  }

  .name {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 700;
    font-size: 13.5pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
    color: ${colors.main1};
  }
`;
