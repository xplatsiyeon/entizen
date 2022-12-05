import styled from '@emotion/styled';
import { Button, Container } from '@mui/material';
import Image from 'next/image';
import ExitImg from '../public/images/X.svg';
import CheckImg from '../public/images/CheckCircle.svg';
import colors from 'styles/colors';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import { useRouter } from 'next/router';
import WhyEntizenWeb from './Main/WhyEntizenWeb';
import WhyEntizen from './Main/WhyEntizen';
import WhyEntizenHorizontal from './Main/WhyEntizenHorizontal';

interface Props {
  title?: string;
  text?: string;
  buttonText?: string;
  handleOnClick?: () => void;
  handleExitClick?: () => void;
  yesExit?: boolean;
  [key: string]: any;
  buttonWeb?: string;
  user?: string;
}

const Complete = ({
  text,
  title,
  buttonText,
  buttonWeb,
  handleOnClick,
  handleExitClick,
  yesExit,
  user,
}: Props) => {
  const router = useRouter();
  return (
    <>
      <Wrapper>
        <IconWrap onClick={() => router.push('/company/quotation')}>
          {yesExit && (
            <Image src={ExitImg} alt="exit" style={{ cursor: 'pointer' }} />
          )}
        </IconWrap>
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
          <WebBtn onClick={handleOnClick}>{buttonText}</WebBtn>
        </Footer>
        <WebTextArea user={user!}>
          <WebTextTitle>소중한 의견 감사드립니다.</WebTextTitle>
          <WebText>
            고객님과 좋은 인연이 있기를 기대합니다. <br />
            견적마감은 영업일 최대 5일 입니다.
          </WebText>
        </WebTextArea>
        <BuyerContainer user={user!}>
          <WhyEntizenHorizontal />
        </BuyerContainer>
      </Wrapper>
    </>
  );
};

export default Complete;

const Wrapper = styled.div`
  margin-top: 43.5pt;
`;

const Nav = styled.div`
  display: none;
  justify-content: end;
  padding-right: 15pt;
  padding-top: 15pt;

  @media (max-width: 899.25pt) {
    display: flex;
  }
`;

const ContainerBox = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 899.25pt) {
    margin-top: 90pt;
  }
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  margin-top: 24pt;
  text-align: center;
  @media (min-width: 900pt) {
    font-size: 25.5pt;
    line-height: 37.5pt;
  }
`;
const Footer = styled.div`
  width: 50%;
  margin: 0 auto;
  position: relative;

  box-sizing: border-box;
  text-align: center;
  bottom: 0;
  @media (max-width: 899.25pt) {
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
  padding: 12pt 0;
  margin-bottom: 33pt;
  width: 100%;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  border-radius: 6pt;
  color: ${colors.gray2};

  @media (max-width: 899.25pt) {
    border: 0.75pt solid ${colors.lightGray};
  }

  @media (min-width: 900pt) {
    white-space: normal;
    font-size: 15pt;
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
  margin-bottom: 145.5pt;
  padding: 9pt 12pt;

  @media (max-width: 899.25pt) {
    border-radius: 6pt;
    width: 100%;
    padding: 15pt 0;
    font-size: 12pt;
    line-height: 12pt;
    margin-bottom: 30pt;
  }

  @media (min-width: 900pt) {
    display: none;
  }
`;

const WebBtn = styled(Button)`
  background: ${colors.main};
  border-radius: 21.75pt;
  /* width: 30%; */
  width: 345px;
  height: 42px;
  border-radius: 6pt;
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  margin-bottom: 60pt;
  padding: 9pt 12pt;

  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const WebTextArea = styled.div<{ user: string }>`
  border: 0.75pt solid #e9eaee;
  border-radius: 6pt;
  width: 345pt;
  height: 108pt;
  margin: 0 auto;
  margin-bottom: 90pt;
  display: ${({ user }) => user !== 'seller' && 'none'};
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const WebTextTitle = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  text-align: center;
  letter-spacing: -0.02em;
  padding-top: 21pt;
  padding-bottom: 15pt;
`;

const WebText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 12pt;
  line-height: 18pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: #747780;
  padding-bottom: 21pt;
`;

const IconWrap = styled.div`
  display: none;
  @media (max-width: 899.25pt) {
    display: block;
    position: absolute;
    top: 20pt;
    left: 250pt;
  }
`;

const BuyerContainer = styled.div<{ user: string }>`
  display: ${({ user }) => user !== 'buyer' && 'none'};
  margin-bottom: 90pt;
`;
