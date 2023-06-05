import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';
import colors from 'styles/colors';
import whiteArrow from 'public/images/whiteArrow16.png';
import { useRouter } from 'next/router';
import useCharger from 'hooks/useCharger';

type Props = {
  selectedCharger: number;
  setSelectedCharger: Dispatch<SetStateAction<number>>;
};

const WebChargerInfo = ({ selectedCharger, setSelectedCharger }: Props) => {
  const clickType: string[] = ['완속 충전기', '급속 충전기'];
  const router = useRouter();

  const { slowCharger, fastCharger } = useCharger();

  console.log('🔥 slowCharger : ', slowCharger);
  console.log('🔥 fastCharger : ', fastCharger);

  return (
    <InfoBox>
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
                    ? '0pt 0pt 6pt rgba(137, 163, 201, 0.2)'
                    : 'none',
              }}
            >
              {el}
            </Charger>
          ))}
        </ChargerList>
      </SelectChargerBox>
      <ScrollBox>
        {/* <ChargerTypeNCountBox>
          <ChargerTypeNCount>
            {selectedCharger == 0
              ? '완속 충전기 7kW / 1대'
              : '급속 충전기 100kW / 1대'}
          </ChargerTypeNCount>
          <ChargerNotice>
            * 해당 분석 결과는 실제와 다를 수 있으니 참고용으로 사용해주시기
            바랍니다.
          </ChargerNotice>
        </ChargerTypeNCountBox> */}
        <PredictBoxWrapper>
          {selectedCharger === 0 &&
            slowCharger?.map((el, index) => (
              <PredictBox key={index}>
                <div className="name">{el.year.slice(0, 2)}년 예측치</div>
                <div className="label first">충전량 (월)</div>
                <div className="price">
                  {el.chargeQuantity.toLocaleString()}kW
                </div>
                <div className="label">매출 (월)</div>
                <div className="price">{el.sales.toLocaleString()} 원</div>
              </PredictBox>
            ))}
          {selectedCharger === 1 &&
            fastCharger?.map((el, index) => (
              <PredictBox key={index}>
                <div className="name">{el.year.slice(0, 2)}년 예측치</div>
                <div className="label first">충전량 (월)</div>
                <div className="price">
                  {el.chargeQuantity.toLocaleString()} kW
                </div>
                <div className="label">매출 (월)</div>
                <div className="price">{el.sales.toLocaleString()} 원</div>
              </PredictBox>
            ))}
        </PredictBoxWrapper>
        <Notice>
          <p>
            해당 분석은 7 kW 충전기 1대 기준이며, 결과는 실제와 다를 수 있으니
            참고용으로 사용해 주시기 바랍니다.
          </p>
        </Notice>
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
  );
};

export default WebChargerInfo;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  /* border: 2px solid red; */
  border-right: 1px solid ${colors.lightGray};
  background-color: ${colors.lightWhite};
  @media (max-width: 899.25pt) {
    width: 100%;
  }
`;

const ScrollBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const SelectChargerBox = styled.div`
  padding-left: 21pt;
  padding-right: 21pt;
  @media (max-width: 899.25pt) {
    /* margin-top: 9pt; */
  }
`;

const ChargerList = styled.div`
  width: 100%;
  display: flex;
  height: 36pt;
  margin-top: 30pt;
  background: #f3f4f7;
  border-radius: 21.375pt;
  padding: 3pt;
  @media (max-width: 899.25pt) {
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
  cursor: pointer;
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

  @media (max-width: 899.25pt) {
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

  @media (max-width: 899.25pt) {
    font-size: 7.5pt;
    line-height: 9pt;
    margin: 0;
  }
`;

const PredictBoxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0 15pt 0;
  gap: 11.25pt;
  @media (max-width: 899.25pt) {
    margin: 30pt 0 0;
    padding: 0 15pt;
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
  .name {
    color: ${colors.lightGray2};
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: center;
    letter-spacing: -0.02em;
  }
  .label {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 500;
    font-size: 12pt;
    line-height: 15pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.darkGray};
    margin-top: 24pt;
  }
  .first {
    margin-top: 18pt;
  }
  .price {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 700;
    font-size: 12pt;
    line-height: 15pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main1};
    margin-top: 6pt;
  }
`;
const Notice = styled.div`
  background: ${colors.gray3};
  border-radius: 6pt;
  padding: 9.56pt;
  margin: 12pt 15pt 0 15pt;
  & > p {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 15.75pt;
    letter-spacing: -0.24px;
    color: ${colors.gray6};
  }
`;

const DidHelp = styled.div`
  margin-top: 45pt;
  font-size: 15pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;

  @media (max-width: 899.25pt) {
    /* margin-top: 30pt; */
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
  background-color: ${colors.main};
  color: #ffffff;
  border-radius: 21.75pt;
  cursor: pointer;
  & > span:first-of-type {
    position: relative;
    margin-right: 7.5pt;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-size: 9pt;
    line-height: 12pt;
    font-weight: 700;
    letter-spacing: -0.02em;
    text-align: left;
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
  @media (max-width: 899.25pt) {
  }
`;
