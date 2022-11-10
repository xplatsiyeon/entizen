



// 0: 구독종료 D-100일 이상 , 1: 구독종료 D-99일 이하 31일 이상, 2: 구독종료 D-30일 이하, 3: 구독종료, 4: 구독시작 D-n

import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { handleColor2 } from "utils/changeValue";
import CommonBtn from "../as/CommonBtn";

export interface testArr {
    id: number;
    badge: number;
    storeName: string;
    date: string;
  }

  const tempProceeding : testArr[] = [
    {
        id:0 , badge: 1, storeName: 'LS 카페 신림점', date: 'D-67'
    },
    {
        id:1 , badge: 0, storeName: 'LS 용산 주유소', date: 'D-177'
    },
    {
        id:2 , badge: 2, storeName: 'LS 25시 난곡점', date: 'D-5'
    }, {
        id:3 , badge: 3, storeName: 'LS 05시 곡점', date: ''
    }, {
        id:4 , badge: 4, storeName: 'LS 2시 난점', date: 'D-100'
    }
  ]

const Charging = ()=>{

    const router = useRouter();

    const handleRoute=(idx:number)=>{
        //mob일 때 router.push();
        router.push(`/mypage/place/${idx}`)
    }

    return(
        <>
        <List>
        {
         tempProceeding.map((t,idx)=>{
            return(
                <ProjectBox key={idx} onClick={()=>handleRoute(idx)}>
                    <CommonBtn
                      text={t.badge === 4?`구독시작 ${t.date}` : `구독종료 ${t.date}`}
                      backgroundColor={handleColor2(t.badge)}
                      bottom={'12pt'}
                      top={'12pt'}
                      left={'12pt'}
                    />
                    <P>{t.storeName}</P>
                    <P2>Charge Point</P2>
                </ProjectBox>
            )
         })   
        }
        </List>
        </>
    )
}

export default Charging;


const List = styled.ul`
display: flex;
flex-wrap: wrap;
margin: 30pt 0 ;
padding: 15pt;
gap: 11pt;
`

const ProjectBox = styled.li`

width: 120pt;
height: 135pt;
background: #FFFFFF;
box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
border-radius: 6pt;
position: relative;
`
const P = styled.p`
font-family: 'Spoqa Han Sans Neo';
font-size: 12pt;
font-weight: 700;
line-height: 15pt;
letter-spacing: -0.02em;
top: 39pt;
left: 12pt;
position: absolute;
`

const P2 = styled.p`
font-family: 'Spoqa Han Sans Neo';
font-size: 10.5pt;
font-weight: 400;
line-height: 12pt;
letter-spacing: -0.02em;
left: 12pt;
bottom: 12pt;
position: absolute;
color: #CACCD1;
`