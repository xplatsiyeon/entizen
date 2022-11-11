import styled from '@emotion/styled';
import colors from 'styles/colors';

type Props = {
    review : boolean;
    score : number[];
}


const PlaceReview = ({review, score} : Props)=> {

const reviewPoint = ['친절함','신속함','전문성','만족도'];


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
        <Title></Title>
        <RatingForm>
            {reviewPoint.map((r,idx)=>{
                return (
                <RBarBox key={idx}>
                    <p>{r}</p>
                    {checked[idx].map((c,idx)=> (
                        c? <RBar className='filled'/>:<RBar/>
                ))}
                </RBarBox>)
            })}

            <TextArea
            placeholder="[선택] 파트너의 어떤점이 기억에 남으시나요?"
            rows={8}
            value={''}
            required
            />
        </RatingForm>

        </>
    )
}

export default PlaceReview;

const RatingForm = styled.div`
  margin-top: 20.25pt;
  display: flex;
  flex-direction: column;
  gap: 6pt;
`;

const RBarBox = styled.div`
  border-radius: 22.5pt 22.5pt 22.5pt 22.5pt;
  width: 186pt;
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
  font-size: 18pt;
  font-weight: 500;
  line-height: 24pt;
  letter-spacing: -0.02em;
  text-align: center;
`;

const TextArea = styled.textarea`
    
`