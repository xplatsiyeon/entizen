import styled from '@emotion/styled';
import Btn from 'components/SignUp/button';
import MypageHeader from 'components/SignUp/header';
import { useRouter } from 'next/router';

import React from 'react';
import HeadOpenContent from './HeadOpenContent';

type Props = {};

const DdayRequest = (props: Props) => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  const handleBtnClick = () => {};
  return (
    // {modalOpen && (
    //     <TwoBtnModal
    //       exit={gobackQuestion}
    //       text={
    //         '지금 나가시면\n작성하신 내용이 삭제됩니다.\n그래도 괜찮으시겠습니까?'
    //       }
    //       leftBtnText={'그만하기'}
    //       rightBtnText={'계속 작성하기'}
    //       leftBtnColor={'#A6A9B0'}
    //       rightBtnColor={'#5a2dc9'}
    //       leftBtnControl={stopRegist}
    //       rightBtnControl={gobackQuestion}
    //     />
    //   )}
    <>
      <MypageHeader
        back={true}
        title={'받은 요청'}
        handleBackClick={handleBackClick}
      />
      <HeadOpenContent />
      <Container>
        <Btn
          isClick={true}
          handleClick={handleBackClick}
          text={'가견적 작성하기'}
          paddingOn={true}
        />
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
  height: 100vh;
`;

export default DdayRequest;
