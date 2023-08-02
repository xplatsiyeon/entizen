import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Image from 'next/image';

import rightArrow from 'public/images/caretRight.svg';
import blackRightArrow from 'public/images/blackLittleRightArrow.png';
import React from 'react';
import colors from 'styles/colors';
import { useRouter } from 'next/router';
import { isTokenGetApi } from 'api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import entizenLibrarySample from 'public/images/entizenLibrarySample.png';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { openExternalBrowser } from 'bridge/appToWeb';
import { url } from 'inspector';

type Props = {
  fontSize?: number;
  smallfont?: number;
};

export type EntizenLibraryResponse = {
  isSuccess: boolean;
  data: {
    createdAt: string;
    libraryIdx: number;
    imageUrl: string;
    title: string;
    link: string;
  }[];
};

const EntizenLibrary = ({ fontSize, smallfont }: Props) => {
  const router = useRouter();
  const { data, isLoading, isError, refetch } =
    useQuery<EntizenLibraryResponse>('entizenLibraryList', () =>
      isTokenGetApi(`/libraries?page=1&limit=10`),
    );

  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);

  return (
    <>
      <Wrapper>
        <LearnText>엔티즌 도서관</LearnText>
        <BoardBox>
          {data?.data?.slice(0, 4).map((item, idx) => {
            const number = (idx + 1) % 2;
            return (
              <div key={idx}>
                <LibraryList
                  onClick={() => {
                    openExternalBrowser(userAgent, `${item?.link}`);
                    // location.href = `${item?.link}`;
                    // router.push(item?.link);
                  }}
                  index={number}
                >
                  <ProfileImg>
                    <ImgDiv src={`${item?.imageUrl}`} />
                  </ProfileImg>
                  <TitleNDetail>
                    <LibraryTitle fontSize={fontSize ? fontSize : 0}>
                      {item?.title}
                    </LibraryTitle>
                    <DetailView smallfont={smallfont ? smallfont : 0}>
                      자세히 보기
                      <span>
                        <Image src={rightArrow} alt="icon" layout="fill" />
                      </span>
                    </DetailView>
                  </TitleNDetail>
                </LibraryList>
              </div>
            );
          })}
        </BoardBox>

        <ShowAllBtnBox>
          <ShowAllBtn onClick={() => router.push('/library')}>
            <div>도서관</div>
            <div>&nbsp;전체보기</div>
            <ImageWrap>
              <Image
                className="arrow"
                layout="fill"
                src={blackRightArrow}
                alt="icon"
              />
            </ImageWrap>
          </ShowAllBtn>
        </ShowAllBtnBox>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 900pt;
  margin: 90pt auto 48pt;

  @media (max-width: 899.25pt) {
    margin: 15pt 0;
    width: 100%;
    padding-left: 15pt;
    padding-right: 15pt;
  }
`;

const LearnText = styled(Typography)`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 30pt;
  font-weight: 700;
  line-height: 30pt;
  letter-spacing: -0.02em;
  color: #222222;
  margin-bottom: 48pt;

  @media (max-width: 899.25pt) {
    font-size: 12pt;
    line-height: 12pt;
    margin-bottom: 0%;
  }
`;

const BoardBox = styled.div`
  margin-top: 12.75pt;
  /* padding-right: 10.5pt; */
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: 899.25pt) {
    padding-left: 0;
    padding-right: 0;
    box-shadow: 0px 0px 10px 0px #89a3c933;
    border-radius: 6pt;
    display: block;
  }
`;

const LibraryList = styled.div<{ index: number }>`
  display: flex;
  width: 433pt;
  height: 120pt;
  cursor: pointer;
  margin: ${({ index }) =>
    index === 0 ? '5pt 0 22.5pt 0' : '5pt 22.5pt 22.5pt 5pt'};
  /* margin-bottom: 22.5pt; */
  box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 12pt;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: auto;
    border-top: 0.75pt solid #e9eaee;
    box-shadow: none;
    border-radius: 6pt;
    margin: 0;
    padding-left: 0pt;
  }
`;

const ProfileImg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 32.5pt;
  & > div {
    /* width: 75pt;
    height: 75pt; */
    border: 1px solid #e2e5ed;
    border-radius: 50%;
    margin-right: 15pt;
  }
  @media (max-width: 899.25pt) {
    padding-top: 13.5pt;
    padding-bottom: 13.5pt;
    padding-right: 12pt;
    padding-left: 6pt;

    & > div {
      width: 33pt;
      height: 33pt;
      margin-right: 0;
    }
  }
`;

const TitleNDetail = styled.div`
  padding: 22.5pt 32.25pt 22.5pt 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3pt;
  @media (max-width: 899.25pt) {
    padding: 12pt 0;
  }
`;

const LibraryTitle = styled(Typography)<{ fontSize: number }>`
  font-size: ${({ fontSize }) => (fontSize !== 0 ? fontSize : 12)}pt;
  font-weight: 400;
  line-height: 18pt;
  letter-spacing: -0.02em;
  font-family: 'Spoqa Han Sans Neo';
`;

const DetailView = styled(Typography)<{ smallfont: number }>`
  display: flex;
  align-items: center;
  margin-top: 9.75pt;
  font-size: ${({ smallfont }) => (smallfont !== 0 ? smallfont : 9)}pt;
  line-height: 15pt;
  font-weight: 500;

  color: ${colors.main};
  font-family: 'Spoqa Han Sans Neo';
  cursor: pointer;
  & span {
    display: flex;
    align-items: center;
    margin-left: 4pt;
    width: 20px;
    height: 20px;
    position: relative;
  }
  @media (max-width: 899.25pt) {
    margin-top: 0;
  }
`;

const ShowAllBtnBox = styled.div`
  margin-top: 15pt;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 9pt;
  font-weight: 500;
  line-height: 12pt;
  letter-spacing: -0.02em;
  font-family: 'Spoqa Han Sans Neo';
  cursor: pointer;
`;

const ShowAllBtn = styled.div`
  padding: 12pt 120pt;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 12pt;
  font-weight: 500;
  line-height: 18pt;
  letter-spacing: -0.02em;
  font-family: 'Spoqa Han Sans Neo';
  text-align: left;
  border: 0.75pt solid #e2e5ed;
  border-radius: 21.75pt;
  margin-bottom: 10pt;
  & div {
    position: relative;
    top: 1pt;
  }
  & div:first-of-type {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    color: ${colors.main};
  }
  & div:nth-of-type(2) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 3pt;
  }
  & div:nth-of-type(3) {
    position: relative;
    top: 1.4pt;

    @media (max-width: 899.25pt) {
      top: 1px;
      width: 9pt;
      position: relative;
      height: 9pt;
    }
  }

  @media (max-width: 899.25pt) {
    padding: 6pt 7.5pt 6pt 9pt;
    font-size: 9pt;
    line-height: 12pt;
  }
`;

const ImageWrap = styled.div`
  position: relative;
`;

const ImgDiv = styled.img`
  width: 75pt;
  height: 75pt;
  border: 1px solid #e2e5ed;
  border-radius: 50%;
  margin-right: 15pt;
  object-fit: cover;
  @media (max-width: 899.25pt) {
    width: 50pt;
    height: 50pt;
    margin-right: 0;
  }
`;

export default EntizenLibrary;
