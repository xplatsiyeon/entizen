import styled from '@emotion/styled';
import useCreateChatting from 'hooks/useCreateChatting';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { JwtTokenType } from 'pages/signin';
import RightArrow from 'public/images/black-right-arrow.svg';
import CommunicationIcon from 'public/images/communication-icon.svg';
import colors from 'styles/colors';
import jwt_decode from 'jwt-decode';

interface Props {
  id?: number | string;
  text: string;
  hide?: boolean;
  // clickHandler: () => void;
}

const CommunicationBox = ({ id, text, hide }: Props) => {
  const router = useRouter();
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const token: JwtTokenType = jwt_decode(accessToken!);

  const { createChatting, createLoading } = useCreateChatting();

  const onClickBtn = () => {
    if (id) {
      // 채팅방 생성 후 채팅방 이동 or 채팅방이 존재하면 바로 채팅방 이동
      createChatting(id!);
    } else {
      if (token?.memberType === 'USER') {
        router.push('/chatting');
      } else {
        router.push('/company/chatting');
      }
    }
  };

  return (
    <Button onClick={onClickBtn}>
      <div>
        {hide === false ||
          (hide === undefined && (
            <Image src={CommunicationIcon} alt="right-arrow" />
          ))}
      </div>
      {text}
      <div>
        <Image src={RightArrow} alt="right-arrow" />
      </div>
    </Button>
  );
};
export default CommunicationBox;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10.5pt 12pt;
  border-radius: 21.75pt;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  background: #f3f4f7;
  color: ${colors.main2};
  cursor: pointer;
  font-family: 'Spoqa Han Sans Neo';
  margin-top: 12pt;
  @media (min-width: 900pt) {
    padding: 10.5pt 12pt;
  }
`;
