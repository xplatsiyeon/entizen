import styled from '@emotion/styled';
import { AfterSalesServiceReview } from 'pages/mypage/as';
import colors from 'styles/colors';

type Props = {
  review: AfterSalesServiceReview;
};

const AsCompGetReview = ({ review }: Props) => {
  const reviewPoint = ['친절함', '신속함', '전문성', '만족도'];

  const score = [
    review?.attentivenessPoint,
    review?.quicknessPoint,
    review?.professionalismPoint,
    review?.satisfactionPoint,
  ];

  // 각 score 값에 맞게 체크된 배열이 만들어진다.
  // ex) 친절함 :4  -> [true, true, true, true, false]
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

  {
    /* 점수 배열의 평균값 구하기 */
  }
  const average = () => {
    const total = score.reduce((pre, cur) => {
      return pre + cur;
    });
    const ave = (total / 4).toString().substring(0, 3);
    return ave;
  };

  return (
    <>
      <TitleBox>
        <ReviewP>A/S 리뷰</ReviewP>
        {review && <AveScore>{`${average()}점`}</AveScore>}
      </TitleBox>
      <RatingForm>
        {review ? (
          <>
            {reviewPoint.map((r, idx) => (
              <RBarBox key={idx}>
                <Title>{r}</Title>
                {checked[idx].map((c, idx) =>
                  c ? (
                    <RBar className="filled forRadius" />
                  ) : (
                    <RBar className="forRadius" />
                  ),
                )}
              </RBarBox>
            ))}
            <TextArea
              rows={4}
              value={review?.opinion}
              required
              readOnly={true}
            />
          </>
        ) : (
          <TextArea
            className="noneRivew"
            placeholder={'고객이 작성한 리뷰가 없습니다.'}
            rows={4}
            required
            readOnly={true}
          />
        )}
      </RatingForm>
    </>
  );
};

export default AsCompGetReview;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30pt;
`;

const RatingForm = styled.div`
  margin-top: 20.25pt;
  display: flex;
  flex-direction: column;
  gap: 6pt;
  width: 100%;
  background: white;
  top: 25pt;

  @media (max-width: 899.25pt) {
    // position: absolute;
    top: 25pt;
  }
`;

const RBarBox = styled.div`
  border: 1px solid #e2e5ed;
  border-radius: 8px;
  padding: 12pt;
  height: 10.5pt;
  display: flex;
  gap: 1.5pt;
  background-color: #ffffff;
  & > .forRadius:first-of-type {
    border-radius: 6pt 0 0 6pt;
  }
  & > .forRadius:nth-of-type(5) {
    border-radius: 0 6pt 6pt 0;
  }
`;

const RBar = styled.div`
  width: 20%;
  height: 10.5pt;
  background-color: #f3f4f7;
  &.filled {
    background-color: #5221cb;
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
  width: 37.5pt;
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
  margin-top: 12pt;
  padding-left: 12pt;
  border: 1px solid #e2e5ed;
  border-radius: 6pt;
  resize: none;
  &.noneRivew {
    padding-left: 0;
  }
  ::placeholder {
    text-align: center;
    padding: 28.5pt 0;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
  }
  @media (max-width: 899.25pt) {
    margin: 0;
  }
`;

const ReviewP = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  color: #222222;
`;
const AveScore = styled(ReviewP)`
  color: #5221cb; ;
`;
