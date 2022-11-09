
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';


type Props = {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    type: string;
  };

const ClientProjectModal = ({setModal, type}:Props)=>{

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
            <P>{type='fin'? '내 프로젝트':'일정 변경 요청'}</P>
            {type ==='fin'?
            <FinBox>
                <SpanBox>
                    <span>완료 요청일</span>
                    <span></span>
                </SpanBox> 
                <SpanBox>
                    <span>동의하기 전 주의사항!</span> 
                    <span></span>
                </SpanBox>
            </FinBox>
            :<DateBox>
                <SpanBox>
                    <span>완료 예정일</span>
                    <span>문제가 있을 경우 소통하기를 통해 문의해주시고,<br/> 추가 작업 후 동의하시기 바랍니다</span>
                </SpanBox>
                <SpanBox>
                    <span>변경 사유</span>
                    <span></span>
                </SpanBox>
                <SpanBox></SpanBox>
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
    
`

const FinBox = styled.div`
    
`
const DateBox = styled.div`
    
`
const ButtonBox = styled.div`
    
`
const SpanBox = styled.div`
    
`