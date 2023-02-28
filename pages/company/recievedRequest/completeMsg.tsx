
import CompleteMessage from 'components/CompleteMessage';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebFooter from 'componentsWeb/WebFooter';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { companyRequestFilterNumberAction } from 'storeCompany/requestTabSlice';

type Props = {};

const completeMsg = (props: Props) => {
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
      <CompleteMessage
        buttonText="보낸 견적 바로가기"
        handleOnClick={onClickFn}
        title={'최종 견적 전송완료!'}
        user={'seller'}
        yesExit={true}
        textChange={true}
      />
      <WebFooter />
    </>
  );
};

export default completeMsg;
