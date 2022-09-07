import Header from 'components/header';
import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import Image from 'next/image';
import companyImg from 'public/images/company.svg';
import companyOnImg from 'public/images/company_on.svg';
import userImg from 'public/images/user.svg';
import userOnImg from 'public/images/user_on.svg';
import { useState } from 'react';

const signUpSelect = () => {
  const [isCompany, setIsCompany] = useState(false);
  const [isUser, setIsUser] = useState(false);
  return (
    <Wrapper>
      <Header />
      <Notice variant="h3">어떤 용무로 오셨나요?</Notice>
      <SelectWrapper>
        <Select
          isclick={isCompany.toString()}
          onClick={() => {
            setIsCompany((prev) => !prev);
          }}
        >
          <Image src={isCompany ? companyOnImg : companyImg} alt="" />
          <div>기업회원</div>
        </Select>
        <Select
          isclick={isUser.toString()}
          onClick={() => {
            setIsUser((prev) => !prev);
          }}
        >
          <Image src={isUser ? userOnImg : userImg} alt="" />
          <div>일반회원</div>
        </Select>
      </SelectWrapper>
    </Wrapper>
  );
};

export default signUpSelect;
const Wrapper = styled.div`
  padding: 0 15pt 15pt 15pt;
`;
const Notice = styled(Typography)`
  margin-top: 51pt;
  font-weight: 700;
  font-size: 21pt;
  line-height: 33pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const SelectWrapper = styled(Box)`
  margin-top: 45pt;
`;
const Select = styled(Box)<{ isclick: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  gap: 18pt;
  padding: 21pt 0;
  border: 0.75pt solid
    ${({ isclick }) => (isclick === 'true' ? colors.main : colors.lightGray)};
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 8px;
  color: ${({ isclick }) => isclick === 'true' && colors.main};
  :nth-of-type(1) {
    margin-bottom: 21pt;
  }
  & > div {
    font-weight: 400;
    font-size: 18pt;
    line-height: 18pt;
  }
`;
