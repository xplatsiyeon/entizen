import MypageHeader from 'components/mypage/request/header';
import TopBox from 'componentsCompany/Mypage/TopBox';
import UnderBox from 'componentsCompany/Mypage/UnderBox';
import WriteContract from 'componentsCompany/Mypage/WriteContract';
import React, { useState } from 'react';

type Props = {};

const RunningProgress = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [writeContract, setOpenContract] = useState<boolean>(false);
  const handleClick = () => setOpen(!open);

  return (
    <>
      <MypageHeader back={true} title={'진행 프로젝트'} />
      <TopBox open={open} setOpen={setOpen} handleClick={handleClick} />
      {!writeContract ? (
        <UnderBox
          writeContract={writeContract}
          setOpenContract={setOpenContract}
        />
      ) : (
        <WriteContract />
      )}
    </>
  );
};

export default RunningProgress;
