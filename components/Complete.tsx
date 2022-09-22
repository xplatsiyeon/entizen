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
  [key: string]: any;
}

const Complete = ({ text, title, buttonText }: Props) => {
  return (
    <Wrapper>
      <Nav>
        <Image src={ExitImg} alt="exit" style={{ cursor: 'pointer' }} />
      </Nav>
      <ContainerBox disableGutters>
        <Image src={CheckImg} alt="exit" style={{ cursor: 'pointer' }} />
      </ContainerBox>
      <Title>{title}</Title>
      <Footer>
        <TextBox>{text}</TextBox>
        <Btn>{buttonText}</Btn>
      </Footer>
    </Wrapper>
  );
};

export default Complete;

const Wrapper = styled.div``;
const Nav = styled.div`
  display: flex;
  justify-content: end;
  padding-right: 15pt;
  padding-top: 15pt;
`;
const ContainerBox = styled(Container)`
  margin-top: 90pt;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  margin-top: 24pt;
  text-align: center;
`;
const Footer = styled.div`
  position: absolute;
  box-sizing: border-box;
  left: 0;
  bottom: 0;
  padding: 0 15pt;
  width: 100%;
`;
const TextBox = styled.div`
  display: flex;
  justify-content: center;
  white-space: pre-wrap;
  text-align: center;
  border: 0.75pt solid ${colors.lightGray};
  padding: 13.5pt 0;
  margin-bottom: 24pt;
  width: 100%;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  border-radius: 6pt;
  color: ${colors.gray2};
  border: 0.75pt solid ${colors.lightGray};
`;
const Btn = styled(Button)`
  background: ${colors.main};
  border-radius: 6pt;
  width: 100%;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  padding: 15pt 0;
  margin-bottom: 30pt;
`;
