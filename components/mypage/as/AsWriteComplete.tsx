import styled from '@emotion/styled';
import { Button, Container } from '@mui/material';
import Image from 'next/image';
import ExitImg from 'public/images/X.svg';
import CheckImg from 'public/images/CheckCircle.svg';
import colors from 'styles/colors';
import CommunicationBox from 'components/CommunicationBox';
import { useRouter } from 'next/router';

interface Props {
  title?: string;
  text?: string;
  buttonText?: string;
  routerId?: string | string[] | undefined;
  type?: string;
  [key: string]: any;
}

const AsComplete = ({ text, title, buttonText, routerId, type }: Props) => {
  const router = useRouter();
  const onClickBtn = () => {
    // console.log(routerId);
    if (type === 'AS') {
      router.push({
        pathname: '/mypage',
        query: {
          id: 2,
        },
      });
    } else {
      if (routerId !== null) {
        return router.replace({
          pathname: '/mypage/as',
          query: {
            afterSalesServiceIdx: routerId,
          },
        });
      } else {
        return router.replace('/mypage');
      }
    }
  };
  return (
    <Wrapper>
      <Nav>
        <IconWrap onClick={() => router.push('/mypage')}>
          <Image src={ExitImg} alt="exit" style={{ cursor: 'pointer' }} />
        </IconWrap>
      </Nav>
      <ContainerBox disableGutters>
        <Image src={CheckImg} alt="check" style={{ cursor: 'pointer' }} />
      </ContainerBox>
      <Title>{title}</Title>
      <Footer>
        <TextBox>
          <div>{text}</div>
          <div>
            <CommunicationBox text={'소통하기'} />
          </div>
        </TextBox>
        <Btn onClick={onClickBtn}>{buttonText}</Btn>
      </Footer>
    </Wrapper>
  );
};

export default AsComplete;

const Wrapper = styled.div``;
const Nav = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 15pt;
  padding-top: 15pt;

  @media (min-width: 900pt) {
    display: none;
  }
`;
const IconWrap = styled.div`
  display: none;
  @media (max-width: 899.25pt) {
    display: block;
  }
`;
const ContainerBox = styled(Container)`
  margin-top: 90pt;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 899.25pt) {
    margin-top: 86.6pt;
  }
`;
const Title = styled.h1`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 25.5pt;
  font-weight: 700;
  line-height: 37.5pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #222222;
  padding-top: 23.25pt;
  @media (max-width: 899.25pt) {
    padding-top: 29.625pt;
    font-size: 18pt;
    line-height: 24pt;
    /* margin-top: 24pt; */
    text-align: center;
  }
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
  font-family: 'Spoqa Han Sans Neo';
  display: flex;
  flex-direction: column;
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
  & > div:nth-of-type(2) {
    display: flex;
    justify-content: center;
  }
`;
const Btn = styled.button`
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
