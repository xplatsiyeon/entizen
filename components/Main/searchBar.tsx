import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import colors from 'styles/colors';
import search from 'public/images/search.png';
import mapPin from 'public/images/MapPin.png';
import Image from 'next/image';
import JusoHooks, { addressType } from 'hooks/addressHooks';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { locationAction } from 'store/locationSlice';

type Props = {
  isSearchBar: boolean;
  setIsSearchBar: Dispatch<SetStateAction<boolean>>;
  results: addressType[];
};

export default function SearchBar({
  isSearchBar,
  setIsSearchBar,
  results,
}: Props) {
  const searchBarRef = useRef<HTMLUListElement | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCloseSelect = (e: any) => {
    if (
      isSearchBar === true &&
      (!searchBarRef.current || !searchBarRef.current.contains(e.target))
    ) {
      setIsSearchBar(false);
    }
  };

  const onClickAddress = (result: addressType) => {
    dispatch(
      locationAction.load({
        jibunAddr: result.jibunAddr,
        roadAddrPart: result.roadAddrPart1,
        sggNm: result.sggNm,
        siNm: result.siNm,
      }),
    );
    dispatch(locationAction.addKeyword(result.roadAddrPart1));
    router.push('/chargerMap');
  };

  useEffect(() => {
    window.addEventListener('click', handleCloseSelect);
    return () => {
      window.removeEventListener('click', handleCloseSelect);
    };
  });

  return (
    <Wrap ref={searchBarRef}>
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

const Wrap = styled.ul`
  background-color: ${colors.lightWhite};
  position: absolute;
  margin-top: 9.75pt;
  display: flex;
  flex-direction: column;
  gap: 9.75pt;
  min-width: 331.5pt;
  z-index: 9999;
  max-height: 200pt;
  overflow-y: scroll;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 6pt;
    background: ${colors.lightWhite};
    box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
    padding: 12pt 18pt 12pt 18pt;
    cursor: pointer;
  }
  li > span {
    display: flex;
    align-items: center;
    gap: 6pt;
    width: 40%;
  }

  li > p {
    width: 50%;
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
