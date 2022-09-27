import styled from '@emotion/styled';
import { Box } from '@mui/system';
import Image from 'next/image';
import colors from 'styles/colors';
import Monitoring from 'public/guide/monitoring.png';

const monitoring = () => {
  return (
    <Main>
      <Image src={Monitoring} alt="info" />
      <TextBox>
        <li className="text-item">
          <span className="accent">내 프로젝트</span>에서 계약과 설치 프로세스
          모니터링을 할 수 있습니다.
        </li>
        <li className="text-item">앤티즌 안에서 안전한 계약을 진행하세요.</li>
        <li className="text-item">
          계약서에 상품내용이 잘 반영 되었는지 검토해주세요!
        </li>
        <li className="text-item">
          프로젝트는 계약, 준비, 설치, 검수, 완료 단계로 진행됩니다.
        </li>
        <li className="text-item">
          현재 진행중인 단계 및 각 단계별 내용과 완료 예정일을 확인 할 수
          있습니다.
        </li>
        <li className="text-item">
          완료 단계에 오면 현장에서 제품 상태를 확인하시고 프로젝트 완료에
          동의해주세요.
        </li>
        <li className="text-item">
          엔티즌에서 최종 확인 후, 프로젝트가 완료 됩니다.
        </li>
      </TextBox>
    </Main>
  );
};

export default monitoring;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 27pt 15pt 0 15pt;
`;
const TextBox = styled(Box)`
  list-style-type: disc;
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
