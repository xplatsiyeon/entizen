import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import colors from 'styles/colors';
import { Rating } from './AsRequestWriteReview';

type Props = {
  text: string;
  ratingScore: Rating;
  setRatingScore: Dispatch<SetStateAction<Rating>>;
};

const RatingBar = ({ text, ratingScore, setRatingScore }: Props) => {
  const [checked, setChecked] = useState<Number>(-1);
  const ratings = [1, 2, 3, 4, 5];
  const handleOnClick = (el: number, index: number) => {
    setChecked(index);
    if (text === '친절함') {
      setRatingScore({ ...ratingScore, kind: el });
    } else if (text === '신속함') {
      setRatingScore({ ...ratingScore, speed: el });
    } else if (text === '전문성') {
      setRatingScore({ ...ratingScore, pro: el });
    } else if (text === '만족도') {
      setRatingScore({ ...ratingScore, satisfy: el });
    }
  };
  useEffect(() => {
    console.log(ratingScore);
  }, [ratingScore]);
  return (
    <RatingBarBox>
      <RatingItem>{text}</RatingItem>
      <RatingBarWrapper>
        <RBarBox>
          {ratings.map((el, index) => (
            <RBar
              onClick={() => handleOnClick(el, index)}
              key={index}
              data-index={index}
              className={index <= checked ? 'forRadius filled' : 'forRadius'}
            ></RBar>
          ))}
        </RBarBox>
      </RatingBarWrapper>
    </RatingBarBox>
  );
};
const RatingBarBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12pt;
  border: 1px solid #e2e5ed;
  border-radius: 6pt;
  padding: 12pt;
`;

const RatingItem = styled.label`
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
`;

const RatingBarWrapper = styled.div`
  display: flex;
  gap: 12pt;
  align-items: center;
`;

const RBarBox = styled.div`
  border-radius: 22.5pt 22.5pt 22.5pt 22.5pt;
  width: 186pt;
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
    background-color: ${colors.main};
  }
`;

export default RatingBar;
