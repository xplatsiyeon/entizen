import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

const Footer = (props: Props) => {
  const router = useRouter();
  const userID = sessionStorage.getItem('USER_ID');
  const memberType = JSON.parse(sessionStorage?.getItem('MEMBER_TYPE')!);
  return (
    <Container>
      <FooterBox>
        <CompanyName>엘에스일렉트릭(주)</CompanyName>
        <InfoWrapper>
          <LabelBox>
            <Labels>대표자</Labels>
            {/* <Labels>사업자 등록번호</Labels> */}
            {/* <Labels>호스팅 사업자</Labels> */}
            <Labels>사업자 등록번호</Labels>
            {/* <Labels>이메일</Labels> */}
            {/* <Labels>고객센터</Labels> */}
            <Labels>주소</Labels>
            <Labels>이메일</Labels>
            <Labels>고객센터</Labels>
            <Labels>운영시간</Labels>
            <Labels>&nbsp;</Labels>
          </LabelBox>
          <InfoBox>
            <Infos>구자균</Infos>
            {/* <Infos>0000-000-0000</Infos> */}
            {/* <Infos>블라블라</Infos> */}
            <Infos>116-81-19273</Infos>
            {/* <Infos>블라블라@블라</Infos> */}
            {/* <Infos>0000-0000</Infos> */}
            <Infos>경기도 안양시 동안구 엘에스로 127(호계동)</Infos>
            <Infos>entizen@entizen.kr</Infos>
            <Infos>010-9818-8856</Infos>
            <Infos>
              평일 09:00~17:00
              <br />
              (점심시간 12:00~13:00 / 주말 및 공휴일 제외)
            </Infos>
          </InfoBox>
        </InfoWrapper>
        <MenuBox>
          <Menus
            onClick={async () => {
              router.push({
                pathname: '/setting',
                query: {
                  id: 3,
                  direct: true,
                },
              });
            }}
          >
            이용약관
          </Menus>
          <Divider />
          <Menus
            onClick={() => {
              router.push({
                pathname: '/setting',
                query: {
                  id: 4,
                  direct: true,
                },
              });
            }}
          >
            개인정보 처리방침
          </Menus>
          <Divider />
          <Menus
            onClick={() => {
              // router.push(userID ? '/setting?id=2' : '/signin');
              userID
                ? router.push({
                    pathname: '/setting',
                    query: {
                      id: 2,
                      direct: true,
                    },
                  })
                : router.push('/signin');
            }}
          >
            1:1 문의
          </Menus>
          <Divider />
          <Menus
            onClick={() => {
              if (memberType === 'USER') {
                router.push({
                  pathname: '/faq',
                  query: { direct: true },
                });
              } else if (memberType === 'COMPANY') {
                router.push({
                  pathname: '/company/faq',
                  query: { direct: true },
                });
              } else if (userID !== undefined) {
                router.push({
                  pathname: '/faq',
                  query: { direct: true },
                });
              }
            }}
          >
            FAQ
          </Menus>
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
  /* @media (max-width: 899.25pt) {
    visibility: hidden;
  } */
`;

const FooterBox = styled.div`
  margin: 35.25pt 40.5pt 81.75pt 39.75pt;
`;

const CompanyName = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 9pt;
  font-weight: 500;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #747780;
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

const Labels = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 7.5pt;
  font-weight: 500;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #a6a9b0;
`;

const InfoBox = styled.div``;

const Infos = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 7.5pt;
  font-weight: 500;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #a6a9b0;
`;

const MenuBox = styled.div`
  display: flex;
  /* justify-content: space-evenly; */
  align-items: center;
  width: 100%;
  margin-top: 39pt;
  margin-left: 2.25pt;
  margin-right: 1.5pt;
`;

const Menus = styled.div`
  cursor: pointer;
  font-size: 7.5pt;
  font-weight: 500;
  color: #a6a9b0;
  letter-spacing: -0.02em;
  line-height: 15pt;
  /* margin-left: 6pt; */
  /* margin-right: 6pt; */
  margin-left: 11.5pt;
  margin-right: 11.5pt;
  &:first-of-type {
    margin-left: 0;
  }
`;

const Divider = styled.div`
  height: 5.25pt;
  border: 0.375pt solid #c4c6cd;
`;

const CopyRight = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  display: flex;
  margin-top: 9pt;
  font-size: 7.5pt;
  font-weight: 500;
  color: #a6a9b0;
  letter-spacing: -0.02em;
  line-height: 15pt;
`;

const FooterMenuBar = styled.div`
  display: flex;
  align-items: center;
`;

const FooterMenuText = styled.span`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.02em;
  text-align: left;
`;

export default Footer;
