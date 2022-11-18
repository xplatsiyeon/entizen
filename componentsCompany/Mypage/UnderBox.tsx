import React, { Dispatch, SetStateAction, useState } from 'react';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import contract from 'public/images/contract.png';
import styled from '@emotion/styled';
import Image from 'next/image';
import colors from 'styles/colors';
import arrowR from 'public/images/grayRightArrow20.png';
import EntizenContractIcon from 'public/images/EntizenContractIcon.png';
import AnyContracIcon from 'public/images/AnyContracIcon.png';
import ChatsIcon from 'public/mypage/myProjectChats.png';
import arrowRGr from 'public/mypage/ChatsArrow.png';
import { modusign } from 'api/sign';
import ComContranct from './CompContract';

type Props = {
  setOpenContract: Dispatch<SetStateAction<boolean>>;
};

const UnderBox = ({ setOpenContract }: Props) => {
  const [contr, setContr] = useState<boolean>(false);

  return (
    <WebRapper>
      <Wrapper>
        <ImageBox>
          <Image src={DoubleArrow} alt="doubleArrow" layout="fill" />
        </ImageBox>
        <MobWrap>
          {!contr ? (
            <NoContractBox>
              <CenterImgBox>
                <Image src={contract} alt="contract" layout="fill" />
              </CenterImgBox>
              <BiggerText>계약서를 작성해 주세요.</BiggerText>
              <SmallText>계약 후 프로젝트가 진행됩니다.</SmallText>
            </NoContractBox>
          ) : (
            <ComContranct setOpenContract={setOpenContract} />
          )}
        </MobWrap>
      </Wrapper>

      {!contr ? (
        <BtnBox>
          {/* <Btn onClick={() => setOpenContract(true)} tColor={true}>
          계약서 작성 및 서명
        </Btn> */}

          <Btn onClick={() => setContr(true)} tColor={true}>
            계약서 작성 및 서명
          </Btn>
          <Btn tColor={false}>고객과 소통하기</Btn>
        </BtnBox>
      ) : (
        <BtnWrap>
          <BtnBox2 onClick={() => alert('개발중입니다')}>
            <WebImageBox width={15} height={15}>
              <Image src={ChatsIcon} alt="doubleArrow" layout="fill" />
            </WebImageBox>
            <WebTitle>고객과 소통하기</WebTitle>
            <WebImageBox width={3.75} height={7.5}>
              <Image src={arrowRGr} alt="doubleArrow" layout="fill" />
            </WebImageBox>
          </BtnBox2>
        </BtnWrap>
      )}

      <>
        <WebBtnWrapper>
          <ComContranct />
        </WebBtnWrapper>
        <CommunityBtnBox>
          <WebImageBox width={15} height={15}>
            <Image src={ChatsIcon} alt="doubleArrow" layout="fill" />
          </WebImageBox>
          <WebTitle>고객과 소통하기</WebTitle>
          <WebImageBox width={3.75} height={7.5}>
            <Image src={arrowRGr} alt="doubleArrow" layout="fill" />
          </WebImageBox>
        </CommunityBtnBox>
      </>
    </WebRapper>
  );
};

const WebRapper = styled.div`
  @media (min-width: 900pt) {
    display: flex;
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  margin-top: 21pt;
  position: relative;
  @media (min-width: 900pt) {
    width: 580.5pt;
    padding-bottom: 45pt;
    padding-left: 0;
    padding-right: 0;
  }
`;
const ImageBox = styled.div`
  width: 24pt;
  height: 24pt;
  margin: 0 auto;
  position: relative;
`;

const MobWrap = styled.div`
  @media (min-width: 900pt) {
    display: none;
  }
`;

const NoContractBox = styled.div`
  padding-left: 67.5pt;
  padding-right: 67.5pt;
  margin-top: 33pt;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 900pt) {
    display: none;
  }
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
  @media (max-width: 899pt) {
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
  }
  @media (min-width: 900pt) {
    display: none;
  }
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

const WebBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 50pt;
  gap: 22.5pt;
  @media (max-width: 899pt) {
    display: none;
  }
`;

const CommunityBtnBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 135.75pt;
  height: 33pt;
  background-color: #f3f4f7;
  border-radius: 21.75pt;
  @media (max-width: 899pt) {
    display: none;
  }
`;

const BtnWrap =styled.div`
  position: relative;
  padding: 60pt 0;
  background: white;
`

const BtnBox2 = styled(CommunityBtnBox)`
  display: none;
  @media (max-width: 899pt) {
    display: flex;
  }
`;

const WebTitle = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 500;
  line-height: 21pt;
  letter-spacing: -0.02em;
  text-align: center;
`;

const WebImageBox = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width}pt;
  height: ${(props) => props.height}pt;
  position: relative;
  margin: 0 auto;
`;

export default UnderBox;
