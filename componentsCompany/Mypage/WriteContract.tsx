import styled from '@emotion/styled';
import Image from 'next/image';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import React from 'react';
import arrowR from 'public/images/grayRightArrow20.png';
import EntizenContractIcon from 'public/images/EntizenContractIcon.png';
import AnyContracIcon from 'public/images/AnyContracIcon.png';

type Props = {};

const WriteContract = (props: Props) => {
  return (
    <Wrapper>
      <ImageBox>
        <Image src={DoubleArrow} alt="doubleArrow" layout="fill" />
      </ImageBox>
      <NoContractBox>
        <BiggerText>계약서를 작성해 주세요</BiggerText>
        <SmallerText>계약 후 프로젝트가 진행됩니다.</SmallerText>
      </NoContractBox>
      <EntizenContractBox>
        <TextBox>
          <TitleBox>
            <Title>엔티즌 전자 계약서</Title>
            <TitleIcon>
              <Image src={arrowR} alt=">" />
            </TitleIcon>
          </TitleBox>
          <ExplainText>
            간편하고 안전하게
            <br />
            전자계약 하세요
          </ExplainText>
        </TextBox>
        <BigIconBox>
          <Image src={EntizenContractIcon} alt="큰아이콘" />
        </BigIconBox>
      </EntizenContractBox>
      <EntizenContractBox className="forMargin">
        <TextBox>
          <TitleBox>
            <Title>자체 계약서</Title>
            <TitleIcon>
              <Image src={arrowR} alt=">" />
            </TitleIcon>
          </TitleBox>
          <ExplainText>
            날인 완료된 계약서
            <br />
            스캔본을 첨부해 주세요
          </ExplainText>
        </TextBox>
        <BigIconBox>
          <Image src={AnyContracIcon} alt="큰아이콘" />
        </BigIconBox>
      </EntizenContractBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  padding-bottom: 72pt;
  margin-top: 21pt;
  position: relative;
  .forMargin {
    margin-top: 15pt;
  }
`;
const ImageBox = styled.div`
  width: 24pt;
  height: 24pt;
  margin: 0 auto;
  position: relative;
`;
const NoContractBox = styled.div`
  margin-top: 30pt;
  margin-bottom: 24pt;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BiggerText = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 18pt;
  font-weight: 500;
  line-height: 24pt;
  letter-spacing: -0.02em;
  color: #222222;
`;

const SmallerText = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  margin-top: 6pt;
  font-weight: 500;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #747780;
`;

const EntizenContractBox = styled.div`
  padding: 14.25pt 15.75pt 14.25pt 15pt;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;
  border-radius: 6pt;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7.5pt;
`;

const TitleBox = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  gap: 3pt;
`;

const Title = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 15pt;
  font-weight: 700;
  line-height: 21pt;
  letter-spacing: -0.02em;
  text-align: left;
`;

const TitleIcon = styled.div`
  position: relative;
  top: -1.2pt;
  width: 15pt;
  height: 15pt;
`;

const ExplainText = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 400;
  line-height: 16.5pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #a6a9b0;
`;

const BigIconBox = styled.div`
  width: 45pt;
  height: 45pt;
`;

export default WriteContract;
