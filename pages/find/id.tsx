import styled from '@emotion/styled';
import colors from '../../styles/colors';
import { Box, Button } from '@mui/material';
import Header from 'components/header';
import React, { useState } from 'react';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useRouter } from 'next/router';
import { FindKey } from 'pages/signin';
import Modal from 'components/Modal/Modal';

const findingId2 = () => {
  const router = useRouter();
  const { id } = useSelector((state: RootState) => state.findUserInfo);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorModal, setErrorModal] = useState(false);

  // 비밀번호 찾기
  const HandleFindPassword = async () => {
    let key = sessionStorage.getItem('key');
    let data: FindKey = JSON.parse(key!);
    if (data.isMember) {
      // console.log('멤버 확인 -> ' + data.isMember);
      sessionStorage.getItem('key');
      router.push('/find/password');
    } else {
      setErrorMessage(
        '탈퇴한 계정입니다.\n엔티즌 이용을 원하시면\n 다시 가입해주세요.',
      );
      setErrorModal((prev) => !prev);
    }
  };
  if (id) {
    return (
      <React.Fragment>
        {errorModal && (
          <Modal
            text={errorMessage}
            color={'#7e7f81'}
            click={() => setErrorModal((prev) => !prev)}
          />
        )}
        <Body>
          <WebHeader />
          <Inner>
            <Wrapper>
              <Header />
              <Inform>
                <div>
                  고객님의 정보와
                  <br />
                  일치하는 아이디입니다
                </div>
              </Inform>
              <UserId>{id}</UserId>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <ButtonWrap onClick={() => router.push('/signin')}>
                  로그인
                </ButtonWrap>
              </Box>

              <Password>
                <Box
                  onClick={HandleFindPassword}
                  sx={{
                    fontSize: '10.5pt',
                    fontWeight: '400',
                    lineHeight: '12pt',
                    cursor: 'pointer',
                    paddingBottom: '1.5pt',
                    letterSpacing: '-0.02em',
                    textDecorationLine: 'underline',
                    textUnderlinePosition: 'under',
                    color: '#747780',
                  }}
                >
                  비밀번호 찾기
                </Box>
              </Password>
            </Wrapper>
          </Inner>
          <WebFooter />
        </Body>
      </React.Fragment>
    );
  } else {
    router.push('/');
  }
};

export default findingId2;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  //height: 810pt;
  background: #fcfcfc;

  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  width: 345pt;
  //width: 281.25pt;
  background: #ffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0;
    padding: 0;
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0pt 31.875pt;

  @media (max-width: 899.25pt) {
    height: 100%;
    margin: 0;
  }
`;

const Inform = styled.div`
  margin-top: 12pt;
  margin-left: 15pt;
  & > div {
    font-size: 15pt;
    font-weight: 700;
    line-height: 22.5pt;
    font-family: 'Spoqa Han Sans Neo';
    color: ${colors.main2};
    letter-spacing: -0.02em;
    @media (max-width: 899.25pt) {
      font-size: 18pt;
      line-height: 24pt;
    }
  }
`;
const UserId = styled.div`
  margin-top: 39pt;
  text-align: center;
  font-weight: 700;
  color: ${colors.main};
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-size: 18pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  @media (max-width: 899.25pt) {
    font-size: 12pt;
    line-height: 12pt;
    margin-top: 54pt;
  }
`;
const Password = styled.div`
  margin-top: 26.25pt;
  padding: 3.75pt 0;
  font-family: 'Spoqa Han Sans Neo';
  text-align: center;
`;

const ButtonWrap = styled(Button)`
  font-weight: 700;
  margin: 48pt 15pt 0 15pt;
  width: 100%;
  height: 42pt;
  padding: 15pt 0;
  font-size: 12pt;
  line-height: 12pt;
  border-radius: 6pt;
  align-items: center;
  background: #5a2dc9;
  color: white;
  font-family: 'Spoqa Han Sans Neo';
  @media (max-width: 899.25pt) {
    margin: 60pt 15pt 0 15pt;
  }
`;
