import ClientProgress from "components/mypage/projects/ClientProgress";
import MypageHeader from "components/mypage/request/header";
import TopBox from "componentsCompany/Mypage/TopBox";
import { useRouter } from "next/router";
import { useState } from "react";

export interface Data {
    id: number;
    state: number;
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
      state: 3,
      badge: '검수 중',
      storeName: 'LS카페 신림점',
      date: '2021.01.01',
      contract : true,
      planed : ['2022.04.25', '2022.06.11',],
      address : '서울시 관악구 난곡로40길 30'
    },
    {
      id: 1,
      state: 1,
      badge: '준비 중',
      storeName: 'LS카페 신림점',
      date: '2021.05.10',
      contract : true,
      planed : [],
      address : '서울시 관악구 난곡로40길 30'
    },
    {
      id: 2,
      state: 0,
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
      state: 2,
      storeName: 'LS카페 신림점',
      date: '2021.07.23',
      contract : true,
      planed : ['2022.04.25', ],
      address : '서울시 관악구 난곡로40길 30'
    },
    {
      id: 4,
      state: 4,
      badge: '완료 중',
      storeName: 'LS카페 신림점',
      date: '2021.07.23',
      contract : true,
      planed : ['2022.04.26', '2022.05.6', '2022.05.11',  ],
      address : '서울시 관악구 난곡로40길 30'
    },
    {
      id: 5,
      state: 5,
      badge: '완료대기',
      storeName: 'LS카페 신림점',
      date: '2021.07.23',
      contract : true,
      planed : ['2022.04.26', '2022.05.6', '2022.05.11', '2022.05.14' ],
      address : '서울시 관악구 난곡로40길 30'
    },
    {
      id: 6,
      state: 6,
      badge: '프로젝트 취소',
      storeName: 'LS카페 신림점',
      date: '2021.07.23',
      contract : false,
      planed : [],
      address : '서울시 관악구 난곡로40길 30'
    },
  ];

const ProjectInfo = ()=>{

    const router = useRouter();

    const [open, setOpen] = useState<boolean>(false);
    const handleClick = () => setOpen(!open);

   /* useEffect(()=>{
      console.log('index', router.query.id);
      if(router.query.id){
        const num = Number(router.query.id)
      }
    },[router.query.id])*/

    let index = router.query.id;

  
    
    return(
    <>
    <MypageHeader back={true} title={'내 프로젝트'} />
        { typeof(index) === "string" ?
        <> 
            <TopBox open={open} setOpen={setOpen} handleClick={handleClick} info={tempProceeding[Number(index)]} />        
            <ClientProgress info={tempProceeding[Number(index)]} page={tempProceeding[Number(index)].contract ? 'client':'yet'}/> 
        </>: null}
    </>
    )
}

export default ProjectInfo;