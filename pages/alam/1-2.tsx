import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Image from 'next/image';
import BackImg from 'public/images/back-btn.svg';
import colors from 'styles/colors';
const alamNotice = () => {
  return (
    <Wrapper>
      <Header>
        <div className="img-item">
          <Image
            style={{
              cursor: 'pointer',
              width: '18pt',
              height: '18pt',
            }}
            src={BackImg}
            alt="btn"
          />
        </div>
        <span className="text">공지 사항</span>
      </Header>
      <Title>서비스 이용 약관 개정 안내드립니다.</Title>
      <Date>2022.04.21</Date>
      <Line></Line>
      <BodyContainer>
        <h3 className="name">1. 충전기 종류</h3>
        <p className="contents">
          1.1) 출력
          <br />
          3.5 ~400 kW/h 의 충전기가 있으며, 숫자는 시간당 충전되는 용량을
          나타냅니다.
          <br />
          <br />
          1.2) 가정용, 공용, 경제형 (7kW 충전기)
          <br />- 가정용 충전기는 주로 개인용도로 설치되며, 과금(결재)이
          되지않습니다.
          <br />- 공용 충전기는 사용시 요금이 발생하며, 누구나 비용을 지불하고,
          사용할 수 있습니다.
          <br />- 경제형 충전기는 공용 충전기의 한 종류이며, LCD등 불필요할 수
          있는 부품을 제외하고 꼭 필요한 부품만으로 구성된 충전기입니다.
          <br />
          <br />
          1.3) 버스용, 승용차용 (300~400kW 충전기)
          <br /> - 버스용 충전기는 버스전용이며, 충전 커플러는 Combo2입니다.
          <br />- 승용차용 충전기의 충전 커플러는 Combo1 입니다.
        </p>
      </BodyContainer>
    </Wrapper>
  );
};

export default alamNotice;
const Wrapper = styled.div`
  padding-bottom: 20pt;
`;
const Header = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36pt;
  padding: 9pt 0;
  padding: 0 15pt;
  .img-item {
    position: absolute;
    left: 7pt;
    padding: 5px;
  }
  .text {
    font-weight: 700;
    font-size: 12pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
`;
const Title = styled.p`
  font-weight: 700;
  font-size: 13.5pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  padding-left: 15pt;
  padding-top: 25.5pt;
  color: ${colors.main2};
`;
const Date = styled.div`
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  padding-left: 15pt;
  padding-top: 9pt;
  color: #caccd1;
`;
const Line = styled.div`
  padding-top: 18pt;
  border-bottom: 1px solid #e2e5ed;
  transform: rotate(0deg);
`;
const BodyContainer = styled(Box)`
  padding: 30pt 15pt 0 15pt;
  .name {
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .contents {
    font-weight: 400;
    font-size: 12pt;
    line-height: 19.5pt;
    letter-spacing: -0.02em;
    padding-top: 9pt;
    color: ${colors.main2};
  }
`;
