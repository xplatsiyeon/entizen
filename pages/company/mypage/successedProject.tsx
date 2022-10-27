import MypageHeader from 'components/mypage/request/header';
import FinishedTopBox from 'componentsCompany/Mypage/FinishedTopBox';
import React from 'react';

type Props = {};

const successedProject = (props: Props) => {
  return (
    <>
      <MypageHeader back={true} title={'완료 프로젝트'} />
      <FinishedTopBox />
    </>
  );
};

export default successedProject;
