import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useMediaQuery } from 'react-responsive';

const LandingHeader = () => {
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  return (
    <HeaderWrapper>
      <Box>
        <ImgTag src="Landing/EntizenLogo.svg" alt="EntizenLogo" />
        <Button>
          <span className="text">무엇이든 물어보세요</span>
          {!mobile && <ImgTag src="Landing/RightWhiteArrow.svg" />}
        </Button>
      </Box>
    </HeaderWrapper>
  );
};

export default LandingHeader;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 25.5pt 272.25pt; */
  height: 66pt;
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
  width: 100%;
  border-bottom: 0.75pt solid #e9eaee;
  box-sizing: border-box;

  @media (max-width: 899.25pt) {
    padding: 12pt 15pt;
  }
`;

const ImgTag = styled.img``;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6pt;
  padding: 9pt 15pt;
  background-color: #222222;
  border-radius: 21.75pt;
  cursor: pointer;
  @media (max-width: 899.25pt) {
    padding: 6pt 9pt;
    height: 21pt;
  }
  .text {
    font-family: 'Apple SD Gothic Neo';
    font-size: 10.5pt;
    font-weight: 800;
    line-height: 13.5pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: white;

    @media (max-width: 899.25pt) {
      font-size: 9pt;
      font-weight: 800;
      line-height: 9pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }
`;

const Box = styled.div`
  width: 895.5pt;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  @media (max-width: 600pt) {
    padding: 12pt 15pt;
    height: 36pt;
    width: 100%;
  }
`;
