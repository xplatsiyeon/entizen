import React from 'react';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import rightArrow from 'public/images/rightArrow.png';
import Image from 'next/image';
import { display } from '@mui/system';
import { useRouter } from 'next/router';

type Props = {};

const MyEstimateProject = (props: Props) => {
  const router = useRouter();
  return (
    <Wrapper>
      <BoxWrapper onClick={() => router.push('/mypage')}>
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
          <Count>3</Count>
          <Amount>건</Amount>
        </CountBox>
      </BoxWrapper>
      <BoxWrapper onClick={() => alert('2차 작업 범위 페이지입니다.')}>
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
          <Count>2</Count>
          <Amount>건</Amount>
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

const BoxWrapper = styled.div`
  border: 1px solid #e2e5ed;
  border-radius: 6pt;
  box-shadow: 0px 0px 10px 0px #89a3c933;
  padding-top: 15pt;
  padding-left: 12pt;
  padding-right: 12.75pt;
  padding-bottom: 12.75pt;
  & div:nth-of-type(2) {
    display: flex;
    justify-content: end;
  }
`;

const BoxName = styled.div`
  margin-bottom: 21pt;
  display: flex;
  align-items: center;
  position: relative;
  & p {
    position: relative;
    font-size: 12pt;
    line-height: 12pt;
  }
  & p:nth-of-type(3) {
    position: relative;
    bottom: 0.3pt;
  }
`;

const CountBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Count = styled(Typography)`
  margin-right: 3pt;
  font-weight: 700;
  font-size: 15pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: #caccd1;
`;

const Amount = styled(Typography)`
  font-weight: 400;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #595757;
  vertical-align: middle;
`;

export default MyEstimateProject;
