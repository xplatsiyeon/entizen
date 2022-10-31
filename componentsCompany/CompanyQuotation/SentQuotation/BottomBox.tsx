import styled from '@emotion/styled';
import { Button } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import colors from 'styles/colors';
import temp from 'public/mypage/temp-img.svg';
import tempCar from 'public/images/temp-car.jpg';
import fileImg from 'public/mypage/file-icon.svg';
import { css } from '@emotion/react';
import { useCallback } from 'react';
import {
  SentRequestResponse,
  PreQuotationCharger,
} from './SentProvisionalQuoatation';
import { PriceCalculation } from 'utils/calculatePackage';

type Props = {
  pb?: number;
  data: SentRequestResponse;
};

const BottomBox = ({ pb, data }: Props) => {
  const { sendQuotationRequest } = data;
  // 파일 다운로드 함수
  const DownloadFile = useCallback(() => {
    let fileName = 'Charge Point 카탈로그_7 KW';
    let content = 'Charge Point 카탈로그_7 KW 테스트';
    const blob = new Blob([content], {
      type: 'text/plain',
    });
    const url = window.URL.createObjectURL(blob);
    const element = document.createElement('a');
    element.href = url;
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    element.remove();
    window.URL.revokeObjectURL(url);
  }, []);

  return (
    <Wrapper>
      <ImageBox>
        <Image src={temp} alt="icon" />
      </ImageBox>
      <Title>Charge Point</Title>
      <List>
        <Item>
          <span className="name">월 구독료</span>
          <span className="value">
            {PriceCalculation(
              sendQuotationRequest?.preQuotation?.subscribePricePerMonth,
            )}
            원
          </span>
        </Item>
        <Item>
          {/* --- 수익지분 보류 --- */}
          {/* <span className="name">수익지분</span>
          <span className="value">70 %</span> */}
        </Item>
        <Item>
          <span className="name">공사기간</span>
          <span className="value">
            ${sendQuotationRequest?.preQuotation?.constructionPeriod} 일
          </span>
        </Item>

        {sendQuotationRequest.preQuotation.preQuotationCharger.length !== 0 ? (
          <>
            <Item>
              <span className="name">충전요금</span>
              <span className="value">
                {
                  sendQuotationRequest.preQuotation.preQuotationCharger[0]
                    .chargePrice
                }
                원 / kW
              </span>
            </Item>
            <Item>
              <span className="name">충전기 제조사</span>
              <span className="value">
                {
                  sendQuotationRequest.preQuotation.preQuotationCharger[0]
                    .manufacturer
                }
              </span>
            </Item>
          </>
        ) : (
          sendQuotationRequest.preQuotation.preQuotationCharger.map(
            (item, index) => (
              // 수정 필요
              <>
                <Item key={item.preQuotationChargerIdx}>
                  <span className="name">충전요금</span>
                  <span className="value">{item.chargePrice}원 / kW</span>
                </Item>
                <Item>
                  <span className="name">충전기 제조사</span>
                  <span className="value">LS ELECTRIC</span>
                </Item>
              </>
            ),
          )
        )}
      </List>
      <Section>
        <Subtitle>특장점</Subtitle>
        <FlexWrap>
          <Label>구독 상품</Label>
          <FeaturesList>
            <li>QR인증, RFID 인증을 이용한 편리한 결제 시스템</li>
            <li>앱을 통한 충전기 사용현황 확인 및 사용 예약</li>
            <li>24시간 콜센터 운영</li>
          </FeaturesList>
        </FlexWrap>
        <FlexWrap>
          <Label>7 kW 충전기 (공용)</Label>
          <FeaturesList>
            <li>LS ELECTRIC 충전기</li>
            <li>수려한 디자인</li>
          </FeaturesList>
        </FlexWrap>
      </Section>
      <Section grid={true}>
        <Subtitle>충전기 이미지</Subtitle>
        <GridImg>
          <GridItem>
            <Image src={tempCar} alt="img" layout="fill" />
          </GridItem>
          <GridItem>
            <Image src={tempCar} alt="img" layout="fill" />
          </GridItem>
          <GridItem>
            <Image src={tempCar} alt="img" layout="fill" />
          </GridItem>
          <GridItem>
            <Image src={tempCar} alt="img" layout="fill" />
          </GridItem>
        </GridImg>
      </Section>
      <Section className="underLine" pb={pb}>
        <Subtitle>충전기 카탈로그</Subtitle>
        <FileBtn onClick={DownloadFile}>
          <Image src={fileImg} alt="file-icon" />
          Charge Point 카탈로그_7 KW
        </FileBtn>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 60pt;
  .underLine {
    border-bottom: none;
  }

  @media (max-width: 899pt) {
    padding-top: 21pt;
  }
`;

const ImageBox = styled.div`
  width: 48pt;
  height: 48pt;
  position: relative;
  margin-left: 15pt;
  margin-bottom: 15pt;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 15pt;
  line-height: 15pt;
  padding: 0;
  margin-top: 21pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};

  @media (max-width: 899pt) {
    margin-top: 0pt;
    padding: 0 15pt;
  }
`;

const Section = styled.section<{ grid?: boolean; pb?: number }>`
  padding: 18pt 0pt;
  border-bottom: 0.75pt solid ${colors.lightGray};
  padding-bottom: ${({ pb }) => pb + 'pt'};

  ${({ grid }) =>
    grid &&
    css`
      padding-right: 0;
    `};

  @media (max-width: 899pt) {
    padding: 18pt 15pt;
  }
`;
const List = styled.ul`
  padding: 30pt 0 51pt;
  gap: 12pt;
  border-bottom: 0.75pt solid ${colors.lightGray};
  @media (max-width: 899pt) {
    padding: 30pt 15pt 18pt 15pt;
  }
`;
const Item = styled.li`
  display: flex;
  :not(:nth-of-type(1)) {
    padding-top: 12pt;
  }
  .name {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
    flex: 1;
  }
  .value {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: left;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    flex: 2;
  }

  @media (max-width: 899pt) {
    justify-content: space-between;
    .name {
      flex: none;
    }
    .value {
      flex: none;
      text-align: right;
    }
  }
`;
const Subtitle = styled.h2`
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const FlexWrap = styled.div`
  display: flex;
  flex-direction: row;
  &:nth-of-type(2) {
    margin-top: 61pt;
  }
  @media (max-width: 899pt) {
    display: block;
    &:nth-of-type(2) {
      margin-top: 0;
    }
  }
`;
const Label = styled.h3`
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  flex: 1;
  :nth-of-type(1) {
    padding-top: 15pt;
  }
  :nth-of-type(2) {
    padding-top: 24pt;
  }
  @media (max-width: 899pt) {
    flex: none;
  }
`;
const FeaturesList = styled.ol`
  padding-top: 6pt;
  list-style-type: decimal;
  list-style-position: inside;
  flex: 2;
  & li {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 18pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    :not(:nth-of-type(1)) {
      padding-top: 2pt;
    }
  }
  @media (max-width: 899pt) {
    flex: none;
  }
`;
const GridImg = styled.div`
  display: grid;
  overflow-x: scroll;
  grid-template-columns: repeat(4, 1fr);
  padding-top: 15pt;
  gap: 6pt;
`;
const GridItem = styled.div`
  background-color: blue;
  position: relative;
  border-radius: 6pt;
  width: 120pt;
  height: 144pt;
`;
const FileBtn = styled(Button)`
  display: flex;
  gap: 3pt;
  margin-top: 15pt;
  padding: 7.5pt 6pt;
  border: 0.75pt solid ${colors.lightGray3};
  color: ${colors.gray2};
  border-radius: 8px;
`;
const Contents = styled.p`
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  padding-top: 15pt;
  color: ${colors.main2};
`;

export default BottomBox;
