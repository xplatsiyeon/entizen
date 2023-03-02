import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Image from 'next/image';
import Sixth_1 from 'public/Landing/Sixth_1.svg';
import Sixth_2 from 'public/Landing/Sixth_2.svg';
import Sixth_3 from 'public/Landing/Sixth_3.svg';
import Sixth_4 from 'public/Landing/Sixth_4.svg';
import Sixth_5 from 'public/Landing/Sixth_5.svg';
import { useMediaQuery } from 'react-responsive';

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
  const mobile = useMediaQuery({
    query: '(max-width:600pt)',
  });
  return (
    <Wrapper>
      <Inner>
        {mobile ? (
          <>
            <MainText>
              엔티즌
              <br /> 100% 활용하기
            </MainText>
            <MobileBox>
              {ImgArray.map((item, index) => (
                <MobileWrapper key={index}>
                  <ImgBox>
                    <ImgTag src={item.url} />
                  </ImgBox>
                  <MobileTextBox>
                    <Step>{item.step}</Step>
                    <SubText>{item.text}</SubText>
                  </MobileTextBox>
                </MobileWrapper>
              ))}
            </MobileBox>
          </>
        ) : (
          <>
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
            </Box>
          </>
        )}
      </Inner>
    </Wrapper>
  );
};

export default LandingSixth;

const Wrapper = styled.div`
  background-color: #f8f8f8;
  padding: 120pt 0;
  @media (max-width: 600pt) {
    padding-top: 60pt;
    padding-bottom: 51pt;
  }
`;

const Inner = styled.div`
  @media (min-width: 600.75pt) {
    /* padding: 0 272.25pt; */
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  @media (max-width: 600pt) {
    padding-left: 24pt;
    padding-right: 0;
  }
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
  height: 133.5pt;
  width: 133.5pt;
  border-radius: 15pt;
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
  @media (max-width: 600pt) {
    width: 49.5pt;
    height: 51pt;
    border-radius: 6pt;
  }
`;

const ImgTag = styled.img`
  @media (max-width: 600pt) {
    width: 31.5pt;
  }
`;

const MainText = styled.span`
  font-family: 'Apple SD Gothic Neo';
  font-size: 37.5pt;
  font-weight: 700;
  line-height: 52.5pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #222222;
  padding-bottom: 60pt;
  @media (max-width: 600pt) {
    font-size: 19.5pt;
    font-weight: 700;
    line-height: 28.5pt;
    letter-spacing: -0.02em;
    text-align: left;
    padding-bottom: 0;
  }
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
  @media (max-width: 600pt) {
    font-size: 9pt;
    font-weight: 500;
    line-height: 9pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
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
  @media (max-width: 600pt) {
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 10.5pt;
    letter-spacing: -0.02em;
    text-align: left;
    padding-top: 6pt;
  }
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
  padding-top: 195pt;
`;

const MobileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15pt;
  padding-bottom: 9pt;
`;

const MobileTextBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const MobileBox = styled.div`
  padding-top: 27pt;
`;
