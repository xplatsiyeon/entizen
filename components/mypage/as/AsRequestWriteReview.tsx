import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Image from 'next/image';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import Rating from '@mui/material/Rating';
import React, { useState } from 'react';
import RatingBar from './RatingBar';

export interface Rating {
  kind: number;
  speed: number;
  pro: number;
  satisfy: number;
}
type Props = {};

const AsRequestWriteReview = (props: Props) => {
  const [ratingScore, setRatingScore] = useState<Rating>({
    kind: 0,
    speed: 0,
    pro: 0,
    satisfy: 0,
  });
  const [reqeustText, setReqeustText] = useState<string>('');
  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReqeustText(() => e.target.value);
  };
  return (
    <Wrapper>
      <DownArrowBox>
        <Image src={DoubleArrow} alt="double-arrow" />
      </DownArrowBox>
      <ReviewTitleBox>
        <ReviewTitle>제공받은 A/S가 어떠셨나요?</ReviewTitle>
        <OpinionThanks>
          소중한 의견 하나하나가 엔티즌에게 큰 힘이 됩니다.
        </OpinionThanks>
      </ReviewTitleBox>
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
          value={reqeustText}
          onChange={handleTextArea}
          required
        />
      </RatingForm>
      <BtnBox>
        <RightBtn>건너뛰기</RightBtn>
        <LeftBtn>보내기</LeftBtn>
      </BtnBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  padding-left: 15pt;
  padding-right: 15pt;
`;

const DownArrowBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 21pt;
`;

const ReviewTitleBox = styled.div`
  margin-top: 37.5pt;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ReviewTitle = styled(Typography)`
  font-family: Spoqa Han Sans Neo;
  font-size: 18pt;
  font-weight: 500;
  line-height: 24pt;
  letter-spacing: -0.02em;
  text-align: center;
`;

const OpinionThanks = styled(Typography)`
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #747780;
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

const BtnBox = styled.div`
  display: flex;
  gap: 11.25pt;
  bottom: 30pt;
`;

const RightBtn = styled.button`
  width: 100%;
  padding: 15pt 38.25pt;
`;
const LeftBtn = styled.button`
  width: 100%;
  padding: 15pt 38.25pt;
`;

export default AsRequestWriteReview;
