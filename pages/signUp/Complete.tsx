import Complete from 'components/Complete';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import Image from 'next/image';
import WhyEntizen from 'components/Main/WebWhyEntizen';
import ExitImg from 'public/images/X.svg';
import { useMediaQuery } from 'react-responsive';

const SignUpComplete = () => {
  const router = useRouter();

  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  return (
    <Body>
      {!mobile && <WebHeader />}
      <Inner>
        <Exit onClick={() => router.push('/')}>
          <Image src={ExitImg} alt="exit-icon" />
        </Exit>
        <Complete
          mt={51.75}
          title={'엔티즌 가입을 환영합니다!'}
          text={'내 충전기의 예상 매출을 확인해보세요.'}
          buttonText={mobile ? `간편견적 확인하기 〉` : `홈으로`}
          buttonWeb={`간편견적 확인하기 〉`}
          handleOnClick={() =>
            mobile ? router.push('/quotation/request') : router.push('/')
          }
        />
        <Wrap>
          <WhyEntizen />
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
  background: #fcfcfc;

  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  margin: 45.75pt auto;

  width: 900pt;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0;
  }
`;

const Wrap = styled.div`
  margin-top: 145.5pt;
  margin-bottom: 49.25pt;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const Exit = styled.div`
  position: absolute;
  right: 15pt;
  top: 10pt;
  cursor: pointer;
  @media (min-width: 900pt) {
    display: none;
  }
`;
