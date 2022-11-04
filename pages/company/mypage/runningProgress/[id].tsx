import MypageHeader from 'components/mypage/request/header';
import ProjectInProgress from 'componentsCompany/Mypage/ProjectInProgress';
import TopBox from 'componentsCompany/Mypage/TopBox';
import UnderBox from 'componentsCompany/Mypage/UnderBox';
import WriteContract from 'componentsCompany/Mypage/WriteContract';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Progress from '../projectProgress';

type Props = {};


interface Data {
    id: number;
    badge: string;
    storeName: string;
    date: string;
    contract : boolean;
    planed : string[]; // 인덱스[0]: 준비 목표일, [1]: 설치 목표일, [2]: 검수 목표일, [3]: 완료 목표일
    address : string;
}
  
  const tempProceeding: Data[] = [
    {
      id: 0,
      badge: '검수 중',
      storeName: 'LS카페 신림점',
      date: '2021.01.01',
      contract : true,
      planed : ['2022.04.25', '2022.06.11',],
      address : '서울시 관악구 난곡로40길 30'
    },
    {
      id: 1,
      badge: '준비 중',
      storeName: 'LS카페 신림점',
      date: '2021.05.10',
      contract : false,
      planed : [],
      address : '서울시 관악구 난곡로40길 30'
    },
    {
      id: 2,
      badge: '계약대기',
      storeName: 'LS카페 신림점',
      date: '2021.03.10',
      contract : true,
      planed : ['2022.04.25', '2022.07.25' ],
      address : '서울시 관악구 난곡로40길 30'
    },
    {
      id: 3,
      badge: '설치 중',
      storeName: 'LS카페 신림점',
      date: '2021.07.23',
      contract : true,
      planed : ['2022.04.25', ],
      address : '서울시 관악구 난곡로40길 30'
    },
    {
      id: 4,
      badge: '완료 중',
      storeName: 'LS카페 신림점',
      date: '2021.07.23',
      contract : true,
      planed : ['2022.04.26', '2022.05.6', '2022.05.11',  ],
      address : '서울시 관악구 난곡로40길 30'
    },
    {
      id: 5,
      badge: '완료대기',
      storeName: 'LS카페 신림점',
      date: '2021.07.23',
      contract : true,
      planed : ['2022.04.26', '2022.05.6', '2022.05.11', '2022.05.14' ],
      address : '서울시 관악구 난곡로40길 30'
    },
    {
      id: 6,
      badge: '프로젝트 취소',
      storeName: 'LS카페 신림점',
      date: '2021.07.23',
      contract : false,
      planed : [],
      address : '서울시 관악구 난곡로40길 30'
    },
  ];

const RunningProgress = (props: Props) => {

  const [open, setOpen] = useState<boolean>(false);
  const [ , setOpenContract] = useState<boolean>(false);
  const handleClick = () => setOpen(!open);

  const router = useRouter();
  console.log(router);
  const index = Number(router.query.id);
  console.log(index)

  return (
    <>
      <MypageHeader back={true} title={'진행 프로젝트'} />
      <TopBox open={open} setOpen={setOpen} handleClick={handleClick} info={tempProceeding[index]} />
      {index && tempProceeding[index].contract ? (
        <Progress />
      ) : (
        <UnderBox
          setOpenContract={setOpenContract}
        />
      )}
    </>
  );
};

export default RunningProgress;
