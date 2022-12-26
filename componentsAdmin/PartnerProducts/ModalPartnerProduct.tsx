import styled from "@emotion/styled";
import CancleModal from "componentsAdmin/CancleModal";
import AdminHeader from "componentsAdmin/Header";
import { GrayBtn } from "componentsAdmin/Layout";
import { Dispatch, SetStateAction, useState } from "react";

type Props ={
    setIsDetail: Dispatch<SetStateAction<boolean>>
}

const ModalPartnerProduct =({setIsDetail}:Props)=>{

/*{
    "isSuccess": true,
    "data": {
        "createdAt": "2022-12-08T06:53:46.761Z",
        "chargerProductIdx": 58,
        "modelName": "50kW충전기1",
        "kind": "50-COMMON",
        "channel": "3_MODE",
        "method": [
            "Socket",
            "AC 7핀"
        ],
        "manufacturer": "50kW 충전기 제조사",
        "feature": "50kW 충전기 제조사 특장점",
        "member": {
            "memberIdx": 31,
            "name": "문수정",
            "phone": "01091163962",
            "companyMemberAdditionalInfo": {
                "companyMemberAdditionalInfoIdx": 7,
                "companyName": "ste",
                "managerEmail": "jsm010@stevelabs.co"
            }
        },
        "chargerProductFiles": [
            {
                "chargerProductFileIdx": 155,
                "productFileType": "CATALOG",
                "originalName": "사업자 등록증.pdf",
                "url": "https://test-entizen.s3.ap-northeast-2.amazonaws.com/chargerProduct/1670482424_6009bbd8-83d7-4f33-a35c-d740d62a0f4b.pdf",
                "size": 3604475
            },
            {
                "chargerProductFileIdx": 154,
                "productFileType": "IMAGE",
                "originalName": "스크린샷 2022-12-08 오전 11.06.16.png",
                "url": "https://test-entizen.s3.ap-northeast-2.amazonaws.com/chargerProduct/1670482420_a90eddbf-cfe9-408c-90a4-c9e51010c125.png",
                "size": 2926102
            },
            {
                "chargerProductFileIdx": 153,
                "productFileType": "IMAGE",
                "originalName": "스크린샷 2022-12-07 오후 6.58.52.png",
                "url": "https://test-entizen.s3.ap-northeast-2.amazonaws.com/chargerProduct/1670482420_ed2564ec-29ff-4418-92ff-48ac10cad20b.png",
                "size": 133976
            },
            {
                "chargerProductFileIdx": 152,
                "productFileType": "IMAGE",
                "originalName": "스크린샷 2022-12-07 오전 10.50.54.png",
                "url": "https://test-entizen.s3.ap-northeast-2.amazonaws.com/chargerProduct/1670482420_2a268635-178b-4552-804e-b9cc7806e39f.png",
                "size": 15242
            }
        ]
    }
} */    

    const [modal, setModal] = useState<boolean>(false);
    
    const handle =()=>{
        setIsDetail(false)
    }
    return(
        <Body>
            <Wrap>
            {modal && <CancleModal setModal={setModal}/>}
            <Box>
                <AdminHeader title="파트너 등록 제품" type="detail" backBtn={handle} />
                <FlexBox>
                    <GrayBtn>삭제</GrayBtn>
                    <GrayBtn>수정</GrayBtn>
                </FlexBox>
            </Box>
            <Inner onClick={()=>setModal(!modal)}>
                <InnerFlexBox>

                </InnerFlexBox>
            </Inner>
            </Wrap>
        </Body>
    )
}

export default ModalPartnerProduct;

const Body = styled.div`
    font-family: 'Spoqa Han Sans Neo';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    position: absolute;
    background: white;
    z-index: 2;

    border: 1px solid peachpuff;

`
const Wrap = styled.div`
    width: 946px;
    position: relative;
`

const Box= styled.div`
position: relative;
    display: flex;
    justify-content: space-between;
    width:100%;
    gap:8px;
`
const FlexBox= styled.div`
gap:8px;
display: flex;
margin-top: 130px;
`
const Inner = styled.div`
padding: 24px 16px;
border: 2px solid #E7E7E7;
border-radius: 4px;
`

const InnerFlexBox = styled.div`
    display: flex;
    font-style: normal; 
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #000000;
`