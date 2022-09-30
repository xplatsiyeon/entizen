import AsComplete from 'components/mypage/as/AsWriteComplete';
import React from 'react';
import styled from '@emotion/styled';
import WebFooter from 'web-components/WebFooter';
import WebHeader from 'web-components/WebHeader';

type Props = {};

const complete = (props: Props) => {
  return (
    <React.Fragment>
      <Body>
        <WebHeader />
          <Inner>
            <Wrapper>
              <AsComplete
                buttonText={'확인'}
                text={'추가 문의사항은\n소통하기를 이용해주시기 바랍니다.'}
                title={'A/S 요청이 전달되었습니다'}
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
  height: 100vh;
  margin: 0 auto;
  //height: 810pt;
  background:#fcfcfc;

  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 0 auto;
  width: 345pt;
  //width: 281.25pt;  
  background:#ffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;

  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    top: 0;
    left: 0%;
    transform: none;
  }
`;


const Wrapper = styled.div`
  position:relative;  
  margin: 32.25pt 31.875pt 42pt;
  height : 507.75pt;

  @media (max-width: 899pt) {
    height: 100%;
  }
`;
