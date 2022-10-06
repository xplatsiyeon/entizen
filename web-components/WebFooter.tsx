import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import colors from 'styles/colors';
import Insta from 'public/images/insta.png';
import Pencil from 'public/images/pencil.png';

const WebFooter = ()=>{
return(
    <Wrapper>
      <Inner>
        <Box1>
            <List>
                <li><Link href='/'><a>사업자 정보 확인</a></Link></li>
                <li><Link href='/'><a>이용약관</a></Link></li>
                <li><Link href='/'><a>개인정보 처리방침</a></Link></li>
                <li><Link href='/'><a>1:1 문의</a></Link></li>
                <li>
                  <IconBox onClick={()=>
                    window.open('https://www.instagram.com/entizen.ev/')}>
                    <Image
                      src={Insta}
                      alt="instagram"
                      layout='intrinsic'
                    />
                  </IconBox>
                </li>
                <li>
                  <IconBox onClick={()=>
                    window.open('https://post.naver.com/entizen_ev/')}>
                    <Image
                      src={Pencil}
                      alt="write"
                      layout='intrinsic'
                    />
                  </IconBox>
                </li>
            </List>
            <Address>(주)엔티즌 대표: 윤민호,오성흠  사업자등록번호 0000-000-0000 
              <br/>호스칭 사업자 : 블라블라  총신판매업: 2021-서울강남-2345
              <br/>이메일: 블라블라@entizen.com  고객센터: 0000-0000
              <br/>운영시간: 평일 10:00 ~ 17:00 &#40;점심시간 12:00 / 주일 및 공휴일 제외&#41;
              <br/>주소: 서울 강남구 테헤란로 393 LS 빌딩 
              <br/><br/>  Copyright &copy;  2022 Entizen Inc. All rights reserve. </Address>
        </Box1>

        <Box2>
          <CallNumber>
            <p>고객센터</p>
            <p>9818-8856</p>
          </CallNumber>
          <Time><p> 평일 10:00~17:00</p><p>&#40;점심시간 12:00 ~ 13:00 / 주말 및 공휴일 제외&#41;</p></Time>
          <ButtonBox>
            <Button>App Store</Button>
            <Button>Goocle Play</Button>
          </ButtonBox>
        </Box2>
      </Inner>
    </Wrapper>
)
}
export default WebFooter;

const Wrapper = styled.footer`
  width:100%;
  height: 187.5pt;
  border-top: 1px solid #e9eaee;
  //margin-top: 45.75pt;
  padding:10pt 0;
  background: #ffff;

  @media (max-width:899pt) {
    display:none;
  }
`
const Inner = styled.div`

display:flex;
justify-content: space-between;
max-width: 900pt;
//height: 203.35pt;
margin: 0 auto;

`

const Box1 = styled.div`

`

const Box2 = styled.div`

`
const List = styled.ul`
  list-style: none;
  display:flex;
  margin-bottom: 10.75pt;

  li{
    padding: 6pt 0;
    margin-right:30pt;
    display: flex;
    align-items: center;
    a{
      font-weight: bold;
      font-size: 13.5pt;
      line-height: 15pt;
      font-family: Spoqa Han Sans Neo;
      color: #A6A9B0;
      text-decoration:none;
    }
}
`

const Address = styled.address`
font-weight: 400;
font-size: 12pt;
line-height: 18.5pt;
font-family: Spoqa Han Sans Neo;
color: #A6A9B0;
`
const CallNumber = styled.div`
  margin: 10pt 0 18pt;
  p{
    &:nth-of-type(1){
      font-weight: bold;
      font-size: 12pt;
      line-height: 12pt;
      font-family: Spoqa Han Sans Neo;
      color: ${colors.main};
      margin-bottom:9pt;
    }
    &:nth-of-type(2){
      font-weight: bold;
      font-size: 22.5pt;
      line-height: 22.5pt;
      font-family: Spoqa Han Sans Neo;
      color: ${colors.main};
    }
  }
  `

const Time = styled.div`
margin-bottom: 27pt;
p{
  &:nth-of-type(1){
    font-weight: normal;
    font-size: 13.5pt;
    line-height: 18pt;
    font-family: Spoqa Han Sans Neo;
    color: #A6A9B0;
    margin-bottom:9pt;
  }
  &:nth-of-type(2){
    font-weight: normal;
    font-size: 10.5pt;
    line-height: 18pt;
    font-family: Spoqa Han Sans Neo;
    color: #A6A9B0;
  }
}`

const ButtonBox = styled.div``

const Button = styled.button`
background:${colors.main};
padding: 9pt 12pt;
border-radius: 21.75pt;
font-weight: bold;
font-size: 10.5pt;
line-height: 12pt;
font-family: Spoqa Han Sans Neo;
color: ${colors.white};
margin-right:9pt;
` 

const IconBox = styled.div`
display: flex;
align-items: center;
width: 27pt;
height: 27pt;
`