import React, { useEffect, useState } from 'react';
import MouseArrowIcon from 'public/Landing/MouseArrowIcon.svg';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Image from 'next/image';
// import SecondMainImg from 'public/Landing/SecondLanding.png';
import SecondMainImg from 'public/Landing/SecondLandingImgNoText.png';
import { light } from '@mui/material/styles/createPalette';

const LandingSecondPart = () => {
  // const completedTitle = 'Charge your life.';
  const completedTitle = 'Charge your';
  const completedTitle2 = 'life';
  const [landingTitle, setLandingTitle] = useState('');
  const [landingTitle2, setLandingTitle2] = useState('');
  const [ladningLife, setLandingLife] = useState('');
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [contLife, setCountLife] = useState(0);
  const [countNow, setCountNow] = useState(false);

  // useEffect(() => {
  //   const typingInterval = setInterval(
  //     () => {
  //       setLandingTitle(landingTitle + completedTitle[count]);
  //       setCount(count + 1);

  //       // setLandingTitle((prevTitleValue) => {
  //       //   let result = prevTitleValue
  //       //     ? prevTitleValue + completedTitle[count]
  //       //     : completedTitle[0];
  //       //   setCount(count + 1);

  //       //   if (count >= completedTitle.length) {
  //       //     setCount(0);
  //       //     setLandingTitle('');
  //       //   }

  //       //   return result;
  //       // });
  //     },
  //     count === 11 ? 1300 : 300,
  //   );

  //   if (count === 11) {
  //     setCountNow(true);
  //   } else {
  //     setCountNow(false);
  //   }
  //   if (count > completedTitle.length) {
  //     clearInterval(typingInterval);
  //     setCount(0);
  //     setLandingTitle('');
  //   }
  //   return () => {
  //     clearInterval(typingInterval);
  //   };
  // }, [count]);

  // useEffect(() => {
  //   const typingInterval2 = setInterval(() => {
  //     setLandingTitle2(landingTitle2 + completedTitle2[count2]);
  //     setCount2(count2 + 1);
  //   }, 300);
  //   if (count2 > completedTitle2.length || countNow === false) {
  //     clearInterval(typingInterval2);
  //     setCount2(0);
  //     setLandingTitle2('');
  //   }
  //   return () => {
  //     clearInterval(typingInterval2);
  //   };
  // }, [countNow, count2]);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setLandingLife(ladningLife + completedTitle2[contLife]);
      setCountLife(contLife + 1);
      // setLandingTitle((prevTitleValue) => {
      //   let result = prevTitleValue
      //     ? prevTitleValue + completedTitle[count]
      //     : completedTitle[0];
      //   setCount(count + 1);

      //   if (count >= completedTitle.length) {
      //     setCount(0);
      //     setLandingTitle('');
      //   }

      //   return result;
      // });
    }, 400);

    // if (count === 11) {
    //   setCountNow(true);
    // } else {
    //   setCountNow(false);
    // }
    if (contLife > completedTitle2.length) {
      clearInterval(typingInterval);
      setCountLife(0);
      setLandingLife('');
    }
    return () => {
      clearInterval(typingInterval);
    };
  }, [contLife]);

  return (
    <Wrapper>
      <ImgBox>
        <Image src={MouseArrowIcon} />
      </ImgBox>

      <White />
      <Black>
        <MainImgBox>
          <TextTyping>
            {/* <TextTypingFirst>
              {landingTitle !== undefined && landingTitle}
            </TextTypingFirst> */}
            <TextTypingFirst>Charge your</TextTypingFirst>
            {/* <TextTypingSecond count={count}>
              {count === 11 && landingTitle2 !== undefined && landingTitle2}
            </TextTypingSecond> */}
            <TextTypingSecond count={contLife}>{ladningLife}</TextTypingSecond>
            {/* {count2 === 4 && <Dot />} */}
            {contLife === 4 && <Dot />}
          </TextTyping>
          <Image src={SecondMainImg} />
          {/* <img src="Landing/SecondLanding.png" /> */}
        </MainImgBox>
        <TextBox>
          <MainText color={'#838383'}>
            복잡하고 생소한 충전기 설치,
            <br />
          </MainText>
          <MainText color={'white'}>
            엔티즌에서 쉽게 알아보고
            <br /> 한눈에 비교하세요.
          </MainText>
        </TextBox>
      </Black>
    </Wrapper>
  );
};

export default LandingSecondPart;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const White = styled.div`
  /* height: ${100 / (1 / 3)}vh; */
  width: 100%;

  /* padding-top: 450pt; */
  padding-top: 33.3%;
  background-color: white;
  @media (max-width: 600pt) {
    /* padding-top: 280pt; */
    /* padding-top: 50%; */
    padding-top: 33.3%;
  }
`;

const Black = styled.div`
  /* height: ${100 / (2 / 3)}; */
  /* height: 664.5pt; */
  /* height: 66.6%; */
  width: 100%;
  background-color: #000000;
  padding-bottom: 98.25pt;
  @media (max-width: 600pt) {
    /* height: 207.75pt; */
    height: 66.6%;
    padding-bottom: 38.25pt;
  }
`;

const ImgBox = styled.div`
  padding-top: 75pt;
  padding-bottom: 200pt;
  @media (max-width: 600pt) {
    padding-top: 0;
    padding-bottom: 45pt;
  }
`;

// 1669;
// 869;
const MainImgBox = styled.div`
  position: relative;
  left: 0;
  z-index: 50;
  padding: 0 94.5pt;
  transform: translate(0, -55%);
  @media (max-width: 600pt) {
    padding: 0 24.75pt;
  }
`;

const TextTyping = styled.div`
  display: flex;
  align-items: center;
  z-index: 100;
  position: absolute;
  top: 40%;
  left: 30%;
`;

const TextTypingFirst = styled.span`
  color: white;
  font-family: 'Apple SD Gothic Neo', 'Spoqa Han Sans Neo';
  /* font-family: 'AppleSDGothicNeo', 'Noto Sans KR', sans-serif; */
  font-weight: 700;
  font-size: 60pt;
  line-height: 90pt;
  @media (max-width: 600pt) {
    font-size: 15pt;
    font-weight: 400;
    line-height: 21.75pt;
    letter-spacing: 0em;
    text-align: left;
  }
`;

const TextTypingSecond = styled.span<{ count?: number }>`
  /* font-family: 'Spoqa Han Sans Neo'; */
  font-family: 'Finger Paint', cursive;
  color: #5221cb;
  height: 67.5pt;
  /* font-family: 'AppleSDGothicNeo', 'Noto Sans KR', sans-serif; */
  font-weight: 400;
  font-size: 60pt;
  line-height: 90pt;
  padding-left: 15pt;
  border-bottom: ${({ count }) => (count !== 0 ? '3.75pt solid white' : '')};
  /* border-bottom: 3.75pt solid white; */
  @media (max-width: 600pt) {
    font-size: 15pt;
    font-weight: 400;
    line-height: 21.75pt;
    letter-spacing: 0em;
    text-align: left;
    height: 15pt;
    padding-left: 5pt;
    /* border-bottom: ${({ count }) =>
      count === 11 ? '2pt solid white' : ''}; */
    border-bottom: ${({ count }) => (count !== 0 ? '2pt solid white' : '')};
    /* border-bottom: 2pt solid white; */
  }
`;

const Dot = styled.div`
  width: 7.5pt;
  height: 7.5pt;
  background-color: white;
  margin-left: 15pt;
  margin-top: 60pt;
  @media (max-width: 600pt) {
    margin-left: 7pt;
    margin-top: 15pt;
    width: 4pt;
    height: 4pt;
  }
`;

const TextBox = styled.div`
  /* padding-top: 350.25pt; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: -15%;
  @media (max-width: 600pt) {
    /* padding-top: 100pt; */
    margin-top: -15%;
  }
`;

const MainText = styled.span<{ color: string }>`
  /* font-family: 'AppleSDGothicNeo', 'Noto Sans KR', sans-serif; */
  /* font-family: 'AppleGothicNeo'; */
  font-family: 'Spoqa Han Sans Neo';
  font-size: 27pt;
  font-weight: 700;
  line-height: 45pt;
  letter-spacing: -0.02em;
  text-align: center;
  white-space: pre;
  color: ${({ color }) => color && color};
  @media (max-width: 600pt) {
    font-size: 15pt;
    font-weight: 700;
    line-height: 24pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
`;
