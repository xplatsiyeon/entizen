import styled from '@emotion/styled';
import Modal from 'components/Modal/Modal';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import colors from 'styles/colors';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import AsRequestWriteReview from '../as/AsRequestWriteReview';
import Image from 'next/image';
import { ProjectReview } from 'QueryComponents/UserQuery';

type Props = {
  review: boolean;
  data: ProjectReview;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const PlaceGetReview = ({ review, data }: Props) => {
  const reviewPoint = ['친절함', '신속함', '전문성', '만족도'];

  const score = [
    data?.attentivenessPoint,
    data?.quicknessPoint,
    data?.professionalismPoint,
    data?.satisfactionPoint,
  ];

  {
    /* 받은 데이터에 review 여부에 따라 리턴되는 태그가 다름.  */
  }
  // rivew, score 값이 있으면, 각 score 값에 맞게 체크된 배열이 만들어진다.
  // ex) 친절함 :4  -> [true, true, true, true, false]
  let checked = reviewPoint.map((r, idx, setOpen) => {
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
    <Wrap>
      <DownArrowBox>
        <Image src={DoubleArrow} alt="double-arrow" />
      </DownArrowBox>
      <RatingForm>
        <ReviewTitle>내 충전소 리뷰 보기</ReviewTitle>

        <MobWrap>
          {reviewPoint.map((r, idx) => {
            // 위에서 만든 체크배열을 이용하여 점수 막대 만듦. true는 파란색 칸, false는 회색 칸.
            return (
              <RBarBox key={idx}>
                <Title>{r}</Title>
                {checked[idx].map((check, idx) =>
                  check ? (
                    <RBar className="filled forRadius" />
                  ) : (
                    <RBar className="forRadius" />
                  ),
                )}
              </RBarBox>
            );
          })}

          <Contents>{data?.opinion}</Contents>
        </MobWrap>
      </RatingForm>
    </Wrap>
  );
};

export default PlaceGetReview;

const Wrap = styled.div`
  margin: 0 15pt;
  @media (min-width: 900pt) {
    margin: 0 auto;
    width: 350pt;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
    border-radius: 12pt;
    padding: 34.2pt 46.5pt 15.2pt 46.5pt;
  }
`;

const RatingForm = styled.div`
  padding-top: 30pt;
  display: flex;
  flex-direction: column;
  gap: 6pt;
  width: 100%;
  min-height: 100vh;
  position: absolute;
  background: white;
  top: 30pt;
  left: 0;
  @media (min-width: 900pt) {
    margin-top: 0;
    padding-top: 0;
    position: static;
    min-height: auto;
  }
`;

const ReviewTitle = styled.div`
  display: none;
  @media (min-width: 900pt) {
    display: block;
    padding-bottom: 30pt;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 700;
    font-size: 15pt;
    line-height: 15pt;
    text-align: center;
    color: #222222;
  }
`;

const RBarBox = styled.div`
  border: 0.75pt solid #e2e5ed;
  border-radius: 8px;
  padding: 12pt;
  /* height: 10.5pt; */
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
    background-color: ${colors.main};
  }
  @media (min-width: 900pt) {
    width: 36pt;
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
  width: 40pt;
  color: #222222;
`;
const DownArrowBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 21pt;
  @media (min-width: 900pt) {
    display: none;
  }
`;

const Contents = styled.span`
  margin: 28pt 0;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 12pt;
  line-height: 20pt;
  letter-spacing: -0.02em;
  width: 100%;
  color: #222222;
  box-sizing: border-box;
  padding-left: 12pt;
  padding-top: 12pt;
  padding-right: 7.5pt;
  border: 0.75pt solid #e2e5ed;
  border-radius: 6pt;
  resize: none;
  min-height: 150pt;
  ::placeholder {
    color: #222222;
    font-weight: 400;
  }
`;

const Btn2 = styled.button`
  width: 100%;
  background-color: ${colors.main};
  padding: 15pt 0;
  border-radius: 6pt;
  position: relative;
  bottom: auto;
  margin-bottom: 30pt;
  span {
    color: white;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    text-align: center;
    letter-spacing: -0.02em;
  }
`;

const MobWrap = styled.div`
  margin: 0 15pt;
  position: relative;
  gap: 6pt;
  display: flex;
  flex-direction: column;

  @media (min-width: 900pt) {
    margin: 0;
  }
`;
