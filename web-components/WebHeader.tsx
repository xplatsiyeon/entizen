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
import Vector from 'public/images/Vector.png';
import GuideLink from 'components/GuideLink';
import { Router, useRouter } from 'next/router';


type Props = {
  num?: number;
  now?: string;
};

const WebHeader = ({ num, now }: Props) => {
  const [linklist, setLinklist] = useState<boolean>(false);
  const [type, setType] = useState<string>('');
  const [user, setUser] = useState<boolean>();

  const route = useRouter();

  useEffect(()=>{

   const isUser= localStorage.getItem('USER_ID');
   console.log('user', isUser)
   if(isUser){setUser(true)}
   /*else{
    localStorage.setItem('USER_ID','user')
   } */ //테스트용코드.
  },[])

  return (
    <>
      <Wrapper>
        <MainLink>
          <Inner>
            <Box1>
              <LogoBox>
                <Link href="/">
                  <a href="/">
                    <Image src={Logos} alt="logo" layout="intrinsic" />
                  </a>
                </Link>
              </LogoBox>
              <DivBox>
                <Link href="/quotation/request">
                  <a>간편견적</a>
                </Link>
              </DivBox>
              <DivBox
                onClick={() => {
                  setLinklist(!linklist);
                  setType('guide');
                }}
              >
                가이드
              </DivBox>
              <DivBox>
                <Link href="/">
                  <a>소통하기</a>
                </Link>
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

              {user?
              <>
              <DivBox2>
              <IconBox>
                <Image src={BellOutline} alt="bell on" onClick={()=>route.push('/alarm')}/>
              </IconBox>
              <IconBox>
                <Image src={Frame} alt="frame" />
                <Image src={Vector} alt="" />
              </IconBox>
              </DivBox2>
              </>
              :<>
              <DivBox2>
              <IconBox>
                <Image src={Chat} alt="question" />
              </IconBox>
              <IconBox>
                <Image src={Bell} alt="alram" />
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
              </>}
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
`;

const IconBox = styled.div`
  display: flex;
  flex: 1;
  margin-right: 15pt;
  width: 21pt;
  height:21pt; 
  &:nth-last-of-type(1){
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
    font-weight: nomal;
    font-size: 10.5pt;
    line-height: 12pt;
    font-family: Spoqa Han Sans Neo;
    color: ${colors.main2};
    text-decoration: none;
  }
`;
