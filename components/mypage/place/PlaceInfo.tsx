import styled from "@emotion/styled";
import CommunicationBox from "components/CommunicationBox";
import { useState } from "react";
import colors from "styles/colors";

const PlaceInfo =()=>{

    const [idx ,setIdx] = useState<number>(1)

    const handleNum = ()=>{
      if(idx === 1){
        setIdx(2)
      }else{
        setIdx(1)
      }
    }
    return(
        <Wrapper>
        <Contents>
            <Partner>파트너 정보</Partner>
            <div className="text-box">
              <span className="name">회사명</span>
              <span className="text">Charge Point</span>
            </div>
            <div className="text-box">
              <span className="name">담당자</span>
              <span className="text">윤세아</span>
            </div>
            <div className="text-box">
              <span className="name">이메일</span>
              <span className="text emailText">sayoon@LS-CaaS.com</span>
            </div>
            <div className="text-box">
              <span className="name">연락처</span>
              <span className="text phone">010-3522-2250</span>
            </div>
          </Contents>

        <FileBox>

        </FileBox>

        <>       
        <FinishedPhotoText>완료현장 사진</FinishedPhotoText>
          <FinishedPhotoBox>

          <Index onClick={handleNum}>
            {idx}/2
          </Index>
          </FinishedPhotoBox>
        </>

      <Wrap>

      <CommunicationBox
        text="파트너와 소통하기"
        clickHandler={() => alert('개발중입니다.')}
      />
      </Wrap>
        </Wrapper>
    )
}

export default PlaceInfo;

const Wrapper = styled.div`
margin-top: 42pt;
`

const Partner = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: 0em;
  text-align: left;
  padding-bottom: 24pt;
`;


const Contents = styled.div`
  padding-top: 19.5pt;
  padding-bottom: 18pt;
  border-bottom: 1px solid #e9eaee;
  .text-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    :not(:nth-of-type(1)) {
      padding-top: 12pt;
    }

    .emailText {
      font-family: Spoqa Han Sans Neo;
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: right;
    }
  }
  `

  const FileBox =styled.div`
    
  `
  const FinishedPhotoText = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  margin-top: 39pt;
`;
const FinishedPhotoBox = styled.div`
  width: 100%;
  height: 91.5pt;
  border: 1px solid #e2e5ed;
  margin-top: 12pt;
  border-radius: 6pt;
  position: relative;
`;


const Index = styled.div`
  width: 12pt;
  padding: 1.5pt 4.5pt;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 7.5pt;
  color: white;
  position: absolute;
  bottom: 9pt;
  right: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 7.5pt;
  line-height: 9pt;
  letter-spacing: -0.02em;
`

const Wrap = styled.div`
margin-top: 60pt;
 display: flex;
 justify-content: center;
 padding-bottom: 135pt;
`
