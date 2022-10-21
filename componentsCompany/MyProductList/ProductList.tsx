import styled from '@emotion/styled';
import { productList, Products } from 'api/company/quotations';
import Loader from 'components/Loader';
import Image from 'next/image';
import { useRouter } from 'next/router';
import carImg from 'public/images/carImage.png';
import plusBtn from 'public/images/productPlus.png';
import React from 'react';
import { useQuery } from 'react-query';
import colors from 'styles/colors';

type Props = {};
interface ProductList {
  isSuccess: true;
  products: Products[];
}

export interface ProductListResponse {
  data: ProductList;
}
const TAG = 'componentsCompany/MyProductList/ProductList';
const ProductList = (props: Props) => {
  const { data, isLoading, isError } = useQuery<ProductListResponse>(
    'productList',
    productList,
  );
  const router = useRouter();

  if (isError) {
    console.log(TAG + ' 에러 발생');
    console.log(isError);
  }
  if (isLoading) {
    <Loader />;
  }
  return (
    <>
      <Wrapper>
        {data?.data.products.map((item, index) => (
          <ListBox
            key={index}
            onClick={() => router.push('/company/showMyProduct')}
          >
            <ImageBox>
              <Image
                src={item.representationImageUrl}
                alt="carImage"
                layout="fill"
                priority={true}
                unoptimized={true}
              />
            </ImageBox>
            <TextBox>
              <Title>{item.modelName}</Title>
              <From>{`제조사: ${item.manufacturer}`}</From>
            </TextBox>
            <KwBox>{`${item.watt} kW`}</KwBox>
          </ListBox>
        ))}
      </Wrapper>
      <BtnBox>
        <ProductAddBtn onClick={() => router.push('/company/addProduct')}>
          <div>
            <Image src={plusBtn} alt="plus" />
          </div>
          <div>제품 추가하기</div>
        </ProductAddBtn>
      </BtnBox>
    </>
  );
};

const Wrapper = styled.div`
  padding-top: 27pt;
  padding-left: 17.25pt;
  padding-right: 17.25pt;
  display: flex;
  flex-direction: column;
  gap: 9pt;
  box-sizing: border-box;
`;

const ListBox = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 9pt 13.5pt;
  box-shadow: 0px 0px 10px 0px #89a3c933;
  position: relative;
  border-radius: 6pt;
  /* padding-left: 13.5pt;
  padding-right: 13.5pt; */
`;

const ImageBox = styled.div`
  position: relative;
  width: 42pt;
  height: 42pt;
  margin-right: 12pt;
`;

const TextBox = styled.div`
  padding-top: 3.75pt;
  padding-bottom: 3.75pt;
  display: flex;
  flex-direction: column;
  gap: 1.5pt;
`;

const Title = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: left;
`;
const From = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: left;
`;
const KwBox = styled.div`
  padding: 4.5pt 7.5pt;
  background-color: ${colors.main};
  color: #ffffff;
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 500;
  line-height: 9pt;
  letter-spacing: -0.02em;
  position: absolute;
  top: 11.25pt;
  right: 13.5pt;
  border-radius: 12pt; ;
`;

const BtnBox = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  box-sizing: border-box;
  position: fixed;
  bottom: 30pt;
  width: 100%;
`;

const ProductAddBtn = styled.div`
  padding-top: 13.5pt;
  padding-bottom: 13.5pt;
  display: flex;
  gap: 7.5pt;
  align-items: center;
  justify-content: center;
  border-radius: 6pt;
  background-color: ${colors.main};
  & div:first-of-type {
    width: 15pt;
    height: 15pt;
  }
  & div:nth-of-type(2) {
    font-family: Spoqa Han Sans Neo;
    font-size: 12pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
    color: #ffffff;
  }
`;
export default ProductList;
