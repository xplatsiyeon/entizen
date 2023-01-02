import React from 'react';
import styled from '@emotion/styled';
import { AdminBtn } from 'componentsAdmin/Layout';

type CompleteProjectReview = {
  attentivenessPoint: number;
  averagePoint: string;
  opinion: string;
  professionalismPoint: number;
  projectReviewIdx: number;
  quicknessPoint: number;
  satisfactionPoint: number;
};

type Props = {
  setReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
  reviewData: CompleteProjectReview;
};

const CompleteRating = ({ setReviewModal, reviewData }: Props) => {
  const reviewPoint = ['친절함', '신속함', '전문성', '만족도'];

  const score = [
    reviewData.attentivenessPoint,
    reviewData.quicknessPoint,
    reviewData.professionalismPoint,
    reviewData.satisfactionPoint,
  ];
  let checked = reviewPoint.map((r, idx) => {
    let temp = [];
    for (let i = 0; i < 5; i++) {
      if (score[idx] > i) {
        temp.push(true);
      } else {
        temp.push(false);
      }
    }
    return temp;
  });
  return (
    <>
      <RatingFormWrapper>
        <ReviewTitle>고객 리뷰</ReviewTitle>
        <AverageText>{reviewData?.averagePoint}점</AverageText>
        <FlexWrap>
          {reviewPoint.map((row, idx) => (
            // 위에서 만든 체크배열을 이용하여 점수 막대 만듦. true는 파란색 칸, false는 회색 칸.
            <RBarBox key={idx}>
              <Title>{row}</Title>
              {checked[idx].map((el, idx) =>
                el ? (
                  <RBar key={idx} className="filled forRadius" />
                ) : (
                  <RBar key={idx} className="forRadius" />
                ),
              )}
            </RBarBox>
          ))}
        </FlexWrap>
        <TextArea
          // placeholder="[선택] 파트너의 어떤점이 기억에 남으시나요?"
          placeholder=""
          rows={8}
          value={reviewData.opinion}
          required
          readOnly={true}
        />
        <BtnWrapper>
          <AdminBtn
            onClick={() => {
              setReviewModal(false);
            }}
          >
            닫기
          </AdminBtn>
        </BtnWrapper>
      </RatingFormWrapper>
    </>
  );
};

export default CompleteRating;

const ReviewTitle = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 15pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: left;
  padding-bottom: 10px;
`;

const RatingFormWrapper = styled.div`
  padding: 30px 15px 25px 15px;
  display: flex;
  flex-direction: column;
  gap: 6pt;
  width: 734px;
  height: 500px;
  background: white;
  box-shadow: 3pt 0px 7.5pt rgba(137, 163, 201, 0.5);
  position: absolute;
  top: 23%;
  left: 10%;
  z-index: 500;
`;

const FlexWrap = styled.div`
  width: 734px;
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
`;

const RBarBox = styled.div`
  border: 1px solid #e2e5ed;
  border-radius: 8px;
  padding: 12pt;
  height: 10.5pt;
  display: flex;
  align-items: center;
  width: 345px;
  gap: 1.5pt;
  background-color: #ffffff;
  & > .forRadius:first-of-type {
    border-radius: 6pt 0 0 6pt;
  }
  & > .forRadius:nth-of-type(5) {
    border-radius: 0 6pt 6pt 0;
  }
`;

const Title = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
  margin-right: 9pt;
`;

const RBar = styled.div`
  width: 36pt;
  height: 10.5pt;
  background-color: #f3f4f7;
  &.filled {
    background-color: #5221cb;
  }
`;

const TextArea = styled.textarea`
  margin: 28pt 0 0;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 12pt;
  line-height: 20pt;
  letter-spacing: -0.02em;
  color: #222222;
  padding-top: 12pt;
  padding-left: 12pt;
  border: 0.75pt solid #e2e5ed;
  resize: none;
  border-radius: 6pt;

  @media (max-width: 899.25pt) {
    margin: 28pt 0;
  }
`;

const AverageText = styled.div`
  font-weight: bold;
  font-size: 16px;
  text-align: right;
  color: #5221cb;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
`;
