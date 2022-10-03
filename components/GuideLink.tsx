import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";


const GuideLink =()=>{

  const router = useRouter();
    const linkName = ['플랫폼 가이드','구독 가이드','충전기 가이드','보조금 가이드', '요금정보']
    const linkUrl:string[] =[`/guide/1-1`,`/guide/1-4`,'/guide/1-5','/guide/1-2-4','/guide/1-3'];

    return(<Wrap>
        {linkName.map((i,idx)=>{
            return(
            <StyledLink key={idx} onClick={()=>
                router.push(linkUrl[idx])} >{i}</StyledLink>)
        })}
    </Wrap>)
}

export default GuideLink;

const Wrap = styled.ul`
width: 900pt;
height: 44.5pt;
margin: 0 auto;    
`
const StyledLink = styled.li`
margin-right: 23.25pt;
padding: 15pt 0;
display: inline-block;

    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 500;
    font-size: 12pt;
    line-height: 13.5pt;
    letter-spacing: -0.02em;
    color: #838383;
    text-decoration:none;

  &:hover{
    border-bottom: 3pt solid #5A2DC9;
    box-sizing: border-box;
  }
    
`