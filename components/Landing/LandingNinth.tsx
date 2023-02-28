import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Image from 'next/image';
import MainImg from 'public/Landing/LandingNinth.png';
import Arrow from 'public/Landing/NinthArrow.svg';

const LandingNinth = () => {
  // 이메일 주소 복사하는 함수
  const handleCopyEmail = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
    } catch (error) {}
  };
  const [mailOn, setMailOn] = useState<boolean>(false);

  return (
    <Wrapper>
      <Title>Our Partners</Title>
      <UnderLeftText>
        엔티즌과 함께 일상을 바꾸실
        <br />
        파트너분들을 찾습니다.
      </UnderLeftText>
      <RightBox
        onClick={() => {
          setMailOn(true);
          setTimeout(function () {
            setMailOn(false);
          }, 2000);
          handleCopyEmail('entizen@entizen.kr');
        }}
      >
        <Image src={Arrow} />
        <UnderRightText>제휴 문의</UnderRightText>
      </RightBox>
      <MailCopyBtn mailOn={mailOn}>이메일 주소가 복사 되었습니다.</MailCopyBtn>
      <Image src={MainImg} />
    </Wrapper>
  );
};

export default LandingNinth;

const Wrapper = styled.div`
  position: relative;
`;

const Title = styled.span`
  position: absolute;
  z-index: 10;
  /* font-family: 'Haan YHead B'; */
  font-family: 'Apple SD Gothic Neo';
  font-size: 26px;
  /* font-weight: 400; */
  font-weight: 700;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: left;
  color: #ffffff;
  opacity: 0.4;
  top: 77px;
  left: 260px;
`;

const UnderLeftText = styled.span`
  position: absolute;
  z-index: 10;
  top: 202.5pt;
  left: 195pt;
  font-family: 'Apple SD Gothic Neo';
  font-size: 19.5pt;
  font-weight: 800;
  line-height: 30pt;
  letter-spacing: -0.02em;
  text-align: left;
  white-space: pre;
  color: #ffffff;
`;

const RightBox = styled.div`
  position: absolute;
  z-index: 10;
  top: 232.5pt;
  right: 195pt;
  display: flex;
  align-items: center;
  gap: 9pt;
  cursor: pointer;
`;

const UnderRightText = styled.span`
  font-family: 'Apple SD Gothic Neo';
  font-size: 12pt;
  font-weight: 600;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #ffffff;
`;

const MailCopyBtn = styled.div<{ mailOn: boolean }>`
  position: relative;
  top: 140pt;
  padding: 16pt 49.5pt;
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;
  background-color: #464646;
  color: #ffffff;
  border-radius: 8pt;
  display: ${({ mailOn }) => (mailOn === true ? '' : 'none')};
`;
