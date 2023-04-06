import styled from '@emotion/styled';
import { InputAdornment, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import mapPin from 'public/images/MapPin.png';
import btnImg from 'public/images/back-btn.svg';
import search from 'public/images/search.png';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import useMap from 'utils/useMap';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { coordinateAction } from 'store/lnglatSlice';
import { useDispatch } from 'react-redux';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import WebSearchAddress from 'componentsWeb/WebSearchAddress';
import WebChargerInfo from 'componentsWeb/WebChargerInfo';
import MapBiggerIcon from 'public/images/MapBiggerIcon.svg';
import { css } from '@emotion/react';
import colors from 'styles/colors';

type Props = {};
export interface SlowFast {
  year: string;
  chargeQuantity: number;
  sales: number;
}

const ChargerMap = (props: Props) => {
  useMap();
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedCharger, setSelectedCharger] = useState<number>(0);
  const [type, setType] = useState<boolean>(false);
  const [biggerClick, setBiggerClick] = useState(false);
  const [searchWord, setSearchWord] = useState<string>('');
  const { locationList, searchKeyword } = useSelector(
    (state: RootState) => state.locationList,
  );
  console.log('⭐️ chargerMap 컴포넌트에서 locationList : ', locationList);

  useEffect(() => {
    if (locationList.roadAddrPart) {
      naver.maps.Service.geocode(
        {
          query: locationList.jibunAddr,
        },
        function (status, response) {
          if (status === naver.maps.Service.Status.ERROR) {
            if (locationList.roadAddrPart) {
              return alert('Geocode Error, Please check address');
            }
            return alert('Geocode Error, address:' + locationList.roadAddrPart);
          }
          if (response.v2.meta?.totalCount === 0) {
            return alert('No result.');
          }

          let item = response.v2.addresses[0]!;
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

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [biggerClick]);

  return (
    <>
      <WebHeader />
      <Wrapper>
        {/* 모바일 주소 검색 헤더 */}
        <HeaderWrap>
          <Header onClick={handleBack} biggerClick={biggerClick}>
            <ArrowIMGBox>
              <Image src={btnImg} alt="backBtn" />
            </ArrowIMGBox>
            <HeaderText>예상매출</HeaderText>
          </Header>
          <SearchMapArea>
            {/* 모바일에서 주소 검색하는 input 창 주소 검색 누르면 /searchAddress로 넘어감*/}
            <Input
              value={locationList.roadAddrPart ? locationList.roadAddrPart : ''}
              type="submit"
              className="searchInput"
              onClick={() => router.push('/searchAddress')}
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
        </HeaderWrap>
        <FlexBox>
          <WebWrap>
            {/* 웹에서 주소 + 예상 견적 보여주는 컴포넌트 */}
            <WrapAddress>
              <WebSearchAddress
                searchWord={searchWord}
                setSearchWord={setSearchWord}
                setType={setType}
                selectedCharger={selectedCharger}
                setSelectedCharger={setSelectedCharger}
              />
            </WrapAddress>
          </WebWrap>
          <MapWrap biggerClick={biggerClick}>
            {/* 실제 지도 나오는 컴포넌트 */}
            <WholeMap id="map" biggerClick={biggerClick}></WholeMap>
            <MapBiggerIconBox
              onClick={() => {
                setBiggerClick(true);
              }}
              biggerClick={biggerClick}
            >
              <Image src={MapBiggerIcon} />
            </MapBiggerIconBox>
            <Header className="addressHeader" biggerClick={biggerClick}>
              <BigMapAddressBack>
                <Image
                  src={btnImg}
                  alt="backBtn"
                  onClick={() => {
                    setBiggerClick(false);
                  }}
                />
              </BigMapAddressBack>
              <BigMapAddress>
                {locationList.roadAddrPart ? locationList.roadAddrPart : ''}
              </BigMapAddress>
            </Header>
          </MapWrap>
        </FlexBox>
        <MobWrap>
          {/* 모바일에서 예상 견적 보여주는 컴포넌트 */}
          <WebChargerInfo
            selectedCharger={selectedCharger}
            setSelectedCharger={setSelectedCharger}
          />
        </MobWrap>
      </Wrapper>
      <WebFooter />
    </>
  );
};

const WebWrap = styled.div`
  @media (max-width: 899.25pt) {
    display: none;
  }
`;
const MobWrap = styled.div`
  @media (min-width: 900pt) {
    display: none;
  }
`;
const Wrapper = styled.div`
  width: 900pt;
  margin: 0 auto;
  height: 639pt;
  @media (max-width: 899.25pt) {
    width: 100vw;
    height: 100vh;
  }
`;

const HeaderWrap = styled.div`
  z-index: 999;
  position: sticky;
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${colors.lightWhite};
`;

const WrapAddress = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  width: 281.25pt;
  height: 495pt;
  background-color: #ffffff;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
  }
`;

const FlexBox = styled.div`
  display: flex;
  border: 0.75pt solid #e2e5ed;
  border-radius: 6pt;
  box-shadow: 4px 0px 10px rgba(137, 163, 201, 0.2);
  /* overflow: hidden; */
  position: relative;
  margin-top: 54pt;
  @media (max-width: 899.25pt) {
    display: block;
    margin-top: 0;
    border: none;
    box-shadow: none;
    position: static;
  }
`;
const MapWrap = styled.div<{ biggerClick?: boolean }>`
  flex: 1;
  position: relative;

  @media (max-width: 899.25pt) {
    /* margin-top: 160px; */
  }
  .addressHeader {
    ${({ biggerClick }) =>
      biggerClick &&
      css`
        display: block;
        z-index: 11;
        background-color: white;
        position: fixed;
        top: 0;
        display: flex;
        padding-top: 17.25pt;
        padding-bottom: 21pt;
        border-bottom: 0.75pt solid #e9eaee;
      `}
  }
  &.bigger {
    .addressHeader {
      display: block;
      z-index: 11;
      background-color: white;
      position: fixed;
      top: 0;
    }
  }
`;
const MapBiggerIconBox = styled.div<{ biggerClick?: boolean }>`
  position: absolute;
  z-index: 300;
  top: 0;
  right: 15pt;
  cursor: pointer;
  display: ${({ biggerClick }) => (biggerClick ? 'none' : '')};
  @media (min-width: 900pt) {
    display: none;
  }
`;

const WholeMap = styled.div<{ biggerClick?: boolean }>`
  position: fixed;
  height: 495pt;
  display: flex;

  @media (max-width: 899.25pt) {
    display: block;
    width: calc(100vw - 30pt);
    height: 42.5vw;
    margin: 0 15pt;
    position: relative;
    overflow: hidden;
    ${({ biggerClick }) =>
      biggerClick &&
      css`
        width: 100vw;
        height: 100vh;
        margin: 0;
        z-index: 11;
        transform: translateY(-91.5pt);
        .addressHeader {
          display: block;
          z-index: 11;
          background-color: white;
        }
      `};

    &.bigger {
      width: 100vw;
      height: 100vh;
      margin: 0;
      z-index: 11;
      transform: translateY(-91.5pt);
      .addressHeader {
        display: block;
        z-index: 11;
        background-color: white;
      }
    }
  }
`;

const Header = styled.div<{ biggerClick?: boolean }>`
  display: none;
  @media (max-width: 899.25pt) {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    z-index: 10;
    padding-top: 9pt;
    padding-bottom: 10.5pt;

    &.addressHeader {
      display: ${({ biggerClick }) => (biggerClick ? 'block' : 'none')};
    }
  }
`;

const HeaderText = styled.span`
  display: flex;
  justify-content: center;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 700;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #222222;
  margin: 0 auto;
`;

const ArrowIMGBox = styled.div`
  position: absolute;
  left: 15pt;
  top: 9pt;
`;

const SearchMapArea = styled.div`
  display: none;
  @media (max-width: 899.25pt) {
    display: block;
    height: 50pt;
    width: 100%;
    position: relative;
    z-index: 10;
    padding-left: 15pt;
    padding-right: 15pt;
  }
`;

const Input = styled(TextField)`
  display: flex;
  margin: 18pt 15pt 0pt;
  border-radius: 6pt;
  background-color: #ffffff;
  border: 0.75pt solid #e9eaee;
  justify-content: center;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
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
    text-align: left;
    padding: 0;
  }

  & span > img {
    width: 15pt;
    height: 15pt;
  }
  & fieldset {
    border: none;
  }

  @media (max-width: 899.25pt) {
    margin: 0;
  }
`;

const BigMapAddress = styled.span`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 700;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #222222;
  padding-left: 15.75pt;
`;

const BigMapAddressBack = styled.div`
  padding-left: 20.25pt;
`;

export default ChargerMap;
