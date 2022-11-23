import styled from '@emotion/styled';
import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';
import MypageHeader from 'components/mypage/request/header';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { AsDetailReseponse } from '.';

type Props = {};

// 리뷰 완료 리뷰 확인 가능 페이지

const MyReview = (props: Props) => {
  const router = useRouter();
  const routerId = router?.query?.afterSalesServiceIdx;
  const reviewPoint = ['친절함', '신속함', '전문성', '만족도'];
  const { data, isLoading, isError, error } = useQuery<AsDetailReseponse>(
    'as-detail',
    () => isTokenGetApi(`/after-sales-services/${routerId}`),
    {
      enabled: router.isReady,
    },
  );

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    console.log(error);
  }

  const review =
    data?.data.afterSalesService.afterSalesService.afterSalesServiceReview!;
  // 각 score 값에 맞게 체크된 배열이 만들어진다.
  // ex) 친절함 :4  -> [true, true, true, true, false]
  const score = [
    review.attentivenessPoint,
    review.quicknessPoint,
    review.professionalismPoint,
    review.satisfactionPoint,
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
    <Body>
      <WebHeader />
      <Inner>
        <Wrapper>
          <Wrap>
            <MypageHeader
              title={'A/S 리뷰보기'}
              exitBtn={true}
              handleOnClick={() => router.back()}
            />
          </Wrap>
          <ReviewTitle>A/S 리뷰보기</ReviewTitle>
          <RatingForm>
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

            <TextArea
              placeholder="[선택] 파트너의 어떤점이 기억에 남으시나요?"
              rows={8}
              value={review.opinion}
              required
              readOnly={true}
            />
          </RatingForm>
        </Wrapper>
      </Inner>
      <WebFooter />
    </Body>
  );
};

export default MyReview;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  width: 345pt;
  //width: 281.25pt;
  background: #ffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0;
    padding: 0;
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0 31.875pt;
  @media (max-width: 899.25pt) {
    margin: 0 15pt;
  }
`;

const Wrap = styled.div`
  margin-left: -15pt;
  margin-top: 9pt;
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
    position: absolute;
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
  width: 36pt;
  height: 10.5pt;
  background-color: #f3f4f7;
  &.filled {
    background-color: #5221cb;
  }
`;

const Title = styled.p`
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
  margin-right: 9pt;
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
const ReviewTitle = styled.p`
  font-family: Spoqa Han Sans Neo;
  font-size: 15pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;

  @media (max-width: 899.25pt) {
    display: none;
  }
`;
