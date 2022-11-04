import React, { Dispatch, SetStateAction } from 'react';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import contract from 'public/images/contract.png';
import styled from '@emotion/styled';
import Image from 'next/image';
import colors from 'styles/colors';

type Props = {
  setOpenContract: Dispatch<SetStateAction<boolean>>;
};

const UnderBox = ({setOpenContract }: Props) => {
  return (
    <>
      <Wrapper>
        <ImageBox>
          <Image src={DoubleArrow} alt="doubleArrow" layout="fill" />
        </ImageBox>
        <NoContractBox>
          <CenterImgBox>
            <Image src={contract} alt="contract" layout="fill" />
          </CenterImgBox>
          <BiggerText>계약서를 작성해 주세요.</BiggerText>
          <SmallText>계약 후 프로젝트가 진행됩니다.</SmallText>
        </NoContractBox>
      </Wrapper>
      <BtnBox>
        <Btn onClick={() => setOpenContract(true)} tColor={true}>
          계약서 작성 및 서명
        </Btn>
        <Btn tColor={false}>고객과 소통하기</Btn>
      </BtnBox>
    </>
  );
};

const Wrapper = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  margin-top: 21pt;
  position: relative;
  padding-bottom: 150pt;
`;
const ImageBox = styled.div`
  width: 24pt;
  height: 24pt;
  margin: 0 auto;
  position: relative;
`;
const NoContractBox = styled.div`
  padding-left: 67.5pt;
  padding-right: 67.5pt;
  margin-top: 33pt;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CenterImgBox = styled.div`
  position: relative;
  width: 48pt;
  height: 48pt;
`;

const BiggerText = styled.div`
  font-family: Spoqa Han Sans Neo;
  margin-top: 12pt;
  color: #a6a9b0;
  font-size: 12pt;
  font-weight: 500;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
`;

const SmallText = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 9pt;
  margin-top: 9pt;
  font-weight: 500;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #caccd1;
  text-align: center;
`;

const BtnBox = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-left: 15pt;
  padding-right: 15pt;
  padding-bottom: 30pt;
  width: 100%;
  gap: 6pt;
  bottom: 0pt;
  background: #ffff;
`;

const Btn = styled.div<{ tColor: boolean }>`
  padding-top: 15pt;
  padding-bottom: 15pt;
  width: 100%;
  border-radius: 6pt;
  text-align: center;
  color: ${({ tColor }) => (tColor ? '#eeeeee' : '#A6A9B0')};
  background-color: ${({ tColor }) => (tColor ? colors.main : '#eeeeee')};
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
`;

// 67.5pt
export default UnderBox;
