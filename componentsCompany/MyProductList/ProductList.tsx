import styled from '@emotion/styled';
import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';
import Modal from 'components/Modal/Modal';
import Image from 'next/image';
import { useRouter } from 'next/router';
import carImg from 'public/images/carImage.png';
import plusBtn from 'public/images/productPlus.png';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import colors from 'styles/colors';
import NoProductList from 'public/images/NothingProductListSvg.svg';

type Props = {};
export interface File {
  createdAt: string;
  chargerProductFileIdx: number;
  productFileType: string;
  originalName: string;
  url: string;
  size: number;
  chargerProductIdx: number;
}
export interface Products {
  createdAt: string;
  chargerProductIdx: number;
  modelName: string;
  kind: string;
  channel: string;
  method: string[];
  manufacturer: string;
  feature: string;
  memberIdx: number;
  chargerProductFiles: File[];
  chargerImageFiles: File[];
  chargerCatalogFiles: File[];
}
export interface ProductListRepsonse {
  isSuccess: true;
  chargerProduct: Products[];
}
const TAG = 'componentsCompany/MyProductList/ProductList';
const ProductList = (props: Props) => {
  const { data, isLoading, isError } = useQuery<ProductListRepsonse>(
    'productList',
    () => isTokenGetApi('/products'),
    {
      cacheTime: Infinity,
      staleTime: 5000,
    },
  );
  const router = useRouter();

  const [isData, setIsData] = useState(false);

  // 숫자만 추출해주는 함수
  const onlyNumber = (target: string) => {
    const testString = target;
    const regex = /[^0-9]/g;
    const result = testString.replace(regex, '');
    return result;
  };

  if (isError) {
    // console.log(TAG + ' 에러 발생');
    // console.log(isError);
    return (
      <Modal
        text="다시 시도해주세요"
        click={() => {
          router.push('/');
        }}
      />
    );
  }

  if (isLoading) {
    return <Loader />;
  }
  // console.log(data);
  // console.log('⭐️ 내 제품리스트 데이터 ~line 65 -> ' + TAG);

  // useEffect(() => {
  //   if (data?.chargerProduct?.length === 0) {
  //     setIsData(false);
  //   } else if (data?.chargerProduct?.length !== undefined) {
  //     setIsData(true);
  //   }
  // }, [data]);

  console.log('isData.length', data?.chargerProduct?.length);

  return (
    <>
      <Wrapper>
        {data?.chargerProduct?.length === 0 ? (
          <>
            <ImgBox>
              <ImgTag
                src="/images/NothingProductListSvg.svg"
                alt="NoProductLIst"
              />
              <NoTitle>등록된 제품이 없습니다.</NoTitle>

              <NoContents>
                내 제품을 등록하고,
                <br /> 견적 작성 시간을 줄여보세요!
              </NoContents>
            </ImgBox>
          </>
        ) : (
          <>
            {data?.chargerProduct?.map((item, index) => (
              <ListBox
                key={index}
                onClick={() =>
                  router.push({
                    pathname: '/company/myProductList/detail',
                    query: {
                      chargerProductIdx: item?.chargerProductIdx,
                    },
                  })
                }
              >
                {item?.chargerImageFiles !== undefined ? (
                  <ImageBox>
                    <Image
                      src={item?.chargerImageFiles[0]?.url}
                      alt="carImage"
                      layout="fill"
                      priority={true}
                      unoptimized={true}
                      objectFit="cover"
                    />
                  </ImageBox>
                ) : (
                  <NoImageBox />
                )}

                <DisplayBox>
                  <TextBox>
                    <Title>{item.modelName}</Title>
                    <From>{`제조사: ${item.manufacturer}`}</From>
                  </TextBox>
                  <KwBox>{`${onlyNumber(item.kind)} kW`}</KwBox>
                </DisplayBox>
              </ListBox>
            ))}
          </>
        )}
      </Wrapper>
      {data?.chargerProduct?.length === 0 ? (
        <BtnBox isData={data?.chargerProduct?.length}>
          <ProductAddBtn
            onClick={() => router.push('/company/addProduct')}
            isData={data?.chargerProduct?.length}
          >
            {/* <div>
            <Image src={plusBtn} alt="plus" />
          </div>
          <div>제품 추가하기</div> */}
            <span className="text">내 제품 등록하기</span>
          </ProductAddBtn>
        </BtnBox>
      ) : (
        <BtnBox isData={data?.chargerProduct?.length}>
          <ProductAddBtn onClick={() => router.push('/company/addProduct')}>
            <div>
              <Image src={plusBtn} alt="plus" />
            </div>
            <div className="plusProduct">제품 추가하기</div>
          </ProductAddBtn>
        </BtnBox>
      )}
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
  /* height: 100vh; */
`;

const ListBox = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 9pt 13.5pt 9pt 13.5pt;
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;
  position: relative;
  border-radius: 6pt;

  /* padding-left: 13.5pt;
  padding-right: 13.5pt; */
  cursor: pointer;
  @media (min-width: 900pt) {
    width: 580.5pt;
    margin: 0 auto;
    padding: 17.25pt;
  }
`;

const ImageBox = styled.div`
  position: relative;
  width: 54pt;
  height: 54pt;
  margin-right: 18pt;
  & > span {
    border-radius: 6pt;
  }
  @media (max-width: 899.25pt) {
    width: 42pt;
    height: 42pt;
    margin-right: 12pt;
  }
`;

const NoImageBox = styled.div`
  position: relative;
  width: 42pt;
  height: 42pt;
  margin-right: 18pt;
  background-color: #a6a9b0;
`;

const TextBox = styled.div`
  padding-top: 3.75pt;
  padding-bottom: 3.75pt;
  display: flex;
  flex-direction: column;
  gap: 12pt;
  @media (max-width: 899.25pt) {
    gap: 1.5pt;
  }
`;

const Title = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 13.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #222222;
  @media (max-width: 899.25pt) {
    font-size: 12pt;
    font-weight: 700;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const From = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 400;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #222222;
  @media (max-width: 899.25pt) {
    font-size: 10.5pt;
    font-weight: 400;
    line-height: 18pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const KwBox = styled.div`
  padding: 4.5pt 7.5pt;
  background-color: ${colors.main};
  color: #ffffff;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 500;
  line-height: 12pt;
  letter-spacing: -0.02em;
  position: absolute;
  /* top: 19.25pt; */
  top: 35%;
  right: 20.25pt;
  border-radius: 12pt;
  @media (max-width: 899.25pt) {
    font-size: 9pt;
    font-weight: 500;
    line-height: 9pt;
    letter-spacing: -0.02em;
    text-align: right;
  }
`;

const BtnBox = styled.div<{ isData?: number }>`
  padding-left: 15pt;
  padding-right: 15pt;
  box-sizing: border-box;
  position: fixed;
  /* bottom: 30pt; */
  bottom: ${({ isData }) => (isData === 0 ? '155pt' : '34.5pt')};
  width: 100%;
  cursor: pointer;

  @media (min-width: 900pt) {
    position: static;
    margin: 0 auto;
    width: 254.7pt;
    padding-top: ${({ isData }) => (isData === 0 ? '42pt' : '150pt')};
  }
`;

const ProductAddBtn = styled.div<{ isData?: number }>`
  padding-top: 13.5pt;
  padding-bottom: 13.5pt;
  display: flex;
  gap: 7.5pt;
  align-items: center;
  justify-content: center;
  border-radius: 6pt;
  background-color: ${colors.main};

  width: ${({ isData }) => (isData === 0 ? '120.75pt' : '100%')};

  margin: 0 auto;
  @media (min-width: 900pt) {
    width: 100%;
  }
  & div:first-of-type {
    width: 15pt;
    height: 15pt;
  }
  & div:nth-of-type(2) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
    color: #ffffff;
  }
  .text {
    color: #ffffff;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;

    @media (max-width: 899.25pt) {
      font-size: 9pt;
      font-weight: 700;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }
  .plusProduct {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
    color: #ffffff;
  }
`;

const DisplayBox = styled.div`
  display: flex;
  align-items: center;
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 83.25pt;

  @media (min-width: 900pt) {
    padding-top: 0;
  }
`;

const ImgTag = styled.img`
  width: 38.25pt;
  @media (min-width: 900pt) {
    width: 60pt;
  }
`;

const NoTitle = styled.span`
  font-family: ' Spoqa Han Sans Neo';
  color: #a6a9b0;
  font-size: 12pt;
  font-weight: 500;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
  padding-top: 16.5pt;
  @media (min-width: 900pt) {
    padding-top: 28pt;
    font-size: 18pt;
    font-weight: 500;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
`;

const NoContents = styled.span`
  font-family: ' Spoqa Han Sans Neo';
  color: #a6a9b0;
  font-size: 9pt;
  font-weight: 500;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
  padding-top: 7.5pt;
  @media (min-width: 900pt) {
    padding-top: 15pt;
    font-size: 12pt;
    font-weight: 500;
    line-height: 18pt;
    letter-spacing: -0.02em;
    text-align: center;
    white-space: nowrap;
  }
`;
export default ProductList;
