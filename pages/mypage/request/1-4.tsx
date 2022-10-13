import MypageHeader from 'components/mypage/request/header';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import TwoButton from 'components/mypage/request/TwoButton';
import RequestModal from 'components/Modal/RequestModal';
import BiddingQuote from 'components/mypage/request/BiddingQuote';
import styled from '@emotion/styled';

import WebFooter from 'web-components/WebFooter';
import WebHeader from 'web-components/WebHeader';

const Mypage1_4 = ({ data }: any) => {
  const [isModal, setModal] = useState(false);
  const route = useRouter();
  const handleOnClick = () => route.back();

  // 모달 컨트롤
  const onClcikModal = () => setModal((prev) => !prev);
  const rightControl = () => route.push('/mypage/request/1-5');

  return (
    <WebBody>
      <WebHeader />
      <Inner>
        <Wrapper>
          {isModal && (
            <RequestModal
              exit={() => setModal((prev) => !prev)}
              title={'Charge Point의 \n 구독상품으로 선택하시겠습니까?'}
              subtitle={
                '선택 후 정확한 견적을 위해 현장실사가 진행되며, \n고객님의 연락처가 전달됩니다.'
              }
              leftControl={onClcikModal}
              rightControl={rightControl}
            />
          )}
          <MypageHeader
            title="상세내용"
            exitBtn={true}
            handleOnClick={handleOnClick}
          />
          <BiddingQuote pb={101.25} />
          <TwoButton onClcikModal={onClcikModal} />
        </Wrapper>
      </Inner>
      <WebFooter />
    </WebBody>
  );
};

export default Mypage1_4;

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;
  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 54pt auto;
  width: 900pt;
  border-radius: 12pt;
  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    top: 0;
    left: 0%;
    transform: none;
    padding: 0;
    box-shadow: none;
    background: none;
    margin: 0;
  }
  @media (max-height: 500pt) {
    height: 100%;
  }
`;

const Wrapper = styled.div`
  padding-bottom: 20pt;
`;
