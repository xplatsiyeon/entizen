import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import BackImg from 'public/images/back-btn.svg';
import colors from 'styles/colors';
const Alam1_3 = () => {
  const router = useRouter();
  return (
    <Wrapper>
      <Header>
        <div
          className="img-item"
          onClick={() => {
            router.back();
          }}
        >
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
      <Title>서비스 이용 알림 드립니다.</Title>
      <Date>2022.12.28</Date>
      <Line></Line>
      <BodyContainer>
        {/* <h3 className="name">1. 충전기 종류</h3> */}
        <p className="contents">
          서비스 이용 알림 드립니다.
          <br />
          개명 또는 기업명 변경 신청 시 1:1문의 부탁드립니다.
        </p>
      </BodyContainer>
    </Wrapper>
  );
};

export default Alam1_3;
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
