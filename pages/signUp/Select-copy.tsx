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

const SignUpSelect = () => {
  const router = useRouter();
  const [userType, setUserType] = useState<number>(-1);
  const UserTypeList: string[] = ['기업회원', '일반회원'];
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push('/signUp/Terms');
  };
  return (
    <Wrapper>
      <Header />
      <Notice variant="h3">어떤 용무로 오셨나요?</Notice>
      <SelectWrapper>
        {UserTypeList.map((type, index) => (
          <div key={index}>
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
  );
};

export default SignUpSelect;
const Wrapper = styled.div`
  padding: 0 15pt 15pt 15pt;
`;
const Notice = styled(Typography)`
  margin-top: 28.5pt;
  font-weight: 700;
  font-size: 21pt;
  line-height: 33pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const SelectWrapper = styled(Box)`
  margin-top: 30pt;
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
