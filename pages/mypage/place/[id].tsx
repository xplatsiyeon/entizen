import { testArr } from "components/mypage/place/Charging";
import MypageHeader from "components/mypage/request/header";
import TopBox from "componentsCompany/Mypage/TopBox";
import { useRouter } from "next/router";
import { useState } from "react";

export interface testArr2 extends testArr {
    address: string;
}


const tempProceeding: testArr2[]=[
    {
        id:0 , badge: 1, storeName: 'LS 카페 신림점', date: 'D-67', address:''
    },
    {
        id:1 , badge: 0, storeName: 'LS 용산 주유소', date: 'D-177', address:''
    },
    {
        id:2 , badge: 2, storeName: 'LS 25시 난곡점', date: 'D-5', address:''
    }, {
        id:3 , badge: 3, storeName: 'LS 05시 곡점', date: '', address:''
    }, {
        id:4 , badge: 4, storeName: 'LS 2시 난점', date: 'D-100', address:''
    }
]

const ChargingPlace = ()=>{

    const router = useRouter();
    const index = router.query.id;

  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => setOpen(!open);


    return(
        <>
        <MypageHeader back={true} title={'내 충전소'} />
        <TopBox open={open} setOpen={setOpen} handleClick={handleClick} info ={tempProceeding[Number(index)]} tap={'place'}/>
        </>
    )
}

export default ChargingPlace;