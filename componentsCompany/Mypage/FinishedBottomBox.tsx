import styled from '@emotion/styled';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import colors from 'styles/colors';
import fileImg from 'public/mypage/file-icon.svg';
import { Button } from '@mui/material';
import RatingBar from 'components/mypage/as/RatingBar';
import { Rating } from 'components/mypage/as/AsRequestWriteReview';

type Props = {};

const FinishedBottomBox = (props: Props) => {
  const [ratingScore, setRatingScore] = useState<Rating>({
    attentivenessPoint: 0,
    quicknessPoint: 0,
    professionalismPoint: 0,
    satisfactionPoint: 0,
  });
  const DownloadFile = useCallback(() => {
    let fileName = 'Charge Point 카탈로그_7 KW';
    let content = 'Charge Point 카탈로그_7 KW 테스트';
    const blob = new Blob([content], {
      type: 'text/plain',
    });
    const url = window.URL.createObjectURL(blob);
    const element = document.createElement('a');
    element.href = url;
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    element.remove();
    window.URL.revokeObjectURL(url);
  }, []);
  const HandleModal = () => {
    // setModalOpen(false);
  };
  return (
    <>
      <Wrapper>
        <ImageBox>
          <Image src={DoubleArrow} alt="doubleArrow" layout="fill" />
        </ImageBox>
        <BiggerText>계약서를 작성해 주세요.</BiggerText>
        <Contents>
          <div className="text-box">
            <span className="name">이름</span>
            <span className="text">윤세아</span>
          </div>
          <div className="text-box">
            <span className="name">연락처</span>
            <span className="phone">010-3522-2250</span>
          </div>
        </Contents>
        <BiggerText className="catalog">첨부 파일</BiggerText>
        <FileBox>
          <FileBtn onClick={DownloadFile}>
            <Image src={fileImg} alt="file-icon" />
            충전건 1.jpg
          </FileBtn>
          <FileBtn onClick={DownloadFile}>
            <Image src={fileImg} alt="file-icon" />
            Charge Point 카탈로그_7 kW
          </FileBtn>
        </FileBox>
        <BiggerText className="review">고객 리뷰</BiggerText>
        <RatingForm>
          <RatingBar
            text={'친절함'}
            ratingScore={ratingScore}
            setRatingScore={setRatingScore}
          />
          <RatingBar
            text={'신속함'}
            ratingScore={ratingScore}
            setRatingScore={setRatingScore}
          />
          <RatingBar
            text={'전문성'}
            ratingScore={ratingScore}
            setRatingScore={setRatingScore}
          />
          <RatingBar
            text={'만족도'}
            ratingScore={ratingScore}
            setRatingScore={setRatingScore}
          />
          <TextArea
            placeholder="[선택] 파트너의 어떤점이 기억에 남으시나요?"
            rows={8}
            value={'dkdkdkdk'}
            required
          />
        </RatingForm>
      </Wrapper>
      <BtnBox></BtnBox>
    </>
  );
};
const Wrapper = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  margin-top: 21pt;
  position: relative;
  .catalog {
    margin-top: 18pt;
    margin-bottom: 15pt;
  }
  .review {
    border-top: 1px solid #e9eaee;
    margin-top: 6pt;
    padding-top: 18pt;
  }
`;
const ImageBox = styled.div`
  width: 24pt;
  height: 24pt;
  margin: 0 auto;
  position: relative;
`;
const CustomerInfo = styled.div`
  padding-left: 67.5pt;
  padding-right: 67.5pt;
  margin-top: 37.5pt;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CenterImgBox = styled.div`
  position: relative;
  width: 48pt;
  height: 48pt;
`;

const BiggerText = styled.div`
  margin-top: 37.5pt;
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: 0em;
  text-align: left;
`;

const BtnBox = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-left: 15pt;
  padding-right: 15pt;
  width: 100%;
  gap: 6pt;
  bottom: 30pt;
`;

const Contents = styled.div`
  padding-top: 19.5pt;
  padding-bottom: 18pt;
  border-bottom: 1px solid #e9eaee;
  .text-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    :not(:nth-of-type(1)) {
      padding-top: 12pt;
    }

    .emailText {
      font-family: Spoqa Han Sans Neo;
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: right;
    }
  }

  .name {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
  }
  .text {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: right;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .img-box {
    padding-top: 42pt;
    padding-bottom: 24pt;
    text-align: center;
  }

  .phone {
    text-decoration: underline;
    color: ${colors.main};
  }
`;

const FileBtn = styled.button`
  text-align: left;
  margin-bottom: 6pt;
  display: flex;
  box-sizing: content-box;
  gap: 3pt;
  background-color: #ffffff;
  padding: 7.5pt 6pt;
  border: 0.75pt solid ${colors.lightGray3};
  color: ${colors.gray2};
  border-radius: 6pt;
`;

const FileBox = styled.div`
  padding-bottom: 12pt;
`;

const RatingForm = styled.div`
  margin-top: 20.25pt;
  display: flex;
  flex-direction: column;
  gap: 6pt;
`;

const TextArea = styled.textarea`
  resize: none;
  border: 1px solid #e2e5ed;
  padding: 12pt;
  margin-top: 18pt;
  margin-bottom: 36pt;
  border-radius: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 12pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  &::placeholder {
    color: #caccd1;
  }
`;

export default FinishedBottomBox;
