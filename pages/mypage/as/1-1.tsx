import AsRequest from 'components/mypage/as/AsRequest';
import AsRequestFooter from 'components/mypage/as/AsRequestFooter';
import AsRequestPartner from 'components/mypage/as/AsRequestPartner';
import LookMyReview from 'components/mypage/as/LookMyReviewBtn';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import WebHeader from 'web-components/WebHeader';
import WebFooter from 'web-components/WebFooter';
import Request from '..';

type Props = {};

// 기본 페이지

const AsShow = (props: Props) => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/mypage/as/1-2');
  };
  return (
    <Body>
      <WebHeader num={0} now={'mypage'} />
      <Inner>
        <FlexBox>
          <Wrap1>
            <Request />
          </Wrap1>
          <Wrap2>
            <AsRequest />
            <AsRequestPartner />
            <Wrap3>
              <AsRequestFooter />
              <LookMyReview handleClick={handleClick} text={'수정하기'} />
            </Wrap3>
          </Wrap2>
        </FlexBox>
      </Inner>
      <WebFooter />
    </Body>
  );
};

export default AsShow;

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
  width: 900pt;
  margin: 45.75pt auto 0;

  @media (max-width: 899pt) {
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

  @media (max-width: 899pt) {
    display: none;
  }
`;
const Wrap2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 60pt;

  @media (max-width: 899pt) {
    padding-left: 0pt;
  }
`;

const Wrap3 = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;

  @media (max-width: 899pt) {
    flex-direction: column;
    height: auto;
  }
`;
