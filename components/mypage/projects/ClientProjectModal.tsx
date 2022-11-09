
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';


type Props = {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    type: string; //나중에, 일정 변경 동의 버튼이 클릭되면, 새 string을 type의 값으로 받아서 처리.
    date? : string;
  };

const ClientProjectModal = ({setModal, type, date}:Props)=>{

    const router = useRouter();

    const handle=(st: string)=>{
        if(st==='commu'){
           // setModal(false);
            router.push(`/mypage/project/fin/${st}`)
        }else{
            //setModal(false);
            router.push(`/mypage/project/fin/${st}`)
        }
    }

    return(
        <Wrap onClick={()=>setModal(false)}>
            <Body>
            <P>{type === 'fin'? '내 프로젝트':'일정 변경 요청'}</P>
            {type ==='fin'?
            <FinBox>
                <PBox1>
                    <p className='date1'>완료 요청일</p>
                    <p className='date2'>{date? date: null}</p>
                </PBox1> 
                <PBox1>
                    <p className='notice1'>동의하기 전 주의사항!</p> 
                    <p className='notice2'>문제가 있을 경우 소통하기를 통해 문의해주시고,<br/> 추가 작업 후 동의하시기 바랍니다</p>
                </PBox1>
            </FinBox>
            :<DateBox>
                <PBox2>
                    <p>완료 예정일</p>
                    <p>문제가 있을 경우 소통하기를 통해 문의해주시고,<br/> 추가 작업 후 동의하시기 바랍니다</p>
                </PBox2>
                <PBox2>
                    <p>변경 사유</p>
                    <p></p>
                </PBox2>
                <PBox2></PBox2>
            </DateBox>
            }
            <ButtonBox>
                <button onClick={()=>handle('commu')}><span>소통하기</span></button>
                <button onClick={()=>handle('agree')}><span>동의하기</span></button>
            </ButtonBox>
            </Body>
        </Wrap>
    )
}

export default ClientProjectModal;

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    background: #1212121c;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
`

const Body = styled.div`
width: 100%;
height: 300pt;  
background: white;
box-shadow: 4px 0px 10px rgba(137, 163, 201, 0.2);
border-radius: 20pt 20pt 0pt 0;
position: absolute;
bottom: 0;
z-index: 2;
`

const P = styled.p`
font-family: 'Spoqa Han Sans Neo';
font-style: normal;
font-weight: 700;
font-size: 15pt;
line-height: 12pt;
letter-spacing: -0.02em;
color: #222222;
text-align: center;
margin: 21pt 0 32pt;
`

const FinBox = styled.div`
margin: 0 15pt;
border: 1px solid #E9EAEE;
border-radius: 8px;
text-align: center;
`
const DateBox = styled.div`
    
`
const ButtonBox = styled.div`
margin: 30pt 15pt ;
display: flex;
justify-content: space-between;
gap: 9pt;
    button{
        font-family: 'Spoqa Han Sans Neo';
        font-style: normal;
        font-weight: 700;
        font-size: 12pt;
        line-height: 12pt;
        text-align: center;
        letter-spacing: -0.02em;

        &:nth-of-type(1){
            padding: 15pt 0;
            background: #E2E5ED;
            border-radius: 6pt;
            flex: 1;
            color: #595757;
        }
        &:nth-of-type(2){
            padding: 15pt 0;
            background: #5221CB;
            border-radius: 6pt;
            flex: 2;
            color: #ffffff;
        }
    }
`
const PBox1 = styled.div`
    font-family: 'Spoqa Han Sans Neo';
    letter-spacing: -0.02em;
    > .date1{
        font-style: normal;
        font-weight: 400;
        font-size: 10.5pt;
        line-height: 18pt;
        color: #222222;
        margin-top: 12pt;
    }
    > .date2{
        font-style: normal;
        font-weight: 700;
        font-size: 15pt;
        line-height: 15pt;
        color: #5221CB;
        margin-top: 3pt;
    }
 
    >.notice1{
        font-style: normal;
        font-weight: 700;
        font-size: 12pt;
        line-height: 12pt;
        color: #222222;
        margin: 30pt 0 6pt;
    }
    >.notice2{
        font-style: normal;
        font-weight: 400;
        font-size: 10.5pt;
        line-height: 15pt;
        color: #222222;
        margin-bottom: 15pt;
    }
    
`
const PBox2 = styled.div`
    font-family: 'Spoqa Han Sans Neo';  
    letter-spacing: -0.02em;
`