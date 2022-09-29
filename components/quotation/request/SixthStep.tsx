import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import colors from 'styles/colors';
import ElectricCar from 'public/guide/ElectricCar.svg';
import Convenience from 'public/guide/Convenience.svg';
import Cafe from 'public/guide/Cafe.svg';
import Personal from 'public/guide/Personal.svg';
import Etc from 'public/guide/Etc.svg';
import ElectricCarOn from 'public/guide/ElectricCar-on.svg';
import ConvenienceOn from 'public/guide/Convenience-on.svg';
import CafeOn from 'public/guide/Cafe-on.svg';
import PersonalOn from 'public/guide/Personal-on.svg';
import EtcOn from 'public/guide/Etc-on.svg';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { RootState } from 'store/store';
import { quotationAction } from 'store/quotationSlice';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { predictionApi } from 'api/quotations/prediction';
import axios from 'axios';

interface Purpose {
  id: number;
  name: string;
  text: string;
  subtitle?: string;
  img: string;
  onImg: string;
}
interface Props {
  tabNumber: number;
  setTabNumber: Dispatch<SetStateAction<number>>;
}
const purpose: Purpose[] = [
  {
    id: 0,
    name: 'BUSINESS',
    text: '전기차 충전 사업',
    subtitle: '(주유소, 휴게소 등)',
    img: ElectricCar,
    onImg: ElectricCarOn,
  },
  {
    id: 1,
    name: 'WELFARE',
    text: '편의, 복지 제공',
    subtitle: '(아파트, 직장 등)',
    img: Convenience,
    onImg: ConvenienceOn,
  },
  {
    id: 2,
    name: 'MARKETING',
    text: '모객 효과',
    subtitle: '(카페, 쇼핑몰 등)',
    img: Cafe,
    onImg: CafeOn,
  },
  {
    id: 3,
    name: 'PERSONAL',
    text: '개인 용도',
    subtitle: '(단독주택 등)',
    img: Personal,
    onImg: PersonalOn,
  },
  {
    id: 4,
    name: 'ETC',
    text: '기타',
    img: Etc,
    onImg: EtcOn,
  },
];

const SixthStep = ({ tabNumber, setTabNumber }: Props) => {
  const router = useRouter();
  const [clicked, setClicked] = useState(-1);
  const dispatch = useDispatch();
  const { installationPurpose } = useSelector(
    (state: RootState) => state.quotationData,
  );

  const handlePurposeOnClick = (index: number) => setClicked(index);
  const [buttonActivate, setButtonActivate] = useState<boolean>(false);
  const { quotationData, locationList } = useSelector(
    (state: RootState) => state,
  );

  const PREDICTION_POST = `https://test-api.entizen.kr/api/quotations/prediction`;
  const predictionApi = async () => {
    try {
      await axios({
        method: 'post',
        url: PREDICTION_POST,
        data: {
          chargers: quotationData.chargers,
          subscribeProduct: quotationData.subscribeProduct,
          investRate: quotationData.investRate,
          subscribePeriod: quotationData.subscribePeriod,
          installationAddress: locationList.locationList.roadAddrPart,
          installationLocation: quotationData.installationLocation,
          installationPoints: quotationData.installationPoints,
          installationPurpose: quotationData.installationPurpose,
        },
        headers: {
          ContentType: 'application/json',
        },
        withCredentials: true,
      }).then((res) => console.log(res));
    } catch (error) {
      console.log('post 요청 실패');
      console.log(error);
    }
  };
  // 이전버튼
  const HandlePrevBtn = () => {
    setTabNumber((prev) => prev - 1);
  };
  // 다음버튼
  const HandleNextBtn = async () => {
    if (buttonActivate) {
      const name = purpose[clicked].name;
      dispatch(quotationAction.setStep6(name));
      await predictionApi();
      // router.push('/quotation/request/1-7');
    }
  };

  // 버튼 활성화
  useEffect(() => {
    if (clicked !== -1) {
      setButtonActivate(true);
      console.log(purpose[clicked].name);
    }
  }, [clicked]);
  return (
    <Wrraper>
      <Title>충전기 설치 목적을 알려주세요</Title>
      <Intersection>
        {purpose.map((item, index) => (
          <GridItem
            clicked={clicked.toString()}
            index={index.toString()}
            key={item.id}
            onClick={() => handlePurposeOnClick(index)}
          >
            <Image
              src={index === clicked ? item.onImg : item.img}
              alt="electricCar"
            />
            <p>
              {item.text} <br />
              {item.subtitle}
            </p>
          </GridItem>
        ))}
      </Intersection>
      <TwoBtn>
        <PrevBtn onClick={HandlePrevBtn}>이전</PrevBtn>
        <NextBtn buttonActivate={buttonActivate} onClick={HandleNextBtn}>
          예상견적 확인
        </NextBtn>
      </TwoBtn>
    </Wrraper>
  );
};

export default SixthStep;

const Wrraper = styled.div`
  position: relative;
  padding-bottom: 96pt;
  padding-left: 15pt;
  padding-right: 15pt;
`;
const Title = styled.h1`
  padding-top: 24pt;
  font-weight: 500;
  font-size: 18pt;
  line-height: 24pt;
  text-align: left;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const Intersection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 11.25pt;
  padding-top: 30pt;
`;
const GridItem = styled.div<{ index: string; clicked: string }>`
  border-radius: 8px;
  font-weight: 400;
  font-size: 12pt;
  line-height: 18pt;
  text-align: center;
  letter-spacing: -0.02em;
  padding: 15.75pt 0 9.75pt 0;
  border: 0.75pt;
  border-style: solid;
  border-color: ${({ index, clicked }) =>
    index === clicked ? `${colors.main}` : `${colors.lightGray2}`};
  color: ${({ index, clicked }) =>
    index === clicked ? `${colors.main}` : `${colors.lightGray2}`};
`;
const NextBtn = styled.div<{
  buttonActivate: boolean;
  subscribeNumber?: number;
}>`
  color: ${colors.lightWhite};
  width: ${({ subscribeNumber }) => (subscribeNumber === 0 ? '100%' : '64%')};
  padding: 15pt 0 39pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-top: 30pt;
  background-color: ${({ buttonActivate }) =>
    buttonActivate ? colors.main : colors.blue3};
`;
const PrevBtn = styled.div`
  color: ${colors.lightWhite};
  width: 36%;
  padding: 15pt 0 39pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-top: 30pt;
  background-color: ${colors.gray};
`;
const TwoBtn = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`;
