import MypageHeader from 'components/mypage/request/header';
import LastWrite from 'componentsCompany/CompanyQuotation/LastQuotation';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

const LastQuotation = (props: Props) => {
  const router = useRouter();

  return (
    <>
      <MypageHeader
        exitBtn={true}
        title={'최종 견적 작성'}
        handleOnClick={() => router.push('/company/sentProvisionalQuotation')}
      />
      <LastWrite />
    </>
  );
};

export default LastQuotation;
