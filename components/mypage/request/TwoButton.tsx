import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import colors from 'styles/colors';
import jwt_decode from 'jwt-decode';
import { JwtTokenType } from 'pages/signin';
import useCreateChatting from 'hooks/useCreateChatting';
interface Props {
  onClcikModal: () => void;
  id?: number;
}

const TwoButton = ({ id, onClcikModal }: Props) => {
  const router = useRouter();
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const token: JwtTokenType = jwt_decode(accessToken);
  const { createChatting, createLoading } = useCreateChatting();

  const onClickBtn = () => {
    if (id) {
      // 채팅방 생성 후 채팅방 이동 or 채팅방이 존재하면 바로 채팅방 이동
      createChatting(id!);
    }
  };

  return (
    <Wrapper>
      <Blur />
      <BtnBox>
        <LeftBtn onClick={onClickBtn}>소통하기</LeftBtn>
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
  @media (min-width: 900pt) {
    position: relative;
  }
`;
const BtnBox = styled.div`
  margin: 0 15pt;
  display: flex;
  gap: 9pt;

  @media (min-width: 900pt) {
    display: flex;
    /* flex-direction: column-reverse; */
    width: 255pt;
    margin: 0;
  }
`;
const LeftBtn = styled(Button)`
  padding: 15pt 0;
  border: 0.75pt solid ${colors.main};
  color: ${colors.main};
  background-color: ${colors.lightWhite};
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  flex: 3;
  /* @media (min-width: 900pt) {
    width: 100%;
  } */
`;
const RightBtn = styled(Button)`
  padding: 15pt 32.5pt;
  background-color: ${colors.main};
  color: ${colors.lightWhite};
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  flex: 4;
  &:hover {
    background-color: ${colors.main}!important;
  }
  /* @media (min-width: 900pt) {
    width: 100%;
  } */
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
