import styled from "@emotion/styled";
import { PropsApi } from "api";
import axios from "axios";
import { useRef, useState } from "react";
import { useMutation } from "react-query";


const AdLogin =()=>{

    const idRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);

    const [err, setErr] = useState<Boolean>(false);
 
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
        setErr(true);
    }
  })

    const signin = () => {
        loginMutate({
          url: '/members/login',
          data: {
            memberType: 'COMPANY',
            id: idRef?.current?.value!,
            password: pwRef?.current?.value!,
          },
        });
      };

    const changeValue=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {type} = e.target;
        setErr(false);
        if(idRef.current && type === 'text'){
            idRef.current.value= e.target.value;
            //console.log(idRef.current.value)

        }else if(pwRef.current&& type == 'password'){
            pwRef.current.value = e.target.value;
            //console.log(pwRef.current.value)
        }
    }

    return(
        <Body>
            <Inner>
                <Wrapper>
                    <h1>엔티즌 관리자 시스템</h1>
                    <p>로그인</p>
                    <InputID type='text' placeholder="아이디" onChange={(e)=>changeValue(e)} ref={idRef}/>
                    <InputPW type='password' placeholder="비밀번호" onChange={(e)=>changeValue(e)} ref={pwRef}/>
                    {err&&<ErrP className="err"><img src='/images/Attention.png' alt="err"/>아이디 또는 비밀번호가 일치하지 않습니다.</ErrP>}
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
>p{
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
const ErrP = styled.p`
position: relative;
display: flex;
align-items: center;
&.err{
    margin-top:8px;
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 150%;
color: #F75015;
}
img{
    position: relative;
    width:16px;
    height: 16px;
    margin-right: 4px;
}
`