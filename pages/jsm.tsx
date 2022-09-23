import styled from "@emotion/styled";
import WebFooter from "web-components/WebFooter"
import WebHeader from "web-components/WebHeader"


const jsm =()=>{
    return(
        <>
        <WebHeader/>
        <Body>
            <Wrapper/>
        </Body>
        <WebFooter/>
        </>
    )

}

export default jsm;

const Body = styled.div`
width: 100%;
height: 791.25pt;
background:#fcfcfc;
border-top: 1px solid #e9eaee;
border-bottom: 1px solid #e9eaee;
`

const Wrapper = styled.div`
position: relative;
top:50%;
left:50%;
transform: translate(-50%,-50%);
background:gray;
opacity:0.5;
width:345pt;
height:552pt;
`
