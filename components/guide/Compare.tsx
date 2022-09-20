import styled from '@emotion/styled';
import { Box } from '@mui/system';
import Image from 'next/image';
import colors from 'styles/colors';
import CompareImg from 'public/guide/Compare.png';

const Contract = () => {
  return (
    <Main>
      <Image src={CompareImg} alt="info" />
      <TextBox style={{ listStyleType: 'disc;' }}>
        <li className="text-item">
          파트너들에게서 온 맞춤 견적들을
          <span className="accent">내 견적서</span>에서 꼼꼼하게 비교해보세요.
        </li>
        <li className="text-item">
          <span className="accent">소통하기</span>에서 파트너 담당자 혹은
          entizen 전문가에게 문의할수도 있습니다!
        </li>
        <li className="text-item">
          꼭 맞는 상품을 찾으셨다면 설치장소 확인 후 최종 견적을 받을 수 있어요.
        </li>
        <li className="text-item">
          상품이 만족스러우시면 함께 할 파트너를 확정해주세요.
        </li>
      </TextBox>
    </Main>
  );
};

export default Contract;

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
