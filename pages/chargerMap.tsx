import styled from '@emotion/styled';
import { InputAdornment, TextField, Typography } from '@mui/material';
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

type Props = {};

const ChargerMap = (props: Props) => {
  const { locationList } = useSelector(
    (state: RootState) => state.locationList,
  );
  const dispatch = useDispatch();
  useMap();
  const [changeHeight, setChangeHeight] = useState<boolean>(false);
  const [selectedCharger, setSelectedCharger] = useState<number>(0);
  const [checkHeight, setCheckHeight] = useState<number>(0);
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  useEffect(() => {
    let calcHeight;
    let findHeight;
    const searchInput = document.querySelector('.searchInput');
    const forScroll = document.querySelector('.forScroll');

    if (searchInput && forScroll) {
      findHeight = forScroll.getBoundingClientRect();
      setScrollHeight(
        (document.body.clientHeight - (findHeight.y + findHeight.height + 28)) *
          0.75,
      );
      calcHeight = searchInput.getBoundingClientRect();
      setCheckHeight(
        (document.body.clientHeight - (calcHeight.y + calcHeight.height + 16)) *
          0.75,
      );
      if (changeHeight == false) {
        setCheckHeight(
          document.body.clientHeight -
            (calcHeight.y + calcHeight.height + 16 + 272),
        );
      }
    }
  }, [checkHeight, changeHeight]);

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

    // searchAddressToCoordinate(locationList.roadAddrPart);
  }, [locationList]);

  const clickType: string[] = ['완속 충전기', '급속 충전기'];
  const predictList: {
    year: string;
    amount: string;
    howMuch: string;
    revenue: string;
    money: string;
  }[] = [
    {
      year: '22년 예측치',
      amount: '충전량 (월)',
      howMuch: '1,736kW',
      revenue: '매출 (월)',
      money: '453,096 원',
    },
    {
      year: '23년 예측치',
      amount: '충전량 (월)',
      howMuch: '2,061kW',
      revenue: '매출 (월)',
      money: '583,263 원',
    },
  ];
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const handleOnClick = (e: React.MouseEvent<HTMLInputElement>) => {
    router.push('/searchAddress');
  };
  return (
    <>
      <WholeMap id="map">
        <Header onClick={handleBack}>
          <Image src={btnImg} alt="backBtn" />
        </Header>
        <SearchMapArea>
          <Input
            value={locationList.roadAddrPart}
            type="submit"
            className="searchInput"
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
        <InfoBox clicked={changeHeight} checkHeight={checkHeight?.toString()}>
          <GoUp onClick={() => setChangeHeight(!changeHeight)}></GoUp>
          <SelectChargerBox className="forScroll">
            <ChargerList>
              {clickType.map((el, index) => (
                <Charger
                  key={index}
                  onClick={() => setSelectedCharger(() => index)}
                  style={{
                    color: selectedCharger === index ? '#595757' : '#A6A9B0',
                    backgroundColor:
                      selectedCharger === index ? '#ffffff' : '#F3F4F7',
                    boxShadow:
                      selectedCharger === index
                        ? '0px 0px 6pt rgba(137, 163, 201, 0.2)'
                        : 'none',
                  }}
                >
                  {el}
                </Charger>
              ))}
            </ChargerList>
          </SelectChargerBox>
          <ScrollBox className="dddd" scrollHeight={scrollHeight.toString()}>
            <ChargerTypeNCountBox>
              <ChargerTypeNCount>
                {selectedCharger == 0
                  ? '완속 충전기 7kW / 1대'
                  : '급속 충전기 5kW / 1대'}
              </ChargerTypeNCount>
              <ChargerNotice>
                * 해당 분석 결과는 실제와 다를 수 있으니 참고용으로 사용해주시기
                바랍니다.
              </ChargerNotice>
            </ChargerTypeNCountBox>
            <PredictBoxWrapper>
              {predictList.map((el, index) => (
                <PredictBox key={index}>
                  <div>{el.year}</div>
                  <div>{el.amount}</div>
                  <div>{el.howMuch}</div>
                  <div>{el.revenue}</div>
                  <div>{el.money}</div>
                </PredictBox>
              ))}
            </PredictBoxWrapper>
            <DidHelp>도움이 되셨나요?</DidHelp>
            <Guide>
              간편견적 확인하고, 상품 비교뷰터 충전 사업까지
              <br />A to Z 서비스를 받아보세요!
            </Guide>
            <QuotationBtn>
              <span>간편견적 확인하기</span>
              <span>
                <Image src={whiteArrow} alt="arrow" />
              </span>
            </QuotationBtn>
          </ScrollBox>
        </InfoBox>
      </WholeMap>
    </>
  );
};

const WholeMap = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  z-index: 1000;
  padding-top: 9pt;
  padding-left: 15pt;
  padding-bottom: 10.5pt;
`;

const SearchMapArea = styled.div`
  height: 50pt;
  position: relative;
  z-index: 1000;
  padding-left: 15pt;
  padding-right: 15pt;
`;

const Input = styled(TextField)`
  display: flex;
  width: 100%;
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
    color: ${colors.main2};
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
`;

const InfoBox = styled.div<{ clicked: boolean; checkHeight: string }>`
  position: relative;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  height: ${({ checkHeight }) => checkHeight + 'pt'};
  margin-top: ${({ clicked }) => (clicked ? '12pt' : '204pt')};
  background-color: #ffffff;
  box-shadow: 4px 0px 10px rgba(137, 163, 201, 0.2);
  padding-left: 15pt;
  padding-right: 15pt;
  padding-top: 9pt;
  border-radius: 36px 36px 0px 0px;
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
  border: 2px solid #caccd1;
`;

const SelectChargerBox = styled.div`
  margin-top: 9pt;
  padding-left: 24pt;
  padding-right: 24pt;
`;

const ChargerList = styled.div`
  width: 100%;
  display: flex;
  height: 36pt;
  padding: 3pt;
  background: #f3f4f7;
  border-radius: 21.375pt;
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
`;

const ChargerNotice = styled(Typography)`
  font-size: 7.5pt;
  font-weight: 500;
  line-height: 9pt;
  letter-spacing: -0.18pt;
  text-align: center;
  color: #a6a9b0;
`;

const PredictBoxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 30pt;
  gap: 11.25pt;
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
  margin-top: 30pt;
  font-size: 15pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;
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
