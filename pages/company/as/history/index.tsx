import styled from "@emotion/styled";
import MypageHeader from "components/mypage/request/header";
import AsCompGetReview from "componentsCompany/AS/component/AsCompGetReview";
import AsCompText from "componentsCompany/AS/component/AsCompText";
import AsCompTop from "componentsCompany/AS/component/AsCompTop";
import Image from "next/image";
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';

const AsHistory =()=>{
    return(
        <>
            <MypageHeader title={'A/S 히스토리'} back={true} />
            <Inner>
                <AsCompTop/>

                <DownArrowBox>
                    <Image src={DoubleArrow} alt="double-arrow" />
                </DownArrowBox>

                <AsCompText/>
                <AsCompGetReview/>
            </Inner>
        </>
    )
}

export default AsHistory;

const Inner = styled.div`
    margin: 0 15pt;
    
`

const DownArrowBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 25.5pt auto 42pt;
`;