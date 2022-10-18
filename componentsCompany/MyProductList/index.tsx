import MypageHeader from 'components/mypage/request/header';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import EmptyProduct from './EmptyProduct';
import ProductList from './ProductList';

type Props = {};

const MyProductListComponent = (props: Props) => {
  const [productExist, SetProductExist] = useState<boolean>(true);
  const router = useRouter();
  const handleHomeClick = () => {
    router.push('/');
  };
  return (
    <>
      <MypageHeader
        back={true}
        homeBtn={true}
        title={'내 제품 리스트'}
        handleHomeClick={handleHomeClick}
      />
      {/* {!productExist ? <EmptyProduct /> : <ProductList />} */}
      <ProductList />
    </>
  );
};

export default MyProductListComponent;
