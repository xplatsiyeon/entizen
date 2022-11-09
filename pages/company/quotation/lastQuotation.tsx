import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';
import MypageHeader from 'components/mypage/request/header';
import LastWrite from 'componentsCompany/CompanyQuotation/LastQuotation';
import { SentRequestResponse } from 'componentsCompany/CompanyQuotation/SentQuotation/SentProvisionalQuoatation';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
type Props = {};

const LastQuotation = (props: Props) => {
  const router = useRouter();
  const routerId = router.query.preQuotation;
  // ----------- 보낸 견적 상세 페이지 api --------------
  const { data, isLoading, isError, error } = useQuery<SentRequestResponse>(
    'company/',
    () => isTokenGetApi(`/quotations/sent-request/${routerId}`),
    {
      enabled: router.isReady,
    },
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    console.log('🔥 ~line 249 ~에러 발생');
    console.log(error);
  }

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
