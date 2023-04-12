import styled from '@emotion/styled';
import { Container } from '@mui/material';
import Image from 'next/image';
import ExitImg from '../public/images/X.svg';
import CheckImg from '../public/images/CheckCircle.svg';
import colors from 'styles/colors';
import { useRouter } from 'next/router';

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
  cssDetail?: boolean;
  textChange?: boolean;
  isPreWrap?: boolean;
}

const CompleteMessage = ({
  text,
  title,
  buttonText,
  buttonWeb,
  handleOnClick,
  handleExitClick,
  yesExit,
  user,
  cssDetail,
  textChange,
  isPreWrap,
}: Props) => {
  const router = useRouter();

  // 클릭 라우팅 함수
  const onCLickRouter = () => {
    if (yesExit) {
      router.push('/');
    } else {
      router.push('/company/quotation?id=1');
    }
  };

  return (
    <>
      <Wrapper>
        <IconWrap onClick={onCLickRouter}>
          {yesExit && (
            <Image src={ExitImg} alt="exit" style={{ cursor: 'pointer' }} />
          )}
        </IconWrap>
        <ContainerBox disableGutters>
          <Image src={CheckImg} alt="exit" style={{ cursor: 'pointer' }} />
        </ContainerBox>
        <Title cssDetail={Boolean(cssDetail)}>{title}</Title>
        <Footer>
          {text && (
            <TextBox isPreWrap={isPreWrap} cssDetail={Boolean(cssDetail)}>
              {text}
            </TextBox>
          )}
          <Btn onClick={handleOnClick}>{buttonText}</Btn>
          <WebBtn onClick={handleOnClick}>{buttonText}</WebBtn>
        </Footer>
        <WebTextArea user={user!}>
          <WebTextTitle>소중한 견적 감사드립니다.</WebTextTitle>
          {textChange ? (
            <WebText>
              고객님과 좋은 인연이 있기를 기대합니다. <br /> <br />
              고객님과의 대화나, 엔티즌에 문의사항이 있으시면 <br />
              소통하기 기능을 활용해주세요!
            </WebText>
          ) : (
            <WebText>
              고객님과 좋은 인연이 있기를 기대합니다. <br />
              견적마감은 영업일 최대 5일 입니다.
            </WebText>
          )}
        </WebTextArea>
        <BuyerContainer user={user!}>
          {/* 임시로 막음 */}
          {/* <WhyEntizenHorizontal /> */}
        </BuyerContainer>
      </Wrapper>
    </>
  );
};

export default CompleteMessage;

const Wrapper = styled.div`
  margin-top: 12.9375pt;
  @media (min-width: 900pt) {
    margin-top: 97.5pt;
  }
`;

const Nav = styled.div`
  display: none;
  justify-content: flex-end;
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
    /* padding-top: 107.25pt; */
    padding-top: 86.25pt;
  }
`;
const Title = styled.h1<{ cssDetail: boolean }>`
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  margin-top: ${({ cssDetail }) => (cssDetail ? '15pt' : '22.5pt')};
  margin-bottom: ${({ cssDetail }) => (cssDetail ? '0pt' : '45pt')};
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  color: #222222;
  @media (min-width: 900pt) {
    font-size: 25.5pt;
    line-height: 37.5pt;
    color: #222222;
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
const TextBox = styled.div<{ cssDetail: boolean; isPreWrap?: boolean }>`
  display: flex;
  justify-content: center;
  white-space: pre-wrap;
  text-align: center;
  padding: 12pt 0;
  margin-bottom: ${({ cssDetail }) => (cssDetail ? '45pt' : '33pt')};
  width: 100%;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  border-radius: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  color: ${colors.gray2};

  @media (max-width: 899.25pt) {
    border: 0.75pt solid ${colors.lightGray};
    margin-bottom: 24pt;
  }

  @media (min-width: 900pt) {
    white-space: ${({ isPreWrap }) =>
      isPreWrap && isPreWrap === true ? 'pre-wrap' : 'normal'};
    font-size: 15pt;
    line-height: 32px;
  }
`;
const Btn = styled.button`
  font-family: 'Spoqa Han Sans Neo';
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

const WebBtn = styled.button`
  background: ${colors.main};
  border-radius: 8pt;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: ${colors.lightWhite};
  /* margin-bottom: 60pt; */
  margin-bottom: 90pt;
  font-family: 'Spoqa Han Sans Neo';
  border: none;
  padding: 15pt 112.5pt;
  @media (max-width: 899.25pt) {
    display: none;
  }
  :hover {
    background-color: ${colors.main};
  }
`;

const WebTextArea = styled.div<{ user: string }>`
  border: 0.75pt solid #e9eaee;
  border-radius: 6pt;
  width: 345pt;
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
  color: #222222;
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
    /* display: block; */
    display: flex;
    justify-content: flex-end;
    margin-right: 12.9375pt;
    /* position: absolute;
    top: 20pt;
    left: 250pt; */
  }
`;

const BuyerContainer = styled.div<{ user: string }>`
  display: ${({ user }) => user !== 'buyer' && 'none'};
`;
