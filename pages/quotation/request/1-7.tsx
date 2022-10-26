import React, { useState } from 'react';
import Header from 'components/mypage/request/header';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import mapPin from 'public/images/MapPin.png';
import Image from 'next/image';
import colors from 'styles/colors';
import SliderSizes from 'components/quotation/request/slider';
import QuotationModal from 'components/Modal/QuotationModal';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import { isTokenApi, isTokenPostApi } from 'api';
import { useMutation } from 'react-query';
import { PriceCalculation } from 'utils/calculatePackage';

type Props = {};

interface CalculateValue {
  maxSubscribePricePerMonth: number;
  maxTotalSubscribePrice: number;
  minSubscribePricePerMonth: number;
  minTotalSubscribePrice: number;
}
const TAG = '1-7.tsx';
const Request1_7 = (props: Props) => {
  const router = useRouter();
  const [textValue, setTextValue] = useState('');
  const [buttonActivate, setButtonActivate] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [value, setValue] = useState(50);
  const [disabled, setDisabled] = useState(true);
  const [calculatedValue, setCalculatedValue] = useState<CalculateValue>({
    maxSubscribePricePerMonth: 0,
    maxTotalSubscribePrice: 0,
    minSubscribePricePerMonth: 0,
    minTotalSubscribePrice: 0,
  });
  // react-query // api 호출
  const { mutate, error, isError, isLoading } = useMutation(isTokenPostApi, {
    onSuccess: (res) => {
      console.log(TAG + 'api/quotations/request' + 'success');
      console.log(res);
      setIsModal(!isModal);
    },
    onError: (error) => {
      console.log(TAG + '🔥 api/quotations/request' + 'fail');
      console.log(error);
      alert('다시 시도해주세요.');
      router.push('/');
    },
  });
  // redux 상태
  const { locationList, quotationData } = useSelector(
    (state: RootState) => state,
  );
  const { requestData } = useSelector(
    (state: RootState) => state.quotationData,
  );
  const HandleTextValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTextValue(value);
  };
  // quotations/request post 요청
  const onClickRequest = () => {
    mutate({
      url: '/quotations/request',
      data: {
        chargers: quotationData.chargers,
        subscribeProduct: quotationData.subscribeProduct,
        investRate: quotationData.investRate.toString(),
        subscribePeriod: quotationData.subscribePeriod,
        installationAddress: locationList.locationList.roadAddrPart,
        installationLocation: quotationData.installationLocation,
        installationPoints: quotationData.installationPoints,
        installationPurpose: quotationData.installationPurpose,
        etcRequest: textValue,
      },
    });
  };

  if (isError) {
    console.log(error);
  }
  return (
    <React.Fragment>
      <WebBody>
        <WebHeader />
        <Inner>
          <Wrapper>
            {isModal && (
              <QuotationModal isModal={isModal} setIsModal={setIsModal} />
            )}
            <Header
              title="간편견적"
              exitBtn={true}
              handleOnClick={() => router.push('/')}
            />
            <Body>
              <AddressBox>
                <div className="mapPin-icon">
                  <Image src={mapPin} alt="mapPin-icon" layout="fill" />
                </div>
                <AddressName>{locationList.locationList.jibunAddr}</AddressName>
              </AddressBox>
              <SubTitle>수익지분</SubTitle>
              <NameBox>
                <span className="name">내 수익/투자</span>
                <span className="name">판매자</span>
              </NameBox>
              <SliderSizes
                difaultValue={Number(requestData?.investRate!)}
                value={value}
                setValue={setValue}
                disabled={disabled}
                setDisabled={setDisabled}
                setCalculatedValue={setCalculatedValue}
                calculatedValue={calculatedValue}
              />
              <ContentsWrapper>
                <div className="contents-box">
                  <span className="name">
                    <span className="accent">월</span> 구독료
                  </span>
                  <span>
                    <span className="price">
                      {`${PriceCalculation(
                        requestData?.minSubscribePricePerMonth!,
                      )} ~ ${PriceCalculation(
                        requestData?.maxSubscribePricePerMonth!,
                      )}`}
                    </span>
                  </span>
                </div>
                <div className="line" />
                <div className="contents-box">
                  <span className="name">
                    <span className="accent">총</span> 구독료
                  </span>
                  <span>
                    <span className="price">
                      {`${PriceCalculation(
                        requestData?.minTotalSubscribePrice!,
                      )} ~ ${PriceCalculation(
                        requestData?.maxTotalSubscribePrice!,
                      )}`}
                    </span>
                  </span>
                </div>
              </ContentsWrapper>
              <RequestForm>
                <div className="name">
                  <span>기타 요청사항 (선택)</span>
                  <span>{textValue.length}/500</span>
                </div>
                <textarea
                  className="text"
                  value={textValue}
                  onChange={HandleTextValue}
                  placeholder={`예시1) 광고 LCD가 설치된 충전기로 견적주세요.\n예시2) 7kW는 실내, 50kW는 실외에 설치하려 합니다.\n예시3) 충전요금은 제가 정하고 싶어요.`}
                  maxLength={500}
                  rows={3}
                ></textarea>
              </RequestForm>
            </Body>
            <Btn buttonActivate={buttonActivate} onClick={onClickRequest}>
              구독상품 견적요청
            </Btn>
          </Wrapper>
        </Inner>
        <WebFooter />
      </WebBody>
    </React.Fragment>
  );
};

export default Request1_7;
const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;
  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;
const Inner = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  width: 345pt;
  background: #ffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;
  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0;
    padding: 0;
    box-shadow: none;
    background: none;
  }
  /* @media (max-height: 500pt) {
    height: 100%;
  } */
`;
const Wrapper = styled.div`
  position: relative;
  margin: 0 31.875pt;
  @media (max-width: 899pt) {
    height: 100%;
    margin: 0;
  }
`;
const Body = styled.div`
  padding: 27pt 15pt 45pt 15pt;
  @media (max-width: 899pt) {
    padding: 27pt 15pt 111pt 15pt;
  }
`;
const AddressBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 6pt;
  padding-bottom: 15pt;
  border-bottom: 0.75pt solid ${colors.gray};
  .mapPin-icon {
    position: relative;
    width: 15pt;
    height: 15pt;
  }
`;
const AddressName = styled.h1`
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const SubTitle = styled.h2`
  padding-top: 30pt;
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const NameBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 18pt;
  .name {
    font-weight: 700;
    font-size: 9pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
`;
const ContentsWrapper = styled.div`
  padding-top: 35pt;
  .contents-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .line {
    border-bottom: 0.75pt dashed #e2e5ed;
    margin: 18pt 0;
  }
  .name {
    font-weight: 700;
    font-size: 10.5pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .price {
    font-weight: 700;
    font-size: 15pt;
    line-height: 15pt;
    text-align: right;
    letter-spacing: -0.02em;
    color: ${colors.main};
    ::after {
      content: ' 만원';
      font-weight: 700;
      font-size: 10.5pt;
      line-height: 15pt;
      letter-spacing: -0.02em;
      color: ${colors.main2};
    }
  }
  .accent {
    color: ${colors.main};
  }
`;
const RequestForm = styled.form`
  padding-top: 60pt;
  resize: none;
  .name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .text {
    box-sizing: border-box;
    outline: none;
    width: 100%;
    margin-top: 9pt;
    padding: 12pt 12pt 24pt 12pt;
    border: 0.75pt solid ${colors.gray};
    border-radius: 6pt;
    font-weight: 400;
    font-size: 10.4pt;
    line-height: 18pt;
    letter-spacing: -0.02em;
    ::placeholder {
      color: ${colors.lightGray3};
    }
  }
`;
const Btn = styled.div<{ buttonActivate: boolean }>`
  white-space: pre-wrap;
  position: ablsolute;
  bottom: 0;
  width: 100%;
  padding: 15pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  background-color: ${colors.main};
  border-radius: 8px;
  //margin-bottom: 20pt;

  @media (max-width: 899pt) {
    position: fixed;
    left: 0;
    padding: 15pt 0 39pt 0;
    margin-bottom: 0pt;
  }
`;
