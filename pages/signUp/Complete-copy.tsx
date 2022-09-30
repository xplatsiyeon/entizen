import Complete from 'components/Complete-copy';
import { useRouter } from 'next/router';

const SignUpComplete = () => {
  const router = useRouter();

  return (
    <Complete
      title={'엔티즌 가입을 환영합니다!'}
      text={'내 충전기의 예상 매출을 확인해보세요.'}
      buttonText={'홈으로'}
      handleOnClick={() => router.push('/')}
    />
  );
};

export default SignUpComplete; 
