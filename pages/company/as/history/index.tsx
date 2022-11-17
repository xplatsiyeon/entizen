import styled from "@emotion/styled";
import MypageHeader from "components/mypage/request/header";
import AsCompGetReview from "componentsCompany/AS/component/AsCompGetReview";
import AsCompText from "componentsCompany/AS/component/AsCompText";
import AsCompTop from "componentsCompany/AS/component/AsCompTop";
import Image from "next/image";
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';

import RightArrow from 'public/images/black-right-arrow.svg';
import CommunicationIcon from 'public/images/communication-icon.svg';

const AsHistory = () => {
    return (
        <Body>
            <MypageHeader title={'A/S 히스토리'} back={true} />
            <AsCompTop />

            <Inner>
                <DownArrowBox>
                    <Image src={DoubleArrow} alt="double-arrow" />
                </DownArrowBox>

                <AsCompText />
                <AsCompGetReview />

               
            </Inner>

            <>
                <Button onClick={()=>alert('소통하기로')}>
                <div>
                    <Image src={CommunicationIcon} alt="right-arrow" />
                </div>
                    고객과 소통하기
                <div>
                    <Image src={RightArrow} alt="right-arrow" />
                </div>
                </Button>
            </>
        </Body>
    )
}

export default AsHistory;

const Body = styled.div`
    position: relative;
    border: 1px solid ;
`

const Inner = styled.div`
    margin: 0 15pt;
    position: relative;
`

const DownArrowBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 25.5pt auto 42pt;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60pt auto 42pt;
  padding: 10.5pt 12pt;
  border-radius: 21.75pt;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  background: #F3F4F7;
  color: #222222;
`;
