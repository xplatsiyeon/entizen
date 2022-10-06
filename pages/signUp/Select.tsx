import Header from 'components/header';
import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import Image from 'next/image';
import companyImg from 'public/images/company.svg';
import companyOnImg from 'public/images/company_on.svg';
import userImg from 'public/images/user.svg';
import userOnImg from 'public/images/user_on.svg';
import React, { useState } from 'react';
import Btn from 'components/button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import WebHeader from 'web-components/WebHeader';
import WebFooter from 'web-components/WebFooter';

const SignUpSelect = () => {
  const router = useRouter();
  const [userType, setUserType] = useState<number>(-1);
  const UserTypeList: string[] = ['기업회원', '일반회원'];
  const textList: string[] = ['고객과 손쉬운 거래를 진행하려면?', '다양한 충전기를 비교해보고 싶다면?']
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push('/signUp/Terms');
  };
  return (
    <React.Fragment>
      <Body>
        <WebHeader />
        <Inner>
          <Wrapper>
            <Header />
            <Notice variant="h3">어떤 용무로 오셨나요?</Notice>
            <SelectWrapper>
              {UserTypeList.map((type, index) => (
                <div key={index}>
                  <p className='webP'>{textList[index]}</p>
                  {type === '기업회원' && (
                    <Select
                      type={userType.toString()}
                      idx={index.toString()}
                      onClick={() => {
                        setUserType(index);
                      }}
                    >
                      <Image
                        src={userType === index ? companyOnImg : companyImg}
                        alt="company"
                      />
                      <div>{type}</div>
                    </Select>
                  )}
                  {type === '일반회원' && (
                    <Select
                      type={userType.toString()}
                      idx={index.toString()}
                      onClick={() => {
                        setUserType(index);
                      }}
                    >
                      <Image
                        src={userType === index ? userOnImg : userImg}
                        alt="user"
                      />
                      <div>{type}</div>
                    </Select>
                  )}
                </div>
              ))}
            </SelectWrapper>
            <Link href={'/signUpTerms'}>
              <Btn
                text={'다음'}
                handleClick={handleClick}
                marginTop={'42.75'}
                isClick={userType !== -1 && true}
              />
            </Link>
          </Wrapper>
        </Inner>
        <WebFooter />
      </Body>
    </React.Fragment>
  );
};

export default SignUpSelect;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;

  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  width: 345pt;
  //width: 281.25pt;
  background: #ffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;

  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    padding: 0;
    margin: 0;
    box-shadow: none;
    background: none;
  }
  @media (max-height: 500pt) {
    height: 100%;
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0 31.875pt;

  @media (max-width: 899pt) {
    height: 100%;
    margin: 0;
    padding: 0 15pt 15pt 15pt;
  }
`;

const Notice = styled(Typography)`
  margin-top: 45pt;
  font-weight: 700;
  font-size: 21pt;
  line-height: 33pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.main2};

  // 아래의 스타일은 바뀔수도 있음.
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -45pt);
    width: 100%;
  
    @media (max-width: 899pt) {
      position: relative;
      left: auto;
      transform: none;
      margin-top: 28.5pt;
  }  
`;
const SelectWrapper = styled(Box)`
  margin-top: 30pt;
  padding: 0 15pt;

  @media (max-width: 899pt) {
    padding: 0;
  }
`;
const Select = styled(Box)<{ type: string; idx: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  gap: 18pt;
  padding: 21pt 0;
  border: 0.75pt solid
    ${({ type, idx }) => (type === idx ? colors.main : colors.lightGray)};
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 8px;
  color: ${({ type, idx }) => type === idx && colors.main};
  background-color: ${({ type, idx }) => type === idx && '#f8f6ff'};
  :nth-of-type(1) {
    margin-bottom: 15pt;
  }
  & > div {
    font-weight: 400;
    font-size: 18pt;
    line-height: 18pt;
  }
`;
