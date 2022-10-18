import MypageHeader from 'components/mypage/request/header';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

const MyProductListComponent = (props: Props) => {
  const router = useRouter();
  const handleHomeClick = () => {
    router.push('/');
  };
  return (
    <MypageHeader
      back={true}
      homeBtn={true}
      title={'내 제품 리스트'}
      handleHomeClick={handleHomeClick}
    />
  );
};

export default MyProductListComponent;
