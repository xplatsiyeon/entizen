import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import colors from 'styles/colors';
import Logos from 'public/images/webLogo.png';
import Chat from 'public/images/chat.png';
import Bell from 'public/images/bell.png';

const WebHeader =()=>{


    return(
    <Wrapper>
      <Inner>
        <Box1>
        <LogoBox>
              <Link href='/' >
                <a href="/">
                  <Image
                    src={Logos}
                    alt="logo"
                    layout="intrinsic"
                    /></a>
              </Link>
            </LogoBox>
            <DivBox><Link href='/'><a>간편견적</a></Link></DivBox>
            <DivBox><Link href='/'><a>가이드</a></Link></DivBox>
            <DivBox><Link href='/'><a>소통하기</a></Link></DivBox>
            <DivBox><Link href='/'><a>마이페이지</a></Link></DivBox>
        </Box1>
        <Box2>
          {/* <DivBox2><input type="text" placeholder="서비스를 검색해보세요" /> </DivBox2> */}
            <IconBox>  
              <Image
                src={Chat}
                alt="question"
                />
            </IconBox>
            <IconBox>
              <Image
                src={Bell}
                alt="alram"
                />
            </IconBox>
            <DivBox2><Link href='/'><a>로그인</a></Link></DivBox2>
            <DivBox2><Link href='/'><a>회원가입</a></Link></DivBox2>
        </Box2>    
      </Inner>
    </Wrapper>
    )

}

export default WebHeader;

const Wrapper = styled.div`
position:relative;
width:100%;
margin-bottom: 45.75pt;
border-bottom: 1px solid #e9eaee;
background: #ffff;

@media (max-width:899pt) {
  display:none;
}
`

const Inner = styled.div`
display:flex;
justify-content: space-between;
margin: 0 auto;
max-width: 900pt;
height:100%;
//max-height: 81pt;
`

const Box1 = styled.div`
display: flex;
height:70pt;
}
`

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 54pt;
`;

const IconBox = styled.div`
display: flex;
align-items: center;
margin-right:15pt;
`;

const DivBox = styled.div`
  margin-right: 30pt;
  display: flex;
  align-items: center;
  a{
    font-weight: bold;
    font-size: 13.5pt;
    line-height: 13.5pt;
    font-family: Spoqa Han Sans Neo;
    color: ${colors.main2};
    text-decoration:none;
  }
`;


const Box2 = styled.div`
display: flex;
height:70pt;
}
`
const DivBox2 = styled.div`
  margin-right:18pt;
  display: flex;
  align-items: center;   
  
  a{
    font-weight: nomal;
    font-size: 10.5pt;
    line-height: 12pt;
    font-family: Spoqa Han Sans Neo;
    color: ${colors.main2};
    text-decoration:none;
  }
`;

