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
            <Labels>
              <Infos>대표자 : 구자균</Infos>
              사업자 등록번호 : 116-81-19273
            </Labels>
            <Labels>주소 : 경기도 안양시 동안구 엘에스로 127(호계동)</Labels>
            <Labels>이메일 : help@entizen.kr</Labels>
            {/* <Labels>
              <Infos>고객센터 : 1544-6811</Infos>
              운영시간 : 평일 09:00~17:00 (점심시간 12:00~13:00 / 주말 및 공휴일
              제외)
            </Labels> */}
          </LabelBox>
        </InfoWrapper>
        {/* <MenuBox>
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
        </MenuBox> */}
        <CopyRight>
          Copyright © 2022 Entizen Inc. All rights reserved.
        </CopyRight>
      </FooterBox>
    </Container>
  );
};

const Container = styled.div`
  margin-top: -10px;
  background-color: #f3f4f7;
  position: absolute;
  width: 100%;
  padding-bottom: 1pt;
  /* @media (max-width: 899.25pt) {
    visibility: hidden;
  } */
`;

const FooterBox = styled.div`
  margin: 52px 54px 109px 80px;
  @media (max-width: 768px) {
    margin: 35px 10px 60px 20px;
  }
`;

const CompanyName = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 14pt;
  font-weight: 700;
  line-height: 20pt;
  text-align: left;
  color: #747780;
  @media (max-width: 768px) {
    font-size: 9pt;
    line-height: 15pt;
  }
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
  gap: 20pt;
  @media (max-width: 768px) {
    gap: 9pt;
  }
`;

const LabelBox = styled.div`
  margin-right: 9pt;
`;

const Labels = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 9pt;
  font-weight: 500;
  line-height: 15pt;
  text-align: left;
  color: #a6a9b0;
  @media (max-width: 768px) {
    font-size: 9pt;
  }
`;

const InfoBox = styled.div``;

const Infos = styled.span`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 9pt;
  font-weight: 500;
  line-height: 15pt;
  text-align: left;
  color: #a6a9b0;
  position: relative;
  padding-right: 10px;

  &:after {
    content: '';
    display: block;
    height: 80%;
    width: 1px;
    background: #a6a9b0;
    position: absolute;
    top: 2px;
    right: 5px;
  }

  @media (max-width: 768px) {
    font-size: 9pt;
  }
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
  font-size: 9pt;
  margin-top: 9pt;
  font-weight: 500;
  line-height: 15pt;
  text-align: left;
  color: #a6a9b0;
  @media (max-width: 768px) {
    font-size: 9pt;
  }
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
