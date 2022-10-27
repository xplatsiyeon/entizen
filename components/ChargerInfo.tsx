import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Image from 'next/image';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import colors from 'styles/colors';
import whiteArrow from 'public/images/whiteArrow16.png';
import { useRouter } from 'next/router';
import { SlowFast } from 'pages/chargerMap';

type Props = {
  checkHeight: number;
  scrollHeight: number;
  changeHeight: boolean;
  setChangeHeight: Dispatch<SetStateAction<boolean>>;
  selectedCharger: number;
  setSelectedCharger: Dispatch<SetStateAction<number>>;
  slowCharger: SlowFast[];
  fastCharger: SlowFast[];
};

const ChargerInfo = ({
  checkHeight,
  scrollHeight,
  changeHeight,
  setChangeHeight,
  selectedCharger,
  setSelectedCharger,

  slowCharger,
  fastCharger,
}: Props) => {
  const clickType: string[] = ['완속 충전기', '급속 충전기'];
  const router = useRouter();
  const scrollRef = useRef<any>(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startY, setStartY] = useState(0);

  const onDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('시작');
    e.preventDefault();
    setIsDrag(true);
    // const initialPosition = parseInt(e.currentTarget.dataset);
    // setStartY(e.pageY + scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    console.log('끝');
    setIsDrag(false);
  };

  const onDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDrag) {
      console.log('드래그');
      scrollRef.current.scrollLeft = startY - e.pageY;
      setStartY(startY - e.pageY);
      console.log(scrollRef.current.scrollLeft);
    }
  };

  useEffect(() => {
    console.log(startY);
  }, [startY]);

  return (
    <>
      <InfoBox clicked={changeHeight} checkHeight={checkHeight?.toString()}>
        {/* <InfoBox
        clicked={changeHeight}
        checkHeight={startY?.toString()}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        ref={scrollRef}
      > */}
        <GoUp onClick={() => setChangeHeight(!changeHeight)}></GoUp>
        {/* <GoUp onClick={() => setChangeHeight(!startY)}></GoUp> */}
        <Body>
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
          <ScrollBox scrollHeight={scrollHeight.toString()}>
            <ChargerTypeNCountBox>
              <ChargerTypeNCount>
                {selectedCharger == 0
                  ? '완속 충전기 7kW / 1대'
                  : '급속 충전기 100kW / 1대'}
              </ChargerTypeNCount>
              <ChargerNotice>
                * 해당 분석 결과는 실제와 다를 수 있으니 참고용으로 사용해주시기
                바랍니다.
              </ChargerNotice>
            </ChargerTypeNCountBox>
            <PredictBoxWrapper>
              {selectedCharger == 0 &&
                slowCharger.map((el, index) => (
                  <PredictBox key={index}>
                    <div>{el.year}</div>
                    <div>충전량 (월)</div>
                    <div>{el.chargeQuantity.toLocaleString()}kW</div>
                    <div>매출 (월)</div>
                    <div>{el.sales.toLocaleString()} 원</div>
                  </PredictBox>
                ))}
              {selectedCharger == 1 &&
                fastCharger.map((el, index) => (
                  <PredictBox key={index}>
                    <div>{el.year}</div>
                    <div>충전량 (월)</div>
                    <div>{el.chargeQuantity.toLocaleString()} kW</div>
                    <div>매출 (월)</div>
                    <div>{el.sales.toLocaleString()} 원</div>
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
        </Body>
      </InfoBox>
    </>
  );
};

export default ChargerInfo;

const InfoBox = styled.div<{ clicked: boolean; checkHeight: string }>`
  position: relative;
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

const Body = styled.div`
  overflow-y: scroll;
`;

const ScrollBox = styled.div<{ scrollHeight: string }>`
  position: relative;
  /* overflow-y: scroll; */
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
    cursor: pointer;
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
