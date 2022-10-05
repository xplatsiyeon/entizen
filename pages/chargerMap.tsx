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
import WebHeader from 'web-components/WebHeader';
import WebFooter from 'web-components/WebFooter';
import SearchAddress from './searchAddress';
import axios from 'axios';

type Props = {};
interface SlowFast {
  year: string;
  chargeQuantity: number;
  sales: number;
}

const ChargerMap = (props: Props) => {
  const router = useRouter();
  const [slowCharger, setSlowCharger] = useState<SlowFast[]>([]);

  const { locationList } = useSelector(
    (state: RootState) => state.locationList,
  );
  const dispatch = useDispatch();
  // const responsiveWeb = useMediaQuery({ query: '(min-width: 1040px)' });
  const mobile = useMediaQuery({
    query: '(min-width:810pt)',
  });

  useMap();
  const [changeHeight, setChangeHeight] = useState<boolean>(false);
  const [selectedCharger, setSelectedCharger] = useState<number>(0);
  const [checkHeight, setCheckHeight] = useState<number>(0);
  const [scrollHeight, setScrollHeight] = useState<number>(0);

  const [type, setType] = useState<boolean>(false);

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

  const callInfo = async () => {
    try {
      await axios
        .get('https://test-api.entizen.kr/api/charge', {
          params: {
            siDo: locationList.siNm,
            siGunGu: locationList.sggNm ? locationList.sggNm : '',
            chargerSpeed: 'SLOW',
          },
        })
        .then((res) => {
          console.log('요청 응답입니다.');
          let data = [];
          data.push(res.data.charge[0]);
          data.push(res.data.charge[1]);
          console.log('data 배열입니다.');
          console.log(data);
          setSlowCharger(data);
        });
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
      callInfo();
      console.log('슬로우차저입니다. ');
      console.log(slowCharger);
    }
    // const fastRes = axios.get('https://test-api.entizen.kr/api/charge', {
    //   params: {
    //     siDo: locationList.siNm,
    //     siGunGu: locationList.sggNm,
    //     chargerSpeed: 'SLOW',
    //   },
    // });

    // const slowRes = axios.get('https://test-api.entizen.kr/api/charge', {
    //   params: {
    //     siDo: locationList.siNm,
    //     siGunGu: locationList.sggNm,
    //     chargerSpeed: 'FAST',
    //   },
    // });

    // console.log('빠른놈입니다.');
    // console.log(fastRes);
    // console.log('느린놈입니다.');
    // console.log(slowRes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationList]);

  const clickType: string[] = ['완속 충전기', '급속 충전기'];

  const handleBack = () => {
    router.back();
  };
  const handleOnClick = (e: React.MouseEvent<HTMLInputElement>) => {
    //router.push('/searchAddress');
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
              <SearchAddress setType={setType} />
            </WrapAddress>
          ) : (
            <InfoBox
              clicked={changeHeight}
              checkHeight={checkHeight?.toString()}
            >
              <GoUp onClick={() => setChangeHeight(!changeHeight)}></GoUp>
              <SelectChargerBox className="forScroll">
                <ChargerList>
                  {clickType.map((el, index) => (
                    <Charger
                      key={index}
                      onClick={() => setSelectedCharger(() => index)}
                      style={{
                        color:
                          selectedCharger === index ? '#595757' : '#A6A9B0',
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
              <ScrollBox scrollHeight={scrollHeight.toString()}>
                <ChargerTypeNCountBox>
                  <ChargerTypeNCount>
                    {selectedCharger == 0
                      ? '완속 충전기 7kW / 1대'
                      : '급속 충전기 100kW / 1대'}
                  </ChargerTypeNCount>
                  <ChargerNotice>
                    * 해당 분석 결과는 실제와 다를 수 있으니 참고용으로
                    사용해주시기 바랍니다.
                  </ChargerNotice>
                </ChargerTypeNCountBox>
                <PredictBoxWrapper>
                  {selectedCharger == 0 &&
                    predictList.map((el, index) => (
                      <PredictBox key={index}>
                        <div>{el.year}</div>
                        <div>{el.amount}</div>
                        <div>{el.howMuch}</div>
                        <div>{el.revenue}</div>
                        <div>{el.money}</div>
                      </PredictBox>
                    ))}
                  {selectedCharger == 1 &&
                    predictList.map((el, index) => (
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
                  <span
                    onClick={() => {
                      router.push('/quotation/request');
                    }}
                  >
                    간편견적 확인하기
                  </span>
                  <span>
                    <Image src={whiteArrow} alt="arrow" />
                  </span>
                </QuotationBtn>
              </ScrollBox>
            </InfoBox>
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
    width: 100%;
    height: 100%;
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
