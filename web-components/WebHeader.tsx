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
            <input type="text" placeholder="서비스를 검색해보세요" /> {/*emotion styled input type*/}
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
    </Wrapper>
    )

}

export default WebHeader;

const Wrapper = styled.div`
position:relative;
margin: 0 auto;
display: flex;
justify-content: space-between;
max-width:900pt;
max-height: 81pt;  

@media (max-width:576pt) {
    display:none;
  }
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
  padding: 33.75pt 0;
  margin-right: 30pt;
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
  padding:34pt 0 ;  
  margin-right:18pt;   
  
  a{
    font-weight: nomal;
    font-size: 10.5pt;
    line-height: 12pt;
    font-family: Spoqa Han Sans Neo;
    color: ${colors.main2};
    text-decoration:none;
  }
`;

