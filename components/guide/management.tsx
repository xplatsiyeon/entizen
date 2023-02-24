import styled from '@emotion/styled';
import { Box } from '@mui/system';
import Image from 'next/image';
import colors from 'styles/colors';
import ManagementImg from 'public/guide/Management.png';
import ManagementImg2 from 'public/guide/guide1-4.png';

const management = () => {
  return (
    <Main>
      <ImageWrap>
        <Image src={ManagementImg} alt="info" />
      </ImageWrap>
      <ImageWrap>
        <Image src={ManagementImg2} alt="info" />
      </ImageWrap>
      <TextBox>
        <li className="text-item">
          <span className="accent">A/S</span>에서 편리하고 빠르게 충전기 이슈
          해결을 요청해보세요.
        </li>
        <li className="text-item">
          파트너가 신속하게 처리할 수 있도록 엔티즌이 도와드립니다.
        </li>
        <li className="text-item">
          <span className="accent">소통하기</span>를 통하여 부담없이 파트너 혹은
          엔티즌 전문가와 상담이 가능합니다.
        </li>
        <li className="text-item">
          <span className="accent">내 충전소</span>에서 운영중인 충전소의 제품,
          계약, 파트너 정보를 간편하게 확인하세요.
        </li>
        <li className="text-item">
          (향후 추가) 내 충전기의 충전 실적, 통계 자료들을 한눈에 확인하고,
          운영해보세요.
        </li>
      </TextBox>
    </Main>
  );
};

export default management;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 45pt 15pt 0 15pt;

  @media (max-width: 899.25pt) {
    padding: 27pt 15pt 0 15pt;
  }
`;
const ImageWrap = styled.div`
  width: 645pt;
  &:nth-of-type(1) {
    display: none;
  }
  @media (max-width: 899.25pt) {
    width: auto;
    &:nth-of-type(1) {
      display: block;
    }
    &:nth-of-type(2) {
      display: none;
    }
  }
`;

const TextBox = styled(Box)`
  margin: 30pt auto 0pt;
  width: 645pt;
  padding: 0 10px;
  list-style-type: disc;

  .text-item {
    //padding-bottom: 15pt;
    font-weight: 500;
    font-size: 12pt;
    line-height: 30pt;
    letter-spacing: -0.02em;
  }
  .accent {
    color: ${colors.main};
  }

  @media (max-width: 899.25pt) {
    width: 100%;
    margin: 24pt auto 0;
    .text-item {
      font-size: 10.5pt;
      line-height: 16.5pt;
    }
  }
`;
