import styled from '@emotion/styled';
import WhyEntizenHorizontal from 'components/Main/WhyEntizenHorizontal';
import WhyEntizenWeb from 'components/Main/WhyEntizenWeb';
import MypageHeader from 'components/mypage/request/header';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import Image from 'next/image';
import { useRouter } from 'next/router';
import colors from 'styles/colors';
import CheckImg from '/public/images/CheckCircle.svg';

const FinPage = () => {
  const router = useRouter();
  const type = router.query.id;

  const HandleOnClick = () => {
    if (type === 'commu') {
      router.push('/');
    } else {
      router.push('/mypage');
    }
  };

  let title: string;
  let date: string;
  let p: string;
  let btnP: string;

  switch (type) {
    case 'commu':
      title = '엔티즌에서 프로젝트 확인 후 최종 완료됩니다';
      date = '완료 동의일';
      p = '';
      btnP = '엔티즌과 소통하기';
      break;

    case 'agree':
      title = '축하합니다! \n 충전소 설치가 완료되었습니다!';
      date = '완료일';
      p = "완료 된 프로젝트는 \n'내 충전소’에서 확인이 가능합니다.";
      btnP = '내 충전소 바로가기';
      break;

    default:
      title = '다시시도해주세요';
      date = '';
      p = '';
      btnP = '';
  }

  return (
    <>
      <Body>
        <WebHeader />
        <Inner>
          <MypageHeader back={true} />
          <Wrap>
            <ContainerBox>
              <Image src={CheckImg} alt="exit" style={{ cursor: 'pointer' }} />
            </ContainerBox>
            <Title>{title}</Title>
            <TextBox>
              <p>{date}</p>
              <h3></h3>
              <p className="notice">{p}</p>
            </TextBox>
            <Btn onClick={HandleOnClick}>{btnP}</Btn>
          </Wrap>
          <WhyEntizenHorizontal />
        </Inner>
        <WebFooter />
      </Body>
    </>
  );
};

export default FinPage;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;

  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  width: 900pt;
  margin: 97.5pt auto 90pt;
  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0 auto;
  }
`;

const Wrap = styled.div`
  margin: 0 15pt;
  position: relative;
  @media (min-width: 900pt) {
    display: flex;
    flex-direction: column;
    width: 460pt;
    margin-top: -20pt;
    margin: 0 auto 90pt;
  }
`;

const ContainerBox = styled.div`
  @media (max-width: 899pt) {
    margin-top: 94.125pt;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  @media (min-width: 900pt) {
    margin: 0 auto;
  }
`;

const Title = styled.h1`
  white-space: pre-wrap;
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  margin-top: 30pt;
  text-align: center;
  @media (min-width: 900pt) {
    margin-top: 23.25pt;
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
  margin: 0 15pt 30pt;
  @media (min-width: 900pt) {
    margin: 0 auto;
  }
`;

const TextBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 15pt 0;
  border: 0.75pt solid ${colors.lightGray};
  border-radius: 6pt;
  margin: 90pt 15pt 24pt;
  & > h3 {
    font-weight: 700;
    font-size: 15pt;
    line-height: 15pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main};
  }
  & > p {
    white-space: pre-wrap;
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: #222222;
  }
  .notice {
    white-space: pre-wrap;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 15pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: #747780;
  }
  @media (min-width: 900pt) {
    width: 100%;
    margin: 130.5pt auto 45pt;
  }
`;
