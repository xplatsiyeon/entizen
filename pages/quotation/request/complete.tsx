import styled from '@emotion/styled';
import { Button, Container } from '@mui/material';
import Image from 'next/image';
import CheckImg from '/public/images/CheckCircle.svg';
import colors from 'styles/colors';
import MypageHeader from 'components/mypage/request/header';
import { useRouter } from 'next/router';

const Complete = () => {
  const route = useRouter();
  const HandleOnClick = () => {
    route.push('/mypage');
  };
  return (
    <Wrapper>
      <MypageHeader
        exitBtn={true}
        title={'간편견적'}
        handleOnClick={HandleOnClick}
      />

      <ContainerBox disableGutters>
        <Image src={CheckImg} alt="exit" style={{ cursor: 'pointer' }} />
      </ContainerBox>
      <Title>내 견적서 바로가기</Title>
      <Footer>
        <TextBox>
          <h3>읽어주세요!</h3>
          <h4>고객님 맞춤 구독상품의 역경매가 시작되었습니다.</h4>
          <p>
            영업일 기준 5일 후 역경매의 입찰이 마감되며, <br />
            입찰된 상품들을 꼼꼼히 비교해 보시기 바랍니다. <br />
            역경매는 ‘내 견적서’에서 확인 가능합니다.
          </p>
        </TextBox>
        <Btn onClick={HandleOnClick}>내 견적서 바로가기</Btn>
      </Footer>
    </Wrapper>
  );
};

export default Complete;

const Wrapper = styled.div``;
const Nav = styled.div`
  display: flex;
  /* justify-content: end; */
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
  flex-direction: column;
  padding: 15pt 0;
  margin-bottom: 24pt;
  width: 100%;
  border: 0.75pt solid ${colors.lightGray};
  border-radius: 6pt;
  & > h3 {
    font-weight: 700;
    font-size: 12pt;
    line-height: 15pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main};
  }
  & > h4 {
    font-weight: 700;
    font-size: 10.5pt;
    line-height: 15pt;
    text-align: center;
    letter-spacing: -0.02em;
    padding-top: 15pt;
    color: ${colors.main2};
  }
  & > p {
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 15pt;
    text-align: center;
    letter-spacing: -0.02em;
    padding-top: 15pt;
    color: ${colors.gray2};
  }
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
