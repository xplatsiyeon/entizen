import Complete from 'components/Complete';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import WebHeader from 'web-components/WebHeader';
import WebFooter from 'web-components/WebFooter';
import WhyEntizen from 'components/Main/WhyEntizen';

const SignUpComplete = () => {
  const router = useRouter();

  return (
    <Body>
      <WebHeader />
          <Inner>
    <Complete
      title={'엔티즌 가입을 환영합니다!'}
      text={'내 충전기의 예상 매출을 확인해보세요.'}
      buttonText={'홈으로'}
      handleOnClick={() => router.push('/')}
    />
    <Wrap>
      <WhyEntizen/>
    </Wrap>
    </Inner>
    <WebFooter />
  </Body>
  );
};

export default SignUpComplete;


const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  //height: 810pt;
  background:#fcfcfc;

  @media (max-height: 809pt) { 
    display: block;
    height:100%;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  margin: 0 auto;
  width: 900pt;

  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    top: 0;
    left: 0%;
    transform: none;
  }
`;

const Wrap = styled.div`

@media (max-width: 899pt) {
  display: none;
}
`