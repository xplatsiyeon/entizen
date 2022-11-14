import styled from '@emotion/styled';
import Modal from 'components/Modal/Modal';
import { useRouter } from 'next/router';
import { useState } from 'react';
import colors from 'styles/colors';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import AsRequestWriteReview from '../as/AsRequestWriteReview';
import Image from 'next/image';

type Props = {
    review : boolean;
    score : number[];
}


const PlaceReview = ({review, score} : Props)=> {

const reviewPoint = ['친절함','신속함','전문성','만족도'];

if (review){
let checked = reviewPoint.map((r, idx)=>{
    let temp =[];
    for(let i=0; i < 5; i++){
        if(score[idx] > i){
            temp.push(true)
        }else{temp.push(false)}
    }
    return temp;
})

    return(
        <>

      <DownArrowBox>
        <Image src={DoubleArrow} alt="double-arrow" />
      </DownArrowBox>
        <RatingForm>
            {reviewPoint.map((r,idx)=>{
                return (
                <RBarBox key={idx} >
                    <Title>{r}</Title>
                    {checked[idx].map((c,idx)=> (
                        c? <RBar className='filled forRadius'/>:<RBar className='forRadius'/>
                ))}
                </RBarBox>)
            })}

            <TextArea
            placeholder="[선택] 파트너의 어떤점이 기억에 남으시나요?"
            rows={8}
            value={''}
            required
            readOnly={true}
            />
        </RatingForm>

        </>
    )
}else{
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    router.push('/mypage');
  };

 return(
  
 <>
       {modalOpen && (
        <Modal text={'소중한 의견 감사합니다.'} click={handleClick} />)}
         <AsRequestWriteReview />
         <Btn2 onClick={() => setModalOpen(true)}>
            <span>
              보내기
            </span>
          </Btn2>
      
 </>)
}
}

export default PlaceReview;

const RatingForm = styled.div`
  margin-top: 20.25pt;
  display: flex;
  flex-direction: column;
  gap: 6pt;
  width: 100%;
`;

const RBarBox = styled.div`
border: 1px solid #E2E5ED;
border-radius: 8px;
padding: 12pt;
  height: 10.5pt;
  display: flex;
  gap: 1.5pt;
  background-color: #ffffff;
  & > .forRadius:first-of-type {
    border-radius: 6pt 0 0 6pt;
  }
  & > .forRadius:nth-of-type(5) {
    border-radius: 0 6pt 6pt 0;
  }
`;

const RBar = styled.div`
  width: 36pt;
  height: 10.5pt;
  background-color: #f3f4f7;
  &.filled {
    background-color: ${colors.main};
  }
`;


const Title = styled.p`
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
  margin-right: 9pt;
`;
const DownArrowBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 21pt;
`;

const TextArea = styled.textarea`
margin: 28pt 0;
font-family: 'Spoqa Han Sans Neo';
font-style: normal;
font-weight: 400;
font-size: 12pt;
line-height: 20pt;
letter-spacing: -0.02em;
color: #222222;
padding-top: 12pt;
padding-left: 12pt ;
border: 1px solid #E2E5ED;
border-radius: 6pt;
`

const Btn2 = styled.button`

width: 100%;
  background-color: ${colors.main};
  padding: 15pt 0;
  border-radius: 6pt;
  position: relative;
  bottom: auto;
  margin-bottom: 30pt;
  span{
    color:white;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    text-align: center;
    letter-spacing: -0.02em;
  }
`