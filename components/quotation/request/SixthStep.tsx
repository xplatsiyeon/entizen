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
import Modal from 'components/Modal/Modal';
import axios from 'axios';
import { useMutation } from 'react-query';
import { isTokenPostApi } from 'api';

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

const PREDICTION_POST = `https://test-api.entizen.kr/api/quotations/prediction`;

const SixthStep = ({ tabNumber }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(-1);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePurposeOnClick = (index: number) => setClicked(index);
  const [buttonActivate, setButtonActivate] = useState<boolean>(false);
  const { quotationData, locationList } = useSelector(
    (state: RootState) => state,
  );

  console.log(
    '💔 quotationData.installationPurpose 💔',
    quotationData.installationPurpose,
  );

  const { mutate: predictionMutate, isLoading: predictionLoading } =
    useMutation(isTokenPostApi, {
      onSuccess: (resposnse) => {
        dispatch(quotationAction.setRequestData(resposnse.data));
        // dispatch(quotationAction.init());
        router.push('/quotation/request/1-7');
      },
      onError: (error: any) => {
        const text = error.response.data.message;
        setErrorModal((prev) => !prev);
        setErrorMessage(text);
      },
    });

  // 이전버튼
  const HandlePrevBtn = () => {
    dispatch(quotationAction.setTabNumber(tabNumber - 1));
  };
  // 간편 견적 포스트
  const predictionApi = async () => {
    predictionMutate({
      url: '/quotations/prediction',
      data: {
        chargers: quotationData.chargers,
        subscribeProduct: quotationData.subscribeProduct,
        // investRate: quotationData.investRate.toString(),
        investRate: '0.5', // 50%받아와서 1-7 파일에서 데이터 값 변경
        subscribePeriod: quotationData.subscribePeriod,
        installationAddress: locationList.locationList.roadAddrPart,
        installationLocation: quotationData.installationLocation,
        installationPoints: quotationData.installationPoints,
        installationPurpose: quotationData.installationPurpose,
      },
    });
  };

  console.log('💔purpose[clicked].name💔', purpose[clicked].name);

  // 다음버튼
  const HandleNextBtn = async () => {
    if (buttonActivate) {
      const name = purpose[clicked].name;
      dispatch(quotationAction.setStep6(name));
      // console.log('파트');
      await predictionApi();
    }
  };

  // 버튼 활성화
  useEffect(() => {
    if (clicked !== -1) {
      setButtonActivate(true);
      // console.log(purpose[clicked].name);
    }
  }, [clicked]);
  return (
    <Wrraper>
      {errorModal && (
        <Modal
          text={errorMessage}
          color={colors.main}
          click={() => setErrorModal((prev) => !prev)}
        />
      )}
      <Title>충전기 설치 목적을 알려주세요</Title>
      <Intersection>
        {purpose.map((item, index) => (
          <GridItem
            clicked={clicked.toString()}
            index={index.toString()}
            key={index}
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

  @media (max-width: 899.25pt) {
    padding-left: 15pt;
    padding-right: 15pt;
  }
`;
const Title = styled.h1`
  padding-top: 38pt;
  font-weight: 500;
  font-size: 18pt;
  line-height: 24pt;
  text-align: left;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  font-family: 'Spoqa Han Sans Neo';
`;
const Intersection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 11.25pt;
  padding-top: 45pt;
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
  cursor: pointer;
  font-family: 'Spoqa Han Sans Neo';
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
  font-family: 'Spoqa Han Sans Neo';
  border-radius: 6pt;
  @media (max-width: 899.25pt) {
    padding: 15pt 0 39pt 0;
    border-radius: 0;
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
  font-family: 'Spoqa Han Sans Neo';
  border-radius: 6pt;
  @media (max-width: 899.25pt) {
    padding: 15pt 0 39pt 0;
    border-radius: 0;
  }
`;
const TwoBtn = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  gap: 8.7pt;
  @media (max-width: 899.25pt) {
    position: fixed;
    gap: 0;
  }
`;
