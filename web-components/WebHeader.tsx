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
            <DivBox2><input type="text" placeholder="서비스를 검색해보세요" /> {/*emotion styled input type*/}</DivBox2>
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
height:70pt;
margin-bottom: 27.75pt;
border-bottom: 1px solid #e9eaee;

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

input[type='text']{
  width: 184.5pt;
  height: 24pt;
  margin-right:18pt;
  margin-top: 28.5pt ;
  margin-bottom: 28.5pt ;
  border: 1px solid ${colors.main};
  font-weight: normal;
  font-size: 10.5pt;
  line-height: 12pt;
  font-family: Spoqa Han Sans Neo;
  color: #caccd1;
  padding-left: 7.5pt;
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 6pt;
}

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

