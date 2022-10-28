import MypageHeader from 'components/mypage/request/header';
import FinishedBottomBox from 'componentsCompany/Mypage/FinishedBottomBox';
import FinishedTopBox from 'componentsCompany/Mypage/FinishedTopBox';
import React from 'react';

type Props = {};

const successedProject = (props: Props) => {
  return (
    <>
      <MypageHeader back={true} title={'완료 프로젝트'} />
      <FinishedTopBox />
      <FinishedBottomBox />
    </>
  );
};

export default successedProject;
