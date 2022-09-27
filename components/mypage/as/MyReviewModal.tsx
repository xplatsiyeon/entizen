import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import colors from 'styles/colors';
import { Rating } from './AsRequestWriteReview';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import MypageHeader from '../request/header';

type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>> | undefined;
  modalOpen: boolean;
};
const MyReviewModal = ({ setModalOpen, modalOpen }: Props) => {
  const { reviewContent } = useSelector(
    (state: RootState) => state.reviewContent,
  );
  const ratings = [1, 2, 3, 4, 5];
  const handleOnClick = () => {
    if (setModalOpen) {
      setModalOpen(false);
    }
  };
  return (
    <Container>
      <MypageHeader
        title={'내 리뷰 보기'}
        exitBtn={true}
        handleOnClick={handleOnClick}
      />
      <Wrapper>
        <RatingBarBox>
          <RatingItem>친절함</RatingItem>
          <RatingBarWrapper>
            <RBarBox>
              {ratings.map((el, index) => (
                <RBar
                  key={index}
                  className={
                    index < reviewContent.kind
                      ? 'forRadius filled'
                      : 'forRadius'
                  }
                ></RBar>
              ))}
            </RBarBox>
          </RatingBarWrapper>
        </RatingBarBox>
        <RatingBarBox>
          <RatingItem>신속함</RatingItem>
          <RatingBarWrapper>
            <RBarBox>
              {ratings.map((el, index) => (
                <RBar
                  key={index}
                  className={
                    index < reviewContent.speed
                      ? 'forRadius filled'
                      : 'forRadius'
                  }
                ></RBar>
              ))}
            </RBarBox>
          </RatingBarWrapper>
        </RatingBarBox>
        <RatingBarBox>
          <RatingItem>전문성</RatingItem>
          <RatingBarWrapper>
            <RBarBox>
              {ratings.map((el, index) => (
                <RBar
                  key={index}
                  className={
                    index < reviewContent.pro ? 'forRadius filled' : 'forRadius'
                  }
                ></RBar>
              ))}
            </RBarBox>
          </RatingBarWrapper>
        </RatingBarBox>
        <RatingBarBox>
          <RatingItem>만족도</RatingItem>
          <RatingBarWrapper>
            <RBarBox>
              {ratings.map((el, index) => (
                <RBar
                  key={index}
                  className={
                    index < reviewContent.satisfy
                      ? 'forRadius filled'
                      : 'forRadius'
                  }
                ></RBar>
              ))}
            </RBarBox>
          </RatingBarWrapper>
        </RatingBarBox>
        <TextArea
          placeholder="[선택] 파트너의 어떤점이 기억에 남으시나요?"
          rows={8}
          value={reviewContent.reviewText}
          readOnly
        />
      </Wrapper>
    </Container>
  );
};
const Container = styled.div`
  height: 100%;
  background-color: #ffffff;
  top: 0;
  position: fixed;
  z-index: 1000;
`;

const Wrapper = styled.div`
  height: 100%;
  background-color: #ffffff;
  padding-left: 15pt;
  padding-right: 15pt;
  margin-top: 21pt;
  display: flex;
  flex-direction: column;
  gap: 6pt;
  z-index: 1000;
`;
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

const TextArea = styled.textarea`
  resize: none;
  border: 1px solid #e2e5ed;
  padding: 12pt;
  margin-top: 21pt;
  border-radius: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 12pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  color: #222222;
`;

export default MyReviewModal;
