import styled from '@emotion/styled';
import React from 'react';

type Props = {};

const Footer = (props: Props) => {
  return (
    <Container>
      <FooterBox>
        <CompanyName>(주) 엔티즌</CompanyName>
        <InfoWrapper>
          <LabelBox>
            <Labels>대표이사</Labels>
            <Labels>사업자 등록번호</Labels>
            <Labels>호스팅 사업자</Labels>
            <Labels>통신판매업</Labels>
            <Labels>이메일</Labels>
            <Labels>고객센터</Labels>
            <Labels>운영시간</Labels>
            <Labels>&nbsp;</Labels>
            <Labels>주소</Labels>
          </LabelBox>
          <InfoBox>
            <Infos>윤민호, 오성흥</Infos>
            <Infos>0000-000-0000</Infos>
            <Infos>블라블라</Infos>
            <Infos>2021-서울강남-2345</Infos>
            <Infos>블라블라@블라</Infos>
            <Infos>0000-0000</Infos>
            <Infos>
              평일 10:00~17:00
              <br />
              (점심시간 12:00~13:00 / 주말 및 공휴일 제외)
            </Infos>
            <Infos>서울 강남구 테헤란로 393 LS 빌딩</Infos>
          </InfoBox>
        </InfoWrapper>
        <MenuBox>
          <Menus>사업자 정보 확인</Menus>
          <Divider></Divider>
          <Menus>이용약관</Menus>
          <Divider></Divider>
          <Menus>개인정보 처리 방침</Menus>
          <Divider></Divider>
          <Menus>1:1문의</Menus>
        </MenuBox>
        <CopyRight>
          Copyright © 2022 Entizen Inc. All rights reserved.
        </CopyRight>
      </FooterBox>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 45pt;
  background-color: #f3f4f7;
  position: absolute;
  width: 100%;
  padding-bottom: 1pt;
`;

const FooterBox = styled.div`
  margin: 35.25pt 40.5pt 81.75pt 39.75pt;
`;

const CompanyName = styled.div`
  font-size: 9pt;
  font-weight: 500;
  line-height: 15pt;
  letter-spacing: -0.02em;
`;
const InfoWrapper = styled.div`
  width: 100%;
  margin-top: 6pt;
  display: flex;
  font-size: 7.5pt;
  font-weight: 500;
  color: #a6a9b0;
  line-height: 12pt;
  letter-spacing: -0.02em;
  gap: 9pt;
`;

const LabelBox = styled.div`
  margin-right: 9pt;
`;

const Labels = styled.div``;

const InfoBox = styled.div``;

const Infos = styled.div``;

const MenuBox = styled.div`
  display: flex;
  /* justify-content: space-evenly; */
  align-items: center;
  width: 100%;
  margin-top: 15pt;
  margin-left: 2.25pt;
  margin-right: 1.5pt;
`;

const Menus = styled.div`
  font-size: 7.5pt;
  font-weight: 500;
  color: #a6a9b0;
  letter-spacing: -0.02em;
  line-height: 15pt;
  margin-left: 6pt;
  margin-right: 6pt;
  &:first-of-type {
    margin-left: 0;
  }
`;

const Divider = styled.div`
  height: 5.25pt;
  border: 0.375pt solid #c4c6cd;
`;

const CopyRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 9pt;
  font-size: 7.5pt;
  font-weight: 500;
  color: #a6a9b0;
  letter-spacing: -0.02em;
  line-height: 15pt;
`;
export default Footer;
