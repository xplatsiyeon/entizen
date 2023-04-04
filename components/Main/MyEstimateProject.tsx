import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import rightArrow from 'public/images/rightArrow.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Count } from '.';

type Props = {
  borders?: number | undefined;
  quotationData: Count;
  projectData: Count;
};

const MyEstimateProject = ({ borders, quotationData, projectData }: Props) => {
  const userID = sessionStorage.getItem('USER_ID');
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
                color: '#222222',
              }}
            >
              내 견적서
            </Typography>
            <ImageWrap>
              <Typography
                sx={{
                  width: '12pt',
                  padding: '0',
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <Image src={rightArrow} alt="rightArrow" />
              </Typography>
              <IconWrap>
                <Image src={rightArrow} layout="fill" alt="rightArrow" />
              </IconWrap>
            </ImageWrap>
          </BoxName>
        </Box>
        <CountBox>
          <Count>{userID ? quotationData?.data?.count : '0'}</Count>
          <Amount>{'건'}</Amount>
        </CountBox>
      </BoxWrapper>
      <BoxWrapper
        borders={borders ? borders : 0}
        onClick={() =>
          userID ? router.push('/mypage?id=1') : router.push('/signin')
        }
      >
        <Box>
          <BoxName>
            <Typography
              sx={{
                marginRight: '3pt',
                padding: '0',
                color: '#222222',
              }}
            >
              내 프로젝트
            </Typography>
            <ImageWrap>
              <Typography
                sx={{
                  width: '12pt',
                  padding: '0',
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <Image src={rightArrow} alt="rightArrow" />
              </Typography>
              <IconWrap>
                <Image src={rightArrow} layout="fill" alt="rightArrow" />
              </IconWrap>
            </ImageWrap>
          </BoxName>
        </Box>
        <CountBox>
          <Count>{userID ? projectData?.data?.count : '0'}</Count>
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

  @media (max-width: 899.25pt) {
    gap: 11.25pt;
    flex: none;
    margin-top: 60pt;
    height: auto;
  }
`;

const BoxWrapper = styled.div<{ borders: number }>`
  border: 1.5pt solid #e2e5ed;
  border-radius: ${({ borders }) => (borders !== 0 ? borders : 6)}pt;
  box-shadow: 0pt 0pt 7.5pt 0pt #89a3c933;
  min-width: 210pt;
  min-height: 168pt;
  /* padding: 33pt 28.5pt 26.25pt; */
  padding: 33pt 28.5pt 26.25pt 28.5pt;
  cursor: pointer;
  & div:nth-of-type(2) {
    display: flex;
    justify-content: flex-end;
  }
  @media (max-width: 899.25pt) {
    padding-top: 15pt;
    padding-left: 12pt;
    padding-right: 12.75pt;
    padding-bottom: 12.75pt;
    min-width: 113.625pt;
    min-height: 75pt;
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

  @media (max-width: 899.25pt) {
    margin-bottom: 21pt;
    & P {
      font-family: 'Spoqa Han Sans Neo';
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
  @media (max-width: 899.25pt) {
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

  @media (max-width: 899.25pt) {
    font-weight: 400;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    margin-top: 0;
  }
`;

const ImageWrap = styled.div`
  p {
    display: none;
  }
  @media (max-width: 899.25pt) {
    p {
      display: block;
    }
  }
`;
const IconWrap = styled.div`
  width: 21pt;
  height: 21pt;
  position: relative;
  object-fit: cover;

  @media (max-width: 899.25pt) {
    display: none;
  }
`;

export default MyEstimateProject;
