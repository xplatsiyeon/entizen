import styled from "@emotion/styled";
import CancleModal from "componentsAdmin/CancleModal";
import AdminHeader from "componentsAdmin/Header";
import { GrayBtn } from "componentsAdmin/Layout";
import { useState } from "react";

const ModalPartnerProduct =()=>{

    const [modal, setModal] = useState<boolean>(false);

    return(
        <Body>
            {modal && <CancleModal setModal={setModal}/>}
            <Box>
                <AdminHeader title="파트너 등록 제품" type="detail" />
                <FlexBox>
                    <GrayBtn>삭제</GrayBtn>
                    <GrayBtn>수정</GrayBtn>
                </FlexBox>
            </Box>
            <Inner onClick={()=>setModal(!modal)}>
                <InnerFlexBox>

                </InnerFlexBox>
            </Inner>
        </Body>
    )
}

export default ModalPartnerProduct;

const Body = styled.div`
font-family: 'Spoqa Han Sans Neo';
    min-width: 946px;
    height: 100vh;
    position: absolute;
    background: white;
    z-index: 2;

    border: 1px solid peachpuff;

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