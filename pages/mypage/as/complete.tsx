import AsComplete from 'components/mypage/as/AsWriteComplete';
import React from 'react';
import styled from '@emotion/styled';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import { useRouter } from 'next/router';

type Props = {};

const complete = (props: Props) => {
  const router = useRouter();
  const routerId = router?.query?.afterSalesServiceIdx;
  return (
    <React.Fragment>
      <Body>
        <WebHeader />
        <Inner>
          <Wrapper>
            <AsComplete
              type={'AS'}
              routerId={routerId}
              buttonText={'확인'}
              text={'추가 문의사항은\n소통하기를 이용해주시기 바랍니다.'}
              title={
                routerId
                  ? 'A/S 요청이 수정되었습니다'
                  : 'A/S 요청이 전달되었습니다'
              }
            />
          </Wrapper>
        </Inner>
        <WebFooter />
      </Body>
    </React.Fragment>
  );
};

export default complete;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  //height: 100vh;
  //height: 810pt;
  background: #fcfcfc;

  @media (max-height: 809pt) {
    display: block;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto 183pt;
  width: 345pt;
  //width: 281.25pt;
  background: #ffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  padding-top: 7.5pt;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0;
    padding-top: 0;
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 32.25pt 31.875pt 0pt;
  height: 408pt;

  @media (max-width: 899.25pt) {
    height: 100%;
    margin: 0;
  }
`;
