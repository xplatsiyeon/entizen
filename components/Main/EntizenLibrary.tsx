import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Image from 'next/image';
import rightArrow from 'public/images/littleRightArrow.png';
import blackRightArrow from 'public/images/blackLittleRightArrow.png';
import React from 'react';
import colors from 'styles/colors';
import { useRouter } from 'next/router';

type Props = {};

const EntizenLibrary = (props: Props) => {
  const router = useRouter();
  return (
    <>
      <Wrapper>
        <LearnText>엔티즌 도서관</LearnText>
        <BoardBox>
          <LibraryList
            onClick={() =>
              window.open('http://post.naver.com/entizen_ev', 'entizen_post')
            }
          >
            <ProfileImg>
              <div></div>
            </ProfileImg>
            <TitleNDetail>
              <LibraryTitle>추후 문구 추가</LibraryTitle>
              <DetailView>
                자세히 보기{' '}
                <span>
                  <Image src={rightArrow} alt="icon" />
                </span>
              </DetailView>
            </TitleNDetail>
          </LibraryList>
          <LibraryList
            onClick={() =>
              window.open('http://post.naver.com/entizen_ev', 'entizen_post')
            }
          >
            <ProfileImg>
              <div></div>
            </ProfileImg>
            <TitleNDetail>
              <LibraryTitle>추후 문구 추가</LibraryTitle>
              <DetailView>
                자세히 보기{' '}
                <span>
                  <Image src={rightArrow} alt="icon" />
                </span>
              </DetailView>
            </TitleNDetail>
          </LibraryList>
          <LibraryList
            onClick={() =>
              window.open('http://post.naver.com/entizen_ev', 'entizen_post')
            }
          >
            <ProfileImg>
              <div></div>
            </ProfileImg>
            <TitleNDetail>
              <LibraryTitle>추후 문구 추가</LibraryTitle>
              <DetailView>
                자세히 보기{' '}
                <span>
                  <Image src={rightArrow} alt="icon" />
                </span>
              </DetailView>
            </TitleNDetail>
          </LibraryList>
          <LibraryList
            onClick={() =>
              window.open('http://post.naver.com/entizen_ev', 'entizen_post')
            }
          >
            <ProfileImg>
              <div></div>
            </ProfileImg>
            <TitleNDetail>
              <LibraryTitle>추후 문구 추가</LibraryTitle>
              <DetailView>
                자세히 보기{' '}
                <span>
                  <Image src={rightArrow} alt="icon" />
                </span>
              </DetailView>
            </TitleNDetail>
          </LibraryList>
        </BoardBox>
        <ShowAllBtnBox>
          <ShowAllBtn onClick={() => router.push('/library')}>
            <div>도서관</div>
            <div>&nbsp;전체보기</div>
            <div>
              <Image src={blackRightArrow} alt="icon" />
            </div>
          </ShowAllBtn>
        </ShowAllBtnBox>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin-top: 30pt;
  width: 100%;
`;

const LearnText = styled(Typography)`
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #222222;
`;

const BoardBox = styled.div`
  margin-top: 12.75pt;
  box-shadow: 0px 0px 10px 0px #89a3c933;
  border-radius: 6pt;
  padding-left: 9.75pt;
  padding-right: 10.5pt;
`;

const LibraryList = styled.div`
  border-top: 1px solid #e9eaee;
  display: flex;
  padding-left: 6pt;
  &:first-of-type {
    border-top: none;
  }
`;

const ProfileImg = styled.div`
  padding-top: 13.5pt;
  padding-bottom: 13.5pt;
  padding-right: 12pt;
  & > div {
    width: 33pt;
    height: 33pt;
    border: 1px solid #e2e5ed;
    border-radius: 50%;
  }
`;

const TitleNDetail = styled.div`
  padding-top: 12pt;
  padding-bottom: 12pt;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3pt;
`;

const LibraryTitle = styled(Typography)`
  font-size: 12pt;
  font-weight: 400;
  line-height: 18pt;
  letter-spacing: -0.02em;
`;

const DetailView = styled(Typography)`
  display: flex;
  align-items: center;
  font-size: 9pt;
  line-height: 15pt;
  font-weight: 500;
  color: ${colors.main};
  & span {
    display: flex;
    align-items: center;
    margin-left: 3pt;
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
`;

const ShowAllBtn = styled.div`
  padding: 6pt 7.5pt 6pt 9pt;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 9pt;
  font-weight: 500;
  line-height: 12pt;
  letter-spacing: -0.02em;
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
  }
`;

export default EntizenLibrary;
