import * as React from 'react';
import { NextPage } from 'next';
import styled from '@emotion/styled';
import Router, { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const Index: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [wholeData, setWholeData] = React.useState<{}>();
  const [naverLogin, setNaverLogin] = React.useState<{
    id: string;
    email: string;
  }>({
    id: '',
    email: '',
  });
  React.useEffect(() => {
    const naver = (window as any).naver;
    let naverLogin: any;

    const login = () => {
      naverLogin = new naver.LoginWithNaverId({
        clientId: process.env.NEXT_PUBLIC_NAVER_LOGIN_CLIENT_ID, // ClientID
        callbackUrl: 'http://localhost:3000/naver', // Callback URL
        isPopup: false, // 팝업 형태로 인증 여부
        callbackHandle: true,
        loginButton: {
          color: 'green', // 색상
          type: 3, // 버튼 크기
          height: '60', // 버튼 높이
        }, // 로그인 버튼 설정
      });

      naverLogin?.init();
    };

    const NAVER_POST = `${process.env.NEXT_PUBLIC_BASE_URL}/members/login/sns`;
    const NaverApi = async (data: any) => {
      try {
        await instance({
          method: 'post',
          url: NAVER_POST,
          data: {
            uuid: '' + data.user.id,
            snsType: 'NAVER',
            snsResponse: JSON.stringify(data),
            email: data.user.email,
          },
          headers: {
            ContentType: 'application/json',
          },
          withCredentials: true,
        }).then((res) => {
          // console.log(res);
        });
      } catch (error) {
        // console.log('post 요청 실패');
        // console.log(error);
      }
    };

    const getToken = () => {
      const hash = router.asPath.split('#')[1]; // 네이버 로그인을 통해 전달받은 hash 값
      if (hash) {
        const token = hash.split('=')[1].split('&')[0]; // token값 확인
        naverLogin.getLoginStatus((status: any) => {
          if (status) {
            // 로그인 상태 값이 있을 경우
            // console.log(naverLogin); // 사용자 정보 조회
            let email = naverLogin.user.getEmail();
            // console.log(email); // 사용자 이메일 정보를 받을수 있습니다.
            // console.log(naverLogin.user); //사용자 정보를 받을수 있습니다.
            NaverApi(naverLogin);
            // if (!naverLogin.user.email()) {
            //   // 나이정보 제공을 동의하지 않았을 경우
            //   alert('이메일 동의는 필수입니다.');
            //   naverLogin.reprompt(); // 정보제공창 다시 보여주기

            //   return;
            // }

            // /naver 페이지로 token값과 함께 전달 (서비스할 땐 token 전달을 하지 않고 상태 관리를 사용하는 것이 바람직할 것으로 보임)
            Router.push({
              pathname: '/naver',
              query: {
                token: token,
              },
            });
          }
        });
      }
    };
    login();
    // getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const NaverLogout = async () => {
    // 실제 url은 https://nid.naver.com/oauth2.0/token이지만 proxy를 적용하기 위해 도메인은 제거
    const res = await axios.get('/oauth2.0/token', {
      params: {
        grant_type: 'delete',
        client_id: process.env.NEXT_PUBLIC_NAVER_LOGIN_CLIENT_ID, // Client ID
        client_secret: process.env.NEXT_PUBLIC_NAVER_LOGIN_CLIENT_SECRET, // Client Secret
        access_token: router.query.token, // 발급된 Token 정보
        service_provider: 'NAVER',
      },
    });
    if (res) {
      Router.push('/signin'); // 로그인 페이지로 이동
    }
  };

  return (
    <Wrapper>
      <Header.Container>
        <Header.Title>로그인할 방법을 선택해주세요.</Header.Title>
      </Header.Container>

      <Button.Container>
        <Button.ButtonList>
          <Button.NaverButton id="naverIdLogin" />
        </Button.ButtonList>
      </Button.Container>
      <Buttons onClick={NaverLogout}>
        <ButtonText>Logout</ButtonText>
      </Buttons>
    </Wrapper>
  );
};

export default Index;

const Buttons = styled.button`
  background-color: #19ce60;

  width: 360px;
  height: 40px;

  margin: 6px 0;

  border: none;
  border-radius: 6px;

  cursor: pointer;
`;

const ButtonText = styled.h4`
  margin: 0;
  padding: 0;

  font-size: 18px;
  color: #ffffff;
`;

const Wrapper = styled.div`
  max-width: 720px;

  margin: 0 auto;
`;

const Header = {
  Container: styled.div`
    text-align: center;
  `,

  Title: styled.h2``,
};

const Button = {
  Container: styled.div``,

  ButtonList: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  NaverButton: styled.div``,
};
