import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
// import RightArrow from 'public/images/CaretRightArrow.png';
import RightArrow from 'public/images/RightMenuArrowSvg.svg';
import Image from 'next/image';
import Chats from '../public/images/Chats.png';
import MyProductList from '../public/images/MyProductListPng.png';
import ReceivedQuotation from '../public/images/ReceivedQuotation.png';
import EntizenLibrary from '../public/images/EntizenLibraryIcon.png';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';

type Props = { type: string };

const CompanyRightMenu = () => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  return (
    <MenuRapper open={open}>
      <MenuContainer>
        <LeftArrow open={open}>
          <ImageIcon open={open}>
            <Image
              src={RightArrow}
              alt="right-arrow"
              onClick={() => {
                setOpen(!open);
              }}
            />
          </ImageIcon>
        </LeftArrow>
        {open && (
          <>
            <MenuOpenWrapper>
              <MenuBox
                onClick={() => {
                  router.push('/company/chatting');
                }}
              >
                <ImageBoxS>
                  <Image src={Chats} alt="Chats" />
                </ImageBoxS>
                <MenuTitle>소통하기</MenuTitle>
                <Divide />
              </MenuBox>
              <MenuBox
                onClick={() => {
                  router.push({
                    pathname: '/company/quotation',
                  });
                }}
              >
                <ImageBoxL>
                  <Image src={ReceivedQuotation} alt="Chats" />
                </ImageBoxL>
                <MenuTitle>받은 요청</MenuTitle>
                <Divide />
              </MenuBox>
              <MenuBox
                onClick={() => {
                  router.push({
                    pathname: '/company/myProductList',
                  });
                }}
              >
                <ImageBoxL>
                  <Image src={MyProductList} alt="Chats" />
                </ImageBoxL>
                <MenuTitle>내 제품 리스트</MenuTitle>
              </MenuBox>
            </MenuOpenWrapper>
          </>
        )}
      </MenuContainer>
    </MenuRapper>
  );
};

const MenuRapper = styled.div<{ open: boolean }>`
  position: fixed;
  right: 20pt;
  top: 165pt;
  border-radius: 12pt;

  ${({ open }) =>
    open === true &&
    css`
      background-color: #ffffff;
      box-shadow: 0pt 0pt 7.5pt 0pt #89a3c933;
    `}
  padding: 28pt 14pt 24pt;

  z-index: 100;
  @media (max-width: 1125pt) {
    border-radius: 10pt;
    right: 10pt;
    top: 165pt;
  }

  @media (max-width: 1049.25pt) {
    display: none;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Poligon = styled.div`
  clip-path: polygon(
    100% 0%,
    100% 100%,
    32% 100%,
    35% 21%,
    21% 20%,
    8% 15%,
    18% 11%,
    34% 8%,
    34% 0
  );
  border: 1px solid red;
  position: absolute;
  background-color: red;
`;

const MenuBox = styled.div`
  cursor: pointer;
`;

const ImageBoxS = styled.div`
  width: 28pt;
  margin: 0 auto;
  display: flex;
  align-items: center;
  @media (max-width: 1125pt) {
  }
`;

const ImageBoxL = styled.div`
  width: 22pt;
  margin: 0 auto;
  display: flex;
  align-items: center;
  @media (max-width: 1125pt) {
  }
`;

const MenuTitle = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 500;
  line-height: 12pt;
  letter-spacing: -0.02em;
  padding-top: 12pt;
  text-align: center;
  @media (max-width: 1125pt) {
    font-size: 9pt;
    font-weight: 400;
    width: 35pt;
    margin: 0 auto;
  }
`;

const Divide = styled.div`
  border: 0.75pt solid #e9eaee;
  padding: 0 30pt;
  margin: 24pt 0;
  @media (max-width: 1125pt) {
    padding: 0 20pt;
    margin: 15pt 0;
  }
`;

const LeftArrow = styled.div<{ open: boolean }>`
  position: fixed;
  z-index: 10;
  top: 187.5pt;
  right: 90pt;
  background-color: #ffffff;
  border-radius: 100%;
  box-shadow: ${({ open }) =>
    open ? '-1.5pt 0pt 3pt 0pt #89a3c933' : '0pt 0pt 7.5pt 0pt #89a3c933'};

  @media (max-width: 1125pt) {
    right: 63pt;
  }
`;

const ImageIcon = styled.div<{ open: boolean }>`
  padding: 8pt 10pt;
  width: 27pt;
  height: 27pt;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${({ open }) =>
    open === false &&
    css`
      transform: rotate(180deg);
    `}
  @media (max-width: 1125pt) {
    padding: 4pt 6pt;
  }
`;

const Circle = styled.div`
  width: 36px;
  height: 36px;
  background-color: white;
  border-radius: 50%;
  transform: translate(-43px, -306px);
  box-shadow: 0pt 0pt 7.5pt 0pt #89a3c933;
`;

const MenuOpenWrapper = styled.div`
  z-index: 100;
`;

export default CompanyRightMenu;
