import styled from '@emotion/styled';
import TwoBtnModal from 'components/Modal/TwoBtnModal';
import Mypage2_1 from 'components/mypage/request/2-1';
import EstimateContainer from 'components/mypage/request/estimateContainer';
import MypageHeader from 'components/mypage/request/header';
import { useRouter } from 'next/router';
import { useState } from 'react';
import colors from 'styles/colors';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import Request from '..';
import RequestMain from 'components/mypage/request/requestMain';

const Mypage2 = ({ data }: any) => {
  const route = useRouter();
  // 모달 on / off
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // 모달 왼쪽, 오른쪽 버튼 핸들러
  const backPage = () => route.back();
  const handleOnClick = () => setModalOpen(!modalOpen);
  return (
    <Body>
      <WebHeader num={2} now={'mypage'} />
      <Inner>
        <FlexBox>
          <Wrap1>
            <RequestMain page={2} />
          </Wrap1>
          <Wrap2>
            <Wrapper>
              {/* 모달 */}
              {modalOpen && (
                <TwoBtnModal
                  exit={handleOnClick}
                  text="견적을 취소하시겠습니까?"
                  leftBtnText="취소하기"
                  leftBtnColor={colors.orange}
                  rightBtnText="아니오"
                  rightBtnColor={colors.main2}
                  leftBtnControl={backPage}
                  rightBtnControl={handleOnClick}
                />
              )}
              <MypageHeader
                title="내 견적서"
                cancel="견적 취소"
                back={true}
                handleOnClick={handleOnClick}
              />
              {/* <EstimateContainer /> */}

              <Mypage2_1 />
            </Wrapper>
          </Wrap2>
        </FlexBox>
      </Inner>
      <WebFooter />
    </Body>
  );
};

export default Mypage2;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  //height: 810pt;
  background: #fcfcfc;

  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  width: 900pt;
  //width: 281.25pt;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0 auto;
  }
`;

const FlexBox = styled.div`
  display: flex;
  position: relative;
`;

const Wrap1 = styled.div`
  width: 255pt;
  border: 1px solid #e9eaee;
  border-radius: 6pt;
  height: 100%;

  @media (max-width: 899.25pt) {
    display: none;
  }
`;
const Wrap2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 60pt;

  @media (max-width: 899.25pt) {
    padding-left: 0pt;
  }
`;

const Wrapper = styled.div`
  padding-bottom: 91.5pt;
`;
