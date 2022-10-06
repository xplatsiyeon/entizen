import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import colors from 'styles/colors';
import useMap from 'utils/useMap';
import { InputAdornment, TextField } from '@mui/material';
import search from 'public/images/search.png';
import mapPin from 'public/images/MapPin.png';
import SearchAddress from 'components/quotation/request/searchAddress';
import { useSelector } from 'react-redux';
import { coordinateAction } from 'store/lnglatSlice';
import { RootState } from 'store/store';
import { useDispatch } from 'react-redux';
import { quotationAction } from 'store/quotationSlice';

interface Props {
  tabNumber: number;
  setTabNumber: Dispatch<SetStateAction<number>>;
}
const FourthStep = ({ tabNumber, setTabNumber }: Props) => {
  const dispatch = useDispatch();
  const { locationList } = useSelector(
    (state: RootState) => state.locationList,
  );
  const { installationLocation } = useSelector(
    (state: RootState) => state.quotationData,
  );
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [buildingNumber, setBuildingNumber] = useState(-1);
  const [buttonActivate, setButtonActivate] = useState<boolean>(false);
  const location: string[] = ['OUTSIDE', 'INSIDE'];
  const tabType: string[] = ['건물 안', '건물 밖'];
  // 지도 실행
  useMap();
  // 지도 모달창 열기
  const handleOnClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setIsSearch((prev) => !prev);
  };
  // 이전버튼
  const HandlePrevBtn = () => {
    setTabNumber(tabNumber - 1);
  };
  // 다음버튼
  const HandleNextBtn = () => {
    if (buttonActivate) {
      dispatch(quotationAction.setStep4(location[buildingNumber]));
      setTabNumber(tabNumber + 1);
    }
  };
  // 버튼 활성화
  useEffect(() => {
    if (locationList.roadAddrPart.length > 1 && buildingNumber !== -1) {
      setButtonActivate(true);
    }
  }, [locationList, buildingNumber]);
  // 데이터 기억
  useEffect(() => {
    const locationIndex = location.indexOf(installationLocation);
    if (locationIndex !== -1) {
      setBuildingNumber(locationIndex);
    }
  }, []);
  // useMap 업데이트
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            tabNumber={buildingNumber.toString()}
            onClick={() => setBuildingNumber(index)}
          >
            {type}
          </Tab>
        ))}
      </TypeBox>
      <TwoBtn>
        <PrevBtn onClick={HandlePrevBtn}>이전</PrevBtn>
        <NextBtn buttonActivate={buttonActivate} onClick={HandleNextBtn}>
          다음
        </NextBtn>
      </TwoBtn>
    </Wrraper>
  );
};

export default FourthStep;

const Wrraper = styled.div`
  position: relative;
  padding-bottom: 96pt;
  z-index: 2;
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
  cursor: pointer;
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
const NextBtn = styled.div<{
  buttonActivate: boolean;
  subscribeNumber?: number;
}>`
  color: ${colors.lightWhite};
  width: ${({ subscribeNumber }) => (subscribeNumber === 0 ? '100%' : '64%')};
  padding: 15pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-top: 30pt;
  background-color: ${({ buttonActivate }) =>
    buttonActivate ? colors.main : colors.blue3};
  cursor: pointer;
  @media (max-width: 899pt) {
    padding: 15pt 0 39pt 0;
  }
`;
const PrevBtn = styled.div`
  color: ${colors.lightWhite};
  width: 36%;
  padding: 15pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-top: 30pt;
  background-color: ${colors.gray};
  cursor: pointer;
  @media (max-width: 899pt) {
    padding: 15pt 0 39pt 0;
  }
`;
const TwoBtn = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  @media (max-width: 899pt) {
    position: fixed;
  }
`;
