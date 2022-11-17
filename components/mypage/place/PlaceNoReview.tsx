import styled from '@emotion/styled';
import Modal from 'components/Modal/Modal';
import { useRouter } from 'next/router';
import { useState } from 'react';
import colors from 'styles/colors';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import AsRequestWriteReview from '../as/AsRequestWriteReview';
import Image from 'next/image';

type Props = {
};

const PlaceNoReview = () => {
    {
      /* review 가 없으면, 리뷰 쓰기 컴포넌트를 리턴. */
    }
    const router = useRouter();

    const [modalOpen, setModalOpen] = useState(false);

    const handleClick = () => {
      router.push('/mypage');
    };

    return (
      <>
        {modalOpen && (
          <Modal text={'소중한 의견 감사합니다.'} click={handleClick} />
        )}
        <AsRequestWriteReview />
        <Btn2 onClick={() => setModalOpen(true)}>
          <span>보내기</span>
        </Btn2>
      </>
    );
  }

export default PlaceNoReview;

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
