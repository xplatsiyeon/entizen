import MypageHeader from 'components/mypage/request/header';
import FinishedBottomBox from 'componentsCompany/Mypage/FinishedBottomBox';
import FinishedTopBox from 'componentsCompany/Mypage/FinishedTopBox';
import React, { useEffect, useState } from 'react';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import LeftProjectBox from 'componentsCompany/Mypage/LeftProjectBox';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

type Props = {
  setOpenSubLink: React.Dispatch<React.SetStateAction<string>>;
  openSubLink: string;
};

const successedProject = ({ setOpenSubLink, openSubLink }: Props) => {
  const [tabNumber, setTabNumber] = useState<number>(1);
  const [successComponentId, setSuccessComponentId] = useState<number>();
  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);
  console.log('success 누르면 나오는 마지막 페이지 ^^', successComponentId);

  // 실시간으로 width 받아오는 함수
  const handleResize = () => {
    setNowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nowWidth]);

  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      const num = Number(router.query.id);
      setSuccessComponentId(num);
      setOpenSubLink('close');
    }
  }, [router.query.id]);

  return (
    <>
      {successComponentId !== undefined && (
        <>
          <WebBuyerHeader
            setTabNumber={setTabNumber}
            tabNumber={tabNumber}
            successComponentId={successComponentId}
            openSubLink={openSubLink}
            setOpenSubLink={setOpenSubLink}
          />
          <WebRapper>
            {nowWidth > 1198.7 && (
              <LeftProjectBox
                setTabNumber={setTabNumber}
                tabNumber={tabNumber}
                successComponentId={successComponentId}
                setSuccessComponentId={setSuccessComponentId}
              />
            )}
            <WebBox>
              <MypageHeader back={true} title={'완료 프로젝트'} />
              <FinishedTopBox />
              <FinishedBottomBox />
            </WebBox>
          </WebRapper>
        </>
      )}
    </>
  );
};

export default successedProject;

const WebRapper = styled.div`
  @media (min-width: 899pt) {
    margin: 0 auto;
    padding: 60pt 0;
    width: 900pt;
    display: flex;
    justify-content: space-between;
  }
`;

const WebBox = styled.div`
  @media (min-width: 899pt) {
    display: flex;
    flex-direction: column;
    width: 580.5pt;
  }
`;
