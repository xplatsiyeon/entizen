import styled from '@emotion/styled';
import { InputAdornment, TextField, Typography } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import { useRouter } from 'next/router';
import mapPin from 'public/images/MapPin.png';
import btnImg from 'public/images/back-btn.svg';
import search from 'public/images/search.png';
import whiteArrow from 'public/images/whiteArrow16.png';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import useMap from 'utils/useMap';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { coordinateAction } from 'store/lnglatSlice';
import { useDispatch } from 'react-redux';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import SearchAddress from './searchAddress';
import axios from 'axios';
import ChargerInfo from 'components/ChargerInfo';
import WebSearchAddress from 'componentsWeb/WebSearchAddress';
import Loader from 'components/Loader';

type Props = {};
export interface SlowFast {
  year: string;
  chargeQuantity: number;
  sales: number;
}

const ChargerMap = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [slowCharger, setSlowCharger] = useState<SlowFast[]>([]);
  const [fastCharger, setFastCharger] = useState<SlowFast[]>([]);
  const [selectedCharger, setSelectedCharger] = useState<number>(0);
  const [chargeInfoOpen, setChargeInfoOpen] = useState(false);
  const [type, setType] = useState<boolean>(false);
  const { locationList } = useSelector(
    (state: RootState) => state.locationList,
  );

  const mobile = useMediaQuery({
    query: '(min-width:810pt)',
  });
  useMap();

  const callInfo = async (speed: string) => {
    try {
      const res = await axios.get('https://test-api.entizen.kr/api/charge', {
        params: {
          siDo: locationList.siNm,
          siGunGu: locationList.sggNm ? locationList.sggNm : '',
          chargerSpeed: speed,
        },
      });
      if (speed === 'SLOW') {
        setSlowCharger(res.data.charge);
      }
      if (speed === 'FAST') {
        setFastCharger(res.data.charge);
      }
    } catch (error) {
      console.log('에러입니다.');
      console.log(error);
    }
  };

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
          console.log(response);
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
    if (locationList.siNm) {
      callInfo('SLOW');
      callInfo('FAST');
    }
  }, [locationList]);

  const handleBack = () => {
    router.back();
  };
  const handleOnClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setType(!type);
  };

  return (
    <>
      <WebHeader />
      <Wrapper>
        <WholeMap id="map">
          <Header onClick={handleBack}>
            <Image src={btnImg} alt="backBtn" />
          </Header>
          <SearchMapArea>
            {mobile && (
              <Input
                value={locationList.roadAddrPart}
                type="submit"
                className="searchInput"
                onClick={handleOnClick}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div style={{ width: '15pt', height: '15pt' }}>
                        <Image
                          src={search}
                          alt="searchIcon"
                          layout="intrinsic"
                        />
                      </div>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <div style={{ width: '15pt', height: '15pt' }}>
                        <Image
                          src={mapPin}
                          alt="searchIcon"
                          layout="intrinsic"
                        />
                      </div>
                    </InputAdornment>
                  ),
                }}
              />
            )}
            {!mobile && (
              <Input
                value={locationList.roadAddrPart}
                type="submit"
                className="searchInput"
                onClick={() => router.push('/searchAddress')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div style={{ width: '15pt', height: '15pt' }}>
                        <Image
                          src={search}
                          alt="searchIcon"
                          layout="intrinsic"
                        />
                      </div>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <div style={{ width: '15pt', height: '15pt' }}>
                        <Image
                          src={mapPin}
                          alt="searchIcon"
                          layout="intrinsic"
                        />
                      </div>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          </SearchMapArea>

          {mobile ? (
            <WrapAddress>
              <WebSearchAddress
                setType={setType}
                chargeInfoOpen={chargeInfoOpen}
                setChargeInfoOpen={setChargeInfoOpen}
                selectedCharger={selectedCharger}
                setSelectedCharger={setSelectedCharger}
                slowCharger={slowCharger}
                fastCharger={fastCharger}
              />
            </WrapAddress>
          ) : (
            <ChargerInfo
              // checkHeight={checkHeight}
              // scrollHeight={scrollHeight}
              // changeHeight={changeHeight}
              // setChangeHeight={setChangeHeight}
              selectedCharger={selectedCharger}
              setSelectedCharger={setSelectedCharger}
              slowCharger={slowCharger}
              fastCharger={fastCharger}
            />
          )}
        </WholeMap>
      </Wrapper>
      <WebFooter />
    </>
  );
};

const Wrapper = styled.div`
  width: 900pt;
  margin: 0 auto;
  height: 639pt;
  @media (max-width: 899pt) {
    width: 100vw;
    height: 100vh;
    /* background-color: red; */
  }
`;
const WrapAddress = styled.div`
  position: relative;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  width: 281.25pt;
  height: 100%;
  background-color: #ffffff;
  box-shadow: 4px 0px 10px rgba(137, 163, 201, 0.2);
  z-index: 1002;

  @media (max-width: 899pt) {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
  }
`;

const WholeMap = styled.div`
  position: relative;
  width: 100%;
  height: 495pt;
  display: flex;
  margin-top: 54pt;
  border-radius: 12px;
  border: 0.75pt solid #e2e5ed;

  @media (max-width: 899pt) {
    display: block;
    width: 100vw;
    height: 100vh;
    margin-top: 0;
    position: relative;
    overflow: hidden;
  }
`;

const Header = styled.div`
  display: none;
  @media (max-width: 899pt) {
    display: block;
    position: relative;
    width: 100%;
    z-index: 1000;
    padding-top: 9pt;
    padding-left: 15pt;
    padding-bottom: 10.5pt;
  }
`;

const SearchMapArea = styled.div`
  position: absolute;
  width: 281.25pt;
  top: 0;
  z-index: 1001;
  @media (max-width: 899pt) {
    position: relative;
    height: 50pt;
    width: 100%;
    position: relative;
    z-index: 1000;
    padding-left: 15pt;
    padding-right: 15pt;
  }
`;

const Input = styled(TextField)`
  display: flex;
  margin: 18pt 15pt 0pt;
  border-radius: 6pt;
  background-color: #ffffff;
  border: 1px solid #e9eaee;
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
    //color: ${colors.main2};
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

  @media (max-width: 899pt) {
    width: calc(100% - 30pt);
    margin: 0;
  }
`;

const InfoBox = styled.div<{ clicked: boolean; checkHeight: string }>`
  position: relative;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  width: 281.25pt;
  height: 100%;
  background-color: #ffffff;
  box-shadow: 4px 0px 10px rgba(137, 163, 201, 0.2);

  @media (max-width: 899pt) {
    width: 100%;
    height: ${({ checkHeight }) => checkHeight + 'pt'};
    margin-top: ${({ clicked }) => (clicked ? '12pt' : '204pt')};
  }
`;

const ScrollBox = styled.div<{ scrollHeight: string }>`
  position: relative;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  height: ${({ scrollHeight }) => scrollHeight + 'pt'};
`;

const GoUp = styled.div`
  width: 45pt;
  border: 1.5pt solid #caccd1;
  margin: 0pt 5pt 5pt 5pt;
`;

const SelectChargerBox = styled.div`
  margin-top: 60pt;
  padding-left: 24pt;
  padding-right: 24pt;
  @media (max-width: 899pt) {
    margin-top: 9pt;
  }
`;

const ChargerList = styled.div`
  width: 100%;
  display: flex;
  height: 36pt;
  margin-top: 30pt;
  background: #f3f4f7;
  border-radius: 21.375pt;

  @media (max-width: 899pt) {
    padding: 3pt;
  }
`;

const Charger = styled.div`
  padding: 9pt 26.25pt;
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  border-radius: 21.375pt;
`;

const ChargerTypeNCountBox = styled.div`
  margin-top: 21pt;
`;

const ChargerTypeNCount = styled(Typography)`
  font-size: 15pt;
  font-weight: 700;
  line-height: 21pt;
  letter-spacing: -0.02em;
  text-align: center;
  margin-bottom: 15pt;

  @media (max-width: 899pt) {
    margin-bottom: 0;
  }
`;

const ChargerNotice = styled(Typography)`
  font-size: 10.5pt;
  font-weight: 500;
  line-height: 15pt;
  letter-spacing: -0.18pt;
  text-align: center;
  color: #a6a9b0;
  margin: 0 52.5pt;

  @media (max-width: 899pt) {
    font-size: 7.5pt;
    line-height: 9pt;
    margin: 0;
  }
`;

const PredictBoxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 39pt 15pt 0;
  gap: 11.25pt;

  @media (max-width: 899pt) {
    margin: 30pt 0 0;
  }
`;

const PredictBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 9pt;
  padding-top: 15pt;
  padding-bottom: 15pt;
  & > div:first-of-type {
    padding-left: 33.75pt;
    padding-right: 33.75pt;
    font-style: normal;
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: center;
    color: #a6a9b0;
  }

  & > div:nth-of-type(2) {
    font-style: normal;
    font-weight: 500;
    font-size: 12pt;
    margin-top: 18pt;
    line-height: 15pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: #595757;
  }

  & > div:nth-of-type(3) {
    font-style: normal;
    font-weight: 700;
    font-size: 12pt;
    line-height: 15pt;
    text-align: center;
    letter-spacing: -0.02em;
    margin-top: 6pt;
    color: #5a2dc9;
  }

  & > div:nth-of-type(4) {
    margin-top: 24pt;
    font-style: normal;
    font-weight: 500;
    font-size: 12pt;
    line-height: 15pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: #595757;
  }

  & > div:nth-of-type(5) {
    margin-top: 6pt;
  }
`;

const DidHelp = styled.div`
  margin-top: 48pt;
  font-size: 15pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;

  @media (max-width: 899pt) {
    margin-top: 30pt;
  }
`;

const Guide = styled(Typography)`
  margin-top: 18pt;
  font-size: 12pt;
  font-weight: 500;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #a6a9b0;
`;

const QuotationBtn = styled.div`
  margin: 18pt auto 36pt auto;
  padding: 9pt 12pt;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9pt;
  font-weight: 700;
  background-color: ${colors.main};
  color: #ffffff;
  letter-spacing: -0.02em;
  text-align: left;
  border-radius: 21.75pt;

  & > span:first-of-type {
    position: relative;
    top: 1pt;
  }

  & span {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 12pt;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
`;

export default ChargerMap;
