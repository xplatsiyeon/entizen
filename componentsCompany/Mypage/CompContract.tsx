import Image from "next/image";

import arrowR from 'public/images/grayRightArrow20.png';
import EntizenContractIcon from 'public/images/EntizenContractIcon.png';
import AnyContracIcon from 'public/images/AnyContracIcon.png';
import styled from "@emotion/styled";

const ComContranct = ()=>{

    return(
        
      <Wrapper>
        <TitleP>계약서를 작성해 주세요</TitleP>
        <P>계약 후 프로젝트가 진행됩니다.</P>
      <FlexBox>
        <EntizenContractBox>
            <TextBox>
                <TitleBox>
                <Title>엔티즌 전자 계약서</Title>
                <TitleIcon>
                    <Image src={arrowR} alt=">" />
                </TitleIcon>
                </TitleBox>
                <ExplainText>
                간편하고 안전하게
                <br />
                전자계약 하세요
                </ExplainText>
            </TextBox>
            <BigIconBox>
                <Image src={EntizenContractIcon} alt="큰아이콘" />
            </BigIconBox>
        </EntizenContractBox>
        <EntizenContractBox className="forMargin">
            <TextBox>
            <TitleBox>
                <Title>자체 계약서</Title>
                <TitleIcon>
                <Image src={arrowR} alt=">" />
                </TitleIcon>
            </TitleBox>
            <ExplainText>
                날인 완료된 계약서
                <br />
                스캔본을 첨부해 주세요
            </ExplainText>
            </TextBox>
            <BigIconBox>
            <Image src={AnyContracIcon} alt="큰아이콘" />
            </BigIconBox>
        </EntizenContractBox>
      </FlexBox>
    </Wrapper>
    )
}

export default ComContranct;

const Wrapper = styled.div`
margin-top: 34.5pt;

@media (min-width: 899pt) {
    margin-top: 0;
}
`;

const TitleP = styled.p`
font-family: 'Spoqa Han Sans Neo';
font-style: normal;
font-weight: 500;
font-size: 18pt;
line-height: 24pt;
/* identical to box height, or 133% */
letter-spacing: -0.02em;
color: #222222;
text-align: center;
margin-bottom: 6pt;
`

const P = styled(TitleP)`
font-size: 10.5pt;
line-height: 15pt;
color: #747780;
`

const FlexBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 50pt;
    gap: 22.5pt;
    margin-top: 33pt;;


  @media (max-width: 899pt) {
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 24pt;
    gap: 15pt;
  }
`

const EntizenContractBox = styled.div`
  padding: 13pt;
  width: 270pt;
  height: 105pt;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;
  border-radius: 6pt;

  @media (max-width: 899pt) {
    width: 100%;
    justify-content: center;
    gap: 48pt;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7.5pt;
`;

const TitleBox = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  gap: 3pt;
`;

const Title = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 15pt;
  font-weight: 700;
  line-height: 21pt;
  letter-spacing: -0.02em;
  text-align: left;
`;

const TitleIcon = styled.div`
  position: relative;
  top: -1.2pt;
  width: 15pt;
  height: 15pt;
`;

const ExplainText = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 400;
  line-height: 16.5pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #a6a9b0;
`;

const BigIconBox = styled.div`
  width: 45pt;
  height: 45pt;
`;
