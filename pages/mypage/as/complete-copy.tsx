import AsComplete from 'components/mypage/as/AsWriteComplete';
import React from 'react';

type Props = {};

const complete = (props: Props) => {
  return (
    <div>
      <AsComplete
        buttonText={'확인'}
        text={'추가 문의사항은\n소통하기를 이용해주시기 바랍니다.'}
        title={'A/S 요청이 전달되었습니다'}
      />
    </div>
  );
};

export default complete;
