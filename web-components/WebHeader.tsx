import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import colors from 'styles/colors';
import Logos from 'public/images/webLogo.png';
import Chat from 'public/images/chat.png';
import Bell from 'public/images/bell.png';
import BellOutline from 'public/images/Bell_outline.png';
import Frame from 'public/images/Frame.png';
import GuideLink from 'components/GuideLink';
import { Router, useRouter } from 'next/router';

type Props = {
  num?: number;
  now?: string;
};

const WebHeader = ({ num, now }: Props) => {
  const [linklist, setLinklist] = useState<boolean>(false);
  const [type, setType] = useState<string>('');

  const router = useRouter();

  const isUser = localStorage.getItem('USER_ID');
  //if(!isUser)localStorage.setItem('USER_ID','user'). 유저 테스트용 코드

  const handleLink = () => {
    if (isUser) {
      router.push('/quotation/request');
    } else {
      router.push('/signin');
    }
  };

  return (
    <>
      <Wrapper>
        <MainLink>
          <Inner>
            <Box1>
              <LogoBox>
                <Link href="/">
                  <Image src={Logos} alt="logo" layout="intrinsic" />
                </Link>
              </LogoBox>
              <DivBox onClick={handleLink}>간편견적</DivBox>
              <DivBox
                onClick={() => {
                  setLinklist(!linklist);
                  setType('guide');
                }}
              >
                가이드
              </DivBox>
              <DivBox onClick={() => alert('2차 작업 범위입니다')}>
                소통하기
              </DivBox>
              <DivBox
                onClick={() => {
                  setLinklist(!linklist);
                  setType('mypage');
                }}
              >
                마이페이지
              </DivBox>
            </Box1>
            <Box2>
              {/* <DivBox2><input type="text" placeholder="서비스를 검색해보세요" /> </DivBox2> */}

              {isUser ? (
                <>
                  <DivBox2>
                    <IconBox>
                      <Image
                        src={Chat}
                        alt="question"
                        onClick={() => router.push('/faq')}
                      />
                    </IconBox>
                    <IconBox>
                      <Image
                        src={BellOutline}
                        alt="bell on"
                        onClick={() => router.push('/alarm')}
                      />
                    </IconBox>
                    <IconBox>
                      <Image src={Frame} alt="frame" />
                    </IconBox>
                  </DivBox2>
                </>
              ) : (
                <>
                  <DivBox2>
                    <IconBox>
                      <Image
                        src={Chat}
                        alt="question"
                        onClick={() => router.push('/faq')}
                      />
                    </IconBox>
                    <IconBox>
                      <Image
                        src={Bell}
                        alt="alram"
                        onClick={() => router.push('/alarm')}
                      />
                    </IconBox>
                  </DivBox2>
                  <DivBox2>
                    <Link href="/signin">
                      <a>로그인</a>
                    </Link>
                  </DivBox2>
                  <DivBox2>
                    {/*
                <Link href="/signUp/Terms"> */}
                    <Link href="/testTest">
                      <a>회원가입</a>
                    </Link>
                  </DivBox2>
                </>
              )}
            </Box2>
          </Inner>
        </MainLink>
        {linklist ? <GuideLink type={type} num={num} now={now} /> : null}
      </Wrapper>
    </>
  );
};

export default WebHeader;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  //margin-bottom: 45.75pt;
  border-bottom: 1px solid #e9eaee;
  background: #ffff;
  box-sizing: border-box;

  @media (max-width: 899pt) {
    display: none;
  }
`;
const MainLink = styled.div`
  width: 100%;
  border-bottom: 1px solid #e9eaee;
  box-sizing: border-box;
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 900pt;
  height: 100%;
  //max-height: 81pt;
`;

const Box1 = styled.div`
  display: flex;
  height: 70pt;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 54pt;
  cursor: pointer;
`;

const IconBox = styled.div`
  display: flex;
  flex: 1;
  margin-right: 15pt;
  width: 21pt;
  height: 21pt;
  cursor: pointer;
  &:nth-last-of-type(1) {
    margin-right: 0;
  }
`;

const DivBox = styled.div`
  margin-right: 30pt;
  display: flex;
  align-items: center;
  cursor: pointer;

  font-weight: bold;
  font-size: 13.5pt;
  line-height: 13.5pt;
  font-family: 'Spoqa Han Sans Neo';
  color: ${colors.main2};
  text-decoration: none;
  a {
    font-weight: bold;
    font-size: 13.5pt;
    line-height: 13.5pt;
    font-family: 'Spoqa Han Sans Neo';
    color: ${colors.main2};
    text-decoration: none;
  }
`;

const Box2 = styled.div`
  display: flex;
  height: 70pt;
`;
const DivBox2 = styled.div`
  margin-right: 18pt;
  display: flex;
  align-items: center;

  a {
    font-weight: normal;
    font-size: 10.5pt;
    line-height: 12pt;
    font-family: 'Spoqa Han Sans Neo';
    color: ${colors.main2};
    text-decoration: none;
  }
`;
