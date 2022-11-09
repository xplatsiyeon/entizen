import Complete from 'components/Complete';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { companyRequestFilterNumberAction } from 'storeCompany/requestTabSlice';

type Props = {};

const complete = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onClickFn = () => {
    // 보낸 견적 바로가기
    dispatch(companyRequestFilterNumberAction.setNumber(1));
    router.replace('/company/quotation');
  };

  return (
    <>
      <Complete
        buttonText="보낸 견적 바로가기"
        handleOnClick={onClickFn}
        title={'고객에게 전달 완료!'}
      />
    </>
  );
};

export default complete;
