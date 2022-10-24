import styled from '@emotion/styled';
import { Button, Container } from '@mui/material';
import Image from 'next/image';
import ExitImg from '../public/images/X.svg';
import CheckImg from '../public/images/CheckCircle.svg';
import colors from 'styles/colors';

interface Props {
  title?: string;
  text?: string;
  buttonText?: string;
  handleOnClick?: () => void;
  handleExitClick?: () => void;
  yesExit?: boolean;
  [key: string]: any;
}

const Complete = ({
  text,
  title,
  buttonText,
  handleOnClick,
  handleExitClick,
  yesExit,
}: Props) => {
  return (
    <Wrapper>
      <Nav>
        {yesExit && (
          <Image
            onClick={handleExitClick}
            src={ExitImg}
            alt="exit"
            style={{ cursor: 'pointer' }}
          />
        )}
      </Nav>
      <ContainerBox disableGutters>
        <Image src={CheckImg} alt="exit" style={{ cursor: 'pointer' }} />
      </ContainerBox>
      <Title>{title}</Title>
      <Footer>
        {text && <TextBox>{text}</TextBox>}
        <Btn onClick={handleOnClick}>{buttonText}</Btn>
      </Footer>
    </Wrapper>
  );
};

export default Complete;

const Wrapper = styled.div``;
const Nav = styled.div`
  display: none;
  justify-content: end;
  padding-right: 15pt;
  padding-top: 15pt;

  @media (max-width: 899pt) {
    display: flex;
  }
`;

const ContainerBox = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 899pt) {
    margin-top: 90pt;
  }
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  margin-top: 24pt;
  text-align: center;
`;
const Footer = styled.div`
  width: 50%;
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;
  text-align: center;

  @media (max-width: 899pt) {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    padding: 0 15pt;
  }
`;
const TextBox = styled.div`
  display: flex;
  justify-content: center;
  white-space: pre-wrap;
  text-align: center;
  padding: 13.5pt 0;
  margin-bottom: 24pt;
  width: 100%;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  border-radius: 6pt;
  color: ${colors.gray2};

  @media (max-width: 899pt) {
    border: 0.75pt solid ${colors.lightGray};
  }
`;
const Btn = styled(Button)`
  background: ${colors.main};
  border-radius: 21.75pt;
  width: 30%;
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  margin-bottom: 30pt;
  padding: 9pt 12pt;

  @media (max-width: 899pt) {
    border-radius: 6pt;
    width: 100%;
    padding: 15pt 0;
    font-size: 12pt;
    line-height: 12pt;
  }
`;
