import styled from '@emotion/styled';
import { Box } from '@mui/system';
import Image from 'next/image';
import colors from 'styles/colors';
import InfoImg from 'public/guide/Information.png';

const infomation = () => {
  return (
    <Main>
      <Image src={InfoImg} alt="info" />
      <TextBox>
        <li className="text-item">
          <span className="accent">엔티즌 도서관</span>에서 전기차와 충전기에
          대해 쉽고 간단하게 알려드려요.
        </li>
        <li className="text-item">
          나에게 딱 맞는 충전기와 구독 모델을{' '}
          <span className="accent">가이드</span>에서 확인 해보세요.
        </li>
        <li className="text-item">
          내가 받을 수 있는 보조금 또한 <span className="accent">가이드</span>
          에서 확인 할 수 있어요.
        </li>
        <li className="text-item">
          설치할 장소의 예상 수익을 <span className="accent">홈</span>에서
          확인해보는 것도 잊지마세요!
        </li>
        <li className="text-item">
          <span className="accent">간편견적</span>에서 몇번의 클릭만으로
          예상견적을 확인하고, 연결된 파트너들에게 맞춤 상품을 요청하세요.
        </li>
      </TextBox>
    </Main>
  );
};

export default infomation;

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
  list-style-type: disc;
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
