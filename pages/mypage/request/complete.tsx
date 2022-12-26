import CompleteComponents from 'components/Complete';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import { useRouter } from 'next/router';

const Complete = () => {
  const router = useRouter();
  return (
    <>
      <WebHeader />
      <CompleteComponents
        text={"계약 및 설치 관리는 \n '내 프로젝트'에서 진행해 주세요."}
        title={'구독상품이 확정되었습니다!'}
        buttonText={'내 프로젝트 바로가기'}
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
      <WebFooter />
    </>
  );
};

export default Complete;
