import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Image from 'next/image';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import Rating from '@mui/material/Rating';
import React, { useEffect, useState } from 'react';
import RatingBar from './RatingBar';
import colors from 'styles/colors';
import { useMutation } from 'react-query';
import { isTokenPostApi } from 'api';
import { useRouter } from 'next/router';

export interface Rating {
  attentivenessPoint: number;
  quicknessPoint: number;
  professionalismPoint: number;
  satisfactionPoint: number;
}
type Props = {
  id: string | string[] | undefined;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalMessage: React.Dispatch<React.SetStateAction<string>>;
};

const AsWriteReview = ({ id, setIsModal, setModalMessage }: Props) => {
  const router = useRouter();

  const [ratingScore, setRatingScore] = useState<Rating>({
    attentivenessPoint: 0,
    quicknessPoint: 0,
    professionalismPoint: 0,
    satisfactionPoint: 0,
  });
  const [reqeustText, setReqeustText] = useState<string>('');
  const [isValid, setIsValid] = useState(false);

  const { mutate: submitMutate, isLoading: submitIsLoading } = useMutation(
    isTokenPostApi,
    {
      onSuccess: () => {
        setIsModal(true);
        setModalMessage('소중한 의견 감사합니다.');
      },
      onError: () => {
        setIsModal(true);
        setModalMessage('다시 시도해주세요.');
      },
    },
  );

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReqeustText(() => e.target.value);
  };
  const onClickSubmitBtn = () => {
    const data = {
      attentivenessPoint: ratingScore.attentivenessPoint,
      quicknessPoint: ratingScore.professionalismPoint,
      professionalismPoint: ratingScore.quicknessPoint,
      satisfactionPoint: ratingScore.satisfactionPoint,
      opinion: reqeustText,
    };
    const { opinion, ...newData } = data;

    submitMutate({
      url: `/after-sales-services/${id!}/review`,
      data: opinion.length > 0 ? data : newData,
    });
  };

  useEffect(() => {
    if (
      ratingScore.attentivenessPoint !== 0 &&
      ratingScore.professionalismPoint !== 0 &&
      ratingScore.quicknessPoint !== 0 &&
      ratingScore.satisfactionPoint !== 0
      // reqeustText.length >= 3
    ) {
      setIsValid(true);
    }
  }, [ratingScore, reqeustText]);
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
        <LeftBtn onClick={() => router.push('/mypage?id=2')}>건너뛰기</LeftBtn>
        <RightBtn onClick={onClickSubmitBtn} isValid={isValid}>
          보내기
        </RightBtn>
      </BtnBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin: 0 auto;
  /* width: 251.25pt; */
  width: 345pt;
  background: ${colors.lightWhite};
  padding: 32.25pt 46.875pt 42pt 46.875pt;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  @media (max-width: 899.25pt) {
    padding-left: 15pt;
    padding-right: 15pt;
    width: auto;
    background: none;
    /* padding: 0; */
    box-shadow: none;
    border-radius: 0;
  }
`;

const DownArrowBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 21pt;
  display: none;
  @media (max-width: 899.25pt) {
    display: block;
    text-align: center;
  }
`;

const ReviewTitleBox = styled.div`
  margin-top: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 899.25pt) {
    margin-top: 37.5pt;
  }
`;

const ReviewTitle = styled(Typography)`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 18pt;
  font-weight: 500;
  line-height: 24pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #222222;
  padding-bottom: 9pt;
`;

const OpinionThanks = styled(Typography)`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #747780;
  @media (min-width: 900pt) {
    font-size: 12pt;
    font-weight: 500;
    line-height: 15pt;
    letter-spacing: -0.02em;
  }
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
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 12pt;
    line-height: 18pt;
    letter-spacing: -0.02em;
    color: ${colors.lightGray3};
  }
  :focus {
    color: #222222;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 400;
    line-height: 19.5pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

const BtnBox = styled.div`
  position: relative;
  bottom: 0;
  display: flex;
  gap: 11.25pt;
  padding-bottom: 0pt;
  @media (max-width: 899.25pt) {
    padding-bottom: 30pt;
  }
`;

const RightBtn = styled.button<{ isValid: boolean }>`
  width: 100%;
  padding: 15pt 38.25pt;
  border-radius: 6pt;
  background-color: ${({ isValid }) =>
    isValid ? `${colors.main}` : `${colors.blue3}`};
  color: #ffffff;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
  cursor: pointer;
  @media (max-width: 899.25pt) {
    padding: 15pt 42.75pt;
  }
`;
const LeftBtn = styled.button`
  width: 100%;
  padding: 15pt 38.25pt;
  border-radius: 6pt;
  background-color: ${colors.gray};
  color: #ffffff;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
  cursor: pointer;
  @media (max-width: 899.25pt) {
    word-break: keep-all;
    padding: 15pt 38.25pt;
  }
`;

export default AsWriteReview;
