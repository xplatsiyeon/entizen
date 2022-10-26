import MypageHeader from 'components/mypage/request/header';
import SentProvisionalQuoatation from 'componentsCompany/CompanyQuotation/SentQuotation/SentProvisionalQuoatation';
import React from 'react';

type Props = {};

const sentProvisionalQuotation = (props: Props) => {
  return (
    <>
      <MypageHeader back={true} title={'보낸 견적'} />
      <SentProvisionalQuoatation />
    </>
  );
};

export default sentProvisionalQuotation;
