import styled from '@emotion/styled';
import colors from 'styles/colors';
import { GuideData } from './infomation';

type Props = {
  data: GuideData[];
};

const Common = ({ data }: Props) => {
  return (
    <Wrapper>
      {/* <Container>
        <Title>1. 충전기</Title>
        <Body>
          <UnderText>1.1) 출력</UnderText>
          <br />
          <UnderText>
            • 3.5 ~ 400 kW 의 충전기가 있으며, 시간당 충전되는 용량을
            나타냅니다.
          </UnderText>
          <br />
          <br />
          <UnderText>1.2) 가정용, 공용, 경제형 (7 kW 충전기)</UnderText>

          <UnderText>
            • 가정용 충전기는 주로 개인용도로 설치되며, 사업용도로 사용할 수
            없습니다.
          </UnderText>

          <UnderText>
            • 공용 충전기는 사용시 비용이 발생하며, 누구나 비용을 지불하고
            사용할 수 있습니다.
          </UnderText>

          <UnderText>
            • 경제형 충전기는 공용 충전기의 한 종류이며, LCD 등 불필요할 수 있는
            부품을 제외하고 꼭 필요한 부품만으로 구성된 저가형 충전기입니다.
          </UnderText>
          <br />
          <br />
          <UnderText>1.3) 버스용 (300 kW 이상급 충전기)</UnderText>
          <UnderText>
            • 버스용 충전기는 전기버스 전용이며, 충전방식은 Combo2 입니다.
          </UnderText>
          <UnderText>
            • 승용차, 1 ton 트럭 등의 충전방식은 Combo1 입니다.
          </UnderText>
        </Body>
        <Title>2. 설치타입</Title>
        <Body>
          <UnderText>2.1) 벽걸이</UnderText>
          <br />
          <UnderText>
            벽면 설치타입이며, 옥외에서는 주로 외함과 함께 설치됩니다.
          </UnderText>
          <br />
          <br />
          <UnderText>2.2) 스탠드</UnderText>
          <br />
          <UnderText>
            스탠드 설치타입이며, 옥외에서는 캐노피와 함께 설치됩니다.
          </UnderText>
          <br />
          <br />
          <UnderText>2.3) 파워뱅크 분리형</UnderText>
          <br />
          <UnderText>
            충전 전력을 만들어주는 파워뱅크와 전기차에 전력을 공급해주는
            디스펜서로 분리된 제품입니다.
          </UnderText>
          <br />
          <br />
          <UnderText>2.4) 키오스크</UnderText>
          <br />
          <UnderText>
            충전 제어 기능을 충전기에서 분리하고, 키오스크를 통해 충전과 결제를
            하는 시스템입니다.
          </UnderText>
        </Body>
        <Title>3. 충전채널</Title>
        <Body>
          <UnderText>3.1) 싱글</UnderText>
          <br />
          <UnderText>
            충전 건이 1개이며, 충전기 1대당 차량 1대만 충전 가능합니다.
          </UnderText>
          <br />
          <br />
          <UnderText>3.2) 듀얼</UnderText>
          <br />
          <UnderText>
            충전 건이 2개이며, 충전기 1대로 차량 2대 동시 충전이 가능합니다. 단,
            차량 2대 동시 충전시 충전속도가 느려집니다
          </UnderText>
          <br />
          <br />
          <UnderText>3.3) 3모드</UnderText>
          <br />
          <UnderText>
            50 kW 충전기에 해당하는 사양입니다. <br />
            충전기 1대에 3종의 충전 건이 있으며, 국내에서는 일반적으로 CHAdeMO,
            Combo1, AC3상으로 구성되어 있습니다. 동시 충전은 지원되지 않습니다.
          </UnderText>
          <br />
          <UnderText>
            • 2018년 이전 출시된 전기차의 커넥터 종류: CHAdeMO, Combo1, AC3상
          </UnderText>
          <br />
          <UnderText>
            • 2018년 이후 출시된 전기차의 커넥터 종류: Combo1
          </UnderText>
          <br />
          <UnderText>• 테슬라는 자체 충전방식</UnderText>
        </Body>
      </Container> */}
      {data !== undefined ? (
        <div dangerouslySetInnerHTML={{ __html: data![0]?.content }} />
      ) : (
        <></>
      )}
    </Wrapper>
  );
};

export default Common;

const Wrapper = styled.div`
  padding-top: 30pt;
  @media (max-width: 899.25pt) {
    padding-bottom: 180.75pt;
  }

  div {
    width: 100%;
    white-space: pre;
  }
  img {
    width: 100%;
  }
  ul {
    /* list-style: circle !important; */
    /* padding: 10px; */
    /* list-style-position: initial; */
    list-style-position: outside !important;
    li {
      display: flex;
    }
    li::before {
      content: '•';
      border-radius: 50%;
      padding-inline: 5px;
      text-align: center;

      /* margin-inline-end: 5px; */
    }
  }
  ol {
    list-style-type: decimal !important;
    padding: 10px;
  }
  /* :focus {
      border: none;
    } */
  em {
    font-style: italic;
  }
  p {
    width: 100%;
    position: relative;
    word-break: break-all;
    white-space: pre-line;
    span {
      width: 100%;
      display: inline-block;
      word-break: break-all;
      white-space: pre-line;
    }
  }
  span {
    width: 100%;
    display: inline-block;
  }
`;
const Container = styled.div``;

const Title = styled.h3`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  padding-top: 27pt;
  color: ${colors.main2};
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 13.5pt;
    font-weight: 700;
    line-height: 13.5pt;
    letter-spacing: -0.02em;
    text-align: left;
    padding-bottom: 15pt;
  }
`;
const Body = styled.div`
  padding-top: 12pt;
  font-weight: 400;
  font-size: 10.5pt;
  line-height: 16.5pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  .ul-tag {
    /* list-style-type: disc; */
    padding-left: 15pt;
  }
`;

const UnderText = styled.span`
  color: #222222;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 16.5pt;
  letter-spacing: -0.02em;
  text-align: left;
  @media (min-width: 900pt) {
    font-size: 12pt;
    font-weight: 400;
    line-height: 19.5pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
