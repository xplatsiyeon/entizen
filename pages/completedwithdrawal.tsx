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
        text={
          '지금까지 엔티즌과 함께하여 주셔서 감사합니다.\n다시 만나기를 기대하겠습니다.'
        }
        title={'탈퇴가 완료되었습니다.'}
        buttonText={'확인'}
        cssDetail={true}
        yesExit={false}
        handleOnClick={() => router.push('/')}
        user={'buyer'}
        isPreWrap={true}
      />
      <Wrapper>
        <WhyEntizenHorizontal2 />
      </Wrapper>

      <WebFooter />
    </>
  );
};

export default Complete;

const Wrapper = styled.div`
  margin-bottom: 120pt;
`;
