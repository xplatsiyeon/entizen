import styled from "@emotion/styled";
import Link from "next/link";


const GuideLink =()=>{

    const linkName = ['플랫폼 가이드','구독 가이드','충전기 가이드','보조금 가이드', '요금정보']
    const linkUrl:string[] =[`1-1`,`1-4`,'1-5','1-2-4','1-3'];

    return(<Wrap>
        {linkName.map((i,idx)=>{
            return(
            <StyledLink key={idx}>
                <Link href={`guide/` + linkUrl[idx]}><a>{i}</a></Link>
            </StyledLink>)
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
a{
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 500;
    font-size: 12pt;
    line-height: 13.5pt;
    letter-spacing: -0.02em;
    color: #838383;
    text-decoration:none;
  }

  &:hover{
    border-bottom: 3pt solid #5A2DC9;
    box-sizing: border-box;
  }
    
`