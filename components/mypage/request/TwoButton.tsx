import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import colors from 'styles/colors';

interface Props {
  onClcikModal: () => void;
}

const TwoButton = ({ onClcikModal }: Props) => {
  const route = useRouter();

  const goToChat = () => route.push('/chatting/1-2');
  return (
    <Wrapper>
      <Blur />
      <BtnBox>
        <LeftBtn onClick={goToChat}>소통하기</LeftBtn>
        <RightBtn onClick={onClcikModal}>이 상품으로 진행하기</RightBtn>
      </BtnBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${colors.lightWhite};
  z-index: 10;
  bottom: 0;
  left: 0;
  padding-bottom: 30pt;
  width: 100%;
  @media (max-width: 899.25pt) {
    position: fixed;
  }
`;
const BtnBox = styled.div`
  margin: 0 15pt;
  display: flex;
  gap: 9pt;
`;
const LeftBtn = styled(Button)`
  padding: 15pt 16.75pt;
  width: 33%;
  border: 0.75pt solid ${colors.main};
  color: ${colors.main};
  background-color: ${colors.lightWhite};
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
`;
const RightBtn = styled(Button)`
  padding: 15pt 32.5pt;
  width: 72%;
  background-color: ${colors.main};
  color: ${colors.lightWhite};
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
`;
// Blur 효과
const Blur = styled.div`
  position: absolute;
  width: 100%;
  bottom: 22.5pt;
  left: 0;
  background: #ffffff;
  filter: blur(7.5pt);
  height: 67.5pt;
`;

export default TwoButton;
