import MypageHeader from 'components/mypage/request/header';
import EmptyProduct from 'componentsCompany/MyProductList/EmptyProduct';
import ProductList from 'componentsCompany/MyProductList/ProductList';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebFooter from 'componentsWeb/WebFooter';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import CompanyRightMenu from 'componentsWeb/CompanyRightMenu';

type Props = {};

const MyProductListComponent = (props: Props) => {
  const [productExist, SetProductExist] = useState<boolean>(true);
  const router = useRouter();
  const handleHomeClick = () => {
    router.push('/');
  };
  const [tabNumber, setTabNumber] = useState<number>(7);
  const [componentId, setComponentId] = useState<number>();
  const [openSubLink, setOpenSubLink] = useState<boolean>(false);
  return (
    <WebBody>
      <CompanyRightMenu />
      <WebBuyerHeader
        setTabNumber={setTabNumber}
        tabNumber={tabNumber!}
        componentId={componentId}
        openSubLink={openSubLink}
        setOpenSubLink={setOpenSubLink}
      />
      <MypageHeader
        back={true}
        homeBtn={true}
        title={'내 제품 리스트'}
        handleHomeClick={handleHomeClick}
      />
      <Inner>
        {!productExist ? <EmptyProduct /> : <ProductList />}
        {/* <ProductList /> */}
      </Inner>
      <WebFooter />
    </WebBody>
  );
};

export default MyProductListComponent;

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #ffffff;
  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }

  @media (min-width: 900pt) {
    background-color: #fcfcfc;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 100pt auto;
  width: 900pt;
  height: 100%;
  border-radius: 12pt;
  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    padding: 0;
    box-shadow: none;
    background: none;
    margin-top: 36pt;
  }
`;
