import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Image from 'next/image';
import BackImg from 'public/images/back-btn.svg';
import colors from 'styles/colors';

type Props = {};

const contract = (props: Props) => {
  const router = useRouter();
  const documentId = router?.query?.documentId!;

  useEffect(() => {
    let targetIframe = document.getElementById(
      'target-iframe',
    ) as HTMLImageElement | null;
    if (targetIframe !== null) {
      targetIframe.src = documentId as string;
    }
  }, [documentId]);
  return (
    <Wrapper>
      <Header>
        <div
          className="back-img"
          onClick={() =>
            router.replace(
              `/company/mypage/runningProgress?projectIdx=${router.query.id}`,
            )
          }
        >
          <Image src={BackImg} alt="btn-icon" />
        </div>
        <span className="text">계약서</span>
        {/* {check && (
          <div className="check" onClick={handleCheckClick}>
            완료
          </div>
        )} */}
        {/* 닫기 이미지 */}
      </Header>
      <View id="target-iframe"></View>
    </Wrapper>
  );
};

export default contract;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;
// const Header = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 36pt;
//   width: 100%;
// `;
const View = styled.iframe`
  height: 100%;
  width: 100%;
`;
const Header = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  position: relative;
  //background-color: ${colors.lightWhite};
  padding: 9pt 15pt;
  .back-img {
    position: absolute;
    cursor: pointer;
    left: 7pt;
    padding: 5px;
  }
  .text {
    font-weight: 700;
    font-size: 12pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .check {
    position: absolute;
    font-weight: 500;
    font-size: 12pt;
    right: 15pt;
    line-height: 18pt;
    text-align: right;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
  }
  .exit {
    position: absolute;
    right: 15pt;
  }

  .home {
    position: absolute;
    right: 15pt;
  }
  @media (max-width: 899pt) {
    display: flex;
  }
`;
