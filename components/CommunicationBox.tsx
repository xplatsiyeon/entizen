import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import RightArrow from 'public/images/black-right-arrow.svg';
import CommunicationIcon from 'public/images/communication-icon.svg';
import colors from 'styles/colors';

interface Props {
  text: string;
  clickHandler: () => void;
}

const CommunicationBox = ({ text, clickHandler }: Props) => {
  const route = useRouter();

  return (
    <Button onClick={clickHandler}>
      <div>
        <Image src={CommunicationIcon} alt="right-arrow" />
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
  margin-top: 15pt;
  padding: 10.5pt 12pt;
  border-radius: 21.75pt;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  background: #f3f4f7;
  color: ${colors.main2};
`;
