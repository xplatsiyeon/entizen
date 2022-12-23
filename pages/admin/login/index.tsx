import styled from "@emotion/styled";
import { PropsApi } from "api";
import axios from "axios";
import { useMutation } from "react-query";


const AdLogin =()=>{

    //유효성 체크 => alert('아이디와 비밀번호를 입력해주세요')
    //유효성 체크 => alert('아이디와 비밀번호를 확인해주세요')


  const {
    mutate: loginMutate,
    isLoading: loginLoading,
    isError: loginError,
  } = useMutation(async(apiInfo: PropsApi)=>{
    const {url, data} = apiInfo;
    return await axios({
        method: 'POST',
        url: `/api${url}`,
        data,
        withCredentials: true,
      }).then((res) => res);
  }, {
    onSuccess:(data)=>{
        console.log('로그인성공', data)
    },
    onError: (err)=>{
        console.log(err);
        alert('ektl')
    }
  })

    const signin = () => {
        loginMutate({
          url: '/members/login',
          data: {
            memberType: 'COMPANY',
            id: 'jsm0000',
            password: 'steve1234!',
          },
        });
      };

    return(
        <Body>
            <Inner>
                <Wrapper>
                    <h1>엔티즌 관리자 시스템</h1>
                    <p>로그인</p>
                    <InputID type='text' placeholder="아이디"/>
                    <InputPW type='password' placeholder="비밀번호"/>
                    <Button onClick={signin}> <span>로그인</span> </Button>
                </Wrapper>
            </Inner>
        </Body>
    )
}

export default AdLogin;

const Body = styled.div`

font-family: 'Spoqa Han Sans Neo';
width: 100%;
height: 100vh;
background: #E2E5ED;
position: relative;

`
const Inner = styled.div`
width: 572px;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-65%);

background: #FFFFFF;
box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.16);
border-radius: 4px;
`

const Wrapper = styled.div`
padding: 80px 126px 104px;
h1{
margin-bottom: 48px;
font-style: normal;
font-weight: 500;
font-size: 24px;
line-height: 150%;
color: #5221CB;
text-align: center;
}
p{
    font-style: normal;
font-weight: 500;
font-size: 20px;
line-height: 150%;
color: #000000;
margin-bottom: 8px;
}
`
const InputID = styled.input`
width:100%;
height: 36px;
margin-bottom: 8px;
padding-left: 10px;

color: #000000;
background: #FFFFFF;
border: 1px solid #A6A9B0;

&::placeholder{
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #A6A9B0;
}
`

const InputPW = styled.input`
width:100%;
height: 36px;
padding-left: 10px;
color: #000000;
background: #FFFFFF;
border: 1px solid #A6A9B0;

&::placeholder{
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #A6A9B0;
}
`

const Button = styled.button`
display: flex;
justify-content: center;
align-content: center;
width: 100%;
background: #5221CB;
margin-top: 40px;

>span{
    color: white;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    padding: 7px 0; 
}
`