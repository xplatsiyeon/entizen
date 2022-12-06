import React from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import RightArrow from 'public/images/CaretRightArrow.png';
import Image from 'next/image';
import Chats from '../public/images/Chats.png';
import MyProductList from '../public/images/MyProductListPng.png';
import ReceivedQuotation from '../public/images/ReceivedQuotation.png';
import EntizenLibrary from '../public/images/EntizenLibraryIcon.png';
import { useRouter } from 'next/router';

type Props = { type: string };

const UserRightMenu = () => {
  const router = useRouter();
  return (
    <MenuRapper>
      <MenuContainer>
        <LeftArrow>
          <ImageIcon>
            <Image src={RightArrow} alt="right-arrow" />
          </ImageIcon>
        </LeftArrow>
        <MenuBox
          onClick={() => {
            router.push('/chatting');
          }}
        >
          <ImageBoxS>
            <Image src={Chats} alt="Chats" />
          </ImageBoxS>
          <MenuTitle onClick={()=>router.push('/chatting')}>소통하기</MenuTitle>
          <Divide />
        </MenuBox>
        <MenuBox
          onClick={() => {
            router.push('/library');
          }}
        >
          <ImageBoxL>
            <Image src={EntizenLibrary} alt="Chats" />
          </ImageBoxL>
          <MenuTitle2>엔티즌 도서관</MenuTitle2>
        </MenuBox>
      </MenuContainer>
    </MenuRapper>
  );
};

const MenuRapper = styled.div`
  position: fixed;
  z-index: 100;
  right: 20pt;
  top: 120pt;
  border-radius: 12pt;
  background-color: #ffffff;
  padding: 28pt 14pt 24pt;
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;

  @media (max-width: 1125pt) {
    top: 130pt;
    border-radius: 10pt;
    right: 10pt;
  }

  @media (max-width: 1049.25pt) {
    display: none;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const MenuTitle = styled.p`
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

const MenuTitle2 = styled.p`
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
    width: 30pt;
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

const LeftArrow = styled.div`
  position: fixed;
  z-index: 10;
  top: 145pt;
  right: 90pt;
  background-color: #ffffff;
  border-radius: 100%;
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;

  @media (max-width: 1125pt) {
    top: 155pt;
    right: 63pt;
  }
`;

const ImageIcon = styled.div`
  padding: 8pt 10pt;
  @media (max-width: 1125pt) {
    padding: 4pt 6pt;
  }
`;

export default UserRightMenu;
