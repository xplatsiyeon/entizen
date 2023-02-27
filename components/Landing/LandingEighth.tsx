import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Image from 'next/image';
import Eighth_1 from 'public/Landing/LandingEighth_1.svg';
import Eighth_2 from 'public/Landing/LandingEighth_2.svg';
import Eighth_3 from 'public/Landing/LandingEighth_3.svg';

const LandingEighth = () => {
  return (
    <Wrapper>
      <MainText>
        생활을 바꾸는 선택,
        <br />
        엔티즌과 함께
      </MainText>
      <Container>
        <Box>
          <Title>풍부한 정보</Title>
          <ImgBox>
            <Image src={Eighth_1} />
          </ImgBox>
          <SubTitle>
            충전기의 모든 것,
            <br />내 손 안에서
          </SubTitle>
        </Box>
        <Box>
          <Title>플러그 할 권리</Title>
          <ImgBox>
            <Image src={Eighth_2} />
          </ImgBox>
          <SubTitle>
            누구나, 어디서나
            <br />
            이용가능한 충전기
          </SubTitle>
        </Box>
        <Box>
          <Title>그린라이프</Title>
          <ImgBox>
            <Image src={Eighth_3} />
          </ImgBox>
          <SubTitle>
            너와 나, 우리 모두의
            <br />
            깨끗한 생활
          </SubTitle>
        </Box>
      </Container>
    </Wrapper>
  );
};

export default LandingEighth;

const Wrapper = styled.div`
  background-color: #f8f8f8;
  padding: 120pt 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 33.75pt;
`;

const Box = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 282pt;
  width: 276pt;
  background-color: white;
  border-radius: 15;
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
  padding: 30.75pt 0 23.25pt 30.75pt;
  /* padding: 41px 0 31px 0; */
`;

const MainText = styled.span`
  padding-bottom: 60pt;
  font-family: 'Apple SD Gothic Neo';
  font-size: 37.5pt;
  font-weight: 700;
  line-height: 52.5pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #222222;
  white-space: pre;
`;

const Title = styled.span`
  font-family: 'Apple SD Gothic Neo';
  font-size: 19.5pt;
  font-weight: 800;
  line-height: 31.5pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #222222;
  padding-bottom: 30.75pt;
`;

const SubTitle = styled.span`
  font-family: 'Apple SD Gothic Neo';
  font-size: 15pt;
  font-weight: 500;
  line-height: 25.5pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #828282;
  padding-top: 35.25pt;
`;

const ImgBox = styled.div`
  margin: 0 auto;
  padding-right: 30.75pt;
`;
