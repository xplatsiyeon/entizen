import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Image from 'next/image';
import Sixth_1 from 'public/Landing/Sixth_1.svg';
import Sixth_2 from 'public/Landing/Sixth_2.svg';
import Sixth_3 from 'public/Landing/Sixth_3.svg';
import Sixth_4 from 'public/Landing/Sixth_4.svg';
import Sixth_5 from 'public/Landing/Sixth_5.svg';

const ImgArray = [
  {
    id: 0,
    url: 'Landing/Sixth_1.svg',
    arrow: 'Landing/SixthRightArrow.svg',
    step: 'STEP 1',
    text: '예상수익 확인',
  },
  {
    id: 1,
    url: 'Landing/Sixth_2.svg',
    arrow: 'Landing/SixthRightArrow.svg',
    step: 'STEP 2',
    text: '견적 요청',
  },
  {
    id: 2,
    url: 'Landing/Sixth_3.svg',
    arrow: 'Landing/SixthRightArrow.svg',
    step: 'STEP 3',
    text: '상품 비교/선택',
  },
  {
    id: 3,
    url: 'Landing/Sixth_4.svg',
    arrow: 'Landing/SixthRightArrow.svg',
    step: 'STEP 4',
    text: '프로젝트 모니터링',
  },
  {
    id: 4,
    url: 'Landing/Sixth_5.svg',
    arrow: '',
    step: 'STEP 5',
    text: '운영 및 관리',
  },
];

const LandingSixth = () => {
  return (
    <Wrapper>
      <Inner>
        <MainText>엔티즌 100% 활용하기</MainText>
        <Box>
          <ImgContainer>
            {ImgArray.map((item, index) => (
              <Container>
                <Align>
                  <ArrowAlign>
                    <ImgBox key={index}>
                      <ImgTag src={item.url} />
                    </ImgBox>
                  </ArrowAlign>
                  <TextBox>
                    <Step>{item.step}</Step>
                    <SubText>{item.text}</SubText>
                  </TextBox>
                </Align>
                <ArrowImgBox index={index}>
                  <ImgTag src={item.arrow} />
                </ArrowImgBox>
              </Container>
            ))}
          </ImgContainer>
          {/* {ImgArray.map((item, index) => (
            <ArrowAlign key={index}>
              <TextBox>
                <Step>{item.step}</Step>
                <SubText>{item.text}</SubText>
              </TextBox>
              <ImgTag src={item.arrow} />
            </ArrowAlign>
          ))} */}
        </Box>
      </Inner>
    </Wrapper>
  );
};

export default LandingSixth;

const Wrapper = styled.div`
  background-color: #f8f8f8;
  padding: 160px 0;
`;

const Inner = styled.div`
  padding: 0 363px;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImgBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: white;
  height: 178px;
  width: 178px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
`;

const ImgTag = styled.img``;

const MainText = styled.div`
  font-family: 'Apple SD Gothic Neo';
  font-size: 37.5pt;
  font-weight: 700;
  line-height: 52.5pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #222222;
  padding-bottom: 60pt;
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 33pt;
`;

const Step = styled.span`
  font-family: 'Apple SD Gothic Neo';
  font-size: 15pt;
  font-weight: 500;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #5221cb;
`;

const SubText = styled.span`
  font-family: 'Apple SD Gothic Neo';
  font-size: 15pt;
  font-weight: 800;
  line-height: 22.5pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #222222;
  padding-top: 15pt;
`;

const ArrowAlign = styled.div`
  display: flex;
  align-items: center;
`;

const Align = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ArrowImgBox = styled.div<{ index: number }>`
  padding-left: ${({ index }) => (index !== 4 ? '26.625pt' : '')};
  padding-right: ${({ index }) => (index !== 4 ? '26.625pt' : '')};
  padding-top: 260px;
`;
