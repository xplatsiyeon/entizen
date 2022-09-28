import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import colors from 'styles/colors';
import Arrow from 'public/guide/Arrow.svg';
import useMap from 'utils/useMap';
import { InputAdornment, TextField } from '@mui/material';
import search from 'public/images/search.png';
import mapPin from 'public/images/MapPin.png';
import { useRouter } from 'next/router';
import SearchAddress from 'components/quotation/request/searchAddress';
import { useSelector } from 'react-redux';
import { coordinateAction } from 'store/lnglatSlice';
import { RootState } from 'store/store';
import { useDispatch } from 'react-redux';

const FourthStep = () => {
  const dispatch = useDispatch();
  const { locationList } = useSelector(
    (state: RootState) => state.locationList,
  );
  const { lnglatList } = useSelector((state: RootState) => state.lnglatList);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [tabNumber, setTabNumber] = useState(-1);
  const tabType: string[] = ['건물 안', '건물 밖'];
  useMap();

  const handleOnClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setIsSearch((prev) => !prev);
  };
  // 지도맵 훅
  // useEffect(() => {
  //   myLocation;
  // }, [lnglatList]);

  // useMap 업데이트
  useEffect(() => {
    if (locationList.roadAddrPart) {
      naver.maps.Service.geocode(
        {
          query: locationList.roadAddrPart,
        },
        function (status, response) {
          if (status === naver.maps.Service.Status.ERROR) {
            if (locationList.roadAddrPart) {
              return alert('Geocode Error, Please check address');
            }
            return alert('Geocode Error, address:' + locationList.roadAddrPart);
          }

          if (response.v2.meta.totalCount === 0) {
            return alert('No result.');
          }

          let item = response.v2.addresses[0];
          dispatch(
            coordinateAction.set({
              lng: item.x,
              lat: item.y,
            }),
          );
        },
      );
    }
  }, [locationList]);

  // 주소 검색 컴포넌트 on/off
  if (isSearch) {
    return <SearchAddress isSearch={isSearch} setIsSearch={setIsSearch} />;
  }

  return (
    <Wrraper>
      <Title>
        설치하고 싶은 지역의 주소와 <br />
        설치 위치를 알려주세요
      </Title>

      <SubTitle pt={45}>주소</SubTitle>
      {/* 주소 검색 박스 */}
      <SearchMapArea>
        <Input
          value="상호명 또는 주소 검색"
          type="submit"
          onClick={handleOnClick}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <div style={{ width: '15pt', height: '15pt' }}>
                  <Image src={search} alt="searchIcon" layout="intrinsic" />
                </div>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <div style={{ width: '15pt', height: '15pt' }}>
                  <Image src={mapPin} alt="searchIcon" layout="intrinsic" />
                </div>
              </InputAdornment>
            ),
          }}
        />
      </SearchMapArea>
      {/* 맵지도 */}
      <Map id="map"></Map>
      <SubTitle pt={30}>충전기 설치 위치 선택</SubTitle>
      <TypeBox>
        {tabType.map((type, index) => (
          <Tab
            key={index}
            idx={index.toString()}
            tabNumber={tabNumber.toString()}
            onClick={() => setTabNumber(index)}
          >
            {type}
          </Tab>
        ))}
      </TypeBox>
    </Wrraper>
  );
};

export default FourthStep;

const Wrraper = styled.div`
  position: relative;
  padding-bottom: 96pt;
`;
const Title = styled.h1`
  padding: 24pt 15pt 0 15pt;
  font-weight: 500;
  font-size: 18pt;
  line-height: 24pt;
  text-align: left;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const SubTitle = styled.div<{ pt: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${({ pt }) => pt + 'pt'};
  padding-left: 15pt;
  padding-right: 15pt;
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const TypeBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 11.25pt;
  padding: 9pt 15pt 0 15pt;
`;
const Tab = styled.span<{ idx: string; tabNumber: string }>`
  font-weight: 400;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.lightGray2};
  width: 100%;
  border: 0.75pt solid ${colors.gray};
  border-radius: 6pt;
  padding: 13.5pt 0;
  text-align: center;
  ${({ idx, tabNumber }) =>
    idx === tabNumber &&
    css`
      border: 0.75pt solid ${colors.main};
      color: ${colors.main};
    `}
`;

const Map = styled.div`
  width: 100%;
  height: 150pt;
  z-index: 999;
  margin-top: 15pt;
`;

const SearchMapArea = styled.div`
  height: 50pt;
  position: relative;
  margin-top: 10.5pt;
  padding: 0 15pt;
`;
const Input = styled(TextField)`
  width: 100%;
  border-radius: 6pt;

  border: 0.75px solid ${colors.lightGray};
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  .MuiInputBase-root {
    padding: 12pt 15pt;
  }
  & input {
    font-size: 10.5pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -2%;
    color: ${colors.lightGray3};
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
