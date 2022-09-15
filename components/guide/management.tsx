import styled from '@emotion/styled';
import { Box } from '@mui/system';
import Image from 'next/image';
import colors from 'styles/colors';
import ManagementImg from 'public/guide/Management.png';

const management = () => {
  return (
    <Main>
      <Image src={ManagementImg} alt="info" />
      <TextBox style={{ listStyleType: 'disc;' }}>
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
  padding: 27pt 15pt 0 15pt;
`;
const TextBox = styled(Box)`
  margin-top: 24pt;
  padding: 0 10px;
  .text-item {
    padding-bottom: 15pt;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 16.5pt;
    letter-spacing: -0.02em;
  }
  .accent {
    color: ${colors.main};
  }
`;
