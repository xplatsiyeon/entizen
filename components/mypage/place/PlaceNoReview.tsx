import styled from '@emotion/styled';
import Modal from 'components/Modal/Modal';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import colors from 'styles/colors';
import AsRequestWriteReview from '../as/AsRequestWriteReview';
import { useMutation } from 'react-query';
import { isTokenPostApi } from 'api';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import Loader from 'components/Loader';
import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import { ChargingStationsResponse } from 'QueryComponents/UserQuery';

type Props = {
  close: Dispatch<SetStateAction<boolean>>;
  chargingRefetch: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<ChargingStationsResponse>>;
};

const PlaceNoReview = ({ close, chargingRefetch }: Props) => {
  {
    /* review 가 없으면, 리뷰 쓰기 컴포넌트를 리턴. */
  }
  const router = useRouter();
  const routerId = router?.query?.id;

  const [modalOpen, setModalOpen] = useState(false);
  const [checkedRequired, setCheckedRequired] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState('');
  const { reviewContent } = useSelector((state: RootState) => state.reviewList);
  // console.log(reviewContent);
  const { mutate: postMutate, isLoading: postIsLoading } = useMutation(
    isTokenPostApi,
    {
      onSuccess: () => {
        setModalMessage('소중한 의견 감사합니다.');
        setModalOpen(true);
      },
      onError: (error: any) => {
        // console.log('리뷰 보내기 에러');
        // console.log(error);
        setModalMessage('다시 시도해주세요.');
        setModalOpen(true);
      },
    },
  );

  const handleClick = () => {
    setModalOpen(false);

    if (modalMessage !== '리뷰를 작성해주세요.') {
      router.push('/mypage');
      close(true);
      chargingRefetch();
    }
  };

  const onClickBtn = () => {
    // console.log('온클릭');
    // console.log(checkedRequired);
    if (checkedRequired) {
      postMutate({
        url: `/projects/${routerId}/review`,
        data: reviewContent,
      });
    } else {
      setModalOpen(true);
      setModalMessage('리뷰를 작성해주세요.');
    }
  };

  if (postIsLoading) {
    return <Loader />;
  }
  return (
    <Wrap>
      {modalOpen && <Modal text={modalMessage} click={handleClick} />}
      <AsRequestWriteReview
        checkedRequired={checkedRequired}
        setCheckedRequired={setCheckedRequired}
      />
      <Btn2 checkedRequired={checkedRequired} onClick={onClickBtn}>
        <span>보내기</span>
      </Btn2>
    </Wrap>
  );
};

export default PlaceNoReview;

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

const Btn2 = styled.button<{ checkedRequired: boolean }>`
  width: 100%;
  background-color: ${colors.main};
  opacity: ${({ checkedRequired }) => (checkedRequired ? null : '0.7')};
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
