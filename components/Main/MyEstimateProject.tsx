import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import rightArrow from 'public/images/rightArrow.png';
import Image from 'next/image';
import { display } from '@mui/system';
import { useRouter } from 'next/router';
import colors from 'styles/colors';

type Props = {
  borders?: number | undefined;
};

const MyEstimateProject = ({ borders }: Props) => {
  const userID = localStorage.getItem('USER_ID');
  const router = useRouter();
  return (
    <Wrapper>
      <BoxWrapper
        borders={borders ? borders : 0}
        onClick={() =>
          userID ? router.push('/mypage') : router.push('/signin')
        }
      >
        <Box>
          <BoxName>
            <Typography
              sx={{
                marginRight: '3pt',
                padding: '0',
              }}
            >
              내 견적서
            </Typography>
            <Typography
              sx={{
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <Image src={rightArrow} alt="rightArrow" />
            </Typography>
          </BoxName>
        </Box>
        <CountBox>
          <Count>{userID ? '3' : '0'}</Count>
          <Amount>{'건'}</Amount>
        </CountBox>
      </BoxWrapper>
      <BoxWrapper
        borders={borders ? borders : 0}
        onClick={() => alert('2차 작업 범위 페이지입니다.')}
      >
        <Box>
          <BoxName>
            <Typography
              sx={{
                marginRight: '3pt',
                padding: '0',
              }}
            >
              내 프로젝트
            </Typography>
            <Typography
              sx={{
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <Image src={rightArrow} alt="rightArrow" />
            </Typography>
          </BoxName>
        </Box>
        <CountBox>
          <Count>{userID ? '2' : '0'}</Count>
          <Amount>{'건'}</Amount>
        </CountBox>
      </BoxWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22.5pt;
  height: 165pt;
  @media (max-width: 899pt) {
    gap: 11.25pt;
    flex: none;
    margin-top: 60pt;
    height: auto;
  }
`;

const BoxWrapper = styled.div<{ borders: number }>`
  border: 1px solid #e2e5ed;
  border-radius: ${({ borders }) => (borders !== 0 ? borders : 6)}pt;
  box-shadow: 0px 0px 10px 0px #89a3c933;
  padding: 33pt 28.5pt 26.25pt;
  & div:nth-of-type(2) {
    display: flex;
    justify-content: end;
  }
  @media (max-width: 899pt) {
    padding-top: 15pt;
    padding-left: 12pt;
    padding-right: 12.75pt;
    padding-bottom: 12.75pt;
  }
`;

const BoxName = styled.div`
  margin-bottom: 58.5pt;
  display: flex;
  align-items: center;
  position: relative;
  & p {
    position: relative;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 21pt;
    font-weight: 700;
    line-height: 21pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
  & p:nth-of-type(3) {
    position: relative;
    bottom: 0.3pt;
  }

  @media (max-width: 899pt) {
    margin-bottom: 21pt;
    & P {
      font-size: 12pt;
      line-height: 12pt;
    }
  }
`;

const CountBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Count = styled(Typography)`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 27pt;
  font-weight: 700;
  line-height: 25.5pt;
  letter-spacing: -0.02em;
  margin-right: 3pt;
  text-align: right;
  color: #5a2dc9;
  @media (max-width: 899pt) {
    font-size: 15pt;
    line-height: 15pt;
  }
`;

const Amount = styled(Typography)`
  margin-top: 6pt;
  color: #595757;
  vertical-align: middle;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 16.5pt;
  font-weight: 500;
  line-height: 21pt;
  text-align: left;

  @media (max-width: 899pt) {
    font-weight: 400;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    margin-top: 0;
  }
`;

export default MyEstimateProject;
