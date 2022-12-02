import Complete from 'components/Complete';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

const SentProvisionalQuotaionComplete = (props: Props) => {
  const router = useRouter();
  return (
    <Complete
      title={'최종 견적 전송완료'}
      yesExit={true}
      buttonText={'보낸 견적 바로가기'}
      handleOnClick={() => router.push('/')}
      handleExitClick={() => router.push('/company/quotation')}
    />
  );
};

export default SentProvisionalQuotaionComplete;
