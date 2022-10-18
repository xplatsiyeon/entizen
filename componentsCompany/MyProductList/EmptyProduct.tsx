import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';
import emptyProduct from 'public/images/myEmptyProductList.png';
import colors from 'styles/colors';

type Props = {};

const EmptyProduct = (props: Props) => {
  return (
    <Wrapper>
      <CenterBox>
        <ImageBox>
          <Image src={emptyProduct} alt="noProduct" layout="fill" />
        </ImageBox>
        <TextBox>
          <span>등록된 제품이 없습니다.</span>
          <p>
            내 재품을 등록하고,
            <br />
            견적 작성 시간을 줄여보세요!
          </p>
        </TextBox>
        <Btn>내 제품 등록하기</Btn>
      </CenterBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 96pt;
`;

const CenterBox = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ImageBox = styled.div`
  position: relative;
  width: 48pt;
  height: 48pt;
`;
const TextBox = styled.div`
  margin-top: 12pt;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & span {
    margin: 0 auto;
    font-family: Spoqa Han Sans Neo;
    font-size: 12pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
    color: #a6a9b0;
  }
  & p {
    margin-top: 7.5pt;
    text-align: center;
    font-family: Spoqa Han Sans Neo;
    font-size: 9pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
    color: #caccd1;
  }
`;

const Btn = styled.div`
  margin-top: 34.5pt;
  padding: 9pt 30pt;
  font-family: Spoqa Han Sans Neo;
  font-size: 9pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
  background-color: ${colors.main};
  color: #ffffff;
  border-radius: 6pt;
`;

export default EmptyProduct;

// 34.5
