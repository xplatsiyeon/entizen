import React, { useLayoutEffect, useState } from 'react';
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
import { isTokenPostApi } from 'api';
import { useMutation } from 'react-query';
import { PriceCalculation } from 'utils/calculatePackage';
import { SubscribePrice } from 'store/quotationSlice';
import UpArrow from 'public/guide/up_arrow.svg';
import DownArrow from 'public/guide/down_arrow.svg';
import { useMediaQuery } from 'react-responsive';
import DoubleArrow from 'public/images/CaretDoubleDown.svg';
import TwoBtnModal from 'components/Modal/TwoBtnModal';

type Props = {};

interface CalculateValue {
  maxSubscribePricePerMonth: number;
  maxTotalSubscribePrice: number;
  minSubscribePricePerMonth: number;
  minTotalSubscribePrice: number;
  minChargingStationInstallationPrice: number;
  maxChargingStationInstallationPrice: number;
}

interface PredictedProfitTime {
  year?: number;
  month?: number;
}

const Confirm = (props: Props) => {
  const router = useRouter();
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  const [open, setOpen] = useState<boolean>(false);
  const [textValue, setTextValue] = useState('');
  const [buttonActivate, setButtonActivate] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isConfrimModal, setIsConfrimModal] = useState(false);
  const [value, setValue] = useState(50);
  const [disabled, setDisabled] = useState(true);
  const [sliderDisable, setSliderDisable] = useState(false);
  const [subscribeText, setSubscribeText] = useState('');
  const [calculatedValue, setCalculatedValue] = useState<CalculateValue>({
    maxSubscribePricePerMonth: 0,
    maxTotalSubscribePrice: 0,
    minSubscribePricePerMonth: 0,
    minTotalSubscribePrice: 0,
    minChargingStationInstallationPrice: 0,
    maxChargingStationInstallationPrice: 0,
  });

  const [simulVisible, setSimulVisible] = useState(false);

  const [date, setDate] = useState<PredictedProfitTime>({ year: 0, month: 0 });
  // react-query // api 호출
  const { mutate, error, isError, isLoading } = useMutation(isTokenPostApi, {
    onSuccess: (res) => {
      router.push('/quotation/request/complete');
    },
    onError: (error) => {
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

  const {
    subscribeProduct,
    investRate,
    chargersKo,
    chargers,
    subscribePeriod,
  } = useSelector((state: RootState) => state.quotationData);
  const homeType = chargers.every((e) => e.kind === '7-HOME');

  const HandleTextValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTextValue(value);
  };
  // quotations/request post 요청
  const onClickRequest = () => {
    setIsModal(!isModal);
  };

  const setSubScribe = (data: SubscribePrice) => {
    setCalculatedValue({
      maxSubscribePricePerMonth: data?.maxSubscribePricePerMonth!,
      maxTotalSubscribePrice: data?.maxTotalSubscribePrice!,
      minSubscribePricePerMonth: data?.minSubscribePricePerMonth!,
      minTotalSubscribePrice: data?.minTotalSubscribePrice!,
      minChargingStationInstallationPrice:
        data?.minChargingStationInstallationPrice!,
      maxChargingStationInstallationPrice:
        data?.maxChargingStationInstallationPrice!,
    });
  };

  useLayoutEffect(() => {
    const homeCharger = quotationData.chargers.every(
      (el) => el.kind === '7-HOME',
    );
    if (homeCharger) {
      setSliderDisable(true);
    } else {
      setValue(Math.floor(Number(quotationData?.investRate!) * 100));
      setSliderDisable(false);
      setDisabled(false);
    }

    const {
      subscribeProduct,
      partMinAndMaxSubscribePrice,
      entiretyMinAndMaxSubscribePrice,
    } = requestData!;
    if (subscribeProduct === 'ENTIRETY') {
      setSubScribe(entiretyMinAndMaxSubscribePrice);
      setSubscribeText('전체 구독');
    } else if (subscribeProduct === 'PART') {
      setSubScribe(partMinAndMaxSubscribePrice);
      setSubscribeText('부분 구독');
    }

    setDate({
      year: requestData?.predictedProfitTime?.year,
      month: requestData?.predictedProfitTime?.month,
    });

    if (date?.month !== null || date?.year !== null) {
      setSimulVisible(true);
    }
  }, []);

  const onClickModal = () => {
    mutate({
      url: '/quotations/request',
      data: {
        chargers: quotationData.chargers,
        subscribeProduct: quotationData.subscribeProduct,
        investRate: sliderDisable ? '0' : (value / 100).toString(),
        subscribePeriod: quotationData.subscribePeriod,
        installationAddress: locationList.locationList.roadAddrPart,
        installationLocation: quotationData.installationLocation,
        installationPoints: quotationData.installationPoints,
        installationPurpose: quotationData.installationPurpose,
        etcRequest: textValue,
      },
    });
  };

  const HandleModal = () => setIsConfrimModal((prev) => !prev);

  // 앱 -> 웹
  useLayoutEffect(() => {
    // 안드로이드 호출
    const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
    if (userAgent === 'Android_App') {
      window.onClickBackButton = () => HandleModal();
    }
  }, []);

  if (isError) {
    // console.log(error);
  }

  return (
    <React.Fragment>
      <WebBody>
        <WebHeader />
        <Inner>
          <Wrapper>
            {isModal && (
              <QuotationModal
                onClick={onClickModal}
                isModal={isModal}
                setIsModal={setIsModal}
              />
            )}
            {isConfrimModal && (
              <TwoBtnModal
                exit={HandleModal}
                text={
                  '지금 나가시면 \n 작성하신 내용이 삭제됩니다. \n 그래도 괜찮으시겠습니까?'
                }
                leftBtnColor={colors.lightGray2}
                leftBtnText={'그만하기'}
                rightBtnColor={colors.main}
                rightBtnText={'계속 작성하기'}
                leftBtnControl={() => router.replace('/')}
                rightBtnControl={HandleModal}
              />
            )}
            <Header
              title="간편견적"
              exitBtn={true}
              back={true}
              handleOnClick={() => setIsConfrimModal(true)}
              handleBackClick={() => router.back()}
            />
            {mobile && (
              <>
                <TopMobileWrapper
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  <AddressMobileBox open={open}>
                    <div className="mapPin-icon">
                      <Image src={mapPin} alt="mapPin-icon" layout="fill" />
                    </div>
                    <AddressName>
                      {locationList.locationList.roadAddr}
                    </AddressName>
                    {open ? (
                      <ArrowImg>
                        <Image src={DownArrow} alt="down_arrow" layout="fill" />
                      </ArrowImg>
                    ) : (
                      <ArrowImg>
                        <Image src={UpArrow} alt="up_arrow" layout="fill" />
                      </ArrowImg>
                    )}
                  </AddressMobileBox>
                  {open && (
                    <TopInfoMobileBox>
                      {chargersKo?.map((item, index) => (
                        <TextBox>
                          {index === 0 ? (
                            <Name>충전기 종류 및 수량</Name>
                          ) : (
                            <Name />
                          )}
                          <Value>
                            {item?.kind}
                            <br />
                            {item?.standType
                              ? `${item.standType}, ${item.channel}, ${item.count}`
                              : `${item.channel}, ${item.count}`}
                          </Value>
                        </TextBox>
                      ))}

                      <TextBox>
                        <Name>구독상품</Name>
                        <Text>{subscribeText}</Text>
                      </TextBox>
                      <TextBox>
                        <Name>구독기간</Name>
                        <Text>{subscribePeriod} 개월</Text>
                      </TextBox>
                    </TopInfoMobileBox>
                  )}
                </TopMobileWrapper>
                <DownArrowBox>
                  <Image src={DoubleArrow} alt="down_arrow" />
                </DownArrowBox>
              </>
            )}
            <Body>
              {!mobile && (
                <AddressBox>
                  <div className="mapPin-icon">
                    <Image src={mapPin} alt="mapPin-icon" layout="fill" />
                  </div>
                  <AddressName>
                    {locationList?.locationList.roadAddr}
                  </AddressName>
                </AddressBox>
              )}
              {!mobile && (
                <TopInfoBox>
                  {chargersKo?.map((item, index) => (
                    <TextBox key={index}>
                      {index === 0 ? (
                        <Name>충전기 종류 및 수량</Name>
                      ) : (
                        <Name />
                      )}
                      <Value>
                        {item?.kind}
                        <br />
                        {item?.standType
                          ? `${item.standType}, ${item.channel}, ${item.count}`
                          : `${item.channel}, ${item.count}`}
                      </Value>
                    </TextBox>
                  ))}

                  <TextBox>
                    <Name>구독상품</Name>
                    <Text>{subscribeText}</Text>
                  </TextBox>
                  <TextBox>
                    <Name>구독기간</Name>
                    <Text>{subscribePeriod} 개월</Text>
                  </TextBox>
                </TopInfoBox>
              )}

              <SubTitle>수익지분</SubTitle>
              <NameBox>
                <span className="name">내 수익/투자</span>
                <span className="name">판매자</span>
              </NameBox>
              <SliderSizes
                homeCharger={homeType} // 홈충전기
                subscribeProduct={subscribeProduct} // 구독상품
                sliderDisable={sliderDisable} // 슬라이더 view 출력 유무
                value={value} // 슬라이더 기본값. 기본은 50 : 50
                setValue={setValue} //슬라이더 값 변경하는 기능.
                disabled={disabled} //안내메세지 유&무
                setDisabled={setDisabled} //안내메세지 끄고 키는 기능.
                setCalculatedValue={setCalculatedValue} // 계산 금액
                difaultValue={Number(requestData?.investRate!)} // 초기값
                unavailableGraph={true} // 수정 가능 유무
              />
              <ContentsWrapper>
                <div className="contents-box">
                  <span className="name">EV충전소 설치비용</span>
                  <span>
                    <span className="price">
                      {`${PriceCalculation(
                        calculatedValue?.minChargingStationInstallationPrice!,
                      )} ~ ${PriceCalculation(
                        calculatedValue?.maxChargingStationInstallationPrice!,
                      )}`}
                    </span>
                  </span>
                </div>
                <div className="line" />
                <div className="contents-box">
                  <span className="name">
                    <span className="accent">월</span> 구독료
                  </span>
                  <span>
                    <span className="price">
                      {`${PriceCalculation(
                        calculatedValue?.minSubscribePricePerMonth!,
                      )} ~ ${PriceCalculation(
                        calculatedValue?.maxSubscribePricePerMonth!,
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
                        calculatedValue?.minTotalSubscribePrice!,
                      )} ~ ${PriceCalculation(
                        calculatedValue?.maxTotalSubscribePrice!,
                      )}`}
                    </span>
                  </span>
                </div>
              </ContentsWrapper>
              {/* 하단 코드는 런칭 후 2년 후쯤 오픈 한다고함 지우지 마시오 */}
              {/* {simulVisible && (
                <>
                  {date?.month !== null && date?.month !== null && (
                    <SimulContainer>
                      <span className="income">
                        충전기로 얻은 수익이 <br />
                      </span>
                      <span className="title">
                        {date?.year !== 0 && date?.year !== null
                          ? `${date?.year}년`
                          : ''}
                        {date?.month !== null && date?.month !== 0
                          ? `${date?.month}개월 후`
                          : ''}
                      </span>
                      <span className="income">
                        총 투자비용보다 많아질 것으로 기대됩니다.
                      </span>
                    </SimulContainer>
                  )}
                  <Notice>
                    * 해당 결과는 실제와 다를 수 있으니 참고용으로 사용해주시기
                    바랍니다.
                  </Notice>
                </>
              )} */}
              <RequestForm>
                <div className="name">
                  <span>기타 요청사항 (선택)</span>
                  <span>{textValue.length}/500</span>
                </div>
                <textarea
                  className="textarea"
                  value={textValue}
                  onChange={HandleTextValue}
                  placeholder={`예시1) 광고 LCD가 설치된 충전기로 견적주세요.\n예시2) 7kW는 실내, 50kW는 실외에 설치하려 합니다.\n예시3) 충전요금은 제가 정하고 싶어요.`}
                  maxLength={500}
                  rows={3}
                />
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

export default Confirm;
const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  background: #fcfcfc;
  font-family: 'Spoqa Han Sans Neo';
  @media (max-height: 809pt) {
    display: block;
    height: 100%;
    height: 100vh;
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
  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0;
    padding: 0;
    box-shadow: none;
    background: none;
  }
`;
const Wrapper = styled.div`
  position: relative;
  margin: 0 31.875pt;
  @media (max-width: 899.25pt) {
    height: 100%;
    margin: 0;
  }
`;
const Body = styled.div`
  padding: 27pt 15pt 45pt 15pt;
  @media (max-width: 899.25pt) {
    padding: 27pt 15pt 111pt 15pt;
  }
`;
const AddressBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 6pt;
  padding-bottom: 15pt;
  border-bottom: 0.75pt dotted ${colors.gray};
  .mapPin-icon {
    position: relative;
    width: 15pt;
    height: 15pt;
  }
`;

const AddressMobileBox = styled.div<{ open: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 6pt;
  padding-bottom: ${({ open }) => (open ? '48pt' : '')};

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
  font-size: 12pt;
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
    font-size: 12pt;
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
  padding-top: 45pt;
  @media (max-width: 899.25pt) {
    padding-top: 27pt;
  }
  .name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .textarea {
    box-sizing: border-box;
    outline: none;
    width: 100%;
    margin-top: 9pt;
    padding: 12pt 12pt 24pt 12pt;
    border: 0.75pt solid ${colors.gray};
    border-radius: 6pt;
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 18pt;
    letter-spacing: -0.02em;
    resize: none;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    ::placeholder {
      color: ${colors.lightGray3};
      font-family: 'Spoqa Han Sans Neo';
    }
  }
`;
const Btn = styled.div<{ buttonActivate: boolean }>`
  white-space: pre-wrap;
  position: ablsolute;
  bottom: 0;
  padding: 15pt 0;
  margin: 0 15pt;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  font-family: 'Spoqa Han Sans Neo';
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  background-color: ${colors.main};
  border-radius: 6pt;
  cursor: pointer;
  //margin-bottom: 20pt;

  @media (max-width: 899.25pt) {
    position: fixed;
    left: 0;
    padding: 15pt 0 39pt 0;
    margin: 0pt;
    width: 100%;
    border-radius: 0;
  }
`;

const SimulContainer = styled.div`
  background-color: #5221cb;
  padding: 21pt 16.5pt;
  border-radius: 6pt;
  margin: 30pt auto 15pt;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .income {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 500;
    font-size: 12pt;
    line-height: 15pt;
    letter-spacing: -2%;
    text-align: center;
    color: #ffffff;
    white-space: pre;
    opacity: 0.5;
    @media (max-width: 899.25pt) {
      font-size: 10.5pt;
    }
  }
  .title {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 700;
    font-size: 18pt;
    line-height: 15pt;
    letter-spacing: -2%;
    text-align: center;
    color: #ffffff;
    padding: 12pt 0;
    white-space: pre;
    @media (max-width: 899.25pt) {
      font-size: 18pt;
    }
  }
  @media (max-width: 899.25pt) {
    margin: 27pt auto 6pt;
  }
`;

const Notice = styled.span`
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -2%;
  text-align: right;
  color: #747780;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  @media (max-width: 899.25pt) {
    font-size: 7.5pt;
    justify-content: flex-end;
  }
`;

const TopInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30pt 0;
  border-bottom: 0.75pt dotted #e2e5ed;
  background-color: white;
`;

const TopMobileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 37.5pt 18.5625pt 21pt 18.5625pt;
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.4);
  background-color: white;
`;

const TopInfoMobileBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArrowImg = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 6.5pt;
  width: 18pt;
  height: 18pt;
`;

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  :not(:nth-of-type(1)) {
    padding-top: 12pt;
    @media (min-width: 900pt) {
      padding-top: 15pt;
    }
  }
`;

const Name = styled.span`
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

const Text = styled.span`
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  text-align: right;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    // text-align: left;
  }
`;

const Value = styled.span`
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  text-align: right;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  flex: 2;
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 500;
    line-height: 18pt;
    letter-spacing: -0.02em;
    text-align: right;
  }
`;

const DownArrowBox = styled.div`
  padding-top: 21pt;
  margin: 0 auto;

  width: 24pt;
  height: 24pt;
`;
