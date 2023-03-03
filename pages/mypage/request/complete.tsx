
import styled from '@emotion/styled';
import CompleteMessage from 'components/CompleteMessage';
import WhyEntizenHorizontal2 from 'components/Main/WhyEntizenHorizontal2';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import { useRouter } from 'next/router';

const Complete = () => {
  const router = useRouter();
  return (
    <>
      <WebHeader />
      <CompleteMessage
        text={"계약 및 설치 관리는 \n '내 프로젝트'에서 진행해 주세요."}
        title={'구독상품이 확정되었습니다!'}
        buttonText={'내 프로젝트 바로가기'}
        cssDetail={true}
        yesExit={true}
        handleOnClick={() =>
          router.push({
            pathname: '/mypage',
            query: {
              id: 1,
            },
          })
        }
        user={'buyer'}
      />
      <Wrapper>
        <WhyEntizenHorizontal2/>
      </Wrapper>

      <WebFooter />
    </>
  );
};

export default Complete;

const Wrapper = styled.div`
  margin-bottom: 120pt;
`