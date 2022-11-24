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
    submitMutate({
      url: `/after-sales-services/${id!}/review`,
      data: {
        attentivenessPoint: ratingScore.attentivenessPoint,
        quicknessPoint: ratingScore.professionalismPoint,
        professionalismPoint: ratingScore.quicknessPoint,
        satisfactionPoint: ratingScore.satisfactionPoint,
        opinion: reqeustText,
      },
    });
  };

  useEffect(() => {
    if (
      ratingScore.attentivenessPoint !== 0 &&
      ratingScore.professionalismPoint !== 0 &&
      ratingScore.quicknessPoint !== 0 &&
      ratingScore.satisfactionPoint !== 0 &&
      reqeustText.length >= 3
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
  @media (max-width: 899.25pt) {
    padding-left: 15pt;
    padding-right: 15pt;
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
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
  cursor: pointer;
`;
const LeftBtn = styled.button`
  width: 100%;
  padding: 15pt 38.25pt;
  border-radius: 6pt;
  background-color: ${colors.gray};
  color: #ffffff;
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
  cursor: pointer;
`;

export default AsWriteReview;
