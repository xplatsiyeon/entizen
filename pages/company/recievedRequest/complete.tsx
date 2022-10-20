import Complete from 'components/Complete';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

const complete = (props: Props) => {
  const router = useRouter();

  const onClickFn = () => {
    // 보낸 견적 바로가기
    router.replace('/');
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
