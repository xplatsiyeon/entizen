import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import colors from 'styles/colors';

type Props = {};

const FinishedBottomBox = (props: Props) => {
  return (
    <>
      <Wrapper>
        <ImageBox>
          <Image src={DoubleArrow} alt="doubleArrow" layout="fill" />
        </ImageBox>
        <BiggerText>계약서를 작성해 주세요.</BiggerText>
        <Contents>
          <div className="text-box">
            <span className="name">이름</span>
            <span className="text">윤세아</span>
          </div>
          <div className="text-box">
            <span className="name">연락처</span>
            <span className="phone">010-3522-2250</span>
          </div>
        </Contents>
        <BiggerText className="catalog">첨부 파일</BiggerText>
        <FileBox></FileBox>
      </Wrapper>
      <BtnBox></BtnBox>
    </>
  );
};
const Wrapper = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  margin-top: 21pt;
  position: relative;
  .catalog {
    margin-top: 18pt;
    margin-bottom: 15pt;
  }
`;
const ImageBox = styled.div`
  width: 24pt;
  height: 24pt;
  margin: 0 auto;
  position: relative;
`;
const CustomerInfo = styled.div`
  padding-left: 67.5pt;
  padding-right: 67.5pt;
  margin-top: 37.5pt;
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
  margin-top: 37.5pt;
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: 0em;
  text-align: left;
`;

const BtnBox = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-left: 15pt;
  padding-right: 15pt;
  width: 100%;
  gap: 6pt;
  bottom: 30pt;
`;

const Contents = styled.div`
  padding-top: 19.5pt;
  padding-bottom: 18pt;
  border-bottom: 1px solid #e9eaee;
  .text-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    :not(:nth-of-type(1)) {
      padding-top: 12pt;
    }

    .emailText {
      font-family: Spoqa Han Sans Neo;
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: right;
    }
  }

  .name {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
  }
  .text {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: right;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .img-box {
    padding-top: 42pt;
    padding-bottom: 24pt;
    text-align: center;
  }

  .phone {
    text-decoration: underline;
    color: ${colors.main};
  }
`;

const FileBox = styled.div``;

export default FinishedBottomBox;
