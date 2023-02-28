import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useMediaQuery } from 'react-responsive';
import LandingHeader from 'components/Landing/LandingHeader';
import LandingFirstSlider from 'components/Landing/LandingFirstSlider';
import LandingSecondPart from 'components/Landing/LandingSecondPart';
import LandingThird from 'components/Landing/LandingThird';
import LandingFourth from 'components/Landing/LandingFourth';
import LandingFifth from 'components/Landing/LandingFifth';
import LandingSixth from 'components/Landing/LandingSixth';
import LandingSeventh from 'components/Landing/LandingSeventh';
import LandingEighth from 'components/Landing/LandingEighth';
import LandingNinth from 'components/Landing/LandingNinth';
import Image from 'next/image';
import UpArrow from 'public/Landing/LandingFooterUpArrow.svg';
const Landing = () => {
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  return (
    <WebBody>
      <LandingHeader />
      <Inner>
        <LandingFirstSlider />
        <LandingSecondPart />
        <LandingThird />
        <LandingFourth />
        <LandingFifth />
        <LandingSixth />
        <LandingSeventh />
        <LandingEighth />
        <LandingNinth />
      </Inner>
      <Footer>
        <CopyText>
          Copyright ⓒ 2023 LS ELECTRIC Co., Ltd. All Rights Reserved.
        </CopyText>
        <Button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Image src={UpArrow} />
          <BtnText>TOP</BtnText>
        </Button>
      </Footer>
    </WebBody>
  );
};

export default Landing;

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  width: 100vw;
  min-height: 100vh;
  margin: 0 auto;
  /* background: #fcfcfc; */
  background-color: white;
`;

const Inner = styled.div`
  display: block;
  position: relative;
  /* margin: 45.75pt auto; */

  //width: 281.25pt;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0;
    padding: 0;
    box-shadow: none;
    background: none;
  }
  @media (max-height: 500pt) {
    height: 100%;
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 32.25pt 46.5pt 29.25pt;
  @media (max-width: 899.25pt) {
    height: 100%;
    margin: 0;
  }
`;

const Body = styled.div<{ hiddenTag?: boolean }>`
  position: relative;
  width: 100%;

  @media (max-width: 899.25pt) {
    padding-top: ${({ hiddenTag }) => !hiddenTag && '12pt'};
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25.5pt 272.25pt;
  height: 66pt;
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
  width: 100%;
  border-bottom: 0.75pt solid #e9eaee;
  box-sizing: border-box;
`;

const ImgTag = styled.img``;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25.5pt 272.25pt;
  height: 66pt;
  /* box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2); */
  width: 100%;
  /* border-bottom: 0.75pt solid #e9eaee; */
  box-sizing: border-box;

  @media (max-width: 899.25pt) {
    padding: 12pt 15pt;
  }
`;

const CopyText = styled.span`
  font-family: 'Haan YHead L';
  font-size: 12pt;
  font-weight: 400;
  line-height: 19.5pt;
  letter-spacing: 0em;
  text-align: left;
  color: #a6a9b0;
`;

const Button = styled.div`
  height: 39pt;
  width: 39pt;
  border-radius: 50%;
  background-color: #222222;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
`;
const BtnText = styled.span`
  font-family: 'Haan YHead M';
  font-size: 7.5pt;
  font-weight: 400;
  line-height: 7.5pt;
  letter-spacing: 0em;
  text-align: left;
  padding-top: 4.5pt;
  color: white;
`;
