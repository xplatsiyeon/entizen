import styled from "@emotion/styled";
import MypageHeader from "components/mypage/request/header";
import Image from "next/image";
import { useRouter } from "next/router";
import colors from "styles/colors";
import CheckImg from '/public/images/CheckCircle.svg';

const FinPage = ()=>{

    const router = useRouter();
    const type = router.query.id;

    const HandleOnClick = ()=>{
        router.push('/')
    }

    let title:string;
    let date:string;
    let p:string;

    switch(type){
        case 'commu' :
            title='엔티즌에서 프로젝트 확인 후 최종 완료됩니다';
            date='완료 동의일';
            p='';
        break;
        
        case 'agree' :
            title = '축하합니다!충전소 설치가 완료되었습니다!'; 
            date='완료일';
            p= "완료 된 프로젝트는 '내 충전소’에서 확인이 가능합니다."
        break;

        default:
            title = '다시시도해주세요';
            date='';
            p='';
    }

    return(
        <>
        <MypageHeader back={true} title={'내 프로젝트'} />

          <ContainerBox >
            <Image src={CheckImg} alt="exit" style={{ cursor: 'pointer' }} />
          </ContainerBox>
          <Title>{title}</Title>
            <TextBox>
              <p>{date}</p>
              <h3></h3>
              <p>{p}
              </p>
            </TextBox>
            <Btn onClick={HandleOnClick}>내 견적서 바로가기</Btn>
        </>
    )
}

export default FinPage;

const ContainerBox = styled.div`
@media (max-width: 899pt) {
  margin-top: 90pt;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
`

const Title = styled.h1`
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  margin-top: 24pt;
  text-align: center;
`;

const Btn = styled.button`
  background: ${colors.main};
  border-radius: 6pt;
  width: 100%;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  padding: 15pt 0;
    margin-bottom: 30pt;
`;

const TextBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 15pt 0;
  margin-bottom: 24pt;
  width: 100%;
  border: 0.75pt solid ${colors.lightGray};
  border-radius: 6pt;
  & > h3 {
    font-weight: 700;
    font-size: 12pt;
    line-height: 15pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main};
  }
  & > h4 {
    font-weight: 700;
    font-size: 10.5pt;
    line-height: 15pt;
    text-align: center;
    letter-spacing: -0.02em;
    padding-top: 15pt;
    color: ${colors.main2};
  }
  & > p {
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 15pt;
    text-align: center;
    letter-spacing: -0.02em;
    padding-top: 15pt;
    color: ${colors.gray2};
  }
`;