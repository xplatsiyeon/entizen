import Complete from 'components/Complete';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebFooter from 'componentsWeb/WebFooter';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { companyRequestFilterNumberAction } from 'storeCompany/requestTabSlice';

type Props = {};

const complete = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  // 서브 카테고리 열렸는지 아닌지
  const [openSubLink, setOpenSubLink] = useState<boolean>(true);
  // step 숫자
  const [tabNumber, setTabNumber] = useState<number>(0);

  const onClickFn = () => {
    // 보낸 견적 바로가기
    dispatch(companyRequestFilterNumberAction.setNumber(1));
    router.replace('/company/quotation?id=1');
  };

  return (
    <>
      <WebBuyerHeader
        openSubLink={false}
        setOpenSubLink={setOpenSubLink}
        setTabNumber={setTabNumber}
      />
      <Complete
        buttonText="보낸 견적 바로가기"
        handleOnClick={onClickFn}
        title={'고객에게 전달 완료!'}
        user={'seller'}
      />
      <WebFooter />
    </>
  );
};

export default complete;
